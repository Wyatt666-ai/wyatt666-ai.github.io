(() => {
  const root = document.documentElement;
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const storageKey = 'personal-site:workspace-boot-seen';
  let seen = false;

  try {
    seen = sessionStorage.getItem(storageKey) === '1';
  } catch {
    // A file preview can run with browser storage disabled.
  }

  const autoplay = !seen && !motion.matches && ['', '#workspace'].includes(location.hash);
  if (autoplay) root.classList.add('boot-pending');

  document.addEventListener('DOMContentLoaded', () => {
    const dialog = document.querySelector('#site-intro');
    const replay = document.querySelector('.boot-replay');

    try {
      if (typeof dialog?.showModal !== 'function' || !replay) return;

      const sheet = dialog.querySelector('.boot-sheet');
      const phase = dialog.querySelector('.boot-phase');
      const detail = dialog.querySelector('.boot-detail');
      const count = dialog.querySelector('.boot-count');
      const recordCount = document.querySelectorAll('.record[data-kind]').length;
      const phases = [
        ['载入工作台', '初始化界面'],
        ['建立站内索引', '已载入 ' + recordCount + ' 条站内内容'],
        ['站点校验完成', '导航与站内指令已就绪'],
        ['欢迎进入一页', '个人工作台已就绪'],
      ];
      const timers = [];

      function showPhase(index) {
        const [title, description] = phases[index];
        sheet.dataset.step = String(index + 1);
        phase.textContent = title;
        detail.textContent = description;
        count.textContent = '0' + (index + 1) + ' / 04';
      }

      function close() {
        for (const timer of timers.splice(0)) window.clearTimeout(timer);
        if (dialog.open) dialog.close();
        dialog.classList.remove('boot-leaving');
        root.classList.remove('boot-open');
      }

      function play() {
        if (motion.matches || dialog.open) return;
        showPhase(0);
        dialog.showModal();
        root.classList.add('boot-open');

        try {
          sessionStorage.setItem(storageKey, '1');
        } catch {
          // Dismiss and replay work even without storage.
        }

        [1350, 2070, 2680].forEach((delay, index) => {
          timers.push(window.setTimeout(() => showPhase(index + 1), delay));
        });
        timers.push(window.setTimeout(() => dialog.classList.add('boot-leaving'), 3460));
        timers.push(window.setTimeout(close, 3840));
      }

      function syncMotion() {
        replay.hidden = motion.matches;
        if (motion.matches) close();
      }

      dialog.querySelector('.boot-skip').addEventListener('click', close);
      dialog.addEventListener('cancel', (event) => {
        event.preventDefault();
        close();
      });
      replay.addEventListener('click', play);
      window.addEventListener('pagehide', close);
      motion.addEventListener('change', syncMotion);
      syncMotion();
      if (autoplay) play();
    } finally {
      root.classList.remove('boot-pending');
    }
  }, { once: true });
})();
