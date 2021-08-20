var race = 
{
	runners: [],
	packs: [],
	turns_remaining: 50,
	setup: function()
	{
		for (let i = 0; i < draft.teams.length; i += 1)
		{
			while (draft.teams[i].runners.length > 0)
			{
				this.runners.push(draft.teams[i].runners.pop());
			}
		}
		this.start_race();
	},
	
	//the first round doesn't allow for strategy - it's just a straight random roll
	start_race: function()
	{
		for (let i = 0; i < this.runners.length; i += 1)
		{
			this.runners[i].position += this.runners[i].roll();
			this.runners[i].moved_this_round = true;
		}
		race.end_round();
	},
	
	start_race_round: function()
	{
		this.move_next_runner();
	},
	
	move_next_runner: function()
	{
		this.sort_runners_by_position();
		var runner_index = -1
		for (let i = 0; i < this.runners.length; i += 1)
		{
			if (!this.runners[i].moved_this_round)
			{
				runner_index = i;
				i = this.runners.length;
			}
		}
		
		if (runner_index != -1)
		{
			if (draft.teams[this.runners[runner_index].team].human_player)
			{
				this.runners[runner_index].current_roll = this.runners[runner_index].roll();
				ui.set_input_div_html(ui.get_race_runner_input(runner_index));
				draw.select_runner(runner_index);
			}
			else
			{
				this.runners[runner_index].current_roll = this.runners[runner_index].get_move_distance();
				this.move_runner(runner_index);
			}
		}
		else
		{
			this.end_round();
		}
	},
	
	move_runner: function(runner_index)
	{
		this.runners[runner_index].position = this.runners[runner_index].position + this.runners[runner_index].current_roll;
		this.runners[runner_index].moved_this_round = true;
		this.move_next_runner();
	},
	
	sort_runners_by_position: function()
	{
		this.runners.sort((a, b) => (a.position > b.position) ? -1 : 1);
	},
	
	end_round: function()
	{
		for (let i = 0; i < this.runners.length; i += 1)
		{
			this.runners[i].moved_this_round = false;
			this.runners[i].current_roll = 0;
		}
		
		//award bonus energy for drafting, and establish packs 
		this.sort_runners_by_position();
		var runner_position = this.runners[0].position;
		this.packs = [];
		this.packs.push(
		{
			leader: 0,
			members: [0]
		});
		
		for (let i = 1; i < this.runners.length; i += 1)
		{
			if (runner_position - this.runners[i].position <= 1)
			{
				this.runners[i].total_energy += 1;
				this.packs[this.packs.length-1].members.push(i);
			}
			else
			{
				this.packs.push(
				{
					leader: i,
					members: [i]
				});
			}
			runner_position = this.runners[i].position;
		}
		this.turns_remaining -= 1;
		ui.set_input_div_html(`<p>The race is underway! Only ${race.turns_remaining} turns to go!</p><p><button onclick='race.start_race_round()'>Continue</button><p/>`);
		draw.select_runner(0); //this calls draw.draw_race()
	}
}