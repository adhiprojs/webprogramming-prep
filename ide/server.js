// Practice IDE server. Start with ./ide.sh from the project root (uses runtime/node14).
//
// Data it reads (written by the agents):
//   tests/<name>/code/       original workspace from the dump (read-only; graded test lives here)
//   tests/<name>/solution/   verified passing version
//   practice/<name>/starter/ what you start from;  practice/<name>/task.json, QUESTION.md
//   notes/<name>.md          study note
// Data it writes:
//   practice/<name>/answer/  your saved files (overlay on top of starter/)
//   practice/<name>/last-run.json

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const express = require('express');

const ROOT = path.resolve(__dirname, '..');
const TESTS = path.join(ROOT, 'tests');
const PRACTICE = path.join(ROOT, 'practice');
const NOTES = path.join(ROOT, 'notes');
const RUNTIME = path.join(ROOT, 'runtime');
const IS_WIN = process.platform === 'win32';
// The Node 14 that setup.sh / setup.cmd put in runtime/node14 (node.exe on Windows).
const NODE14 = [path.join(RUNTIME, 'node14', IS_WIN ? 'node.exe' : path.join('bin', 'node')), process.execPath]
  .find((p) => fs.existsSync(p));
const RUNNER = path.join(RUNTIME, 'run-test.js');
const TMP = path.join(__dirname, '.tmp');
const PORT = Number(process.env.PORT) || 4000;
const REACT_PREVIEW_PORT = Number(process.env.REACT_PREVIEW_PORT) || 4001;

const NAME_RE = /^w\d+-[a-z]+\d*$/;
const EDITABLE_ROOTS = ['public/', 'reactapp/src/'];
const TEXT_EXT = /\.(html?|css|jsx?|json|md|txt|svg)$/i;

// ---------- helpers ----------

function readIf(file) {
  try { return fs.readFileSync(file, 'utf8'); } catch (e) { return null; }
}

function readJson(file) {
  const s = readIf(file);
  if (s == null) return null;
  try { return JSON.parse(s); } catch (e) { return null; }
}

function walk(dir, base = dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    if (e.name === 'node_modules') return [];
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p, base) : [path.relative(base, p).split(path.sep).join('/')];
  });
}

function copyDir(src, dst) {
  for (const rel of walk(src)) {
    const d = path.join(dst, rel);
    fs.mkdirSync(path.dirname(d), { recursive: true });
    fs.copyFileSync(path.join(src, rel), d);
  }
}

function checkName(name) {
  if (!NAME_RE.test(name) || !fs.existsSync(path.join(TESTS, name, 'code'))) {
    const err = new Error(`unknown task ${name}`);
    err.status = 404;
    throw err;
  }
}

// Only files under public/ or reactapp/src/, no traversal, text files only.
function checkRel(rel) {
  const norm = path.posix.normalize(String(rel || ''));
  if (norm.startsWith('..') || path.posix.isAbsolute(norm) || !EDITABLE_ROOTS.some((r) => norm.startsWith(r))
      || !TEXT_EXT.test(norm) || /(^|\/)tests?\//.test(norm.replace(/^reactapp\/src\//, '')) || /\.test\.jsx?$/.test(norm)) {
    const err = new Error(`not an editable path: ${rel}`);
    err.status = 400;
    throw err;
  }
  return norm;
}

function dirs(name) {
  return {
    code: path.join(TESTS, name, 'code'),
    solution: path.join(TESTS, name, 'solution'),
    minimal: path.join(TESTS, name, 'minimal'),
    results: path.join(TESTS, name, 'results.md'),
    practice: path.join(PRACTICE, name),
    starter: fs.existsSync(path.join(PRACTICE, name, 'starter'))
      ? path.join(PRACTICE, name, 'starter') : path.join(TESTS, name, 'code'),
    answer: path.join(PRACTICE, name, 'answer'),
    lastRun: path.join(PRACTICE, name, 'last-run.json'),
    question: path.join(PRACTICE, name, 'QUESTION.md'),
    note: path.join(NOTES, `${name}.md`),
  };
}

// task.json from practice-builder, with a fallback derived from the dump so a task is usable either way.
function meta(name) {
  const d = dirs(name);
  const fromFile = readJson(path.join(d.practice, 'task.json')) || {};
  const m = name.match(/^(w\d+)-([a-z]+?)(\d*)$/);
  const isReact = fs.existsSync(path.join(d.code, 'reactapp'));
  const test = fromFile.test || (isReact ? 'react/tests/App.test.js' : 'puppeteer/test.js');
  let editable = fromFile.editable;
  if (!Array.isArray(editable) || !editable.length) {
    editable = walk(d.starter).filter((p) => {
      try { checkRel(p); } catch (e) { return false; }
      return isReact ? /^reactapp\/src\/(App\.(js|css)|components\/)/.test(p) || /^reactapp\/src\/[A-Z].*\.(jsx?|css)$/.test(p) : true;
    });
    // Markup/logic before styles, so the editor opens on the file that matters.
    const rank = (p) => (/\.html?$/.test(p) ? 0 : /App\.js$/.test(p) ? 1 : /\.jsx?$/.test(p) ? 2 : 3);
    editable.sort((a, b) => rank(a) - rank(b) || a.localeCompare(b));
  }
  return {
    name,
    week: m[1],
    kind: fromFile.kind || m[2],
    number: fromFile.number || Number(m[3] || 1),
    type: fromFile.type || (isReact ? 'react' : 'puppeteer'),
    title: fromFile.title || name,
    starterKind: fromFile.starterKind || null,
    editable,
    test,
    testCount: fromFile.testCount || null,
  };
}

function listTasks() {
  if (!fs.existsSync(TESTS)) return [];
  return fs.readdirSync(TESTS).filter((n) => NAME_RE.test(n) && fs.existsSync(path.join(TESTS, n, 'code'))).map((name) => {
    const m = meta(name);
    const d = dirs(name);
    const last = readJson(d.lastRun);
    return {
      ...m,
      hasAnswer: walk(d.answer).length > 0,
      hasSolution: fs.existsSync(d.solution),
      last: last ? { passed: last.passed, total: last.tests.length, at: last.at } : null,
    };
  }).sort((a, b) => (parseInt(a.week.slice(1)) - parseInt(b.week.slice(1)))
    || ['cod', 'cy', 'pah'].indexOf(a.kind) - ['cod', 'cy', 'pah'].indexOf(b.kind) || a.number - b.number);
}

// The working copy = starter overlaid with saved answer files.
function composeWorkspace(name, extraFiles) {
  const d = dirs(name);
  fs.mkdirSync(TMP, { recursive: true });
  const ws = fs.mkdtempSync(path.join(TMP, `${name}-`));
  copyDir(d.starter, ws);
  copyDir(d.answer, ws);
  for (const [rel, content] of Object.entries(extraFiles || {})) {
    const p = path.join(ws, checkRel(rel));
    fs.mkdirSync(path.dirname(p), { recursive: true });
    fs.writeFileSync(p, content);
  }
  return ws;
}

function saveFiles(name, files) {
  const d = dirs(name);
  for (const [rel, content] of Object.entries(files || {})) {
    const safe = checkRel(rel);
    const p = path.join(d.answer, safe);
    fs.mkdirSync(path.dirname(p), { recursive: true });
    fs.writeFileSync(p, content);
  }
  syncReactPreview(name);
}

// Runner process per task, so the IDE's Stop button can end it.
const running = new Map();

function startRunner(name, appDir) {
  const child = spawn(NODE14, [RUNNER, appDir, '--test', path.join(dirs(name).code, meta(name).test), '--json'], { cwd: ROOT, windowsHide: true });
  running.set(name, child);
  child.on('close', () => { if (running.get(name) === child) running.delete(name); });
  return child;
}

function stopRunner(name) {
  const child = running.get(name);
  if (!child) return false;
  child.stoppedByUser = true;
  // Linux/macOS: the runner catches SIGTERM, kills the test's process group and still reports.
  // Windows: no signals, so kill the whole tree.
  if (IS_WIN) spawn('taskkill', ['/pid', String(child.pid), '/T', '/F'], { windowsHide: true });
  else child.kill('SIGTERM');
  return true;
}

function stoppedResult(type, out) {
  return { type, stopped: true, tests: [{ name: '(stopped)', status: 'failed', message: 'Stopped before the test finished.' }], output: out, passed: 0, failed: 1 };
}

function runTests(name) {
  const m = meta(name);
  const d = dirs(name);
  const ws = composeWorkspace(name);
  return new Promise((resolve) => {
    const child = startRunner(name, ws);
    let out = '';
    let err = '';
    child.stdout.on('data', (c) => { out += c; });
    child.stderr.on('data', (c) => { err += c; });
    child.on('close', () => {
      fs.rmSync(ws, { recursive: true, force: true });
      let result;
      try {
        result = JSON.parse(out);
      } catch (e) {
        result = child.stoppedByUser ? stoppedResult(m.type, err || out)
          : { type: m.type, tests: [{ name: '(runner error)', status: 'failed', message: err || out }], output: err || out, passed: 0, failed: 1 };
      }
      result.at = new Date().toISOString();
      if (!result.stopped) {
        fs.mkdirSync(d.practice, { recursive: true });
        fs.writeFileSync(d.lastRun, JSON.stringify(result, null, 2));
      }
      resolve(result);
    });
  });
}

// ---------- React live preview (one at a time, react-scripts start on REACT_PREVIEW_PORT) ----------

let preview = null; // { name, dir, proc, log, ready }

function syncReactPreview(name) {
  if (!preview || preview.name !== name) return;
  const d = dirs(name);
  copyDir(path.join(d.answer, 'reactapp'), preview.dir);
}

function stopReactPreview() {
  if (!preview) return;
  try {
    if (IS_WIN) spawn('taskkill', ['/pid', String(preview.proc.pid), '/T', '/F'], { windowsHide: true });
    else process.kill(-preview.proc.pid, 'SIGTERM');
  } catch (e) { /* gone */ }
  fs.rmSync(preview.dir, { recursive: true, force: true });
  preview = null;
}

function startReactPreview(name) {
  stopReactPreview();
  const d = dirs(name);
  // Inside runtime/react so the shared node_modules resolve.
  const dir = fs.mkdtempSync(path.join(RUNTIME, 'react', '.preview-'));
  copyDir(path.join(d.starter, 'reactapp'), dir);
  copyDir(path.join(d.answer, 'reactapp'), dir);
  fs.writeFileSync(path.join(dir, 'package.json'), JSON.stringify({
    name: 'reactapp', private: true,
    browserslist: { development: ['last 1 chrome version', 'last 1 firefox version'] },
  }));
  const bin = path.join(RUNTIME, 'react', 'node_modules', 'react-scripts', 'bin', 'react-scripts.js');
  const proc = spawn(NODE14, [bin, 'start'], {
    cwd: dir,
    detached: !IS_WIN,
    windowsHide: true,
    env: { ...process.env, PORT: String(REACT_PREVIEW_PORT), BROWSER: 'none', HOST: '127.0.0.1', SKIP_PREFLIGHT_CHECK: 'true', FAST_REFRESH: 'true' },
  });
  preview = { name, dir, proc, log: '', ready: false };
  const onData = (c) => {
    if (!preview || preview.proc !== proc) return;
    preview.log = (preview.log + String(c).replace(/\u001b\[[0-9;]*[a-zA-Z]/g, '')).slice(-20000);
    if (/Compiled|compiled|webpack compiled/.test(String(c))) preview.ready = true;
  };
  proc.stdout.on('data', onData);
  proc.stderr.on('data', onData);
  proc.on('close', () => { if (preview && preview.proc === proc) preview.ready = false; });
}

process.on('exit', () => { stopReactPreview(); for (const name of running.keys()) stopRunner(name); });
for (const sig of ['SIGINT', 'SIGTERM']) process.on(sig, () => { stopReactPreview(); process.exit(0); });

// ---------- HTTP ----------

const app = express();
app.use(express.json({ limit: '5mb' }));
app.use('/api', (req, res, next) => { res.set('Cache-Control', 'no-store'); next(); });
app.use(express.static(path.join(__dirname, 'public')));
app.use('/monaco', express.static(path.join(__dirname, 'node_modules', 'monaco-editor', 'min')));
app.use('/vendor/emmet', express.static(path.join(__dirname, 'node_modules', 'emmet-monaco-es', 'dist')));
app.use('/vendor/marked', express.static(path.join(__dirname, 'node_modules', 'marked')));

const api = (fn) => async (req, res) => {
  try {
    res.json(await fn(req, res));
  } catch (e) {
    res.status(e.status || 500).json({ error: e.message });
  }
};

app.get('/api/tasks', api(() => listTasks()));
app.get('/api/cheatsheet', api(() => ({ text: readIf(path.join(NOTES, 'cheatsheet.md')) })));

app.get('/api/task/:name', api((req) => {
  const { name } = req.params;
  checkName(name);
  const m = meta(name);
  const d = dirs(name);
  const answerFiles = walk(d.answer).filter((p) => { try { checkRel(p); return true; } catch (e) { return false; } });
  const paths = [...new Set([...m.editable, ...answerFiles])];
  const files = {};
  for (const rel of paths) {
    files[rel] = {
      starter: readIf(path.join(d.starter, rel)),
      answer: readIf(path.join(d.answer, rel)),
      original: readIf(path.join(d.code, rel)),
      solution: readIf(path.join(d.solution, rel)),
      minimal: readIf(path.join(d.minimal, rel)),
    };
  }
  // Solution files the starter doesn't have (e.g. a new component) are listed too, so "Load solution" is complete.
  for (const rel of walk(d.solution)) {
    if (files[rel]) continue;
    try { checkRel(rel); } catch (e) { continue; }
    if (readIf(path.join(d.starter, rel)) === readIf(path.join(d.solution, rel))) continue;
    files[rel] = { starter: null, answer: readIf(path.join(d.answer, rel)), original: readIf(path.join(d.code, rel)), solution: readIf(path.join(d.solution, rel)), minimal: readIf(path.join(d.minimal, rel)), solutionOnly: true };
  }
  // Same for files only the minimal version has.
  for (const rel of walk(d.minimal)) {
    if (files[rel]) continue;
    try { checkRel(rel); } catch (e) { continue; }
    if (readIf(path.join(d.starter, rel)) === readIf(path.join(d.minimal, rel))) continue;
    files[rel] = { starter: null, answer: readIf(path.join(d.answer, rel)), original: readIf(path.join(d.code, rel)), solution: null, minimal: readIf(path.join(d.minimal, rel)), solutionOnly: true };
  }
  return {
    meta: m,
    files,
    question: readIf(d.question),
    note: readIf(d.note),
    results: readIf(d.results),
    testSource: readIf(path.join(d.code, m.test)),
    last: readJson(d.lastRun),
    hasSolution: fs.existsSync(d.solution),
    hasMinimal: fs.existsSync(d.minimal),
  };
}));

app.post('/api/task/:name/save', api((req) => {
  checkName(req.params.name);
  saveFiles(req.params.name, req.body.files);
  return { ok: true };
}));

app.post('/api/task/:name/run', api(async (req) => {
  checkName(req.params.name);
  if (req.body && req.body.files) saveFiles(req.params.name, req.body.files);
  return runTests(req.params.name);
}));

app.post('/api/task/:name/stop', api((req) => {
  checkName(req.params.name);
  return { stopped: stopRunner(req.params.name) };
}));

// Run the stored solution (proves it passes, without touching your answer).
app.post('/api/task/:name/run-solution', api(async (req) => {
  const { name } = req.params;
  checkName(name);
  const d = dirs(name);
  if (!fs.existsSync(d.solution)) throw Object.assign(new Error('no solution yet'), { status: 404 });
  return new Promise((resolve) => {
    const child = startRunner(name, d.solution);
    let out = '';
    let err = '';
    child.stdout.on('data', (c) => { out += c; });
    child.stderr.on('data', (c) => { err += c; });
    child.on('close', () => {
      try { resolve(JSON.parse(out)); } catch (e) {
        resolve(child.stoppedByUser ? stoppedResult(meta(name).type, err || out)
          : { tests: [{ name: '(runner error)', status: 'failed', message: err || out }], passed: 0, failed: 1 });
      }
    });
  });
}));

app.post('/api/task/:name/delete-file', api((req) => {
  checkName(req.params.name);
  const rel = checkRel(req.body.path);
  fs.rmSync(path.join(dirs(req.params.name).answer, rel), { force: true });
  return { ok: true };
}));

app.post('/api/task/:name/reset', api((req) => {
  checkName(req.params.name);
  const d = dirs(req.params.name);
  fs.rmSync(d.answer, { recursive: true, force: true });
  fs.rmSync(d.lastRun, { force: true });
  if (preview && preview.name === req.params.name) startReactPreview(req.params.name);
  return { ok: true };
}));

// Static preview of a puppeteer task: answer overlay first, then starter.
app.get(/^\/preview\/(w\d+-[a-z]+\d*)\/(.*)$/, (req, res) => {
  const name = req.params[0];
  try { checkName(name); } catch (e) { return res.status(404).end(); }
  const d = dirs(name);
  const rel = path.posix.normalize(req.params[1] || 'index.html').replace(/^(\.\.\/)+/, '') || 'index.html';
  const target = rel.endsWith('/') || rel === '.' ? 'index.html' : rel;
  for (const base of [d.answer, d.starter]) {
    const p = path.join(base, 'public', target);
    if (p.startsWith(path.join(base, 'public')) && fs.existsSync(p) && fs.statSync(p).isFile()) {
      res.set('Cache-Control', 'no-store');
      return res.sendFile(p);
    }
  }
  res.status(404).send('Not found');
});

app.post('/api/react-preview/:name/start', api((req) => {
  checkName(req.params.name);
  startReactPreview(req.params.name);
  return { port: REACT_PREVIEW_PORT };
}));
app.post('/api/react-preview/stop', api(() => { stopReactPreview(); return { ok: true }; }));
app.get('/api/react-preview', api(() => (preview
  ? { name: preview.name, ready: preview.ready, port: REACT_PREVIEW_PORT, log: preview.log.slice(-4000) }
  : { name: null })));

app.listen(PORT, '127.0.0.1', () => {
  console.log(`Practice IDE: http://localhost:${PORT}`);
  if (NODE14 === process.execPath && !process.version.startsWith('v14.')) {
    console.log(`warning: runtime/node14 not found, tests will run on ${process.version}. Run setup first (see README).`);
  }
});
