document.addEventListener('DOMContentLoaded', () => {

    const checkboxes = document.querySelectorAll('input[type="checkbox"].item-checkbox');
    const radios = document.querySelectorAll('input[type="radio"][name="paymentMethod"]');
    const paymentDisplay = document.getElementById('paymentDisplay');
    const calculateBtn = document.getElementById('calculateBtn');
    const resetBillBtn = document.getElementById('resetBillBtn');
    const totalAmountEl = document.getElementById('totalAmount');
    const discountAmountEl = document.getElementById('discountAmount');
    const finalAmountEl = document.getElementById('finalAmount');
    const itemSummaryList = document.getElementById('itemSummaryList');
  
    // Update payment display on radio change
    radios.forEach(radio => {
      radio.addEventListener('change', () => {
        paymentDisplay.textContent = radio.value;
      });
    });
  
    // Get discount rate based on selected payment method (while loop)
    function getSelectedPaymentMethod() {
      let selected = null;
      let i = 0;
      while (i < radios.length) {
        if (radios[i].checked) {
          selected = radios[i].value;
          break;
        }
        i++;
      }
      return selected;
    }
  
    function getDiscountRate(method) {
      if (method === 'upi') return 0.10;
      if (method === 'card') return 0.05;
      return 0;
    }
  
    calculateBtn.addEventListener('click', () => {
      // Calculate total using a for loop
      let total = 0;
      const selectedItems = [];
      for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
          total += parseFloat(checkboxes[i].getAttribute('data-price')) || 0;
          selectedItems.push({
            name: checkboxes[i].getAttribute('data-name'),
            price: parseFloat(checkboxes[i].getAttribute('data-price')) || 0
          });
        }
      }
  
      const method = getSelectedPaymentMethod();
      const rate = getDiscountRate(method);
      const discount = parseFloat((total * rate).toFixed(2));
      const finalAmount = parseFloat((total - discount).toFixed(2));
  
      totalAmountEl.textContent = total;
      discountAmountEl.textContent = discount;
      finalAmountEl.textContent = finalAmount;
  
      // Build item summary list using a do...while loop
      itemSummaryList.innerHTML = '';
      if (selectedItems.length === 0) {
        const li = document.createElement('li');
        li.id = 'noItemsMsg';
        li.textContent = 'None';
        itemSummaryList.appendChild(li);
      } else {
        let idx = 0;
        do {
          const li = document.createElement('li');
          li.textContent = `${selectedItems[idx].name} — Rs.${selectedItems[idx].price}`;
          itemSummaryList.appendChild(li);
          idx++;
        } while (idx < selectedItems.length);
      }
    });
  
    resetBillBtn.addEventListener('click', () => {
      checkboxes.forEach(cb => { cb.checked = false; });
      radios.forEach(r => { r.checked = false; });
      paymentDisplay.textContent = 'None';
      totalAmountEl.textContent = 0;
      discountAmountEl.textContent = 0;
      finalAmountEl.textContent = 0;
      itemSummaryList.innerHTML = '<li id="noItemsMsg">None</li>';
    });
  
  });
