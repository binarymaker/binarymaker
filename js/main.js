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
  initRoleSlider();
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

/* ═══════ ROLE SLIDER ═══════ */
function initRoleSlider() {
  const chips = document.querySelectorAll('.role-chip');
  if (!chips.length) return;
  let current = 0;
  setInterval(() => {
    chips[current].classList.remove('active');
    current = (current + 1) % chips.length;
    chips[current].classList.add('active');
  }, 2000);
}

/* ═══════ PROJECT DETAIL MODAL ═══════ */
const projectData = {
  'bsw': {
    badge: 'Platform Project',
    title: 'BSW Middleware Software Stacks',
    subtitle: 'Automotive — Common Platform for 2W/3W EV Products',
    overview: 'Designed and developed a complete reusable middleware platform serving as the foundation for all 2W/3W EV products. Every module is hardware-independent, testable on PC host, and deployed across motor controllers, BMS, connectivity ECUs, and onboard chargers via Git sub-modules.',
    diagram: [
      { row: [{ label: 'Motor Control App', cls: 'app' }, { label: 'BMS App', cls: 'app' }, { label: 'Charger App', cls: 'app' }, { label: 'MFECU App', cls: 'app' }] },
      { connector: 'API Interface' },
      { row: [{ label: 'OS / Scheduler', cls: 'svc' }, { label: 'UDS Diag Stack', cls: 'svc' }, { label: 'CAN TP Stack', cls: 'svc' }, { label: 'NVM Manager', cls: 'svc' }] },
      { row: [{ label: 'DTC / FCM', cls: 'svc' }, { label: 'Safety Monitor', cls: 'svc' }, { label: 'IO Abstraction', cls: 'svc' }, { label: 'DSP Library', cls: 'svc' }] },
      { row: [{ label: 'Bootloader', cls: 'svc' }, { label: 'CRC / Crypto', cls: 'svc' }, { label: 'HSM Framework', cls: 'svc' }] },
      { connector: 'BSP (Board Support Package)' },
      { row: [{ label: 'MCU Drivers', cls: 'drv' }, { label: 'Flash / EEPROM', cls: 'drv' }] },
      { connector: 'Hardware' },
      { row: [{ label: 'RH850', cls: 'hw' }, { label: 'STM32', cls: 'hw' }, { label: 'dsPIC33', cls: 'hw' }, { label: 'XMC', cls: 'hw' }] },
      { connector: 'Supporting Tools' },
      { row: [{ label: 'Python UDS GUI', cls: 'tool' }, { label: 'DBC Generator', cls: 'tool' }, { label: 'Calibration Tool', cls: 'tool' }] }
    ],
    features: [
      'Hierarchical State Machine (HSM) based OS with timer services and event queues',
      'Full UDS diagnostic stack (ISO 14229) — both client and server implementations',
      'CAN TP transport protocol stack with DBC-to-config auto-generation tool',
      'Fault Code Memory manager with DTC snapshot and extended data records',
      'Non-volatile memory manager supporting Flash, EEPROM, and emulated EEPROM',
      'DSP library — digital filters (IIR/FIR), hysteresis, calculus, fixed-point math',
      'Fail-safe dual-bank bootloader with Python UDS flashing GUI',
      'IO abstraction layer — digital and analog with configurable filtering',
      'Safety monitors — RAM test, ROM CRC, watchdog manager, stack overflow detection',
      'CI/CD pipeline with automated unit testing, MISRA static analysis, and coverage reports',
      'Git sub-module architecture enabling independent module versioning across 4+ product lines'
    ],
    tech: ['Embedded C', 'Python', 'CAN / CAN FD', 'UDS (ISO 14229)', 'ISO TP', 'Git Sub-modules', 'Unity / Ceedling', 'MISRA-2012', 'GitLab CI/CD', 'Qt Designer', 'Doxygen']
  },
  'mc-l1': {
    badge: 'Product',
    title: '2W Traction Motor Controller — L1',
    subtitle: 'Automotive L1 Category — Electric Two-Wheeler',
    overview: 'End-to-end software development for a two-wheeler traction motor controller — from system requirements analysis through algorithm development, integration, and production release. The controller drives PMSM motors using Field Oriented Control with fixed-point DSP arithmetic.',
    diagram: [
      { row: [{ label: 'Drive Mode SM', cls: 'app' }, { label: 'Throttle Map', cls: 'app' }, { label: 'Regen Braking', cls: 'app' }] },
      { connector: 'Application Layer' },
      { row: [{ label: 'FOC Algorithm', cls: 'svc' }, { label: 'MTPA', cls: 'svc' }, { label: 'Flux Weakening', cls: 'svc' }] },
      { row: [{ label: 'PID Controllers', cls: 'svc' }, { label: 'Clarke/Park Transforms', cls: 'svc' }, { label: 'SVM', cls: 'svc' }] },
      { connector: 'Control System' },
      { row: [{ label: 'HALL Sensor', cls: 'drv' }, { label: 'ADC Sensing', cls: 'drv' }, { label: 'PWM Generation', cls: 'drv' }] },
      { connector: 'Hardware' },
      { row: [{ label: 'dsPIC33EV', cls: 'hw' }, { label: 'Gate Driver', cls: 'hw' }, { label: 'PMSM Motor', cls: 'hw' }] },
      { connector: 'Tools' },
      { row: [{ label: 'Calibration GUI', cls: 'tool' }, { label: 'MATLAB Model', cls: 'tool' }] }
    ],
    features: [
      'Field Oriented Control (FOC) algorithm with MTPA optimization for maximum torque efficiency',
      'Fixed-point Q15/Q31 arithmetic DSP implementation — zero floating-point dependency',
      'Clarke, Park, and Inverse Park transforms for three-phase current control',
      'Space Vector Modulation (SVM) for optimized inverter switching',
      'Flux weakening algorithm for extended speed range operation',
      'Regenerative braking with configurable energy recovery profiles',
      'Drive mode state machine — Eco, Normal, Sport with smooth transitions',
      'Configurable throttle mapping with deadband and ramp rate limiting',
      'Python/Qt-based calibration GUI tool for real-time parameter tuning over CAN',
      'MISRA-2012 compliant codebase with full static analysis coverage'
    ],
    tech: ['Embedded C', 'dsPIC33EV', 'FOC', 'Fixed-Point DSP', 'CAN', 'MISRA-2012', 'MATLAB', 'Python', 'Qt Designer']
  },
  'mc-l2': {
    badge: 'ASIL-C',
    title: '2W Traction Motor Controller — L2',
    subtitle: 'Automotive L2 Category — ASIL-C Functional Safety',
    overview: 'Safety-critical motor controller with ISO 26262 ASIL-C compliance. Integrated TI smart gate driver with built-in self-test capabilities, full BSW middleware stack, and comprehensive safety monitoring framework.',
    diagram: [
      { row: [{ label: 'Motor Control App', cls: 'app' }, { label: 'Safety Manager', cls: 'app' }] },
      { connector: 'Application Layer' },
      { row: [{ label: 'FOC + Safety Monitor', cls: 'svc' }, { label: 'BSW Middleware', cls: 'svc' }, { label: 'UDS Stack', cls: 'svc' }] },
      { row: [{ label: 'BIST Drivers', cls: 'svc' }, { label: 'Fault Handler', cls: 'svc' }, { label: 'NVM Manager', cls: 'svc' }] },
      { connector: 'Safety Layer' },
      { row: [{ label: 'ADC Self-Test', cls: 'drv' }, { label: 'PWM Monitor', cls: 'drv' }, { label: 'RAM/ROM Test', cls: 'drv' }] },
      { connector: 'Hardware' },
      { row: [{ label: 'MCU', cls: 'hw' }, { label: 'TI DRV32XX', cls: 'hw' }, { label: 'PMSM', cls: 'hw' }] }
    ],
    features: [
      'TI DRV32XX smart gate driver integration with SPI control interface',
      'Built-In Self-Test (BIST) drivers for gate driver health monitoring',
      'ADC plausibility checks and PWM output monitoring for safety compliance',
      'RAM march test and ROM CRC verification at startup and runtime',
      'Full BSW middleware integration — UDS, NVM, DTC, bootloader',
      'Watchdog manager with independent window watchdog supervision',
      'ISO 26262 ASIL-C safety concept implementation and verification',
      'Peer-reviewed safety-critical code paths with 100% decision coverage'
    ],
    tech: ['Embedded C', 'ISO 26262', 'ASIL-C', 'TI DRV32XX', 'SPI', 'MISRA-2012', 'Helix QAC', 'Unity / Ceedling']
  },
  'suspension': {
    badge: 'ASIL-B',
    title: 'Suspension Air Compressor Controller',
    subtitle: 'Hybrid Vehicle — Functional Safety',
    overview: 'Software architecture design and UDS bootloader development for a hybrid vehicle suspension air compressor motor controller. Full ISO 26262 safety framework with ASIL-B compliance from concept through production.',
    diagram: [
      { row: [{ label: 'Compressor Control', cls: 'app' }, { label: 'Pressure Regulation', cls: 'app' }] },
      { connector: 'Application Layer' },
      { row: [{ label: 'Motor Drive', cls: 'svc' }, { label: 'UDS Bootloader', cls: 'svc' }, { label: 'Safety Framework', cls: 'svc' }] },
      { connector: 'BSP' },
      { row: [{ label: 'MCU Drivers', cls: 'drv' }, { label: 'Pressure Sensor', cls: 'drv' }, { label: 'CAN Driver', cls: 'drv' }] },
      { connector: 'Hardware' },
      { row: [{ label: 'Renesas RH850', cls: 'hw' }, { label: 'Motor + Compressor', cls: 'hw' }] }
    ],
    features: [
      'Complete software architecture design — layered, modular, safety-compliant',
      'UDS-based automotive bootloader with secure firmware update capability',
      'Board bring-up and peripheral driver validation for Renesas RH850',
      'ISO 26262 safety concept — FMEA, safety requirements, verification',
      'Technical peer review lead for safety-critical design artifacts',
      'Integration with existing vehicle CAN network and diagnostic infrastructure'
    ],
    tech: ['Embedded C', 'Renesas RH850', 'ISO 26262', 'ASIL-B', 'UDS Bootloader', 'CAN', 'ASPICE']
  },
  'iot': {
    badge: 'IoT',
    title: 'Smart Refrigerator System',
    subtitle: 'IoT — Connected Appliance',
    overview: 'End-to-end embedded product development for a smart refrigerator with automatic defrost control, energy monitoring, smartphone-based temperature control, and over-the-air firmware update capability.',
    diagram: [
      { row: [{ label: 'Mobile App', cls: 'tool' }, { label: 'Cloud Server', cls: 'tool' }] },
      { connector: 'WiFi / BLE' },
      { row: [{ label: 'Defrost Control', cls: 'app' }, { label: 'Energy Monitor', cls: 'app' }, { label: 'OTA Manager', cls: 'app' }] },
      { connector: 'Application Layer' },
      { row: [{ label: 'Custom Bootloader', cls: 'svc' }, { label: 'BSP', cls: 'svc' }, { label: 'Comm Stack', cls: 'svc' }] },
      { connector: 'Hardware' },
      { row: [{ label: 'MCU', cls: 'hw' }, { label: 'Temp Sensors', cls: 'hw' }, { label: 'Relay Drivers', cls: 'hw' }] }
    ],
    features: [
      'Automatic defrost cycle management with adaptive timing algorithms',
      'Real-time energy consumption monitoring and reporting',
      'Smartphone temperature control via BLE communication',
      'Over-the-air (OTA) firmware update with custom lightweight bootloader',
      'Complete BSP development — GPIO, ADC, timers, communication peripherals',
      'Fail-safe mechanisms for compressor and heater control'
    ],
    tech: ['Embedded C', 'BLE', 'WiFi', 'OTA', 'Custom Bootloader', 'ADC', 'PWM']
  },
  'research': {
    badge: 'Research',
    title: '100+ Research Prototypes',
    subtitle: 'Diverse Embedded Domains',
    overview: 'Extensive portfolio of research prototypes and proof-of-concepts spanning evaluation boards, BSP development, control system simulation, computer vision, and cost-effective solutions for agriculture and industrial applications.',
    diagram: [
      { row: [{ label: 'MATLAB / Simulink', cls: 'tool' }, { label: 'Python Scripts', cls: 'tool' }, { label: 'OpenCV', cls: 'tool' }] },
      { connector: 'Simulation & Analysis' },
      { row: [{ label: 'Control Algorithms', cls: 'svc' }, { label: 'Signal Processing', cls: 'svc' }, { label: 'Image Processing', cls: 'svc' }] },
      { connector: 'Prototyping Platforms' },
      { row: [{ label: 'Arduino', cls: 'hw' }, { label: 'Raspberry Pi', cls: 'hw' }, { label: 'STM32', cls: 'hw' }, { label: 'FPGA', cls: 'hw' }] }
    ],
    features: [
      'MCU evaluation board bring-up and BSP development for multiple architectures',
      'MATLAB/Simulink modeling for motor control and power electronics simulation',
      'Python automation tools for test data analysis and visualization',
      'Raspberry Pi + OpenCV based image processing prototypes',
      'Cost-effective agriculture monitoring and industrial automation solutions',
      'FPGA/VLSI-based digital circuit design and verification',
      'Rapid prototyping methodology — concept to working demo in days'
    ],
    tech: ['MATLAB', 'Python', 'Raspberry Pi', 'Arduino', 'OpenCV', 'STM32', 'FPGA / VLSI', 'Simulink']
  }
};

function initProjectModals() {
  const modal = document.getElementById('projectModal');
  const closeBtn = document.getElementById('modalClose');
  if (!modal || !closeBtn) return;

  document.querySelectorAll('.project-card[data-project]').forEach(card => {
    card.addEventListener('click', () => {
      const key = card.getAttribute('data-project');
      const data = projectData[key];
      if (!data) return;

      document.getElementById('modalBadge').textContent = data.badge;
      document.getElementById('modalTitle').textContent = data.title;
      document.getElementById('modalSubtitle').textContent = data.subtitle;
      document.getElementById('modalOverview').textContent = data.overview;

      // Build block diagram
      const diagramEl = document.getElementById('modalDiagram');
      diagramEl.innerHTML = '';
      data.diagram.forEach(item => {
        if (item.connector) {
          const conn = document.createElement('div');
          conn.className = 'diagram-connector';
          conn.textContent = '\u25BC  ' + item.connector + '  \u25BC';
          diagramEl.appendChild(conn);
        } else if (item.row) {
          const row = document.createElement('div');
          row.className = 'diagram-row';
          item.row.forEach(block => {
            const el = document.createElement('div');
            el.className = 'diagram-block ' + block.cls;
            el.textContent = block.label;
            row.appendChild(el);
          });
          diagramEl.appendChild(row);
        }
      });

      // Build features list
      const featuresEl = document.getElementById('modalFeatures');
      featuresEl.innerHTML = '';
      data.features.forEach(f => {
        const li = document.createElement('li');
        li.textContent = f;
        featuresEl.appendChild(li);
      });

      // Build tech tags
      const techEl = document.getElementById('modalTech');
      techEl.innerHTML = '';
      data.tech.forEach(t => {
        const tag = document.createElement('span');
        tag.textContent = t;
        techEl.appendChild(tag);
      });

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initProjectModals();
});
