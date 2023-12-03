function SoundsRandom(list) {
  this.list = list;
  this.length = list.length;

  this.preloadedRandom;
  this.preloadedNext = -1;
  this.preloadedCache = {};

  this.randomPreload();
  this.nextPreload();
}

SoundsRandom.prototype.nextPreload = function () {
  this.preloadedNext += 1;
  if (!this.list[this.preloadedNext]) {
    this.preloadedNext = 0;
  }
  this._preaload(this.list[this.preloadedNext]);
};

SoundsRandom.prototype.randomPreload = function () {
  this.preloadedRandom = getRandom(this.list);
  this._preaload(this.preloadedRandom);
};

SoundsRandom.prototype.randomPlay = function () {
  var audio = new Audio(this.preloadedRandom);
  audio.play();
  this.randomPreload();
};

SoundsRandom.prototype.nextPlay = function () {
  var audio = new Audio(this.list[this.preloadedNext]);
  audio.play();
  this.nextPreload();
};

SoundsRandom.prototype._preaload = function (url) {
  if (!this.preloadedCache[url]) {
    this.preloadedCache[url] = fetch(url);
  }
};

function getRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

export default SoundsRandom;
