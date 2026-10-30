document.addEventListener('DOMContentLoaded', function () {
    const highlightBtn = document.getElementById('highlightBtn');
    const textPara = document.getElementById('textPara');
  
    highlightBtn.addEventListener('click', function () {
      textPara.classList.toggle('highlight');
    });
  });
