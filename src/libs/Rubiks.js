import log from "./log.js";

import thFactory from "./thFactory.js";

import Matrix from "./Matrix.js";

import resizeEvent from "./resizeEvent.js";

import Modal from "./Modal.js";

import Confetti from "./Confetti.js";

import compare from "./compare.js";

import SoundsRandom from "./SoundsRandom.js";

import SoundsSet from "./SoundsSet.js";

import "./Rubiks.scss";

const th = thFactory("Rubiks.js");

function Rubiks(parent, opt) {
  this.opt = {
    // html: ``,
    getImage: async (imagebox) => {
      imagebox.innerHTML = "";
      const img = document.createElement("img");
      img.src = `https://stopsopa.github.io/sounds/img/youwin.jpg`;
      imagebox.appendChild(img);
    },
    stateGet: (key) => {},
    stateSet: (key, value) => {},
    ...opt,
  };

  this.player1 = this.opt.stateGet("player1") || "";
  this.player2 = this.opt.stateGet("player2") || "";

  this.parent = parent;

  if (this.opt.stateGet("mode") === "one") {
    this.parent.classList.add("single");
  } else {
    this.parent.classList.remove("single");
  }

  this.rows = 5;

  this.confetti = new Confetti();

  this.soundWin = new SoundsRandom([
    "https://stopsopa.github.io/sounds/win/ES_Kids_Hooray.mp3",
    "https://stopsopa.github.io/sounds/win/biiiii.wav",
    "https://stopsopa.github.io/sounds/win/ES_Children_Voice_Clip_5.mp3",
    "https://stopsopa.github.io/sounds/win/ES_Kids_Boo.mp3",
    "https://stopsopa.github.io/sounds/win/hiya-win.wav",
    "https://stopsopa.github.io/sounds/win/ES_Human_Voice_Clip_165.mp3",
    "https://stopsopa.github.io/sounds/win/gibberish-talk.wav",
    "https://stopsopa.github.io/sounds/win/ES_Kids_Yeah_1.mp3",
    "https://stopsopa.github.io/sounds/win/ES_Human_Voice_Clip_190.mp3",
    "https://stopsopa.github.io/sounds/win/ahooo.wav",
    "https://stopsopa.github.io/sounds/win/animals-win-group.wav",
    "https://stopsopa.github.io/sounds/win/hiya-2259.wav",
  ]);

  this.soundAction = new SoundsSet({
    "pop-pff": "https://stopsopa.github.io/sounds/click/pop-low.wav",
    "pop-funny": "https://stopsopa.github.io/sounds/click/mixkit-electric-pop-2365.wav",
    pop: "https://stopsopa.github.io/sounds/click/QKTA234-pop.mp3",
    "pop-high": "https://stopsopa.github.io/sounds/click/pop-high.wav",
    arcade1: "https://stopsopa.github.io/sounds/click/index.wav",
    arcade2: "https://stopsopa.github.io/sounds/click/506288-SBsfi2-Simple_Arcade_Select_002.mp3",
    pruiii: "https://stopsopa.github.io/sounds/click/pruiii.wav",
  });

  this.init();
}

Rubiks.prototype.init = function () {
  this.unmount();

  this.unmountEvents = [];

  this.parent.classList.add("rubiks");

  this.modalOptions = new Modal(this.parent.querySelector(`dialog[data-function="options"]`));

  const top = this.parent.querySelector(".top");
  this.mt = new Matrix("top", top, this.rows);

  const mid = this.parent.querySelector(".mid");
  this.mm = new Matrix("mid", mid, this.rows - 2, true);

  const bot = this.parent.querySelector(".bot");
  this.mb = new Matrix("bot", bot, this.rows, false, () => this.checkPlayer1());

  const { internalEvent, unmountEvent } = resizeEvent(this.parent, () => {
    this.mt.resize();
    this.mm.resize();
    this.mb.resize();
  });

  this.resizeEvent = internalEvent;

  this.unmountResize = unmountEvent;

  // keybindings
  {
    const event = (e) => {
      log("e.key", e.key, typeof e.key, JSON.stringify({ a: e.key }));
      switch (e.key) {
        // case "1":
        //   this.checkPlayer1(true);
        //   break;
        // case "2":
        //   this.checkPlayer2(true);
        //   break;
        // case "o":
        //   this.optionsOpen("opt");
        //   break;
        // case "p":
        //   this.optionsOpen("win");
        //   break;
        // case "r":
        //   this.init();
        //   this.optionsClose();
        //   break;
        // case "z":
        //   this.confetti.up();
        //   this.soundWin.randomPlay();
        //   break;
        case "a":
          break;
      }
    };
    document.addEventListener("keydown", event);
    this.unmountEvents.push(() => {
      document.removeEventListener("keydown", event);
    });
  }

  {
    // in this case parent is <dialog> element, but can be really anything you like
    // it's done using event delegation
    const event = (e) => {
      if (e.target.matches(`input[type="radio"][name="mode"]`)) {
        this.modeSwitch(e.target.value === "single");

        this.opt.stateSet("mode", e.target.value === "single" ? "one" : "two");
      }
    };
    this.parent.addEventListener("click", event);
    this.unmountEvents.push(() => {
      this.parent.removeEventListener("click", event);
    });
  }

  {
    // in this case parent is <dialog> element, but can be really anything you like
    // it's done using event delegation
    const event = (e) => {
      if (e.target.matches(`.name`)) {
        const prop = e.target.getAttribute("name");

        this[prop] = e.target.value;

        this.opt.stateSet(prop, e.target.value);
      }
    };
    this.parent.addEventListener("input", event);
    this.unmountEvents.push(() => {
      this.parent.removeEventListener("input", event);
    });
  }

  {
    // in this case parent is <dialog> element, but can be really anything you like
    // it's done using event delegation
    const event = (e) => {
      if (e.target.matches(`input[type="radio"][name="mode"]`)) {
        this.modeSwitch(e.target.value === "single");
      }
    };
    this.parent.addEventListener("click", event);
    this.unmountEvents.push(() => {
      this.parent.removeEventListener("click", event);
    });
  }

  {
    // in this case parent is <dialog> element, but can be really anything you like
    // it's done using event delegation
    const event = (e) => {
      if (e.target.matches(`button[data-function="options"]`)) {
        this.optionsOpen("opt");
      }
    };
    this.parent.addEventListener("click", event);
    this.unmountEvents.push(() => {
      this.parent.removeEventListener("click", event);
    });
  }

  {
    // in this case parent is <dialog> element, but can be really anything you like
    // it's done using event delegation
    const event = (e) => {
      if (e.target.matches(`dialog[data-function="options"] button[data-function="close"]`)) {
        this.optionsClose();
      }
    };
    this.parent.addEventListener("click", event);
    this.unmountEvents.push(() => {
      this.parent.removeEventListener("click", event);
    });
  }

  {
    // in this case parent is <dialog> element, but can be really anything you like
    // it's done using event delegation
    const event = (e) => {
      if (e.target.matches(`dialog[data-function="options"] button[data-function="shuffle"]`)) {
        this.init();
        this.optionsClose();
      }
    };
    this.parent.addEventListener("click", event);
    this.unmountEvents.push(() => {
      this.parent.removeEventListener("click", event);
    });
  }
};
Rubiks.prototype.checkPlayer1 = function (force = false) {
  if (compareElements(this.mm.m, this.mb.m) || force) {
    this.optionsOpen("win");

    this.confetti.up();

    this.soundWin.randomPlay();

    if (this.modeIsSingle()) {
    } else {
    }
  }
};
Rubiks.prototype.checkPlayer2 = function (force = false) {
  if (compareElements(this.mm.m, this.mt.m) || force) {
    this.optionsOpen("win");

    this.parent.querySelector("dialog").classList.add("rubiks-race-canvas-180");

    this.confetti.down();

    this.soundWin.randomPlay();
  }
};
Rubiks.prototype.showDialogBlock = function (block) {
  const blocks = ["opt", "win"];

  if (!blocks.includes(block)) {
    throw this.th(`showDialogBlock() block >${block}< is not on the list of available blocks >${blocks.join(",")}<`);
  }

  blocks.forEach((b) => {
    this.parent.querySelector(`.${b}`).style.display = b === block ? "block" : "none";
  });

  document.querySelector('[data-function="close"]').style.display = block === "opt" ? "block" : "none";
};

Rubiks.prototype.optionsOpen = function (block) {
  this.parent.querySelector("dialog").classList.remove("rubiks-race-canvas-180");

  this.showDialogBlock(block);

  this.parent.querySelector(
    `input[type="radio"][name="mode"][value="${this.modeIsSingle() ? "single" : "double"}"]`
  ).checked = true;

  // log(`this.parent.querySelector('[name="player1"]')`, this.player1);
  // log(`this.parent.querySelector('[name="player2"]')`, this.player2);

  this.parent.querySelector('[name="player1"]').value = this.player1;
  this.parent.querySelector('[name="player2"]').value = this.player2;

  if (block === "win") {
    this.opt.getImage(this.parent.querySelector(".win  .image"));
  }

  this.modalOptions.show();
};
Rubiks.prototype.optionsClose = function () {
  this.modalOptions.hide();
};

Rubiks.prototype.unmount = function (empty = false) {
  if (typeof this.unmountResize === "function") {
    this.unmountResize();
  }

  if (Array.isArray(this.unmountEvents)) {
    let unmount;
    while ((unmount = this.unmountEvents.shift())) {
      unmount();
    }
  }

  this.mt && this.mt.unmount();
  this.mm && this.mm.unmount();
  this.mb && this.mb.unmount();

  if (empty) {
    this.parent.innerHTML = "";
  }

  this.parent.classList.remove("rubiks");
};

Rubiks.prototype.modeIsSingle = function () {
  return this.parent.classList.contains("single");
};
Rubiks.prototype.modeSwitch = function (single = true) {
  this.parent.classList[single ? "add" : "remove"]("single");

  this.resizeEvent();
};

Rubiks.prototype.changeRows = function (rows) {
  if (!/^\d+$/.test(rows)) {
    throw th(`rows don't match \\d+ regex`);
  }

  rows = parseInt(rows, 10);

  if (rows < 5) {
    throw th(`rows shouldn't be smaller than 3`);
  }

  if (rows > 10) {
    throw th(`rows shouldn't be bigger than 10`);
  }

  if ((rows + 1) % 2) {
    throw th(`rows should be odd, but it is >${rows}<`);
  }

  this.rows = rows;
};

function compareElements(small, big) {
  return compare(small, big, (a, b) => {
    if (a === 0 || b === 0) {
      return a === b;
    } else {
      return a.getAttribute("class") === b.getAttribute("class");
    }
  });
}

export default Rubiks;
