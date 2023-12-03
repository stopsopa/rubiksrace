import log from "./log.js";

import isElement from "./isElement.js";

import Rubiks from "./Rubiks.js";

import thFactory from "./thFactory.js";

const th = thFactory("mounter.js");

let mountedDomElements = [];

/**
 * This layer is here for few things
 * - to prevent double mounting component on the same DOM element
 * - to trigger unmount functionality only on mounted element
 */
function mounter(element, ...rest) {
  if (!isElement(element)) {
    throw th(`element is not DOM element`);
  }

  if (mountedDomElements.find((e) => e.element === element)) {
    throw th(`element already mounted`, element);
  }

  const instance = new Rubiks(element, ...rest);

  function unmount() {
    log("unmount", element);

    instance.unmount();

    mountedDomElements = mountedDomElements.filter((x) => x.element !== element);
  }

  mountedDomElements.push({
    element,
    unmount,
  });

  return instance;
}

mounter.unmount = (element) => {
  const found = mountedDomElements.find((e) => e.element === element);

  if (found) {
    found.unmount();
  }
};

export default mounter;
