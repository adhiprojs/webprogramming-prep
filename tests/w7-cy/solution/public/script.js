document.addEventListener('DOMContentLoaded', function () {

    const subjectRadios = document.querySelectorAll('input[name="subject"]');
    const subjectDisplay = document.getElementById('subjectDisplay');
  
    subjectRadios.forEach(function (radio) {
      radio.addEventListener('change', function () {
        // while loop to find the selected subject
        let i = 0;
        const radiosArr = Array.from(subjectRadios);
        let selectedValue = '';
        while (i < radiosArr.length) {
          if (radiosArr[i].checked) {
            selectedValue = radiosArr[i].value;
            break;
          }
          i++;
        }
        subjectDisplay.textContent = selectedValue;
      });
    });
  
    const submitBtn = document.getElementById('submitQuizBtn');
    const resetBtn = document.getElementById('resetQuizBtn');
  
    const correctAnswers = { q1: 'a', q2: 'b', q3: 'c' };
    const questionNames = ['q1', 'q2', 'q3'];
  
    submitBtn.addEventListener('click', function () {
      let score = 0;
  
      // for loop to iterate through questions and evaluate answer
      for (let i = 0; i < questionNames.length; i++) {
        const qName = questionNames[i];
        const selected = document.querySelector('input[name="' + qName + '"]:checked');
        if (selected && selected.value === correctAnswers[qName]) {
          score++;
        }
      }
  
      document.getElementById('quizScore').textContent = score;
  
      let grade = '-';
      if (score === 3) grade = 'A';
      else if (score === 2) grade = 'B';
      else if (score === 1) grade = 'C';
      else if (score === 0) grade = 'F';
      document.getElementById('quizGrade').textContent = grade;
  
      // do...while loop to build the result remark based on score
      let remark = '';
      let s = score;
      do {
        if (s === 3) { remark = 'Excellent'; }
        else if (s === 2) { remark = 'Good'; }
        else if (s === 1) { remark = 'Needs Improvement'; }
        else { remark = 'Please Try Again'; }
        break;
      } while (false);
      document.getElementById('quizRemark').textContent = remark;
  
      const checkedTopics = document.querySelectorAll('input.topic-checkbox:checked');
      const topics = Array.from(checkedTopics).map(function (cb) { return cb.value; });
      document.getElementById('topicList').textContent = topics.length ? topics.join(', ') : '-';
    });
  
    resetBtn.addEventListener('click', function () {
      document.getElementById('studentName').value = '';
  
      subjectRadios.forEach(function (r) { r.checked = false; });
      subjectDisplay.textContent = 'None';
  
      questionNames.forEach(function (qName) {
        document.querySelectorAll('input[name="' + qName + '"]').forEach(function (r) {
          r.checked = false;
        });
      });
  
      document.querySelectorAll('input.topic-checkbox').forEach(function (cb) {
        cb.checked = false;
      });
  
      document.getElementById('quizScore').textContent = '0';
      document.getElementById('quizGrade').textContent = '-';
      document.getElementById('quizRemark').textContent = '-';
      document.getElementById('topicList').textContent = '-';
    });
  
  });
