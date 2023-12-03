import { BLANK, RED, GREEN, BLUE, WHITE, YELLOW, ORANGE, map, list } from "./constants.js";

export default function moveUp(m, col, clickedrow, blankrow) {
  const pcol = [];
  for (let i = 0, l = m.length; i < l; i += 1) {
    if (i >= blankrow) {
      m[i][col] = m?.[i + 1]?.[col];
    }

    pcol[i] = m[i][col];

    if (i === clickedrow) {
      pcol[i] = m[i][col] = BLANK;

      break;
    }
  }
  return pcol;
}
