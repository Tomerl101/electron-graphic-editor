
import {Shape} from './Shape.js';

export class Point extends Shape {
  static draw(x0,y0,x1, y1, putPixel){
    putPixel(x1, y1)
  }
}