// export * as shapes from '../geometry';

import { Path } from "./Path.js";
import { Line } from "./Line.js";
import { Circle } from "./Circle.js";
import { Curve } from "./Curve.js";

const SHAPES = {
  path: Path,
  line: Line,
  circle: Circle,
  curve: Curve,
};

export default SHAPES;
