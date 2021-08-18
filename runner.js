var runner_factory = 
{
	die_faces: [1, 2, 3, 4, 5, 6, 7, 8],
	
	new_runner: function(runner_num)
	{
		var runner = 
		{
			name: this.generate_name(runner_num),
			attributes: [],
			position: -1,
			team: "none",
			die: this.generate_die(),
			bonus_energy: Math.floor(Math.random()*10),
			ranking: -1,
			
			roll: function()
			{
				var roll = this.die[Math.floor(Math.random()*this.die.length)];
				return roll;
			},
			
			//apply tactics/attributes to 1 or more rolls:
			get_move_distance: function()
			{
				return this.roll();
			}
		};
		
		return runner;
	},
	
	generate_die: function()
	{
		var die = [];
		while(die.length < 6)
		{
			var rand_int = this.die_faces[Math.floor(Math.random()*this.die_faces.length)];
			die.push(rand_int);
		}
		die.sort((a, b) => (a > b) ? 1 : -1);
		return die;
	},
	
	generate_name: function(name_index)
	{
		var first_initial_index = Math.floor(name_index/26);
		var last_initial_index = name_index % 26;
		
		var first_initial = (first_initial_index+10).toString(36);
		var last_initial = (last_initial_index+10).toString(36);
		
		return first_initial.toUpperCase() + last_initial.toUpperCase();
	}
}