class Renderer {
	constructor() {

		this.currentPlayer = 1;

		this.cvs = document.getElementById("canvas");
		this.ctx = this.cvs.getContext("2d");

		this.dx = 0;
		this.dy = 0;

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

	nextPlayer() {
		this.currentPlayer = (this.currentPlayer % 4);
		++this.currentPlayer;
		return this.currentPlayer;
	};



	initDrag(cvs) {
		let self = this;
		cvs.onmousedown = (e) => {
			e.preventDefault();
			self.isDragging = true;
			self.startX = e.clientX;
			self.startY = e.clientY;
			self.originX = this.dx;
			self.originY = this.dy;
		};
		cvs.onmouseup = (e) => {
			e.preventDefault();
			self.isDragging = false;
		};
		cvs.onmousemove = (e) => {
			if (!self.isDragging) return;
			e.preventDefault();
			self.dx = self.originX + e.clientX - self.startX;
			self.dy = self.originY + e.clientY - self.startY;
			setTimeout(() => self.redraw(), 0);
		};
	}

	redraw() {
		let f = this.f;
		const sz = 100;
		this.ctx.fillStyle = "white";
		this.ctx.fillRect(0, 0, this.cvs.width, this.cvs.height);

		let bw = 1100;
    	let bh = 1100;
    	let p = 0;
    	let cw = bw + (p*2) + 1;
    	let ch = bh + (p*2) + 1;


		this.ctx.strokeStyle = "black";
    	this.ctx.beginPath();

    	for (let i = 0; i < 11; i++){
			this.ctx.moveTo(sz*i + this.dx,this.dy);
			this.ctx.lineTo(sz*i + this.dx + this.cvs.width, this.dy);
		}
/*
		for (let x = 0; x <= bw; x += 100) {
        	this.ctx.moveTo(0.5 + x + this.dx, p + this.dy);
        	this.ctx.lineTo(0.5 + x + this.dx, bh + p + this.dy);
		}*/
		for (let i = 0; i < 11; i ++){
			this.ctx.moveTo(Math.max(0, 100*(i - 1)) + this.dx, Math.max(0, 100*(i - 1)) + this.dy);
			this.ctx.lineTo(Math.max(0, sz*i) + this.dx, Math.max(0, sz*i) + this.dy);
		}

    /*	for (let x = 0; x <= bh; x += 100) {
        	this.ctx.moveTo(this.dx, 0.5 + x + this.dy);
        	this.ctx.lineTo(bw + this.dx, 0.5 + x + this.dy);
		}8*/
		this.ctx.closePath();
		this.ctx.stroke();

		for (let i = 0; i < f.field.length; ++i)
			for (let j = 0; j < f.field[i].length; ++j) {
				if (!f.field[i][j]) continue;
				if (this.cardImages[f.field[i][j]])
					this.ctx.drawImage(this.cardImages[f.field[i][j]], sz*(i) + this.dx, sz*(j)+ this.dy);
			}
	}
}

let r;
window.addEventListener("DOMContentLoaded", function() {
	r = new Renderer();
	players = [];
	for (let i = 1; i < 5; ++i)
		players[i] = new Player(i);

	r.cvs.addEventListener('mouseenter', () => console.log('E'));
	r.cvs.addEventListener('mouseleave', () => console.log('L'));
});

d = new Deck;





