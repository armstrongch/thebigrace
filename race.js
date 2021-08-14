var race = 
{
	runners: [],
	course: [],
	teams: ["BlueViolet", "CadetBlue", "Crimson", "DarkGreen", "DarkMagenta", "DarkOrange", "DeepPink", "Indigo", "SpringGreen", "Black"],
	setup: function()
	{
		for (let i = 0; i < 300; i += 1)
		{
			this.runners.push(runner_factory.new_runner());
		}
		while (this.course.length < 500)
		{
			var course_segment_length = 10 + Math.floor(Math.random()*21); //10-30 spaces long
			var course_segment_width = 4 + Math.floor(Math.random()*17); //4-20 spaces wide
			
			for (let i = 0; i < course_segment_length; i += 1)
			{
				this.course.push(
					{
						width: course_segment_width,
						runners: []
					}
				);
				
				if (this.course.length == 500)
				{
					i = course_segment_length;
				}
			}
		}
	},
	draw_course: function()
	{
		var course_table_html = "";
		//start box
		course_table_html += "<tr><td colspan ='22'>";
		for (let i = 0; i < race.runners.length; i += 1)
		{
			course_table_html += "<span style='color: " + race.runners[i].team + "'>" + race.runners[i].name + " </span>";
		}
		
		course_table_html += "</td></tr>";
		
		for (let i = 0; i < this.course.length; i += 1)
		{
			//max width = 20 spaces
			var left_col_span = Math.floor((20 - this.course[i].width)/2) + 1;
			var right_col_span = 20 - this.course[i].width - left_col_span + 1;
			var new_row_html = "<tr><td class='off_course' colspan='" + left_col_span + "'>X</td>";
			for (let j = 0; j < this.course[i].width; j += 1)
			{
				new_row_html += "<td></td>";
			}
			new_row_html += "<td class='off_course' colspan='" + right_col_span + "'>X</td></tr>";
			course_table_html += new_row_html;
		}
		$('#course_table').html(course_table_html);
	}
}