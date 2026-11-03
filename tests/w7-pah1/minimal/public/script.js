const radios = document.querySelectorAll('input[name="paymentMethod"]');
const boxes = document.querySelectorAll('.item-checkbox');
const totalAmount = document.getElementById('totalAmount');
const discountAmount = document.getElementById('discountAmount');
const finalAmount = document.getElementById('finalAmount');

radios.forEach((radio) => {
  radio.addEventListener('change', () => {
    document.getElementById('paymentDisplay').textContent = radio.value;
  });
});

document.getElementById('calculateBtn').addEventListener('click', () => {
  let total = 0;
  boxes.forEach((box) => {
    if (box.checked) total += Number(box.dataset.price);
  });
  const discount = total * 0.1;
  totalAmount.textContent = total;
  discountAmount.textContent = discount.toFixed(2);
  finalAmount.textContent = (total - discount).toFixed(2);
});

document.getElementById('resetBillBtn').addEventListener('click', () => {
  boxes.forEach((box) => {
    box.checked = false;
  });
  totalAmount.textContent = 0;
  discountAmount.textContent = 0;
  finalAmount.textContent = 0;
});
