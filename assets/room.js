(() => {
  const stage = document.querySelector('.room-stage');
  const room = stage?.querySelector('.room-object');
  if (!room) return;

  const canTilt = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');

  function resetTilt() {
    room.style.removeProperty('--room-x');
    room.style.removeProperty('--room-y');
  }

  stage.addEventListener('pointermove', (event) => {
    if (!canTilt.matches || event.pointerType === 'touch') return;
    const bounds = stage.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    room.style.setProperty('--room-x', (-y * 5).toFixed(2) + 'deg');
    room.style.setProperty('--room-y', (x * 7).toFixed(2) + 'deg');
  });

  stage.addEventListener('pointerleave', resetTilt);
  stage.addEventListener('pointercancel', resetTilt);
  canTilt.addEventListener('change', resetTilt);
})();
