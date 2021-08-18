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
				`<tr data-value='${draft.runners[i].name}'>
					<td>${draft.runners[i].name}</td>
					<td>${die_sides}</td>
					<td>${die_sum}</td>
					<td>${draft.runners[i].bonus_energy}</td>
					<td></td>
					<td>${draft.runners[i].rank}</td>
					<td><span class='draft_me'>Undrafted</span></td>
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
	

}