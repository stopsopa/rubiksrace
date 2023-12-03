// https://www.kirilv.com/canvas-confetti/
import confetti from "canvas-confetti";

window.confetti = confetti;

const cls = `rubiks-race-canvas-180`;

function effect() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
  });
}

export default function Confetti() {}

Confetti.prototype.up = function () {
  document.body.classList.remove(cls);
  effect();
};

Confetti.prototype.down = function () {
  document.body.classList.add(cls);
  effect();
};
