const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const border = 10;
const maxStep = 50;

let x, y, stepX, stepY;

draw();

function draw() {
    ctx.beginPath();
    stepX = maxStep
    x = Math.random() * canvas.width;
    y = Math.random() * canvas.height;
    ctx.lineTo(x, y);
    for (let i = 0; i < 1000; i++) {
        if (i % 2 === 0) {
            stepX = Math.random() * maxStep;
            ctx.strokeStyle = '#33ff33';
        } else {
            stepX = -(Math.random() * maxStep);
            ctx.strokeStyle = '#ff3333';
        }
        // stepX = Math.random() * maxStep - maxStep / 2;
        stepY = Math.random() * maxStep - maxStep / 2;
        // ctx.strokeStyle = `#${Math.floor(Math.random()*16777215).toString(16)}`;
        // if (stepX > 20) {
        //     ctx.strokeStyle = '#33ff33';
        // } else {
        //     ctx.strokeStyle = '#ff3333';
        // }
        ctx.moveTo(x, y);
        x += stepX;
        y += stepY;
        if (y > canvas.height - border) {
            y = canvas.height - border;
        }
        if (x > canvas.width - border) {
            x = canvas.width - border;
        }
        if (y < border) {
            y = border;
        }
        if (x < border) {
            x = border;
        }
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
    }
}