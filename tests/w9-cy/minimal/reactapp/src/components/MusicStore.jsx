import { useState } from 'react';

function MusicStore() {
  const [items, setItems] = useState([
    { name: 'Acoustic Guitar', quantity: '5', price: '150' },
    { name: 'Electric Keyboard', quantity: '3', price: '300' },
    { name: 'Drum Set', quantity: '2', price: '500' },
  ]);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  const addItem = () => {
    if (!name || !quantity || !price) {
      alert('Please fill in all fields');
      return;
    }
    setItems([...items, { name, quantity, price }]);
    setName('');
    setQuantity('');
    setPrice('');
  };

  return (
    <div className="container my-4">
      <h1>Music Store Inventory</h1>
      <input placeholder="Instrument / Album Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
      <input placeholder="Price ($)" value={price} onChange={(e) => setPrice(e.target.value)} />
      <button className="btn btn-warning w-100 fw-bold" onClick={addItem}>Add Item</button>
      <table className="table table-bordered table-hover shadow-sm">
        <thead className="table-warning">
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={i}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>${Number(item.price).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MusicStore;
