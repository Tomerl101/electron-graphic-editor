import SHAPES from "./geometry/index.js";
import { Circle } from "./geometry/Circle.js";

class Editor {
  constructor() {
    this.canvas = document.querySelector("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.clickedMousePos = { x: null, y: null };
    this.shapeRef = SHAPES.path; //set path shape as default shape to draw
    this.shapeName = "path";
    this.color = "#000000";
    this.brushSize = 1; // pixel size to draw
    this.lastDrawingState = null;
    this.lastDrawingState = this.ctx.getImageData(0, 0, 800, 600);

    //functions binding
    this.setClickedMousePos = this.setClickedMousePos.bind(this);
    this.getCurrMousePos = this.getCurrMousePos.bind(this);
    this.clearCanvas = this.clearCanvas.bind(this);
    this.putPixel = this.putPixel.bind(this);
    this.draw = this.draw.bind(this);
  }

  putPixel(x, y) {
    this.ctx.fillRect(x, y, this.brushSize, this.brushSize);
  }

  setColor(color) {
    this.ctx.fillStyle = color;
  }

  setClickedMousePos(evt) {
    const { posX, posY } = this.getCurrMousePos(evt);
    this.clickedMousePos.x = posX;
    this.clickedMousePos.y = posY;
  }

  getCurrMousePos(evt) {
    var rect = this.canvas.getBoundingClientRect();
    return {
      posX: Math.round(evt.clientX - rect.left),
      posY: Math.round(evt.clientY - rect.top),
    };
  }

  draw(e) {
    const { posX: currPosX, posY: currPosY } = this.getCurrMousePos(e);
    const { x: clickedPosX, y: clickedPosY } = this.clickedMousePos;

    if (this.shapeName !== "path") {
      this.ctx.putImageData(this.lastDrawingState, 0, 0); //redraw the last saved canvas image
    }

    this.shapeRef.draw(
      clickedPosX,
      clickedPosY,
      currPosX,
      currPosY,
      this.putPixel,
      this
    );
  }

  clearCanvas(e) {
    e.preventDefault();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  setShape(shape) {
    this.shapeName = shape;
    this.shapeRef = SHAPES[shape];
  }
}

export { Editor };
