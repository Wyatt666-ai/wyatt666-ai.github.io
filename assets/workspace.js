(() => {
  const root = document.documentElement;
  const workspace = document.querySelector('#workspace');
  const home = document.querySelector('#room') || workspace;
  const views = [...document.querySelectorAll('.view')];
  const links = [...document.querySelectorAll('.rail-nav a')];
  const viewName = document.querySelector('[data-view-name]');
  const form = document.querySelector('.command-form');
  const input = document.querySelector('#command');
  const shortcuts = document.querySelector('.command-shortcuts');
  const quickSearch = document.querySelector('.quick-search');
  const resultsPanel = document.querySelector('.results');
  const log = document.querySelector('.activity-log');
  const emptyLog = document.querySelector('.activity-empty');
  const content = document.querySelector('#main');
  const formatTime = new Intl.DateTimeFormat('zh-CN', { hour: '2-digit', minute: '2-digit', hour12: false });
  const icons = { 项目: 'nav-project', 笔记: 'nav-note', 资料: 'nav-about' };

  const records = [...document.querySelectorAll('.record[data-kind]')].map((record) => ({
    id: record.id,
    kind: record.dataset.kind,
    title: record.querySelector('.record-title').textContent.trim(),
    summary: record.querySelector('.record-summary').textContent.trim(),
    searchable: [record.dataset.kind, record.dataset.keywords, record.textContent.trim()]
      .join(' ').normalize('NFKC').toLowerCase(),
  }));

  function syncView(moveFocus = false) {
    const fragment = location.hash.slice(1);
    if (fragment === 'main' && root.classList.contains('workspace-ready')) return;

    const target = document.getElementById(fragment);
    const view = target?.closest('.view') || home;
    const record = target?.closest('.record');
    for (const candidate of views) candidate.hidden = candidate !== view;
    for (const link of links) {
      if (link.hash === '#' + view.id) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    }
    viewName.textContent = view.dataset.viewLabel;

    if (record) {
      const details = record.matches('details') ? record : record.querySelector('details');
      if (details) details.open = true;
      if (moveFocus && details) details.querySelector('summary').focus({ preventScroll: true });
      window.requestAnimationFrame(() => {
        if (location.hash.slice(1) === fragment) record.scrollIntoView({ block: 'nearest' });
      });
    } else if (moveFocus) {
      window.scrollTo(0, 0);
      content.focus({ preventScroll: true });
    }
  }

  function focusCommand() {
    if (workspace.hidden) {
      history.pushState(null, '', '#workspace');
      syncView();
    }
    input.focus();
  }

  function makeText(tag, value, className) {
    const element = document.createElement(tag);
    element.textContent = value;
    if (className) element.className = className;
    return element;
  }

  function recordLink(record) {
    const link = document.createElement('a');
    link.className = 'item-link';
    link.href = '#' + record.id;
    const icon = makeText('span', '', 'item-icon ' + icons[record.kind]);
    icon.setAttribute('aria-hidden', 'true');
    const text = document.createElement('span');
    text.append(makeText('strong', record.title), makeText('small', record.kind + ' · ' + record.summary));
    const action = makeText('span', '打开', 'item-action');
    action.setAttribute('aria-hidden', 'true');
    link.append(icon, text, action);
    return link;
  }

  function runCommand(raw) {
    const query = raw.trim();
    if (!query) return;

    const value = query.normalize('NFKC').toLowerCase().replace(/[!?。]+$/, '').trim();
    const typeCommand = value.match(/^(?:查看|浏览|列出|看看|有哪些)?\s*(项目|笔记|关于我|个人资料)(?:有哪些)?$/);
    const search = value.replace(/^(?:站内搜索|搜索|查找|查一下)\s*[:：]?\s*/, '');
    let matches = [];

    if (typeCommand) {
      const type = ['关于我', '个人资料'].includes(typeCommand[1]) ? '资料' : typeCommand[1];
      matches = records.filter(record => record.kind === type);
    } else if (search) {
      const words = search.split(/\s+/);
      matches = records.filter(record => words.every(word => record.searchable.includes(word)));
    }

    const outcome = matches.length ? '找到 ' + matches.length + ' 条内容' : '没有找到匹配的内容';
    const label = makeText('p', '指令 · ' + query, 'result-query');
    resultsPanel.replaceChildren(makeText('h2', outcome), label, ...matches.map(recordLink));
    if (!matches.length) {
      resultsPanel.append(makeText('p', '试试「搜索 GitHub」「查看项目」或「浏览笔记」。'));
    }
    resultsPanel.hidden = false;

    const entry = document.createElement('li');
    entry.append(makeText('strong', query), makeText('small', formatTime.format(new Date()) + ' · ' + outcome));
    log.prepend(entry);
    if (log.children.length > 4) log.lastElementChild.remove();
    emptyLog.hidden = true;
    log.hidden = false;
  }

  for (const count of document.querySelectorAll('[data-count]')) {
    count.textContent = records.filter(record => record.kind === count.dataset.count).length;
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    runCommand(input.value);
  });
  shortcuts.addEventListener('click', (event) => {
    const shortcut = event.target.closest('[data-command]');
    if (!shortcut) return;
    input.value = shortcut.dataset.command;
    runCommand(input.value);
  });
  quickSearch.addEventListener('click', focusCommand);
  window.addEventListener('hashchange', () => syncView(true));
  document.addEventListener('keydown', (event) => {
    if (event.defaultPrevented || !(event.ctrlKey || event.metaKey) || event.key.toLowerCase() !== 'k') return;
    if (document.querySelector('#site-intro').open) return;
    event.preventDefault();
    focusCommand();
  });

  form.hidden = false;
  shortcuts.hidden = false;
  quickSearch.hidden = false;
  syncView();
  root.classList.add('workspace-ready');
})();
