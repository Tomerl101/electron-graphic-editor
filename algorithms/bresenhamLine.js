export default function bresehamLine(x1, y1, x2, y2, putPixel) {
  x1 |= 0;
  y1 |= 0;
  x2 |= 0;
  y2 |= 0; //no float values!
  let dx = Math.abs(x2 - x1);
  let dy = Math.abs(y2 - y1);
  let sx = x1 < x2 ? 1 : -1; //direction to move
  let sy = y1 < y2 ? 1 : -1;
  let p = dx - dy;
  // let p = 0.5

  while (x1 !== x2 || y1 !== y2) {
    //we stop when we get to the last point of the dominant axis
    let p_next = 2 * p;

    if (p_next >= dy * -1) {
      p -= dy;
      x1 += sx;
      putPixel(x1, y1);
    }

    if (p_next <= dx) {
      p += dx;
      y1 += sy;
      putPixel(x1, y1);
    }
  }
}
