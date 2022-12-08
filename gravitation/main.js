const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const radius = 10;

const acceleration = 9.81;
const updateInterval = 10;

let pvx, pvy;

let x = 100;
let y = 100;
let vx = 3;
let vy = 3;

function updateBall() {
    if (y + vy + radius >= canvas.height || y + vy - radius <= 0) {
        vy = -vy ;
    }
    if (x + vx + radius >= canvas.width || x + vx - radius <= 0) {
        vx = -vx;
    }

    pvx = vx;
    pvy = vy;
    x += vx;
    y += vy;
    // vx -= Math.sqrt(Math.abs(pvx^2 + pvy^2)) / 10;
    vy += acceleration / (1000 / updateInterval);
    // vy -= Math.sqrt(Math.abs(pvx^2 + pvy^2)) / 10;

    document.getElementById('vx').innerHTML = `vx: ${vx}`;
    document.getElementById('vy').innerHTML = `vy: ${vy}`;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
}

setInterval(updateBall, updateInterval);