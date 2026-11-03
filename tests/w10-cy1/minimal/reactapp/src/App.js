import { useState } from 'react';

const crops = ['Tomato', 'Apple', 'Carrot', 'Banana'];

function App() {
  const [search, setSearch] = useState('');

  const shown = crops.filter((crop) =>
    crop.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>Crop Management System</h1>
      <label>Search by Crop Name</label>
      <input
        placeholder="Search crops..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {shown.map((crop) => (
        <p key={crop}>{crop}</p>
      ))}
    </div>
  );
}

export default App;
