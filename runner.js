function newRunner(id, speed)
{
	var runner = {
		id: id,
		speed: speed,
		laps_complete: 0,
		x_square: 0,
		y_square: 0,
		moves: 0,
		move: function()
		{
			this.moves += this.speed;
			if (this.moves >= 1000)
			{
				this.moves -= 1000;
				
				// get the direction from the center of the track
				var current_x_pos = this.x_square*map.square_width;
				var current_y_pos = this.y_square*map.square_height;
				var current_angle = point_direction(map.canvas.width/2, map.canvas.height/2, current_x_pos, current_y_pos);
				var distance_from_center = point_distance(current_x_pos, current_y_pos, map.canvas.width/2, map.canvas.height/2);
				
				// rotate the current position 45 degrees around the center of the track to find the target position.
				// this won't be perfect, but it should be find to help us select a "best" square to move to.
				var target_angle = current_angle + 45;
				var target_x_pos = map.canvas.width/2 + Math.cos(target_angle/180*Math.PI);
				var target_y_pos = map.canvas.width/2 - Math.sin(target_angle/180*Math.PI);
				
				
				// we shouldn't need to check whether the surrounding squares are within the array, since the track does not extend to the very edge of the map.
			}
		}
	}
	return runner;
}
/*
Game runs at 15 fps
Average runner should move 3 squares per second
A race will be 10 laps
The fastest runner should beat the slowest runner by about 150 squares

Average speed should be 1/15*3 = 1/5 = 0.2
*/