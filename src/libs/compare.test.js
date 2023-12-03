import compare from "./compare.js";

/**
/bin/bash test.sh pages/children/rubiksrace/libs/compare.test.js
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
const getMatrixSmall = () => [
  /*
   0  1  2  3  4  5  6
  */
  [23, 24, 25, 26, 27], // row: 0
  [30, 31, 32, 33, 34], // row: 1
  [37, 38, 39, 40, 41], // row: 2
  [44, 45, 46, 47, 48], // row: 3
  [51, 52, 53, 54, 55], // row: 4
];

describe("compare", () => {
  it("equal", (done) => {
    const b = getMatrix();
    const s = getMatrixSmall();

    expect(compare(s, b, (a, b) => a === b)).toEqual(true);

    done();
  });
  it("fail", (done) => {
    const b = getMatrix();
    const s = getMatrixSmall();

    s[3][3] = 77;

    expect(compare(s, b, (a, b) => a === b)).toEqual(false);

    done();
  });
});
