import React, { Component } from 'react';

class Stopwatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      isRunning: false,
      laps: []
    };
    this.interval = null;
    this.startTime = 0;
  }

  componentDidMount() {
    this.interval = null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.isRunning && this.state.isRunning) {
      this.startTime = Date.now() - this.state.time;
      this.interval = setInterval(() => {
        this.setState({
          time: Date.now() - this.startTime
        });
      }, 10);
    }

    if (prevState.isRunning && !this.state.isRunning && this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  formatTime = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const centiseconds = Math.floor((milliseconds % 1000) / 10);

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(centiseconds).padStart(2, '0')}`;
  };

  handleStart = () => {
    this.setState({
      isRunning: true
    });
  };

  handleStop = () => {
    this.setState((prevState) => ({
      isRunning: false,
      laps: [...prevState.laps, prevState.time]
    }));
  };

  handleReset = () => {
    this.setState({
      time: 0,
      isRunning: false,
      laps: []
    });
  };

  handleLap = () => {
    this.setState((prevState) => ({
      laps: [...prevState.laps, prevState.time]
    }));
  };

  render() {
    const { time, isRunning, laps } = this.state;

    return (
      <div className="stopwatch">
        <h2>Stopwatch</h2>

        <div className="time">
          {this.formatTime(time)}
        </div>

        <div className="buttons">
          <button
            className="start"
            onClick={this.handleStart}
            disabled={isRunning}
          >
            Start
          </button>

          <button
            className="stop"
            onClick={this.handleStop}
            disabled={!isRunning}
          >
            Stop
          </button>

          <button
            className="reset"
            onClick={this.handleReset}
            disabled={isRunning}
          >
            Reset
          </button>
        </div>

        <button
          className="lap"
          onClick={this.handleLap}
          disabled={!isRunning}
        >
          Add Lap
        </button>

        <div className="laps">
          {laps.map((lap, index) => (
            <div className="lap-item" key={index}>
              {this.formatTime(lap)}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Stopwatch;
