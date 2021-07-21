var race = 
{
	runner_count: 20,
	runners: null,
	
	setup: function()
	{
		this.runners = new Array(this.runner_count);
		
		var start_square_x = Math.floor(map.start_line_x / map.square_width) - 1;
		var start_square_y = Math.ceil((map.infield_square.y + map.infield_square.h)/ map.square_width);
		var max_start_square_y = Math.floor((map.track_square.y + map.track_square.h)/ map.square_width) - 1;
		var orig_start_square_y = start_square_y;
		
		for (let i = 0; i < this.runner_count; i += 1)
		{
			this.runners[i] = newRunner(i, 0.2 + 0.02*i);
			map.squares[start_square_x][start_square_y] = i;
			start_square_y += 1;
			if (start_square_y > max_start_square_y)
			{
				start_square_y = orig_start_square_y;
				start_square_x -= 1;
			}
		}
	},
	
	moveRunners: function()
	{
		this.runners.sort((a, b) => (a.speed > b.speed) ? -1 : 1);
		
		for (i = 0; i < this.runners.length; i += 1)
		{
			this.runners[i].move();
			//why is this broken??
		}
	},
	
	
}