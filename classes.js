"use strict";

//s-stadium, f-field, r-road, b-buiding, e-entry

// var cardTypes1 = {
// 	'1': {
// 		left = "field";
// 		up = "field";
// 		right = "field";
// 		down = "field";
// 		center = "building";
// 	};
// 	'2': {
// 		left = "field";
// 		up = "field";
// 		right = "field";
// 		down = "road";
// 		center = "building";
// 	};
// 	'3': {
// 		left = "stadium";
// 		up = "stadium";
// 		right = "stadium";
// 		down = "stadium";
// 		center = "stadium";
// 	};
// '4':{
// 		left = "stadium";
// 		up = "stadium";
// 		right = "stadium";
// 		down = "field";
// 		center = "stadium";
// 	};
// '5': {
// 		left = "stadium";
// 		up = "stadium";
// 		right = "field";
// 		down = "field";
// 		center = "stadium";
// 	};
// '6': {
// 		left = "stadium";
// 		up = "stadium";
// 		right = "road";
// 		down = "road";
// 		center = "stadium";
// 	};
// '7': {
// 		left = "stadium";
// 		up = "field";
// 		right = "stadium";
// 		down = "field";
// 		center = "stadium";
// 	};
// '8': {
// 		left = "stadium";
// 		up = "stadium";
// 		right = "field";
// 		down = "field";
// 		center = "field";
// 	};
// '9': {
// 		left = "field";
// 		up = "stadium";
// 		right = "field";
// 		down = "stadium";
// 		center = "field";
// 	};
// '10': {
// 		left = "field";
// 		up = "stadium";
// 		right = "field";
// 		down = "field";
// 		center = "field";
// 	};
// '11': {
// 		left = "road";
// 		up = "stadium";
// 		right = "field";
// 		down = "road";
// 		center = "road";
// 	};
// '12': {
// 		left = "field";
// 		up = "stadium";
// 		right = "road";
// 		down = "road";
// 		center = "road";
// 	};
// '13': {
// 		left = "road";
// 		up = "stadium";
// 		right = "road";
// 		down = "road";
// 		center = "entry";
// 	};
// '14': {
// 		left = "road";
// 		up = "stadium";
// 		right = "road";
// 		down = "field";
// 		center = "road";
// 	};
// '15': {
// 		left = "field";
// 		up = "road";
// 		right = "field";
// 		down = "road";
// 		center = "road";
// 	};
// '16': {
// 		left = "road";
// 		up = "field";
// 		right = "field";
// 		down = "road";
// 		center = "road";
// 	};
// '17': {
// 		left = "road";
// 		up = "field";
// 		right = "road";
// 		down = "road";
// 		center = "entry";
// 	};
// '18': {
// 		left = "road";
// 		up = "road";
// 		right = "road";
// 		down = "road";
// 		center = "entry";
// 	};
// '19': {
// 		left = "stadium";
// 		up = "stadium";
// 		right = "stadium";
// 		down = "field";
// 		center = "stadium";
// 	};
// '20': {
// 		left = "stadium";
// 		up = "field";
// 		right = "stadium";
// 		down = "field";
// 		center = "stadium";
// 	};
// '21': {
// 		left = "stadium";
// 		up = "stadium";
// 		right = "road";
// 		down = "road";
// 		center = "stadium";
// 	};
// '22': {
// 		left = "stadium";
// 		up = "stadium";
// 		right = "field";
// 		down = "field";
// 		center = "stadium";
// 	};
// '23': {
// 		left = "stadium";
// 		up = "stadium";
// 		right = "stadium";
// 		down = "road";
// 		center = "stadium";
// 	};
// '24': {
// 		left = "stadium";
// 		up = "stadium";
// 		right = "stadium";
// 		down = "road";
// 		center = "stadium";
// 	};
// }

var cardTypes = [
'ffffbn',//1
'fffrbn',//2
'sssssn',//3
'sssfsn',//4
'ssffsn',//5
'ssrrsn',//6
'sfsfsn',//7
'ssfffn',//8
'fsfsfn',//9
'fsfffn',//10
'rsfrrn',//11
'fsrrrn',//12
'rsrren',//13
'rsrfrn',//14
'frfrrn',//15
'rffrrn',//16
'rfrren',//17
'rrrren',//18
'sssfsy',//19
'sfsfsy',//20
'ssrrsy',//21
'ssffsy',//22
'sssrsn',//23
'sssrsy',//24
];
var turn_number = 0;
var coord = 50;
class Deck {
	shuffle(o) {
		for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
		return o;
	}

	constructor() {
		this.deck = [];
		for (let i = 0; i < 4; i++)
			this.deck = this.deck.concat(cardTypes);
		this.deck = this.shuffle(this.deck);
		this.last_image;

	}

	rotation(){
		var a = this.last_image;
		a = a[3] + a.substring(0, 3) + a.substring(4, 6);
		this.last_image = a;
		console.log(this.last_image);
		var image = document.getElementById("cards");
		image.src = "pics/" + a + ".jpg";
	}


	show_card() {
		var block = document.getElementById("sharpp");
		if (block.childElementCount < 2) {
			var a = this.deck[this.deck.length - 1];
			var image = document.createElement("img");
			image.id = "cards";
			image.src = "pics/" + a + ".jpg";
			block.appendChild(image);
			var im = document.getElementById("cards");
			this.last_image = a;
			this.deck.pop();
			im.onmousedown = function(e) {
				var coords = getCoords(im);
				var shiftX = e.pageX - coords.left;
				var shiftY = e.pageY - coords.top;

				im.style.position = 'absolute';
				document.body.appendChild(im, 50,50);
				moveAt(e);



				im.style.zIndex = 1000; // над другими элементами

				function moveAt(e) {
					im.style.left = e.pageX - shiftX + 'px';
					im.style.top = e.pageY - shiftY + 'px';
				}

				document.onmousemove = function(e) {
					moveAt(e);
				};

				im.onmouseup = function(e) {
					var newX = (e.pageX - e.pageX % 100);
					var newY = e.pageY - e.pageY % 100 - 200;
					var i = newX / 100;
					var j = newY / 100;
					var b = d.last_image;
					console.log(d.last_image);
					if ((e.screenX) < 1000 && (e.screenY.toFixed()) > 200 && (e.screenY.toFixed()) < 1200) {
						if (!r.f.field[i][j]) {

							if (i > 0 && i < 9 && j > 0 && j < 9) {
								if (((!r.f.field[i - 1][j]) || (r.f.field[i - 1][j][2] == b[0])) && ((!r.f.field[i + 1][j]) || (r.f.field[i + 1][j][0] == b[2])) &&
									((!r.f.field[i][j - 1]) || (r.f.field[i][j - 1][3] == b[1])) && ((!r.f.field[i][j + 1]) || (r.f.field[i][j + 1][1] == b[3]))) {

									r.ctx.drawImage(image, newX, newY);
									r.f.field[i][j] = b;
									document.onmousemove = null;
									im.onmouseup = null;
									im.remove();
								}
								else {
									document.onmousemove = null;
									im.onmouseup = null;
								};

							}
							else {
								if (i == 0) {
									if (((!r.f.field[i + 1][j]) || (r.f.field[i + 1][j][0] == b[2])) &&
										((!r.f.field[i][j - 1]) || (r.f.field[i][j - 1][3] == b[1])) && ((!r.f.field[i][j + 1]) || (r.f.field[i][j + 1][1] == b[3]))) {

										r.ctx.drawImage(image, newX, newY);
										r.f.field[i][j] = b;
										document.onmousemove = null;
										im.onmouseup = null;
										im.remove();
									}
									else {
										document.onmousemove = null;
										im.onmouseup = null;
									};
								}
								else if (i == 9) {
									if (((!r.f.field[i - 1][j]) || (r.f.field[i - 1][j][2] == b[0])) &&
										((!r.f.field[i][j - 1]) || (r.f.field[i][j - 1][3] == b[1])) && ((!r.f.field[i][j + 1]) || (r.f.field[i][j + 1][1] == b[3]))) {

										r.ctx.drawImage(image, newX, newY);
										r.f.field[i][j] = b;
										document.onmousemove = null;
										im.onmouseup = null;
										im.remove();
									}
									else {
										document.onmousemove = null;
										im.onmouseup = null;
									};
								}
								else if (j == 0) {
									if (((!r.f.field[i - 1][j]) || (r.f.field[i - 1][j][2] == b[0])) && ((!r.f.field[i + 1][j]) || (r.f.field[i + 1][j][0] == b[2])) &&
										 ((!r.f.field[i][j + 1]) || (r.f.field[i][j + 1][1] == b[3]))) {

										r.ctx.drawImage(image, newX, newY);
										r.f.field[i][j] = b;
										document.onmousemove = null;
										im.onmouseup = null;
										im.remove();
									}
									else {
										document.onmousemove = null;
										im.onmouseup = null;
									};
								}
								else if (j == 9) {
									if (((!r.f.field[i - 1][j]) || (r.f.field[i - 1][j][2] == b[0])) && ((!r.f.field[i + 1][j]) || (r.f.field[i + 1][j][0] == b[2])) &&
										((!r.f.field[i][j - 1]) || (r.f.field[i][j - 1][3] == b[1])) ) {

										r.ctx.drawImage(image, newX, newY);
										r.f.field[i][j] = b;
										document.onmousemove = null;
										im.onmouseup = null;
										im.remove();
									}
									else {
										document.onmousemove = null;
										im.onmouseup = null;
									};
								}
							}

						};
					};

				};


			};
			im.ondragstart = function() {
				return false;
			};
			
		};




		function getCoords(elem) {   // кроме IE8-
  			var box = elem.getBoundingClientRect();
  			return {
    			top: box.top + pageYOffset,
    			left: box.left + pageXOffset
  			};
		}
	}
}

//0 - field; 1 - stadium; 2 - road, 3 - building
class Card {
	contains = [];
	
	ident(name) {
		for (var i = 0; i < 5; i++) {
			switch (name[i]) {
				case 'f':
					contains[i] = 0;
					break;
				case 's':
					contains[i] = 1;
					break;
				case 'r':
					contains[i] = 2;
					break;
				case 'b':
					contains[i] = 3;
					break;
			}
		}
	}
	remote(name) {
		name = name[3] + name.substring(0, 3) + name.substring(4, 6);
	}

}

class Meeple{
	// enum position{
	// 	onBuilding,
	// 	onRoad,
	// 	onStadium,
	// 	onField
	// }



	drag_and_drop(){
		
	}

	/*
	enum stage{
		uncompleted
		completed
	}*/
}

class Player {
	constructor(n) {
		var score = 0;
		this.meeples = [];
		this.pl = [];
		for (let i = 0; i < 6; ++i) {
			this.meeples[i] = new Meeple();
		}
		var canvas = document.getElementById("player"+n);
		var	context = canvas.getContext("2d");
		context.font = "22px Verdana";
		context.strokeText(n +" player", 10, 20);
		context.strokeText("score: 0", 10, 50);

	}
}

class Field {
	constructor() {
		this.field = [];
		const n = 10;
		for (let i = 0; i < n; ++i) {
			this.field.push([]);
			for (let j = 0; j < n; ++j)
				this.field[i].push('');
		}
		this.field[4][4] = 'rsrfrn'
	}
}


