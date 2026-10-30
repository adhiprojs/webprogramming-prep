// write you Scripts here
document.addEventListener('DOMContentLoaded', function () {
    const img1 = document.getElementById('img1');
    const img2 = document.getElementById('img2');
    const img3 = document.getElementById('img3');
  
    const btn1 = document.getElementById('btn1');
    const btn2 = document.getElementById('btn2');
    const btn3 = document.getElementById('btn3');
  
    function bringToFront(image) {
      img1.style.zIndex = '1';
      img2.style.zIndex = '1';
      img3.style.zIndex = '1';
      image.style.zIndex = '10';
    }
  
    btn1.addEventListener('click', function () {
      bringToFront(img1);
    });
  
    btn2.addEventListener('click', function () {
      bringToFront(img2);
    });
  
    btn3.addEventListener('click', function () {
      bringToFront(img3);
    });
  });
