let cardTypes = [
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

objValues = {
    "r":[1, 1],
    "s":[1, 2],
    "f":[0, 1],
    "b":[0, 9],
};

function isPlaced(im, i, j, field, b) {
    if (!checkPlace(i, j, field)) {
        return false;
    }
    if ((!field[i - 1][j] || field[i - 1][j].name[2] === b[0]) &&
        (!field[i + 1][j] || field[i + 1][j].name[0] === b[2]) &&
        (!field[i][j - 1] || field[i][j - 1].name[3] === b[1]) &&
        (!field[i][j + 1] || field[i][j + 1].name[1] === b[3])) {
        return true;
    }
}

function checkPlace(a, b, field) {
    if (field[a][b])
        return false;
    if ((a === 0) || (a === 101) || (b === 0) || (b === 101))
        return false;
    if (field[a - 1][b - 1] || field[a + 1][b - 1] || field[a - 1][b + 1] || field[a + 1][b + 1]) {
        return true;
    } else {
        if (!field[a - 1][b] && !field[a + 1][b] && !field[a][b + 1] && !field[a][b - 1])
            return false;
    }
    return true;
}

function fill_tip(a, b){
    let cvs = document.getElementById("canvas");
    let ctx = cvs.getContext("2d");
    ctx.strokeStyle = "#000";
    ctx.fillStyle = "#3cc1ff";
    ctx.fillRect((a - 1) * 100, b * 100 + 200, 100, 100);
}

function onCanvas(e){
    let cvs = document.getElementById("canvas");
    let info = cvs.getBoundingClientRect();
    return !((info.left > e.pageX) || (info.right < e.pageX) || (info.top > e.pageY) || (info.bottom < e.pageY));

}

class Deck {
    shuffle(o) {
        for (let j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x) ;
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
        let a = this.last_image;
        a = a[3] + a.substring(0, 3) + a.substring(4, 6);
        this.last_image = a;

        let image = document.getElementById("cards");
        image.src = "pics/" + a + ".jpg";
    }

    show_card() {
        let block = document.getElementById("sharpp");
        if (block.childElementCount >= 2)
            return;
        if (this.deck.length <= 0) {
            alert("GAME OVER");
            return 0;
        }

        let a = this.deck[this.deck.length - 1];
        let image = document.createElement("img");
        image.id = "cards";
        image.src = "pics/" + a + ".jpg";
        block.appendChild(image);
        let im = document.getElementById("cards");
        this.last_image = a;
        this.deck.pop();
        initDragObj(im, "tile");
    }
}

function initDragObj (im, flag) {
	im.onmousedown = function (e) {
		let coords = getCoords(im);
		let shiftX = e.pageX - coords.left;
		let shiftY = e.pageY - coords.top;

		im.style.position = 'absolute';
		document.body.appendChild(im);
		moveAt(e);

		im.style.zIndex = 1000; // над другими элементами

		function moveAt(e) {
			im.style.left = e.pageX - shiftX + 'px';
			im.style.top = e.pageY - shiftY + 'px';
		}

		document.onmousemove = function (e) {
			moveAt(e);
		};

		im.ondragstart = () => false;
		im.onmouseup = function (e) {
		    if (flag === "tile") {
                const sz = 100;
                let i = Math.floor((e.pageX - game.r.dx) / sz);
                let j = Math.floor((e.pageY - game.r.dy) / sz) - 2;
                let b = game.d.last_image;
                if (isPlaced(im, i, j, game.r.f.field, b) && onCanvas(e)) {
                    game.r.f.field[i][j] = new Card(b);
                    game.curI = i;
                    game.curJ = j;
                    game.r.redraw();
                    document.onmousemove = null;
                    im.onmouseup = null;
                    im.remove();
                    game.players[game.currentPlayer].score = 20;
                    game.players[game.currentPlayer].showScore(currentPlayer);

                }
                else {
                    document.onmousemove = null;
                    im.onmouseup = null;
                }
            }
		    else {
		        let card;
                const sz = 100;
                let i = Math.floor((e.pageX - game.r.dx) / sz);
                let j = Math.floor((e.pageY - game.r.dy) / sz) - 2;
                let b = game.d.last_image;
                if (isPlaced(im, i, j, game.r.f.field, b) && onCanvas(e)) {
                    card = new Card(b, '.....');
                    game.r.f.field[i][j] = card;
                    game.r.redraw();
                    document.onmousemove = null;
                    im.onmouseup = null;
                    im.remove();
                    game.players[game.currentPlayer].score = 20;
                    game.players[game.currentPlayer].showScore(currentPlayer);
                    // if (game.currentPlayer == 4) {
                    // 	game.currentPlayer = 1;
                    // }
                    // else {
                    // 	game.currentPlayer++;
                    // }
                }
                else {
                    document.onmousemove = null;
                    im.onmouseup = null;
                }
            }
		}
	};

}

function getCoords(elem) {
    let box = elem.getBoundingClientRect();
    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
    }
}

function saveMap(filename){
	let dataStr = JSON.stringify(game.r.f.field);
	console.log(dataStr);
    let textarea = document.getElementById("textarea");
    textarea.value = dataStr;
}

function giveMeeple() {
    let block = document.getElementById("meeple" + currentPlayer);
    console.log(currentPlayer);

    if (block.childElementCount === 1) {
        return;
    }

    let image = new Image();
    image.src = "player" + currentPlayer + ".png";
    image.id = "meeple" + currentPlayer;
    image.height = 20;
    image.width = 20;
    block.appendChild(image);
}

function dragMeeple(player) {
    if (player !== currentPlayer)
        return;
    console.log("pl" + player);
    let im = document.getElementById("meeple" + player);
    initDragObj(im, "meeple" + player);
}

class Meeple{
    coordMeepX;
    coorfMeepY;
    constructor() {

    }
}

class Card{
	name;
	meeplePos;
	ii;
	jj;
	constructor(namee, pos){
		this.name = namee;
		this.meeplePos = pos;
	}
}

class Player {
    meeplesCount;
    constructor(n) {
        this.meeplesCount = 6;
        this.score = 0;
        this.meeples = [];
        for (let i = 0; i < 6; ++i) {
            this.meeples[i] = new Meeple(n, i);
        }
        this.showScore(n);
        this.showMeepleCount(n);
    }

    showScore(n){
        let canvas = document.getElementById("player" + n);
        let	context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.font = "22px Verdana";
        context.strokeText(n +" player", 10, 20);
        context.strokeText("score: " + this.score, 10, 50);
    }

    showMeepleCount(n) {
        let canvas = document.getElementById("player" + n);
        let	context = canvas.getContext("2d");
        context.font = "22px Verdana";

        context.strokeText("meeples: " + this.meeplesCount, 10, 80);
    }
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
        this.field[50][50] = new Card('rsrfrn', '.....');

    }
}

function searchComplete() {
    let fieldVisited = [];

    for (let i = 0; i < 100; ++i) {
        fieldVisited.push([]);
    }

    let field = game.r.f.field;
    let tempPoints = [];
    let queue = [];
    let card = new Card(field[game.curI][game.curJ].name);
    card.ii = game.curI;
    card.jj = game.curJ;
    fieldVisited[card.ii][card.jj] = true;
    queue.push(field[game.curI][game.curJ]);
    let cardForPushing = new Card();
    while(queue.length > 0) {
        card = queue.pop();
        fieldVisited[card.ii][card.jj] = true;
        for (let i = 0; i < 4; i++) {
            if (field[card.ii + 1][card.jj] && (field[card.ii + 1][card.jj][i] === field[card.ii + 1][card.jj][(i + 2) % 4] === 's' ||
                field[card.ii + 1][card.jj][i] === field[card.ii + 1][card.jj][(i + 2) % 4] === 'r')) {
                if (!fieldVisited[card.ii + 1][card.jj]) {
                    cardForPushing.name = field[card.ii + 1][card.jj].name;
                    cardForPushing.meeplePos = field[card.ii + 1][card.jj].meeplePos;
                    cardForPushing.ii = card.ii + 1;
                    cardForPushing.jj = card.jj;
                    queue.push(cardForPushing);
                }
            }

            if (field[card.ii - 1][card.jj] && (field[card.ii - 1][card.jj][i] === field[card.ii - 1][card.jj][(i + 2) % 4] === 's' ||
                field[card.ii - 1][card.jj][i] === field[card.ii - 1][card.jj][(i + 2) % 4] === 'r')) {
                if (!fieldVisited[card.ii - 1][card.jj]) {
                    cardForPushing.name = field[card.ii - 1][card.jj].name;
                    cardForPushing.meeplePos = field[card.ii - 1][card.jj].meeplePos;
                    cardForPushing.ii = card.ii - 1;
                    cardForPushing.jj = card.jj;
                    queue.push(cardForPushing);
                }
            }

            if (field[card.ii][card.jj + 1] && (field[card.ii][card.jj + 1][i] === field[card.ii][card.jj + 1][(i + 2) % 4] === 's' ||
                field[card.ii][card.jj + 1][i] === field[card.ii][card.jj + 1][(i + 2) % 4] === 'r')) {
                if (!fieldVisited[card.ii][card.jj + 1]) {
                    cardForPushing.name = field[card.ii][card.jj + 1].name;
                    cardForPushing.meeplePos = field[card.ii][card.jj + 1].meeplePos;
                    cardForPushing.ii = card.ii;
                    cardForPushing.jj = card.jj + 1;
                    queue.push(cardForPushing);
                }
            }

            if (field[card.ii][card.jj - 1] && (field[card.ii][card.jj - 1][i] === field[card.ii][card.jj - 1][(i + 2) % 4] === 's' ||
                field[card.ii][card.jj - 1][i] === field[card.ii][card.jj - 1][(i + 2) % 4] === 'r')) {
                if (!fieldVisited[card.ii][card.jj - 1]) {
                    cardForPushing.name = field[card.ii][card.jj - 1].name;
                    cardForPushing.meeplePos = field[card.ii][card.jj - 1].meeplePos;
                    cardForPushing.ii = card.ii;
                    cardForPushing.jj = card.jj - 1;
                    queue.push(cardForPushing);
                }
            }
        }

    }
}

class CheckClosed {
    constructor() {

        
    }
}