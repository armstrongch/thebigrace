var ui =
{
	get_title_html: function()
	{
		return `<p>Chris 'Turd Boomerang' Armstrong presents:</p>
			<p>The Big Race: A team cross country racing board game</p>
			<p>How many human players?: <input id="num_players" type="number" min="1" max="7" value="1"></select></p>
			<p><button onclick="game.begin_button_click()">Begin</button></p>`;
	},
	
	get_draft_table_html: function()
	{
		var draft_table_rows = "";
		
		for (let i = 0; i < draft.runners.length; i += 1)
		{
			var die_sides = "";
			var die_sum = 0;
			for (let j = 0; j < draft.runners[i].die.length; j += 1)
			{
				die_sides += draft.runners[i].die[j];
				die_sum += draft.runners[i].die[j];
				if (j < draft.runners[i].die.length - 1)
				{
					die_sides += ", ";
				}
			}
			
			var draft_table_row = 
				`<tr>
					<td>${draft.runners[i].name}</td>
					<td>${die_sides}</td>
					<td>${die_sum}</td>
					<td>${draft.runners[i].bonus_energy}</td>
					<td></td>
					<td>${draft.runners[i].rank}</td>
					<td><span class='draft_me' onclick='draft.draft_select_runner_by_name("${draft.runners[i].name}")'>Undrafted</span></td>
				</tr>`;
			draft_table_rows += draft_table_row;
		}
		
		var draft_table_html = 
			`<table id='draft_table'>
				<thead>
					<tr>
						<td>Name</td>
						<td>Die Sides</td>
						<td>Die Total</td>
						<td>Starting Energy</td>
						<td>Attributes</td>
						<td>Speed Rating</td>
						<td>Team</td>
					</tr>
				</thead>
				<tbody>
					${draft_table_rows}
				</tbody>
			</table>`;
			
		return draft_table_html;
	},
	
	set_input_div_html: function(html_content)
	{
		$('#input_div').html(html_content);
	},
	
	get_stylized_team_name_span: function(team_index)
	{
		return "<span style='color: " + draft.teams[team_index].color + "'>"
			+ draft.teams[team_index].color.charAt(0).toUpperCase() + draft.teams[team_index].color.slice(1)
			+ "</span>";
	},
	
	draft_help_items: [
		["Runner Dice",
		"Every turn, each runner will roll their six-sided die and"
		+ " move the corresponding number of spaces along the race course."
		+ " Each side contains a number between 1 and 8."],
		["Runner Energy",
		"Runners can use energy to reroll or manipulate their die."
		+ " Each runners can start with up to 9 energy, and can also"
		+ " accumulate it during the race by drafting behind other runners."],
		["Speed Ratings",
		"Speed ratings are used to estimate how fast a runner is,"
		+ " based on the their movement die and starting energy."]
	],
	
	get_draft_help_html: function()
	{
		var draft_help_html = "";
		for (let i = 0; i < this.draft_help_items.length; i += 1)
		{
			draft_help_html += `
			<p>
				<span style='font-weight: bold'>
					${this.draft_help_items[i][0]}:
				</span>
				${this.draft_help_items[i][1]}
			</p>`;
		}
		return draft_help_html;
	}
}