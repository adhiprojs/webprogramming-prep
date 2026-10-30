import React from 'react';
import CropDashboard from './Components/CropDashboard';
import './App.css';

function App() {
  const initialCrops = [
    { name: 'Tomato', type: 'Vegetables', status: 'Growing' },
    { name: 'Apple', type: 'Fruits', status: 'Planted' },
    { name: 'Wheat', type: 'Grains', status: 'Harvested' },
    { name: 'Carrot', type: 'Vegetables', status: 'Growing' },
    { name: 'Banana', type: 'Fruits', status: 'Growing' }
  ];

  return <CropDashboard initialCrops={initialCrops} />;
}

export default App;
