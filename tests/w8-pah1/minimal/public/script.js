const img1 = document.getElementById('img1');
const img2 = document.getElementById('img2');
const img3 = document.getElementById('img3');

function bringToFront(img) {
  img1.style.zIndex = '1';
  img2.style.zIndex = '1';
  img3.style.zIndex = '1';
  img.style.zIndex = '10';
}

document.getElementById('btn1').addEventListener('click', () => bringToFront(img1));
document.getElementById('btn2').addEventListener('click', () => bringToFront(img2));
document.getElementById('btn3').addEventListener('click', () => bringToFront(img3));
