# Accepted corrected R2 and staged history cap

This follow-up supersedes only the _pending corrected release_ fields of the historical record. Rejected archives `d9acdd61...` and `51b9f532...`, patch 0004 and all prior manifests remain rejected historical custody, not deployable and not safe fallback.

## Correct source series

The two corrected source changes are in patch **0005**, which replaces 0004 rather than applying after it. Invalid-owner validation now precedes trimming/blank return, preserving exact blank keys and avoiding synthetic row collisions. It includes source regressions. Starting at the exact privately held base `85f78669f560bda3cc241007a634ec117243efd8`:

1. Apply 0001, then 0002, then 0005: corrected baseline.
2. Apply 0003: corrected small-list candidate.
3. Optionally apply 0006: history-cap source equivalent ONLY, not the build source of the emitted derivative.

Use `git apply --check PATCH` before each `git apply PATCH`, on a new isolated source tree. Do not apply every numbered patch blindly. Expand the source delta's `parent` manifest and replace only `replaceFiles`; run `python3 verify-source.py TREE EXPANDED_MANIFEST`. Both corrected variants retain 22,120 files and 23 symlinks. Source modes are separately recorded, with candidate mode/link equality referenced rather than duplicated. Original receipt-manifest hashes identify the exact serialization; published expanded maps preserve semantic identity, not original whitespace.

**GitHub-only reconstruction remains blocked:** the exact local base/ancestry is unavailable through GitHub. No unreviewed vault history or full source dump is published. Preserve the approved private base and dependency donors. This follow-up found the prior temporary build directory absent after reboot; recovered exact qualification manifests from the already collected hash-verified receipt archive. Package/source build receipts are attributed historical evidence, not newly run builds.

## Corrected rebuild and qualification

Exact package and source/runtime manifest identities, gate times/resources/exits and two changed source hashes are in `qualification.json` and the release ledger. Runtime manifests use lossless parent/remove/replace maps to avoid duplication. Baseline is based on historical baseline runtime manifest; candidate is based on expanded corrected baseline. Every map retains exact runtime mode, content and symlink identities.

Historical qualification: full compiler and production builds for each variant; 71 orphan tests and 49 roundtrip/case tests each (240 executions). Independent actual-package tests ran 432 immediate bytes/rows/history checks; same-state candidate-to-fixed-baseline chain and missing-store/history negative controls passed. Original source-free comparisons: 161 payload comparisons, checkpoint/RPC/template tests, all 11 original-path plugin registrations, zero diagnostics. No external provider execution was established. Source/dependency custody included 323 production packages and 26,063 dependency files per variant. Independent review rehashed archives/extracted payloads, but did not repeat the full earlier donor audit. No binary deterministic rebuild or full offline dependency replay is claimed.

For a future upgrade, acquire the reviewed exact source base and frozen dependency inputs first; verify locks and donor identities against existing dependency records. Apply the selected source series in a clean task checkout, then port the small guard, list/cache changes and schema bound individually to the new source layout (never blind emitted-name replacement). Rerun focused orphan-key/roundtrip tests, full semantic/build gates, source-free emitted blank-collision/repeated-startup tests, same-current-state fallback negative controls, runtime export/link checks, checkpoint/RPC and original-path plugin registration tests. The original build envelope was network-none/read-only container root, 2 CPU, 16 GiB RAM/equal swap and 12 GiB heap; runtime gates used 6 GiB/4 GiB. Existing README historical build recipe remains relevant to inherited inputs, not a promise a different checkout reproduces these binaries.

## Live acceptance is separate from publication

Corrected candidate archive `20344b53eff59b3ac764976d510d4cd9e94515676f2d130458717f4424cd4922` was deployed and accepted. Corrected fallback `8913b18eebe0556587de8d48636a00362c45b2f82c942b448e8a8a237f664b34` was independently qualified. Final preservation covered 414 stores, 2,519 exact keys/full canonical rows/session IDs and 15,454 original history prefixes. Shared SQLite quick_check passed. Ten managed peers changed; 26 unrelated peers preserved. Eleven plugins loaded, zero diagnostics; restored ingress connected and settled readiness healthy. Startup end-state evidence is not per-stage live instrumentation.

The initial acceptance adapter falsely rejected normal ended-task retention. An initial 20-ID exception then missed ten additional terminal rows whose explicit cleanup deadlines expired during maintenance. Final acceptance permits only succeeded/ended rows with explicit expired cleanup_after, preserving other state/job gates. No missing rows or old database were restored. This control correction and the extra restart required to register restored ingress are disclosed; follow-up adapter logic is not falsely covered by the original independent controller review.

Acceptance PID 1312678 is historical. A later reboot yielded PID 1530, observed at history staging. Neither is asserted current indefinitely. Bounded client roundtrip samples improved small10 median 2335 -> 457 ms and six-request burst 14000 -> 2337 ms; list500 worsened 842 -> 972 ms, history burst 1911 -> 1938 ms, cold small10 remained 2308 ms. No universal speedup or repeated-live-p95 claim.

## One-million history cap: STAGED ONLY

Derivative `openclaw-history-cap-1m-next-start-20260919` is a copied emitted compatibility derivative of accepted R2, **not source-built**. Inherited version/build-info describe the base only. Exactly one content change among 39,650 entries: `dist/schema-BuOFpc7K.js`, schema maximum `5e5` -> `1e6`. `history-emitted.patch` records it; source equivalent is patch 0006. `history-test.mjs` is the staging offline regression with host paths parameterized and extracted trusted-local expressions evaluated in timeout-bounded VM contexts instead of Function constructors:

```sh
node history-test.mjs CANDIDATE_ROOT GLOBAL_OPENCLAW_DIST
node --check CANDIDATE_ROOT/dist/schema-BuOFpc7K.js
```

It imports the real lazyCompile validator, tests 500000/500001/1000000 accepted and 1000001/zero/fractional rejected; validates actual global TUI request construction; preserves omitted default 8000, limit max1000, offset and additionalProperties guards. Shared chat.startup inherits this additive bound relaxation. Per-message and aggregate/final byte budgets remain unchanged. No Gateway startup, user history, network or provider call is needed. `history-source-test.mjs` separately tests the actual source-schema expression from a reconstructed tree, not an invented schema substitute.

Accepted full-tree metadata derives from the corrected candidate runtime plus explicit metadata; candidate derives by removing write bits on regular files/directories, normalizing symlink lstat modes to 0777 on clone, rebasing resolved targets within the new release root, and applying the one content replacement. No hardlinks, external/broken links, or SDK changes; regular candidate nlink=1 and distinct inode identities from accepted inputs were checked at staging. Write-bit removal is owner-reversible, not root/chattr immutability.

Only the configured next-start selection changed, with manager daemon-reload. The executing accepted R2 process remained on the old 500000 cap; separate activation is pending. Existing SDK peer targets were untouched and the core imports its own schema. Until separately authorized activation, client cap500000 remains necessary. Roll back only next-start selection after inspecting intervening changes: restore/merge the prior release root in the existing override, preserve every other directive, then manager daemon-reload. Never restart on this publication's authority. No database restore, old key restoration/unwrap, fabricated checkpoint or sidecar deletion.

## Remaining gates

Leave draft. Independent publication review, reviewed durable base ancestry custody, optional full dependency replay, separately authorized history-cap activation and actual postactivation checks remain pending. No PRD synchronization tool was available. No CI bypass, merge, deployment or service changes are part of this publication. Whole-project tests/builds are intentionally not rerun for provenance-only changes; historical gate results remain attributed above.

Publication tooling: the first commit hook failed because its transient oxlint installation lacked tsgolint. A complete temporary lint toolchain then found three implied-eval violations in the test extraction harness. Those were corrected to explicit timeout-bounded trusted-local VM evaluation and all offline checks were rerun; no lint suppressions or hook/CI bypass were added.
