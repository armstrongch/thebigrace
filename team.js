var team_factory = 
{
	new_team: function()
	{
		var team = 
		{
			color: draft.team_colors[draft.teams.length],
			runners: [],
			rank: -1,
			human_player: false,
			get_draft_pick: function()
			{
				return 0;
				// Before drafting, we should have sorted runners by calculated rank,
				// so this should theoretically be picking the "best" runner
			}
		};
		return team;
	}
}