/* Practice IDE front end. Talks to ide/server.js. */
(function () {
  'use strict';

  const $ = (id) => document.getElementById(id);
  const el = (tag, attrs = {}, ...kids) => {
    const n = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === 'class') n.className = v;
      else if (k.startsWith('on')) n.addEventListener(k.slice(2), v);
      else if (v !== undefined && v !== null && v !== false) n.setAttribute(k, v === true ? '' : v);
    }
    for (const k of kids.flat()) if (k != null) n.append(k.nodeType ? k : document.createTextNode(String(k)));
    return n;
  };

  const store = {
    get(k, d) { try { const v = localStorage.getItem('pide.' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem('pide.' + k, JSON.stringify(v)); } catch (e) { /* storage blocked */ } },
  };

  const state = {
    tasks: [],
    week: null,
    name: null,
    data: null,          // /api/task/:name payload for the open task
    buffers: {},         // name -> { rel -> { model, saved } }   (kept across task switches)
    activeFile: {},      // name -> rel
    compare: null,       // 'solution' | 'minimal' | 'original' | 'starter' | null
    autosave: store.get('autosave', false),
    reveal: {},          // name -> { notes: bool, report: bool }
    running: false,
  };

  let monaco, editor, diffEditor, testEditor, previewPoll;

  // ---------- api ----------
  async function api(url, body) {
    // no-store: never reuse a task reply cached from an older server
    const res = await fetch(url, body === undefined ? { cache: 'no-store' } : {
      method: 'POST', cache: 'no-store', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
    });
    const j = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(j.error || res.statusText);
    return j;
  }

  function toast(msg) {
    const t = $('toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toast.t);
    toast.t = setTimeout(() => t.classList.remove('show'), 1800);
  }

  // ---------- theme ----------
  function isDark() {
    const forced = document.documentElement.getAttribute('data-theme');
    if (forced) return forced === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  function applyTheme() {
    const t = store.get('theme', null);
    if (t) document.documentElement.setAttribute('data-theme', t);
    else document.documentElement.removeAttribute('data-theme');
    if (monaco) monaco.editor.setTheme(isDark() ? 'vs-dark' : 'vs');
  }
  $('themeBtn').onclick = () => {
    store.set('theme', isDark() ? 'light' : 'dark');
    applyTheme();
  };
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyTheme);
  applyTheme();

  // ---------- helpers ----------
  const langOf = (rel) => (/\.html?$/.test(rel) ? 'html' : /\.css$/.test(rel) ? 'css' : /\.json$/.test(rel) ? 'json'
    : /\.md$/.test(rel) ? 'markdown' : 'javascript');
  const short = (rel) => rel.replace(/^reactapp\/src\//, 'src/').replace(/^public\//, '');
  const buf = (name) => (state.buffers[name] = state.buffers[name] || {});
  const isDirty = (b) => b.saved === null || b.model.getValue() !== b.saved;
  const taskDirty = (name) => Object.values(state.buffers[name] || {}).some(isDirty);
  const kindLabel = (t, all) => {
    const same = all.filter((x) => x.week === t.week && x.kind === t.kind).length;
    return t.kind.toUpperCase() + (same > 1 ? ' ' + t.number : '');
  };

  // ---------- weeks + tasks ----------
  function renderWeeks() {
    const nums = [...new Set(state.tasks.map((t) => +t.week.slice(1)))];
    const max = Math.max(...nums, 0);
    const box = $('weeks');
    box.replaceChildren();
    for (let i = 1; i <= max; i++) {
      const w = 'w' + i;
      const tasks = state.tasks.filter((t) => t.week === w);
      const done = tasks.length && tasks.every((t) => t.last && t.last.passed === t.last.total && t.last.total > 0);
      const b = el('button', {
        class: w === state.week ? 'active' : '',
        disabled: !tasks.length,
        title: tasks.length ? `${w}: ${tasks.length} tasks` : `${w}: no dump available`,
        onclick: () => selectWeek(w),
      }, w.toUpperCase(), done ? el('span', { class: 'dot', title: 'all tasks passing' }) : null);
      box.append(b);
    }
  }

  function renderTasks() {
    const box = $('tasks');
    box.replaceChildren();
    const list = state.tasks.filter((t) => t.week === state.week);
    for (const t of list) {
      let chip = null;
      if (t.last) chip = el('span', { class: 'chip ' + (t.last.passed === t.last.total ? 'pass' : 'fail') }, `${t.last.passed}/${t.last.total}`);
      else if (t.hasAnswer) chip = el('span', { class: 'chip' }, 'saved');
      box.append(el('button', {
        class: t.name === state.name ? 'active' : '',
        title: t.title,
        onclick: () => openTask(t.name),
      }, el('span', { class: 'kind' }, kindLabel(t, state.tasks)), chip, taskDirty(t.name) ? el('span', { class: 'dirty-dot' }, '●') : null));
    }
  }

  function renderTaskInfo() {
    const m = state.data && state.data.meta;
    const box = $('taskInfo');
    box.replaceChildren();
    if (!m) return;
    box.append(...[
      el('strong', {}, m.title),
      el('span', { class: 'tag' }, m.type === 'react' ? 'React · Jest' : 'HTML/JS · Puppeteer'),
      m.starterKind ? el('span', { class: 'tag' }, m.starterKind + ' starter') : null,
      m.title !== m.name ? el('span', {}, m.name) : null,
    ].filter(Boolean));
  }

  function selectWeek(w) {
    state.week = w;
    store.set('week', w);
    renderWeeks();
    const list = state.tasks.filter((t) => t.week === w);
    const remembered = store.get('task.' + w, null);
    const pick = list.find((t) => t.name === remembered) || list[0];
    if (pick) openTask(pick.name);
    else renderTasks();
  }

  async function refreshTasks() {
    state.tasks = await api('/api/tasks');
    renderWeeks();
    renderTasks();
  }

  // ---------- open a task ----------
  async function openTask(name) {
    const data = await api('/api/task/' + encodeURIComponent(name));
    state.name = name;
    state.data = data;
    state.week = data.meta.week;
    store.set('week', state.week);
    store.set('task.' + state.week, name);

    const b = buf(name);
    for (const [rel, f] of Object.entries(data.files)) {
      if (b[rel]) continue;
      if (f.solutionOnly && f.answer == null) continue; // offered via "Load solution", not opened by default
      const content = f.answer != null ? f.answer : (f.starter != null ? f.starter : '');
      b[rel] = { model: makeModel(name, rel, content), saved: content };
    }
    setJsDiagnostics(data.meta.type);
    const files = Object.keys(b);
    if (!state.activeFile[name] || !b[state.activeFile[name]]) state.activeFile[name] = files[0];

    renderWeeks();
    renderTasks();
    renderTaskInfo();
    renderFileTabs();
    showFile(state.activeFile[name]);
    renderSide();
    renderResults(data.last, 'Last run');
    renderOutput(data.last);
    renderPreview();
  }

  function makeModel(name, rel, content) {
    const uri = monaco.Uri.parse(`file:///${name}/${rel}`);
    const existing = monaco.editor.getModel(uri);
    if (existing) existing.dispose();
    const model = monaco.editor.createModel(content, langOf(rel), uri);
    model.onDidChangeContent(() => { renderFileTabs(); renderTasksDebounced(); scheduleAutosave(name); });
    return model;
  }

  // ---------- autosave ----------
  // When on, typing saves the task 1s after the last keystroke. Load ▾ sets `loading` so loading the
  // solution/original/starter never overwrites the saved answer on its own.
  let autosaveT = null;
  let loading = false;
  function scheduleAutosave(name) {
    if (!state.autosave || loading) return;
    clearTimeout(autosaveT);
    autosaveT = setTimeout(() => save(true, name).catch((e) => toast('Autosave failed: ' + e.message)), 1000);
  }
  function renderAutosave() {
    const btn = $('autosaveBtn');
    btn.setAttribute('aria-pressed', String(state.autosave));
    btn.textContent = `Autosave: ${state.autosave ? 'on' : 'off'}`;
  }

  let rtT;
  function renderTasksDebounced() { clearTimeout(rtT); rtT = setTimeout(renderTasks, 250); }

  function setJsDiagnostics(type) {
    const ts = monaco.languages.typescript;
    ts.javascriptDefaults.setDiagnosticsOptions({ noSemanticValidation: true, noSyntaxValidation: false });
    ts.javascriptDefaults.setCompilerOptions({
      target: ts.ScriptTarget.ESNext, allowJs: true, allowNonTsExtensions: true, jsx: ts.JsxEmit.React,
      module: ts.ModuleKind.ESNext, moduleResolution: ts.ModuleResolutionKind.NodeJs,
      lib: type === 'react' ? ['esnext', 'dom'] : ['es2020', 'dom'],
    });
  }

  // ---------- file tabs + editor ----------
  function renderFileTabs() {
    const box = $('fileTabs');
    box.replaceChildren();
    const name = state.name;
    if (!name) return;
    const b = buf(name);
    const editable = new Set(state.data.meta.editable);
    for (const rel of Object.keys(b)) {
      const f = state.data.files[rel] || {};
      const removable = !editable.has(rel) && f.starter == null;
      box.append(el('button', {
        class: (rel === state.activeFile[name] ? 'active ' : '') + (isDirty(b[rel]) ? 'unsaved' : ''),
        title: rel,
        onclick: () => showFile(rel),
      }, short(rel), removable ? el('span', {
        class: 'x', title: 'Delete this file',
        onclick: (e) => { e.stopPropagation(); deleteFile(rel); },
      }, '×') : null));
    }
  }

  function showFile(rel) {
    const name = state.name;
    if (!rel || !buf(name)[rel]) return;
    state.activeFile[name] = rel;
    renderFileTabs();
    if (state.compare) return openCompare(state.compare);
    editor.setModel(buf(name)[rel].model);
    editor.focus();
  }

  async function deleteFile(rel) {
    if (!confirm(`Delete ${rel} from your answer?`)) return;
    await api(`/api/task/${state.name}/delete-file`, { path: rel });
    const b = buf(state.name);
    b[rel].model.dispose();
    delete b[rel];
    state.activeFile[state.name] = Object.keys(b)[0];
    showFile(state.activeFile[state.name]);
    reloadPreview();
  }

  $('newFileBtn').onclick = () => {
    if (!state.data) return;
    const react = state.data.meta.type === 'react';
    const hint = react ? 'reactapp/src/components/MyComponent.jsx' : 'public/script.js';
    const rel = (prompt(`New file path (inside ${react ? 'reactapp/src/' : 'public/'})`, hint) || '').trim();
    if (!rel) return;
    if (!(react ? /^reactapp\/src\//.test(rel) : /^public\//.test(rel)) || rel.includes('..')) return toast('Path must be inside ' + (react ? 'reactapp/src/' : 'public/'));
    const b = buf(state.name);
    if (b[rel]) return showFile(rel);
    b[rel] = { model: makeModel(state.name, rel, ''), saved: null };
    showFile(rel);
  };

  // ---------- save / run ----------
  function dirtyFiles(name) {
    const out = {};
    for (const [rel, b] of Object.entries(buf(name))) if (isDirty(b)) out[rel] = b.model.getValue();
    return out;
  }
  function markSaved(name, files) {
    for (const rel of Object.keys(files)) buf(name)[rel].saved = files[rel];
  }

  async function save(quiet, name = state.name) {
    if (!name || !state.buffers[name]) return;
    const files = dirtyFiles(name);
    if (!Object.keys(files).length) { if (!quiet) toast('Nothing to save'); return; }
    await api(`/api/task/${name}/save`, { files });
    markSaved(name, files);
    const t = state.tasks.find((x) => x.name === name);
    if (t) t.hasAnswer = true;
    renderFileTabs();
    renderTasks();
    reloadPreview();
    if (!quiet) toast('Saved');
  }

  // While a test runs: spinner, elapsed time and a Stop button (the toolbar Run button turns into Stop too).
  let runTimer = null;
  function showRunning(text) {
    const secs = el('span', { class: 'meta' }, '0s');
    const started = Date.now();
    clearInterval(runTimer);
    runTimer = setInterval(() => { secs.textContent = `${Math.round((Date.now() - started) / 1000)}s · stops by itself after 120s`; }, 1000);
    $('pane-results').replaceChildren(el('div', { class: 'running' }, el('span', { class: 'spinner' }), text, secs,
      el('button', { class: 'danger', onclick: stopRun }, 'Stop')));
    $('runBtn').textContent = 'Stop';
    $('runBtn').classList.replace('primary', 'danger');
    $('runBtn').title = 'Stop the running test';
  }
  function doneRunning() {
    clearInterval(runTimer);
    state.running = null;
    $('runBtn').textContent = 'Run tests';
    $('runBtn').classList.replace('danger', 'primary');
    $('runBtn').title = 'Save and run test cases (Ctrl+Enter)';
  }
  async function stopRun() {
    if (!state.running) return;
    $('pane-results').querySelectorAll('.running button').forEach((b) => { b.disabled = true; b.textContent = 'Stopping…'; });
    try { await api(`/api/task/${state.running}/stop`, {}); } catch (e) { toast('Stop failed: ' + e.message); }
  }

  async function run() {
    if (!state.name || state.running) return;
    const name = state.name;
    state.running = name;
    showBottom('results');
    showRunning(state.data.meta.type === 'react' ? 'Running Jest (React Testing Library)…' : 'Starting the page and running Puppeteer…');
    try {
      const files = dirtyFiles(name);
      const result = await api(`/api/task/${name}/run`, { files });
      markSaved(name, files);
      reloadPreview();
      if (result.stopped) {
        if (state.name === name) { renderResults(result, 'Stopped'); renderOutput(result); renderFileTabs(); }
        return toast('Test stopped');
      }
      if (state.name === name) {
        state.data.last = result;
        renderResults(result, 'Your code');
        renderOutput(result);
        renderFileTabs();
      }
      const t = state.tasks.find((x) => x.name === name);
      if (t) { t.last = { passed: result.passed, total: result.tests.length, at: result.at }; t.hasAnswer = true; }
      renderTasks();
      renderWeeks();
      toast(`${result.passed}/${result.tests.length} test cases passed`);
    } catch (e) {
      $('pane-results').replaceChildren(el('div', { class: 'empty' }, 'Run failed: ' + e.message));
    } finally {
      doneRunning();
    }
  }

  async function runSolution() {
    if (!state.name || state.running) return;
    const name = state.name;
    state.running = name;
    showRunning('Running the stored passing solution…');
    try {
      const r = await api(`/api/task/${name}/run-solution`, {});
      if (state.name === name) { renderResults(r, r.stopped ? 'Stopped' : 'Passing solution'); renderOutput(r); }
    } catch (e) {
      $('pane-results').replaceChildren(el('div', { class: 'empty' }, e.message));
    } finally {
      doneRunning();
    }
  }

  $('saveBtn').onclick = () => save(false);
  $('autosaveBtn').onclick = () => {
    state.autosave = !state.autosave;
    store.set('autosave', state.autosave);
    renderAutosave();
    toast(state.autosave ? 'Autosave on: saves 1s after you stop typing' : 'Autosave off');
  };
  renderAutosave();
  $('runBtn').onclick = () => (state.running ? stopRun() : run());

  // ---------- load menu ----------
  function setMenu(btn, list) {
    btn.onclick = (e) => {
      e.stopPropagation();
      const open = list.classList.contains('open');
      document.querySelectorAll('.menu-list.open').forEach((m) => m.classList.remove('open'));
      if (!open) list.classList.add('open');
    };
  }
  setMenu($('loadBtn'), $('loadMenu'));
  setMenu($('compareBtn'), $('compareMenu'));
  document.addEventListener('click', () => document.querySelectorAll('.menu-list.open').forEach((m) => m.classList.remove('open')));

  function replaceContent(model, text) {
    if (model.getValue() === text) return;
    model.pushEditOperations([], [{ range: model.getFullModelRange(), text }], () => null);
  }

  $('loadMenu').addEventListener('click', async (e) => {
    const which = e.target.dataset && e.target.dataset.load;
    if (!which || !state.data) return;
    const name = state.name;
    const b = buf(name);
    if (which === 'reset') {
      if (!confirm('Delete your saved answer for this task and go back to the starter?')) return;
      await api(`/api/task/${name}/reset`, {});
      for (const rel of Object.keys(b)) b[rel].model.dispose();
      delete state.buffers[name];
      state.activeFile[name] = null;
      const t = state.tasks.find((x) => x.name === name);
      if (t) { t.hasAnswer = false; t.last = null; }
      await openTask(name);
      return toast('Reset to starter');
    }
    if (which === 'solution' && !state.data.hasSolution) return toast('No passing solution stored for this task yet');
    if (which === 'minimal' && !state.data.hasMinimal) return toast('No minimal version stored for this task yet');
    let n = 0;
    loading = true;
    try {
      for (const [rel, f] of Object.entries(state.data.files)) {
        const text = f[which];
        if (text == null) continue;
        if (!b[rel]) b[rel] = { model: makeModel(name, rel, ''), saved: null };
        replaceContent(b[rel].model, text);
        n++;
      }
    } finally {
      loading = false;
    }
    renderFileTabs();
    renderTasks();
    toast(`Loaded ${which === 'minimal' ? 'minimal version' : which} into ${n} file${n === 1 ? '' : 's'} (not saved yet; Ctrl+Z undoes)`);
  });

  // ---------- compare ----------
  $('compareMenu').addEventListener('click', (e) => {
    const which = e.target.dataset && e.target.dataset.compare;
    if (!which) return;
    if (which === 'off') closeCompare();
    else openCompare(which);
  });

  function openCompare(which) {
    const name = state.name;
    const rel = state.activeFile[name];
    const f = state.data.files[rel] || {};
    const other = f[which];
    state.compare = which;
    $('editor').style.display = 'none';
    let host = $('diffHost');
    if (!host) {
      host = el('div', { id: 'diffHost', class: 'editor' });
      $('editor').after(host);
    }
    host.style.display = '';
    if (!diffEditor) {
      diffEditor = monaco.editor.createDiffEditor(host, {
        automaticLayout: true, renderSideBySide: host.clientWidth > 700, originalEditable: false,
        fontSize: 13.5, minimap: { enabled: false }, scrollBeyondLastLine: false,
      });
      addKeys(diffEditor.getModifiedEditor());
    }
    const prev = diffEditor.getModel();
    const original = monaco.editor.createModel(other == null ? '' : other, langOf(rel));
    diffEditor.setModel({ original, modified: buf(name)[rel].model });
    if (prev && prev.original) prev.original.dispose();
    const label = { solution: 'passing solution', minimal: 'minimal (just passes)', original: 'original dump', starter: 'starter' }[which];
    const bar = $('compareBar');
    bar.hidden = false;
    bar.replaceChildren(
      el('span', {}, `Left: ${label} (${short(rel)})${other == null ? ', no such file there' : ''}. Right: your code (editable).`),
      el('button', { class: 'ghost', onclick: closeCompare }, 'Close compare'),
    );
  }

  function closeCompare() {
    state.compare = null;
    $('compareBar').hidden = true;
    const host = $('diffHost');
    if (host) host.style.display = 'none';
    $('editor').style.display = '';
    if (diffEditor) {
      const m = diffEditor.getModel();
      diffEditor.setModel(null);
      if (m && m.original) m.original.dispose();
    }
    showFile(state.activeFile[state.name]);
  }

  // ---------- side panel ----------
  function md(text) {
    const div = el('div');
    div.innerHTML = window.marked.parse(text);
    return div;
  }

  function renderSide() {
    const d = state.data;
    const name = state.name;
    const r = (state.reveal[name] = state.reveal[name] || {});

    $('pane-question').replaceChildren(d.question ? md(d.question) : el('div', { class: 'empty' },
      'No reconstructed question for this task yet. The Test file tab shows exactly what is checked.'));

    testEditor.setValue(d.testSource || '// test file not found');

    const gate = (key, text, what) => {
      if (!text) return el('div', { class: 'empty' }, `No ${what} for this task yet.`);
      if (r[key]) return md(text);
      return el('div', { class: 'spoiler' },
        el('p', {}, `The ${what} explains the solution. Try the task first?`),
        el('button', { onclick: () => { r[key] = true; renderSide(); } }, `Show ${what}`));
    };
    $('pane-notes').replaceChildren(gate('notes', d.note, 'study notes'));
    $('pane-report').replaceChildren(gate('report', d.results, 'test report'));
  }

  function setupTabs(boxId, prefix, onShow) {
    $(boxId).addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-tab]');
      if (!btn) return;
      for (const b of $(boxId).querySelectorAll('button')) b.classList.toggle('active', b === btn);
      for (const b of $(boxId).querySelectorAll('button')) $(prefix + b.dataset.tab).classList.toggle('active', b === btn);
      if (onShow) onShow(btn.dataset.tab);
    });
  }
  setupTabs('sideTabs', 'pane-', async (tab) => {
    if (tab === 'test') testEditor.layout();
    if (tab === 'cheatsheet' && !$('pane-cheatsheet').childElementCount) {
      const { text } = await api('/api/cheatsheet');
      $('pane-cheatsheet').replaceChildren(text ? md(text) : el('div', { class: 'empty' }, 'notes/cheatsheet.md not found.'));
    }
  });
  setupTabs('bottomTabs', 'pane-', (tab) => { if (tab === 'preview') renderPreview(); });
  function showBottom(tab) { $('bottomTabs').querySelector(`[data-tab="${tab}"]`).click(); }

  // ---------- results ----------
  function renderResults(r, label) {
    const pane = $('pane-results');
    const badge = $('resultBadge');
    const actions = el('div', { style: 'display:flex;gap:6px;margin-left:auto' },
      el('button', { onclick: run }, 'Run tests'),
      state.data && state.data.hasSolution ? el('button', { class: 'ghost', onclick: runSolution, title: 'Runs the stored passing version without touching your code' }, 'Check passing solution') : null);
    if (!r) {
      badge.textContent = '';
      badge.className = 'badge';
      pane.replaceChildren(el('div', { class: 'summary' }, el('span', { class: 'meta' },
        'Not run yet. Ctrl+Enter saves and runs the graded test cases.'), actions));
      return;
    }
    const total = r.tests.length;
    const ok = r.passed === total && total > 0;
    if (label !== 'Passing solution' && label !== 'Stopped') {
      badge.textContent = `${r.passed}/${total}`;
      badge.className = 'badge ' + (ok ? 'pass' : 'fail');
    }
    const when = r.at ? new Date(r.at).toLocaleString() : '';
    pane.replaceChildren(
      el('div', { class: 'summary' },
        el('span', { class: 'big ' + (ok ? 'pass' : 'fail') }, r.stopped ? `Stopped · ${r.passed}/${total} passed before stopping` : `${r.passed}/${total} passed`),
        el('span', { class: 'meta' }, [label, r.node ? 'node ' + r.node : '', when].filter(Boolean).join(' · ')),
        actions),
      ...r.tests.map((t) => {
        const det = el('details', { class: 'case ' + t.status },
          el('summary', {}, el('span', { class: 'mark' }, t.status === 'passed' ? '✓' : '✗'),
            t.group ? el('span', { class: 'group' }, t.group + ' ›') : null, t.name));
        if (t.message) det.append(el('pre', {}, t.message));
        else if (t.status !== 'passed') det.append(el('pre', {}, 'This case printed "failure". Open the Test file tab to see exactly what it checks.'));
        return det;
      }),
    );
  }

  function renderOutput(r) {
    $('outputPre').textContent = r && r.output ? r.output : 'No output yet.';
  }

  // ---------- preview ----------
  function renderPreview() {
    const pane = $('pane-preview');
    if (!state.data || !pane.classList.contains('active')) return;
    clearInterval(previewPoll);
    const name = state.name;
    if (state.data.meta.type !== 'react') {
      const src = `/preview/${name}/index.html`;
      const frame = pane.querySelector('iframe[data-task]');
      if (frame && frame.dataset.task === name) return;
      pane.replaceChildren(
        el('div', { class: 'preview-bar' },
          el('span', { class: 'grow' }, 'Your saved page (public/index.html). Save to refresh.'),
          el('button', { class: 'ghost', onclick: reloadPreview }, 'Reload'),
          el('button', { class: 'ghost', onclick: () => window.open(src, '_blank') }, 'Open in new tab')),
        el('iframe', { src: src + '?t=' + Date.now(), 'data-task': name, title: 'Page preview' }));
      return;
    }
    const bar = el('div', { class: 'preview-bar' });
    const frameBox = el('div', { style: 'flex:1;display:flex;min-height:0' });
    pane.replaceChildren(bar, frameBox);
    const update = async () => {
      let s;
      try { s = await api('/api/react-preview'); } catch (e) { return; }
      if (state.name !== name) return clearInterval(previewPoll);
      const mine = s.name === name;
      bar.replaceChildren(
        el('span', { class: 'grow' }, mine ? (s.ready ? `Live dev server on port ${s.port}. Saving hot-reloads it.` : 'Starting react-scripts dev server (first start takes ~15s)…')
          : 'React preview runs the real dev server (react-scripts start) with your saved files.'),
        mine ? el('button', { class: 'ghost', onclick: async () => { await api('/api/react-preview/stop', {}); poll(); } }, 'Stop')
          : el('button', { onclick: async () => { await save(true); await api(`/api/react-preview/${name}/start`, {}); poll(); } }, 'Start live preview'),
        mine && s.ready ? el('button', { class: 'ghost', onclick: () => window.open(`http://127.0.0.1:${s.port}`, '_blank') }, 'Open in new tab') : null);
      if (mine && s.ready) {
        if (!frameBox.querySelector('iframe')) frameBox.replaceChildren(el('iframe', { src: `http://127.0.0.1:${s.port}`, title: 'React preview', style: 'flex:1;border:none;background:#fff' }));
      } else if (mine) {
        frameBox.replaceChildren(el('pre', { style: 'margin:0;padding:10px;font-size:12px;overflow:auto;flex:1' }, s.log || ''));
      } else {
        frameBox.replaceChildren(el('div', { class: 'empty' }, 'Not running.'));
      }
      if (!mine || s.ready) clearInterval(previewPoll);
    };
    const poll = () => {
      clearInterval(previewPoll);
      update();
      previewPoll = setInterval(update, 1500);
    };
    poll();
  }

  function reloadPreview() {
    const frame = $('pane-preview').querySelector('iframe[data-task]');
    if (frame) frame.src = `/preview/${frame.dataset.task}/index.html?t=${Date.now()}`;
  }

  // ---------- resizers ----------
  function dragger(gutter, onMove) {
    gutter.addEventListener('mousedown', (e) => {
      e.preventDefault();
      gutter.classList.add('drag');
      document.querySelectorAll('iframe').forEach((f) => { f.style.pointerEvents = 'none'; });
      const move = (ev) => onMove(ev);
      const up = () => {
        gutter.classList.remove('drag');
        document.querySelectorAll('iframe').forEach((f) => { f.style.pointerEvents = ''; });
        window.removeEventListener('mousemove', move);
        window.removeEventListener('mouseup', up);
        store.set('sizes', { side: $('side').style.width, bottom: $('bottom').style.height });
      };
      window.addEventListener('mousemove', move);
      window.addEventListener('mouseup', up);
    });
  }
  dragger($('gutterV'), (e) => {
    const w = Math.min(Math.max(e.clientX, 240), window.innerWidth - 360);
    $('side').style.width = w + 'px';
  });
  dragger($('gutterH'), (e) => {
    const rect = $('layout').getBoundingClientRect();
    const h = Math.min(Math.max(rect.bottom - e.clientY, 90), rect.height - 150);
    $('bottom').style.height = h + 'px';
  });
  const sizes = store.get('sizes', null);
  if (sizes) { if (sizes.side) $('side').style.width = sizes.side; if (sizes.bottom) $('bottom').style.height = sizes.bottom; }

  // ---------- auto close tags ----------
  // Typing the '>' of <head> inserts </head> after the cursor (HTML, and JSX in .js files).
  const VOID_TAGS = new Set('area base br col embed hr img input link meta param source track wbr'.split(' '));
  const OPEN_TAG = /<([A-Za-z][\w:.-]*)(?:\s(?:[^<>"'{}]|"[^"]*"|'[^']*'|\{[^{}]*\})*)?>$/;
  function addAutoCloseTags(ed) {
    ed.onDidChangeModelContent((e) => {
      if (e.isUndoing || e.isRedoing || e.isFlush || e.changes.length !== 1 || e.changes[0].text !== '>') return;
      const model = ed.getModel();
      const lang = model && model.getLanguageId();
      if (lang !== 'html' && lang !== 'javascript') return;
      const r = e.changes[0].range;
      const pos = { lineNumber: r.startLineNumber, column: r.startColumn + 1 };
      const before = model.getValueInRange({ startLineNumber: Math.max(1, pos.lineNumber - 10), startColumn: 1, endLineNumber: pos.lineNumber, endColumn: pos.column });
      if (before.endsWith('/>')) return;
      let tag;
      if (lang === 'javascript' && before.endsWith('<>')) tag = '';
      else {
        const m = OPEN_TAG.exec(before);
        if (!m) return;
        tag = m[1];
        if (lang === 'html' && VOID_TAGS.has(tag.toLowerCase())) return;
        // In JS only treat it as JSX after ( = , return { ? : && || or line start, not a < b > c.
        if (lang === 'javascript' && !/(^|[\s(=,{?:&|>])$/.test(before.slice(0, m.index).replace(/return$/, ' '))) return;
      }
      const close = `</${tag}>`;
      const after = model.getLineContent(pos.lineNumber).slice(pos.column - 1);
      if (after.startsWith(close)) return;
      queueMicrotask(() => {
        if (ed.getModel() !== model) return;
        const at = new monaco.Range(pos.lineNumber, pos.column, pos.lineNumber, pos.column);
        ed.pushUndoStop();
        ed.executeEdits('auto-close-tag', [{ range: at, text: close }], [new monaco.Selection(pos.lineNumber, pos.column, pos.lineNumber, pos.column)]);
      });
    });
  }

  // ---------- keys ----------
  function addKeys(ed) {
    ed.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => save(false));
    ed.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, run);
  }
  window.addEventListener('keydown', (e) => {
    if (!(e.ctrlKey || e.metaKey)) return;
    if (e.key === 's') { e.preventDefault(); save(false); }
    if (e.key === 'Enter') { e.preventDefault(); run(); }
  });
  window.addEventListener('beforeunload', (e) => {
    if (Object.keys(state.buffers).some(taskDirty)) { e.preventDefault(); e.returnValue = ''; }
  });

  // ---------- boot ----------
  window.require.config({ paths: { vs: '/monaco/vs' } });
  window.require(['vs/editor/editor.main'], async () => {
    monaco = window.monaco;
    applyTheme();
    try {
      window.emmetMonaco.emmetHTML(monaco, ['html']);
      window.emmetMonaco.emmetCSS(monaco, ['css']);
      window.emmetMonaco.emmetJSX(monaco, ['javascript']);
    } catch (e) { console.warn('emmet unavailable', e); }

    const common = { automaticLayout: true, fontSize: 13.5, minimap: { enabled: false }, scrollBeyondLastLine: false, tabSize: 2, wordWrap: 'on' };
    editor = monaco.editor.create($('editor'), { ...common, model: null, formatOnPaste: false });
    addKeys(editor);
    addAutoCloseTags(editor);
    testEditor = monaco.editor.create($('pane-test'), { ...common, readOnly: true, language: 'javascript', lineNumbers: 'on' });

    try {
      await refreshTasks();
    } catch (e) {
      $('tasks').replaceChildren(el('span', { class: 'empty' }, 'Could not load tasks: ' + e.message));
      return;
    }
    if (!state.tasks.length) {
      $('tasks').replaceChildren(el('span', { class: 'empty' }, 'No tasks found in tests/. Run the pipeline first.'));
      return;
    }
    const w = store.get('week', null);
    selectWeek(state.tasks.some((t) => t.week === w) ? w : state.tasks[0].week);
  });
}());
