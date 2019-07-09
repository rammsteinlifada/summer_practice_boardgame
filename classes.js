"use strict";

//s-stadium, f-field, r-road, b-buiding, e-entry


var cardTypes = [
'ffffbn',//1
'ffffbn',
'ffffbn',
'ffffbn',
'fffrbn',//2
'ffrfbn',
'frffbn',
'rfffbn',
'sssssn',//3
'sssssn',
'sssssn',
'sssssn',
'sssfsn',//4
'fssssn',
'sfsssn',
'ssfssn',
'ssffsn',//5
'sffssn',
'ffsssn',
'fssfsn',
'ssrrsn',//6
'srrssn',
'rrsssn',
'rssrsn',
'sfsfsn',//7
'fsfssn',
'sfsfsn',
'fsfssn',
'ssfffn',//8
'sffsfn',
'ffssfn',
'fssffn',
'fsfsfn',//9
'sfsffn',
'fsfsfn',
'sfsffn',
'fsfffn',//10
'sffffn',
'fffsfn',
'ffsffn',
'rsfrrn',//11
'sfrrrn',
'frrsrn',
'rrsfrn',
'fsrrrn',//12
'srrfrn',
'rrfsrn',
'rfsrrn',
'rsrren',//13
'srrren',
'rrrsen',
'rrsren',
'rsrfrn',//14
'srfrrn',
'rfrsrn',
'frsrrn',
'frfrrn',//15
'rfrfrn',
'frfrrn',
'rfrfrn',
'rffrrn',//16
'ffrrrn',
'frrfrn',
'rrffrn',
'rfrren',//17
'frrren',
'rrrfen',
'rrfren',
'rrrren',//18
'rrrren',
'rrrren',
'rrrren',
'sssfsy',//19
'ssfssy',
'sfsssy',
'fssssy',
'sfsfsy',//20
'fsfssy',
'sfsfsy',
'fsfssy',
'ssrrsy',//21
'srrssy',
'rrsssy',
'rssrsy',
'ssffsy',//22
'sffssy',
'ffsssy',
'fssfsy',
'sssrsn',//23
'ssrssn',
'srsssn',
'rssssn',
'sssrsy',//24
'ssrssy',
'srsssy',
'rssssy'
];
var turn_number = 0;
var coord = 50;
class Deck {
	shuffle(o) {
		for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x) ;
		return o;
	}

	constructor() {
		this.deck = [];
		for (let i = 0; i < 1; i++)
			this.deck = this.deck.concat(cardTypes);
		this.deck = this.shuffle(this.deck);
		this.last_image;

	}

	rotation() {
		var a = this.last_image;
		a = a[3] + a.substring(0, 3) + a.substring(4, 6);
		this.last_image = a;

		var image = document.getElementById("cards");
		image.src = "pics/" + a + ".jpg";
	}


	show_card() {
		var block = document.getElementById("sharpp");
		if (block.childElementCount < 2) {
			console.log(this.deck.length);
			if (this.deck.length <= 0){
				alert("GAME OVER");
				return 0;
			}
			var a = this.deck[this.deck.length - 1];
			var image = document.createElement("img");
			image.id = "cards";
			image.src = "pics/" + a + ".jpg";
			block.appendChild(image);
			var im = document.getElementById("cards");
			this.last_image = a;
			this.deck.pop();
			im.onmousedown = function (e) {
				var coords = getCoords(im);
				var shiftX = e.pageX - coords.left;
				var shiftY = e.pageY - coords.top;

				im.style.position = 'absolute';
				document.body.appendChild(im, 50, 50);
				moveAt(e);


				im.style.zIndex = 1000; // над другими элементами

				function moveAt(e) {
					im.style.left = e.pageX - shiftX + 'px';
					im.style.top = e.pageY - shiftY + 'px';
				}

				document.onmousemove = function (e) {
					moveAt(e);
				};

				im.onmouseup = function (e) {
					var newX = (e.pageX - e.pageX % 100);
					var newY = e.pageY - e.pageY % 100 - 200;
					var i = newX / 100;
					var j = newY / 100;
					var b = d.last_image;


					if ((e.pageX) < 1000 && (e.pageY) > 200 && (e.pageY) < 1200) {

						if (i > 0 && i < 9 && j > 0 && j < 9) {
							if (!(!r.f.field[i - 1][j] && !r.f.field[i + 1][j] && !r.f.field[i][j - 1] && !r.f.field[i][j + 1])) {
								if (!r.f.field[i][j]) {
									if (((!r.f.field[i - 1][j]) || (r.f.field[i - 1][j][2] == b[0])) && ((!r.f.field[i + 1][j]) || (r.f.field[i + 1][j][0] == b[2])) &&
										((!r.f.field[i][j - 1]) || (r.f.field[i][j - 1][3] == b[1])) && ((!r.f.field[i][j + 1]) || (r.f.field[i][j + 1][1] == b[3]))) {

										r.f.field[i][j] = b;
										r.redraw();
										document.onmousemove = null;
										im.onmouseup = null;
										im.remove();
									}
									else {
										document.onmousemove = null;
										im.onmouseup = null;
									}
								}
							}
						}
						else {
							if (i == 0 && (j != 0 && j != 9)) {
								if (!(!r.f.field[i + 1][j] && !r.f.field[i][j - 1] && !r.f.field[i][j + 1])) {
									if (!r.f.field[i][j]) {
										if (((!r.f.field[i + 1][j]) || (r.f.field[i + 1][j][0] == b[2])) &&
											((!r.f.field[i][j - 1]) || (r.f.field[i][j - 1][3] == b[1])) && ((!r.f.field[i][j + 1]) || (r.f.field[i][j + 1][1] == b[3]))) {
											r.f.field[i][j] = b;
											r.redraw();
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
							}
							else if (i == 9  && (j != 0 && j != 9)) {
								if (!(!r.f.field[i - 1][j] && !r.f.field[i][j - 1] && !r.f.field[i][j + 1])) {
									if (!r.f.field[i][j]) {
										if (((!r.f.field[i - 1][j]) || (r.f.field[i - 1][j][2] == b[0])) &&
											((!r.f.field[i][j - 1]) || (r.f.field[i][j - 1][3] == b[1])) && ((!r.f.field[i][j + 1]) || (r.f.field[i][j + 1][1] == b[3]))) {
											r.f.field[i][j] = b;
											r.redraw();
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
							}
							else if (j == 0 && (i != 0 && i != 9)) {
								if (!(!r.f.field[i - 1][j] && !r.f.field[i + 1][j] && !r.f.field[i][j + 1])) {
									if (!r.f.field[i][j]) {
										if (((!r.f.field[i - 1][j]) || (r.f.field[i - 1][j][2] == b[0])) && ((!r.f.field[i + 1][j]) || (r.f.field[i + 1][j][0] == b[2])) &&
											 ((!r.f.field[i][j + 1]) || (r.f.field[i][j + 1][1] == b[3]))) {
											r.f.field[i][j] = b;
											r.redraw();
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
							}
							else if (j == 9 && (i != 0 && i != 9)) {
								if (!(!r.f.field[i - 1][j] && !r.f.field[i + 1][j] && !r.f.field[i][j - 1] )) {
									if (!r.f.field[i][j]) {
										if (
											(!r.f.field[i - 1][j] || r.f.field[i - 1][j][2] == b[0]) &&
											(!r.f.field[i + 1][j] || r.f.field[i + 1][j][0] == b[2]) &&
											(!r.f.field[i][j - 1] || r.f.field[i][j - 1][3] == b[1])
										) {
											r.f.field[i][j] = b;
											r.redraw();
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
							}

							else if (j == 0 && i == 0) {
								if (! (!r.f.field[i + 1][j] && !r.f.field[i][j + 1] )) {
									if (!r.f.field[i][j]) {
										if ( ((!r.f.field[i + 1][j]) || (r.f.field[i + 1][j][0] == b[2])) &&
											((!r.f.field[i][j + 1]) || (r.f.field[i][j + 1][1] == b[3])) ) {
											r.f.field[i][j] = b;
											r.redraw();
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
							}
							else if (j == 0 && i == 9) {
								if (!(!r.f.field[i - 1][j] && !r.f.field[i][j + 1] )) {
									if (!r.f.field[i][j]) {
										if (((!r.f.field[i - 1][j]) || (r.f.field[i - 1][j][2] == b[0])) &&
											((!r.f.field[i][j + 1]) || (r.f.field[i][j + 1][1] == b[3])) ) {
											r.f.field[i][j] = b;
											r.redraw();
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
							}

							else if (j == 9 && i == 0) {
								if (!( !r.f.field[i + 1][j] && !r.f.field[i][j - 1] )) {
									if (!r.f.field[i][j]) {
										if ( ((!r.f.field[i + 1][j]) || (r.f.field[i + 1][j][0] == b[2])) &&
											((!r.f.field[i][j - 1]) || (r.f.field[i][j - 1][3] == b[1])) ) {
											r.f.field[i][j] = b;
											r.redraw();
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
							}
							else if (j == 9 && i == 9) {
								if (!(!r.f.field[i - 1][j] && !r.f.field[i][j - 1] )) {
									if (!r.f.field[i][j]) {
										if (((!r.f.field[i - 1][j]) || (r.f.field[i - 1][j][2] == b[0])) &&
											((!r.f.field[i][j - 1]) || (r.f.field[i][j - 1][3] == b[1])) ) {
											r.f.field[i][j] = b;
											r.redraw();
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
			};

		};



		im.ondragstart = () => false;

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
		this.field[5][5] = 'rsrfrn'
	}
}


