var race = 
{
	runners: [],
	packs: [],
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
		draw.draw_race();
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
	}
}