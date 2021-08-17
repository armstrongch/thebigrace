var game = 
{
	setup: function()
	{
		draft.setup();
		//rework this process flow once we want to allow players to interact
		draft.snake_draft();
		race.setup();
		race.start_race();
	}
}