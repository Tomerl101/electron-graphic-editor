// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

import { Editor } from "./Editor.js";
const editor = new Editor();
const WIDTH = 1024;
const HEIGHT = 768;

editor.canvas.addEventListener("contextmenu", editor.clearCanvas, false);
editor.canvas.addEventListener("mousedown", startDraw, false);

document
  .querySelector("#drawPathBtn")
  .addEventListener("click", () => editor.setShape("path"));

document
  .querySelector("#drawLineBtn")
  .addEventListener("click", () => editor.setShape("line"));

document
  .querySelector("#drawCircleBtn")
  .addEventListener("click", () => editor.setShape("circle"));

document
  .querySelector("#drawCurveBtn")
  .addEventListener("click", () => editor.setShape("curve"));

function startDraw(e) {
  editor.lastDrawingState = editor.ctx.getImageData(0, 0, WIDTH, HEIGHT);

  editor.setClickedMousePos(e);
  document.addEventListener("mousemove", editor.draw);
  document.onmouseup = function () {
    if (editor.shapeName === "curve") {
      editor.shapeRef.shouldAddControlPoints = true;
      editor.shapeRef.controlPointsCount++;
      if (editor.shapeRef.controlPointsCount <= 2) {
        return;
      }
    }

    document.removeEventListener("mousemove", editor.draw);
    editor.canvas.onmouseup = null;
    editor.prevDraw = null;
  };
}
