const editor = document.getElementById('editor');
const sizeSelect = document.getElementById('fontSizeSelect');
const colorSelect = document.getElementById('fontColorSelect');
const boldBtn = document.getElementById('boldBtn');
const italicBtn = document.getElementById('italicBtn');

sizeSelect.addEventListener('change', () => {
  editor.style.fontSize = sizeSelect.value;
});

boldBtn.addEventListener('click', () => {
  boldBtn.classList.toggle('active');
});

italicBtn.addEventListener('click', () => {
  italicBtn.classList.toggle('active');
});

document.getElementById('resetBtn').addEventListener('click', () => {
  sizeSelect.value = '12px';
  colorSelect.value = 'black';
  boldBtn.classList.remove('active');
  italicBtn.classList.remove('active');
});
