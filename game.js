var game = 
{
	setup: function()
	{
		map.setup();
		race.setup();
		this.draw();
	},
	draw: function()
	{
		map.draw();
	},
	start: function()
	{
		setInterval(this.loop, 65); 
	},
	loop: function()
	{
		console.log("loop");
		race.moveRunners();
	}
}