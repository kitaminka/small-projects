const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const radius = 10;

const gravitation = 0.1;

let x = 100;
let y = 100;
let vx = 3;
let vy = 3;

let prevX, prevY;
let ballMoving = false;

function updateBall() {
    requestAnimationFrame(updateBall);

    if (!ballMoving) {
        if (y + vy + radius >= canvas.height) {
            vy = -vy * 0.5;
            vx = vx * 0.8;
            y = canvas.height - radius;
        }
        if (y + vy - radius <= 0) {
            vy = -vy * 0.5;
            vx = vx * 0.8;
            y = radius;
        }
        if (x + vx + radius >= canvas.width) {
            vx = -vx * 0.5;
            vy = vy * 0.8
            x = canvas.width - radius;
        }
        if (x + vx - radius <= 0) {
            vx = -vx * 0.5;
            vy = vy * 0.8
            x = radius;
        }

        x += vx;
        y += vy;
        vy += gravitation;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
}
function moveBall(event) {
    if (!ballMoving) return;

    x = event.x - canvas.offsetLeft;
    y = event.y - canvas.offsetTop;
    vx = x - prevX;
    vy = y - prevY;
    prevX = x;
    prevY = y;
}

canvas.onmousedown = (event) => {
    ballMoving = true;
    moveBall(event);
}
canvas.onmouseup = () => {
    ballMoving = false;
}
canvas.onmousemove = moveBall;

updateBall();