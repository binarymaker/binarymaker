# Portfolio Website Requirements (REVISED)
## Gokul Arunachalam - Automotive Software Architect

### Updated Approach: Single-Page Scrolling with Modal Deep-Dives

---

## 1. Brand Positioning

**Primary Identity:**
- **Software Architect** (primary focus)
- **Embedded Software Developer** for EV/Automotive domain
- **Systems Designer** with focus on modularity, reusability, and scalability

**Design Theme:**
- Modern EV aesthetic (sleek, tech-forward, minimalist)
- Dark mode primary (automotive industry standard)
- Electric blue & silver accents (electric vehicle theme)
- Clean, card-based layout with smooth interactions
- Professional yet approachable tone
- Modern portfolio aesthetic (like Dribbble/Behance but technical)

---

## 2. Site Structure: Single-Page Scrolling Model

### Navigation
```
Minimal sticky header with:
  [Logo/Name] | 📄 Print Resume | 📧 Contact
```

### Page Flow (Single Continuous Scroll)
```
┌─────────────────────────────────────────┐
│ HERO SECTION                            │
│ "Automotive Software Architect"         │
│ 10+ years | Modularity | EV Focus       │
└─────────────────────────────────────────┘
              ↓ scroll
┌─────────────────────────────────────────┐
│ ARCHITECTURE SECTION                    │
│ (Reusability overview diagram)          │
│ Quick visual of modular stack           │
└─────────────────────────────────────────┘
              ↓ scroll
┌─────────────────────────────────────────┐
│ PROJECTS SHOWCASE (Card Grid)           │
│                                         │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ │
│ │ Charger  │ │ Motor    │ │ BMS      │ │
│ │Controller│ │Controller│ │          │ │
│ └──────────┘ └──────────┘ └──────────┘ │
│                                         │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ │
│ │Bootloader│ │Connect.  │ │(Future)  │ │
│ │& OTA     │ │& Comms   │ │          │ │
│ └──────────┘ └──────────┘ └──────────┘ │
│                                         │
│ [Click any card → Modal pops up]       │
└─────────────────────────────────────────┘
              ↓ scroll
┌─────────────────────────────────────────┐
│ IMPACT METRICS SECTION                  │
│ [Visual cards with quantified wins]     │
│ • 8,000 boots saved                     │
│ • 3-4x faster ECU development          │
│ • 50+ configurations on 1 firmware      │
│ • ±2% SOC estimation accuracy          │
└─────────────────────────────────────────┘
              ↓ scroll
┌─────────────────────────────────────────┐
│ SKILLS & EXPERTISE GRID                 │
│ [Organized by domain/topic]             │
│ (Expandable sections)                   │
└─────────────────────────────────────────┘
              ↓ scroll
┌─────────────────────────────────────────┐
│ ABOUT JOURNEY (Brief)                   │
│ Childhood → Career Evolution            │
│ Philosophy of architecture              │
└─────────────────────────────────────────┘
              ↓ scroll
┌─────────────────────────────────────────┐
│ FOOTER                                  │
│ Contact info, links, copyright          │
└─────────────────────────────────────────┘
```

---

## 3. Detailed Component Specifications

### A. Hero Section
```
┌─────────────────────────────────────────────────────┐
│                                                      │
│   GOKUL ARUNACHALAM                                 │
│   Automotive Software Architect                     │
│                                                      │
│   10+ Years | EV Powertrains | Embedded Systems    │
│                                                      │
│   Building modular, reusable systems that ship     │
│   at scale. Expertise in motor control, battery    │
│   management, and safety-critical design.          │
│                                                      │
│   ↓ scroll to explore ↓                             │
│                                                      │
└─────────────────────────────────────────────────────┘
```
- Height: Full viewport or 60vh
- Clear value proposition in 1-2 sentences
- Visual background (subtle EV/tech theme, no overpower)
- Call-to-action: "Scroll to explore" or smooth scroll indicator

### B. Architecture Section (Reusability Showcase)
```
┌─────────────────────────────────────────────────────┐
│ PLATFORM ARCHITECTURE                              │
│ How Reusability Scales                             │
│                                                      │
│ [SVG Diagram showing:]                             │
│ - App Layer (Motor Control, BMS, Charger)         │
│ - Middleware Stack (UDS, NVM, Scheduler, IO)      │
│ - HAL (Hardware Abstraction)                      │
│ - Microcontroller Layer                           │
│                                                      │
│ TEXT: "Same reusable stacks deployed across       │
│ 50+ ECU variants, reducing development time       │
│ by 3-4x while improving reliability."             │
│                                                      │
└─────────────────────────────────────────────────────┘
```
- Non-interactive diagram (informational)
- 1-2 paragraph explanation of reusability approach
- Sets up why modular architecture matters

### C. Projects Showcase Section (MAIN FOCUS)

#### Project Card Design
```
┌─────────────────────────────────────┐
│                                      │
│   MOTOR CONTROLLER                   │
│   [Icon/Visual]                      │
│                                      │
│   Traction Inverter | FOC Algorithm  │
│   ASIL-C | Real-time Control        │
│                                      │
│   📊 Impact: 92%+ efficiency         │
│   🎯 Scope: 50+ motor variants       │
│   🔐 Safety: Automotive-grade        │
│                                      │
│   [EXPLORE] (Button)                 │
│                                      │
└─────────────────────────────────────┘
```

**Card Grid Layout:**
- 3 columns (desktop), 1 column (mobile), 2 columns (tablet)
- Each card shows:
  - Project name (bold)
  - Short tagline/focus area (1 line)
  - Key technologies (tags/chips)
  - 2-3 impact metrics (visual bullets)
  - "EXPLORE" button

**Projects & Priorities:**

**Priority 1 (Featured Cards):**
1. **Motor Controller** - Traction inverter, FOC, MTPA, flux weakening
2. **Charger Controller** - Power electronics, BMS communication
3. **Battery Management System** - Cell balancing, SOC estimation, AIS156

**Priority 2 (Secondary Cards):**
4. **Bootloader & OTA** - Dual-bootloader, UDS, 8000 boots saved
5. **Connectivity & Communications** - CAN/FD, vehicle networking

**Priority 3 (Future):**
6. [Placeholder for future projects]

#### Click Behavior: Modal/Pop-up
When user clicks "EXPLORE" on any card:

```
┌─────────────────────────────────────────────────────┐
│ × (Close button, top-right)                         │
├─────────────────────────────────────────────────────┤
│                                                      │
│ MOTOR CONTROLLER - Technical Deep Dive              │
│                                                      │
│ ┌─────────────────────────────────────────────┐    │
│ │ Block Diagram (SVG, interactive hover)      │    │
│ │ [Shows: Gate drivers, current sensing,      │    │
│ │  control processor, thermal mgmt]           │    │
│ └─────────────────────────────────────────────┘    │
│                                                      │
│ WHAT I DID:                                        │
│ • FOC algorithm implementation & tuning            │
│ • PI controller optimization across 50+ motors     │
│ • ASIL-C compliance architecture                   │
│ • PWM/ADC synchronization (microsecond level)     │
│ • Thermal derating logic                          │
│ • Motor parameter identification                   │
│                                                      │
│ TECHNOLOGIES TOUCHED:                              │
│ [Pills showing:]                                    │
│ STM32 | RH850 | FOC Algorithm | ASIL-C            │
│ Control Systems | Real-time OS | PWM               │
│                                                      │
│ SKILLS DEMONSTRATED:                               │
│ [Organized sections:]                              │
│ - Control Theory: FOC, PI tuning, MTPA             │
│ - Embedded Systems: Real-time constraints,        │
│   microsecond-level timing                        │
│ - Hardware: Motor commutation, synchronization     │
│ - Safety: ASIL-C compliance, failure modes        │
│ - Architecture: Modular, configurable software    │
│                                                      │
│ BUSINESS IMPACT:                                    │
│ • 92%+ motor efficiency achieved                   │
│ • Tested across 50+ motor variants                │
│ • <5ms response time to driver input              │
│ • Automotive-grade reliability                    │
│                                                      │
│ ┌─────────────────────────────────────────────┐    │
│ │ CASE STUDY / TECHNICAL WRITEUP (Optional)  │    │
│ │ [Detailed walkthrough with code snippets]  │    │
│ └─────────────────────────────────────────────┘    │
│                                                      │
│ [← Back to Projects] [Next Project →]            │
│                                                      │
└─────────────────────────────────────────────────────┘
```

**Modal Contents (Per Project):**

**Motor Controller Modal:**
- Block diagram of traction inverter architecture
- What I did: 8-10 bullet points
- Technologies touched: 8-12 tagged pills
- Skills demonstrated: 4 categories (Control Theory, Embedded, Hardware, Safety, Architecture)
- Business impact: 4-5 quantified metrics
- Optional: Link to technical case study or PDF

**Charger Controller Modal:**
- Block diagram of power conversion stage
- What I did: Power electronics, thermal mgmt, BMS comm
- Technologies: PFC, LLC converter, isolation, CAN TP, UDS
- Skills: Power electronics, control systems, safety, communication
- Impact: 95%+ efficiency, multi-vendor compatibility

**BMS Modal:**
- Block diagram of cell sensing & control
- What I did: Cell balancing, SOC estimation, safety protection
- Technologies: AFIC, passive balancing, state machines, AIS156
- Skills: Estimation algorithms, thermal management, precision sensing, safety
- Impact: ±2% SOC accuracy, 50+ configurations, zero field failures

**Bootloader Modal:**
- Block diagram of dual-bootloader architecture
- What I did: UDS stack, Python tooling, hardware abstraction
- Technologies: UDS/CAN TP, NVM, microcontroller peripherals, Python
- Skills: Low-level firmware, protocol implementation, DevOps tooling
- Impact: 8,000+ boots saved, zero-downtime updates, 99.98% success rate

**Connectivity Modal:**
- Block diagram of vehicle network
- What I did: CAN/FD, OTA orchestration, multi-ECU coordination
- Technologies: CAN, UDS, bootloader integration
- Skills: Network architecture, diagnostics
- Impact: Multi-vendor support, field update capability

**Navigation Within Modal:**
- Back arrow → Return to project grid
- Next arrow → Jump to next project modal (smooth transition)
- Close button (×) → Close modal

### D. Impact Metrics Section

```
┌─────────────────────────────────────────────────────┐
│ QUANTIFIED IMPACT                                   │
│                                                      │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ │
│ │ 8,000+       │ │ 3-4x         │ │ 50+          │ │
│ │ Boots Saved  │ │ Faster Dev   │ │ Configs      │ │
│ │ (Production) │ │ Timeline     │ │ on 1 FW      │ │
│ └──────────────┘ └──────────────┘ └──────────────┘ │
│                                                      │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ │
│ │ ±2%          │ │ 92%+         │ │ ASIL-C       │ │
│ │ SOC Accuracy │ │ Motor Eff.   │ │ Compliant    │ │
│ └──────────────┘ └──────────────┘ └──────────────┘ │
│                                                      │
└─────────────────────────────────────────────────────┘
```
- Simple, visual metric cards
- Show before/after or achievements
- Helps recruiters understand business value quickly

### E. Skills & Expertise Grid

```
┌─────────────────────────────────────────────────────┐
│ TECHNICAL EXPERTISE                                │
│                                                      │
│ CONTROL SYSTEMS & ALGORITHMS                       │
│ ├─ FOC (Field-Oriented Control)                   │
│ ├─ PI/PID Tuning                                  │
│ ├─ MTPA (Max Torque Per Ampere)                   │
│ ├─ Flux Weakening                                 │
│ ├─ SOC/SOH Estimation                             │
│ └─ State Machines                                 │
│                                                      │
│ EMBEDDED SYSTEMS & ARCHITECTURE                    │
│ ├─ Modular BSW Design                             │
│ ├─ Microcontroller Abstraction (HAL)              │
│ ├─ Real-time OS / Task Scheduling                 │
│ ├─ Bootloader Development                         │
│ ├─ OTA (Over-The-Air) Updates                     │
│ └─ AUTOSAR Concepts                               │
│                                                      │
│ SAFETY & COMPLIANCE                                │
│ ├─ ASIL-B/C Architecture                          │
│ ├─ ISO 26262 (Functional Safety)                  │
│ ├─ AIS156 (Battery Safety)                        │
│ ├─ Failure Mode Analysis                          │
│ └─ Diagnostics (UDS)                              │
│                                                      │
│ HARDWARE & INTERFACES                              │
│ ├─ CAN/CAN-FD Communication                       │
│ ├─ PWM/ADC Synchronization                        │
│ ├─ High-Precision Sensing                         │
│ ├─ Analog Front-Ends (AFIC)                       │
│ └─ Power Electronics                              │
│                                                      │
│ MICROCONTROLLER ECOSYSTEMS                         │
│ ├─ STM32 (ARM Cortex-M)                           │
│ ├─ RH850 (V850)                                   │
│ ├─ 8051 / PIC (Legacy)                            │
│ └─ Arduino (Bootloader design)                    │
│                                                      │
│ TOOLS & LANGUAGES                                  │
│ ├─ C/C++ (Embedded focus)                         │
│ ├─ Python (Tooling & Test)                        │
│ ├─ MATLAB (Simulation)                            │
│ ├─ Git & CI/CD                                    │
│ └─ Unit Testing (Unity/Ceedling)                 │
│                                                      │
└─────────────────────────────────────────────────────┘
```
- Expandable/collapsible sections
- Shows breadth of knowledge
- Targeted at technical recruiters & engineering managers

### F. About Section (Brief Journey)

```
┌─────────────────────────────────────────────────────┐
│ THE JOURNEY                                         │
│                                                      │
│ Standard 7: Built a motor from scratch             │
│ (magnets, coils, lefthand rule)                    │
│                                                      │
│ First Company (CRISP): Motors everywhere           │
│ Servo, DC, encoded DC, 3-phase VFD               │
│                                                      │
│ Second Company (ELJA ULTRA): Professional control  │
│ PID loops, triac phase control, VFDs              │
│                                                      │
│ Third Company (LUCAS TVs): Software era            │
│ STM32 BLDC, FOC discovery, motor parameters       │
│                                                      │
│ Fourth Company (Automotive): The big league        │
│ RH850 MCU, ASIL compliance, traction motors       │
│                                                      │
│ Philosophy: Modularity is the answer to scale      │
│ Reusability is how you ship faster & safer        │
│                                                      │
└─────────────────────────────────────────────────────┘
```
- Brief, storytelling approach
- Connects childhood to current expertise
- Humanizes the technical depth

### G. Footer
```
┌─────────────────────────────────────────────────────┐
│ Gokul Arunachalam                                   │
│ Automotive Software Architect                      │
│                                                      │
│ 📧 Email | 💼 LinkedIn | 🐙 GitHub | 📄 Resume   │
│                                                      │
│ © 2026 All rights reserved.                         │
│                                                      │
└─────────────────────────────────────────────────────┘
```

---

## 4. Printable Resume (2-3 Pages)

### Design Philosophy
- **Same visual theme** as website (colors, fonts, dark mode aesthetic)
- **Condensed, focused content** - Only highlights, no deep dives
- **2-3 page format** (A4/Letter size)
- **Print-optimized** (high contrast, grayscale-friendly fallback)
- **QR code** (optional) linking to online portfolio

### Print Resume Structure

**PAGE 1: Header & Summary**
```
┌─────────────────────────────────────────────────────┐
│ GOKUL ARUNACHALAM                                   │
│ Automotive Software Architect | 10+ Years          │
│ 📧 Email | 💼 LinkedIn | 🌐 Portfolio              │
│                                                      │
│ PROFESSIONAL SUMMARY                                │
│ Modular systems architect specializing in EV       │
│ powertrains (motor control, BMS, charger).         │
│ Proven ability to design reusable middleware      │
│ stacks, reduce development cycles, and ensure     │
│ automotive-grade reliability.                      │
│                                                      │
│ CORE COMPETENCIES                                  │
│ FOC Algorithms | Motor Control | BMS Design       │
│ ASIL Compliance | Bootloader Design | Modular     │
│ Architecture | CAN/UDS | C/Python                 │
│                                                      │
└─────────────────────────────────────────────────────┘
```

**PAGE 1-2: Key Projects**
```
FEATURED PROJECTS

MOTOR CONTROLLER - Traction Inverter
• Implemented FOC algorithm with MTPA & flux weakening
• Achieved 92%+ efficiency across 50+ motor variants
• ASIL-C compliance for safety-critical traction systems
• Real-time PI tuning reduced development time by 40%

BATTERY MANAGEMENT SYSTEM
• Developed cell balancing & SOC estimation algorithms
• ±2% SOC accuracy using hybrid OCV + coulomb counting
• AIS156 compliant safety architecture
• One firmware deployed across 50+ battery configurations

CHARGER CONTROLLER
• Power electronics design with PFC & LLC converter
• Real-time BMS communication for adaptive charging
• 95%+ charging efficiency with multi-vendor compatibility
• Thermal management with load-adaptive current control

BOOTLOADER & OTA UPDATES
• Dual-bootloader architecture enabled zero-downtime updates
• Saved 8,000+ ECU boots in production deployment
• UDS protocol stack implementation with Python tooling
• 99.98% firmware update success rate
```

**PAGE 2-3: Technical Skills & Experience**

```
TECHNICAL EXPERTISE

Control Systems & Algorithms
• FOC (Field-Oriented Control), PI/PID tuning, MTPA
• SOC/SOH estimation, state machine design
• Flux weakening, load-adaptive control

Embedded Systems Architecture
• Modular BSW design (CAN TP, NVM, IO, Scheduler)
• Microcontroller HAL abstraction
• Bootloader development & OTA updates
• Real-time OS / task scheduling

Safety & Compliance
• ASIL-B/C architecture design
• ISO 26262 functional safety
• AIS156 battery safety standard
• Diagnostic services (UDS/CAN TP)

Hardware & Interfaces
• CAN/CAN-FD communication
• PWM/ADC synchronization (microsecond-level)
• High-precision current/voltage sensing
• Motor commutation & synchronization

Microcontroller Platforms
• STM32 (ARM Cortex-M), RH850 (V850)
• Arduino bootloader design, 8051/PIC (legacy)

Tools & Languages
• C/C++ (embedded), Python (tools), MATLAB (sim)
• Git, CI/CD, Unit testing (Unity/Ceedling)

PROFESSIONAL EXPERIENCE

[Company Names, Roles, Duration - simplified]
• CRISP: Motor control diversity
• ELJA ULTRA: Professional motor control engineering  
• LUCAS TVs: Automotive BLDC & STM32 ecosystem
• [Current/Recent]: EV traction systems & BMS

QUANTIFIED ACHIEVEMENTS
✓ 8,000+ production boots saved
✓ 3-4x faster ECU development cycles
✓ 50+ vehicle configurations on single firmware
✓ ±2% SOC estimation accuracy
✓ 92%+ motor efficiency achieved
✓ ASIL-C compliant systems in production
```

**PAGE 3 (Optional): Contact & Links**
```
CONTACT & LINKS
Email: gokul@example.com
LinkedIn: linkedin.com/in/gokul
Portfolio: gokul-portfolio.dev
GitHub: github.com/gokul

[QR code linking to online portfolio]
```

### Print Specifications
- **Font Size**: 10-12pt body, 14-18pt headers
- **Margins**: 0.5" on all sides
- **Color**: Full color (dark theme preserved), with grayscale fallback
- **Paper**: A4 or US Letter
- **Export Format**: PDF (downloadable from website)
- **Print Button**: "📄 Print Resume" in sticky header

---

## 5. Visual Design Specifications

### Color Scheme
```
Background: #1a1a2e (Dark navy)
Cards/Panels: #16213e (Darker navy)
Primary Accent: #0f3460 (Deep blue - EV theme)
Highlight: #00d4ff (Electric blue)
Secondary: #c0c0c0 (Silver)
Text: #e0e0e0 (Light gray)
Links: #00d4ff (Electric blue)
Warnings: #ff4757 (Red for alerts)
```

### Typography
- **Headers**: Inter, Segoe UI, or similar modern sans-serif
- **Body**: Same sans-serif for consistency
- **Code/Tech**: Courier New or Monaco (monospace)
- **Font weights**: 300 (light), 500 (medium), 700 (bold)

### Design Elements
- **Cards**: Subtle shadow, hover elevation effect
- **Buttons**: Electric blue background, white text
- **Icons**: Feather icons or similar minimalist set
- **Diagrams**: SVG format (scalable, crisp)
- **Animations**: Smooth transitions, fade-ins on scroll
- **Modal**: Full-screen overlay with 90vw max-width
- **Mobile**: Touch-friendly, tap-to-expand sections

---

## 6. Interactive Features

### Modal Behavior
- **Trigger**: Click "EXPLORE" on project card
- **Animation**: Smooth fade-in from center
- **Content**: Scrollable if longer than viewport
- **Close**: × button (top-right), ESC key, outside click
- **Navigation**: ← Back to Projects, Next Project → (arrows)

### Scroll Behavior
- **Smooth scrolling**: Natural momentum scrolling
- **Sticky header**: Always visible (logo, print button, contact)
- **Scroll indicators**: Visual cue showing position on page
- **Anchor links**: Click a skill tag → scroll to related project modal

### Responsive Design
- **Desktop** (1200px+): Full 3-column grid for projects
- **Tablet** (768px-1199px): 2-column grid
- **Mobile** (320px-767px): 1-column stack, full-width cards
- **Print**: Optimized for A4/Letter, card layout maintained

### Performance
- **Fast load times**: Lazy-load project details
- **Optimized images**: SVG for diagrams, WebP for photos
- **Code splitting**: Load modal content on demand
- **Caching**: Browser cache for repeated visits

---

## 7. Content Messaging

### For Technical Recruiters
- Show technical depth (FOC, ASIL, control systems)
- Highlight measurable impact (8,000 boots, 3-4x speedup)
- Demonstrate problem-solving (dual-bootloader, SOC algorithms)
- Prove reliability (production deployments, compliance)

### For HR / Hiring Managers
- Establish senior/architect-level thinking
- Show ability to solve complex problems
- Demonstrate cross-functional impact
- Highlight growth & learning mindset

### For Team Leads / Peers
- Modular design philosophy
- Reusability as scaling strategy
- Technical mentorship evidence
- Open-source contributions (if any)

---

## 8. Modal Content Strategy

**Each Modal Should Answer:**
1. **What was the project?** (1-2 sentences)
2. **What did I do?** (8-10 specific bullet points)
3. **What technologies did I touch?** (8-12 tagged pills)
4. **What skills does this demonstrate?** (4-6 categories)
5. **What was the business impact?** (3-5 quantified metrics)
6. **Technical depth** (optional: case study PDF or writeup link)

**Visual Elements in Modal:**
- Block diagram (architecture/system overview)
- Technology tags (clickable, for portfolio-wide filtering)
- Impact metrics (gauges, progress bars, or numbers)
- "Learn more" link (to deep-dive documentation if available)

---

## 9. Navigation & User Flow

### Recruiter Flow (5 min visit)
```
Land on homepage
→ Read value prop
→ Skim project cards
→ Click 1-2 project modals (quick scan)
→ Download resume PDF
→ Done
```

### Engineer/Technical Manager Flow (15-20 min visit)
```
Land on homepage
→ Study architecture section
→ Deep-dive into Motor Controller modal
→ Explore technical details, block diagram
→ Click related projects (bootloader, etc.)
→ Read skills grid
→ Download PDF for reference
→ Potentially reach out
```

### Print-to-PDF Flow
```
Click "Print Resume" button
→ Browser print dialog opens
→ PDF optimized version appears
→ User saves as PDF or prints
```

---

## 10. SEO & Discoverability

### Meta Tags
- **Title**: "Gokul Arunachalam - Automotive Software Architect | EV Systems"
- **Description**: "Modular systems architect with 10+ years in automotive embedded software. Expertise in motor control, BMS, bootloaders, and ASIL compliance."
- **Keywords**: Automotive software, FOC algorithm, ASIL, BMS, EV, embedded systems

### Open Graph (for social sharing)
- Preview image: Professional headshot or branded graphic
- Description: Value proposition (2-3 sentences)

### Structured Data (Schema.org)
- Person schema (name, title, contact)
- Project schema (project descriptions, impact metrics)

---

## 11. Technical Stack Recommendations

### Frontend
- **Framework**: React or Vue.js (component-based modals)
- **Styling**: Tailwind CSS or SCSS (responsive, dark mode)
- **Animations**: Framer Motion (smooth transitions)
- **Diagrams**: SVG (native) or Excalidraw (embedded)
- **PDF Export**: jsPDF or react-pdf

### Hosting
- **GitHub Pages** (simple, free)
- **Vercel or Netlify** (CI/CD, performance)

### CMS
- Markdown files (current approach)
- Optional: Headless CMS for easier content updates

### Analytics
- Google Analytics (track visitor behavior)
- Session tracking (which modals are most viewed?)

---

## 12. Content Priorities & Launch Plan

### MVP Launch (Week 1-2)
- ✓ Hero section
- ✓ Architecture overview
- ✓ 3 project cards (Motor, Charger, BMS)
- ✓ Basic modal functionality
- ✓ Impact metrics section
- ✓ Skills grid
- ✓ Sticky header with print button
- ✓ Footer with contact info
- ✓ Responsive design (mobile-first)

### Phase 2 (Week 3-4)
- ✓ Bootloader & Connectivity project cards
- ✓ Enhanced modal with block diagrams
- ✓ PDF print optimization
- ✓ About section with journey
- ✓ Smooth scroll animations
- ✓ Keyword search/filtering (optional)

### Phase 3 (Week 5+)
- Blog section (technical articles)
- Video content (FOC explanation, deep-dives)
- Interactive diagrams (animated state machines)
- Speaking engagements / publications section
- Advanced filtering by technology

---

## 13. Accessibility Requirements

- WCAG 2.1 AA compliance
- Keyboard navigation (Tab, Arrow, ESC)
- Screen reader support (semantic HTML)
- High contrast mode support
- Focus states visible on all interactive elements
- Alt text for diagrams and images
- Captions for video content (if added)

---

## 14. Performance Targets

- **Page load time**: <2 seconds (initial)
- **Time to interactive**: <3 seconds
- **Modal open time**: <500ms
- **Print PDF generation**: <2 seconds
- **Mobile Lighthouse score**: 85+
- **Desktop Lighthouse score**: 90+

---

**Document Version:** 2.0 (REVISED: Single-Page Scrolling Model)  
**Last Updated:** June 2, 2026  
**Status:** Requirements Finalized - Ready for Development
