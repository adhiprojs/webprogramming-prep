import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [
        { id: 1, title: 'Complete React Assignment', priority: 'High', completed: false, createdAt: Date.now() },
        { id: 2, title: 'Review Bootstrap Documentation', priority: 'Medium', completed: true, createdAt: Date.now() },
        { id: 3, title: 'Debug Lifecycle Methods', priority: 'High', completed: false, createdAt: Date.now() },
        { id: 4, title: 'Setup React Dev Tools', priority: 'Low', completed: false, createdAt: Date.now() }
      ],
      filter: 'All',
      isLoading: true,
      mountTime: null,
      showModal: false,
      newTaskTitle: '',
      newTaskPriority: 'High'
    };

    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleTaskToggle = this.handleTaskToggle.bind(this);
    this.handleAddTask = this.handleAddTask.bind(this);
    this.handleDeleteTask = this.handleDeleteTask.bind(this);
    this.handleShowModal = this.handleShowModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleNewTaskTitleChange = this.handleNewTaskTitleChange.bind(this);
    this.handleNewTaskPriorityChange = this.handleNewTaskPriorityChange.bind(this);
    this.handleSubmitNewTask = this.handleSubmitNewTask.bind(this);
  }

  componentDidMount() {
    const mountTime = Date.now();
    this.setState({ mountTime });
    console.log('Component mounted at:', mountTime);

    this.loadingTimer = setTimeout(() => {
      this.setState({ isLoading: false });
      console.log('Simulated API call complete');
    }, 1500);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.filter !== this.state.filter) {
      console.log('Filter changed from', prevState.filter, 'to', this.state.filter);
    }
  }

  componentWillUnmount() {
    if (this.loadingTimer) {
      clearTimeout(this.loadingTimer);
    }
    console.log('Component unmounted at:', Date.now());
  }

  handleFilterChange(filterType) {
    this.setState({ filter: filterType });
  }

  handleTaskToggle(taskId) {
    this.setState(prevState => ({
      tasks: prevState.tasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    }));
  }

  handleAddTask(taskData) {
    const newTask = {
      id: Date.now(),
      title: taskData.title,
      priority: taskData.priority,
      completed: false,
      createdAt: Date.now()
    };
    this.setState(prevState => ({
      tasks: [...prevState.tasks, newTask]
    }));
  }

  handleDeleteTask(taskId) {
    this.setState(prevState => ({
      tasks: prevState.tasks.filter(task => task.id !== taskId)
    }));
  }

  handleShowModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false, newTaskTitle: '', newTaskPriority: 'High' });
  }

  handleNewTaskTitleChange(e) {
    this.setState({ newTaskTitle: e.target.value });
  }

  handleNewTaskPriorityChange(e) {
    this.setState({ newTaskPriority: e.target.value });
  }

  handleSubmitNewTask(e) {
    e.preventDefault();
    if (this.state.newTaskTitle.trim() === '') {
      return;
    }
    this.handleAddTask({
      title: this.state.newTaskTitle,
      priority: this.state.newTaskPriority
    });
    this.handleCloseModal();
  }

  getFilteredTasks() {
    const { tasks, filter } = this.state;
    if (filter === 'All') {
      return tasks;
    }
    if (filter === 'Completed') {
      return tasks.filter(task => task.completed);
    }
    return tasks.filter(task => task.priority === filter);
  }

  getBadgeClass(priority) {
    if (priority === 'High') {
      return 'bg-primary';
    }
    if (priority === 'Medium') {
      return 'bg-warning text-dark';
    }
    return 'bg-secondary';
  }

  render() {
    const { isLoading, filter, showModal, newTaskTitle, newTaskPriority } = this.state;
    const filteredTasks = this.getFilteredTasks();
    const filters = ['All', 'High', 'Medium', 'Low', 'Completed'];

    return (
      <div className="App">
        <nav className="navbar navbar-dark bg-dark px-3">
          <span className="navbar-brand mb-0 h1">Task Manager</span>
          <button className="btn btn-primary" onClick={this.handleShowModal}>
            Add New Task
          </button>
        </nav>

        <div className="container mt-3">
          <div className="btn-group mb-3" role="group">
            {filters.map(f => (
              <button
                key={f}
                type="button"
                className={`btn ${filter === f ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => this.handleFilterChange(f)}
              >
                {f}
              </button>
            ))}
          </div>

          {isLoading && (
            <div className="d-flex justify-content-center mt-5 mb-3">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}

          <div className="row">
            {filteredTasks.length === 0 ? (
              <div className="col-12">
                <div className="alert alert-info" role="alert">
                  No tasks found for this filter.
                </div>
              </div>
            ) : (
              filteredTasks.map(task => (
                <div className="col-md-6 mb-3" key={task.id}>
                  <div className={`card ${task.completed ? 'bg-light border-success' : ''}`}>
                    <div className="card-body d-flex justify-content-between align-items-center">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={`task-checkbox-${task.id}`}
                          checked={task.completed}
                          onChange={() => this.handleTaskToggle(task.id)}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`task-checkbox-${task.id}`}
                          style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
                        >
                          {task.title}
                        </label>
                        <div>
                          <button
                            className="btn btn-danger btn-sm mt-2"
                            onClick={() => this.handleDeleteTask(task.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      <span className={`badge ${this.getBadgeClass(task.priority)}`}>
                        {task.priority}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {showModal && (
          <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add New Task</h5>
                  <button type="button" className="btn-close" onClick={this.handleCloseModal}></button>
                </div>
                <form onSubmit={this.handleSubmitNewTask}>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label className="form-label" htmlFor="new-task-title">Task Title</label>
                      <input
                        type="text"
                        id="new-task-title"
                        className="form-control"
                        placeholder="Enter task title..."
                        value={newTaskTitle}
                        onChange={this.handleNewTaskTitleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="new-task-priority">Priority</label>
                      <select
                        id="new-task-priority"
                        className="form-select"
                        value={newTaskPriority}
                        onChange={this.handleNewTaskPriorityChange}
                      >
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={this.handleCloseModal}>
                      Close
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Add Task
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
