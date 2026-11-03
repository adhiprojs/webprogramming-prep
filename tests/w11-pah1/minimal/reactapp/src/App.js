import { useState } from 'react';
import EmployeeCard from './components/EmployeeCard';

const employees = [
  { name: 'Rajan Kumar', role: 'Software Engineer', department: 'Engineering' },
  { name: 'Sneha Pillai', role: 'QA Engineer', department: 'Engineering' },
  { name: 'Meena Iyer', role: 'Product Manager', department: 'Product' },
  { name: 'Karthik Raj', role: 'UI Designer', department: 'Design' },
  { name: 'Divya Nair', role: 'Data Analyst', department: 'Product' },
];

function App() {
  const [department, setDepartment] = useState('All');

  const shown = employees.filter((e) => department === 'All' || e.department === department);

  return (
    <div>
      <h1>Employee Directory</h1>
      <select id="department-filter" value={department} onChange={(e) => setDepartment(e.target.value)}>
        <option>All</option>
        <option>Engineering</option>
        <option>Product</option>
        <option>Design</option>
      </select>
      {shown.map((e) => (
        <EmployeeCard key={e.name} employeeName={e.name} role={e.role} department={e.department} />
      ))}
    </div>
  );
}

export default App;
