// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

import { Editor } from "../Editor.js";
const editor = new Editor();

editor.canvas.addEventListener("contextmenu", editor.clearCanvas, false);
editor.canvas.addEventListener("mousedown", startDraw, false);

document.querySelectorAll(".shapeBtn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    selectShape(e);
  });
});

function selectShape(e) {
  const selectedShape = e.target;
  const buttons = Array.from(document.querySelectorAll(".shapeBtn"));
  const activeBtn = buttons.find((btn) => btn.classList.contains("active"));
  activeBtn.classList.remove("active");
  selectedShape.classList.add("active");
  editor.setShape(selectedShape.id);
}

function startDraw(e) {
  editor.lastDrawingState = editor.ctx.getImageData(0, 0, 800, 600);

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
