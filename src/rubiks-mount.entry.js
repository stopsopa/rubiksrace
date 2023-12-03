import { GiphyFetch } from "@giphy/js-fetch-api";

if (!env("GIPHY_API_KEY")) {
  throw new Error(`rubiks-mount.entry.js error: GIPHY_API_KEY not defined`);
}

const GIPHY_API_KEY = env("GIPHY_API_KEY");

// https://developers.giphy.com/docs/sdk/#web
// g(GIPHY SDK for Web)
// Bitwarden
const gf = new GiphyFetch(GIPHY_API_KEY);

async function getImage(imagebox) {
  imagebox.innerHTML = "";

  const timestamp = new Date().getTime();

  const { data } = await gf.random({ tag: "you win meme", cacheBuster: timestamp });

  const src = data.images.fixed_height_downsampled.url;

  const img = document.createElement("img");

  img.src = src;

  imagebox.appendChild(img);
}

window.instance = rubiks(document.querySelector(".rubiks"), {
  getImage,
  stateSet: (key, value) => localStorage.setItem(`rubiks_race_${key}`, value),
  stateGet: (key) => localStorage.getItem(`rubiks_race_${key}`),
});

console.log("window.instance", window.instance);

// from: https://stackoverflow.com/a/52201924
"gesturestart gesturechange gestureend".split(" ").forEach((n) => {
  document.addEventListener(n, function (e) {
    e.preventDefault();
    document.body.style.zoom = 0.99;
  });
});
