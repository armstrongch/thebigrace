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
		}
		race.end_round();
	},
	
	sort_runners_by_position: function()
	{
		this.runners.sort((a, b) => (a.position > b.position) ? -1 : 1);
	},
	
	end_round: function()
	{
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
				this.runners[i].bonus_energy += 1;
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
		ui.set_input_div_html("<p><button>Continue</button><p/>");
		draw.select_runner(0); //this calls draw.draw_race()
	}
}