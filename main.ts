// The One-Line Cat Joke That Lands — entry program.
// Writes one single-line joke about cats (98 characters) to
// ENTRY_OUTPUT, or /output/entry.txt when unset. No trailing newline.
// Gate (RULES.txt): output must be UTF-8 text of 1 to 200 characters,
// not only white space, exactly one line.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const JOKE =
  "I asked the cat to watch the baby. She moved the baby's blanket, sat on it, and filed for custody.";

if (JOKE.length < 1 || JOKE.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${JOKE.length}`);
}
if (JOKE.trim().length === 0 || JOKE.includes("\n")) {
  throw new Error("entry must be a single non-blank line");
}
// No leading/trailing whitespace, no control characters at all.
// Written as a charCodeAt loop on purpose: a regex with backslash
// escapes is easy to get wrong in a one-line entry program.
if (JOKE !== JOKE.trim()) {
  throw new Error("entry must not start or end with whitespace");
}
for (let i = 0; i < JOKE.length; i++) {
  if (JOKE.charCodeAt(i) < 0x20 || JOKE.charCodeAt(i) === 0x7f) {
    throw new Error("entry must not contain control characters");
  }
}

const out = process.env.ENTRY_OUTPUT ?? "/output/entry.txt";
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, JOKE, "utf8");
