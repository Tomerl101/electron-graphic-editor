import { Shape } from "./Shape.js";
import bresenhamLine from "../algorithms/bresenhamLine.js";
export class Line extends Shape {
  static draw(x1, y1, x2, y2, putPixel) {
    // putPixel(x1, y1, x2, y2);
    bresenhamLine(x1, y1, x2, y2, putPixel);
  }
}
