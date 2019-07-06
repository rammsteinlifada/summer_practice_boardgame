class Renderer {
	constructor() {
		let cvs = document.getElementById("canvas");
		this.ctx = cvs.getContext("2d");

		this.dx = 50;
		this.dy = 50;

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

	redraw() {
		let f = this.f;
		const sz = 60;
		for (let i = 0; i < f.field.length; ++i)
			for (let j = 0; j < f.field[i].length; ++j) {
				if (!f.field[i][j]) continue;
				console.log(f.field[i][j]);
				console.log(this.cardImages[f.field[i][j]]);
				if (this.cardImages[f.field[i][j]])
				this.ctx.drawImage(this.cardImages[f.field[i][j]], sz * (i - this.dx), sz * (j - this.dy), sz, sz);
			}
	}
}

var r;
window.addEventListener("DOMContentLoaded", function() {
	r = new Renderer();
});



