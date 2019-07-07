class Renderer {
	constructor() {
		this.cvs = document.getElementById("canvas");
		this.ctx = this.cvs.getContext("2d");

		this.dx = - 50 * 60;
		this.dy = - 50 * 60;
		this.initDrag(this.cvs);

		this.f = new Field();
		let cnt = 0;
		this.cardImages = {};
		let self = this;
		for(let i = 0; i < cardTypes.length; ++i) {
			var img = new Image();
			this.cardImages[cardTypes[i]] = img;
			img.src = "output/" + cardTypes[i] + ".jpg";
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
		const sz = 60;
		//this.ctx.fillStyle = 'white';
		this.ctx.fillRect(0, 0, this.cvs.width, this.cvs.height);
		for (let i = 0; i < f.field.length; ++i)
			for (let j = 0; j < f.field[i].length; ++j) {
				if (!f.field[i][j]) continue;
				console.log(f.field[i][j]);
				console.log(this.cardImages[f.field[i][j]]);
				if (this.cardImages[f.field[i][j]])
				this.ctx.drawImage(this.cardImages[f.field[i][j]], sz * i + this.dx, sz * j + this.dy, sz, sz);
			}
	}
}

var r;
window.addEventListener("DOMContentLoaded", function() {
	r = new Renderer();
});



