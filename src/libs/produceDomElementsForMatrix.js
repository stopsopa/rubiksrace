// problem with more colors: https://www.ultraboardgames.com/rubiks-cube/rubiks-race-game-rules.php
export default function produceDomElementsForMatrix(parent, rows, central, onClick) {
  parent.innerHTML = "";

  const tmp = [];

  for (let i = 0; i < rows; i += 1) {
    const row = [];

    for (let l = 0; l < rows; l += 1) {
      const element = document.createElement("div");

      parent.appendChild(element);

      row.push(element);
    }

    tmp.push(row);
  }

  return tmp;
}
