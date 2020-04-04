
import {Shape} from './Shape.js';
import {Line} from './Line.js';

// use the line draw algorithm to draw path
export class Path extends Shape {
  static draw(x0,y0,x1, y1, putPixel, editor){
    Line.draw(x0,y0,x1, y1, putPixel);
    editor.clickedMousePos.x = x1;
    editor.clickedMousePos.y = y1;
  }
}