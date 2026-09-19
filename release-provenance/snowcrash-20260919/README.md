# Snowcrash Gateway source custody: REJECTED packages, 2026-09-19

## Independent review disposition: NO-GO (2026-09-19)

**Both recorded packages are REJECTED: NOT deployable and NOT a safe fallback.** This disposition supersedes the qualification GO and fixed-package safety claims published in commit `66841fc94fab8555e530bed5480601165e89a644`.

- Rejected baseline SHA256: `d9acdd61fc7fa4d922ca1d01feb2c9cd7d4f01ee706435ccdc14fce9376eed44`.
- Rejected candidate SHA256: `51b9f532b303dc318519cd96ed2a9676723dcefe850f41006c27361ebd532c25`.
- Independent source-free tests of BOTH actual emitted packages found that invalid-owner whitespace-only keys bypass the guard: trimming and the blank-key early return occur first. Synthetic `" "` and `"\t"` keys become `""`, merge and discard one row; `"main"` remains. This is a concrete failure of exact-key/row preservation, not just renaming.
- **No live loss has been established; neither package was deployed.** Existing successful test results are genuine bounded evidence, not fabricated passes; they omitted blank-only collisions and cannot establish the broad guarantee.
- Patches, manifests, historical filenames containing `fixed`, reconstruction receipts and hashes remain unchanged as **rejected historical provenance**, not release approval. Patch 0004 is superseded pending correction, not silently rewritten.
- Normalization R2 correction is pending under separate source/build ownership. Both replacement archive and manifest identities are **pending/null**; this record publishes no new R2 patch or qualification. Normalization R2 is distinct from the inherited latency-R2 layer.

Required correction/requalification: guard invalid owners before trimming/blank early return, preserving exact original keys and unchanged valid-owner behavior. Add distinct blank/empty-key collisions, differing timestamps, repeated migration/startup stages and candidate-to-corrected-baseline rollback regressions. Independently qualify BOTH new outputs before considering live transition.

Review basis: independent fixed-release review dated 2026-09-19, actual emitted blank-key probe and release-blocked disposition. This summary publishes only synthetic findings, not private operational reports or live state.

## Status and scope

Draft preservation record, not a current-main implementation or deployment. The fork branch starts at `1c46fa00318be06d043907a71de8c0b45f6d02b8`; the historically tested source does NOT. Do not apply these patches to fork main and describe the result as the tested release.

Exact source reconstruction was verified for all four recorded derivative variants, including complete file membership/content and 23 source links. Base ancestry is local commit `85f78669f560bda3cc241007a634ec117243efd8` (version 2026.7.1). GitHub returns HTTP 422 for that commit in BOTH fork and upstream. It is a local, already-patched ancestry with vault work, not a verified public upstream release. **Standalone reconstruction from GitHub alone remains BLOCKED on durable reviewed custody of this local base and its ancestry.** No indiscriminate base snapshot or unreviewed vault patch history is published here. Keep the local base object and frozen source safe until a separately reviewed base-preservation decision. This PR preserves the exact incremental layers now; it does not claim the missing public base has been solved.

## Ordered patch series

Start from that exact base in NEW isolated scratch; never the shared dirty checkout. Nine tracked dependency symlinks listed in `manifests/base-excluded-dependency-links.json` are excluded from the frozen source projection; installed dependencies have separate custody. Remove those exact links only from reconstruction scratch. Do not delete any runtime dependency tree.

1. `0001-inherited-derivative-and-build-support.patch`: consolidated inherited preservation, R3 DB ownership, build support, test corrections and semantic-boundary differences. This is a lossless final-state reconstruction delta, NOT a claim to reconstruct the original chronological commits. Original attribution is retained in `manifests/inherited-attribution.json`.
2. `0002-reviewed-latency-r2.patch`: exact reviewed three-file R2 patch; resulting original source manifest SHA256 `f304e623026ea32407e0febae500435470edd56140f4fb7d1a7fdfcb3378bcad`.
3. REJECTED historical baseline (not rollback-safe): apply `0004-invalid-owner-and-regressions.patch` directly after step 2. Verify `baseline-fixed.json`.
4. REJECTED historical candidate: also apply `0003-reviewed-small-list.patch`. Normalization and small-list touch disjoint files; verified in this order. Verify `candidate-fixed.json`. Historical small-list without normalization uses steps 1, 2, 0003; it is NOT an acceptable restart rollback.

Run `git apply --check` before each layer and verify complete SHA256/link membership with `verify-source.py`. `reconstruction-verification.json` records newly executed full checks, not a compiler/build rerun. Source manifests here are sanitized projections; original full-manifest identities are in `change-register.json`.

## Change register and failure modes

Exact per-file before/after SHA256s are in `change-register.json`; all final source hashes are in variant manifests.

- `src/infra/state-migrations.ts`, `canonicalizeSessionKeyForAgent`: a path-safe owner can remain invalid after normalization. The old fallback repeatedly prepended that invalid owner; both startup stages could mutate keys on each restart. Historical guard uses `isValidAgentId(configuredAgentId)` and returns **params.key** for nonblank invalid-owner keys. It preserves the tested repeated prefixes, case and padding, but misses whitespace-only keys because the blank-key return precedes the guard; both packages are rejected. No global ID-rule relaxation or manual key repair.
- `src/infra/state-migrations.orphan-keys.test.ts`: nine new regression cases cover invalid owners, repetition, aliases/shared/custom stores and valid-owner boundaries. The exact test delta is in 0004.
- `src/gateway/session-utils.ts`, metadata context and synchronous/asynchronous list-row loops: share response-local exact child view; invalidate/reacquire after transcript awaits so ownership writes do not remain hidden. Avoid repeated child scans. Do not claim atomic snapshots across every await.
- `src/agents/subagent-registry-read.ts`, `buildSubagentRunReadIndex`: trimmed and exact child views share one response-local persisted/in-memory snapshot; never retain the combined index across requests.
- Inherited R2 `src/agents/subagent-registry-queries.ts`: exact-child lookup/generation/ended-state semantics for single-row accessors; lists retain trimmed semantics. Single-row `session-utils` shares the response-time index.
- Inherited DB owner (`src/state/openclaw-state-db.ts`), registry persistence/state and session accessor: ownership/identity checks, cleanup on failed opens and stable read caching; corresponding tests retained. These are inherited changes, not newly invented normalization work.
- Inherited detached chat/session resolvers and tests preserve response isolation and read performance; build support (`tsdown*.config.ts`, staging helper, build runner) and `src/secrets/config-io.ts` semantic boundary are explicitly retained, not silently described as upstream. Preserve the test-correction and performance-prep configuration layers as recorded.

## Build and dependency identity

No build or install was repeated by the publication worker. Recovery worker recorded successful bounded qualification gates for both manifest-bound derivatives; subsequent independent release review rejected BOTH. Node 22.23.2, pnpm 11.2.2, TypeScript 6.0.3; pinned container image `sha256:749d4ac6f6876e0a7d589fd8cb05d62085ea3f5c6d0722fbe6f8694e923578e0`.

`manifests/dependency-locks.json` pins package/workspace/lock content; sanitized `dependency-audit.json` retains 491 locked/actual identities, zero mismatches and equal installed lock. This record does not contain node_modules or frozen pnpm-store donors. Reinstalling from a lock alone is NOT proof of byte-identical installed inputs; rehash and compare the independently retained installed-input manifest before claiming equivalence. Normal production build prunes 214 bundled-browser undici files and 208 bundled-plugin dependency links.

Recipe after source/dependency verification, in bounded isolated containers: network none, read-only root, UID/GID 1000, all capabilities dropped, no-new-privileges, 2 CPUs, 256 PIDs. Compile/build used approved **16 GiB RAM/equal swap ceiling, 12 GiB heap**, not 6 GiB. Source semantic gate: `node node_modules/typescript/bin/tsc --noEmit --pretty false --extendedDiagnostics`. Historical recipe, not a command to substitute for current-main tsgo policies. Production: unmodified `node scripts/build-all.mjs` with `OPENCLAW_BUILD_ALL_NO_PNPM=1`, `OPENCLAW_TSDOWN_TIMEOUT_MS=900000`, exact pnpm path and `GIT_COMMIT` set to the local base. That environment label is descriptive ancestry, not a claim of a clean Git build.

Packaging must use clean completed emitted outputs and exact production dependency closure; no emitted diagnostic overlays or application TypeScript fallback. Include seven bootstrap templates. Normalize safe executable/data modes and 702 declaration links to internal relative targets; verify no extras and all 327 export keys / 651 targets. Runtime manifests preserve hashes/modes/link targets. Scope is the historically tested Gateway closure, not every disabled optional integration. A baseline-only empty generated declaration is genuine full-build output, not pruned away. Bit-for-bit rebuild determinism has NOT been established.

## Qualification evidence and limits

Recovery REPORT was complete before this publication. Reported independent recovery gates: 18 successful container receipts, exit 0/no OOM; 96 source boundary tests per variant (192 executions); 72 actual source-free emitted migration invocations per package; 24 additional real startup-stage/rollback simulation invocations on unchanged synthetic state; genuine legacy checkpoint migration; real authenticated Gateway health/history/startup and agent bootstrap; original-path actual loaders, all 11 plugins/zero diagnostics, canonical/alias memory schemas and normal/realtime provider registrations.

Emitted differential comparison: 120 ordinary payloads, 24 small-list/burst payloads, 17 freshness/adversarial cases exactly equal. Synthetic 2,670 rows/370 retired stores/3,300 registry runs. Single-run six-small10 bursts: cacheON 11,876.4 -> 587.9 ms; cacheOFF 14,372.9 -> 3,237.6 ms. Not p95 or live acceptance; cacheOFF list500/main-alias slightly regress. Source tests are not substitutes for emitted/runtime/plugin gates. Interrupted attempts and earlier fixture failures remain in the private operational evidence, not relabeled passes.

Publication checks: exact patch custody, four full reconstructed source variants, sanitized dependency identities, JSON parsing, content/credential-pattern scan, task-scoped diff review. No new compiler, build, provider call or production probe. Independent release review is NO-GO. Draft pending corrected normalization R2 identities and fresh independent review, public-base custody, dependency replay and live acceptance. Hash ledger is separate.

## Upgrade porting and acceptance

Before any upgrade, identify real running immutable artifact, launch flags/security and exact plugin SDK peers, not version string alone. Port intent to compatible new APIs in a new worktree; do not force a patch into divergent current-main code. Identify which inherited layers are upstreamed or obsolete before dropping them. Re-run source regressions, full semantics/production build and actual source-free gates for BOTH candidate and fixed baseline, each with independent hashes. Test invalid owners including distinct blank-only and existing empty-key collisions with differing timestamps, repeated startup stages, custom/plugin/retired/shared/symlink/hardlink stores, valid main/global/malformed-wrapper and opaque Matrix/Signal keys; no unintended merges. Recheck registry generations/transfers/transfer-back, persisted writes across awaits, subsequent request freshness, cacheON/OFF small/large list and history performance.

Parent alone owns controlled live transition. Fresh private online and stopped-boundary backups remain on host and are never committed. Freshly capture current all-store exact keys/row IDs/session IDs/history prefixes, including invalid/unconfigured stores; a historical 1,022-prefix fixture is not permission to assume current identity. Check quiescence/active jobs and preserve newer activity. Switch only Gateway code/launch and the **ten audited managed SDK peers**; peer switches are deployment custody, not plugin source edits. Preserve 26 untouched peers, original plugin paths/code, aliases/catalog, Studio/audio, flags/security/config.

Accept only after both startup migration stages retain strict current exact keys/rows/history, authenticated bounded reads, all original plugins and controlled live performance. Never weaken the gate to normalized keys or row equality alone. On rejection use only NEW corrected, independently reviewed and qualified baseline code/launch/peers, preserving newer state. Neither rejected identity in this record is eligible. Do not restart the old unpatched baseline while claiming exact-key preservation. **No whole-DB/store restore, key unwrap/rename, historical prefix restoration, checkpoint fabrication or sidecar deletion.** Stop if rollback safety/quiescence cannot be established.

## Initial-transition failure protocol (mandatory before maintenance)

1. Before stopping or changing live execution, abort safely and leave the still-running old service alone if prerequisites fail. This is not authorization to restart old code.
2. After crossing the stopped/launch-change boundary, restart only NEW corrected, independently reviewed and qualified code with matching verified peers. Never let a generic restoration trap restart the old unpatched target or either rejected package above.
3. If corrected baseline activation cannot be made safe, remain stopped and report to the maintenance owner/operator. Preserve current/newer state and active-work checks; no restart loop, whole-state restore or key rewriting.

Prove failure handling before shutdown: either establish/accept a newly reviewed corrected baseline first, or pre-stage equally safe corrected-baseline recovery for direct candidate activation. A synthetic rollback test is not proof of launch/peer-staging failure handling. No live transition is authorized by this draft.

## Pending ledger and durable gaps

`release-ledger.json` records two REJECTED historical package hashes and pending/null normalization R2 replacements. The previous qualification status is superseded, not erased. Live deployment/acceptance is pending and must be appended only from actual parent evidence: immutable roots, executing hash/PID, timestamp, peer before/after identities, strict preservation results, plugin/authenticated probes, live timings and rejection/rollback outcome if any. Do not publish private raw state. No Studio/audio/provider/plugin repository source change is justified.

Public-base availability remains blocked as explained above. Exact installed dependency bytes are separately retained, not republished; offline replay verification remains pending. Original per-layer chronological history is not reconstructed by the consolidated inherited delta. PRD_SYNC_PENDING: no PRD tools available to this publication worker; parent should reconcile the project record.
