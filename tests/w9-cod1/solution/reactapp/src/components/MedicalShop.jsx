import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const MedicalShop = () => {
  const [medicines, setMedicines] = useState([
    { id: 1, name: 'Paracetamol', quantity: 100, price: 2.5 },
    { id: 2, name: 'Aspirin', quantity: 50, price: 3 },
    { id: 3, name: 'Band-Aid', quantity: 200, price: 0.75 },
  ]);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  const handleAdd = () => {
    if (!name || !quantity || !price) {
      alert('Please fill in all fields');
      return;
    }
    const newId = Math.max(...medicines.map((m) => m.id)) + 1;
    setMedicines([
      ...medicines,
      { id: newId, name: name, quantity: parseInt(quantity), price: parseFloat(price) },
    ]);
    setName('');
    setQuantity('');
    setPrice('');
  };

  return (
    <div className="container my-4">
      <h1 className="text-primary text-center mb-4">Medical Shop Inventory</h1>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map((m) => (
            <tr key={m.id}>
              <td>{m.id}</td>
              <td>{m.name}</td>
              <td>{m.quantity}</td>
              <td>{m.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr />

      <h2 className="text-success text-center mt-5 mb-3">Add New Medicine</h2>
      <div className="row g-3">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <input
            type="number"
            className="form-control"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min="1"
          />
        </div>
        <div className="col-md-3">
          <input
            type="number"
            className="form-control"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            step="0.01"
            min="0"
          />
        </div>
        <div className="col-md-2">
          <button className="btn btn-success w-100" onClick={handleAdd}>
            Add Medicine
          </button>
        </div>
      </div>
    </div>
  );
};

export default MedicalShop;
