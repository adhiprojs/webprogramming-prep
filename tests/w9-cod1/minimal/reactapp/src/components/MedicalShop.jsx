import { useState } from 'react';

function MedicalShop() {
  const [items, setItems] = useState([
    { name: 'Paracetamol', quantity: '100', price: '2' },
    { name: 'Aspirin', quantity: '60', price: '3' },
    { name: 'Band-Aid', quantity: '200', price: '1' },
  ]);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  const addMedicine = () => {
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
      <h1>Medical Shop Inventory</h1>
      <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
      <input placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
      <button className="btn btn-success w-100" onClick={addMedicine}>Add Medicine</button>
      <table className="table table-striped table-bordered">
        <tbody>
          {items.map((item, i) => (
            <tr key={i}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MedicalShop;
