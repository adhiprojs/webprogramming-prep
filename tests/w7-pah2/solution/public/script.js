document.addEventListener('DOMContentLoaded', () => {

    const radios = document.querySelectorAll('input[type="radio"][name="fitnessGoal"]');
    const checkboxes = document.querySelectorAll('input[type="checkbox"].day-checkbox');
    const goalDisplay = document.getElementById('goalDisplay');
    const calcPlanBtn = document.getElementById('calcPlanBtn');
    const resetPlanBtn = document.getElementById('resetPlanBtn');
    const workoutDaysEl = document.getElementById('workoutDays');
    const caloriesBurnedEl = document.getElementById('caloriesBurned');
    const restDaysEl = document.getElementById('restDays');
  
    // Update goal display on radio change
    radios.forEach(radio => {
      radio.addEventListener('change', () => {
        goalDisplay.textContent = radio.value;
      });
    });
  
    // Find the selected fitness goal using a while loop
    function getSelectedGoal() {
      let selected = null;
      let i = 0;
      while (i < radios.length) {
        if (radios[i].checked) {
          selected = radios[i];
          break;
        }
        i++;
      }
      return selected;
    }
  
    calcPlanBtn.addEventListener('click', () => {
      // Count selected workout days using a for loop
      let workoutDays = 0;
      for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
          workoutDays++;
        }
      }
  
      const selectedGoal = getSelectedGoal();
      const caloriesPerDay = selectedGoal
        ? parseFloat(selectedGoal.getAttribute('data-calories')) || 0
        : 0;
  
      // Compute calories burned per day and accumulate weekly total using a do...while loop
      let totalCalories = 0;
      let dayCount = 0;
      do {
        totalCalories += caloriesPerDay;
        dayCount++;
      } while (dayCount < workoutDays);
  
      const restDays = 7 - workoutDays;
  
      workoutDaysEl.textContent = workoutDays;
      caloriesBurnedEl.textContent = totalCalories;
      restDaysEl.textContent = restDays;
    });
  
    resetPlanBtn.addEventListener('click', () => {
      checkboxes.forEach(cb => { cb.checked = false; });
      radios.forEach(r => { r.checked = false; });
      goalDisplay.textContent = 'None';
      workoutDaysEl.textContent = 0;
      caloriesBurnedEl.textContent = 0;
      restDaysEl.textContent = 0;
    });
  
  });
