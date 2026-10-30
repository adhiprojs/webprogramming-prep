import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const FoodOrder = () => {
  const [orders, setOrders] = useState([
    { id: 1, item: 'Burger', quantity: 2, price: 150 },
    { id: 2, item: 'Pizza', quantity: 1, price: 300 },
    { id: 3, item: 'Pasta', quantity: 3, price: 200 },
  ]);

  const [newOrder, setNewOrder] = useState({
    item: '',
    quantity: '',
    price: '',
  });

  const handleNewOrderChange = (e) => {
    const { name, value } = e.target;
    setNewOrder({ ...newOrder, [name]: value });
  };

  const handleAddOrder = () => {
    if (!newOrder.item || !newOrder.quantity || !newOrder.price) {
      alert('Please fill in all fields');
      return;
    }

    const newId = Math.max(...orders.map((order) => order.id)) + 1;
    const orderToAdd = {
      ...newOrder,
      id: newId,
      quantity: parseInt(newOrder.quantity),
      price: parseFloat(newOrder.price),
    };

    setOrders([...orders, orderToAdd]);
    setNewOrder({
      item: '',
      quantity: '',
      price: '',
    });
  };

  return (
    <div className="container my-4">
      <h1 className="text-primary text-center mb-4">Food Order Management</h1>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Food Item</th>
            <th>Quantity</th>
            <th>Price ($)</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.item}</td>
              <td>{order.quantity}</td>
              <td>{order.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr />

      <h2 className="text-success text-center mt-5 mb-3">Add New Food Order</h2>
      <div className="row g-3">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Food Item"
            name="item"
            value={newOrder.item}
            onChange={handleNewOrderChange}
          />
        </div>
        <div className="col-md-3">
          <input
            type="number"
            className="form-control"
            placeholder="Quantity"
            name="quantity"
            value={newOrder.quantity}
            onChange={handleNewOrderChange}
            min="1"
          />
        </div>
        <div className="col-md-3">
          <input
            type="number"
            className="form-control"
            placeholder="Price ($)"
            name="price"
            value={newOrder.price}
            onChange={handleNewOrderChange}
            step="0.01"
            min="0"
          />
        </div>
        <div className="col-md-2">
          <button className="btn btn-success w-100" onClick={handleAddOrder}>
            Add Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodOrder;
