// One Emoji, One Smile
// Writes a single warm emoji to $MAKEFUN_OUTPUT_DIR/entry.txt
// (default /output), with no trailing newline.
// Node 22, standard library only.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: one emoji, nothing else. 🥹 — a face holding back happy
// tears, eyes shining, a small tender smile. It reads instantly as
// warmth, gratitude and affection, the kind of face that makes a
// stranger smile back.
const ENTRY = "🥹";

/**
 * Rejects any text that would fail the bounty gate: it must hold 1 to 8
 * Unicode code points, sit on one line, and contain something visible.
 * The spread counts code points, so one emoji — an astral character —
 * counts as a single point rather than two UTF-16 code units.
 */
function checkEntryGate(text: string): void {
  const points = [...text].length;
  if (points < 1 || points > 8) {
    throw new Error(`Entry must be 1-8 code points, got ${points}`);
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("Entry must be a single line");
  }
  if (text.trim().length === 0) {
    throw new Error("Entry must not be whitespace-only");
  }
}

function main(): void {
  checkEntryGate(ENTRY);

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
}

main();
