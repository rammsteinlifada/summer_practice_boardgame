class Renderer {
	constructor() {
		this.cvs = document.getElementById("canvas");
		this.ctx = this.cvs.getContext("2d");

		this.dx = - 50 * 100;
		this.dy = - 50 * 100;

		this.f = new Field();
		let cnt = 0;
		this.cardImages = {};
		let self = this;
		for(let i = 0; i < cardTypes.length; ++i) {
			var img = new Image();
			this.cardImages[cardTypes[i]] = img;
			img.src = "pics/" + cardTypes[i] + ".jpg";
			img.onload = img.onerror = function() {
				++cnt;
				if (cnt == cardTypes.length)
					setTimeout(() => self.redraw(), 0);
			};
		}

	}



	redraw() {
		let f = this.f;
		const sz = 50;
		this.ctx.fillStyle = 'white';
		this.ctx.fillRect(0, 0, this.cvs.width, this.cvs.height);

		var bw = 1000;
    	var bh = 1000;
    	var p = 0;
    	var cw = bw + (p*2) + 1;
    	var ch = bh + (p*2) + 1;
		
    	for (var x = 0; x <= bw; x += 100) {
        	this.ctx.moveTo(0.5 + x + p, p);
        	this.ctx.lineTo(0.5 + x + p, bh + p);
    	}
    	for (var x = 0; x <= bh; x += 100) {
        	this.ctx.moveTo(p, 0.5 + x + p);
        	this.ctx.lineTo(bw + p, 0.5 + x + p);
    	}
    	this.ctx.strokeStyle = "black";
    	this.ctx.stroke();
		this.ctx.drawImage(this.cardImages[f.field[4][4]], 400, 400)


	}
	
	drawCard(img){
		this.ctx.drawImage(img, 100, 100);
	}	
}

var r;
window.addEventListener("DOMContentLoaded", function() {
	r = new Renderer();
	p = new Player(1);
	p = new Player(2);
	p = new Player(3);
	p = new Player(4);
});

d = new Deck;





