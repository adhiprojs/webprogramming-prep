const form = document.getElementById('userForm');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const ageError = document.getElementById('ageError');
const successMessage = document.getElementById('successMessage');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const age = Number(document.getElementById('age').value);
  let ok = true;

  if (name === '') {
    nameError.classList.remove('d-none');
    ok = false;
  } else {
    nameError.classList.add('d-none');
  }

  if (!email.includes('@') || !email.endsWith('.com')) {
    emailError.classList.remove('d-none');
    ok = false;
  } else {
    emailError.classList.add('d-none');
  }

  if (age < 18 || age > 120) {
    ageError.classList.remove('d-none');
    ok = false;
  } else {
    ageError.classList.add('d-none');
  }

  if (ok) {
    document.getElementById('successData').innerHTML = name + ' ' + email + ' ' + age;
    successMessage.classList.remove('d-none');
  } else {
    successMessage.classList.add('d-none');
  }
});
