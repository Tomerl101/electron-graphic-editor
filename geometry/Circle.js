
import {Shape} from './Shape.js';
import bresenhamCircle from '../algorithms/bresenhamCircle.js';

export class Circle extends Shape {
  static draw(x0, y0, x1, y1, putPixel){
    bresenhamCircle(x0, y0, x1, y1, putPixel);
  }
}