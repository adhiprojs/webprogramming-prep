# Web Programming prep

A small offline IDE to practise the weekly iamneo (Examly) Web Programming tasks: the **COD**, **CY** and **PAH** questions from weeks 1–11. Each task runs the **real test file from the platform** on **Node 14**, so a pass here works the same way as "Run Test Cases" on the platform.

It's practice, not an exam: paste works, nothing is locked, you can switch tasks any time, and every task has a verified passing solution you can look at.

---

## 1. Requirements

| | Linux | Windows | macOS |
|---|---|---|---|
| OS | any 64-bit distro | Windows 10 or 11 (64-bit) | Intel or Apple Silicon (not tested yet) |
| Tools | `git`, `curl`, `tar` (usually already installed) | [Git for Windows](https://git-scm.com/download/win) | `git` (`xcode-select --install`) |
| Disk / internet | about **1.3 GB** of disk, a few hundred MB of download, once | same | same |

**You don't need to install Node, npm or Chrome yourself.** Setup downloads its own **Node 14.21.3** (the exam's version) into `runtime/node14`, and puppeteer downloads its own Chromium. Nothing is installed system-wide, and the Node you already have is not touched.

## 2. Download and set up (once)

### Linux / macOS
```sh
git clone https://github.com/adhiprojs/webprogramming-prep.git
cd webprogramming-prep
./setup.sh
```

### Windows
```bat
git clone https://github.com/adhiprojs/webprogramming-prep.git
cd webprogramming-prep
setup.cmd
```
You can also double-click **`setup.cmd`** in File Explorer.

Setup takes about 2–10 minutes, depending on your internet. It does four things:
1. Downloads Node 14.21.3 into `runtime/node14/`.
2. Installs the puppeteer test runtime (`runtime/puppeteer`, including Chromium).
3. Installs the React test runtime (`runtime/react`: react-scripts 5, Jest 27, React Testing Library).
4. Installs the IDE (`ide/`).

All versions are pinned by `package-lock.json`. At the end it runs one HTML task and one React task as a check. You should see:
```
10/10 passed (puppeteer, node v14.21.3)
7/7 passed (react, node v14.21.3)
Setup done.
```
If either check fails, setup stops and prints the full test output instead of "Setup done". Send that output to whoever is helping you. If you run setup again, it skips the Node download and reinstalls the packages.

## 3. Start the IDE

| Linux / macOS | Windows |
|---|---|
| `./ide.sh` | double-click **`ide.cmd`** (or run `ide.cmd` in cmd) |

Then open **http://localhost:4000** in your browser. To stop the IDE, press Ctrl+C in the terminal (on Windows, close the window).

## 4. Using it

1. **Pick a week** (W1–W11) at the top, then a **task** (COD 1, CY, PAH 2, …). Each task shows your last score (e.g. `10/10`), and a week gets a green dot when all its tasks pass.
2. **Read the Question tab.** The **Test file** tab shows the real `test.js` / `App.test.js` that grades you.
3. **Write your code in the editor.** The editor has HTML/CSS/JS autocomplete. Closing tags are added automatically (`<div>` gives `<div></div>`). **Emmet** works too: `!` + Tab gives a full page, `ul>li*3` + Tab gives a list.
4. **Save** with **Ctrl+S**. Your answer goes to `practice/<task>/answer/` and is still there tomorrow. Turn on **Autosave** (next to Save) to save automatically 1 second after you stop typing. Code you put in with **Load ▾** is still only saved when you press Save.
5. **Run tests** with **Ctrl+Enter**. It runs the real graded tests and shows each case as PASS/FAIL with the error message.
6. **Preview** shows your page. It refreshes on every save, so with Autosave on it updates almost as you type. For React tasks, click *Start live preview*; the first start takes about 30 seconds, then every save hot-reloads it.

Useful buttons:
- **Load ▾** puts code into the editor: the *passing solution*, the *minimal* version, the *original code from the dump* or the *blank starter*. Nothing is saved until you press Save. *Delete my saved answer* resets the task.
- **Minimal** is the smallest code that passes the tests and nothing else: no styling, text or features that the test doesn't check. Use it to see exactly what the grader needs. It is not a complete answer to the question (for example, the minimal stopwatch never ticks, because no test checks that).
- **Compare ▾** shows your code side by side with the solution, the minimal version, the original or the starter.
- **Check passing solution** (in Test results) runs the stored solution without touching your answer.
- **Notes**: an exam-focused explanation of the task and the common mistakes. **Report**: the results of the original code and the solution. Both are hidden until you click, so they don't spoil the answer.
- **Cheatsheet**: the patterns that repeat across all weeks (exact ids/text, computed CSS, radio buttons, grade logic, React props/state, RTL queries, …).

Your saved answers are **only on your computer**. They're in `.gitignore`, so `git pull` never overwrites them and you never push them by accident.

## 5. The tasks

| Week | Tasks | Type |
|---|---|---|
| W1 | cod1, cod2, cy1, pah1, pah2 | HTML basics |
| W2 | cod1, cod2, cy1, pah1, pah2 | HTML lists, tables, images |
| W3 | cod1, cod2, cy1, pah1, pah2 | CSS |
| W4 | — | missing (the W4 dump turned out to be a copy of W11) |
| W5 | cod1, cod2, cy, pah1, pah2 | Semantic HTML5, Flexbox |
| W6 | cod1, cod2, cy, pah1, pah2 | JavaScript DOM, events, canvas |
| W7 | cod1, cod2, cy, pah1, pah2 | JavaScript loops, radios/checkboxes, score/grade logic |
| W8 | cod1, cod2 (React), cy, pah1, pah2 | React intro + JS DOM |
| W9 | cod1, cod2, cy, pah1 | React state, lists, forms |
| W10 | cod1, cod2, cy1, pah1 | React search, timers, filters |
| W11 | cod1, cod2, cy1, pah1, pah2 | React props, PropTypes, routing |

- **HTML/CSS/JS tasks** are graded by **puppeteer**: a real Chrome opens your `public/index.html`. That means computed CSS (`rgb(...)`, `px`), visible text and real clicks count, and so does any console error.
- **React tasks** are graded by **Jest + React Testing Library**. You edit `reactapp/src/`.

## 6. Run a test from the terminal (optional)

```sh
# Linux / macOS
runtime/node14/bin/node runtime/run-test.js tests/w7-cy/solution --test tests/w7-cy/code/puppeteer/test.js
```
```bat
:: Windows
runtime\node14\node.exe runtime\run-test.js tests\w7-cy\solution --test tests\w7-cy\code\puppeteer\test.js
```
Point the first path at any folder laid out like the exam workspace (`public/…` or `reactapp/src/…`). Add `--json` to get machine-readable output.

## 7. What's in the repo

| Folder | What |
|---|---|
| `w1/` … `w11/` | the original workspace dumps (one text file per task) |
| `tests/<task>/code/` | each dump split back into its real files, byte-for-byte |
| `tests/<task>/solution/` | a verified passing version (only `public/` or `reactapp/src/` changed) |
| `tests/<task>/minimal/` | the smallest code that passes the tests (verified, same layout as `solution/`) |
| `tests/<task>/results.md` | test results for the original code and the solution |
| `practice/<task>/` | blank/buggy starter, `QUESTION.md`, `task.json` (+ your local `answer/`) |
| `notes/<task>.md`, `notes/cheatsheet.md` | study notes |
| `runtime/run-test.js` | the shared test runner (the IDE uses it too) |
| `runtime/puppeteer/`, `runtime/react/` | package.json + lockfile for the shared test installs |
| `ide/` | the practice IDE (Express + the Monaco editor) |
| `setup.sh`, `setup.cmd` + `setup.ps1` | one-time setup (Linux/macOS, Windows) |
| `ide.sh`, `ide.cmd` | start the IDE |

## 8. How close is this to the real platform?

- **Same:** Node 14, the same test files, the same file names and paths, and the same package versions as the exam `package.json` ranges (pinned by the lockfiles).
- **Different:**
  - All puppeteer tasks share one install, and all React tasks share one install. The React install is the union of the React tasks' `package.json` files.
  - Before each run, the examly URL inside a puppeteer test is pointed at a local server on a free port instead of 8081. Nothing else in the test is changed.
  - The personal workspace URLs in the dumps and test files were replaced with `https://8081-workspace.examly.io`. The runner points that at the local server anyway, so it doesn't affect any result.
- **Images:** the dumps only contained `.html/.css/.js/.json` files, so the real task images were missing. Every task that uses images (W2, W5, w6-pah1, w8-pah1, w8-cod2) now has labelled placeholder images in its project, and its Question tab has an **Images** section listing the exact file names to put in `src`.
- **Known test quirks** are listed in each `tests/<task>/results.md`. For example, w3-cod2 uses the same case name twice, and one w5-pah2 check always passes.

## 9. Troubleshooting

| Problem | Fix |
|---|---|
| `Not set up yet` when starting | Run `./setup.sh` / `setup.cmd` first. |
| Port 4000 is already in use | Linux/macOS: `PORT=5000 ./ide.sh`. Windows (cmd): `set PORT=5000` then `ide.cmd`. Open that port instead. |
| Windows: "Windows protected your PC" on a `.cmd` | Click *More info* → *Run anyway*. This happens when the repo was downloaded as a ZIP; `git clone` avoids it. |
| Windows: `setup.ps1 cannot be loaded … execution policy` | Run `setup.cmd`, not `setup.ps1` directly. It bypasses the policy for that one script. |
| Setup failed in the middle (network, proxy, antivirus) | Run setup again. If one folder keeps failing, delete its `node_modules` folder and retry. |
| Every puppeteer test fails with a Chrome/launch error | The Chromium download failed. Run setup again. On Linux, a minimal server may also need Chrome's system libraries (`libnss3`, `libatk-bridge2.0-0`, `libgbm1`, …). |
| React live preview stays on "starting" | The first compile takes about 30 seconds. The dev server's log (and any compile error) shows right there in the Preview tab. |
| `git pull` says your changes would be overwritten | You edited a tracked file outside `practice/*/answer/`. Use `git stash`, then `git pull`. |
