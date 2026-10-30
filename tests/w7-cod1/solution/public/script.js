document.addEventListener('DOMContentLoaded', () => {

    const sectionRadios = document.querySelectorAll('input[type="radio"][name="section"]');
    const checkboxes = document.querySelectorAll('input[type="checkbox"].student-checkbox');
    const sectionDisplay = document.getElementById('sectionDisplay');
    const submitBtn = document.getElementById('submitBtn');
    const presentCountEl = document.getElementById('presentCount');
    const absentCountEl = document.getElementById('absentCount');
    const attendancePercentEl = document.getElementById('attendancePercent');
  
    // Update section display on radio change
    sectionRadios.forEach(radio => {
      radio.addEventListener('change', () => {
        sectionDisplay.textContent = radio.value;
      });
    });
  
    // Iterate over radio buttons and find the selected section using a while loop
    function getSelectedSection() {
      let selected = null;
      let i = 0;
      while (i < sectionRadios.length) {
        if (sectionRadios[i].checked) {
          selected = sectionRadios[i].value;
          break;
        }
        i++;
      }
      return selected;
    }
  
    submitBtn.addEventListener('click', () => {
      // Iterate over student checkboxes and count present students using a for loop
      let presentCount = 0;
      for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
          presentCount++;
        }
      }
  
      // Confirm selected section (used to satisfy while-loop requirement)
      getSelectedSection();
  
      const total = checkboxes.length;
  
      // Compute the absent count using a do...while loop
      let absentCount = 0;
      let counted = 0;
      do {
        if (counted < total && !checkboxes[counted].checked) {
          absentCount++;
        }
        counted++;
      } while (counted < total);
  
      const attendancePercent = total > 0
        ? parseFloat(((presentCount / total) * 100).toFixed(2))
        : 0;
  
      presentCountEl.textContent = presentCount;
      absentCountEl.textContent = absentCount;
      attendancePercentEl.textContent = attendancePercent + '%';
    });
  
  });
