import { BLANK, RED, GREEN, BLUE, WHITE, YELLOW, ORANGE, map, list } from "./constants.js";

export default function moveLeft(m, row, clickedcol, blankcol) {
  const prow = m[row];
  for (let i = 0, l = prow.length; i < l; i += 1) {
    if (i >= blankcol) {
      prow[i] = prow[i + 1];
    }

    if (i === clickedcol) {
      prow[i] = BLANK;

      break;
    }
  }
  return prow;
}
