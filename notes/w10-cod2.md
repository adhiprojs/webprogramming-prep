# w10-cod2: Stopwatch component (second variant, class + lifecycle)

## 1. What the question asks
Same as w8-cod2: `src/components/Stopwatch.jsx`, default export, class component. Exact texts: `Stopwatch`, `00:00.00`, buttons `Start`, `Stop`, `Reset`, `Add Lap`. Start disabled while running; Stop and Add Lap disabled while stopped.

## 2. What each test checks
The test file is identical to w8-cod2 (10 tests, all `getByText` with exact strings): render heading; Start click disables Start; Start then Stop disables Stop; Add Lap click (no assertion); Reset click then `00:00.00`; initial `00:00.00`; after Start+Stop Start is enabled again; Add Lap and Stop disabled initially; Add Lap disabled after stopping.

## 3. The original submission
Passes 10/10 as submitted. Right: `running` flag in state; `componentDidUpdate` calls `startTimer`/`stopTimer` when the flag flips; `elapsedBeforeStart` lets it resume instead of restarting; timer cleared in `componentWillUnmount`; `reset` clears timer and zeroes state.
Fragile:
- Reset button is `disabled={running}`; the reset test clicks it while running (no-op) and passes only because the display is still `00:00.00`.
- `stop` appends a lap (stopped time) so lap text can duplicate the main display text.
- `stopTimer` copies `this.state.time` into an instance field: works but reads state outside render.
- Class names differ from w8 version (`start-btn`, etc.); tests don't use them.

## 4. Common mistakes
- Not clearing `setInterval`.
- Wrong initial `disabled` values.
- `padStart` missing -> `0:0.0`.
- Using `Date.now()` diff without storing elapsed so it jumps on resume.
- Two elements with the same exact text as the time display.

## 5. Approach in 5 steps
1. State `{time, running, laps}`.
2. `formatTime(ms)` with `padStart`.
3. `start/stop/reset/addLap` handlers via `setState`.
4. `componentDidUpdate` toggles `setInterval`/`clearInterval`; unmount clears.
5. Buttons with correct `disabled` expressions.
