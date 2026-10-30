# w8-cod2: Stopwatch component (class, lifecycle, disabled buttons)

## 1. What the question asks
`src/components/Stopwatch.jsx`, default export, class component with state `time`, a running flag, `laps[]`. UI text the tests rely on (exact):
- `<h2>Stopwatch</h2>`
- time display `00:00.00` (MM:SS.cs, zero padded)
- buttons `Start`, `Stop`, `Reset`, `Add Lap`
- Start disabled while running; Stop and Add Lap disabled while NOT running.

## 2. What each test checks (all use `getByText`, exact strings)
- renders: `Stopwatch` in document.
- start click: Start button becomes disabled.
- stop click: after Start then Stop, Stop is disabled.
- add lap: Start, then click `Add Lap`. No assertion (only must not crash).
- reset: Start, click Reset, `00:00.00` is in document.
- formats_time: initial `00:00.00` in document.
- toggles: after Start then Stop, Start is NOT disabled.
- Add Lap disabled initially; Stop disabled initially; Add Lap disabled after stopping.

## 3. The original submission
Passes 10/10. Right: `disabled={isRunning}` / `{!isRunning}` on the buttons, `padStart(2,'0')` formatter, interval started in `componentDidUpdate` when running flips false->true and cleared on the way back and in `componentWillUnmount`.
Fragile:
- Reset is also `disabled={isRunning}`. The reset test clicks Reset while running, so the click does nothing; it only passes because the 10 ms timer has not ticked in a synchronous test. Not disabling Reset would also pass.
- `handleStop` pushes a lap, so a lap `00:00.00` appears after stop and `getByText('00:00.00')` would then find two elements (not tested after a stop, but a trap).
- Laps keyed by index (fine for append-only).

## 4. Common mistakes
- Button labels not exact (`Add lap`, `Lap`, `Start/Stop` single toggle button). Tests need three separate buttons plus `Add Lap`.
- Forgetting `disabled` initial states (Stop/Add Lap must start disabled).
- Not clearing `setInterval` (leaks, state update after unmount warnings).
- Using `setInterval` inside the click handler without storing the id.
- Formatting `0:0.0` instead of `00:00.00`.
- Showing the time in two elements so `getByText('00:00.00')` matches twice.

## 5. Approach in 5 steps
1. Class with `state = {time:0, isRunning:false, laps:[]}`.
2. `formatTime(ms)` -> `MM:SS.cs` with `padStart`.
3. Handlers: start sets running; stop sets not running; reset zeroes everything; lap appends current time.
4. `componentDidUpdate` starts/clears the interval based on the running flag; clear in `componentWillUnmount`.
5. Render heading, time, three buttons with `disabled`, `Add Lap` button, map laps.
