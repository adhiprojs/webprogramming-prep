const para = document.getElementById('textPara');
const btn = document.getElementById('highlightBtn');

btn.addEventListener('click', () => {
  if (para.style.backgroundColor === 'yellow') {
    para.style.backgroundColor = '';
  } else {
    para.style.backgroundColor = 'yellow';
  }
});
