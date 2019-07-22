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

function checkMeeplePosition(i, j){
    let card = game.f.field[i][j];
    let meeplePosition = Math.trunc(card.isMeeple / 10);
    if (meeplePosition < 4 && card.name[1] == 's')
        return 1;
    if (meeplePosition % 3 == 1 && card.name[0] == 's')
        return 0;
    if (meeplePosition > 6 && card.name[3] == 's')
        return 3;
    if (meeplePosition % 3 == 0 && card.name[2] == 's')
        return 2;
    if (meeplePosition == 5 && card.name[4] == 's')
        return 4;
    /*switch (meeplePosition){
        case 2:
            if (card[1] == 'r')
                return 1;
            break;
        case 8:
            if (card[3] == 'r')
                return 3;
            break;
        case 4:
            if (card[0] == 'r')
                return 0;
            break;
        case 6:
            if (card[2] == 'r')
                return 2;
            break;
    }

     */
}
function dfs(used, i, j, flag){
    if (used[i][j] == 1){
        return;
    }
    used[i][j] = 1;
    if (!game.f.field[i][j]){
        flag = false;
    }
    else{
        console.log(i, j);
        score += 2;
        if (game.f.field[i][j].name[4] == 's'){
            for (let k = 0; k < 4; k++) {
                if (game.f.field[i][j].name[k] == 's') {
                    edjes(used, i, j, k, flag);
                }
            }
        }
    }
}
function edjes(used, i, j, k, flag){
    if (k == 0)
        dfs(used,i-1, j, flag);
    if (k == 1)
        dfs(used, i, j-1, flag);
    if (k == 2)
        dfs(used,i+1, j, flag);
    if (k == 3)
        dfs(used, i, j+1, flag);
}
function scoreCount(){
    score = 0;
    let used = [[]];
    const n = 101
    for (let i = 1; i < n-1; i++){
        used.push([]);
        for (let j = 1; j < n-1; j++) {
            used[i].push(0);
        }
    }
    for (let i = 1; i < n-1; i++){
        for (let j = 1; j < n-1; j++){
            if (!game.f.field[i][j]){
                continue;
            }
            if (game.f.field[i][j].isMeeple != 0){
                if (used[i][j] == 1){
                    continue;
                }
                let flag = true;
                score += 2;
                used[i][j] = 1;
                position = checkMeeplePosition(i, j);
                if (game.f.field[i][j].name[4] != 's') {
                    edjes(used, i, j, position, flag);
                    if (flag) {
                        score = score * 2;
                    }
                    flag = true;
                    console.log(score,'3');
                }
                else{
                    for (let k = 0; k < 4; k++){
                        if (game.f.field[i][j].name[k] == 's'){
                            let flag = true;
                            edjes(used, i, j, k, flag);
                        }
                    }
                    if (flag){
                        score = score * 2;
                    }
                }

            }
        }
    }
}


function onCanvas(e){
    let cvs = document.getElementById("canvas");
    let info = cvs.getBoundingClientRect();
    return !((info.left > e.clientX) || (info.right < e.clientX) || (info.top > e.clientY) || (info.bottom < e.clientY));

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

        let image = document.getElementById("cards" + this.deck.length);
        image.src = "pics/" + a + ".jpg";
    }

    show_card() {
        if (!game.players[game.currentPlayer].cardFlag){
            return;
        }
        let block = document.getElementById("sharpp");
        if (block.childElementCount >= 2)
            return;
        if (this.deck.length <= 0) {
            alert("GAME OVER");
            return 0;
        }
        let len = this.deck.length - 1;
        game.players[game.currentPlayer].cardFlag = false;
        let a = this.deck[len];
        let image = document.createElement("img");
        image.id = "cards" + len;
        image.src = "pics/" + a + ".jpg";
        block.appendChild(image);
        let im = document.getElementById("cards" + len);
        this.last_image = a;
        this.deck.pop();
        initDragObj(im, "tile");;
    }
}

function initDragObj (im, flag) {
	im.onmousedown = function (e) {

	    if ((flag == "meeple") && (!game.players[game.currentPlayer].meepleFlag)){
	        return;
        }
        if ((flag == "meeple")){
            let id = im.id;
            if (id[6] != game.currentPlayer){
                return;
            }
            game.players[game.currentPlayer].meepleFlag = false;
            game.isRemoved = false;
        }
		let coords = getCoords(im);
		let shiftX = e.pageX - coords.left;
		let shiftY = e.pageY - coords.top;

		im.style.position = 'absolute';
		document.body.appendChild(im);
		moveAt(e);

		im.style.zIndex = 1000;

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
                let i = Math.floor((e.pageX - game.r.dx + 5) / sz );
                let j = Math.floor((e.pageY - game.r.dy +5) / sz) - 3;
                let b = game.d.last_image;
                if (isPlaced(im, i, j, game.f.field, b) && onCanvas(e)) {
                    game.f.field[i][j] = new Card(b, '.....');
                    game.curI = i;
                    game.curJ = j;
                    game.r.redraw();
                    document.onmousemove = null;
                    im.onmouseup = null;
                    im.remove();
                    game.nextTurnFlag = true;
                    cnt = 0;
                    for (let j = 0; j < 6; j++) {
                        let meeple = document.getElementById("meeple" + game.currentPlayer + j);
                        game.players[game.currentPlayer].meepleFlag = true;
                         initDragObj(meeple, "meeple");

                    }
                }
                else {
                    document.onmousemove = null;
                    im.onmouseup = null;
                }
            }
		    else {
		        let cvs = document.getElementById("canvas");
		        let info = cvs.getBoundingClientRect();
                const sz = 100;
                const sz_3 = Math.floor(sz / 3)
                console.log(e.pageY - game.r.dy );
                let i = Math.floor((e.pageX - game.r.dx) / sz);
                let j = Math.floor((e.pageY - game.r.dy ) / sz) - 3;
                let id = im.id;
                let a = Math.floor(((e.pageX - game.r.dx) % sz) / 33 + 1);
                let b = Math.floor(((e.pageY - game.r.dy - info.top) % sz) / 33 + 1);
                console.log(a, b);
                console.log(i, j);
                let pos = 0;
                pos = (b - 1) * 3 + a;
                console.log(pos);
                if ((game.curI != i) || (game.curJ != j) || ((pos == 5) && (game.f.field[game.curI][game.curJ].name == 'e') )) {
                    let block = document.getElementById("Meeples" + game.currentPlayer);
                    let imageMeeple = document.getElementById(id);
                    imageMeeple.remove();
                    let image = document.createElement("img");
                    image.id = id;
                    image.src = "player" + game.currentPlayer + ".png";
                    block.appendChild(image);
                    game.players[game.currentPlayer].meepleFlag = true;
                    initDragObj(image, "meeple");
                }
                else {
                    game.lastId = id;
                    game.f.field[game.curI][game.curJ].isMeeple = 10*pos + game.currentPlayer;
                    let block = document.getElementById("Meeples" + game.currentPlayer);
                    let imageMeeple = document.getElementById(game.lastId);
                    if  (!game.isRemoved) {
                        imageMeeple.remove();
                        game.isRemoved = true;
                    }
                    game.r.redrawMeeples();
                    document.onmousemove = null;
                    im.onmouseup = null;

                }
            }
		}
	};

}
function nextTurn() {
    if (!game.nextTurnFlag)
        return
    if (game.players[game.currentPlayer].cardFlag){
        return;
    }
    let prevPlayer = document.getElementById("player" + game.currentPlayer);
    prevPlayer.style.boxShadow = "";
    game.players[game.currentPlayer].meepleFlag = false;
    game.currentPlayer ++;
    if (game.currentPlayer == 5) {
        game.currentPlayer = 1;
    }
    let player = document.getElementById("player" + game.currentPlayer);
    player.style.boxShadow = "0 0 20px rgba(0, 47, 255, 0.6), inset 0 0 120px rgba(0, 47, 255, 0.6)";
    game.players[game.currentPlayer].cardFlag= true;
    game.nextTurnFlag = false;
    scoreCount();
}
function getCoords(elem) {
    let box = elem.getBoundingClientRect();
    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
    }
}

function saveMap(filename){
	let dataStr = JSON.stringify(game.f.field);

    let textarea = document.getElementById("textarea");
    textarea.value = dataStr;
}


/*class Meeple{
    coordMeepX;
    coorfMeepY;
    constructor() {

    }
}
*/
class Card{
	//name;
	//meeplePos;
    //isMeeple;
	constructor(namee, pos){
		this.name = namee;
		this.isMeeple = 0; // 0 - есть мипл, xy - x позиция мипла, y - чьего игрока мипл
		this.meeplePos = pos;
	}
}

class Player {
    //meeplesCount;
    constructor(n) {
        this.meepleFlag = false;
        this.cardFlag = true;
        this.scoreB = 0;
        this.scoreF = 0;
        this.scoreR = 0;
        this.scoreS = 0;
        //this.meeples = [];
        //for (let i = 0; i < 6; ++i) {
          //  this.meeples[i] = new Meeple(n, i);
        //}
        //this.showScore(n);
    }

    /*showScore(n){
        let score = scoreB + scoreF + scoreR + scoreS;
        let canvas = document.getElementById("player" + n);
        let	context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.font = "22px Verdana";
        context.strokeText(n +" player", 10, 20);
        context.strokeText("score: " + score, 10, 50);
    }

         */
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
        this.field[50][50] = new Card('rsrfrn', '.........');

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