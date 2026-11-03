import { useState } from 'react';

function Bookstore() {
  const [books, setBooks] = useState([
    { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', stock: '5', price: '10' },
    { title: '1984', author: 'George Orwell', stock: '8', price: '12' },
    { title: 'To Kill a Mockingbird', author: 'Harper Lee', stock: '3', price: '15' },
  ]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [stock, setStock] = useState('');
  const [price, setPrice] = useState('');

  const addBook = () => {
    if (!title || !author || !stock || !price) {
      alert('Please fill in all fields');
      return;
    }
    setBooks([...books, { title, author, stock, price }]);
    setTitle('');
    setAuthor('');
    setStock('');
    setPrice('');
  };

  return (
    <div className="container my-5">
      <h1>Bookstore Inventory</h1>
      <p>Manage your book collection with ease</p>
      <div className="card shadow-sm">
        <input placeholder="Book Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
        <input placeholder="Stock" value={stock} onChange={(e) => setStock(e.target.value)} />
        <input placeholder="Price ($)" value={price} onChange={(e) => setPrice(e.target.value)} />
        <button className="btn btn-success w-100" onClick={addBook}>Add Book</button>
      </div>
      <table>
        <tbody>
          {books.map((b, i) => (
            <tr key={i}>
              <td>{b.title}</td>
              <td>{b.author}</td>
              <td>{b.stock}</td>
              <td>${Number(b.price).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Bookstore;
