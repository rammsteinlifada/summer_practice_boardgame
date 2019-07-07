class Renderer {
	constructor() {
		this.cvs = document.getElementById("canvas");
		this.ctx = this.cvs.getContext("2d");
		
		this.dx = - 50 * 100;
		this.dy = - 50 * 100;
		this.initDrag(this.cvs);

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

	initDrag(cvs) {
		let self = this;
		cvs.onmousedown = (e) => {
			e.preventDefault();
			self.isDragging = true;
			self.startX = e.clientX;
			self.startY = e.clientY;
			self.originX = this.dx;
			self.originY = this.dy;
			console.log(self.startX);
		};
		cvs.onmouseup = (e) => {
			e.preventDefault();
			self.isDragging = false;
			console.log('up');
		};
		cvs.onmousemove = (e) => {
			if (!self.isDragging) return;
			e.preventDefault();
			self.dx = self.originX + e.clientX - self.startX;
			self.dy = self.originY + e.clientY - self.startY;
			console.log(self.dy);
			setTimeout(() => self.redraw(), 0);
		};
	}

	redraw() {
		let f = this.f;
		const sz = 100;
		this.ctx.fillStyle = 'white';
		this.ctx.fillRect(0, 0, this.cvs.width, this.cvs.height);

		var bw = 700;
    	var bh = 800;
    	var p = 0;
    	var cw = bw + (p*2) + 1;
    	var ch = bh + (p*2) + 1;
		
    	for (var x = 0; x <= bw; x += 99) {
        	this.ctx.moveTo(0.5 + x + p, p);
        	this.ctx.lineTo(0.5 + x + p, bh + p);
    	}
    	for (var x = 0; x <= bh; x += 99) {
        	this.ctx.moveTo(p, 0.5 + x + p);
        	this.ctx.lineTo(bw + p, 0.5 + x + p);
    	}
    	this.ctx.strokeStyle = "black";
    	this.ctx.stroke();

		for (let i = 0; i < f.field.length; ++i)
			for (let j = 0; j < f.field[i].length; ++j) {
				if (!f.field[i][j]) continue;
				console.log(f.field[i][j]);
				console.log(this.cardImages[f.field[i][j]]);
				if (this.cardImages[f.field[i][j]])
				this.ctx.drawImage(this.cardImages[f.field[i][j]], sz * i + this.dx, sz * j + this.dy);
			}
	}
	
		drawCard(img){
			this.ctx.drawImage(img, 100, 100);
		}	
}

var r;
window.addEventListener("DOMContentLoaded", function() {
	r = new Renderer();
});



