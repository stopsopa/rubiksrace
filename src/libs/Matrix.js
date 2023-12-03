import log from "./log.js";

import isElement from "./isElement.js";

import produceDomElementsForMatrix from "./produceDomElementsForMatrix.js";

import prepareRandomizedColorsSet from "./prepareRandomizedColorsSet.js";

import getAbsoluteHeightOfElement from "./getAbsoluteHeightOfElement.js";

import thFactory from "./thFactory.js";

import { BLANK, RED, GREEN, BLUE, WHITE, YELLOW, ORANGE, map, list } from "./constants.js";

import moveLeft from "./moveLeft.js";

import moveRight from "./moveRight.js";

import moveUp from "./moveUp.js";

import moveDown from "./moveDown.js";

import findBLANK from "./findBLANK.js";

function Matrix(name, element, rows, central = false, compare) {
  this.name = name;

  this.element = element;

  this.parent = element.children[0].children[0];

  this.rows = rows;

  this.central = central;

  this.compare = compare;

  this.th = thFactory(`Matrix.js ${name}`);

  if (!isElement(element)) {
    throw this.th("provided element is not a DOM element");
  }

  this.init();
}

Matrix.prototype.init = function () {
  this.m = produceDomElementsForMatrix(this.parent, this.rows, this.central);

  this.randomizeColors();

  this.updateTopLeft();

  if (!this.central) {
    this.mountEvents();
  }
};

Matrix.prototype.resize = function () {
  const height = getAbsoluteHeightOfElement(this.element);

  const boxSpan = Math.floor(height / this.rows);
  this.boxSpan = boxSpan;
  // this.element.style.setProperty(`--box-${this.name}-span`, `${boxSpan}px`);

  const boxMargin = Math.floor(boxSpan * 0.1);
  this.boxMargin = boxMargin;
  this.element.style.setProperty(`--box-${this.name}-margin`, `${boxMargin}px`);

  const boxWidth = boxSpan - boxMargin;
  this.boxWidth = boxWidth;
  this.element.style.setProperty(`--box-${this.name}-width`, `${boxWidth}px`);

  this.updateTopLeft();
};

Matrix.prototype.iterate = function (action) {
  for (let r = 0, rl = this.m.length; r < rl; r += 1) {
    const row = this.m[r];
    for (let c = 0, cl = row.length; c < cl; c += 1) {
      const result = action(row[c], r, c);
      if (!result) {
        // break iterate if false returned
        return;
      }
    }
  }
};

Matrix.prototype.randomizeColors = function () {
  const well = prepareRandomizedColorsSet(this.rows, this.central);

  this.iterate((element, row, col) => {
    const color = well.shift();
    if (color === BLANK) {
      this.parent.removeChild(this.m[row][col]);
      this.m[row][col] = BLANK;
    } else {
      element.classList.add(map[color]);
    }
    return true;
  });
};

Matrix.prototype.updateTopLeft = function () {
  if (!Number.isInteger(this.boxSpan)) {
    return;
  }
  this.iterate((element, row, col) => {
    if (element) {
      element.style.top = `${row * this.boxSpan}px`;
      element.dataset.row = row;
      element.setAttribute("data-row", row);

      element.style.left = `${col * this.boxSpan}px`;
      element.dataset.col = col;
      element.setAttribute("data-col", col);
    }
    return true;
  });
};

Matrix.prototype.mountEvents = function () {
  const event = (e) => {
    e.preventDefault();
    const target = e.target;

    // const clickedcolor = target.getAttribute("class");
    const clickedrow = parseInt(target.dataset.row, 10);
    const clickedcol = parseInt(target.dataset.col, 10);

    const { row: blankrow, col: blankcol } = findBLANK(this.m);

    // log("found: ", JSON.stringify({ clickedrow, clickedcol, blankrow, blankcol }));

    if (clickedrow === blankrow) {
      if (clickedcol > blankcol) {
        moveLeft(this.m, clickedrow, clickedcol, blankcol);
      } else {
        moveRight(this.m, clickedrow, clickedcol, blankcol);
      }
    }
    if (clickedcol === blankcol) {
      if (clickedrow > blankrow) {
        moveUp(this.m, clickedcol, clickedrow, blankrow);
      } else {
        moveDown(this.m, clickedcol, clickedrow, blankrow);
      }
    }

    this.updateTopLeft();

    this.compare();
  };

  this.parent.addEventListener("touchstart", event);
  this.parent.addEventListener("mousedown", event);

  this.event = event;
};

Matrix.prototype.unmount = function () {
  this.parent.removeEventListener("touchstart", this.event);
  this.parent.removeEventListener("mousedown", this.event);
};

export default Matrix;
