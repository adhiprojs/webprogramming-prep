const radios = document.querySelectorAll('input[name="ageGroup"]');
const boxes = document.querySelectorAll('.genre-checkbox');
const genreCount = document.getElementById('genreCount');

radios.forEach((radio) => {
  radio.addEventListener('change', () => {
    document.getElementById('ageDisplay').textContent = radio.value;
  });
});

document.getElementById('pollSubmitBtn').addEventListener('click', () => {
  genreCount.textContent = document.querySelectorAll('.genre-checkbox:checked').length;
});

document.getElementById('pollResetBtn').addEventListener('click', () => {
  boxes.forEach((box) => {
    box.checked = false;
  });
  genreCount.textContent = 0;
});
