#!/usr/bin/env python3
"""Expand lossless custody deltas into a new output directory; no runtime access."""
import json
import pathlib
import sys

root = pathlib.Path(__file__).resolve().parent.parent
out = pathlib.Path(sys.argv[1]).resolve()
out.mkdir(exist_ok=False)


def load(name):
    return json.loads((root / name).read_text())


def save(name, data):
    (out / name).write_text(json.dumps(data, indent=2) + '\n')


def delta(base, record):
    result = dict(base)
    for key in record.get('remove', []):
        del result[key]
    result.update(record['replace'])
    assert len(result) == record['entries']
    return result


baseline = delta(load('manifests/baseline-runtime.json'), load('followup/baseline-runtime-delta.json'))
candidate = delta(baseline, load('followup/candidate-runtime-delta.json'))
save('baseline-runtime.json', baseline)
save('candidate-runtime.json', candidate)
for variant in ('baseline', 'candidate'):
    change = load(f'followup/{variant}-source-delta.json')
    source = load(change['parent'])
    source['files'].update(change['replaceFiles'])
    assert len(source['files']) == change['sourceFiles']
    assert len(source['symlinks']) == change['sourceLinks']
    save(f'{variant}-source.json', source)
    modes = load('followup/baseline-source-modes.json')
    entries = {name: {'sha256': source['files'][name], 'mode': mode}
               for mode, names in modes['modes'].items() for name in names}
    entries.update(modes['links'])
    save(f'{variant}-source-mode-link.json', entries)
metadata = load('followup/history-accepted-manifest.json')
accepted = {}
for name, row in metadata['metadata'].items():
    merged = dict(row, path=name)
    for field in ('sha256', 'mode', 'target'):
        if field not in merged and field in candidate.get(name, {}):
            merged[field] = candidate[name][field]
    accepted[name] = merged
save('history-accepted.json', accepted)
transformed = {name: dict(row, mode=oct(int(row['mode'], 8) & ~0o222))
               if row['type'] != 'symlink' else row for name, row in accepted.items()}
history = delta(transformed, load('followup/history-candidate-delta.json'))
save('history-candidate.json', history)
assert accepted.keys() == history.keys()
assert [name for name in accepted if accepted[name].get('sha256') != history[name].get('sha256')] == ['dist/schema-BuOFpc7K.js']
print('PASS: expanded source/runtime/mode/link/history maps; exactly one history content change')
