"use strict";

//s-stadium, f-field, r-road, b-buiding, e-entry

var cardTypes = [
'ffffbn',
'fffrbn',
'sssssn',
'sssfsn',
'ssffsn',
'ssrrsn',
'sfsfsn',
'ssfffn',
'fsfsfn',
'fsfffn',
'rsfrrn',
'fsrrrn',
'rsrren',
'rsrfrn',
'frfrrn',
'rffrrn',
'rfrren',
'rrrren',
'sssfsy',
'sfsfsy',
'ssrrsy',
'ssffsy',
'sssrsn',
'sssrsy',
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
	}
	
	show_card() {				
		var block = document.getElementById("sharpp");
		var a = this.deck[this.deck.length -  1]
		var image = document.createElement("img");
		image.id = "cards";
		image.src = "pics/" + a + ".jpg";
		block.appendChild(image);
		var ball = document.getElementById("cards");

		this.deck.pop();
ball.onmousedown = function(e) {

  var coords = getCoords(ball);
  var shiftX = e.pageX - coords.left;
  var shiftY = e.pageY - coords.top;

  ball.style.position = 'absolute';
  document.body.appendChild(ball);
  moveAt(e);

  ball.style.zIndex = 1000; // над другими элементами

  function moveAt(e) {
    ball.style.left = e.pageX - shiftX + 'px';
    ball.style.top = e.pageY - shiftY + 'px';
  }

  document.onmousemove = function(e) {
    moveAt(e);
  };

  ball.onmouseup = function() {
    document.onmousemove = null;
    ball.onmouseup = null;
  };

}

ball.ondragstart = function() {
  return false;
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
	contains = new Array();	
	
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
	drag_and_drop(){
		
	}
	/*
	enum position{
		onBuilding,
		onRoad,
		onStadium,
		onField
	}
	enum stage{
		uncompleted
		completed
	}*/
}

class Field {

	constructor() {
		this.field = [];
		const n = 100;
		for (let i = 0; i < n; ++i) {
			this.field.push([]);
			for (let j = 0; j < n; ++j)
				this.field[i].push('');
		}
		let i = Math.floor(n / 2);
		this.field[i][i + 1] = 'rsrfrn';
		this.field[i][i + 2] = 'rrfsfn';
		this.field[i][i + 3] = 'frrffn';
	}
}

var d = new Deck();
//assert(d.deck.length == 120);
//console.log(d.deck);	
