import { BLANK, list } from "./constants.js";

import shuffleArray from "./shuffleArray.js";

export default function prepareRandomizedColorsSet(rows, central) {
  const tmp = [];

  let ofEachColor = 4;

  if (central) {
    ofEachColor -= 1;
  }

  for (let i = 0, l = list.length; i < l; i += 1) {
    const currentColor = list[i];

    for (let k = 0; k < ofEachColor; k += 1) {
      tmp.push(currentColor);
    }
  }

  if (!central) {
    tmp.push(BLANK);
  }

  shuffleArray(tmp);

  return tmp;
}
