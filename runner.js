var runner_factory = 
{
	new_runner: function()
	{
		var runner = 
		{
			cards: [],
			bonus_energy: 10,
			//we should never create a new runner without immediately adding them to the race, so that each runner will have a unique priority value
			priority: race.runners.length
		};
		runner.cards = this.generate_cards();
		runner.name = this.generate_name(runner.priority);
		runner.team = race.teams[runner.priority % race.teams.length];
		runner.bonus_energy += Math.floor(runner.priority / race.teams.length);
		return runner;
	},
	
	//generate an array of 4 numbers totalling 20
	generate_cards: function()
	{
		var cards = [0, 0, 0, 0];
		for (let i = 0; i < 20; i += 1)
		{
			var random_index = Math.floor(Math.random()*4);
			cards[random_index] += 1;
		}
		return cards;
	},
	
	generate_name: function(name_index)
	{
		var first_initial_index = Math.floor(name_index/26);
		var last_initial_index = name_index % 26;
		
		var first_initial = (first_initial_index+10).toString(36);
		var last_initial = (last_initial_index+10).toString(36);
		
		return first_initial + last_initial;
	}
}