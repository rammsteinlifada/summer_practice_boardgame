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
		this.initDrag(this.cvs);
		for(let i = 0; i < cardTypes.length; ++i) {
			let img = new Image();
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
		const sz = 50;
		this.ctx.fillStyle = 'white';
		this.ctx.fillRect(0, 0, this.cvs.width, this.cvs.height);

		let bw = 1100;
    	let bh = 1100;
    	let p = 0;
    	let cw = bw + (p*2) + 1;
    	let ch = bh + (p*2) + 1;
		
    	for (let x = 0; x <= bw; x += 100) {
        	this.ctx.moveTo(0.5 + x + p, p);
        	this.ctx.lineTo(0.5 + x + p, bh + p);
    	}
    	for (let x = 0; x <= bh; x += 100) {
        	this.ctx.moveTo(p, 0.5 + x + p);
        	this.ctx.lineTo(bw + p, 0.5 + x + p);
    	}
    	this.ctx.strokeStyle = "black";
    	this.ctx.stroke();
		for (let i = 0; i < f.field.length; ++i)
			for (let j = 0; j < f.field[i].length; ++j) {
				if (!f.field[i][j]) continue;
				if (this.cardImages[f.field[i][j]])
					this.ctx.drawImage(this.cardImages[f.field[i][j]], (i+1)*100- 100, (j-1)*100 + 100);
			}
	}
}

let r;
window.addEventListener("DOMContentLoaded", function() {
	r = new Renderer();
	p = new Player(1);
	p = new Player(2);
	p = new Player(3);
	p = new Player(4);
});

d = new Deck;





