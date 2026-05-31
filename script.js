/* ── NAV scroll effect ── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

/* ── Mobile nav toggle (burger) ── */
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

toggle?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = toggle.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(4px, 4px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(4px, -4px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

/* Close burger on link click */
navLinks?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const spans = toggle?.querySelectorAll('span');
    spans?.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

/* ── SAÉ dropdown toggle (click, works on all devices) ── */
const saeMenu = document.querySelector('.nav-sae-menu');
const saeTrigger = document.querySelector('.nav-sae-trigger');
const saeDropdown = document.querySelector('.nav-sae-dropdown');

if (saeTrigger && saeDropdown) {
  // Click to open/close
  saeTrigger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = saeDropdown.classList.contains('open');
    saeDropdown.classList.toggle('open', !isOpen);
    saeTrigger.setAttribute('aria-expanded', String(!isOpen));
    const chevron = saeTrigger.querySelector('svg');
    if (chevron) chevron.style.transform = isOpen ? '' : 'rotate(180deg)';
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!saeMenu.contains(e.target)) {
      saeDropdown.classList.remove('open');
      saeTrigger.setAttribute('aria-expanded', 'false');
      const chevron = saeTrigger.querySelector('svg');
      if (chevron) chevron.style.transform = '';
    }
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      saeDropdown.classList.remove('open');
      saeTrigger.setAttribute('aria-expanded', 'false');
      const chevron = saeTrigger.querySelector('svg');
      if (chevron) chevron.style.transform = '';
    }
  });
}

/* ── Scroll reveal ── */
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });
revealEls.forEach(el => revealObserver.observe(el));

/* ── Active nav link on scroll (index only) ── */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.style.color = '');
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.style.color = 'var(--accent)';
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => sectionObserver.observe(s));

/* ── SAÉ filter (saes.html) ── */
const filterBtns = document.querySelectorAll('.filter-btn');
const saeCards = document.querySelectorAll('.sae-overview-card');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    saeCards.forEach(card => {
      card.style.display = (filter === 'all' || card.dataset.comp === filter) ? '' : 'none';
    });
  });
});
