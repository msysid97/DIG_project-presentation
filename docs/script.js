'use strict'
// 1行目に記載している 'use strict' は削除しないでください

class Character {
    constructor(characterId, level, id) {
        this.characterId = characterId;
        this.innerLevel = level;
        this.elementId = id;
        // this.characterId(characterId);
        // this.level(level);
    }
    // set elementId(id){
    //     this.elementId = id;
    // }
    // get elementId(){
    //     return this.elementId;
    // }
    // get characterId(){
    //     return this.characterId;
    // }
    get level() {
        return this.innerLevel;
    }
    // set characterId(input){
    //     this.characterId = input;
    // }
    set level(input) {
        let playerElement = document.querySelector("#player");
        if (playerElement !== null) {
            playerElement.querySelector(".level").innerText = `${input}`;
        }
        this.innerLevel = input;
    }
    // createEnemyCharacters(characterCount, )
}

class Room {
    constructor(characters, live) {
        this.characters = characters;
        this.live = true;
    }
    createEnemyRoomes(roomCount) {
        let result = [];
        for (let i = 0; i < roomCount; i++) {
            result.push(new Room());
        }
    }
    set elementId(id) {
        this.elementId = id;
    }
    get elementId() {
        return this.elementId;
    }
}

class Tower {
    constructor(towerId, roomes) {
        this.towerId = towerId;
        this.roomes = roomes;
    }
}


/**
 * 全ステージ構成
 * @type {Array(Tower)}
 */
const stage = [
    ,
    new Tower(
        1,
        [
            new Room([
                new Character("enemy_1", 5)
            ]),
            new Room([
                new Character("enemy_1", 10)
            ]),
        ]
    ),
    new Tower(
        2,
        [
            new Room([
                new Character("enemy_1", 10),
                new Character("enemy_1", 10)
            ]),
            new Room([
                new Character("enemy_1", 40)
            ]),
        ]
    ),
    new Tower(
        3,
        [
            new Room([
                new Character("enemy_1", 150)
            ]),
            new Room([
                new Character("enemy_1", 10)
            ]),
            new Room([
                new Character("enemy_1", 20)
            ]),
            new Room([
                new Character("enemy_1", 5),
                new Character("enemy_1", 5),
                new Character("enemy_1", 5),
                new Character("enemy_1", 5),
            ]),
        ]
    ),
];

/**
 * 自タワーのHTML要素を生成
 */
function createPlayerTowerElement() {
    const playerTowerElement = document.createElement("div");
    // const playerTowerElement = document.querySelector("#playerTower");
    // console.log(playerTowerElement);
    playerTowerElement.className = "tower";
    playerTowerElement.id = "playerTower";
    document.querySelector("#game").appendChild(playerTowerElement);

    for (let i = 0; i < 5; i++) {
        let roomElement = createPlayerRoomElement(i);
        roomElement.style.position = "absolute";
        // roomElement.style.top = `${707 - 125 * (i + 1)}px`;
        roomElement.style.bottom = `${125 * i}px`;
        roomElement.style.left = "0px";
        roomElement.style.visibility = "hidden";
        roomElement.innerHTML = "<img src=\"media/room_player.png\">";
        playerTowerElement.appendChild(roomElement);
    }

    let playerRoomElement_0 = document.querySelector("#playerRoom_0");
    // console.log(playerRoomElement_0);
    playerRoomElement_0.style.visibility = "visible";

    let playerElement = createCharacterElement(player, "player");
    // let playerElement = document.createElement("div");
    playerElement.style.position = "absolute";
    playerElement.style.top = "0px";
    playerElement.style.left = "0px";
    // playerElement.innerHTML = "<img src=\"media/player.png\">";
    playerRoomElement_0.appendChild(playerElement);

    // let playerLevelElement = document.createElement("div");
    // playerLevelElement.innerText = `${player.level}`;
    // playerLevelElement.style.fontSize = "20px";
    // playerLevelElement.style.fontWeight = "bold";
    // playerLevelElement.style.color = "red";
    // playerLevelElement.style.position = "absolute";
    // playerLevelElement.style.top = "0px";
    // playerLevelElement.style.left = "20px";
    // playerElement.appendChild(playerLevelElement);
}


/**
 * 敵タワーのHTML要素を生成
 */
function createEnemyTowerElement() {
    const enemyTowerElement = document.createElement("div");
    enemyTowerElement.className = "tower";
    enemyTowerElement.id = "enemyTower";
    document.querySelector("#game").appendChild(enemyTowerElement);

    for (let i = 0; i < 4; i++) {
        let roomElement = createEnemyRoomElement(i);
        roomElement.style.position = "absolute";
        roomElement.style.bottom = `${125 * i}px`;
        roomElement.style.left = "0px";
        roomElement.style.visibility = "visible";
        roomElement.innerHTML = "<img src=\"media/room_enemy.png\">";
        enemyTowerElement.appendChild(roomElement);
    }
}

/**
 * 自タワーの部屋のHTML要素を生成
 * @param {number} floor - 階
 */
function createPlayerRoomElement(floor) {
    const playerRoomElement = document.createElement("div");
    playerRoomElement.className = "room";
    playerRoomElement.id = `playerRoom_${floor}`;
    playerRoomElement.style.display = "block";
    playerRoomElement.style.width = 100;
    playerRoomElement.style.height = 125;
    // console.log(playerRoomElement);
    return playerRoomElement;
}

/**
 * 敵タワーの部屋のHTML要素を生成
 * @param {number} floor - 階
 */
function createEnemyRoomElement(floor) {
    const enemyRoomElement = document.createElement("div");
    enemyRoomElement.className = "room";
    enemyRoomElement.id = `enemyRoom_${floor}`;
    enemyRoomElement.style.display = "block";
    enemyRoomElement.style.width = 100;
    enemyRoomElement.style.height = 125;
    enemyRoomElement.addEventListener("click", battle);
    // console.log(playerRoomElement);
    return enemyRoomElement;
}

/**
 * キャラクターのHTML要素を生成
 * @param {Character} characterStatus - キャラ情報オブジェクト
 * @param {string} id - HTML要素のid
 */
function createCharacterElement(characterStatus, id) {
    let result = document.createElement("div");
    result.className = "character";
    result.id = id;
    // result.style.position = "absolute";
    // result.style.top = "0px";
    // result.style.left = "0px";
    result.innerHTML = `<img src=\"media/${characterStatus.characterId}.png\">`;

    let levelElement = document.createElement("div");
    levelElement.className = "level";
    levelElement.innerText = `${characterStatus.level}`;
    levelElement.style.fontSize = "20px";
    levelElement.style.fontWeight = "bold";
    levelElement.style.color = "red";
    levelElement.style.position = "absolute";
    levelElement.style.top = "0px";
    levelElement.style.left = "20px";
    result.appendChild(levelElement);
    result.appendChild(createDownMark());
    return result;
}

/**
 * 自タワーを初期化
 */
function clearPlayerTowerElement() {
    const roomElements = document.querySelector("#playerTower").querySelectorAll(".room");
    roomElements.forEach(e => e.style.visibility = "hidden");
    document.querySelector("#playerRoom_0").style.visibility = "visible";
    playerTowerHight = 0;
}

/**
 * 敵タワーを初期化
 */
function clearEnemyTowerElement() {
    const roomElements = document.querySelector("#enemyTower").querySelectorAll(".room");
    const characterElements = document.querySelector("#enemyTower").querySelectorAll(".character");
    roomElements.forEach(e => e.style.visibility = "hidden");
    characterElements.forEach(e => e.remove());
}

/**
 * ステージを読み込み、HTML要素に反映
 * @param {number} stageNo - ステージNo
 */
function readStage(stageNo) {
    const stageTower = stage[stageNo];
    const roomElements = document.querySelector("#enemyTower").querySelectorAll(".room");
    clearPlayerTowerElement();
    clearEnemyTowerElement();
    stageTower.roomes.forEach((e, i) => {
        roomElements[i].style.visibility = "visible";
        stageTower.roomes[i].characters.forEach((e, j) => {
            // e.elementId = `enemy_${stageNo}-${j}`;
            // let character = createCharacterElement(e, e.elementId);
            let character = createCharacterElement(e, `enemy_${stageNo}-${j}`);
            character.style.position = "absolute";
            character.style.bottom = "0px";
            character.style.right = `${j * 60}px`;
            roomElements[i].appendChild(character);
        });
    });
}


function createDownMark() {
    const downMarkElement = document.createElement("div");
    downMarkElement.className = "downMark";
    downMarkElement.style.position = "absolute";
    downMarkElement.style.bottom = "0px";
    downMarkElement.style.left = "0px";
    downMarkElement.innerHTML = "<img src=\"media/down.png\">";
    downMarkElement.style.visibility = "hidden";
    return downMarkElement;
}


function isLiveAnyEnemy() {
    return stage[currentStage].roomes.reduce((r, e) => r || e.live, false);
}


function initializeScreen() {
    document.querySelector("#homebutton").addEventListener("click", dark);
}

function dark() {
    const screenElement = document.querySelector("#darkScreen");
    if (screenElement.style.visibility === "hidden") {
        screenElement.style.visibility = "visible";
        console.log("off");
    } else {
        screenElement.style.visibility = "hidden";
        console.log("on");
    }
}

/**
 * ゲームスタート時初期化
 */
function initializeGame() {
    currentStage = 1;
    currentRoom = -1;   // -1: playerTower
    playerTowerHight = 0;
    // 自タワー表示
    createPlayerTowerElement();

    // 敵タワー生成
    createEnemyTowerElement();
    // ステージ情報読み込み&表示
    readStage(currentStage);
}

/**
 * プレイヤーのキャラクター
 * @type {Character}
 */
const player = new Character("player", 5);
/**
 * プレイヤーのタワー
 * @type {Tower}
 */
const playersTower = new Tower(0, [new Room(player)]);


/**
 * 現在プレイ中のステージ
 * @type {number}
 */
let currentStage;
/**
 * 現在playerCharacterがいる部屋
 * -1 : 自タワー1階, 0~n : 敵タワーn階
 * @type {number}
 */
let currentRoom;
/**
 * 自タワーの高さ
 * @type {number}
 */
let playerTowerHight;



function testListner(e) {
    // window.alert(JSON.stringify(e));
    console.log(e.currentTarget);
    // e.currentTarget.style.visibility = e.target.style.visibility === 'hidden' ? 'visible' : 'hidden';
    // e.currentTarget.style.visibility = 'hidden';
    setVisibility(e, 'hidden');
    // sleep(1000);
    // e.currentTarget.style.visibility = e.target.style.visibility === 'hidden' ? 'visible' : 'hidden';
    // e.currentTarget.style.visibility = 'visible';
    let target = e.currentTarget;
    setInterval(() => target.style.visibility = 'visible', 1000);
}

function setVisibility(e, str) {
    e.currentTarget.style.visibility = str;
}


function battle(e) {
    const targetRoomElement = e.currentTarget;
    const targetCharacterElements = targetRoomElement.querySelectorAll(".character");
    const targetRoom = stage[currentStage].roomes[Number(targetRoomElement.id.slice(10))];
    if (targetRoom.live) {
        let flagRoomWin = true;
        const prevPlayerLevel = player.level;
        // console.log(targetRoomElement.id.slice(10));
        // console.log(targetRoom);
        // console.log(targetRoomElement);
        // console.log(targetCharacterElements);
        for (let i = 0; i < targetRoom.characters.length; i++) {
            // targetRoom.characters.forEach((e, i) => {
            let e = targetRoom.characters[i];
            if (player.level >= e.level && flagRoomWin) {
                targetCharacterElements[i].querySelector(".downMark").style.visibility = undefined;
                window.alert(`versus Enemy${i + 1}....... You win!!`);
                player.level += e.level;
            } else {
                window.alert(`versus Enemy${i + 1}....... You Lose.....`);
                flagRoomWin = false;
                break;
            }
            // });
        }
        if (flagRoomWin) {
            targetRoom.characters.forEach((e, i) => targetCharacterElements[i].style.visibility = "hidden");
            window.alert(`You Victory!!! (your level ${prevPlayerLevel} -> ${player.level})`);
            targetRoom.live = false;
            document.querySelector(`#playerRoom_${++playerTowerHight}`).style.visibility = "visible";
        } else {
            location.reload();
        }
        // console.log(isLiveAnyEnemy());
        if (!isLiveAnyEnemy()) {
            if (stage[++currentStage] !== undefined) {
                window.alert("The enemy tower is eliminated.\nGoto next Stage...");
                readStage(currentStage);
            } else {
                window.alert("All Clear!!");
            }
        }
    }
}

{
    initializeScreen();
    initializeGame();
}