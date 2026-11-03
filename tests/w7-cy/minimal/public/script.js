const radios = document.querySelectorAll('input[name="subject"]');
const quizScore = document.getElementById('quizScore');
const quizGrade = document.getElementById('quizGrade');
const quizRemark = document.getElementById('quizRemark');

radios.forEach((radio) => {
  radio.addEventListener('change', () => {
    document.getElementById('subjectDisplay').textContent = radio.value;
  });
});

document.getElementById('submitQuizBtn').addEventListener('click', () => {
  let score = 0;
  if (document.querySelector('input[name="q1"][value="a"]').checked) score++;
  if (document.querySelector('input[name="q2"][value="b"]').checked) score++;
  if (document.querySelector('input[name="q3"][value="c"]').checked) score++;

  quizScore.textContent = score;
  if (score === 3) {
    quizGrade.textContent = 'A';
    quizRemark.textContent = 'Excellent';
  } else {
    quizGrade.textContent = 'F';
    quizRemark.textContent = 'Fail';
  }
});

document.getElementById('resetQuizBtn').addEventListener('click', () => {
  document.getElementById('studentName').value = '';
  quizScore.textContent = '0';
  quizGrade.textContent = '-';
  quizRemark.textContent = '-';
});
