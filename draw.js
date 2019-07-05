window.addEventListener("DOMContentLoaded", function()
{
	var cvs = document.getElementById("canvas");
	var ctx = cvs.getContext("2d");
	
	
	var img = new Image();   // Создаём новый объект Image
	
	img.onload = function() {
		ctx.drawImage(img, 140, 60, 30, 40);
	};

// Загружаем файл изображения
img.src = "output/y_70368999ca_1.jpg";
});



class Deck {
	constructor {
		for (var i = 0; i < 48; i++) {
			
		}
	}
	var deck = [];
	
}

//0 - field; 1 - stadium; 2 - road, 3 - building
class card {
	contains[5];
	constructor(name) {
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

	}
}