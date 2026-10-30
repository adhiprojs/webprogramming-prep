import React from 'react';

class Stopwatch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      time: 0,
      running: false,
      laps: []
    };

    this.timer = null;
    this.startTime = 0;
    this.elapsedBeforeStart = 0;
  }

  componentDidMount() {
    this.timer = null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.running && this.state.running) {
      this.startTimer();
    }

    if (prevState.running && !this.state.running) {
      this.stopTimer();
    }
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  startTimer = () => {
    this.startTime = Date.now() - this.elapsedBeforeStart;

    this.timer = setInterval(() => {
      this.setState({
        time: Date.now() - this.startTime
      });
    }, 10);
  };

  stopTimer = () => {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }

    this.elapsedBeforeStart = this.state.time;
  };

  start = () => {
    if (!this.state.running) {
      this.setState({
        running: true
      });
    }
  };

  stop = () => {
    if (this.state.running) {
      const currentTime = this.state.time;

      this.setState({
        running: false,
        laps: [...this.state.laps, currentTime]
      });
    }
  };

  reset = () => {
    this.stopTimer();

    this.setState({
      time: 0,
      running: false,
      laps: []
    });

    this.startTime = 0;
    this.elapsedBeforeStart = 0;
  };

  addLap = () => {
    if (this.state.running) {
      this.setState({
        laps: [...this.state.laps, this.state.time]
      });
    }
  };

  formatTime = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const centiseconds = Math.floor((milliseconds % 1000) / 10);

    return (
      String(minutes).padStart(2, '0') +
      ':' +
      String(seconds).padStart(2, '0') +
      '.' +
      String(centiseconds).padStart(2, '0')
    );
  };

  render() {
    const { time, running, laps } = this.state;

    return (
      <div className="stopwatch">
        <h2>Stopwatch</h2>

        <div className="time">
          {this.formatTime(time)}
        </div>

        <div className="buttons">
          <button
            className="start-btn"
            onClick={this.start}
            disabled={running}
          >
            Start
          </button>

          <button
            className="stop-btn"
            onClick={this.stop}
            disabled={!running}
          >
            Stop
          </button>

          <button
            className="reset-btn"
            onClick={this.reset}
            disabled={running}
          >
            Reset
          </button>
        </div>

        <button
          className="lap-btn"
          onClick={this.addLap}
          disabled={!running}
        >
          Add Lap
        </button>

        <div className="laps">
          {laps.map((lap, index) => (
            <div className="lap" key={index}>
              {this.formatTime(lap)}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Stopwatch;
