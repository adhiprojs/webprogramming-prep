const editor = document.getElementById('editor');
const fontSizeSelect = document.getElementById('fontSizeSelect');
const fontColorSelect = document.getElementById('fontColorSelect');
const boldBtn = document.getElementById('boldBtn');
const italicBtn = document.getElementById('italicBtn');
const resetBtn = document.getElementById('resetBtn');

fontSizeSelect.addEventListener('change', function () {
  editor.style.fontSize = fontSizeSelect.value;
});

fontColorSelect.addEventListener('change', function () {
  editor.style.color = fontColorSelect.value;
});

boldBtn.addEventListener('click', function () {
  boldBtn.classList.toggle('active');
  if (boldBtn.classList.contains('active')) {
    editor.style.fontWeight = 'bold';
  } else {
    editor.style.fontWeight = 'normal';
  }
});

italicBtn.addEventListener('click', function () {
  italicBtn.classList.toggle('active');
  if (italicBtn.classList.contains('active')) {
    editor.style.fontStyle = 'italic';
  } else {
    editor.style.fontStyle = 'normal';
  }
});

resetBtn.addEventListener('click', function () {
  fontSizeSelect.value = '12px';
  fontColorSelect.value = 'black';
  boldBtn.classList.remove('active');
  italicBtn.classList.remove('active');
  editor.style.fontSize = '12px';
  editor.style.color = 'black';
  editor.style.fontWeight = 'normal';
  editor.style.fontStyle = 'normal';
});
