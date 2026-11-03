const radios = document.querySelectorAll('input[name="fitnessGoal"]');
const boxes = document.querySelectorAll('.day-checkbox');
const workoutDays = document.getElementById('workoutDays');
const restDays = document.getElementById('restDays');
const caloriesBurned = document.getElementById('caloriesBurned');

radios.forEach((radio) => {
  radio.addEventListener('change', () => {
    document.getElementById('goalDisplay').textContent = radio.value;
  });
});

document.getElementById('calcPlanBtn').addEventListener('click', () => {
  const days = document.querySelectorAll('.day-checkbox:checked').length;
  workoutDays.textContent = days;
  restDays.textContent = 7 - days;
  caloriesBurned.textContent = days * 400;
});

document.getElementById('resetPlanBtn').addEventListener('click', () => {
  boxes.forEach((box) => {
    box.checked = false;
  });
  workoutDays.textContent = 0;
  restDays.textContent = 0;
  caloriesBurned.textContent = 0;
});
