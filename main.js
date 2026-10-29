/* =========================================================
   PRAJWAL ACHARYA PORTFOLIO — Main JavaScript
   Features: Hamburger menu, smooth scroll active links,
             skill bar animations, form submit, fade-in.
   ========================================================= */

/* ---- Mobile hamburger menu ---- */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  const isOpen = hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
  mobileMenu.setAttribute('aria-hidden', !isOpen);
});

// Close mobile menu on any link click
document.querySelectorAll('.mobile-nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
  });
});

/* ---- Active nav link on scroll ---- */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
  const scrollY = window.scrollY + 120;
  let current = '';
  sections.forEach(section => {
    if (scrollY >= section.offsetTop) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}
window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav();

/* ---- Skill bar animation on scroll ---- */
function animateSkillBars() {
  document.querySelectorAll('.skill-bar-fill').forEach(bar => {
    const rect = bar.closest('.skill-bar-track').getBoundingClientRect();
    if (rect.top < window.innerHeight - 60) {
      const target = bar.getAttribute('data-width');
      if (target && bar.style.width !== target + '%') {
        bar.style.width = target + '%';
      }
    }
  });
}
window.addEventListener('scroll', animateSkillBars, { passive: true });
// Run once on load
setTimeout(animateSkillBars, 300);

/* ---- Fade-in elements on scroll ---- */
function handleFadeIns() {
  document.querySelectorAll('.fade-in').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      el.classList.add('visible');
    }
  });
}

// Add fade-in class to target elements
(function applyFadeClasses() {
  const targets = [
    '.career-card', '.project-card', '.timeline-item',
    '.skill-category-card', '.achievement-card-big',
    '.reference-card', '.stat-item'
  ];
  targets.forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.classList.add('fade-in');
      el.style.transitionDelay = (i * 80) + 'ms';
    });
  });
})();

window.addEventListener('scroll', handleFadeIns, { passive: true });
setTimeout(handleFadeIns, 200);

/* ---- Sticky header shadow on scroll ---- */
const siteHeader = document.getElementById('site-header');
window.addEventListener('scroll', () => {
  siteHeader.style.boxShadow = window.scrollY > 10
    ? '0 2px 16px rgba(26,35,64,0.10)'
    : 'none';
}, { passive: true });

/* ---- Contact form ---- */
function handleFormSubmit(e) {
  e.preventDefault();
  const form   = document.getElementById('contact-form');
  const btn    = document.getElementById('submit-form-btn');
  const notice = document.getElementById('form-success');

  btn.textContent = 'Sending…';
  btn.disabled = true;

  setTimeout(() => {
    form.reset();
    btn.textContent = 'Send Message';
    btn.disabled = false;
    if (notice) {
      notice.style.display = 'block';
      setTimeout(() => { notice.style.display = 'none'; }, 4000);
    }
  }, 1000);
}

/* ---- Smooth scroll offset for sticky headers ---- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 120; // topbar + header height
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
