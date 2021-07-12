// from: https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
function square_collision(x1, y1, w1, h1, x2, y2, w2, h2)
{
	return x1 < x2 + w2 &&
	   x1 + w1 > x2 &&
	   y1 < y2 + h2 &&
	   y1 + h1 > y2;
}

//from: http://www.jeffreythompson.org/collision-detection/circle-rect.php
function circleRect(cx, cy, radius, rx, ry, rw, rh) {

  // temporary variables to set edges for testing
  var testX = cx;
  var testY = cy;

  // which edge is closest?
  if (cx < rx)         testX = rx;      // test left edge
  else if (cx > rx+rw) testX = rx+rw;   // right edge
  if (cy < ry)         testY = ry;      // top edge
  else if (cy > ry+rh) testY = ry+rh;   // bottom edge

  // get distance from closest edges
  var distX = cx-testX;
  var distY = cy-testY;
  var distance = Math.sqrt( (distX*distX) + (distY*distY) );

  // if the distance is less than the radius, collision!
  if (distance <= radius) {
    return true;
  } else {
	return false;
  }
}

function square_is_on_track(map, sx, sy)
{
	return (
		(
			(square_collision(
				map.track_square.x, map.track_square.y,
				map.track_square.w, map.track_square.h,
				sx, sy, map.square_width, map.square_height))
			|| (circleRect(
				map.track_arc_left.x, map.track_arc_left.y,
				map.track_arc_left.r,
				sx, sy,
				map.square_width, map.square_height))
			|| (circleRect(
				map.track_arc_right.x, map.track_arc_right.y,
				map.track_arc_right.r,
				sx, sy,
				map.square_width, map.square_height))
		)
		&& (!square_collision(
			map.infield_square.x, map.infield_square.y,
			map.infield_square.w, map.infield_square.h,
			sx, sy, map.square_width, map.square_height))
		&& (!circleRect(
			map.infield_arc_left.x, map.infield_arc_left.y,
			map.infield_arc_left.r,
			sx, sy,
			map.square_width, map.square_height))
		&& (!circleRect(
			map.infield_arc_right.x, map.infield_arc_right.y,
			map.infield_arc_right.r,
			sx, sy,
			map.square_width, map.square_height))
	);
}