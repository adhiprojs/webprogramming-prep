const radios = document.querySelectorAll('input[name="section"]');
const boxes = document.querySelectorAll('.student-checkbox');

radios.forEach((radio) => {
  radio.addEventListener('change', () => {
    document.getElementById('sectionDisplay').textContent = radio.value;
  });
});

document.getElementById('submitBtn').addEventListener('click', () => {
  const present = document.querySelectorAll('.student-checkbox:checked').length;
  document.getElementById('presentCount').textContent = present;
  document.getElementById('absentCount').textContent = boxes.length - present;
});
