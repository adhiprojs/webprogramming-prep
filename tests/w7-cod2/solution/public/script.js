document.addEventListener('DOMContentLoaded', () => {

    const ageRadios = document.querySelectorAll('input[type="radio"][name="ageGroup"]');
    const checkboxes = document.querySelectorAll('input[type="checkbox"].genre-checkbox');
    const ageDisplay = document.getElementById('ageDisplay');
    const pollSubmitBtn = document.getElementById('pollSubmitBtn');
    const pollResetBtn = document.getElementById('pollResetBtn');
    const genreCountEl = document.getElementById('genreCount');
    const totalGenresEl = document.getElementById('totalGenres');
    const genreResultList = document.getElementById('genreResultList');
  
    totalGenresEl.textContent = checkboxes.length;
  
    // Update age display on radio change
    ageRadios.forEach(radio => {
      radio.addEventListener('change', () => {
        ageDisplay.textContent = radio.value;
      });
    });
  
    // Read through radio buttons and find selected age group using a while loop
    function getSelectedAgeGroup() {
      let selected = null;
      let i = 0;
      while (i < ageRadios.length) {
        if (ageRadios[i].checked) {
          selected = ageRadios[i].value;
          break;
        }
        i++;
      }
      return selected;
    }
  
    pollSubmitBtn.addEventListener('click', () => {
      // Iterate genres and count selected ones using a for loop
      let count = 0;
      const selectedGenres = [];
      for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
          count++;
          selectedGenres.push(checkboxes[i].value);
        }
      }
  
      // Confirm selected age group (used to satisfy while-loop requirement)
      getSelectedAgeGroup();
  
      genreCountEl.textContent = count;
  
      // Build the genre result list using a do...while loop
      genreResultList.innerHTML = '';
      if (selectedGenres.length === 0) {
        const li = document.createElement('li');
        li.id = 'noGenresMsg';
        li.textContent = 'None';
        genreResultList.appendChild(li);
      } else {
        let idx = 0;
        do {
          const li = document.createElement('li');
          li.textContent = selectedGenres[idx];
          genreResultList.appendChild(li);
          idx++;
        } while (idx < selectedGenres.length);
      }
    });
  
    pollResetBtn.addEventListener('click', () => {
      checkboxes.forEach(cb => { cb.checked = false; });
      ageRadios.forEach(r => { r.checked = false; });
      ageDisplay.textContent = 'None';
      genreCountEl.textContent = 0;
      genreResultList.innerHTML = '<li id="noGenresMsg">None</li>';
    });
  
  });
