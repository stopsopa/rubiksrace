import thFactory from "./thFactory.js";

import isElement from "./isElement.js";

const th = thFactory(`Modal.js`);

// https://blog.webdevsimplified.com/2023-04/html-dialog/
export default function Modal(element) {
  if (!isElement(element)) {
    throw th(`element is not a DOM element`);
  }

  this.element = element;
}

Modal.prototype.show = function () {
  this.element.showModal();
};
Modal.prototype.hide = function () {
  this.element.close();
};
