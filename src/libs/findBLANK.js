import { BLANK, RED, GREEN, BLUE, WHITE, YELLOW, ORANGE, map, list } from "./constants.js";

export default function findBLANK(m) {
  for (let r = 0, rl = m.length; r < rl; r += 1) {
    const row = m[r];
    for (let c = 0, cl = row.length; c < cl; c += 1) {
      if (row[c] === BLANK) {
        return {
          row: r,
          col: c,
        };
      }
    }
  }
}
