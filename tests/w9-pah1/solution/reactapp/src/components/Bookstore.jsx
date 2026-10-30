import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Bookstore = () => {
  const [books, setBooks] = useState([
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', stock: 15, price: 10.99 },
    { id: 2, title: '1984', author: 'George Orwell', stock: 8, price: 12.5 },
    { id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee', stock: 12, price: 14 },
  ]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [stock, setStock] = useState('');
  const [price, setPrice] = useState('');

  const handleAdd = () => {
    if (!title || !author || !stock || !price) {
      alert('Please fill in all fields');
      return;
    }
    const newId = Math.max(...books.map((b) => b.id)) + 1;
    setBooks([
      ...books,
      { id: newId, title: title, author: author, stock: parseInt(stock), price: parseFloat(price) },
    ]);
    setTitle('');
    setAuthor('');
    setStock('');
    setPrice('');
  };

  return (
    <div className="container my-5">
      <h1 className="text-center">Bookstore Inventory</h1>
      <p className="text-center text-muted mb-4">Manage your book collection with ease</p>

      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Stock</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.stock}</td>
                  <td>${book.price.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="h5 mb-3">Add New Book</h2>
          <div className="row g-3">
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Book Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>
            <div className="col-md-2">
              <input
                type="number"
                className="form-control"
                placeholder="Stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            <div className="col-md-2">
              <input
                type="number"
                className="form-control"
                placeholder="Price ($)"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="col-md-2">
              <button className="btn btn-success w-100" onClick={handleAdd}>
                Add Book
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookstore;
