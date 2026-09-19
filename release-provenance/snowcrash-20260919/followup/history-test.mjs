import assert from "node:assert/strict";
import fs from "node:fs";
import { runInNewContext } from "node:vm";
const root = process.argv[2];
assert(root, "usage: node history-test.mjs CANDIDATE_ROOT GLOBAL_DIST");
const { w: validate } = await import(root + "/dist/src-CToKmqGn.js");
const synthetic = { sessionKey: "agent:main:synthetic-offline-never-sent", limit: 200 };
for (const [maxChars, expected] of [
  [500000, true],
  [500001, true],
  [1000000, true],
  [1000001, false],
  [0, false],
  [1.5, false],
]) {
  const valid = validate({ ...synthetic, maxChars });
  assert.equal(valid, expected);
  console.log(JSON.stringify({ maxChars, valid, errors: validate.errors }));
}
assert(validate(synthetic));
assert(!validate({ ...synthetic, limit: 1001 }));
assert(!validate({ ...synthetic, extra: true }));
assert(!validate({ ...synthetic, offset: -1 }));
const global = process.argv[3] + "/";
assert(process.argv[3], "GLOBAL_DIST required");
const client = fs.readFileSync(global + "gateway-chat-BW6uyvQL.js", "utf8");
let start = client.indexOf('this.client.request("chat.history", {');
assert(start >= 0);
start = client.indexOf("{", start);
const end = client.indexOf("\n\t\t\t});", start);
assert(end > start);
const cli = fs.readFileSync(global + "tui-cli-DI2ZjVRm.js", "utf8");
assert(cli.includes('opts.historyMaxChars ?? "1000000"'));
// Execute only the extracted trusted local request expression, never user input.
const params = runInNewContext(
  "(" + client.slice(start, end) + "\n})",
  { opts: { ...synthetic, maxChars: 1000000 } },
  { timeout: 1000 },
);
assert(validate(params));
console.log(JSON.stringify({ globalTuiRequest: params, valid: true }));
// Extract the actual emitted projection resolver only, avoiding imports of application side effects.
const projection = fs.readFileSync(root + "/dist/session-transcript-path-D-uyc0k1.js", "utf8");
start = projection.indexOf("const DEFAULT_CHAT_HISTORY_TEXT_MAX_CHARS = ");
const stop = projection.indexOf("\nfunction truncateChatHistoryText", start);
assert(start >= 0 && stop > start);
const resolve = runInNewContext(
  projection.slice(start, stop) + "\nresolveEffectiveChatHistoryMaxChars;",
  {},
  { timeout: 1000 },
);
assert.equal(resolve({}), 8000);
assert.equal(resolve({}, 1000000), 1000000);
assert.equal(resolve({}, 500001), 500001);
console.log(
  "PASS: real emitted lazyCompile validator and global TUI request construction; resolver accepts explicit cap unchanged; omitted default 8000, limit, offset, additionalProperties guards retained. No network, user history, auth or provider calls.",
);
