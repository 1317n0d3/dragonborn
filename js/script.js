var
    canv = document.getElementById('canvas'),
    ctx = canv.getContext('2d');

canv.width = window.innerHeight;
canv.height = window.innerHeight;

ctx.fillStyle = "#000";
ctx.fillRect(0, 0, canv.width, canv.height);

var
    knightIdle = new Image(),
    knightIdleRev = new Image(),
    knightRun = new Image(),
    knightRunRev = new Image(),
    knightJump = new Image(),
    bg1 = new Image(),
    bg2 = new Image(),
    bg3 = new Image(),
    bg4 = new Image(),
    bg5 = new Image(),
    bg6 = new Image(),
    bg7 = new Image(),
    bg8 = new Image(),
    bg9 = new Image(),
    fg1 = new Image(),
    fg2 = new Image();

knightIdle.src = "img/knight/KnightIdle_strip.png";
knightIdleRev.src = "img/knight/KnightIdleRev_strip.png";
knightRun.src = "img/knight/KnightRun_strip.png";
knightRunRev.src = "img/knight/KnightRunRev_strip.png";
knightJump.src = "img/knight/KnightJumpAndFall_strip.png";
bg1.src = "img/background/Layer_0010_1.png";
bg2.src = "img/background/Layer_0009_2.png";
bg3.src = "img/background/Layer_0008_3.png";
bg4.src = "img/background/Layer_0007_Lights.png";
bg5.src = "img/background/Layer_0006_4.png";
bg6.src = "img/background/Layer_0005_5.png";
bg7.src = "img/background/Layer_0004_Lights.png";
bg8.src = "img/background/Layer_0003_6.png";
bg9.src = "img/background/Layer_0002_7.png";
fg1.src = "img/background/Layer_0001_8.png";
fg2.src = "img/background/Layer_0000_9.png";

var enemies = [];

class Enemy {
    constructor(image, xPos, yPos, dead, step) {
        this.xPos = xPos;
        this.yPos = yPos;

        this.image = new Image();
        this.image.src = image;

        this.dead = false;

        this.step = 10;
    }
}

var currentframe = 0,
    currentframeRun = 0,
    currentframeJump = 0,
    tick_count = 0,
    key = -1;

window.addEventListener("resize", Resize); // изменение размеров холста при изменении размеров окна

function Resize() {
    canv.width = window.innerHeight;
    canv.height = window.innerHeight;
}

document.addEventListener("keydown", function(e) { // управление
    console.log(e.keyCode);
    key = e.keyCode;
});

document.addEventListener("keyup", function(e) {
    key = -1;
});

function RandomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

var
    xPos = 10,
    yPos = canv.height - 130, // Позиция главного героя
    rotate = 1,
    animSpeed = 3,
    speed = 7;

function draw() {
    ctx.clearRect(0, 0, canv.width, canv.height); // очистка холста от предыдущего кадра
    ctx.drawImage(bg1, 0, canv.height - bg1.height);
    ctx.drawImage(bg2, 0, canv.height - bg2.height);
    ctx.drawImage(bg3, 0, canv.height - bg3.height);
    ctx.drawImage(bg4, 0, canv.height - bg4.height);
    ctx.drawImage(bg5, 0, canv.height - bg5.height);
    ctx.drawImage(bg6, 0, canv.height - bg6.height);
    ctx.drawImage(bg7, 0, canv.height - bg7.height);
    ctx.drawImage(bg8, 0, canv.height - bg8.height);
    ctx.drawImage(bg9, 0, canv.height - bg9.height);
    ctx.drawImage(fg1, 0, canv.height - fg1.height);

    tick_count += 1;

    if(key == 65) { // передвижение влево
        xPos = xPos < 10 ? xPos : xPos - speed; // левая граница
        rotate = -1;

        if(tick_count > animSpeed) {
            currentframeRun = (currentframeRun === 672 ? 0 : currentframeRun + 96);
            tick_count = 0;
        }
        ctx.drawImage(knightRunRev, currentframeRun, 0, 64, 64, xPos, yPos, 96, 96);

    } else if(key == 68) { // передвижение вправо
        xPos = xPos > canv.width - 180 ? xPos : xPos + speed; // правая граница
        rotate = 1;

        if(tick_count > animSpeed) {
            currentframeRun = (currentframeRun === 672 ? 0 : currentframeRun + 96);
            tick_count = 0;
        }
        ctx.drawImage(knightRun, currentframeRun, 0, 64, 64, xPos, yPos, 96, 96);

    // } else if(key == 87) { // прыжок
    //     yPos += -10;

    //     if(tick_count > 10) {
    //         currentframeJump = (currentframeJump > 2160 ? 0 : currentframeJump + 154);
    //         tick_count = 0;
    //     }
    //     ctx.drawImage(knightJump, currentframeJump, 0, 64, 64, xPos, yPos, 96, 96);

    } else { // стойка в покое
        if(rotate === 1) {
            if(tick_count > animSpeed) { // анимация
                currentframe = (currentframe === 896 ? 0 : currentframe + 64);
                tick_count = 0;
            }
            ctx.drawImage(knightIdle, currentframe, 0, 64, 64, xPos, yPos, 96, 96);
        } else {
            if(tick_count > animSpeed) { // анимация
                currentframe = (currentframe === 896 ? 0 : currentframe + 64);
                tick_count = 0;
            }
            ctx.drawImage(knightIdleRev, currentframe, 0, 64, 64, xPos, yPos, 96, 96);
        }
    }

    if(RandomInteger(0, 10000) > 9950) {
        enemies.push(new Enemy("img/knight/KnightIdleRev_strip.png", canv.width + 100, yPos));
    }

    for(var i = 0; i < enemies.length; i++) {
        ctx.drawImage(enemies[i].image, currentframe, 0, 64, 64, enemies[i].xPos, enemies[i].yPos, 96, 96);
        if(enemies[i].step)
            enemies[i].xPos = xPos < enemies[i].xPos ? enemies[i].xPos - 1 : enemies[i].xPos + 1;
    }

    

    ctx.drawImage(fg2, 0, canv.height - fg2.height);

    if(yPos < (canv.height - 130)) yPos += 7; // гравитация
    requestAnimationFrame(draw);
}

fg2.onload = draw;