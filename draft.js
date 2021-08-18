var draft =
{
	runners: [],
	teams: [],
	team_colors: ["red", "orange", "yellow", "green", "blue", "purple", "black"],
	
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
	
	snake_draft_round: function()
	{
		//this.rank_runners(); moved this to setup, but we should ALWAYS call setup before any other draft function
		var runner_index = this.teams[team_turn_index].get_draft_pick();
		
		this.teams[team_turn_index].runners.push(this.runners[runner_index]);
		this.teams[team_turn_index].runners[this.teams[team_turn_index].runners.length - 1].team = team_turn_index;
		this.runners.splice(runner_index, 1);
		team_turn_index += team_turn_index_direction;
		
		if (team_turn_index < 0)
		{
			team_turn_index_direction = 1;
			team_turn_index = 0;
		}
		else if (team_turn_index > this.teams.length - 1)
		{
			team_turn_index_direction = -1;
			team_turn_index = this.teams.length - 1;
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