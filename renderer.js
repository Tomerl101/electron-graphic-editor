// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

// const editor = require('./Editor'); already required at index.html
import {Editor} from './Editor.js';
let editor = new Editor();

editor.canvas.addEventListener('contextmenu', clearCanvas, false);
editor.canvas.addEventListener('mousedown', startDraw, false);

function startDraw(e) {
  editor.lastState = editor.ctx.getImageData(0, 0, 800, 600);

  editor.setClickedMousePos(e);
  document.addEventListener('mousemove', editor.draw);
  document.onmouseup = function() {
    document.removeEventListener('mousemove', editor.draw);
    editor.canvas.onmouseup = null;
    editor.prevDraw = null;
  };
}

function clearCanvas(e) {
  const { canvas, ctx } = editor;
  e.preventDefault();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
