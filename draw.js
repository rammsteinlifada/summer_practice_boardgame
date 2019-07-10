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

    	for (let i = 0; i < 12; i++){
			this.ctx.moveTo(0, sz*i + this.dy % 100);
			this.ctx.lineTo(this.cvs.width, this.dy % 100 + sz*i);
		}

		for (let i = 0; i < 12; i ++){
			this.ctx.moveTo(sz*i + this.dx % 100, 0);
			this.ctx.lineTo(this.dx % 100 + sz*i, this.cvs.width);
		}

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




