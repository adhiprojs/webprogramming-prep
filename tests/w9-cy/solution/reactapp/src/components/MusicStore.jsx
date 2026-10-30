import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const MusicStore = () => {
  const [items, setItems] = useState([
    { id: 1, name: 'Acoustic Guitar', quantity: 10, price: 150 },
    { id: 2, name: 'Electric Keyboard', quantity: 5, price: 400 },
    { id: 3, name: 'Drum Set', quantity: 3, price: 600 },
  ]);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  const handleAdd = () => {
    if (!name || !quantity || !price) {
      alert('Please fill in all fields');
      return;
    }
    const newId = Math.max(...items.map((i) => i.id)) + 1;
    setItems([
      ...items,
      { id: newId, name: name, quantity: parseInt(quantity), price: parseFloat(price) },
    ]);
    setName('');
    setQuantity('');
    setPrice('');
  };

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Music Store Inventory</h1>
      <table className="table table-bordered table-hover shadow-sm">
        <thead className="table-warning">
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>${item.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="text-center mt-5 mb-3">Add New Item</h2>
      <div className="row g-3">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Instrument / Album Name"
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
          />
        </div>
        <div className="col-md-3">
          <input
            type="number"
            className="form-control"
            placeholder="Price ($)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <button className="btn btn-warning w-100 fw-bold" onClick={handleAdd}>
            Add Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default MusicStore;
