import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
      employees: [
        'John Doe',
        'Jane Smith',
        'Mike Johnson',
        'Emily Davis',
        'James Brown',
        'Jennifer Wilson',
        'Paul Garcia',
        'Laura Martinez'
      ],
      filteredEmployees: [
        'John Doe',
        'Jane Smith',
        'Mike Johnson',
        'Emily Davis',
        'James Brown',
        'Jennifer Wilson',
        'Paul Garcia',
        'Laura Martinez'
      ]
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.filterEmployees();
    }
  }

  handleSearch = (event) => {
    this.setState({
      query: event.target.value
    });
  };

  filterEmployees = () => {
    const filteredEmployees = this.state.employees.filter((employee) =>
      employee.toLowerCase().includes(this.state.query.toLowerCase())
    );

    if (
      JSON.stringify(filteredEmployees) !==
      JSON.stringify(this.state.filteredEmployees)
    ) {
      this.setState({
        filteredEmployees: filteredEmployees
      });
    }
  };

  render() {
    return (
      <div className="App">
        <h1>Employee Directory</h1>

        <input
          type="text"
          placeholder="Search employees..."
          value={this.state.query}
          onChange={this.handleSearch}
        />

        <div className="employee-list">
          {this.state.filteredEmployees.map((employee, index) => (
            <div className="employee" key={index}>
              {employee}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
