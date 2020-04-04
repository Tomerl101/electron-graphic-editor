
export default function bresenhamCircle (x_center, y_center, x1, y1, putPixel) {
  x_center |= 0; y_center |= 0 ; x1 |=0; y1 |= 0
  let radius = getDistance(x_center, y_center, x1, y1);
  let x = 0, y = radius;
  let p = 3 - (2 * radius);
  let i = 1;

  while (x < y) {
    plot_circle_points(x, y, x_center, y_center, putPixel)

    if (p < 0) {
      p = p + (4 * x) + 6;
    }
    else {
      plot_circle_points(x+1, y, x_center, y_center, putPixel)
      p = p  + 4*(x-y) + 10;
      y--;
    }
    x++;
  }
};

function plot_circle_points(x, y, x_center, y_center, putPixel) {
  putPixel(x_center + x, y_center + y);
  putPixel(x_center - x, y_center + y);
  putPixel(x_center + x, y_center - y);
  putPixel(x_center - x, y_center - y);
  putPixel(x_center + y, y_center + x);
  putPixel(x_center - y, y_center + x);
  putPixel(x_center + y, y_center - x);
  putPixel(x_center - y, y_center - x)
}

function getDistance( x1, y1, x2, y2 ) {
  let xs = x2 - x1;
  let ys = y2 - y1;

	xs *= xs;
	ys *= ys;

	return Math.sqrt( xs + ys );
};