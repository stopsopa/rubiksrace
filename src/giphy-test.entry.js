import { GiphyFetch } from "@giphy/js-fetch-api";

if (!env("GIPHY_API_KEY")) {
  throw new Error(`giphy-test.entry.js error: GIPHY_API_KEY not defined`);
}

const GIPHY_API_KEY = env("GIPHY_API_KEY");

// https://developers.giphy.com/docs/sdk/#web
// g(GIPHY SDK for Web)
// Bitwarden
const gf = new GiphyFetch(GIPHY_API_KEY);

async function getImage() {
  const timestamp = new Date().getTime();

  const { data } = await gf.random({ tag: "you won meme", cacheBuster: timestamp });

  return data.images.fixed_height_downsampled.url;
}
// async function getImage() {
//   return "https://stopsopa.github.io/sounds/img/youwin.jpg";
// }

const button = document.querySelector("button");

const box = document.querySelector("#box");

button.addEventListener("click", async (e) => {
  const target = e.target;

  target.setAttribute("disabled", "disabled");

  const url = await getImage();

  box.innerHTML = "";

  const img = document.createElement("img");
  img.src = url;
  box.appendChild(img);

  target.removeAttribute("disabled");
});
