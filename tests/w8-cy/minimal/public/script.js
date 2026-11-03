const canvas = document.getElementById('sketchPad');
const ctx = canvas.getContext('2d');
const currentColor = document.getElementById('currentColor');
let drawing = false;
ctx.lineWidth = 5;

canvas.addEventListener('mousedown', (e) => {
  drawing = true;
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
});

canvas.addEventListener('mousemove', (e) => {
  if (!drawing) return;
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
});

canvas.addEventListener('mouseup', () => {
  drawing = false;
});

document.getElementById('redBtn').addEventListener('click', () => {
  ctx.strokeStyle = 'red';
  currentColor.textContent = 'Red';
});

document.getElementById('blueBtn').addEventListener('click', () => {
  ctx.strokeStyle = 'blue';
  currentColor.textContent = 'Blue';
});

document.getElementById('eraserBtn').addEventListener('click', () => {
  ctx.strokeStyle = 'white';
});

document.getElementById('clearBtn').addEventListener('click', () => {
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
});
