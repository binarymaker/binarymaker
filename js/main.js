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
    '.highlight',
    '.impact-card'
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

// Ordered list of project keys for prev/next navigation
const projectOrder = ['mc', 'charger', 'bms', 'bootloader-ota', 'connectivity', 'bsw', 'mc-l2', 'mc-l1', 'suspension', 'iot', 'research'];
let currentProjectIndex = 0;

const projectData = {

  /* ============================================================
     PRIORITY 1 — FEATURED PRODUCTS
     ============================================================ */

  'mc': {
    badge: 'ASIL-C',
    title: 'Motor Controller (DCU) — Traction Inverter',
    subtitle: 'FOC-based 2W/3W EV Motor Controller | L1 & L2 (ASIL-C) | XMC1 / RH850',
    overview: 'End-to-end embedded software for a traction motor controller covering both L1 (performance-focused) and ASIL-C L2 (ISO 26262 safety-critical) categories. The core is a Field Oriented Control algorithm running at 10 kHz on entry-level MCUs using purely fixed-point Q15/Q31 arithmetic — no FPU required. The ASIL-C variant integrates the TI DRV32XX smart gate driver with SPI BIST, plus RAM march test, ROM CRC, ADC plausibility, and PWM output monitors at startup and runtime.',
    diagram: [
      { row: [{ label: 'Drive Mode SM', cls: 'app' }, { label: 'Throttle Map', cls: 'app' }, { label: 'Hill Assist', cls: 'app' }, { label: 'Range Estimator', cls: 'app' }] },
      { connector: 'Application Layer' },
      { row: [{ label: 'FOC Algorithm', cls: 'svc' }, { label: 'MTPA', cls: 'svc' }, { label: 'Flux Weakening', cls: 'svc' }, { label: 'Regen Braking', cls: 'svc' }] },
      { row: [{ label: 'Id/Iq PID Ctrl', cls: 'svc' }, { label: 'Clarke / Park', cls: 'svc' }, { label: 'SVPWM', cls: 'svc' }, { label: 'Safety Monitor', cls: 'svc' }] },
      { connector: 'Control + Safety Layer (ASIL-C)' },
      { row: [{ label: 'HALL Sensor', cls: 'drv' }, { label: 'ADC (3Φ Current)', cls: 'drv' }, { label: 'PWM (CCU8)', cls: 'drv' }, { label: 'SPI → DRV32XX', cls: 'drv' }] },
      { connector: 'Hardware' },
      { row: [{ label: 'Infineon XMC1 / RH850', cls: 'hw' }, { label: 'TI DRV32XX', cls: 'hw' }, { label: 'PMSM / IPM Motor', cls: 'hw' }] },
      { connector: 'Development Tools' },
      { row: [{ label: 'Qt/Python Cal. GUI', cls: 'tool' }, { label: 'MATLAB Model', cls: 'tool' }, { label: 'Unity/Ceedling Tests', cls: 'tool' }] }
    ],
    features: [
      'FOC algorithm — Clarke, Park, Inverse Park transforms; SVPWM generation at 10 kHz (100µs control cycle)',
      'Fixed-point Q15/Q31 DSP arithmetic — zero floating-point dependency, runs efficiently on entry-level MCU',
      'MTPA (Maximum Torque Per Ampere) — real-time d-axis current command optimization for maximum torque efficiency',
      'Flux Weakening algorithm — extends operating speed range beyond base speed in the field-weakening region',
      'TI DRV32XX smart gate driver — SPI-controlled with BIST health check at every power cycle',
      'ASIL-C safety monitors — RAM march C- test, ROM CRC-32, ADC plausibility, PWM duty-cycle output monitoring',
      'Hill assist — holds torque at zero velocity on inclines; smooth transition to forward/reverse drive',
      'Predictive thermal derate — thermal model-based power reduction curve triggers 30% before thermal shutdown limit',
      'Regenerative braking — configurable energy recovery levels with smooth torque transition at low speed',
      'Range estimator — adaptive SOC-to-remaining-range conversion with ±5% accuracy; integrates real-time energy metering',
      'Python/Qt calibration GUI — real-time tuning of all motor parameters (Kp/Ki, MTPA tables, limits) over CAN',
      'MISRA-2012 compliant codebase with 100% branch coverage on safety-critical paths'
    ],
    tech: ['Embedded C', 'Infineon XMC1400', 'Renesas RH850', 'dsPIC33EV', 'FOC Algorithm', 'Fixed-Point DSP', 'SVPWM', 'TI DRV32XX', 'SPI / BIST', 'MISRA-2012', 'ISO 26262 ASIL-C', 'CAN', 'Python', 'Qt Designer', 'Unity / Ceedling']
  },

  'charger': {
    badge: 'Power Electronics',
    title: 'Charger Controller — OBC & OFBC',
    subtitle: 'AC-DC Power Conversion | PFC + LLC + PSFB | 3kW Multi-OEM | TI C2000 (F28x)',
    overview: 'Full-stack power electronics firmware for On-Board Charger (OBC) and Offline Front Boost Charger (OFBC). Covers three converter topologies: PFC (power factor correction), LLC resonant full-bridge, and PSFB (Phase Shift Full Bridge). The most technically demanding deliverable is the CLB-based synchronous rectifier (SR) firing engine: the TI C2000 Configurable Logic Block (an FPGA-like programmable hardware peripheral) runs completely independent of the CPU and monitors the SR MOSFET drain-source voltage (VDS method) to detect body-diode conduction onset and fire the SR gate at the optimal nanosecond-precision window — physically impossible to achieve via CPU interrupt latency at 50 kHz+ switching frequency.',
    diagram: [
      { row: [{ label: 'Charger State Machine', cls: 'app' }, { label: 'Thermal Mgmt', cls: 'app' }, { label: 'BMS CAN Protocol', cls: 'app' }] },
      { connector: 'Application Layer' },
      { row: [{ label: 'PFC Controller', cls: 'svc' }, { label: 'SOGI-PLL', cls: 'svc' }, { label: 'LLC (6-module)', cls: 'svc' }, { label: 'PSFB Controller', cls: 'svc' }] },
      { connector: 'CLB Hardware Engine (CPU-Independent)' },
      { row: [{ label: 'CLB: SR Firing (VDS)', cls: 'drv' }, { label: 'CLB: PFC Inner Loop', cls: 'drv' }, { label: 'Grid Precharge', cls: 'drv' }] },
      { connector: 'TI C2000 (F28x) — CPU + CLB' },
      { row: [{ label: 'ADC (VDS / Vout)', cls: 'drv' }, { label: 'ePWM (Primary)', cls: 'drv' }, { label: 'SR Gate Drive', cls: 'drv' }, { label: 'CAN Driver', cls: 'drv' }] },
      { connector: 'Hardware Boards (PSMB / PSB)' },
      { row: [{ label: 'PFC Boost Stage', cls: 'hw' }, { label: 'LLC Transformer', cls: 'hw' }, { label: 'SR MOSFETs', cls: 'hw' }] }
    ],
    features: [
      'CLB (Configurable Logic Block) SR firing engine — FPGA-like hardware core inside TI C2000, zero CPU involvement',
      'VDS-based dead-band detection — monitors drain-source voltage across SR MOSFET; fires when VDS ≈ −0.7V (body diode onset)',
      'Optimal SR firing window — turns ON at body-diode conduction, turns OFF before current reversal to prevent reverse recovery stress',
      'Nanosecond-level timing precision at 50 kHz+ switching frequency — physically impossible via CPU interrupt handling',
      'LLC 6-module control stack: current controller → resonant controller → power controller → voltage controller → signal conditioner → state machine',
      'PFC with CLB inner current loop — CPU handles only outer voltage loop and supervisory state; CLB enforces current tracking at hardware speed',
      'SOGI-PLL (Second-Order Generalized Integrator PLL) — accurate grid frequency and phase tracking across 47–63 Hz range',
      'PSFB (Phase Shift Full Bridge) topology — alternative to LLC for specific OEM voltage/current profiles',
      'Multi-OEM architecture — Santhos, TATA, TVS product variants from a single configurable codebase via compile-time flags',
      'Deployed on PSMB (Power Stage Module Board) and PSB (Power Stage Board) hardware platforms',
      'IEC 61851 / IS 17017 compliance; grid precharge inrush limiting; soft-start power ramp on every power-up',
      'Thermal derating management — adaptive current limiting under high continuous load'
    ],
    tech: ['Embedded C', 'TI C2000 (F28x)', 'CLB (Configurable Logic Block)', 'PFC / LLC / PSFB', 'SOGI-PLL', 'Sync Rectification', 'VDS Sensing', 'ZVS', 'MISRA-2012', 'CAN', 'IEC 61851', 'IS 17017']
  },

  'bms': {
    badge: 'AIS156',
    title: 'Battery Management System',
    subtitle: 'BMS — NMC & LFP Chemistry | Batrix 48V | Renesas RH850 F1KM | AIS156 Compliant',
    overview: 'Production BMS for 48V Li-ion battery packs with full AIS156 (Indian EV safety standard) compliance. Designed around a pluggable SEEK chemistry driver layer that decouples cell chemistry from application logic — the same firmware binary supports LFP, NCA, and NCM cells across 50+ vehicle configurations by swapping the SEEK module, zero firmware recompilation needed. SOC accuracy of ±2% is achieved via a self-calibrating hybrid algorithm that combines real-time coulomb counting with periodic OCV lookup and a continuous divergence monitor that logs root causes of any estimation drift.',
    diagram: [
      { row: [{ label: 'SOC/SOH Estimator', cls: 'app' }, { label: 'Safety FSM', cls: 'app' }, { label: 'Charger CAN Protocol', cls: 'app' }] },
      { connector: 'Application Layer' },
      { row: [{ label: 'Coulomb Counter', cls: 'svc' }, { label: 'OCV Lookup', cls: 'svc' }, { label: 'Cell Balancing SM', cls: 'svc' }, { label: 'Thermal Model', cls: 'svc' }] },
      { row: [{ label: 'SEEK Chemistry Layer', cls: 'svc' }, { label: 'HV Contactor Ctrl', cls: 'svc' }, { label: 'Calibration Engine', cls: 'svc' }] },
      { connector: 'BSW Middleware' },
      { row: [{ label: 'TI AFIC Driver', cls: 'drv' }, { label: 'NTC Thermistor', cls: 'drv' }, { label: 'Shunt ADC', cls: 'drv' }, { label: 'CAN Driver', cls: 'drv' }] },
      { connector: 'Hardware' },
      { row: [{ label: 'Renesas RH850 F1KM', cls: 'hw' }, { label: 'TI AFIC Chip', cls: 'hw' }, { label: 'Battery Pack 48V', cls: 'hw' }, { label: 'HV Contactor', cls: 'hw' }] }
    ],
    features: [
      'Hybrid SOC estimation — real-time Coulomb counting + periodic OCV lookup; ±2% accuracy across full charge-discharge cycle',
      'Self-justification algorithm — continuously tracks divergence between both estimators; logs root causes when gap exceeds threshold',
      'TI AFIC driver — individual cell voltage measurement within ±10mV; full register-level driver written from scratch',
      'Precision current sensing via 10mΩ shunt: multi-point calibration improves accuracy from ±5% (factory) to ±0.5%',
      'Passive cell balancing with HST driver control — achieves >95% voltage equalization across cell groups',
      '6-layer protection hierarchy: OV (>4.2V), UV (<2.5V), OC (>250A, <10ms), SC (<1µs), OT (>60°C), UT (<0°C)',
      'HV contactor smart management: inrush limiting, weld detection, graceful shutdown sequence with NVM logging',
      'BMS-to-Charger isolated CAN protocol: adaptive CC/CV phase coordination, charging time reduced 30% vs fixed profiles',
      'Temperature-dependent derating: 100A @ 25°C → 30A @ 50°C (charge); 200A @ 25°C → 100A @ 55°C (discharge)',
      'SEEK chemistry driver layer — pluggable LFP / NCA / NCM modules; 50+ vehicle configs on one firmware binary',
      'AIS156 compliance — redundant sensing paths, deterministic fault response (<100ms), comprehensive event logging',
      'NVM persistence: cycle count, max temperature, fault history with timestamps, calibration data across 1M+ writes'
    ],
    tech: ['Embedded C', 'Renesas RH850 F1KM', 'TI AFIC', 'AIS156', 'Coulomb Counting', 'OCV Estimation', 'Passive Cell Balancing', 'CAN (Isolated)', 'Thermal Management', 'NVM Manager', 'MISRA-2012', 'Unity / Ceedling']
  },

  'bootloader-ota': {
    badge: 'Production Critical',
    title: 'Bootloader & OTA Firmware Updates',
    subtitle: 'Dual-Bootloader Architecture | UDS ISO 14229 | 8,000+ Production Deployments | 99.98% Success',
    overview: 'Production-proven dual-bootloader architecture that saved 8,000+ ECU boots in field deployment with zero hardware losses. The dual-bank design ensures zero ECU bricks: Bootloader 1 (primary, permanent) can always recover Bootloader 2 if a B2 update fails mid-transfer or fails CRC verification. The accompanying Python UDS client tool abstracts the entire protocol stack and supports any CAN hardware vendor through a clean HAL interface — one tool that works with Vector CANoe, PCAN, and custom USB-CAN adapters.',
    diagram: [
      { row: [{ label: 'Python UDS Client GUI', cls: 'tool' }, { label: 'Validation Scripts', cls: 'tool' }] },
      { connector: 'Multi-Vendor CAN HAL (Vector / PCAN / Custom)' },
      { row: [{ label: 'UDS Server (ISO 14229)', cls: 'svc' }, { label: 'CAN TP (ISO 15765)', cls: 'svc' }, { label: 'Security Access (0x27)', cls: 'svc' }] },
      { connector: 'Flash Programming Session (0x34 → 0x36 → 0x37)' },
      { row: [{ label: 'Bootloader 1 (Permanent)', cls: 'svc' }, { label: 'Bootloader 2 (Updatable)', cls: 'svc' }, { label: 'NVM Boot Flag', cls: 'svc' }] },
      { connector: 'NVM / Flash Management' },
      { row: [{ label: 'Flash Driver', cls: 'drv' }, { label: 'CRC-32 Verifier', cls: 'drv' }, { label: 'Version Manager', cls: 'drv' } ] },
      { connector: 'Hardware' },
      { row: [{ label: 'MCU Internal Flash', cls: 'hw' }, { label: 'CAN Transceiver', cls: 'hw' }] }
    ],
    features: [
      'Dual-bootloader architecture — Bootloader 1 and Bootloader 2 in separate flash regions with NVM boot selection flags',
      'Automatic fallback — if B2 update fails or CRC fails, B1 resumes; application firmware is never corrupted',
      'Full UDS ISO 14229-1 server — services 0x10 (session), 0x27 (security), 0x34/0x36/0x37 (firmware transfer), 0x2E (data write)',
      'CAN TP ISO 15765-2 — segmented firmware transfer with flow control (CF, FC) and timeout handling',
      'Security Access (0x27) with seed/key algorithm — prevents unauthorized firmware injection in production',
      'Python UDS client library — abstracted protocol layers; single API call to flash an ECU regardless of CAN hardware vendor',
      'CAN hardware abstraction layer — unified interface for Vector CANoe, PCAN, and custom USB-CAN adapters',
      'CRC-32 verification of entire received firmware image before any flash write operation begins',
      'Parameter calibration via 0x2E — write motor parameters, BMS thresholds, safety limits over CAN without ECU replacement',
      'Telemetry logging — every update attempt (success/fail/time/error code) logged with timestamp and NVM persistence',
      'Rollback mechanism — version tracking enables revert to previous firmware image if post-update validation fails',
      '8,000+ production deployments — 99.98% success rate across RH850, XMC1, STM32, dsPIC33 platforms'
    ],
    tech: ['Embedded C', 'UDS ISO 14229', 'CAN-TP ISO 15765', 'Python', 'Qt Designer', 'CRC-32', 'Security Access', 'NVM / Flash', 'Renesas RH850', 'Infineon XMC1', 'STM32', 'Vector CANoe', 'PCAN']
  },

  'connectivity': {
    badge: 'Connected Vehicle',
    title: 'Connectivity ECU (MFECU)',
    subtitle: 'Multifunction Electronic Control Unit | CAN/FD Gateway | OTA Orchestrator | BLE Telematics',
    overview: 'Vehicle network hub and telematics gateway for the 2W/3W EV platform. Acts as the central orchestrator for multi-ECU OTA firmware updates, routing CAN/FD traffic between Motor Controller, BMS, OBC, and BCM, and providing BLE smartphone connectivity for real-time telemetry. The OTA orchestration logic manages bandwidth-limited multi-node updates with progress tracking, error recovery, and rollback capability — ensuring fleet-wide updates complete safely without degrading vehicle availability.',
    diagram: [
      { row: [{ label: 'Mobile App (BLE)', cls: 'tool' }, { label: 'Cloud Telematics', cls: 'tool' }] },
      { connector: 'BLE Stack / Modem' },
      { row: [{ label: 'OTA Orchestrator', cls: 'app' }, { label: 'Telematics Logger', cls: 'app' }, { label: 'BLE Manager', cls: 'app' }] },
      { connector: 'Application Layer' },
      { row: [{ label: 'UDS Client', cls: 'svc' }, { label: 'CAN/FD Matrix', cls: 'svc' }, { label: 'J1939 Stack', cls: 'svc' }, { label: 'Gateway Router', cls: 'svc' }] },
      { connector: 'Vehicle CAN/FD Bus' },
      { row: [{ label: 'Motor Controller', cls: 'hw' }, { label: 'BMS', cls: 'hw' }, { label: 'OBC/OFBC', cls: 'hw' }, { label: 'BCM', cls: 'hw' }] }
    ],
    features: [
      'CAN/FD multi-node orchestration — manages all vehicle ECU nodes (Motor, BMS, OBC, BCM) on shared bus',
      'J1939 protocol stack — commercial vehicle network compatibility for three-wheeler and light commercial platforms',
      'OTA firmware update orchestration — coordinates simultaneous or sequential updates across multiple ECU nodes',
      'Bandwidth-managed transfer — prevents CAN bus saturation; dynamically throttles data rate during concurrent OTA sessions',
      'Progress tracking + rollback — maintains update state machine per-node; rolls back on timeout or CRC failure',
      'Real-time telemetry aggregation — collects speed, SOC, motor temp, fault codes from all CAN nodes at 100ms rate',
      'BLE pairing for smartphone — live dashboard data streaming; remote parameter configuration; trip log retrieval',
      'UDS client functionality — initiates diagnostic sessions on subordinate ECUs for production test and field diagnostics',
      'Gateway routing — bridges CAN segments; configurable message filter/mask tables; message priority management',
      'Bus-off recovery and error-passive handling — automatic re-integration after transient bus faults'
    ],
    tech: ['Embedded C', 'CAN / CAN-FD', 'J1939', 'UDS ISO 14229 (Client)', 'CAN-TP ISO 15765', 'BLE', 'OTA Orchestration', 'Telematics', 'Gateway', 'MISRA-2012']
  },

  /* ============================================================
     PLATFORM + ADDITIONAL PROJECTS
     ============================================================ */

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
  const prevBtn = document.getElementById('modalPrev');
  const nextBtn = document.getElementById('modalNext');
  const counterEl = document.getElementById('modalCounter');
  if (!modal || !closeBtn) return;

  // Open modal on any project card click
  document.querySelectorAll('.project-card[data-project]').forEach(card => {
    card.addEventListener('click', () => {
      const key = card.getAttribute('data-project');
      const idx = projectOrder.indexOf(key);
      currentProjectIndex = idx >= 0 ? idx : 0;
      renderModal(projectOrder[currentProjectIndex]);
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Prev / Next buttons
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentProjectIndex > 0) {
        currentProjectIndex--;
        renderModal(projectOrder[currentProjectIndex]);
      }
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentProjectIndex < projectOrder.length - 1) {
        currentProjectIndex++;
        renderModal(projectOrder[currentProjectIndex]);
      }
    });
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft' && currentProjectIndex > 0) { currentProjectIndex--; renderModal(projectOrder[currentProjectIndex]); }
    if (e.key === 'ArrowRight' && currentProjectIndex < projectOrder.length - 1) { currentProjectIndex++; renderModal(projectOrder[currentProjectIndex]); }
  });

  function renderModal(key) {
    const data = projectData[key];
    if (!data) return;

    // Update counter + nav state
    if (counterEl) counterEl.textContent = `${currentProjectIndex + 1} / ${projectOrder.length}`;
    if (prevBtn) prevBtn.disabled = currentProjectIndex === 0;
    if (nextBtn) nextBtn.disabled = currentProjectIndex === projectOrder.length - 1;

    // Set header
    const badgeEl = document.getElementById('modalBadge');
    badgeEl.textContent = data.badge;
    badgeEl.className = 'modal-badge';
    if (data.badge === 'ASIL-C' || data.badge === 'ASIL-B') badgeEl.classList.add('asil');
    if (data.badge === 'AIS156') badgeEl.classList.add('safety');
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

    // Scroll modal body to top
    const modalBody = modal.querySelector('.modal-body');
    if (modalBody) modalBody.scrollTop = 0;
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initProjectModals();
});
