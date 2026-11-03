import { useState, useEffect } from 'react';

const badgeColor = { High: 'bg-primary', Medium: 'bg-warning', Low: 'bg-secondary' };

function App() {
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Complete React Assignment', priority: 'High', completed: false },
    { id: 2, title: 'Review Bootstrap Documentation', priority: 'Medium', completed: true },
    { id: 3, title: 'Debug Lifecycle Methods', priority: 'High', completed: false },
    { id: 4, title: 'Setup React Dev Tools', priority: 'Low', completed: false },
  ]);
  const [filter, setFilter] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('High');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const addTask = () => {
    setTasks([...tasks, { id: Date.now(), title, priority, completed: false }]);
    setTitle('');
    setShowForm(false);
  };

  const toggleTask = (id) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const shown = tasks.filter((t) => {
    if (filter === 'All') return true;
    if (filter === 'Completed') return t.completed;
    return t.priority === filter;
  });

  return (
    <div>
      <nav className="navbar">
        <h1>Task Manager</h1>
      </nav>

      {loading ? (
        <div className="spinner-border"></div>
      ) : (
        <div>
          {['All', 'High', 'Medium', 'Low', 'Completed'].map((f) => (
            <button key={f} onClick={() => setFilter(f)}>{f}</button>
          ))}

          <button onClick={() => setShowForm(true)}>Add New Task</button>
          {showForm && (
            <div>
              <input
                placeholder="Enter task title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <label htmlFor="priority">Priority</label>
              <select id="priority" value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
              <button onClick={addTask}>Add Task</button>
            </div>
          )}

          {shown.map((t) => (
            <div key={t.id}>
              <label>
                <input type="checkbox" checked={t.completed} onChange={() => toggleTask(t.id)} />
                {t.title}
              </label>
              <span className={'badge ' + badgeColor[t.priority]}>{t.priority}</span>
              <button onClick={() => deleteTask(t.id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
