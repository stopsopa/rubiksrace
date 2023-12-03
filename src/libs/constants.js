// import { BLANK, RED, GREEN, BLUE, WHITE, YELLOW, ORANGE, map, list } from "./constants.js";

export const BLANK = 0;
export const RED = 1;
export const GREEN = 2;
export const BLUE = 3;
export const WHITE = 4;
export const YELLOW = 5;
export const ORANGE = 6;

export const list = [RED, GREEN, BLUE, WHITE, YELLOW, ORANGE];

export const map = {
  [`BLANK`]: BLANK,
  [`RED`]: RED,
  [`GREEN`]: GREEN,
  [`BLUE`]: BLUE,
  [`WHITE`]: WHITE,
  [`YELLOW`]: YELLOW,
  [`ORANGE`]: ORANGE,
};

Object.entries(map).forEach(([key, value]) => {
  map[value] = key;
});
