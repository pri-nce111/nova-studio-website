document.addEventListener('DOMContentLoaded', () => {
  // ---- Theme toggle (remembered) ----
  const root = document.documentElement;
  const themeBtn = document.getElementById('themeBtn');
  let saved = null;
  try { saved = localStorage.getItem('theme'); } catch (e) {}
  if (!saved) saved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  root.setAttribute('data-theme', saved);
  const setIcon = () => { if (themeBtn) themeBtn.textContent = root.getAttribute('data-theme') === 'dark' ? '☀️' : '🌙'; };
  setIcon();
  if (themeBtn) themeBtn.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
    setIcon();
  });

  // ---- Mobile menu ----
  const burger = document.getElementById('burger');
  const menu = document.getElementById('menu');
  if (burger) burger.addEventListener('click', () => menu.classList.toggle('open'));

  // ---- Active nav link ----
  const here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a.link').forEach(a => {
    if (a.getAttribute('href') === here) a.classList.add('active');
  });

  // ---- Scroll reveal ----
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: .12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // ---- Back to top ----
  const toTop = document.getElementById('toTop');
  if (toTop) {
    window.addEventListener('scroll', () => toTop.classList.toggle('show', window.scrollY > 500));
    toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // ---- Animated counters ----
  const counters = document.querySelectorAll('[data-count]');
  const cio = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target, target = +el.dataset.count, suffix = el.dataset.suffix || '';
      let n = 0; const step = Math.max(1, Math.ceil(target / 60));
      const t = setInterval(() => {
        n += step;
        if (n >= target) { n = target; clearInterval(t); }
        el.textContent = n + suffix;
      }, 25);
      cio.unobserve(el);
    });
  }, { threshold: .5 });
  counters.forEach(c => cio.observe(c));

  // ---- Portfolio filter ----
  const filters = document.querySelectorAll('.filter');
  filters.forEach(btn => btn.addEventListener('click', () => {
    filters.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.filter;
    document.querySelectorAll('.work').forEach(w => {
      w.classList.toggle('hide', cat !== 'all' && w.dataset.cat !== cat);
    });
  }));

  // ---- FAQ accordion ----
  document.querySelectorAll('.faq-q').forEach(q => q.addEventListener('click', () => {
    const item = q.parentElement;
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  }));

  // ---- Contact form validation ----
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', ev => {
      ev.preventDefault();
      let valid = true;
      const setErr = (id, msg) => { document.getElementById(id + 'Err').textContent = msg; if (msg) valid = false; };
      const name = form.elements['name'].value.trim(), email = form.elements['email'].value.trim(), msg = form.elements['message'].value.trim();
      setErr('name', name.length < 2 ? 'Please enter your name.' : '');
      setErr('email', /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? '' : 'Enter a valid email address.');
      setErr('message', msg.length < 10 ? 'Message must be at least 10 characters.' : '');
      if (!valid) return;
      // Demo only: connect to Formspree / Netlify Forms / your backend here.
      document.getElementById('formOk').style.display = 'block';
      form.reset();
    });
  }

  // ---- Newsletter ----
  const news = document.getElementById('newsForm');
  if (news) news.addEventListener('submit', e => {
    e.preventDefault();
    news.querySelector('button').textContent = 'Subscribed ✓';
    news.reset();
  });

  // ---- Footer year ----
  document.querySelectorAll('.year').forEach(y => y.textContent = new Date().getFullYear());
});
