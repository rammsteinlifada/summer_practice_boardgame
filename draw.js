window.addEventListener("DOMContentLoaded", function()
{
	var cvs = document.getElementById("canvas");
	var ctx = cvs.getContext("2d");
	

	var img = new Image();
	// Загружаем файл изображения
	img.src = "output/file.png";
	
	img.onload = function() {
		ctx.drawImage(img, 325, 325);
	};

	create();
});


