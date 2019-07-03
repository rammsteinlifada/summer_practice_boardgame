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