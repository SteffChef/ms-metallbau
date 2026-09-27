/* ===== Theme ===== */
function initTheme() {
  var toggle = document.querySelector('.theme-toggle');
  if (!toggle) return;
  function current() { return document.documentElement.getAttribute('data-theme') || 'light'; }
  toggle.setAttribute('aria-pressed', String(current() === 'dark'));
  toggle.addEventListener('click', function () {
    var next = current() === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('ms-theme', next); } catch (e) {}
    toggle.setAttribute('aria-pressed', String(next === 'dark'));
  });
}

/* ===== Mobiles Menü + Dropdown ===== */
function initMenu() {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('#primary-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
    document.addEventListener('click', function (e) {
      if (nav.classList.contains('is-open') && !nav.contains(e.target) && !toggle.contains(e.target)) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
  // Dropdown auch per Klick (mobil) bedienbar
  document.querySelectorAll('.has-dropdown > .dropdown-toggle').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var li = btn.parentElement;
      var open = li.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', String(open));
    });
  });
}

/* ===== Parallax (nur Desktop, respektiert reduced-motion) ===== */
function initParallax() {
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var small = matchMedia('(max-width: 860px)').matches;
  if (reduce || small) return;
  var layers = document.querySelectorAll('[data-parallax] .hero__bg');
  if (!layers.length) return;
  var ticking = false;
  function update() {
    layers.forEach(function (el) {
      var rect = el.parentElement.getBoundingClientRect();
      var offset = rect.top * -0.15;
      el.style.transform = 'translateY(' + offset + 'px)';
    });
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
  update();
}

/* ===== Scroll-Fade-in ===== */
function initReveal() {
  var els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
    els.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); obs.unobserve(entry.target); }
    });
  }, { threshold: 0.15 });
  els.forEach(function (el) { obs.observe(el); });
}

/* ===== Lightbox ===== */
function initLightbox() {
  var items = Array.prototype.slice.call(document.querySelectorAll('.gallery__item'));
  if (!items.length) return;
  var idx = 0, lastFocus = null;

  var box = document.createElement('div');
  box.className = 'lightbox';
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-modal', 'true');
  box.setAttribute('aria-hidden', 'true');
  box.innerHTML =
    '<button class="lightbox__close" aria-label="Schließen">×</button>' +
    '<button class="lightbox__nav lightbox__prev" aria-label="Vorheriges Bild">‹</button>' +
    '<img class="lightbox__img" alt="">' +
    '<button class="lightbox__nav lightbox__next" aria-label="Nächstes Bild">›</button>';
  document.body.appendChild(box);
  var img = box.querySelector('.lightbox__img');

  function show(i) {
    idx = (i + items.length) % items.length;
    var src = items[idx].getAttribute('data-full');
    img.setAttribute('src', src);
    img.setAttribute('alt', items[idx].getAttribute('data-alt') || '');
  }
  function open(i) {
    lastFocus = document.activeElement;
    show(i);
    box.classList.add('is-open');
    box.setAttribute('aria-hidden', 'false');
    box.querySelector('.lightbox__close').focus();
    document.body.style.overflow = 'hidden';
  }
  function close() {
    box.classList.remove('is-open');
    box.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }
  items.forEach(function (it, i) { it.addEventListener('click', function () { open(i); }); });
  box.querySelector('.lightbox__close').addEventListener('click', close);
  box.querySelector('.lightbox__prev').addEventListener('click', function () { show(idx - 1); });
  box.querySelector('.lightbox__next').addEventListener('click', function () { show(idx + 1); });
  box.addEventListener('click', function (e) { if (e.target === box) close(); });
  document.addEventListener('keydown', function (e) {
    if (!box.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowRight') show(idx + 1);
    else if (e.key === 'ArrowLeft') show(idx - 1);
  });
}

/* ===== Kontaktformular (mailto) ===== */
function initContactForm() {
  var form = document.getElementById('contact-form');
  if (!form) return;
  var errBox = document.getElementById('form-error');
  var TO = 'info@ms-metallbau-gbr.de'; // Platzhalter: echte Adresse eintragen

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = form.name.value.trim();
    var email = form.email.value.trim();
    var tel = form.telefon.value.trim();
    var msg = form.nachricht.value.trim();
    var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!name || !emailOk || !msg) {
      errBox.hidden = false;
      errBox.textContent = !name ? 'Bitte geben Sie Ihren Namen an.'
        : !emailOk ? 'Bitte geben Sie eine gültige E-Mail-Adresse an.'
        : 'Bitte schreiben Sie eine Nachricht.';
      return;
    }
    errBox.hidden = true;

    var subject = 'Anfrage über die Website – ' + name;
    var body = 'Name: ' + name + '\nE-Mail: ' + email + '\nTelefon: ' + (tel || '-') + '\n\nNachricht:\n' + msg;
    window.location.href = 'mailto:' + TO +
      '?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(body);
  });
}

document.addEventListener('DOMContentLoaded', function () {
  initTheme();
  initMenu();
  if (typeof initParallax === 'function') initParallax();
  if (typeof initReveal === 'function') initReveal();
  if (typeof initLightbox === 'function') initLightbox();
  if (typeof initContactForm === 'function') initContactForm();
});
