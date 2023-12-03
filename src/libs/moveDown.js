import { BLANK, RED, GREEN, BLUE, WHITE, YELLOW, ORANGE, map, list } from "./constants.js";

/**
/bin/bash test.sh pages/children/rubiksrace/libs/moveDown.test.js
 */
export default function moveDown(m, col, clickedrow, blankrow) {
  const pcol = [];
  for (let i = m.length - 1; i >= 0; i -= 1) {
    if (i <= blankrow) {
      m[i][col] = m?.[i - 1]?.[col];
    }

    pcol[i] = m[i][col];

    if (i === clickedrow) {
      pcol[i] = m[i][col] = BLANK;

      break;
    }
  }
  return pcol;
}
