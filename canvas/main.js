const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const colorChange = 10;
const shadowDisplacement = 0.08;

const maxGenomeByte = 255;

const startX = 500;
const startY = 800;

const segmentDisplacement = 2;

const levelCount = 4;
const paramCount = 6;

const maxLength = 100;
const minLength = 10;

const maxSize = 40;
const minSize = 10;

const maxSizeChanges = 0.3;
const minSizeChanges = -0.3;

let genome = [
    255, 200, 0, 200, 100, 200,
    255, 140, 125, 255, 255, 0,
    200, 0, 125, 255, 255, 0,
    2, 3, 10, 0, 0, 255
];

function drawCircle(x, y, radius, rColor, gColor, bColor) {
    if (radius < 0) {
        radius = -radius
    }
    ctx.beginPath();
    ctx.fillStyle = `#${(rColor - colorChange).toString(16).padStart(2, '0')}${(gColor - colorChange).toString(16).padStart(2, '0')}${(bColor - colorChange).toString(16).padStart(2, '0')}`;
    ctx.arc(x-radius*shadowDisplacement, y-radius*shadowDisplacement, radius, 0, 2*Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = `#${(rColor + colorChange).toString(16).padStart(2, '0')}${(gColor + colorChange).toString(16).padStart(2, '0')}${(bColor + colorChange).toString(16).padStart(2, '0')}`;
    ctx.arc(x+radius*shadowDisplacement, y+radius*shadowDisplacement, radius, 0, 2*Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = `#${rColor.toString(16).padStart(2, '0')}${gColor.toString(16).padStart(2, '0')}${bColor.toString(16).padStart(2, '0')}`;
    ctx.arc(x, y, radius, 0, 2*Math.PI);
    ctx.fill();
}

let x = startX;
let y = startY;
let turn = 0;

for (let i = 0; i < levelCount; i++) {
    drawLevel(genome.slice(i*paramCount, i*paramCount+paramCount));
    turn += 1;

}

function drawLevel(params) {
    console.log(`drawing ${params}`);

    const length = params[0] / (maxGenomeByte / (maxLength - minLength)) + minLength;
    let size = params[1] / (maxGenomeByte / (maxSize - minSize)) + minSize;
    const sizeChanges = params[2] / (maxGenomeByte / (maxSizeChanges - minSizeChanges)) + minSizeChanges;

    for (let i = 0; i < length; i++) {
        drawCircle(x, y, size, params[3], params[4], params[5]);
        size += sizeChanges;
        y -= segmentDisplacement;
        y -= turn;
        y -= turn;
    }
}