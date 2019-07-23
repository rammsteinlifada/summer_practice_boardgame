
class Renderer {
	constructor() {

		this.cvs = document.getElementById("canvas");
		this.ctx = this.cvs.getContext("2d");

		this.dx = -45 * 100;
		this.dy = -45 * 100;
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
				if (cnt === cardTypes.length)
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

		for (let i = 0; i < game.f.field.length; ++i)
			for (let j = 0; j < game.f.field[i].length; ++j) {
				if (!game.f.field[i][j]) {
					continue;
				}
				if (this.cardImages[game.f.field[i][j].name])
					this.ctx.drawImage(this.cardImages[game.f.field[i][j].name], sz * i + this.dx, sz * j + this.dy);
			}
		this.redrawMeeples();
	}

	redrawMeeples(){
		const sz = 100;
		for (let i = 0; i < game.f.field.length; ++i)
			for (let j = 0; j < game.f.field[i].length; ++j) {
				if ((!game.f.field[i][j]) || (game.f.field[i][j].isMeeple == 0)) {
					continue;
				}
					let meepleX = 0;
					let meepleY = Math.trunc((Math.trunc(game.f.field[i][j].isMeeple / 10) / 4)) * 25 + 16;
					if (Math.trunc(game.f.field[i][j].isMeeple / 10) % 3  == 1){
						meepleX = 15;
					}
					else{
						if (Math.trunc(game.f.field[i][j].isMeeple / 10) % 3 == 2){
							meepleX = 50;
						}
						else{
							meepleX = 80;
						}
					}
					let img = new Image();
					img.src = "player" + (game.f.field[i][j].isMeeple % 10) + ".png";
					this.ctx.drawImage(img,sz * i + this.dx + meepleX - 10,  sz * j + this.dy + meepleY);

			}
	}
	drawMeeplesAndLightning(){
		for (let i = 1; i < 5; i++){
			let block = document.getElementById("Meeples" + i);
			for (let j = 0; j < 6; j++) {
				let image = document.createElement("img");
				image.id = "meeple" + i + j;
				image.src = "player" + i + ".png";
				block.appendChild(image);
			}

		}
        let player = document.getElementById("player" + game.currentPlayer);
        player.style.boxShadow = "0 0 20px rgba(0, 47, 255, 0.6), inset 0 0 120px rgba(0, 47, 255, 0.6)";
	}
}


class Game {
	nextTurnFlag;
	f;
	isRemoved;
	r;
	players;
	d;
	currentPlayer;
	curI;
	curJ;
	lastId;
	pos;
    constructor() {
    	this.lastId;
    	this.pos;
		this.f = new Field();
    	this.nextTurnFlag = false;
        this.isRemoved = false;
        this.r = new Renderer();
        this.players = [];
        for (let i = 1; i < 5; ++i)
            this.players[i] = new Player(i);
        this.d = new Deck;
        this.currentPlayer = 1;
        this.curI = 50;
        this.curJ = 50;
    }
}

let game;
window.addEventListener("DOMContentLoaded", function() {
    game = new Game();
    game.r.drawMeeplesAndLightning();
    game.nextTurnFlag = false;
});



//json parse




