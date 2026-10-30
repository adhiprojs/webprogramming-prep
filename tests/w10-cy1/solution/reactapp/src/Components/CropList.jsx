import React from 'react';

function CropList({ crops }) {
  return (
    <div className="crop-list">
      {crops.map((crop, index) => (
        <div className="crop-item" key={index}>
          <strong>{crop.name}</strong>
          <span>- Type: {crop.type} - Status: {crop.status}</span>
        </div>
      ))}
    </div>
  );
}

export default CropList;
