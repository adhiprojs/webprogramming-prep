# Stopwatch Component (React)

Build a `Stopwatch` React component with Start, Stop, Add Lap and Reset buttons and a time display. Start begins timing, Stop pauses it, Add Lap records a lap while running, and Reset returns the display to zero. The buttons enable and disable depending on whether the stopwatch is running.

## Components

- `src/components/Stopwatch.jsx` - default export `Stopwatch`, no props. The test imports it as `../components/Stopwatch`.
- `src/App.js` - may render `<Stopwatch />`; the test renders `Stopwatch` directly.

## Requirements

1. Render a heading with the exact text `Stopwatch`. *(renders_Stopwatch_without_crashing)*
2. Render buttons with the exact texts `Start`, `Stop`, `Add Lap` and `Reset`. Clicking `Start` disables the `Start` button. *(starts_the_stopwatch_when_Start_button_is_clicked)*
3. After clicking `Start`, clicking `Stop` disables the `Stop` button. *(stops_the_stopwatch_when_Stop_button_is_clicked)*
4. After clicking `Start`, clicking `Add Lap` must work without error (a lap is recorded). *(adds_a_lap_when_Add_Lap_button_is_clicked)*
5. After clicking `Start`, clicking `Reset` shows the time `00:00.00` on screen. *(resets_the_stopwatch_when_Reset_button_is_clicked)*
6. Initially the time display shows exactly `00:00.00` (format `MM:SS.hh`). *(formats_time_correctly)*
7. After `Start` then `Stop`, the same `Start` button is enabled again. *(toggles_the_is_Running_state_when_start_and_stop_buttons_are_clicked)*
8. Before starting, the `Add Lap` button is disabled. *(disables_Add_Lap_button_when_stopwatch_is_not_running)*
9. Before starting, the `Stop` button is disabled. *(disables_Stop_button_when_stopwatch_is_not_running)*
10. After `Start` then `Stop`, the `Add Lap` button is disabled. *(disables_Add_Lap_button_after_stopping_the_stopwatch)*

## Watch out

- `getByText('Stopwatch')` is an exact full-text match, so the heading must be its own element and no other element may have exactly that text.
- `getByText('00:00.00')` must match exactly one element, so do not show the same string elsewhere (for example in a lap list) at that moment.
- The test keeps references to the buttons from before clicking, so keep the same button elements rendered and toggle only their `disabled` state.
- `getByText('Start')` and `getByText('Stop')` are exact matches; the heading `Stopwatch` does not clash with them.

## Files

- `reactapp/src/App.js`
- `reactapp/src/components/Stopwatch.jsx`
- `reactapp/src/App.css`

## How it's graded

Jest + React Testing Library (react-scripts test) runs `src/tests/App.test.js`.
