import { useState } from 'react';

function PriceTag({ productName, originalPrice }) {
  const [discounted, setDiscounted] = useState(false);

  return (
    <div id="price-tag">
      <h2>{productName}</h2>
      <p>Price: ₹{discounted ? originalPrice * 0.9 : originalPrice}</p>
      <button id="toggle-discount" onClick={() => setDiscounted(!discounted)}>
        {discounted ? 'Remove Discount' : 'Apply Discount'}
      </button>
    </div>
  );
}

export default PriceTag;
