const animationFrames = [
    '      ROFL:ROFL:ROFL:ROFL\n' +
    '              _^___\n' +
    '     L    __/   [] \\\n' +
    '     O====__        \\\n' +
    '     L      \\________]\n' +
    '             I   I\n' +
    '            --------/',
    '      LFOR:LFOR:LFOR:LFOR\n' +
    '              _^___\n' +
    '          __/   [] \\\n' +
    '    LOL===__        \\\n' +
    '            \\________]\n' +
    '             I   I\n' +
    '            --------/'
];

const animationElem = document.getElementById('animation');

let currentFrame = 0;
let margin = 0;
let step = 5;

let marginTop = 3;

setInterval(() => {
    animationElem.innerHTML = animationFrames[currentFrame];

    currentFrame++
    if (currentFrame >= animationFrames.length) {
        currentFrame = 0
    }

    margin += step;
    marginTop = -marginTop;
    if (margin >= 300) {
        step = -step;
        animationElem.style.transform = 'scale(-1, 1)';
    } else if (margin <= 0) {
        step = -step;
        animationElem.style.transform = 'scale(1, 1)';
    }
    animationElem.style.marginLeft = `${margin}px`;
    animationElem.style.marginTop = `${marginTop}px`;
}, 100);