export default function bresehamLine(x1, y1, x2, y2, putPixel) {
    x1 |= 0; y1 |= 0; x2 |= 0; y2 |= 0; //no float values!
    let dx = Math.abs(x2 - x1);
    let dy = Math.abs(y2 - y1);
    let sx = x1 < x2 ? 1 : -1; //direction to move
    let sy = y1 < y2 ? 1 : -1;
    let err = dx - dy;
    // let err = (2 * dy) - dx;

    while (x1 != x2 || y1 != y2) {  //we stop when we get to the last point of the dominant axis
      var e2 = 2 * err;

      // console.log('before ' +err);
      // if(err >= 0){

      //   x1+= sx;
      //   y1+= sy
      //   err = err + (2 * dy) - (2 * dx)
      // }

      // if(err < 0 ){
      //   x1 += sx
      //   err = err + (2 * dy)
      // }

      if (e2 > (dy * -1)) {
        err -= dy;
        x1 += sx;
      }

      if (e2 < dx) {
        err += dx;
        y1 += sy;
      }

      putPixel(x1,y1);

  }
};