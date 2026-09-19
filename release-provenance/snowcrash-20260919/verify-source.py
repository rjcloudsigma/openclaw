#!/usr/bin/env python3
"""Verify a clean reconstructed source tree against a sanitized manifest."""
import hashlib
import json
import sys
from pathlib import Path

root = Path(sys.argv[1]).resolve()
manifest = json.loads(Path(sys.argv[2]).read_text())
files = {}
links = {}
for path in root.rglob('*'):
    name = str(path.relative_to(root))
    if '.git' in path.relative_to(root).parts:
        continue
    if path.is_symlink():
        links[name] = str(path.readlink())
    elif path.is_file():
        files[name] = hashlib.sha256(path.read_bytes()).hexdigest()
for label, actual, expected in [('files', files, manifest['files']), ('links', links, manifest['symlinks'])]:
    different = sorted(key for key in set(actual) | set(expected) if actual.get(key) != expected.get(key))
    if different:
        raise SystemExit(f'{label} mismatch: {different[:30]} ({len(different)} total)')
print(f'PASS: {len(files)} files, {len(links)} links, exact membership and content')
