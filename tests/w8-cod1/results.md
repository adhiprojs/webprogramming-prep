# w8-cod1 results

- Command: `runtime/node14/bin/node runtime/run-test.js tests/w8-cod1/code --test tests/w8-cod1/code/react/tests/App.test.js`
- Node: v14.21.3 (shared runtime: react-scripts 5.0.1, RTL 13, jest 27, react 18)

## Original code/ (0/1)

- FAIL: (test file failed to run)

### Error text (original)
```
Cannot find module './logo.svg' from 'src/App.js'
```

## solution/ (7/7 run 1, 7/7 run 2)

Edited/added only under solution/reactapp/src/ (see below). All cases PASS in both runs.

Cause: App.js was the untouched CRA template (imports missing ./logo.svg). Fix: rewrote solution/reactapp/src/App.js (heading "Employee Directory", search input with placeholder "Search employees...", four employees filtered by useState search).
