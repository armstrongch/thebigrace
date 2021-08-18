var game = 
{
	setup: function()
	{
		$('#title_div').html(ui.get_title_html());
		
		//draft.snake_draft();
		//race.setup();
		//race.start_race();
	},
	
	begin_button_click: function()
	{
		$('#title_div').css('display', 'none');
		
		draft.setup();
		for (let i = 0; i < $('#num_players').val(); i += 1)
		{
			draft.teams[i].human_player = true;
		}
		
		$('#draft_div').html(ui.get_draft_table_html());
		$('#draft_div').css('display', 'inline-block');
	}
}