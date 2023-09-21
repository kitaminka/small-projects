const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const colorChange = 10;
const shadowDisplacement = 0.08;

// ctx.scale(0.5, 0.5);

const maxGenomeByte = 255;

const startX = 1000;
const startY = 1500;

const levelCount = 10;
const paramCount = 15;

const maxLength = 30;
const minLength = 3;

const maxSize = 20;
const minSize = 10;

const maxSizeChanges = 1;
const minSizeChanges = -1;

const maxColorChanges = 5;
const minColorChanges = -5;

const maxColorInheritance = 1;
const minColorInheritance = 0;

const maxBranches = 2;
const minBranches = 1;

const maxAngle = 40;
const minAngle = 20;

const maxAngleDeviation = 0;
const minAngleDeviation = 0;

const maxTurn = 1;
const minTurn = -1;

const maxRandomTurn = 10;
const minRandomTurn = -10;

let genome = [
    255, 0,   255, 220, 200, 220, 0,   0,   0,   0,   255, 100, 255, 125, 0,
    255, 140, 125, 220, 220, 0,   0,   255, 0,   255, 255, 50,  255, 90,  0,
    200, 0,   125, 220, 220, 0,   0,   0,   255, 50,   255, 30,  0,   125, 255,
    2,   100, 10,  0,   0,   220, 255, 255, 0,   0,   255, 100, 255, 215, 0
];

let drawers = [{
    x: startX,
    y: startY,
    dx: 0,
    dy: -5,
}];

function generateRandomGenome() {
    genome = [];
    for (let i = 0; i < levelCount; i++) {
        for (let j = 0; j < paramCount; j++) {
            genome.push(Math.round(Math.random() * maxGenomeByte));
        }
    }
}

generateRandomGenome();
drawPlant();
console.log(genome);

function drawCircle(x, y, radius, rColor, gColor, bColor) {
    if (radius < 0) {
        radius = -radius
    }
    // ctx.beginPath();
    // ctx.fillStyle = `#${(rColor - colorChange).toString(16).padStart(2, '0')}${(gColor - colorChange).toString(16).padStart(2, '0')}${(bColor - colorChange).toString(16).padStart(2, '0')}`;
    // ctx.arc(x-radius*shadowDisplacement, y-radius*shadowDisplacement, radius, 0, 2*Math.PI);
    // ctx.fill();
    // ctx.beginPath();
    // ctx.fillStyle = `#${(rColor + colorChange).toString(16).padStart(2, '0')}${(gColor + colorChange).toString(16).padStart(2, '0')}${(bColor + colorChange).toString(16).padStart(2, '0')}`;
    // ctx.arc(x+radius*shadowDisplacement, y+radius*shadowDisplacement, radius, 0, 2*Math.PI);
    // ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = `#${rColor.toString(16).padStart(2, '0')}${gColor.toString(16).padStart(2, '0')}${bColor.toString(16).padStart(2, '0')}`;
    ctx.arc(x, y, radius, 0, 2*Math.PI);
    ctx.fill();
}

function drawPlant() {
    let prevColor = {
        r: genome[3],
        g: genome[4],
        b: genome[5]
    };

    for (let i = 0; i < levelCount; i++) {
        console.log(`drawing level ${i}`);
        prevColor = drawLevel(genome.slice(i*paramCount, i*paramCount+paramCount), prevColor);
    }
}

function drawLevel(params, prevColor) {
    const branchCount = Math.round(params[10] / (maxGenomeByte / (maxBranches - minBranches)) + minBranches);
    const newDrawers = [];

    const angleDeviation = params[12] / (maxGenomeByte / (maxAngleDeviation - minAngleDeviation)) + minAngleDeviation;

    const angle = params[11] / (maxGenomeByte / (maxAngle - minAngle)) + minAngle;

    for (let i = 0; i < drawers.length; i++) {
        const rootDrawer = drawers[i];

        for (let j = 0; j < branchCount; j++) {

            const resVector = rotateVector(rootDrawer.dx, rootDrawer.dy, angle * (j - (branchCount - 1) / 2) + Math.random() * angleDeviation - angleDeviation / 2);
            newDrawers.push({
                x: rootDrawer.x,
                y: rootDrawer.y,
                dx: resVector.dx,
                dy: resVector.dy
            });
        }
    }

    drawers = newDrawers;

    const colorChanges = {
        r: Math.round(params[6] / (maxGenomeByte / (maxColorChanges - minColorChanges)) + minColorChanges),
        g: Math.round(params[7] / (maxGenomeByte / (maxColorChanges - minColorChanges)) + minColorChanges),
        b: Math.round(params[8] / (maxGenomeByte / (maxColorChanges - minColorChanges)) + minColorChanges)
    };
    const colorInheritance = params[9] / 255;
    const sizeChanges = params[2] / (maxGenomeByte / (maxSizeChanges - minSizeChanges)) + minSizeChanges;

    let color;

    for (let i = 0; i < drawers.length; i++) {

        const length = params[0] / (maxGenomeByte / (maxLength - minLength)) + minLength;
        let size = params[1] / (maxGenomeByte / (maxSize - minSize)) + minSize;
        color = {
            r: Math.floor(params[3] + (prevColor.r - params[3]) * colorInheritance),
            g: Math.floor(params[4] + (prevColor.g - params[4]) * colorInheritance),
            b: Math.floor(params[5] + (prevColor.b - params[5]) * colorInheritance)
        };

        for (let j = 0; j < length; j++) {
            drawCircle(drawers[i].x, drawers[i].y, size, color.r, color.g, color.b);

            let turn = 0;

            if (i % branchCount < (branchCount - 1) / 2) {
                turn = params[13] / (maxGenomeByte / (maxTurn - minTurn)) + minTurn;
            } else if (i % branchCount > (branchCount - 1) / 2) {
                turn = -(params[13] / (maxGenomeByte / (maxTurn - minTurn)) + minTurn);
            }

            turn += (Math.random() * (maxRandomTurn - minRandomTurn) + minRandomTurn) * params[14] / maxGenomeByte;

            size += sizeChanges;
            color.r += colorChanges.r;
            color.g += colorChanges.g;
            color.b += colorChanges.b;
            console.log(color.r);
            drawers[i].x += drawers[i].dx;
            drawers[i].y += drawers[i].dy;
            const resVector = rotateVector(drawers[i].dx, drawers[i].dy, turn);
            drawers[i].dx = resVector.dx;
            drawers[i].dy = resVector.dy;

            if (color.r > 255) {
                color.r = 255;
            } else if (color.r < 0) {
                color.r = 0;
            }
            if (color.g > 255) {
                color.g = 255;
            } else if (color.g < 0) {
                color.g = 0;
            }
            if (color.b > 255) {
                color.b = 255;
            } else if (color.b < 0) {
                color.b = 0;
            }
        }
    }

    return color;
}

function rotateVector(dx, dy, ang) {
    dx = dx / 5;
    dy = dy / 5;

    ang = -ang * (Math.PI/180);
    const cos = Math.cos(ang);
    const sin = Math.sin(ang);

    dx = dx * 5;
    dy = dy * 5;

    return {
        dx: dx * cos - dy * sin,
        dy: dx * sin + dy * cos
    }
}