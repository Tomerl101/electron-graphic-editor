import drawLine from './algorithms/bresenhamLine.js';

class Editor {
  constructor() {
    this.canvas = document.querySelector("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.clickedMousePos = {x:null, y:null};
    this.shape = null;
    this.size = 1;

    this.setClickedMousePos = this.setClickedMousePos.bind(this);
    this.getCurrMousePos = this.getCurrMousePos.bind(this);
    this.clearCanvas = this.clearCanvas.bind(this);
    this.putPixel = this.putPixel.bind(this);
    this.draw = this.draw.bind(this);
  }

  putPixel(x,y){
    this.ctx.fillRect(x, y, this.size, this.size);
  }

  setClickedMousePos(evt) {
    const {posX, posY} = this.getCurrMousePos(evt);
    this.clickedMousePos.x = posX;
    this.clickedMousePos.y = posY
  }

  getCurrMousePos(evt) {
    var rect = this.canvas.getBoundingClientRect();
    return {
      posX: evt.clientX - rect.left,
      posY: evt.clientY - rect.top
    };
  }

  draw(e){
    const {posX: currPosX, posY: currPosY} = this.getCurrMousePos(e);
    const {x:clickedPosX, y:clickedPosY} = this.clickedMousePos;

    this.ctx.putImageData(this.lastState, 0, 0); //draw the last saved canvas image
    drawLine(clickedPosX,clickedPosY,currPosX,currPosY, this.putPixel);
  }

  clearCanvas(e) {
    e.preventDefault();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

}

export {Editor}