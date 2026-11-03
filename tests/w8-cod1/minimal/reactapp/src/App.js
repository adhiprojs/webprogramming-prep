import { useState } from 'react';

const employees = ['John Doe', 'Jane Smith', 'Mike Johnson', 'James Brown'];

function App() {
  const [query, setQuery] = useState('');

  const shown = employees.filter((name) =>
    name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <h1>Employee Directory</h1>
      <input
        placeholder="Search employees..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {shown.map((name) => (
        <p key={name}>{name}</p>
      ))}
    </div>
  );
}

export default App;
