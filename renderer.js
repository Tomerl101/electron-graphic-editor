// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

// const editor = require('./Editor'); already required at index.html
const SHAPES = {PATH: "path", LINE : "line", CIRCLE: "circle"};
import {Editor} from './Editor.js';
let editor = new Editor();

editor.canvas.addEventListener('contextmenu', editor.clearCanvas, false);
editor.canvas.addEventListener('mousedown', startDraw, false);

document.querySelector('#drawPathBtn').addEventListener('click', ()=>editor.setShape(SHAPES.PATH));
document.querySelector('#drawLineBtn').addEventListener('click', ()=>editor.setShape(SHAPES.LINE));
document.querySelector('#drawCircleBtn').addEventListener('click', ()=>editor.setShape(SHAPES.CIRCLE));


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