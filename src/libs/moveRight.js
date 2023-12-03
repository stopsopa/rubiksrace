import { BLANK, RED, GREEN, BLUE, WHITE, YELLOW, ORANGE, map, list } from "./constants.js";

/**
/bin/bash test.sh pages/children/rubiksrace/libs/moveRight.test.js
 */
export default function moveRight(m, row, clickedcol, blankcol) {
  const prow = m[row];
  for (let i = prow.length - 1; i >= 0; i -= 1) {
    if (i <= blankcol) {
      prow[i] = prow[i - 1];
    }

    if (i === clickedcol) {
      prow[i] = BLANK;

      break;
    }
  }
  return prow;
}
