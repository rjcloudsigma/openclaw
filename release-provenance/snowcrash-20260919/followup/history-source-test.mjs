import assert from "node:assert/strict";
import fs from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { runInNewContext } from "node:vm";
const root = path.resolve(process.argv[2]);
const runtime = path.resolve(process.argv[3]);
const require = createRequire(path.join(runtime, "package.json"));
const { Type } = await import(require.resolve("typebox"));
const { Value } = await import(require.resolve("typebox/value"));
const source = fs.readFileSync(
  path.join(root, "packages/gateway-protocol/src/schema/logs-chat.ts"),
  "utf8",
);
const expression = source.match(
  /maxChars: Type.Optional\((Type.Integer\(\{ minimum: 1, maximum: [\d_]+ \}\))\)/,
)?.[1];
assert(expression, "actual source expression must match expected narrow contract");
const schema = runInNewContext(expression, { Type }, { timeout: 1000 });
for (const [value, expected] of [
  [500000, true],
  [500001, true],
  [1000000, true],
  [1000001, false],
  [0, false],
  [1.5, false],
]) {
  assert.equal(Value.Check(schema, value), expected);
}
console.log(
  "PASS: actual source maxChars expression boundary regression (not full protocol/compiler coverage)",
);
