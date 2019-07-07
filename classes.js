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
var turn_number = 0
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
		if (this.deck.length > 0) {
			document.getElementById("sharp").src ="pics/" + this.deck[this.deck.length -  1] + ".jpg"
			this.deck.pop()
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

class meeple{
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
