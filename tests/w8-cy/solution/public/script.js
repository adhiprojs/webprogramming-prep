const canvas = document.getElementById('sketchPad');
const ctx = canvas.getContext('2d');

const defaultBtn = document.getElementById('defaultBtn');
const redBtn = document.getElementById('redBtn');
const blueBtn = document.getElementById('blueBtn');
const greenBtn = document.getElementById('greenBtn');
const eraserBtn = document.getElementById('eraserBtn');
const clearBtn = document.getElementById('clearBtn');
const currentColor = document.getElementById('currentColor');

let drawing = false;

ctx.strokeStyle = '#000000';
ctx.lineWidth = 3;
ctx.lineCap = 'round';
ctx.lineJoin = 'round';

ctx.fillStyle = '#ffffff';
ctx.fillRect(0, 0, canvas.width, canvas.height);

function startDrawing(event) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  if (x >= 0 && x <= canvas.width && y >= 0 && y <= canvas.height) {
    drawing = true;
    ctx.beginPath();
    ctx.moveTo(x, y);
  }
}

function draw(event) {
  if (!drawing) {
    return;
  }

  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  if (x >= 0 && x <= canvas.width && y >= 0 && y <= canvas.height) {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function stopDrawing() {
  drawing = false;
  ctx.closePath();
}

defaultBtn.addEventListener('click', function() {
  ctx.strokeStyle = '#000000';
  currentColor.textContent = 'Black';
});

redBtn.addEventListener('click', function() {
  ctx.strokeStyle = '#ff0000';
  currentColor.textContent = 'Red';
});

blueBtn.addEventListener('click', function() {
  ctx.strokeStyle = '#0000ff';
  currentColor.textContent = 'Blue';
});

greenBtn.addEventListener('click', function() {
  ctx.strokeStyle = '#008000';
  currentColor.textContent = 'Green';
});

eraserBtn.addEventListener('click', function() {
  ctx.strokeStyle = '#ffffff';
  currentColor.textContent = 'White (Eraser)';
});

clearBtn.addEventListener('click', function() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (currentColor.textContent === 'Red') {
    ctx.strokeStyle = '#ff0000';
  } else if (currentColor.textContent === 'Blue') {
    ctx.strokeStyle = '#0000ff';
  } else if (currentColor.textContent === 'Green') {
    ctx.strokeStyle = '#008000';
  } else if (currentColor.textContent === 'White (Eraser)') {
    ctx.strokeStyle = '#ffffff';
  } else {
    ctx.strokeStyle = '#000000';
  }
});

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);
