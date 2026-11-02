// Pestañas de roles (teclado: flechas, Inicio, Fin)
const tabs = [...document.querySelectorAll('[role="tab"]')];
function select(tab) {
  tabs.forEach(t => {
    const on = t === tab;
    t.setAttribute('aria-selected', on);
    t.tabIndex = on ? 0 : -1;
    document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
  });
}
tabs.forEach((t, i) => {
  t.addEventListener('click', () => select(t));
  t.addEventListener('keydown', e => {
    const k = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 }[e.key];
    if (k === undefined) return;
    e.preventDefault();
    const next = tabs[(k + tabs.length) % tabs.length];
    next.focus();
    select(next);
  });
});

// Los ojos de Caimanito siguen el cursor
const svg = document.getElementById('caiman');
const pupils = [document.getElementById('pupilL'), document.getElementById('pupilR')];
if (svg && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  addEventListener('pointermove', e => {
    const r = svg.getBoundingClientRect();
    const cx = r.left + r.width * 0.53, cy = r.top + r.height * 0.36;
    const dx = e.clientX - cx, dy = e.clientY - cy;
    const d = Math.hypot(dx, dy) || 1;
    const m = Math.min(9, d / 40);
    const x = (dx / d) * m, y = (dy / d) * m;
    pupils.forEach(p => (p.style.transform = `translate(${x}px, ${y}px)`));
  });
}
