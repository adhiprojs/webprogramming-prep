import React, { useState } from 'react';
import CropList from './CropList';

function CropDashboard({ initialCrops }) {
  const [crops] = useState(initialCrops);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCrops = crops.filter((crop) =>
    crop.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard">
      <h1>CROP MANAGEMENT SYSTEM</h1>

      <label htmlFor="cropSearch">Search by Crop Name:</label>

      <input
        id="cropSearch"
        type="text"
        placeholder="Search crops..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />

      <CropList crops={filteredCrops} />
    </div>
  );
}

export default CropDashboard;
