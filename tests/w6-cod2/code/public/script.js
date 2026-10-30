document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('userForm');
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const ageField = document.getElementById('age');
  
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const ageError = document.getElementById('ageError');
  
    const successMessage = document.getElementById('successMessage');
    const successData = document.getElementById('successData');
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.com$/;
  
    [nameError, emailError, ageError].forEach(el => el.classList.add('d-none'));
  
    form.addEventListener('submit', function (e) {
      e.preventDefault();
  
      let isValid = true;
      successMessage.classList.add('d-none');
  
      if (nameField.value.trim() === '') {
        nameError.classList.remove('d-none');
        nameField.classList.add('is-invalid');
        isValid = false;
      } else {
        nameError.classList.add('d-none');
        nameField.classList.remove('is-invalid');
      }
  
      if (!emailRegex.test(emailField.value.trim())) {
        emailError.classList.remove('d-none');
        emailField.classList.add('is-invalid');
        isValid = false;
      } else {
        emailError.classList.add('d-none');
        emailField.classList.remove('is-invalid');
      }
  
      const ageValue = parseInt(ageField.value, 10);
      if (isNaN(ageValue) || ageValue < 18 || ageValue > 120) {
        ageError.classList.remove('d-none');
        ageField.classList.add('is-invalid');
        isValid = false;
      } else {
        ageError.classList.add('d-none');
        ageField.classList.remove('is-invalid');
      }
  
      if (isValid) {
        successData.innerHTML =
          'Name: ' + nameField.value.trim() + '<br>' +
          'Email: ' + emailField.value.trim() + '<br>' +
          'Age: ' + ageValue;
  
        successMessage.classList.remove('d-none');
  
        form.reset();
        nameField.classList.remove('is-invalid');
        emailField.classList.remove('is-invalid');
        ageField.classList.remove('is-invalid');
      }
    });
  });
