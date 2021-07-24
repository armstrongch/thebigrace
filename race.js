var race = 
{
	runner_count: 1,//20, //test
	runners: null,
	
	setup: function()
	{
		this.runners = new Array(this.runner_count);
		
		for (let i = 0; i < this.runner_count; i += 1)
		{
			this.runners[i] = newRunner(i, 200 + i);
		}
	},
	
	moveRunners: function()
	{
		this.runners.sort((a, b) => (a.speed > b.speed) ? -1 : 1);
		
		for (let i = 0; i < this.runners.length; i += 1)
		{
			this.runners[i].move();
		}
	},
	
	
}