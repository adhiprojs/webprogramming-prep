import React, { useState } from "react";
import PropTypes from "prop-types";
import "./PriceTag.css";

function PriceTag({ productName, originalPrice }) {
  const [isDiscounted, setIsDiscounted] = useState(false);

  const displayedPrice = isDiscounted
    ? originalPrice * 0.9
    : originalPrice;

  const toggleDiscount = () => {
    setIsDiscounted(!isDiscounted);
  };

  return (
    <div id="price-tag">
      <h2 id="product-name">{productName}</h2>

      <p id="displayed-price">
        Price: ₹{displayedPrice}
      </p>

      <button id="toggle-discount" onClick={toggleDiscount}>
        {isDiscounted ? "Remove Discount" : "Apply Discount"}
      </button>
    </div>
  );
}

PriceTag.propTypes = {
  productName: PropTypes.string.isRequired,
  originalPrice: PropTypes.number.isRequired,
};

export default PriceTag;
