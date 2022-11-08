const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const dateInput = document.getElementById('date-input');
const colorInput = document.getElementById('color-input');
const downloadLink = document.getElementById('download-link');

const cellSize = 40;

function updatePattern() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const date = dateInput.value;
    const nums = [];

    for (let i = 0; i < date.length; i++) {
        if (date[i] !== '-' && date[i] !== '0' && !nums.includes(date[i])){
            nums.push(date[i]);
        }
    }

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (nums.includes(String((j + 1) * (i + 1)).slice(-1))) {
                ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
            }
        }
    }

    downloadLink.download = 'pattern.png';
    downloadLink.href = canvas.toDataURL();
}

dateInput.oninput = updatePattern;
colorInput.oninput = () => {
    ctx.fillStyle = colorInput.value;
    updatePattern();
}