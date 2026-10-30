#!/usr/bin/env node
// Shared test runner for every week's task. Run it with the Node 14 in runtime/node14.
//
//   runtime/node14/bin/node runtime/run-test.js <appDir> [--test <testFile>] [--json]     (Linux/macOS)
//   runtime\node14\node.exe runtime\run-test.js <appDir> [--test <testFile>] [--json]    (Windows)
//
// <appDir> is a project root laid out like the exam workspace:
//   puppeteer task: <appDir>/public/...            (+ <appDir>/puppeteer/test.js)
//   react task:     <appDir>/reactapp/src/...      (+ <appDir>/react/tests/App.test.js)
// --test overrides the test file (the IDE passes the original, untouched test from tests/<name>/code).
//
// Puppeteer: serves <appDir>/public on a free port (same as the exam's server.js, which serves
// 'public' on 8081), rewrites the examly URL in a temp copy of test.js to that port, and swaps
// --remote-debugging-port=9222 for 0 so several runs can happen at once. Results come from
// the TESTCASE:<name>:success|failure lines the test prints.
// React: copies reactapp/{src,public} into a scratch app inside runtime/react (so it uses the shared
// node_modules), puts the test at src/tests/App.test.js and runs `react-scripts test` (Jest 27 + jsdom).

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const RUNTIME = __dirname;
const PUPPETEER_RT = path.join(RUNTIME, 'puppeteer');
const REACT_RT = path.join(RUNTIME, 'react');
const NODE = process.execPath;
const TIMEOUT_MS = 120000;
const IS_WIN = process.platform === 'win32';

function parseArgs(argv) {
  const out = { appDir: null, test: null, json: false };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--test') out.test = argv[++i];
    else if (argv[i] === '--json') out.json = true;
    else if (!out.appDir) out.appDir = argv[i];
  }
  if (!out.appDir) throw new Error('usage: run-test.js <appDir> [--test <file>] [--json]');
  out.appDir = path.resolve(out.appDir);
  return out;
}

function detectType(appDir, testFile) {
  if (fs.existsSync(path.join(appDir, 'reactapp'))) return 'react';
  if (testFile && /App\.test\.js$/.test(testFile)) return 'react';
  return 'puppeteer';
}

function run(cmd, args, opts) {
  return new Promise((resolve) => {
    // Own process group on Linux/macOS so a timeout kills Chrome/Jest children too.
    const child = spawn(cmd, args, { ...opts, detached: !IS_WIN, windowsHide: true });
    let out = '';
    child.stdout.on('data', (d) => { out += d; });
    child.stderr.on('data', (d) => { out += d; });
    const timer = setTimeout(() => {
      out += `\n[runner] timed out after ${TIMEOUT_MS / 1000}s, killed\n`;
      killTree(child.pid);
    }, TIMEOUT_MS);
    child.on('close', (code) => { clearTimeout(timer); resolve({ code, out }); });
  });
}

function killTree(pid) {
  try {
    if (IS_WIN) spawn('taskkill', ['/pid', String(pid), '/T', '/F'], { windowsHide: true });
    else process.kill(-pid, 'SIGKILL');
  } catch (e) { /* already gone */ }
}

function copyDir(src, dst) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dst, { recursive: true });
  for (const ent of fs.readdirSync(src, { withFileTypes: true })) {
    if (ent.name === 'node_modules') continue;
    const s = path.join(src, ent.name);
    const d = path.join(dst, ent.name);
    if (ent.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

function freePort() {
  return new Promise((resolve, reject) => {
    const srv = require('net').createServer();
    srv.listen(0, '127.0.0.1', () => {
      const { port } = srv.address();
      srv.close(() => resolve(port));
    });
    srv.on('error', reject);
  });
}

// Graded test names in the order they appear in the file, so tests that never print still show up.
// A name that only ever prints ":failure" (e.g. w6-w8 `page_load`) is a guard, not a graded case:
// it only shows up in the results if it actually printed.
function declaredPuppeteerTests(src) {
  const names = [];
  const hasSuccess = new Set();
  const re = /TESTCASE:([A-Za-z0-9_\-]+):(success|failure)/g;
  let m;
  while ((m = re.exec(src))) {
    if (!names.includes(m[1])) names.push(m[1]);
    if (m[2] === 'success') hasSuccess.add(m[1]);
  }
  return names.filter((n) => hasSuccess.has(n));
}

async function runPuppeteer(appDir, testFile) {
  const express = require(path.join(PUPPETEER_RT, 'node_modules', 'express'));
  const app = express();
  app.use(express.static(path.join(appDir, 'public')));
  const port = await freePort();
  const server = await new Promise((resolve) => {
    const s = app.listen(port, '127.0.0.1', () => resolve(s));
  });

  const src = fs.readFileSync(testFile, 'utf8');
  const local = `http://127.0.0.1:${port}`;
  const patched = src
    .replace(/https?:\/\/8081-[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.examly\.io/g, local)
    .replace(/https?:\/\/(?:localhost|127\.0\.0\.1):8081/g, local)
    .replace(/--remote-debugging-port=\d+/g, '--remote-debugging-port=0');

  const runDir = fs.mkdtempSync(path.join(PUPPETEER_RT, '.run-'));
  const tmpTest = path.join(runDir, 'test.js');
  fs.writeFileSync(tmpTest, patched);
  let res;
  try {
    res = await run(NODE, [tmpTest], { cwd: runDir, env: process.env });
  } finally {
    server.close();
    fs.rmSync(runDir, { recursive: true, force: true });
  }

  const status = {};
  for (const m of res.out.matchAll(/TESTCASE:([A-Za-z0-9_\-]+):(success|failure)/g)) {
    status[m[1]] = m[2] === 'success' ? 'passed' : 'failed';
  }
  const names = declaredPuppeteerTests(src);
  for (const n of Object.keys(status)) if (!names.includes(n)) names.push(n);
  const tests = names.map((name) => ({
    name,
    status: status[name] || 'failed',
    message: status[name] ? '' : 'did not report a result (test crashed or timed out before this case)',
  }));
  return { type: 'puppeteer', tests, output: res.out };
}

async function runReact(appDir, testFile) {
  const runDir = fs.mkdtempSync(path.join(REACT_RT, '.run-'));
  try {
    copyDir(path.join(appDir, 'reactapp', 'src'), path.join(runDir, 'src'));
    copyDir(path.join(appDir, 'reactapp', 'public'), path.join(runDir, 'public'));
    fs.writeFileSync(path.join(runDir, 'package.json'), JSON.stringify({ name: 'reactapp', private: true }));
    const testsDir = path.join(runDir, 'src', 'tests');
    // Only the graded test runs, like the platform's "Run Test Cases".
    fs.rmSync(testsDir, { recursive: true, force: true });
    for (const f of walk(path.join(runDir, 'src'))) {
      if (/\.(test|spec)\.[jt]sx?$/.test(f)) fs.rmSync(f);
    }
    fs.mkdirSync(testsDir, { recursive: true });
    fs.copyFileSync(testFile, path.join(testsDir, 'App.test.js'));

    const outFile = path.join(runDir, 'jest-result.json');
    const bin = path.join(REACT_RT, 'node_modules', 'react-scripts', 'bin', 'react-scripts.js');
    const res = await run(NODE, [bin, 'test', '--watchAll=false', '--ci', '--json', `--outputFile=${outFile}`], {
      cwd: runDir,
      env: { ...process.env, CI: 'true', BROWSER: 'none', SKIP_PREFLIGHT_CHECK: 'true' },
    });

    let tests = [];
    if (fs.existsSync(outFile)) {
      const j = JSON.parse(fs.readFileSync(outFile, 'utf8'));
      for (const suite of j.testResults) {
        for (const a of suite.assertionResults) {
          tests.push({
            name: a.title,
            group: a.ancestorTitles.join(' > '),
            status: a.status === 'passed' ? 'passed' : 'failed',
            message: stripAnsi((a.failureMessages || []).join('\n')),
          });
        }
        if (!suite.assertionResults.length && suite.message) {
          tests.push({ name: '(test file failed to run)', status: 'failed', message: stripAnsi(suite.message) });
        }
      }
    }
    if (!tests.length) tests.push({ name: '(no results)', status: 'failed', message: stripAnsi(res.out) });
    return { type: 'react', tests, output: stripAnsi(res.out) };
  } finally {
    fs.rmSync(runDir, { recursive: true, force: true });
  }
}

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]);
}

function stripAnsi(s) {
  return String(s).replace(/\u001b\[[0-9;]*m/g, '');
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const type = detectType(args.appDir, args.test);
  const testFile = path.resolve(args.test || (type === 'react'
    ? path.join(args.appDir, 'react', 'tests', 'App.test.js')
    : path.join(args.appDir, 'puppeteer', 'test.js')));
  if (!fs.existsSync(testFile)) throw new Error(`test file not found: ${testFile}`);

  const result = type === 'react' ? await runReact(args.appDir, testFile) : await runPuppeteer(args.appDir, testFile);
  result.node = process.version;
  result.passed = result.tests.filter((t) => t.status === 'passed').length;
  result.failed = result.tests.length - result.passed;

  if (args.json) {
    process.stdout.write(JSON.stringify(result));
  } else {
    for (const t of result.tests) {
      console.log(`${t.status === 'passed' ? 'PASS' : 'FAIL'}  ${t.group ? t.group + ' > ' : ''}${t.name}`);
      if (t.status !== 'passed' && t.message) console.log('      ' + t.message.split('\n').slice(0, 6).join('\n      '));
    }
    console.log(`\n${result.passed}/${result.tests.length} passed (${type}, node ${result.node})`);
  }
  process.exitCode = result.failed ? 1 : 0;
}

if (!process.version.startsWith('v14.')) {
  console.error(`[runner] warning: running on ${process.version}, the exam uses Node 14 (runtime/node14)`);
}
main().catch((e) => { console.error(e.stack || String(e)); process.exitCode = 2; });
