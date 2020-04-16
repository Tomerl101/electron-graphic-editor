import { Shape } from "./Shape.js";
import { Line } from "./Line.js";
import cubicBezierCurve from "../algorithms/cubicBezierCurve.js";

export class Curve extends Shape {
  static controlPoints = [4];
  static shouldAddControlPoints = false;
  static controlPointsCount = 0;
  static canvasDrawingState = null;
  static stepSize = 0.01;

  static draw(x1, y1, x2, y2, putPixel, editor) {
    // this.canvasDrawingState = editor.lastDrawingState;

    let prevPoint;
    let currPoint;

    if (!this.shouldAddControlPoints) {
      // if no control points draw stright line and save canvas state
      this.canvasDrawingState = editor.lastDrawingState;
      Line.draw(x1, y1, x2, y2, putPixel);
      this.controlPoints[0] = { x: x1, y: y1 }; //save p0 point poistion (start point)
      this.controlPoints[3] = { x: x2, y: y2 }; //save p3 point position (end point)
      return;
    }

    if (this.shouldAddControlPoints) {
      if (this.controlPointsCount === 1) {
        this.controlPoints[1] = { x: x2, y: y2 }; //set control point p1 (control point1)
        this.controlPoints[2] = { x: x2, y: y2 }; //set control point p3 to be eq to p1 ti mimic the effect of only one control point
      } else {
        this.controlPoints[2] = { x: x2, y: y2 }; //update control point p3
      }
    }

    if (this.controlPointsCount > 2) {
      this.controlPointsCount = 0;
      this.shouldAddControlPoints = false;
      return;
    }

    editor.ctx.putImageData(this.canvasDrawingState, 0, 0);
    for (var t = 0; t <= 1; t += this.stepSize) {
      let [p0, p1, p2, p3] = this.controlPoints;
      currPoint = cubicBezierCurve(p0, p1, p2, p3, t);

      if (!prevPoint) {
        prevPoint = currPoint;
      }

      Line.draw(prevPoint.x, prevPoint.y, currPoint.x, currPoint.y, putPixel);
      prevPoint = currPoint;
    }
  }
}
