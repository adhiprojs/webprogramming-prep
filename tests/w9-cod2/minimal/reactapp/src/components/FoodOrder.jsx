import { useState } from 'react';

function FoodOrder() {
  const [orders, setOrders] = useState([
    { item: 'Burger', quantity: '2', price: '100' },
    { item: 'Pizza', quantity: '1', price: '250' },
    { item: 'Pasta', quantity: '3', price: '180' },
  ]);
  const [item, setItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  const addOrder = () => {
    if (!item || !quantity || !price) {
      alert('Please fill in all fields');
      return;
    }
    setOrders([...orders, { item, quantity, price }]);
    setItem('');
    setQuantity('');
    setPrice('');
  };

  return (
    <div className="container my-4">
      <h1>Food Order Management</h1>
      <input placeholder="Food Item" value={item} onChange={(e) => setItem(e.target.value)} />
      <input placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
      <input placeholder="Price ($)" value={price} onChange={(e) => setPrice(e.target.value)} />
      <button className="btn btn-success w-100" onClick={addOrder}>Add Order</button>
      <table className="table table-striped table-bordered">
        <tbody>
          {orders.map((o, i) => (
            <tr key={i}>
              <td>{o.item}</td>
              <td>{o.quantity}</td>
              <td>{o.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FoodOrder;
