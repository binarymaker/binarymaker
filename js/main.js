/* ────────────────────────────────────────────────────────
   GOKUL ARUNACHALAM — PORTFOLIO JS
   Interactions, animations, and dynamic behavior
   ──────────────────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileNav();
  initCountUp();
  initScrollReveal();
  initParticles();
  initSmoothScroll();
});

/* ═══════ NAVBAR SCROLL EFFECT ═══════ */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('.section');
  const navLinks = document.querySelectorAll('.nav-links a');

  function onScroll() {
    // Add scrolled class
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active section highlighting
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ═══════ MOBILE NAVIGATION ═══════ */
function initMobileNav() {
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');

  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    links.classList.toggle('open');
  });

  // Close on link click
  links.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      links.classList.remove('open');
    });
  });
}

/* ═══════ COUNT-UP ANIMATION ═══════ */
function initCountUp() {
  const counters = document.querySelectorAll('.stat-number');
  let animated = false;

  function animateCounters() {
    if (animated) return;
    const statsSection = document.querySelector('.hero-stats');
    if (!statsSection) return;

    const rect = statsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      animated = true;
      counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'), 10);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            counter.textContent = target;
            clearInterval(timer);
          } else {
            counter.textContent = Math.floor(current);
          }
        }, 16);
      });
    }
  }

  window.addEventListener('scroll', animateCounters, { passive: true });
  animateCounters(); // Check on load
}

/* ═══════ SCROLL REVEAL ═══════ */
function initScrollReveal() {
  // Add reveal class to elements
  const revealSelectors = [
    '.expertise-card',
    '.project-card',
    '.timeline-item',
    '.skill-category',
    '.edu-card',
    '.training-item',
    '.article-card',
    '.contact-card',
    '.principle',
    '.arch-layer',
    '.highlight'
  ];

  revealSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = `${i * 0.08}s`;
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ═══════ PARTICLE BACKGROUND ═══════ */
function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const count = 40;
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    const size = Math.random() * 3 + 1;
    particle.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: rgba(0, 212, 255, ${Math.random() * 0.3 + 0.1});
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation: particleFloat ${Math.random() * 8 + 6}s ease-in-out infinite;
      animation-delay: ${Math.random() * 5}s;
    `;
    container.appendChild(particle);
  }

  // Add particle animation to stylesheet
  const style = document.createElement('style');
  style.textContent = `
    @keyframes particleFloat {
      0%, 100% {
        transform: translate(0, 0) scale(1);
        opacity: 0.3;
      }
      25% {
        transform: translate(${randomRange(-30, 30)}px, ${randomRange(-40, 40)}px) scale(1.2);
        opacity: 0.6;
      }
      50% {
        transform: translate(${randomRange(-20, 20)}px, ${randomRange(-30, 30)}px) scale(0.8);
        opacity: 0.2;
      }
      75% {
        transform: translate(${randomRange(-40, 40)}px, ${randomRange(-20, 20)}px) scale(1.1);
        opacity: 0.5;
      }
    }
  `;
  document.head.appendChild(style);
}

function randomRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* ═══════ SMOOTH SCROLL ═══════ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* ═══════ CARD GLOW EFFECT (MOUSE TRACKING) ═══════ */
document.addEventListener('mousemove', (e) => {
  const cards = document.querySelectorAll('.expertise-card');
  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const glow = card.querySelector('.card-glow');
    if (glow) {
      glow.style.left = `${x - rect.width}px`;
      glow.style.top = `${y - rect.height}px`;
    }
  });
});
