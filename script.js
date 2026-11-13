(() => {
  'use strict';

  const root = document.documentElement;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const motionButton = document.querySelector('.motion-toggle');
  let motionPaused = reducedMotion.matches;
  let savedPreference = null;
  try { savedPreference = localStorage.getItem('kj-motion'); } catch { /* Storage is optional. */ }
  if (savedPreference === 'paused') motionPaused = true;

  const reveals = [...document.querySelectorAll('.reveal')];
  const revealObserver = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    }
  }, {threshold: 0.08}) : null;
  // Only hide content once the observer is ready; the document remains usable without JS.
  if (revealObserver) {
    root.classList.add('js-motion');
    reveals.forEach(element => revealObserver.observe(element));
  }

  function applyMotionPreference() {
    root.classList.toggle('motion-paused', motionPaused);
    motionButton.setAttribute('aria-pressed', String(motionPaused));
    motionButton.innerHTML = motionPaused ? 'Resume motion <span aria-hidden="true">▷</span>' : 'Pause motion <span aria-hidden="true">Ⅱ</span>';
    if (motionPaused) reveals.forEach(element => element.classList.add('is-visible'));
    requestDraw();
  }
  motionButton.addEventListener('click', () => {
    motionPaused = !motionPaused;
    try { localStorage.setItem('kj-motion', motionPaused ? 'paused' : 'playing'); } catch { /* No storage required. */ }
    applyMotionPreference();
  });
  reducedMotion.addEventListener('change', event => {
    motionPaused = event.matches;
    applyMotionPreference();
  });

  const scenes = [...document.querySelectorAll('[data-panel]')];
  const sceneButtons = [...document.querySelectorAll('[data-demo]')];
  const steps = [...document.querySelectorAll('[data-scene]')];
  const demo = document.querySelector('.demo-shell');
  let activeScene = 0;
  let manualSceneUntil = 0;
  function setScene(index) {
    activeScene = index;
    demo.dataset.demoScene = String(index);
    scenes.forEach((panel, panelIndex) => { panel.hidden = panelIndex !== index; });
    sceneButtons.forEach((button, buttonIndex) => button.setAttribute('aria-pressed', String(buttonIndex === index)));
    steps.forEach((step, stepIndex) => step.classList.toggle('active', stepIndex === index));
  }
  sceneButtons.forEach(button => button.addEventListener('click', () => {
    manualSceneUntil = performance.now() + 8000;
    setScene(Number(button.dataset.demo));
  }));
  setScene(0);

  const progress = document.querySelector('.reading-progress');
  const navLinks = [...document.querySelectorAll('.site-header nav a')];
  const navSections = navLinks.map(link => document.querySelector(link.getAttribute('href')));
  let scrollQueued = false;
  function updateScroll() {
    scrollQueued = false;
    const maxScroll = root.scrollHeight - window.innerHeight;
    const scrollRatio = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    progress.style.transform = `scaleX(${Math.min(1, Math.max(0, scrollRatio))})`;

    let current = -1;
    navSections.forEach((section, index) => { if (section.getBoundingClientRect().top < window.innerHeight * 0.45) current = index; });
    navLinks.forEach((link, index) => {
      if (index === current) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });

    if (!motionPaused && window.innerWidth > 580 && performance.now() > manualSceneUntil) {
      let nearest = activeScene;
      let closest = Infinity;
      steps.forEach((step, index) => {
        const rect = step.getBoundingClientRect();
        const distance = Math.abs(rect.top + rect.height / 2 - window.innerHeight / 2);
        if (distance < closest) { nearest = index; closest = distance; }
      });
      if (nearest !== activeScene) setScene(nearest);
    }
    requestDraw();
  }
  window.addEventListener('scroll', () => {
    if (!scrollQueued) { scrollQueued = true; requestAnimationFrame(updateScroll); }
  }, {passive: true});

  // Native dialogs provide keyboard trapping, Escape-to-close, and focus restoration.
  document.querySelectorAll('[data-open]').forEach(link => {
    const dialog = document.getElementById(link.dataset.open);
    if (!dialog || !dialog.showModal) return;
    link.addEventListener('click', event => {
      event.preventDefault();
      dialog.showModal();
      document.body.classList.add('modal-open');
    });
  });
  document.querySelectorAll('dialog').forEach(dialog => {
    dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
      const rect = dialog.getBoundingClientRect();
      if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
    });
    dialog.addEventListener('close', () => document.body.classList.remove('modal-open'));
  });

  const copyButton = document.querySelector('.copy-email');
  const copyStatus = document.getElementById('copy-status');
  let copyTimer;
  copyButton.addEventListener('click', async () => {
    clearTimeout(copyTimer);
    try {
      await navigator.clipboard.writeText('kristianjanci.main@gmail.com');
      copyStatus.textContent = 'Copied.';
    } catch {
      copyStatus.textContent = 'Please select and copy the address above.';
    }
    copyTimer = setTimeout(() => { copyStatus.textContent = ''; }, 5000);
  });
  document.querySelector('[data-year]').textContent = String(new Date().getFullYear());

  // A mathematical point sculpture, drawn locally; no image, model, or tracking service.
  const canvas = document.getElementById('signal-field');
  const context = canvas.getContext('2d');
  const art = document.querySelector('.hero-art');
  let width = 0;
  let height = 0;
  let angle = 0;
  let lastTime = 0;
  let frame = 0;
  let heroVisible = true;
  let pointerX = 0;
  let pointerY = 0;
  const points = [];
  for (let ring = 0; ring < 104; ring++) {
    const u = ring / 104 * Math.PI * 2;
    for (let band = 0; band < 34; band++) {
      const v = band / 34 * Math.PI * 2;
      const radius = 1.6 + 0.14 * Math.cos(u * 3);
      const tube = 0.56 + 0.09 * Math.sin(u * 2);
      points.push({x:(radius + tube * Math.cos(v)) * Math.cos(u), y:(radius + tube * Math.cos(v)) * Math.sin(u), z:tube * Math.sin(v), u, v});
    }
  }

  function resizeArt() {
    if (!context) return;
    const rect = art.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    requestDraw();
  }

  function draw(time) {
    frame = 0;
    if (!context || !width || !height) return;
    if (!motionPaused && heroVisible && !document.hidden) {
      const delta = lastTime ? Math.min(time - lastTime, 50) : 0;
      angle += delta * 0.000065;
    }
    lastTime = time;
    context.clearRect(0, 0, width, height);
    const scroll = motionPaused ? 0 : Math.min(window.scrollY / 800, 1);
    const rotation = motionPaused ? 0.3 : angle + 0.3 + scroll * 0.5;
    const tilt = -0.65 + (motionPaused ? 0 : pointerY * 0.12);
    const turn = rotation + (motionPaused ? 0 : pointerX * 0.12);
    const scale = Math.min(width / 5.4, height / 4.8);
    const projected = points.map(point => {
      const x = point.x * Math.cos(turn) + point.z * Math.sin(turn);
      const z = -point.x * Math.sin(turn) + point.z * Math.cos(turn);
      const y = point.y * Math.cos(tilt) - z * Math.sin(tilt);
      const depth = point.y * Math.sin(tilt) + z * Math.cos(tilt);
      const roll = -0.62;
      const persp = 5.5 / (5.5 + depth * 0.35);
      return {x:width * 0.5 + (x * Math.cos(roll) - y * Math.sin(roll)) * scale * persp, y:height * 0.49 + (x * Math.sin(roll) + y * Math.cos(roll)) * scale * persp, z:depth, phase:point.u};
    }).sort((a,b) => b.z - a.z);
    for (const point of projected) {
      const alpha = Math.min(0.9, Math.max(0.16, (2.8 - point.z) / 5));
      context.fillStyle = `rgba(39,91,72,${alpha})`;
      const radius = Math.max(0.5, Math.min(1.35, width / 540)) * (1.1 - point.z * 0.09);
      context.beginPath();
      context.arc(point.x, point.y, radius, 0, Math.PI * 2);
      context.fill();
    }
    if (!motionPaused && heroVisible && !document.hidden) frame = requestAnimationFrame(draw);
  }
  function requestDraw() {
    if (context && !frame) frame = requestAnimationFrame(draw);
  }
  art.addEventListener('pointermove', event => {
    const rect = art.getBoundingClientRect();
    pointerX = (event.clientX - rect.left) / rect.width - 0.5;
    pointerY = (event.clientY - rect.top) / rect.height - 0.5;
  }, {passive: true});
  art.addEventListener('pointerleave', () => { pointerX = 0; pointerY = 0; });
  if (context) {
    art.classList.add('canvas-ready');
    if ('ResizeObserver' in window) new ResizeObserver(resizeArt).observe(art);
    else window.addEventListener('resize', resizeArt);
    if ('IntersectionObserver' in window) new IntersectionObserver(entries => {
      heroVisible = entries[0].isIntersecting;
      lastTime = 0;
      if (heroVisible) requestDraw();
    }, {rootMargin: '100px'}).observe(art);
    document.addEventListener('visibilitychange', () => { lastTime = 0; if (!document.hidden) requestDraw(); });
    resizeArt();
  }
  window.addEventListener('resize', updateScroll);
  applyMotionPreference();
  updateScroll();
})();
