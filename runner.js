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
			if (this.moves >= 1)
			{
				this.move -= 1;
				//move 1 space
			}
		}
	}
	return runner;
}
/*
Game runs at 15 fps
Average runner should move 3 squares per second
Average speed should be 1/15*3 = 1/5 = 0.2
*/