var cardtypes = require('./cardTypes');
class deck {
	this.deck = new Array();
	function shuffle(o) {
		for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
		return o;
	};
	var nums = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];

	create() {
		for (var i = 0; i < 5; i++) {
			var random = shuffle(nums);
			for (var j = 0; i < 24; i++) {
				this.deck.push(new card ( cardTypes[random[j]] ) )
		}
	}	
}

//0 - field; 1 - stadium; 2 - road, 3 - building
class card {
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
	
	enum position{
		onBuilding,
		onRoad,
		onStadium,
		onField
	}
	enum stage{
		uncompleted,
		completed
	}
}

class field{
	hint(){
		
	}
}