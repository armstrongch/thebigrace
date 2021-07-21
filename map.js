var map = 
{
	width: 100,
	height: 75,
	square_width: -1,
	square_height: -1,
	ctx: null,
	canvas: null,	
	
	straightaway_length: 42, //squares
	infield_radius: 15, //squares
	track_radius: 23, //squares
	
	infield_square: null,
	infield_arc_left: null,
	infield_arc_right: null,
	
	track_square: null,
	track_arc_left: null,
	track_arc_right: null,
	
	squares: null,
	
	start_line_x: -1,
	finish_line_x: -1,
	
	setup: function()
	{	
		this.canvas = $("#gameCanvas")[0];
		this.ctx = this.canvas.getContext('2d');
		this.square_width = this.canvas.width/this.width;
		this.square_height = this.canvas.height/this.height;
		
		this.infield_square = {
			x: this.canvas.width/2 - (this.straightaway_length/2*this.square_width),
			y: this.canvas.height/2 - this.infield_radius*this.square_height,
			w: this.straightaway_length*this.square_width,
			h: this.infield_radius*2*this.square_width
		};
		
		this.infield_arc_left = {
			x: this.canvas.width/2 - (this.straightaway_length/2*this.square_width),
			y: this.canvas.height/2,
			r: this.infield_radius*this.square_height,
			sa: 0,
			ea: 2*Math.PI
		};
		
		this.infield_arc_right = {
			x: this.canvas.width/2 + (this.straightaway_length/2*this.square_width),
			y: this.canvas.height/2,
			r: this.infield_radius*this.square_height,
			sa: 0,
			ea: 2*Math.PI
		};
		
		this.track_square = {
			x: this.canvas.width/2 - (this.straightaway_length/2*this.square_width),
			y: this.canvas.height/2 - this.track_radius*this.square_height,
			w: this.straightaway_length*this.square_width,
			h: this.track_radius*2*this.square_width
		};
		
		this.track_arc_left = {
			x: this.canvas.width/2 - (this.straightaway_length/2*this.square_width),
			y: this.canvas.height/2,
			r: this.track_radius*this.square_height,
			sa: 0,
			ea: 2*Math.PI
		};
		
		this.track_arc_right = {
			x: this.canvas.width/2 + (this.straightaway_length/2*this.square_width),
			y: this.canvas.height/2,
			r: this.track_radius*this.square_height,
			sa: 0,
			ea: 2*Math.PI
		};
		
		this.start_line_x = this.infield_square.x + this.infield_square.w;
		this.finish_line_x = this.infield_square.x;
		
		this.squares = Array.from(Array(100), () => new Array(75));
		for (let w = 0; w < this.width; w += 1)
		{
			for (let h = 0; h < this.height; h += 1)
			{
				
				var sx = w*this.square_width;
				var sy = h*this.square_height;
				
				if (square_is_on_track(this, sx, sy))
				{
					this.squares[w][h] = "e";
				}
				else
				{
					this.squares[w][h] = "x";
				}
			}
		}
	},
	
	draw: function()
	{
		//draw grass
		this.ctx.fillStyle = '#878f3c';
		this.ctx.beginPath();
		this.ctx.rect(
			0, 0, this.canvas.width, this.canvas.height
		);
		this.ctx.fill();
		
		//draw track
		this.ctx.fillStyle = "#9d4438";
		
		this.ctx.beginPath();
		this.ctx.rect(
			this.track_square.x,
			this.track_square.y,
			this.track_square.w,
			this.track_square.h
		);
		this.ctx.fill();
		
		this.ctx.beginPath();
		this.ctx.arc(
			this.track_arc_left.x,
			this.track_arc_left.y,
			this.track_arc_left.r,
			this.track_arc_left.sa,
			this.track_arc_left.ea
		);
		this.ctx.fill();
		
		this.ctx.beginPath();
		this.ctx.arc(
			this.track_arc_right.x,
			this.track_arc_right.y,
			this.track_arc_right.r,
			this.track_arc_right.sa,
			this.track_arc_right.ea
		);
		this.ctx.fill();
		
		//draw infield
		this.ctx.fillStyle = "#45541d";
		
		this.ctx.beginPath();
		this.ctx.rect(
			this.infield_square.x,
			this.infield_square.y,
			this.infield_square.w,
			this.infield_square.h
		);
		this.ctx.fill();
		
		this.ctx.beginPath();
		this.ctx.arc(
			this.infield_arc_left.x,
			this.infield_arc_left.y,
			this.infield_arc_left.r,
			this.infield_arc_left.sa,
			this.infield_arc_left.ea
		);
		this.ctx.fill();
		
		this.ctx.beginPath();
		this.ctx.arc(
			this.infield_arc_right.x,
			this.infield_arc_right.y,
			this.infield_arc_right.r,
			this.infield_arc_right.sa,
			this.infield_arc_right.ea
		);
		this.ctx.fill();
		
		//start and finish lines
		this.ctx.strokeStyle = "white";
		this.ctx.beginPath();
		this.ctx.moveTo(this.start_line_x, this.infield_square.y + this.infield_square.h);
		this.ctx.lineTo(this.start_line_x, this.track_square.y + this.track_square.h);
		
		this.ctx.moveTo(this.finish_line_x, this.infield_square.y);
		this.ctx.lineTo(this.finish_line_x, this.track_square.y);
		
		this.ctx.stroke();
		

		//draw runners
		this.ctx.fillStyle = "black";
		for (let w = 0; w < this.width; w += 1)
		{
			for (let h = 0; h < this.height; h += 1)
			{
				if ((this.squares[w][h] != "x") && (this.squares[w][h] != "e"))
				{
					this.ctx.beginPath();
					this.ctx.arc(
						(w+0.5)*this.square_width,
						(h+0.5)*this.square_height,
						this.square_width*0.45,
						0, 2*Math.PI);
					this.ctx.fill();
				}
			}
		}
	}
};