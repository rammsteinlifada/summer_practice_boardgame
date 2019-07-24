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
    let meeplePosition = Math.trunc(card.meepleCharacteristic / 10);
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
    if (meeplePosition == 5 && card.name[4] == 'b')
        return 4;
    switch (meeplePosition){
        case 2:
            if (card.name[1] == 'r')
                return 1;
            break;
        case 8:
            if (card.name[3] == 'r')
                return 3;
            break;
        case 4:
            if (card.name[0] == 'r')
                return 0;
            break;
        case 6:
            if (card.name[2] == 'r')
                return 2;
            break;
        case 5:
            if (card.name[4] == 'r')
                return 4;
            break;
    }
    if ((meeplePosition < 4 && card.name[1] == 'f') ||
        (meeplePosition % 3 == 1 && card.name[0] == 'f') ||
        (meeplePosition > 6 && card.name[3] == 'f') ||
        (meeplePosition % 3 == 0 && card.name[2] == 'f') ||
        (meeplePosition == 5 && card.name[4] == 'f')) {
        return -1;
    }
    return -1;
}

function fullDfs(i, j, k, player, flag) {
    console.log(i, j);
    if ((!player.used[i][j][k]) && (game.f.field[i][j])) {
        if (game.f.field[i][j].name[k] != flag)
            return;
        let a = checkMeeplePosition(i, j);
        player.used[i][j][k] = true;
        if ((game.f.field[i][j].isMeeple) && ( (a == k) || (((flag == 's') && (game.f.field[i][j].name[4] == 's') && (game.f.field[i][j].name[a] == 's')) ||
            ((flag == 'r') && (game.f.field[i][j].name[4] != 'e') && (game.f.field[i][j].name[a] == 'r'))))){
            console.log("sdfg");
            player.occupiedFlag = false;
        }
        if (((game.f.field[i][j].name[4] == 's') && (flag == 's')) || (( flag == 'r') && game.f.field[i][j].name[4] != 'e')) {
            player.used[i][j][4] = true;
            for (let k = 0; k < 4; k++) {
                if ((game.f.field[i][j].name[k] == 's' && flag == 's') || (game.f.field[i][j].name[k] == 'r' && flag == 'r')) {
                    let a = edjes(i, j, k, game.players[game.currentPlayer]);
                    fullDfs(a[0], a[1], a[2], a[3], flag);
                }
            }
        }
    }
}
function checkConflict(i, j) {
    game.players[game.currentPlayer].occupiedFlag = true;
    for (let i = 1; i < 102 ; i++) {
        for (let j = 1; j < 102; j++) {
            game.players[game.currentPlayer].used[i][j] = [false, false, false, false];
        }
    }
    position = checkMeeplePosition(i, j);
    let kind;
    if (game.f.field[i][j].name[position] == 's'){
        kind = 's';
    }
    else {
        if (game.f.field[i][j].name[position] == 'r') {
            kind = 'r';
        }
    }
    game.players[game.currentPlayer].used[i][j][position] = true;
    if (((kind == 's' && game.f.field[i][j].name[4] != 's') || ((kind == 'r') && (game.f.field[i][j].name[4] == 'e')))) {
        let a = edjes(i, j, position, game.players[game.currentPlayer]);
        fullDfs(a[0], a[1], a[2], a[3], kind)
         return game.players[game.currentPlayer].occupiedFlag;
    }
    else {
        game.players[game.currentPlayer].used[i][j][4] = true;
        for (let k = 0; k < 4; k++) {
            if (((game.f.field[i][j].name[k] == 's')&&(game.f.field[i][j].name[4] == 's')&& (kind == 's')) ||
                ((game.f.field[i][j].name[k] == 'r')&&(game.f.field[i][j].name[4] != 'e')&& (kind == 'r'))){
                let a = edjes(i, j, k, game.players[game.currentPlayer]);
                fullDfs(a[0], a[1], a[2], a[3], kind);
            }
        }
        return game.players[game.currentPlayer].occupiedFlag;

    }

}
function dfs(i, j, k, player, occupiedMeeples, flag){
    if (player.used[i][j][k]){
        return;
    }
    if (!game.f.field[i][j]){
        player.isolation = false;
    }
    else{
        if (game.f.field[i][j].name[k] != flag)
            return;
        if (game.f.field[i][j].name[5] == 'y' && flag == 's') {
            player.localScore += 2;
        }
        else{
            player.localScore += 1;
        }
        let a = checkMeeplePosition(i, j);
        if ((game.f.field[i][j].isMeeple) && ( (a == k) || (((flag == 's') && (game.f.field[i][j].name[4] == 's') && (game.f.field[i][j].name[a] == 's')) ||
            ((flag == 'r') && (game.f.field[i][j].name[4] != 'e') && (game.f.field[i][j].name[a] == 'r'))))){
                occupiedMeeples.push([i, j]);
        }
        player.used[i][j][k] = true;
        if (((game.f.field[i][j].name[4] == 's') && (flag == 's')) || (( flag == 'r') && game.f.field[i][j].name[4] != 'e')){
            player.used[i][j][4] = true;
            for (let k = 0; k < 4; k++) {
                if ((game.f.field[i][j].name[k] == 's' && flag == 's') || (game.f.field[i][j].name[k] == 'r' && flag == 'r')) {
                    let a = edjes(i, j, k, player);
                    dfs(a[0], a[1], a[2], a[3], occupiedMeeples, flag);
                }
            }
        }
    }
}

function checkBuilding(i, j){
    let localScore = 1;
    if (game.f.field[i - 1][j])
        localScore++;
    if (game.f.field[i - 1][j - 1])
        localScore++;
    if (game.f.field[i][j - 1])
        localScore++;
    if (game.f.field[i + 1][j - 1])
        localScore++;
    if (game.f.field[i + 1][j])
        localScore++;
    if (game.f.field[i + 1][j + 1])
        localScore++;
    if (game.f.field[i][j + 1])
        localScore++;
    if (game.f.field[i - 1][j + 1])
        localScore++;
    return localScore;
}

function edjes(i, j, k, player){ // определение смежной карточки по позиции мипла на карточке
    player.used[i][j][k] = true;
    if (k == 0)
        return [i-1, j, 2, player];
    if (k == 1)
        return [i, j-1, 3, player];
    if (k == 2)
        return [i+1, j, 0, player];
    if (k == 3)
        return [i, j+1, 1, player];
}

function scoreCount() {
    const n = 100;
    for (let i = 1; i < n - 1; i++) {
        for (let j = 1; j < n - 1; j++) {
            if ((!game.f.field[i][j]) || (game.f.field[i][j].meepleCharacteristic == 0)) {
                continue;
            }
            let occupiedMeeples = [];
            meeplePlayer = game.f.field[i][j].meepleCharacteristic % 10;
            game.players[meeplePlayer].isolation = true;
            game.players[meeplePlayer].localScore = 0;
            position = checkMeeplePosition(i, j);
            console.log(position);
            if (game.f.field[i][j].name[4] == 'b' && position == 4){
                console.log(checkBuilding(i, j), " asdfgh");
                game.players[meeplePlayer].scoreB += checkBuilding(i, j);
                continue;
            }
            if (game.players[meeplePlayer].used[i][j][position]){
                continue;
            }
            if (game.f.field[i][j].isMeeple)
                occupiedMeeples.push([i, j]);
            game.players[meeplePlayer].meeplesOnStructure += 1;
            let kind;
            if (game.f.field[i][j].name[position] == 's'){
                kind = 's';
            }
            else{
                if (game.f.field[i][j].name[position] == 'r') {
                    kind = 'r';
                }
                else{
                    continue;
                }
            }
            if ((game.f.field[i][j].name[5] == 'y') && (kind == 's')){
                game.players[meeplePlayer].localScore += 2;
            }
            else {
                game.players[meeplePlayer].localScore += 1;
            }
            game.players[meeplePlayer].used[i][j][position] = true;
            if (((kind == 's' && game.f.field[i][j].name[4] != 's') || ((kind == 'r') && (game.f.field[i][j].name[4] == 'e'))))  {
                let a = edjes(i, j, position, game.players[meeplePlayer]);
                dfs(a[0], a[1], a[2], a[3], occupiedMeeples, kind);
            }
            else {
                game.players[meeplePlayer].used[i][j][4] = true;
                for (let k = 0; k < 4; k++) {
                    if (((game.f.field[i][j].name[k] == 's')&&(game.f.field[i][j].name[4] == 's')&& (kind == 's')) ||
                        ((game.f.field[i][j].name[k] == 'r')&&(game.f.field[i][j].name[4] != 'e')&& (kind == 'r'))) {
                        let a = edjes(i, j, k, game.players[meeplePlayer]);
                        dfs(a[0], a[1], a[2], a[3], occupiedMeeples, kind);
                    }
                }
            }
            if (game.players[meeplePlayer].isolation) {
                game.players[meeplePlayer].localScore *= 2;
                for (let k = 0; k < occupiedMeeples.length; k++) {
                    let i1 = occupiedMeeples[k][0];
                    let j1 = occupiedMeeples[k][1];
                    game.f.field[i1][j1].isMeeple = false;
                    let block = document.getElementById("Meeples" + meeplePlayer);
                    let image = document.createElement("img");
                    image.id = game.players[meeplePlayer].usedMeeples.pop() ;
                    image.src = "player" + meeplePlayer + ".png";
                    block.appendChild(image);
                }
            }
            if (kind == 's') {
                game.players[meeplePlayer].scoreS += game.players[meeplePlayer].localScore;
            }
            else {
                game.players[meeplePlayer].scoreR += game.players[meeplePlayer].localScore;
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
                    game.f.field[i][j] = new Card(b);
                    for (let j = 0; j < 4; j++) {

                    }
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
                const sz_3 = Math.floor(sz / 3);
                let i = Math.floor((e.pageX - game.r.dx) / sz);
                let j = Math.floor((e.pageY - game.r.dy - 250 ) / sz) ;
                let id = im.id;
                let a = Math.floor(((e.pageX - game.r.dx) % sz) / 33 + 1);
                let b = Math.floor(((e.pageY - game.r.dy - info.top) % sz) / 33 + 1);
                let pos = 0;
                pos = (b - 1) * 3 + a;
                game.f.field[game.curI][game.curJ].meepleCharacteristic = 10*pos + game.currentPlayer;
                console.log(checkMeeplePosition(game.curI,game.curJ));
                if ((game.curI != i) || (game.curJ != j) || ((pos == 5) && (game.f.field[game.curI][game.curJ].name[4] == 'e')) || (checkMeeplePosition(game.curI,game.curJ) == -1) ||
                    (((pos != 5)&&(game.f.field[game.curI][game.curJ].name[4] != 'b'))) ||
                    (( checkMeeplePosition(game.curI,game.curJ) != -1)&&(!checkConflict(i, j)))){
                    game.f.field[game.curI][game.curJ].meepleCharacteristic = 0;
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
                    game.f.field[game.curI][game.curJ].isMeeple = true;
                    let block = document.getElementById("Meeples" + game.currentPlayer);
                    let imageMeeple = document.getElementById(game.lastId);
                    if  (!game.isRemoved) {
                        imageMeeple.remove();
                        game.isRemoved = true;
                        game.players[game.currentPlayer].usedMeeples.push(game.lastId);
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
    console.log(game.players[2].number,game.players[3].number);
    for (let k = 1; k < 5; k++) {
        game.players[k].scoreS = 0;
        game.players[k].scoreB = 0;
        game.players[k].scoreR = 0;
        game.players[k].scoreF = 0;
        game.players[k].meeplesOnStructure = 0;
        for (let i = 1; i < 102 ; i++) {
            for (let j = 1; j < 102; j++) {
                game.players[k].used[i][j] = [false, false, false, false];
            }
        }
    }
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
    game.r.redraw  ();
    for (let k = 1; k < 5; k++) {
        game.players[k].showScore(k);
    }
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

function loadMap(){
    let text = document.getElementById("textarea").value;
    let obj = JSON.parse(text);
    game.f.field = obj;
    game.r.redraw();
}


class Card{
    //name;
    //meeplePos;
    constructor(namee){
        this.isOccupied = [0, 0, 0, 0, 0];
        this.name = namee;
        this.isMeeple = false;
        this.meepleCharacteristic = 0; // 0 - есть мипл, xy - x позиция мипла, y - чьего игрока мипл
    }
}

class Player {
    //meeplesCount;
    constructor(n) {
        this.meepleFlag = false;
        this.occupiedFlag = true;
        this.cardFlag = true;
        this.number = n;
        this.scoreB = 0;
        this.scoreF = 0;
        this.scoreR = 0;
        this.scoreS = 0;
        this.localScore = 0;
        this.isolation = true;
        this.usedMeeples = [];
        this.meeplesOnStructure = 0;
        this.showScore(n);
        this.used = [[]];
        const x = 102;
        for (let i = 1; i < x ; i++) {
            this.used.push([]);
            for (let j = 1; j < x ; j++) {
                this.used[i].push([false, false, false, false]);
            }
        }
    }

    showScore(n){
        let score = this.scoreB + this.scoreF + this.scoreR + this.scoreS;
        let canvas = document.getElementById("player" + n);
        let context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.font = "22px Verdana";
        context.strokeText(n +" player", 10, 20);
        context.strokeText("score: " + score, 10, 50);
    }
}

class Field {
    constructor() {
        this.field = [];
        const n = 102;
        for (let i = 0; i < n; ++i) {
            this.field.push([]);
            for (let j = 0; j < n; ++j)
                this.field[i].push('');
        }
        this.field[50][50] = new Card('rsrfrn');

    }
}