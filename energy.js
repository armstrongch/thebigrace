var energy_use =
{
	energy_actions: 
	[
		{
			name: "add_one",
			cost: 2,
			desc: "Add 1 to your roll",
			func: function(runner_index)
			{
				race.runners[runner_index].current_roll += 1;
			}
		},
		{
			name: "add_two",
			cost: 3,
			desc: "Add 2 to your roll",
			func: function(runner_index)
			{
				race.runners[runner_index].current_roll += 2;
			}
		},
		{
			name: "get_average",
			cost: 3,
			desc: "Change your roll to the average of all sides of your die, (rounded up)",
			func: function(runner_index)
			{
				var die_sum = 0;
				for (let i = 0; i < race.runners[runner_index].die.length; i += 1)
				{
					die_sum += race.runners[runner_index].die[i];
				}
				race.runners[runner_index].current_roll = Math.ceil(die_sum / race.runners[runner_index].die.length);
			}
		},
		{
			name: "get_second_highest",
			cost: 4,
			desc: "Change your roll to the second-highest number on your die",
			func: function(runner_index)
			{
				race.runners[runner_index].current_roll = race.runners[runner_index].die[race.runners[runner_index].die.length-2];
			}
		},
		{
			name: "get_highest",
			cost: 5,
			desc: "Change your roll to the highest number on your die",
			func: function(runner_index)
			{
				race.runners[runner_index].current_roll = race.runners[runner_index].die[race.runners[runner_index].die.length-1];
			}
		}
	],
	
	energy_use_function: function(function_name, runner_index)
	{
		for (let i = 0; i < this.energy_actions.length; i += 1)
		{
			if (this.energy_actions[i].name == function_name)
			{
				if (race.runners[runner_index].total_energy >= this.energy_actions[i].cost)
				{
					this.energy_actions[i].func(runner_index);
					race.runners[runner_index].total_energy -= this.energy_actions[i].cost;
					ui.set_input_div_html(ui.get_race_runner_input(runner_index));
					$('#help_div').html(ui.get_race_help_html);
				}
				i = this.energy_actions.length;
			}
		}
	}
}