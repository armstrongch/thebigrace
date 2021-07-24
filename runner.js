function newRunner(id, speed)
{
	var runner = {
		id: id,
		speed: speed,
		laps_complete: 0,
		lap_progress: 0.5,
		lane: 1,
		moves: 0,
		move: function()
		{
			this.moves += this.speed;
			if (this.moves >= 1000)
			{
				this.moves -= 1000;
				//move
			}
		}
	}
	return runner;
}

/*
	Runners should finish a lap in about 30 seconds.
	Runner move 3 times per second.
	Runners should move about 90 times to finish a lap.
*/