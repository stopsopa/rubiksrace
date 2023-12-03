import moveRight from "./moveRight.js";

import { BLANK, RED, GREEN, BLUE, WHITE, YELLOW, ORANGE, map, list } from "./constants.js";

/**
/bin/bash test.sh pages/children/rubiksrace/libs/moveRight.test.js
 */

const getMatrix = () => [
  /*
   0  1  2  3  4  5  6
  */
  [15, 16, 17, 18, 19, 20, 21], // row: 0
  [22, 23, 24, 25, 26, 27, 28], // row: 1
  [29, 30, 31, 32, 33, 34, 35], // row: 2
  [36, 37, 38, 39, 40, 41, 42], // row: 3
  [43, 44, 45, 46, 47, 48, 49], // row: 4
  [50, 51, 52, 53, 54, 55, 56], // row: 5
  [57, 58, 59, 60, 61, 62, 63], // row: 6
];

describe("moveRight", () => {
  it("process line", (done) => {
    const m = getMatrix();

    // we already have blankcol in Matrix.prototype.mountEvents
    // because it was found with findBLANK()
    // that's why we will feed it to moveRight in last arg too
    // to avoid looking for it again
    const blankcol = 5;

    const col = 2;

    m[col][blankcol] = BLANK;

    const row = moveRight(m, col, 1, blankcol);

    // console.log(JSON.stringify(row));

    expect(row).toEqual([29, 0, 30, 31, 32, 33, 35]);

    // console.log(JSON.stringify(m));

    expect(m).toEqual([
      [15, 16, 17, 18, 19, 20, 21],
      [22, 23, 24, 25, 26, 27, 28],
      [29, 0, 30, 31, 32, 33, 35],
      [36, 37, 38, 39, 40, 41, 42],
      [43, 44, 45, 46, 47, 48, 49],
      [50, 51, 52, 53, 54, 55, 56],
      [57, 58, 59, 60, 61, 62, 63],
    ]);

    done();
  });
});
