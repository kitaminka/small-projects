const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const spreadElem = document.getElementById('spread');
const ammoElem = document.getElementById('ammo');
const reloadingElem = document.getElementById('reloading');
const scoreElem = document.getElementById('score');

const balloonWidth = 30;
const balloonHeight = 40;
const bulletHoleWidth = 15;
const bulletHoleHeight = 20;

let balloonX, balloonY;
let mouseX, mouseY;

let gunInterval;
let bulletSpread = 1;
let ammo = 30;
let score = 0;

let hitBalloonLoaded = false;

const balloonImg = new Image();
const hitBalloonImg = new Image();
const bulletHoleImg = new Image();

canvas.width = 500;
canvas.height = 500;

balloonImg.src = './img/balloon.png';
hitBalloonImg.src = './img/hit_balloon.png';
bulletHoleImg.src = './img/bullet_hole.png';

document.onmousemove = (event) => {
    mouseX = event.x;
    mouseY = event.y;
};

balloonImg.onload = drawBalloon;
hitBalloonImg.onload = () => {
    hitBalloonLoaded = true;
}
bulletHoleImg.onload = () => {
    canvas.onmousedown = startShooting;
    canvas.onmouseup = stopShooting;
}

function drawBalloon() {
    balloonX = Math.random() * (canvas.width - balloonWidth);
    balloonY = Math.random() * (canvas.height - balloonHeight);

    ctx.drawImage(balloonImg, balloonX, balloonY, balloonWidth, balloonHeight);
}
function drawBullet() {
    if (ammo <= 0) {
        stopShooting();
        return;
    }
    if (bulletSpread < 32) {
        bulletSpread *= 2;
        spreadElem.innerHTML = `Spread: ${bulletSpread}`;
    }
    ammo--;
    ammoElem.innerHTML = `Ammo: ${ammo}`;
    const bulletX = mouseX - canvas.offsetLeft + window.scrollX + (Math.random() * bulletSpread - bulletSpread / 2);
    const bulletY = mouseY - canvas.offsetTop + window.scrollY + (Math.random() * bulletSpread - bulletSpread / 2);

    if (hitBalloonLoaded && balloonX <= bulletX && balloonX + balloonWidth >= bulletX && balloonY <= bulletY && balloonY + balloonHeight >= bulletY) {
        score++;
        scoreElem.innerHTML = `Score: ${score}`;
        ctx.drawImage(hitBalloonImg, balloonX, balloonY, balloonWidth, balloonHeight);
        drawBalloon();
    }

    ctx.drawImage(bulletHoleImg, bulletX - bulletHoleWidth / 2, bulletY - bulletHoleHeight / 2, bulletHoleWidth, bulletHoleHeight);
}
function decreaseSpread() {
    if (bulletSpread > 1) {
        bulletSpread /= 2;
        spreadElem.innerHTML = `Spread: ${bulletSpread}`;
    } else {
        clearInterval(gunInterval);
    }

}
function startShooting() {
    if (ammo > 0) {
        drawBullet();
        clearInterval(gunInterval);
        gunInterval = setInterval(drawBullet, 100);
    }
}
function reload() {
    reloadingElem.innerHTML = 'Reloading...';
    setTimeout(() => {
        ammo = 30;
        ammoElem.innerHTML = `Ammo: ${ammo}`;
        reloadingElem.innerHTML = '';
    }, 1000);
}
function stopShooting() {
    clearInterval(gunInterval);
    gunInterval = setInterval(decreaseSpread, 300);
    if (ammo <= 0) reload();
}