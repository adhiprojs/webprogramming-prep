import { useState } from 'react';

function Stopwatch() {
  const [running, setRunning] = useState(false);

  return (
    <div>
      <h2>Stopwatch</h2>
      <p>00:00.00</p>
      <button onClick={() => setRunning(true)} disabled={running}>Start</button>
      <button onClick={() => setRunning(false)} disabled={!running}>Stop</button>
      <button onClick={() => setRunning(false)}>Reset</button>
      <button disabled={!running}>Add Lap</button>
    </div>
  );
}

export default Stopwatch;
