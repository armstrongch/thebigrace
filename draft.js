var draft =
{
	runners: [],
	teams: [],
	team_colors: ["red", "orange", "green", "blue", "purple", "black", "brown"],
	
	team_turn_index: 0,
	team_turn_index_direction: 1,
	
	setup: function()
	{
		for (let i = 0; i < this.team_colors.length; i += 1)
		{
			this.teams.push(team_factory.new_team());
		}
		
		for (let i = 0; i < this.teams.length*7; i += 1)
		{
			this.runners.push(runner_factory.new_runner(i));
		}
		this.rank_runners();
	},
	
	//only called by player input
	draft_select_runner_by_name: function(runner_name)
	{
		if (this.teams[this.team_turn_index].human_player)
		{
			for (let i = 0; i < this.runners.length; i += 1)
			{
				if (this.runners[i].name == runner_name)
				{
					if (confirm("Draft " + runner_name + " for the " + this.teams[this.team_turn_index].color + " team?"))
					{
						draft.draft_select_runner(i);					
					}
				}
			}
		}
	},
	
	draft_select_runner: function(runner_index)
	{
		var runner_name = this.runners[runner_index].name;
		
		this.teams[this.team_turn_index].runners.push(this.runners[runner_index]);
		this.teams[this.team_turn_index].runners[this.teams[this.team_turn_index].runners.length - 1].team = this.team_turn_index;
		this.runners.splice(runner_index, 1);
		
		var tableRow = $("#draft_table td").filter(function() {
			return $(this).text() == runner_name;
		}).closest("tr");
		
		tableRow[0].children[6].innerHTML = ui.get_stylized_team_name_span(this.team_turn_index);
		
		this.team_turn_index += this.team_turn_index_direction;
		if (this.team_turn_index < 0)
		{
			this.team_turn_index_direction = 1;
			this.team_turn_index = 0;
		}
		else if (this.team_turn_index > this.teams.length - 1)
		{
			this.team_turn_index_direction = -1;
			this.team_turn_index = this.teams.length - 1;
		}
		
		if (this.runners.length > 0)
		{
			this.snake_draft_round();
		}
		else
		{
			this.complete_draft();
		}
	},
	
	complete_draft: function()
	{
		ui.set_input_div_html("<p>Draft Complete!</p><p><button onclick='game.draft_continue_button_click()'>Continue</button></p>");
	},
	
	snake_draft_round: function()
	{
		if (!this.teams[this.team_turn_index].human_player)
		{
			var runner_index = this.teams[this.team_turn_index].get_draft_pick();
			this.draft_select_runner(runner_index);
		}
		else
		{
			ui.set_input_div_html("<p>" + ui.get_stylized_team_name_span(this.team_turn_index) + " team must draft a runner.</p>");
		}
	},
	
	//sort the runners by calculated rank, based on die and starting bonus_energy
	rank_runners: function()
	{
		for (let i = 0; i < this.runners.length; i += 1)
		{
			this.runners[i].rank = 0;
			
			for (let j = 0; j < this.runners[i].die.length; j += 1)
			{
				this.runners[i].rank += this.runners[i].die[j]*10;
			}
			this.runners[i].rank += this.runners[i].bonus_energy;
		}
		
		this.runners.sort((a, b) => (a.rank > b.rank) ? -1 : 1);
	},
	
	rank_teams: function()
	{
		for (let i = 0; i < this.teams.length; i += 1)
		{
			this.teams[i].rank = 0;
			for (let j = 0; j < this.teams[i].runners.length; j += 1)
			{
				this.teams[i].rank += this.teams[i].runners[j].rank;
			}
		}
	}
}