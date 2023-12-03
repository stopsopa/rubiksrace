import isObject from "./isObject.js";

const th = (msg) => new Error(`SoundsSet error: ${msg}`);

function SoundsSet(list) {
  if (!isObject(list)) {
    throw th(`list is not an object`);
  }

  if (Object.keys(list).length === 0) {
    throw th(`list should have more than 0 elements`);
  }

  this.list = list;

  Object.values(this.list).forEach((url) => fetch(url));
}

SoundsSet.prototype.randomPlay = function (name) {
  const url = this.list[name];

  if (typeof url !== "string") {
    throw th(`found url is not a string`);
  }

  var audio = new Audio(url);
  audio.play();
};

SoundsSet.prototype.get = function () {
  return this.list;
};

export default SoundsSet;
