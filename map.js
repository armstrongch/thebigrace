var map = 
{
	width: 100,
	height: 75,
	square_width: -1,
	square_height: -1,
	ctx: null,
	canvas: null,
	
	setup: function()
	{
		this.canvas = $("#gameCanvas")[0];
		this.ctx = this.canvas.getContext('2d');
		this.square_width = this.canvas.width/this.width;
		this.square_height = this.canvas.height/this.height;
	},
	
	draw: function()
	{
		//draw grid
		this.ctx.strokeStyle = "black";
		this.ctx.beginPath();
		for (i = 0; i <= this.height; i += 1)
		{
			this.ctx.moveTo(0, i*this.square_width);
			this.ctx.lineTo(this.canvas.width, i*this.square_width);
		}
		for (i = 0; i <= this.width; i += 1)
		{
			this.ctx.moveTo(i*this.square_height, 0);
			this.ctx.lineTo(i*this.square_height, this.canvas.height);
		}
		this.ctx.stroke();
	}
};