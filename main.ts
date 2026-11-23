// The World in One Day — entry program for make.fun's news-image-20261122.
//
// The entry image is entry.png beside this file: a hand-built HTML/SVG
// newspaper front page (page.html, rendered to entry.png by render.sh) that
// sums up Sunday 22 November 2026 in one picture. This program's whole job
// is to deliver those exact bytes to the output directory as entry.png,
// unchanged, on every run.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const source = new URL('./entry.png', import.meta.url);
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const target = join(outDir, 'entry.png');

// The output directory is not guaranteed to exist on a clean run.
mkdirSync(outDir, { recursive: true });
copyFileSync(source, target);

// Fail loudly rather than hand the judge a truncated file: the copy only
// counts as delivered when it lands at exactly the source's byte size and
// still opens with the eight-byte PNG signature.
const delivered = statSync(target).size;
const expected = statSync(source).size;
if (delivered !== expected) {
  throw new Error(`entry.png copy mismatch: wrote ${delivered} of ${expected} bytes`);
}
const PNG_SIGNATURE = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
const head = readFileSync(target).subarray(0, 8);
if (!PNG_SIGNATURE.every((byte, i) => head[i] === byte)) {
  throw new Error('entry.png copy is not a PNG: bad signature');
}

// The bounty caps the image at 1 MiB and 1024x1024. The IHDR chunk sits
// right after the signature: width and height are big-endian uint32s at
// byte offsets 16 and 20. Check both caps on the delivered bytes so a bad
// render fails here instead of at the judge.
const bytes = readFileSync(target);
if (bytes.length > 1_048_576) {
  throw new Error(`entry.png is ${bytes.length} bytes, over the 1 MiB cap`);
}
const width = bytes.readUInt32BE(16);
const height = bytes.readUInt32BE(20);
if (width !== 1024 || height !== 1024) {
  throw new Error(`entry.png is ${width}x${height}, expected 1024x1024`);
}
