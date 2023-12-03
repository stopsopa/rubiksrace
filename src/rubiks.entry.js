import rubiks from "./libs/mounter.js";

{
  let noconflict = window.rubiks;
  rubiks.noconflict = function () {
    window.rubiks = noconflict;
    return rubiks;
  };
  window.rubiks = rubiks;
}
