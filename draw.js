var draw = 
{
	canvas: $('#race_canvas')[0],
	ctx: $('#race_canvas')[0].getContext('2d'),
	runner_radius: 10,
	runner_radius_with_padding: 12,
	space_width: 50,
	
	
	draw_race: function()
	{
		var ctx = this.ctx;
		var canvas = this.canvas;
		
		var num_spaces = race.runners[0].position - race.runners[race.runners.length-1].position + 1;
		canvas.width = Math.max(10000, num_spaces*this.space_width);
		canvas.height = 600;
		$('#race_div')[0].scrollTo(canvas.width, 0);
		
		ctx.fillStyle = "green";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		
		ctx.strokeStyle = "white";
		ctx.beginPath();
		for (let i = canvas.width; i >= 0; i -= this.space_width)
		{
			ctx.moveTo(i, 0);
			ctx.lineTo(i, canvas.height);
		}
		ctx.stroke();
		
		var position_counts = [];
		var last_runner_index_counted = 0;
		for (let i = race.runners[0].position; i >= race.runners[race.runners.length-1].position; i -= 1)
		{
			var position_count = 0;
			for (let j = last_runner_index_counted; j < race.runners.length; j += 1)
			{
				if (race.runners[j].position == i)
				{
					position_count += 1;
				}
				else
				{
					last_runner_index_counted = j;
					j = race.runners.length + 1;
					position_counts.push({pos: i, count: position_count});
				}
				
				if (j == race.runners.length - 1)
				{
					position_counts.push({pos: i, count: position_count});
				}
			}
		}
		
		var last_runner_index_drawn = 0;
		for (let i = 0; i < position_counts.length; i += 1)
		{
			for (let j = 0; j < position_counts[i].count; j += 1)
			{
				var x_pos = canvas.width - (race.runners[0].position - position_counts[i].pos + 0.5)*this.space_width;
				var y_pos = canvas.height/2 - (position_counts[i].count/2 - j)*this.runner_radius_with_padding*2;
				if (position_counts[i].count > race.runners.length/2)
				{
					if (j < position_counts[i].count/2)
					{
						x_pos += this.runner_radius_with_padding;
						y_pos += canvas.height/2;
					}
					else
					{
						x_pos -= this.runner_radius_with_padding;
						y_pos -= canvas.height/2;
					}
				}

				this.draw_runner(last_runner_index_drawn, x_pos, y_pos);
				last_runner_index_drawn += 1;
			}
		}
	},
	
	draw_runner: function(runner_index, x_pos, y_pos)
	{
		var ctx = this.ctx;
		ctx.fillStyle = "white";
		ctx.beginPath();
		ctx.arc(x_pos, y_pos, this.runner_radius, 0, 2*Math.PI);
		ctx.fill();
	}
}