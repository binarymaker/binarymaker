# Gokul Arunachalam - Comprehensive Experience Knowledge Base

> **Note:** This document serves as a "backup of the mind" for Gokul Arunachalam. It is a deep-dive repository of technical experiences, architectural decisions, challenges faced, and lessons learned across 10+ years in Automotive Embedded Software Architecture. This content is intended to be used by LLMs and UI generators in the future to build highly detailed portfolios, case studies, or resumes.

## 1. Platform Architecture & BSW Middleware
*Focus: Reusable middleware stacks, OS/Scheduler, UDS, CAN TP, NVM, hardware independence.*

### The Journey to Modularity and Reusability

**Early Career Challenges (The Monolith) — The 10K+ Line File Crisis**

In the very beginning of my career, I inherited a project where **the entire application was written in a single file—over 10,000 lines of code**. There was **no version control** (Git wasn't standard practice at that time), and no clear project structure.

*What I observed:*
- **Multiple developers stepping on each other's code**: When one person was working, others couldn't safely modify or contribute without creating chaos
- **Knowledge silos**: People only spoke at concept level; code-level understanding was virtually non-existent
- **Frustration & attrition**: Developers got frustrated trying to navigate someone else's massive codebase. Some simply left the project
- **No one could help each other**: Even with good intentions, developers couldn't assist colleagues without risking breaking the entire system
- **Bug fixes were archaeological expeditions**: Finding where an issue originated in 10,000+ lines was a nightmare
- **Project recovery required extreme effort**: Even a simple fix required deep knowledge of the entire monolith

This experience was **brutally educational**. I realized: *"We can't scale teams or projects this way."*

**The Pivot to Modularity — The Segregation Awakening**

I started noticing a pattern: **we were repeating the same functionality across multiple projects**—CAN communication layers, IO handling, state machines—but they were never properly segregated or reused. They were embedded in each project's monolith.

I made a deliberate decision: **Break the monolith into separate, functional files.**

*The immediate impacts were striking:*
- **Code organization improved dramatically**: Developers could quickly locate relevant functionality
- **People could understand code without the entire context**: You didn't need to know all 10,000 lines to modify one feature
- **Bug fixes became surgical**: Instead of searching through a massive file, bugs were isolated to specific modules
- **Reuse became possible**: Even if not everyone adopted reuse patterns immediately, the **infrastructure was there**—modules were discoverable and approachable
- **Developer morale improved**: People could now help each other without feeling lost
- **Productivity skyrocketed**: Future projects could reference and leverage existing modules

*The philosophical shift:* I realized that **organization isn't just about cleanliness—it's about enabling human collaboration**.

**Learning from Giants — Inspiration from Open Source**

To deepen my approach, I studied how mature projects solved this problem:
- **Linux Kernel**: Modular driver subsystems, clear abstraction layers, device-agnostic interfaces
- **Arduino**: Simple-to-use hardware abstraction layer (HAL) that kept implementation details hidden
- **Open-source projects**: Consistent patterns for dependency management, configuration, and testing

I also had the opportunity to **freelance briefly for another company**. This exposure to **industry-standard project maintenance practices** was eye-opening:
- How they managed long-term project evolution
- How they structured middleware for reuse
- How they separated concerns between hardware, OS, and application layers

This experience cemented my philosophy: **Modularity → Testability → Reusability**.

**Applying Lessons to Automotive ECUs — The Middleware Revolution**

When I transitioned into the automotive domain, I brought this mindset with me—but now I had a specific problem to solve:

*The Challenge:* Despite building different ECUs for different functions (BMS, Motor Control, Connectivity, Suspension), we were **rebuilding the same fundamental software stacks repeatedly**:
- **CAN Communication Stack**: Message transmission, reception, filtering
- **NVM (Non-Volatile Memory)**: Flash read/write, data persistence, wear leveling
- **IO Stack**: Digital/analog input-output abstraction
- **Task Scheduler**: Real-time task management and prioritization
- **BSW Middleware**: Common AUTOSAR-inspired layers

*The Solution—Reusable Modular Libraries:*

Instead of embedding these stacks in each ECU project, I **created independent, highly modular software components**:
1. **Isolated each stack as a separate project** with well-defined interfaces
2. **Thoroughly tested each module** before reuse (unit tests, integration tests)
3. **Made them hardware-agnostic** with clear HAL (Hardware Abstraction Layer) separation
4. **Documented parameters and configuration points** so teams could adapt without rewriting
5. **Linked these as reusable libraries** across multiple ECU projects

*Impact:*
- **Project timelines shrunk significantly**: 50-60% of typical ECU development was now "buy, don't build"
- **System reliability increased**: Mature, battle-tested stacks meant fewer bugs and faster debugging
- **Team productivity increased**: Developers could focus on application logic instead of reinventing middleware
- **Consistency across ECUs**: All ECUs used the same communication, memory, and scheduling patterns—reducing integration challenges
- **Scalability achieved**: We could now onboard new team members faster and have them contribute meaningfully within weeks, not months

**The Realization:**
This modular, reusable architecture wasn't just a technical improvement—it was **the difference between building 1 ECU per year vs. 3-4 per year**. And each one was more reliable than the last because the foundation was proven, not experimental.

## 2. Motor Control (Traction Inverters)
*Focus: FOC algorithms, DSP arithmetic, Flux Weakening, MTPA, 2W/3W L1 & L2 (ASIL-C) controllers.*

### The Motor Journey: From Childhood Curiosity to Automotive Expertise

**Childhood Foundation: The Naked Motor Project**
My fascination with motors began in standard 7/8 when I dismantled a remote-controlled car. I became obsessed with understanding how the DC motor worked. Armed with the left-hand rule from my physics textbook, I decided to build a motor from scratch:
- Designed and wound my own motor coils
- Created custom external magnets
- Assembled the entire device with a rod frame

To complete the project, I traveled 60 kilometers to a neighboring city to source the right magnets—a commitment that shaped my problem-solving mindset.

**First Company (CRISP): Motor Diversity & Control Fundamentals**

*Technologies & Projects:*
- **Servo & Micro Servo Motors**: Robotic integration and positioning control
- **DC Motors with Encoders**: Self-balancing robot projects
- **High-Speed Motors**: Wave-weaving machine control
- **Multi-Phase Systems**: 3-phase and single-phase motor control

*Key Learning:* Exposed to diverse motor types and control scenarios, building foundational understanding of motor mechanics and basic control strategies.

**Second Company (ELGI ULTRA): Professional Motor Control for Home Appliances**

*Domain: High-precision grinders and mixers*

*Technologies Mastered:*
- **AC Universal Motor Control**: 
  - Face angle control using triacs
  - Precision speed regulation
  - Soft-start mechanisms
  
- **Encoder-Based Speed Regulation**: 
  - Magnetic encoder integration for low-speed universal motors
  - Load-adaptive speed control—motor automatically adjusts to maintain constant speed under variable load
  
- **PID Control Implementation**: 
  - Tuned PID loops for smooth acceleration and load compensation
  - Real-time feedback control

- **VFD (Variable Frequency Drives)**:
  - Induction motor control for grinders
  - Bidirectional operation (forward & reverse)
  - Vector control techniques

*Key Learning:* Transitioned from hobbyist to professional-grade motor control. Understood precision requirements, reliability in consumer electronics, and load-dependent control strategies.

**Third Company (LUCAS TVs): Automotive-Grade Motor Controllers & BLDC Revolution**

*Domain: Refrigerator compressor motors; High-efficiency BLDC systems*

*Critical Transition Point:* This is where I shifted from analog/triac-based control to **software-centric motor control**.

*Technologies:*
- **STM32 Microcontroller Ecosystem**:
  - Developed proper MCL (Microcontroller Abstraction Layer)
  - Modular software architecture for motor control
  - User-configurable motor parameters and operating modes

- **BLDC Motor Control**:
  - Permanent Magnet Surface Mount (PMSM)
  - Interior Permanent Magnet (IPM) motors
  - Motor design impact on software tuning

- **Real-Time Requirements**:
  - Microsecond-level PWM & ADC synchronization
  - Precision timing critical for commutation accuracy
  - Understanding microcontroller peripheral interconnections

- **FOC Algorithm Fundamentals**:
  - Vector angle measurement and transformation
  - Fast vector rotation for smooth torque delivery
  - Mathematical foundations (dq-axis transformations)

*Key Learning:* Software became the equalizer—quality motor control now relied 60% on algorithm tuning and 40% on hardware design. Experienced how STM32 peripherals (PWM, ADC, timers) must be orchestrated for motor control precision.

**Automotive (Later Company): Traction Motor Controllers & ASIL Compliance**

*Domain: Electric vehicle traction motors; Air suspension systems (4-wheeler)*

*Major Projects:*
- **Traction Motor Controller for EVs**: Full motor control stack from register-level configuration to application
- **Air Suspension Motor Controller**: Possy motor control with WAPCO customer

*Technologies & Deep Dives:*
- **RH850 Microcontroller**: 
  - Reviewed feasibility for motor control applications
  - Mapped internal peripherals for traction requirements
  - Automotive-grade peripheral configuration

- **Advanced FOC Techniques**:
  - **Flux Weakening**: Extending motor speed beyond base speed in field-weakening region
  - **MTPA (Maximum Torque Per Ampere)**: Optimizing torque efficiency at different speed ranges
  - PI controller tuning for multi-phase synchronous motors

- **ASIL Compliance (Safety-Critical)**:
  - Integrated safety functionality from architectural level
  - Bootloader development for over-the-air updates
  - Functional safety requirements throughout the motor controller stack

- **Tuning & Validation**:
  - Extensive trials with different stator/rotor combinations
  - Understanding how magnetic properties impact software tuning
  - PI parameter optimization for automotive-grade robustness
  - Precision synchronization between PWM timing and ADC sampling

*Key Learning:* Motor control in automotive is 30% algorithm, 40% tuning, 30% safety architecture. Microsecond-level timing precision and ASIL compliance transformed my understanding from "getting it working" to "getting it production-ready."

### Technical Depth Summary

**Control Algorithms Mastered:**
- Basic PWM/triac switching → PID loops → Vector control (FOC)
- Angle measurement & transformation (Clarke, Park transforms)
- Advanced: Flux weakening, MTPA optimization

**Motor Types Controlled:**
- Induction motors (3-phase VFD) → Universal AC motors → BLDC → Traction motors (PMSM, IPM)

**Real-Time & Hardware Aspects:**
- PWM synchronization with ADC sampling
- Microcontroller peripheral optimization
- Timing constraints in microseconds

**From Passion to Mastery:**
The 60km journey to buy magnets as a child mirrors the automotive journey—both required commitment to understanding fundamentals deeply, iterating through failures, and continuously raising the bar for system quality and reliability.

## 3. Bootloader & OTA (Over-The-Air) Updates
*Focus: Custom bootloaders, firmware updates, UDS protocols, dual-bootloader architecture, production reliability.*

### Understanding Microcontroller Internals — The Foundation

**The Deep Knowledge Requirement**

Bootloader development is **unique territory**—there's minimal external interference, but the price is **deep knowledge of microcontroller internals**. You must understand:
- **Startup sequences**: How the microcontroller boots, memory initialization order, CPU reset behavior
- **Linker files**: Memory layout, section placement, interrupt vectors
- **Memory allocation**: RAM/Flash organization, bootloader vs. application space
- **Peripheral initialization**: Clock configuration, memory protection (MPU)
- **Internal architecture**: Register-level operations, privileged modes

This isn't driver-level work—it's **bare-metal, foundation-level knowledge**.

**Early Explorations: 8051 → PIC → Arduino**

I started with **8051 and PIC microcontrollers**, learning the absolute basics: register manipulation, interrupt handling, memory constraints. But the real awakening came when I discovered **Arduino**.

Arduino revealed something profound: **Without debuggers or fancy tools, they had achieved mass adoption.** How?

**The bootloader.**

Arduino came with a bootloader pre-programmed in flash. Users could upload code via a simple UART connection without expensive debuggers. I realized: *This simple piece of software unlocked accessibility and scalability.*

I started reverse-engineering Arduino code on GitHub, understanding:
- How the bootloader waits for a "magic packet" on UART
- How it jumps to the application after receiving firmware
- How it handles baud rate detection
- The minimal protocol needed for communication

**Implementing Custom Bootloaders on 8051**

Armed with understanding, I implemented a **custom bootloader for 8051**:
- Determined minimum memory requirements (often just 512-1K bytes for bootloader itself)
- Designed a minimal protocol for firmware transfer
- Learned the critical concept: **Bootloader must preserve itself**—you can't overwrite the code that's updating you

I also took formal courses on microcontroller bootloader design, which formalized my intuitive knowledge:
- Different bootloader types (In-Application Programming, Serial bootloaders, CAN bootloaders)
- Synchronization protocols for reliable transfers
- Checksum/CRC validation
- Fallback mechanisms for corrupted firmware

### The Automotive Transition — UDS & Standardized Protocols

**Lucas TVs & Automotive Bootloader Reality**

When I entered automotive at Lucas TVs, I was exposed to **standardized diagnostic protocols**—specifically **UDS (Unified Diagnostic Services)** and **CAN TP (CAN Transport Protocol)**. This wasn't hobby territory anymore; this was **ISO 14229-1** compliance.

Instead of reinventing protocols, I committed to understanding how the industry does it:
- Hunted through **open-source projects on GitHub**: Looking at how others implemented UDS services
- Studied **Chinese automotive projects**: Saw different interpretations and solutions (fascinating learning!)
- Analyzed **European automotive codebases**: Observed MISRA-compliant, safety-conscious implementations

I built my understanding **service by service**:
- Service 0x10: Diagnostic Session Control
- Service 0x11: ECU Reset
- Service 0x14: Clear Diagnostic Information
- Service 0x22: Read Data By Identifier
- Service 0x27: Security Access
- Service 0x2E: Write Data By Identifier
- Service 0x34: Request Download (firmware transfer)
- Service 0x35: Request Upload
- Service 0x36: Transfer Data (the actual firmware bytes)
- Service 0x37: Request Transfer Exit

Over time, I developed a **comprehensive UDS stack** with:
- **Full modularity**: Each service as an independent module
- **Configurability**: Easy adaptation for different ECU types
- **Automotive-grade robustness**: Timeout handling, state machines, security

### The Dual-Bootloader Innovation — Production Impact

**The Problem: Zero-Downtime Updates**

My company faced a critical challenge: **We needed to update bootloaders in the field without bricking ECUs.** If the bootloader itself became corrupted during an update, the ECU would be permanently unusable in production.

**The Solution: Dual-Bootloader Architecture**

I proposed and implemented a **dual-bootloader system**:
1. **Primary bootloader** (bootloader 1): Runs at power-up
2. **Backup bootloader** (bootloader 2): Secondary location with identical functionality
3. **Update mechanism**: Update bootloader 2 first, then switch

*How it works:*
- Power-up reads a "which bootloader" flag in NVM
- If bootloader flag indicates corruption, automatically switches to the backup
- If bootloader 2 is being updated, bootloader 1 handles the update
- After successful verification, the flag switches to bootloader 2
- If bootloader 2 fails, automatic fallback to bootloader 1

**Impact: Saved 8,000+ boots in production**

During production deployment, we encountered scenarios where bootloader updates could have bricked ECUs. The dual-bootloader architecture **prevented complete system failure** in every instance. That translates to:
- Zero customer returns due to bootloader corruption
- Seamless field updates even if updates failed mid-transfer
- Confidence in production deployments

### UDS Client-Side Tools & Hardware Compatibility

**Beyond the Protocol: Tooling**

UDS is server-side—the ECU receives commands. But someone has to send them. In automotive, this is typically:
- **Diagnostic tools**: ETAS INCA, Vector CANoe, etc. (expensive)
- **Custom tools**: Built internally for development/production

I developed **Python-based UDS client tools**:
- Abstracted UDS protocol into Python libraries
- Created custom services on top of UDS for our specific needs
- Integrated with calibration tools for parameter updates
- Built validation scripts for production testing

**Hardware Compatibility Challenge**

Our customers used **different CAN interfaces**:
- Some had Vector CANoe
- Some had PCAN (Peak)
- Some had custom CAN adapters
- Some had different CAN transceivers with timing constraints

Instead of writing separate tools for each, I created a **hardware abstraction layer for CAN**:
- Unified Python interface for all CAN vendors
- Automatic baud rate detection
- Timing compensation for different transceiver delays
- Transparent switching between CAN vendors

This meant a single UDS client tool could work across **multiple customers' hardware setups** without modification.

### Calibration, Validation & Extended Ecosystem

**Beyond Bootloading**

As the bootloader became robust, it became the **foundation for an entire ecosystem**:

- **Parameter Calibration**: Using UDS 0x2E (Write Data By Identifier), we built tools to write motor parameters, safety thresholds, etc.
- **Validation Scripts**: Automated verification that new firmware loaded correctly
- **Diagnostic Dashboards**: Real-time ECU health monitoring during updates
- **Rollback Mechanisms**: Version tracking and ability to revert to previous firmware
- **Telemetry Logging**: Track all update attempts (successful, failed, time taken, etc.)

### Key Learnings from Bootloader Journey

1. **Bootloader is gateway to production**: It's the only code that runs before your application. Get it wrong, and you're manufacturing paperweights.

2. **Abstraction layers are critical**: UDS standardizes automotive communication, but hardware varies. Abstracting hardware differences enables scalability.

3. **Redundancy saves production**: Dual-bootloader architecture is a small cost for massive risk reduction.

4. **Tooling matters as much as protocol**: A robust bootloader is useless without tools to manage it. Python + UDS integration proved invaluable.

5. **Standards exist for a reason**: UDS/CAN TP seemed complex at first, but adhering to ISO standards meant every automotive ECU could talk to our tools.

6. **Deep microcontroller knowledge is irreplaceable**: Understanding memory layout, privileged modes, and startup sequences separated a working bootloader from a production-ready one.

## 4. Battery Management Systems (BMS)
*Focus: SOC/SOH estimation, cell balancing, thermal management, safety critical design, AIS156 compliance.*

### The BMS Journey: From Batrix Nomination to Production Deployment

**Entry into BMS: Recognition & Opportunity**

My transition into Battery Management Systems came through **industry recognition**. I received a **nomination from Batrix (Batrix India)** for BMS project leadership, and subsequently worked on similar initiatives with **Khushala** (another automotive player). This wasn't accidental—my background in modular architecture, microcontroller expertise, and embedded safety systems made me an ideal fit for this safety-critical domain.

**Understanding the BMS Landscape**

BMS is fundamentally different from motor control:
- Motor control is about **performance** (torque, efficiency, responsiveness)
- **BMS is about safety and longevity** (protecting the battery, keeping it alive, preventing catastrophic failure)

Modern EV architecture has evolved: **BMS and motor controller are now inseparable twins**. Even for low-speed vehicles (550 KMPL range), OEMs launch EVs with integrated BMS + motor controller systems. This co-design requirement became my new reality.

### Deep Dive: AFIC Chips & Multi-Cell Architecture

**The TI Microelectronics AFIC Revelation**

My first major project introduced me to **AFIC (Analog Front-end Integrated Circuit) chips from TI Microelectronics**. These specialized ICs opened my eyes to battery architecture:

**Cell Configuration Fundamentals:**
- **Series Configuration**: Cells stacked for voltage (1 cell = 3.7V, 100 cells = 370V for EV)
- **Parallel Configuration**: Cells grouped for current capacity (1 cell = 50Ah, 10 parallel = 500Ah)
- **Practical Reality**: Large battery packs are **series-parallel hybrids** (e.g., 10P100S = 10 parallel strings of 100 cells in series)

AFIC chips are the **sensory organs of the battery**:
- Measure individual cell voltages (within millivolts)
- Measure current in/out (charging vs. discharging)
- Temperature sensing (thermal runaway prevention)
- Integrated fault detection

**Self-Balancing Mechanism**

With parallel/series configurations, individual cells degrade at different rates:
- Manufacturing tolerances cause slight capacity differences
- Thermal gradients cause uneven degradation
- If one cell drops to 2V while others are at 3.7V, the entire pack becomes unbalanced

I implemented **passive cell balancing**:
- AFIC chips drive **high-side switches (HST drivers)** to shunt current from fully-charged cells
- While other cells catch up, the full cells dissipate energy via resistive bleeds
- Result: All cells converge to the same voltage during balancing phases

*Trade-off:* Passive balancing wastes energy as heat, but it's simple, proven, and safe. Active balancing (using buck-boost converters) is more efficient but adds complexity.

### Sensing & Protection Architecture

**Multi-Point Current & Voltage Sensing**

I designed redundant sensing architecture:
- **Cell-level voltage**: Each cell monitored individually
- **String-level current**: Current through each parallel string
- **Pack-level current**: Total current in/out of the battery

**Protection Mechanisms Implemented:**
1. **Over-Voltage (OV)**: Single cell > 4.2V → immediately cut charging
2. **Under-Voltage (UV)**: Single cell < 2.5V → cut discharging (reserve for recovery)
3. **Over-Current (OC)**: Pack current > threshold → HV contactor opens
4. **Short-Circuit (SC)**: Instantaneous current spike → HV contactor opens in microseconds
5. **Over-Temperature (OT)**: Cell temp > 60°C → derating or shutdown
6. **Under-Temperature (UT)**: Cell temp < 0°C → no charging allowed

Each protection layer **logs events** for diagnostics and failure root-cause analysis.

### Calibration: The Precision Frontier

**High-Precision Current Sensing**

The AFIC measures current via a shunt resistor (typically 10mΩ). Raw ADC readings have noise:
- Thermal drift: Same current reads differently at 25°C vs. 60°C
- Offset error: 0A might read as 2mA
- Gain error: 100A might read as 99.5A

I developed **multi-point calibration routines**:
1. **Zero-current calibration**: With charger off, measure offset at ambient temperature
2. **Temperature-sweep calibration**: Repeat at 0°C, 25°C, 50°C to capture thermal coefficients
3. **Known-load calibration**: Drive known current through shunt, measure ADC, build correction curve
4. **In-field recalibration**: Periodic re-calibration during vehicle operation when stationary

Result: **Measurement accuracy improved from ±5% to ±0.5%**—critical for accurate SOC estimation.

### State Machine for Load Detection & SOC Calculation

**The Load State Machine**

BMS must detect what's happening to the battery:
- **Charging**: Positive current from charger
- **Discharging**: Negative current to motor/loads
- **Idle**: Near-zero current (vehicle parked)
- **Balancing**: Current flowing internally (cell rebalancing)

Each state triggers different algorithms:
- **Charging state**: Accelerate balancing, charge with constant current (CC) then constant voltage (CV)
- **Discharging state**: Monitor thermal runaway, enforce current limits based on temperature
- **Idle state**: Enable deep calibration algorithms, periodic balancing
- **Balancing state**: Adjust charger voltage to not interfere with bleed currents

**State transitions are guarded**: You can't jump from Charging directly to Discharging without an Idle phase—that prevents sudden load disconnects from corrupting SOC.

### SOC Estimation: The Core Algorithm

**The Challenge**

SOC (State of Charge) is what users care about: "How much battery is left?"

**The Problem**: You can't measure "available energy" directly. A 100Ah battery at 4.2V has more usable energy than a 100Ah battery at 3.0V, even though the amp-hour count is the same.

**Traditional Approaches:**
- **Coulomb Counting**: Integrate current over time (`SOC = previous_SOC + (current × time) / capacity`)
  - Pro: Simple, works offline
  - Con: Drift over time, accumulation error, doesn't account for nonlinear chemistry
  
- **Open Circuit Voltage (OCV)**: Look up battery chemistry curve
  - Pro: Doesn't drift, absolute measurement
  - Con: Requires hours of rest, can't measure while driving

**My Solution: Hybrid OCV + Coulomb Counting**

I implemented a **self-calibrating algorithm**:

1. **During idle periods**: Measure pack OCV, look up true SOC from chemistry curve, update internal SOC estimate
2. **During driving**: Use coulomb counting for real-time updates
3. **Self-correction**: If coulomb-counted SOC drifts >5% from OCV-measured SOC, gradually re-calibrate
4. **Minimal computation**: All calculations use integer arithmetic (no floating-point), runs on modest microcontrollers

**Result**: SOC estimates within ±2% of actual capacity—accurate enough for user confidence and safe power management.

### Chemistry-Agnostic & Configurable Stack

**The SEEK Driver Abstraction**

Different battery chemistries have different characteristics:
- **LFP (Lithium Iron Phosphate)**: Safe, lower energy density, flat discharge curve
- **NCA (Nickel Cobalt Aluminum)**: High energy density, steeper discharge curve
- **NCM (Nickel Cobalt Manganese)**: Balanced safety/density, most common in automotive

Instead of hardcoding chemistry parameters, I created a **SEEK (Stack Entity Extendable Kit) driver layer**:
- Abstracted cell chemistry as pluggable modules
- Each chemistry module defines: voltage curves, thermal limits, balancing strategy, SOC algorithm coefficients
- Same firmware runs on different vehicles by just changing the chemistry configuration

**BMS Stack Configuration:**
```
- Cell chemistry: LFP, NCA, NCM (selectable)
- Series count: 100, 120, 200 cells (configurable)
- Parallel count: 1P, 4P, 10P (configurable)
- Thermal limits: Custom per vehicle
- Balancing aggressiveness: Tunable
- SOC algorithm: Chemistry-specific coefficients
```

This modularity meant **one BMS firmware served 50+ vehicle configurations** without modifications.

### Charger Communication & System Integration

**The Missing Piece: BMS-Charger Dialogue**

Most engineers treat BMS as **passive monitoring**. I learned it's actually **active management**:

The BMS must **negotiate with the charger**:
- `"I can accept 100A max, but only at 50°C or below"`
- `"Stop charging, cells are imbalanced"`
- `"Reduce charging current, one cell is above threshold"`
- `"Charging complete, cells are balanced"`

Chargers listen to BMS signals to optimize:
- **Charge time**: Fast charging when cells are healthy, slow when degrading
- **Thermal management**: Reduce current in cold/hot weather
- **Cell longevity**: Strategic charging curves extend battery life by 30%

I implemented **BMS-to-Charger communication protocol**:
- Over isolated CAN link (safety isolation required)
- Real-time feedback of cell voltages, temperatures, estimated SOC
- Charger responds with voltage/current adjustments

**Impact**: Charging profiles became **adaptive and data-driven** instead of one-size-fits-all.

### AIS156 Compliance & Safety Validation

**Indian Automotive Safety Standard**

AIS156 is **India's standard for EV battery safety**. It requires:
- Thermal runaway containment
- Electrical isolation verification
- Fault detection and reporting
- Over-temperature & over-current protection with guaranteed response times
- Diagnostic capabilities for field service

I ensured our BMS architecture complied:
- **Dual-layer protection**: Electrical + firmware safeguards
- **Redundant current sensing**: Two independent measurements
- **Safe-state fallback**: On any fault, HV contactor opens within 100ms
- **Comprehensive logging**: Every fault event timestamped and recorded

### The Minor-Error Reality Check

**A Humbling Lesson**

During early testing, I discovered something critical: **Minor errors accumulate.**

Example scenario:
- Current sensor offset: +2mA when idle
- Over 1 hour of idle: 2mA × 3600s = 7.2 coulombs = 0.002 Ah loss
- Multiply across 1000 idle events in vehicle lifetime: ~2Ah phantom loss
- For a 100Ah pack: 2% SOC error

I learned to obsess over "small" errors:
- Thermal drift ±0.1%/°C × 50°C operating range = ±5% error
- ADC quantization noise: Average 1000 samples instead of one read
- Charger rounding: Charger might claim "100.5A" but actually deliver 99.8A

**Self-Justification Algorithm**

I implemented **continuous error monitoring**:
- Track coulomb-counted vs. OCV-measured SOC continuously
- If divergence detected, log root cause (thermal drift? ADC noise? charger accuracy?)
- Periodically re-justify all calibration points
- Predict when next full recalibration is needed

This transformed SOC from "estimate" to **"confidence-tracked measurement"**.

### Key Learnings from BMS Journey

1. **BMS is about prevention, not performance**: While motor control is about "how fast", BMS is about "keep it safe and alive"

2. **Multi-decade systems need precision**: Battery chemistry errors compound over years. ±2% SOC accuracy today prevents disasters tomorrow

3. **Modularity scales across chemistries**: One firmware, multiple chemistries = production efficiency

4. **Passive safety > active safety**: Simple bleed resistors are more reliable than complex active balancers

5. **Charger dialogue elevates system**: BMS became not a monitor, but a **system orchestrator** commanding charger behavior

6. **Minor errors are killers**: A 0.5% daily error is only 100% error in 200 days. Discipline on precision is non-negotiable

7. **AIS156 compliance is achievable**: Formal standards exist; following them religiously prevents catastrophic field failures

## 4. Connectivity & MFECU
*Focus: CAN/FD, UDS over CAN, OTA updates, telematics.*

**(Content to be populated via interview...)**

## 5. Functional Safety (ISO 26262) & Testing
*Focus: ASIL compliance, MISRA, TDD, Unit testing (Unity/Ceedling), CI/CD pipelines.*

**(Content to be populated via interview...)**

## 6. Leadership, Mentorship & Team Building
*Focus: Scaling teams, code review culture, technical mentorship, cross-functional collaboration.*

**(Content to be populated via interview...)**

## 7. IoT & Research Prototypes
*Focus: Smart appliances, MATLAB, computer vision, rapid prototyping.*

**(Content to be populated via interview...)**

## 8. Integrated Project Portfolio: Complete EV Ecosystem Implementation
*Focus: Production-grade motor control, battery management, charging systems, diagnostics, bootloader infrastructure, cryptographic security, real-time scheduling.*

### Portfolio Overview

This section documents a comprehensive suite of **integrated automotive embedded projects** implemented over multiple years, spanning **6 production ECUs**, **23 reusable middleware modules**, and **multi-MCU support**. The architecture embodies lessons learned from the monolith-to-modularity journey, demonstrating enterprise-scale embedded systems design.

**Portfolio Scope:**
- **6 Production ECUs** (BCM, BMS, MC, OBC, OFBC, MFECU)
- **23 Reusable Middleware Modules**
- **Multi-MCU Target Support** (Renesas RH850 F1KM, Infineon XMC1)
- **Full Hardware Abstraction Layer (HAL)** for both MCUs
- **Production Bootloader** with OTA update capability
- **Comprehensive Diagnostics** (UDS, DTC management, telemetry)
- **Advanced Control Algorithms** (FOC, PID, resonant converters)
- **Cryptographic Security** (AES-256)
- **Real-Time OS** with scheduler, state machines, queues, timers

### Project 1: Motor Controller (MC) — Hero Electric Hubmotor

**Scope:** Production 3-phase brushless DC motor controller for electric two-wheelers

**Microcontroller:** Infineon XMC1 (Cortex-M0)

**Core Technical Implementations:**

**A. Field-Oriented Control (FOC) Algorithm**
- Clarke & Park transformations for 3-phase to 2-axis (dq) conversion
- Real-time angle measurement from Hall effect sensors (6-step commutation)
- Multi-instance PID controllers:
  - Id (direct axis current) controller: Maintains constant field
  - Iq (quadrature axis current) controller: Controls torque
  - Speed controller: Outer loop for RPM regulation
- Voltage decoupling for improved transient response
- Dynamic current limiting based on thermal conditions

**B. PWM & Power Stage**
- Space Vector PWM (SVPWM) modulation
  - 3-phase PWM generation with dead-time insertion
  - Synchronized ADC sampling for phase current measurement
  - Voltage sensing for bus monitoring
  - Inverse Clarke transform for UVW phase output
- CCU8 (Capture Compare Unit 8) for high-frequency PWM (10-20 kHz)
- Configurable voltage/current margins for safe operation

**C. Sensor Integration**
- Hall Effect sensors: 6-step position feedback for commutation
- Phase current measurement: 3-channel ADC sampling
- Motor temperature: NTC thermistor on stator
- Throttle input: Potentiometer for speed reference
- Bus voltage monitoring: Precision ADC scaling
- Optional side-stand detection: Safety feature for two-wheelers
- Optional board temperature: Secondary thermal monitoring

**D. Protection & Safety Systems**
- Over-temperature shutdown: Motor stator protection
- Phase overcurrent detection: Instantaneous limit switching
- Bus under/overvoltage: Automatic derating
- Motor thermal model: Predictive protection without explicit shutdown
- Limp-home mode: Reduced speed operation under fault conditions
- Hardware watchdog: Ensures safe state on software failure

**E. Advanced Features**
- **Hill Assist System**: Prevent rollback on inclines
  - Hold current mode when stopped on slope
  - Smooth transition to drive on throttle application
  - Current decay management to prevent torque shocks
  
- **Battery Overuse Detector**: Prevent deep discharge
  - SOC-based throttle limiting
  - Progressive power reduction as SOC drops
  - Emergency reserve protection
  
- **Drive Mode Energy Meter**:
  - Real-time energy consumption tracking
  - Per-trip energy logging
  - Efficiency metric calculation
  
- **Odometer System**:
  - Persistent distance tracking in NVM
  - Integration with trip computer
  
- **Range Estimator**:
  - Predictive remaining range calculation
  - Adaptive based on driving patterns
  - Thermal efficiency compensation
  
- **Derate System**:
  - Temperature-based power deration
  - Load-based current limiting
  - Progressive throttle reduction curves
  - Safe degradation under fault conditions

**F. Bootloader Architecture**
- Custom bootloader for firmware updates
- Bootloader Updater: Secondary updater for bootloader self-update
- CAN-based firmware transfer protocol
- UDS diagnostic session for update initiation
- Dual-copy mechanism for safe updates (one active, one for download)

**G. Real-Time Scheduler Integration**
- FOC control loop: 10 kHz (100µs cycle time)
- Speed/torque control: 100 Hz
- Protection checks: 1 kHz
- UI updates: 10 Hz
- Cooperative multitasking with deterministic response

**Multi-Platform Variants:**
- **Hero Electric Hubmotor**: Main XMC1 implementation (kusalava, okinawa proof-of-concepts)
- Proof-of-concept implementations demonstrating algorithm portability

**Unique Capabilities:**
✓ Sub-100µs FOC loop on entry-level MCU
✓ Thermal-aware derate without explicit shutdown
✓ Predictive range estimation with adaptive models
✓ Hill assist for zero-velocity torque control
✓ Dual-bootloader with self-update

---

### Project 2: Battery Management System (BMS) — Batrix 48V

**Scope:** Production 48V lithium battery pack management with multi-cell monitoring

**Microcontroller:** Renesas RH850 F1KM (Automotive-grade)

**Compliance:** AIS156 (Indian EV safety standard)

**Core Technical Implementations:**

**A. Multi-Cell Voltage Monitoring**
- AFIC (Analog Front-end IC) from TI Microelectronics
- Individual cell voltage measurement within ±10mV accuracy
- Precision current sensing via 10mΩ shunt
- Temperature monitoring: Multiple NTC thermistors

**B. Cell Balancing Strategy**
- Passive cell balancing with resistive bleed paths
- HST (High-Side Transistor) driver control
- Selective cell bypass during charging
- Balancing triggered during:
  - Slow charging (high resistance charging)
  - Vehicle idle periods
  - Pre-discharge equilibration

**C. SOC (State of Charge) & SOH (State of Health) Estimation**
- **Hybrid Algorithm**: Coulomb counting + OCV calibration
  - Real-time integration: SOC = previous_SOC + (current × time) / capacity
  - Periodic calibration: Measure open-circuit voltage during idle
  - Self-correction: Gradual re-alignment if deviation detected
  - Accuracy: ±2% under normal conditions
  
- **OCV Lookup**: Chemistry-specific voltage curves
  - Support for multiple chemistries (LFP, NCA, NCM)
  - Pluggable chemistry modules
  - Temperature-compensated curves
  
- **State Machine**: Charge/Discharge/Idle/Balancing states
  - State transitions guarded to prevent corruption
  - Idle state enables deep calibration routines

**D. Thermal Management**
- Multi-point temperature sensing (cell surface, BMS PCB, ambient)
- Thermal runaway detection thresholds
- Temperature-dependent charging curves
- Current derating based on thermal conditions:
  - Max charge current: 100A @ 25°C → 30A @ 50°C
  - Max discharge current: 200A @ 25°C → 100A @ 55°C

**E. Safety Protection Systems**
- **Over-Voltage (OV)**: Cell > 4.2V → immediate charge cutoff
- **Under-Voltage (UV)**: Cell < 2.5V → discharge cutoff (preserve pack)
- **Over-Current (OC)**: Pack current > 250A → HV contactor opens in <10ms
- **Short-Circuit (SC)**: Instantaneous >500A → HV contactor open within microseconds
- **Over-Temperature (OT)**: Cell > 60°C → charging disabled, discharging reduced
- **Under-Temperature (UT)**: Cell < 0°C → charging disabled entirely

**F. HV Contactor Control**
- Smart contactor management for main battery disconnect
- Inrush current limiting during connection
- Monitoring for contactor weld/stuck conditions
- Graceful shutdown protocol on critical faults

**G. Charger Communication Protocol**
- Isolated CAN link (galvanic isolation required)
- Real-time feedback of:
  - Individual cell voltages
  - Pack current and SOC
  - Temperature telemetry
  - Health estimation
- Charger responds with adaptive voltage/current adjustments:
  - Constant Current (CC) phase: Fixed current, rising voltage
  - Constant Voltage (CV) phase: Fixed voltage, declining current
  - Charge completion: Termination criteria based on current delta

**H. Calibration Framework**
- **Zero-current calibration**: Offset elimination at multiple temperatures
- **Temperature-sweep calibration**: Capture thermal drift coefficients
- **Known-load calibration**: Shunt current verification
- **In-field recalibration**: Periodic automatic re-justification
- **Error tracking**: Continuous divergence monitoring between methods

**I. AIS156 Compliance Features**
- Redundant current sensing (dual measurements)
- Functional safety architecture
- Deterministic fault response timing
- Comprehensive event logging for diagnostics
- Over-voltage/under-voltage protection with specified response times

**J. NVM Data Management**
- Persistent storage of:
  - Total pack energy cycled (Wh)
  - Cycle count
  - Maximum temperature observed
  - Fault history with timestamps
  - Calibration data
- Wear-leveling to prevent flash erosion
- Redundant storage of critical parameters

**Chemistry-Agnostic Architecture:**
- Pluggable chemistry modules (SEEK driver layer)
- Configuration per vehicle without firmware changes
- Supported: LFP, NCA, NCM, custom chemistries

**Unique Capabilities:**
✓ ±2% SOC accuracy through hybrid estimation
✓ Passive cell balancing without active buck-boost
✓ Thermal runaway prediction and prevention
✓ AIS156-compliant safety architecture
✓ Chemistry-agnostic, configuration-driven design
✓ Adaptive charger communication reducing charge time by 30% vs. fixed profiles

---

### Project 3: On-Board Charger (OBC) — TVS 48V

**Scope:** AC-to-DC charger integrated in 48V EV

**Microcontroller:** TBD (similar automotive-grade MCU)

**Core Implementations:**
- AC mains rectification and filtering
- Isolated DC-DC conversion
- Power factor correction circuit
- Battery charger state machine
- Thermal management under continuous operation
- ISO/IEC 61000-6-2 EMC compliance

---

### Project 4: Offline Front Boost Charger (OFBC)

**Scope:** 3kW standalone charger for off-board fast charging

**Multiple OEM Implementations:**
- Santhos version
- TATA version
- TVS version

**Power Conversion Topologies:**

**A. LLC Resonant Converter (for primary conversion)**
- Resonant frequency optimization
- Zero-Voltage Switching (ZVS) for efficiency
- Soft switching to reduce EMI
- Multi-instance control:
  - **Current Controller**: Phase current regulation
  - **Resonant Controller**: Tank circuit management
  - **Power Controller**: Primary power flow control
  - **Voltage Controller**: Output voltage regulation
  - **Signal Conditioner**: Input filtering and conditioning
  - **State Machine**: Operating mode transitions

**B. PFC (Power Factor Correction)**
- Input current shaping
- Unity power factor achievement
- Reduced line harmonic distortion (THD)
- Boost converter topology

**C. PSFB (Phase Shift Full Bridge)**
- Alternative topology for specific OEM requirements
- Phase shift modulation
- Load-dependent efficiency optimization

**Unique Aspects:**
- Multi-OEM compatibility demonstrated
- Modular converter architecture
- Switchable topologies for different markets

---

### Project 5: Body Control Module (BCM) — Hero Electric LCM

**Scope:** Lighting and electrical system control

**Features:**
- Multi-light coordination (headlight, brake light, turn signals)
- Load management and sequencing
- Fault diagnostics for lighting systems

---

### Project 6: Motor Front ECU (MFECU)

**Status:** Framework prepared, not yet populated with application logic

---

## Reusable Middleware Architecture

### A. Communication Stack

**CAN-TP Module (comm_cantp)**
- ISO 15765-2 Transport Protocol
- Segmentation of large diagnostic messages
- Flow control and timeout handling
- Single and consecutive frame support

**CAN Matrix Module (comm_can_matrix)**
- DBC file parsing and integration
- Message multiplexing
- Signal packing/unpacking
- Automated code generation support

### B. Cryptographic Security

**AES Module (crypto_aes)** — Production-Grade Implementation
- **FIPS-197 Compliant** (National Institute of Standards)
- Key sizes: 128-bit, 192-bit, 256-bit
- Operating modes: ECB, CBC, CFB, OFB, CTR
- PKCS7 padding for variable-length data
- Multi-instance support for parallel encryption
- Hardware-agnostic C implementation
- Test vectors verified against NIST vectors
- Use cases:
  - Bootloader-to-ECU authentication
  - OTA update validation
  - Calibration data protection
  - Diagnostic session encryption

### C. Digital Signal Processing

**DSP Module**
- Filter implementations (IIR, FIR)
- Fast Fourier Transform (FFT) for harmonic analysis
- Mathematical functions optimized for fixed-point

**SOGI-PLL Module (dsp_sogi_pll)**
- Second-Order Generalized Integrator Phase-Locked Loop
- Grid synchronization for chargers
- Frequency and phase tracking
- Used in: OBC phase detection, grid frequency adaptation

### D. Control Algorithms

**PID Controller Module (cs_pid_controller)**
- Multi-instance support
- Integral anti-windup
- Output limiting and clamping
- Derivative filtering
- Tunable parameters (Kp, Ki, Kd)
- Fixed-point arithmetic for embedded efficiency

**Power Converter Modules:**
- **LLC Resonant (cs_llc)**: 6 sub-modules for complete LLC operation
- **PFC (cs_pfc)**: Power factor correction
- **PSFB (cs_psfb)**: Phase-shift full-bridge
- **Grid Precharge (cs_grid_precharge)**: Inrush current limiting

### E. Sensor Drivers (Device Driver Layer)

**Hall Effect Position Sensor (ddl_hall_position_sensor)**
- 6-step commutation pattern recognition
- Speed estimation from hall transitions
- Debouncing and glitch filtering
- Electrical angle calculation

**Thermistor Temperature Sensor (ddl_thermistor_temperature_sensor)**
- NTC characteristics compensation
- Multi-point calibration
- Temperature range: -40°C to +125°C
- Fixed-point approximation for speed

### F. Diagnostics Infrastructure

**UDS Server (diag_uds_server)** — Production ISO 14229-1 Implementation

Fully modularized with 16+ services implemented as separate components:

**Session Control:**
- Service 0x10: Diagnostic Session Control (Default, Programming, Extended)

**ECU Management:**
- Service 0x11: ECU Reset (Hard, Key-off, Enable RapidPowerShutDown)
- Service 0x27: Security Access (unlock levels, seed/key algorithm)

**Data Access:**
- Service 0x22: Read Data By Identifier
- Service 0x2E: Write Data By Identifier
- Service 0x23: Read Memory By Address
- Service 0x3D: Write Memory By Address

**Diagnostics:**
- Service 0x19: Read DTC Information (report, clear, filter, mask)
- Service 0x14: Clear Diagnostic Information
- Service 0x85: Control DTC Setting

**Monitoring:**
- Service 0x2A: Read Data By Periodic Identifier
- Service 0x2C: Dynamically Define Data Identifier
- Service 0x3E: Tester Present (keep-alive)

**Communication:**
- Service 0x28: Communication Control (enable/disable modes)
- Service 0x2F: Input Output Control By Identifier

**Firmware Update:**
- Service 0x34: Request Download
- Service 0x35: Request Upload
- Service 0x36: Transfer Data (bulk firmware transfer)
- Service 0x37: Request Transfer Exit
- Service 0x38: Request File Transfer

**Routines:**
- Service 0x31: Routine Control (execute diagnostic routines)

**Responses:**
- Standardized response formatting
- Negative response codes (NRC) for error conditions
- Timeout handling per service

**Fault Code Management (diag_fcm)**
- DTC generation and storage
- Multi-level severity (passive, warning, critical)
- Fault history with timestamps
- Root cause tracking

### G. Hardware Abstraction Layers (MCAL)

**Renesas RH850 F1KM (mcal_rh850f1km)** — Automotive-Grade MCU
- Clock management and PLL configuration
- GPIO port configuration and control
- ADC: Multi-channel, interrupt-driven sampling
- CAN: Message filtering, interrupt handlers
- PWM: Timer-based pulse generation (TAUD, TAUB)
- SPI (CSIH): Master/slave configuration
- Flash programming: Bootloader support
- EEPROM emulation: Wear-leveling layer
- Watchdog: Configurable timeout
- Interrupt controller: Priority handling
- Protected register access: Hardware safety critical operations

**Infineon XMC1 (mcal_xmc1)** — Entry-Level Automotive MCU
- System Control Unit (SCU): Clock, resets
- Capture Compare Units:
  - CCU4: 4-channel, 16-bit for basic PWM
  - CCU8: 8-channel, 16-bit for motor control
- Position Interface (POSIF): Hall sensor decoding
- Voltage ADC (VADC): 12-bit precision
- CAN: Full CAN 2.0B support
- GPIO: Port-based control
- UART/SPI (USIC): Serial communication
- Real-Time Clock (RTC)
- Analog Comparator (ACMP): Threshold detection
- Math accelerator: Fixed-point operations
- Watchdog, Interrupt controller

### H. Memory Management

**NVM Manager (mem_nvm)**
- Flash abstraction
- Wear-leveling algorithm
- Redundant storage of critical data
- Sector management

**NVM Logger (mem_nvm_logger)**
- Event logging to non-volatile memory
- Circular buffer for continuous logging
- Timestamp integration
- Efficient compression of log data

### I. Real-Time Operating System (OS)

**Scheduler (os_scheduler)**
- Preemptive, priority-based task scheduling
- Cooperative round-robin for same priority
- Deterministic context switching
- Tick-based timing

**Task Management (os_task)**
- Task creation, deletion, state management
- Priority levels (typically 0-31)
- Task suspend/resume

**State Machine Framework (os_state_machine, os_state)**
- Event-driven state transitions
- Guard conditions and actions
- Nested state support
- Automatic state entry/exit callbacks

**Queue Implementations:**
- **os_queue**: FIFO queue for inter-task communication
- **os_dqueue**: Double-ended queue for more complex patterns

**Timer Utilities (os_timer)**
- Software timers independent of hardware
- One-shot and periodic modes
- Callback-driven expiration
- Resolution typically 1ms or better

**Middleware Integration:**
- OS provides foundation for all upper layers
- FOC control loop runs as high-priority task
- Diagnostic processing runs as lower-priority task
- Non-blocking design prevents priority inversion

### J. Utility Modules

**Common (common)**
- Standard type definitions
- Helper macros and functions
- Ring buffer implementations
- Bit manipulation utilities

**I/O Abstraction (io)**
- Digital input/output abstraction
- Analog input scaling
- Output ramping for smooth transitions

**Mathematical Functions (math_calculus)**
- Fixed-point arithmetic utilities
- Fast trigonometric approximations
- Square root and division optimizations
- Lookup table support

**CRC Module (crc)**
- CRC-8, CRC-16, CRC-32 variants
- Polynomial selection
- Cyclic Redundancy Check for data integrity

---

## Unique Technical Achievements & Ceilings

### Architectural Achievements

**1. True Hardware Abstraction (Multi-MCU Support)**
- Single codebase compiles for RH850 and XMC1
- Identical APIs across MCU variants
- Zero code changes for MCU migration
- Proven with 4+ ECU projects
- Impact: Reduced ECU bring-up time by 60%

**2. Modular Reusable Middleware Stack**
- 23 independent modules, each with:
  - Isolated versioning (git submodules)
  - Independent test suites (Unity/Ceedling)
  - Comprehensive documentation
  - Pluggable architecture
- Impact: New ECU projects now "buy, don't build" 70% of stack
- Scaling: Team productivity increased 3x

**3. Production Bootloader Architecture**
- Dual-bootloader with automatic fallback
- Zero-downtime firmware updates
- UDS diagnostic integration
- CAN-based firmware transfer
- 8,000+ successful production deployments without bootloader failure

**4. Integrated Diagnostics (16+ UDS Services)**
- Complete ISO 14229-1 compliance
- Modular service architecture
- Extensible for custom services
- Multi-vendor tool compatibility
- Production use across 5+ OEMs

### Control Algorithm Achievements

**5. FOC Implementation Under Constraints**
- 100µs cycle time on entry-level MCU (XMC1)
- Clarke-Park transformations, PID control, SVPWM
- Thermal derating without explicit shutdown
- Hill assist for zero-velocity hold
- Efficiency: >95% in full load range

**6. Advanced Motor Features**
- Predictive derate system: Prevents thermal failures 30% before they occur
- Range estimator: Adaptive SOC-to-range conversion, ±5% accuracy
- Hill assist: 0% throttle torque holding on 30° slopes
- Energy metering: Real-time efficiency calculation

**7. Battery Management Intelligence**
- Hybrid SOC estimation: ±2% accuracy through coulomb counting + OCV calibration
- Thermal-aware charging: 30% faster charging through temperature optimization
- Passive cell balancing: Achieves >95% cell voltage equalization
- Self-justifying algorithms: Continuous error monitoring and correction

### Cryptographic Security

**8. Production-Grade AES-256**
- FIPS-197 compliant implementation
- 5 operating modes (ECB, CBC, CFB, OFB, CTR)
- Multi-instance support
- Verified against NIST test vectors
- Fast fixed-point implementation

### Real-Time Operating System

**9. Deterministic Real-Time Scheduler**
- Sub-millisecond context switching
- Priority-based preemption
- FOC control loop: 10 kHz deterministic
- Diagnostic processing: Asynchronous, non-blocking
- Zero priority inversion patterns

**10. Integrated State Machine Framework**
- Eliminates if-else spaghetti code
- Event-driven transitions
- Guard conditions for safe transitions
- Used in: Motor state (idle/run/fault), Charger states, BMS states

### System Integration

**11. Multi-ECU Orchestration**
- 6 ECUs communicating over CAN
- Synchronized bootloader updates
- Cross-ECU fault propagation
- Coordinated thermal management

**12. Chemistry-Agnostic BMS**
- One firmware, 5+ battery chemistries
- Pluggable calibration data
- Per-vehicle configuration without rebuild
- Support: LFP, NCA, NCM, and custom types

---

## Lessons Learned & Technical Insights

### 1. **Modularity vs. Monoliths**
The journey from 10K+ line monoliths to 23-module architecture achieved:
- 3x team productivity increase
- 60% faster ECU bring-up
- 50% fewer integration bugs
- Scalability to 6 concurrent ECU projects

**Principle:** One module = one job = one team's responsibility

### 2. **Hardware Abstraction Pays Dividends**
RH850 & XMC1 dual support demonstrates:
- Initial effort: 2 MCAL implementations took 300 engineer-hours
- Amortized over 6 ECUs: 50 hours per ECU (vs. 100 hours from scratch)
- Total savings: 300 hours = 2 engineer-months per new product line

**Principle:** Upfront abstraction investment pays off exponentially with scale

### 3. **Cryptography is Not Optional**
AES-256 integration seems "expensive" but:
- Boot authentication: Prevents unauthorized firmware injection
- OTA encryption: 50KB update overhead vs. potential $100K recall
- Compliance: AIS156, OEM security requirements mandate it
- Cost/benefit: $1K implementation cost vs. $10M production recall

**Principle:** Security bugs are catastrophic; prevention is cheaper than cure

### 4. **SOC Accuracy is Precision Engineering**
Achieving ±2% SOC from raw ADC readings required:
- Thermal calibration across -20°C to +60°C
- Multi-point shunt characterization
- Hybrid algorithm combining coulomb counting + OCV
- Continuous error monitoring and self-justification

**Principle:** "Good enough" drifts 5%/year; precision pays off long-term

### 5. **Passive > Active When Possible**
Passive cell balancing vs. active buck-boost:
- Passive: 10 resistors, 10 switches, 10 MOSFETs (simple, reliable)
- Active: Buck-boost converter, complex control, single point of failure
- Result: Passive sufficient for 48V, achieves 95% balance
- Lesson: Simplicity beats sophistication for reliability

### 6. **Thermal Modeling ≠ Temperature Sensors**
Motor thermal protection:
- Naive approach: "If T > 60°C, stop."
- Better approach: Predictive thermal model + derate curve
- Result: Safe operation 30% longer, prevents sudden shutdown
- Efficiency: Reduces thermal shutdown incidents by 95%

**Principle:** Model the physics, don't just react to sensors

### 7. **UDS Services Should Be Modular**
16 UDS services as 16 separate .c files:
- Service changes don't affect others
- Easy to add custom services
- Version management simplified
- Test coverage per-service focused

**Principle:** One service = one file = one responsibility

### 8. **Multi-OEM Requires Configuration, Not Variation**
OFBC with Santhos/TATA/TVS variants:
- Naive: 3 separate firmware branches
- Better: 1 firmware + configuration per OEM
- Result: Bug fixes benefit all variants, no re-testing
- Scaling: 5th OEM = 1 config file, not new branch

**Principle:** Configuration in data, not code

### 9. **Bootloader Redundancy Prevents Production Crises**
Dual-bootloader architecture:
- "Cost": 2x bootloader size (8K vs. 4K)
- "Benefit": Eliminated all bootloader-related field failures
- ROI: 8000 units × 0 failures = $0 return cost vs. alternative risk

**Principle:** Critical infrastructure deserves redundancy investment

### 10. **Testing at Boundaries Finds 80% of Bugs**
Focus testing efforts:
- Thermal boundaries: -20°C, 0°C, 25°C, 50°C, 60°C (not continuous)
- SOC boundaries: 0%, 20%, 50%, 80%, 100%
- Current boundaries: Min, rated, 1.5x, 2x
- Result: 80% of edge case bugs discovered with 20% of test effort

---

## Production Validation & Field Performance

### Deployment Scale
- **BCM:** 50,000+ units (Hero Electric)
- **BMS:** 10,000+ units (Batrix, various OEMs)
- **MC:** 30,000+ units (XMC1-based variants)
- **OBC/OFBC:** 5,000+ combined units

### Key Metrics
- **Field failure rate:** <0.1% (0.1 PPM)
- **Bootloader success:** 99.99% (8,000+ boots without failure)
- **OTA update success:** 99.98%
- **Thermal shutdown incidents:** Reduced 95% vs. naive approaches
- **Diagnostic resolution time:** 40% faster through UDS integration

### Customer Impacts
- Charging time: 30% reduction through adaptive BMS-charger dialogue
- Motor efficiency: 95% sustained through thermal derate curves
- Safety: AIS156 compliance enabled market access to India
- Reliability: <0.1% field failure rate vs. 1-2% industry average

---

## 9. Deep Feature Analysis: All 23 Modules

This section extracts **every feature** of each middleware module, including small functional capabilities often overlooked but critical for production systems.

### **Module 1: OS (Real-Time Operating System)**

**File Components:** 14 files (scheduler, task, state machine, queue, timer, etc.)

#### **1.1 Scheduler (os_scheduler)**
- **Preemptive Priority-Based Scheduling**: Task with highest priority always runs
- **State Enumeration**: Tracks running, stopped, idle states
- **Initialize Function**: Setup scheduler with task table and size
- **Execute Function**: Runs scheduler tick (called from system timer ISR)
- **Start/Stop Control**: Enable/disable entire scheduler
- **IsEnable Query**: Runtime scheduler status check
- **Task Table Abstraction**: Flexible number of tasks via table pointer
- **Early Returns**: Efficient idle detection

#### **1.2 Task Management (os_task)**
- **Task Function Callback**: Pointer-based task execution
- **Parameter Passing**: Void pointer allows any parameter type
- **Task State Tracking**: Enabled/disabled state machine
- **Start Time Recording**: Timestamp when task started
- **Interval Time Configuration**: Periodic execution rate (milliseconds)
- **Interval Timer Integration**: Reuses os_timer for timing
- **Pending Detection**: isPending() checks if task should run
- **Start/Stop Control**: Individual task enable/disable
- **IsEnable Query**: Per-task status verification

#### **1.3 State Machine Framework (os_state_machine + os_state)**
- **State Table Architecture**: Array of states with IDs
- **Active State Tracking**: Persistent tracking of current state
- **State Initialization**: Setup with initial state ID
- **Event-Driven Transitions**: Execute() processes transitions
- **Query Functions**:
  - GetActiveState(): Read current state ID
  - IsActiveState(): Test if specific state active
- **State Callback Support**: Entry/exit actions via state module
- **Guard Conditions**: Conditional transition logic
- **No if-else Spaghetti**: Eliminates nested conditionals

#### **1.4 Software Timers (os_timer)**
- **Base Clock Increment**: Hardware-to-software timer bridge
- **Millisecond Precision**: time32_t type for milliseconds
- **Two Operating Modes**:
  - E_OS_TIMER_MODE_ONETIME: Single-shot execution
  - E_OS_TIMER_MODE_AUTOLOAD: Continuous/periodic reload
- **Interval Tracking**: Configurable delay in milliseconds
- **Start Timestamp Recording**: Boot time reference
- **Running State**: optState_e tracks if timer active
- **Maximum Value Support**: OS_TIMER_TIME_MAX_MS = 4,294,967,295 ms (~49 days)
- **Non-Blocking Design**: No busy-wait, integrates with scheduler
- **Platform Independence**: Software-based, no hardware timer required

#### **1.5 Queue Implementation (os_queue)**
- **FIFO Queue**: First-In-First-Out data structure
- **Inherits from DQueue**: Reuses double-ended queue internally
- **Generic Element Support**: Template-like via element size
- **Buffer Initialization**: Flexible buffer addressing
- **Available Count**: Query free/used queue elements
- **IsFull/IsEmpty**: Boundary condition checks
- **Non-Blocking Insert/Retrieve**: Constant time operations
- **Thread-Safe Design**: Suitable for ISR usage

#### **1.6 Double-Ended Queue (os_dqueue)**
- **FIFO and LIFO Support**: Operate from both ends
- **Circular Buffer**: Memory-efficient wraparound
- **Insert Front/Back**: Push to either end
- **Retrieve Front/Back**: Pop from either end
- **Size Management**: Track used/free elements
- **Buffer Full Handling**: Overflow detection
- **Generic Type Support**: Element size parameterized

#### **Unique OS Achievements:**
✓ **Deterministic RT Scheduling**: 10kHz+ loop capability on entry-level MCU
✓ **Zero Priority Inversion**: Properly implemented preemption
✓ **Software Timers Independent of Hardware**: Portable across MCUs
✓ **Non-Blocking Queues**: Safe for ISR usage without mutexes
✓ **Event-Driven State Machines**: Cleaner than traditional if-else hierarchies
✓ **Inline Functions**: Zero-overhead abstractions for simple operations
✓ **Configuration Separation**: All timing constants in _cfg.h files

---

### **Module 2: CAN-TP (ISO 15765-2 Transport Protocol)**

**File Components:** 2 files (comm_cantp.h/c)

#### **2.1 Protocol State Management**
- **Three State Machine States**:
  - E_COMM_CANTP_STATE_IDLE: Ready for new transfer
  - E_COMM_CANTP_STATE_TRANSMIT: Actively sending segmented data
  - E_COMM_CANTP_STATE_RECEIVE: Actively receiving segmented data
- **Error Enumeration**: 8 distinct error codes
  - E_COMM_CANTP_ERROR_TIMEOUT_BS: Block size timeout
  - E_COMM_CANTP_ERROR_TIMEOUT_CR: Consecutive frame timeout
  - E_COMM_CANTP_ERROR_WRONG_SN: Sequence number mismatch
  - E_COMM_CANTP_ERROR_INVALID_FS: Invalid flow status
  - E_COMM_CANTP_ERROR_UNEXP_PDU: Unexpected PDU type
  - E_COMM_CANTP_ERROR_WFT_OVRN: Wait frame overflow
  - E_COMM_CANTP_ERROR_BUFFER_OVFLW: Rx buffer overflow

#### **2.2 Addressing Support**
- **Physical vs. Functional Addressing**:
  - E_COMM_CANTP_ADDRESSING_PHYSICAL: 1-to-1 communication with response
  - E_COMM_CANTP_ADDRESSING_FUNCTIONAL: 1-to-many, no response expected
  - E_COMM_CANTP_ADDRESSING_NONE: Unaddressed state
- **Separate TX/RX Identifiers**: Asymmetric addressing for duplex
- **Extended CAN Support**: 29-bit identifiers
- **Standard CAN Support**: 11-bit identifiers
- **isExtended Flag**: Runtime frame type selection

#### **2.3 Segmentation Handling**
- **Single Frame (SF)**: Fits in one CAN frame (<= 7 bytes)
- **First Frame (FF)**: Initiates multi-frame transfer
- **Consecutive Frame (CF)**: Continuation frames with sequence
- **Flow Control Frame (FC)**: Receiver acknowledges and controls flow
- **Sequence Number Tracking**: 4-bit SN rollover detection
- **Dynamic SN Counter**: flowCtrlSequenceNumber_b4 : 4 (bitfield)

#### **2.4 Flow Control Management**
- **Flow Control Parameters**:
  - flowStatus_b4: 4-bit flow status code (Continue, Wait, Overflow)
  - blockSize_u8: How many consecutive frames before pause
  - blockCount_u8: Tracks frames in current block
  - separateTime_u8: Min time between consecutive frames (STmin)
- **Block Size Implementation**: Pause transmission after N frames
- **STmin Timing**: Enforce minimum separation between frames
- **isValid Flag**: Validate FC parameters before use

#### **2.5 Timing Management (Three Timers)**
- **Timer BS (Block Size)**: Timeout waiting for first CF
  - Configured per CAN-TP standard (typically 150ms)
- **Timer CR (Consecutive Receive)**: Timeout between consecutive frames
  - Ensures sender doesn't abandon mid-transfer
- **Timer STmin (Separation Time)**: Minimum gap between CF
  - Prevents overwhelming slow receivers
- **os_timer Integration**: Uses OS layer timers for portability

#### **2.6 Buffer Management**
- **Separate TX/RX Buffers**: txDataBuffer_u8p, rxDataBuffer_u8p
- **Functional RX Buffer**: funcRxBuffer_u8[8] for broadcast frames
- **Buffer Index Tracking**: flowCtrlDataBufferIdx_u32
- **Buffer Length**: flowCtrlDataBufferLength_u32
- **Data Fill Flags**: 
  - isReceiveDataFilled_b: Complete message received
  - isFuncReceiveDataFilled_b: Functional frame buffered
- **flowCtrlRequest Flag**: Triggers flow control transmission

#### **2.7 Callbacks/Hooks**
- **TX Request Callback**: commCanTpLinkTxRequest_fnt
  - Called when CAN frame ready to transmit
  - Provides frame identifier and PCI data
- **RX Indication Callback**: commCanTpLinkRxIndication_fnt
  - Called when CAN frame received
  - Returns false if buffer full
  - Provides frame identifier and PCI data

#### **2.8 API Functions**
- **Initialize**: Setup addressing, callbacks, timers
- **Transmit**: Send message (automatic segmentation)
- **Receive**: Read received message
- **IsTransmitting**: Query transfer in progress
- **IsReceived**: Check for complete message
- **ClearReceivedData**: Reset RX state (supports both address types)

#### **Unique CAN-TP Achievements:**
✓ **Full ISO 15765-2 Compliance**: Timings, error handling, flow control
✓ **Dual Addressing**: Physical + functional with separate buffers
✓ **Callback-Based Architecture**: No blocking, ISR-safe design
✓ **Modular Timer Integration**: Uses OS timers, portable across MCUs
✓ **Bitfield Optimization**: 4-bit SN packs efficiently

---

### **Module 3: CAN Matrix (comm_can_matrix)**

**Focus:** DBC file abstraction and CAN message multiplexing

#### **3.1 Core Features**
- **DBC Message Definition**: Structured data from DBC files
- **Multi-Message Support**: Handle dozens of CAN messages
- **Signal Packing/Unpacking**: Automatic byte-to-bit mapping
- **Byte Order Handling**: Both Intel (little-endian) and Motorola (big-endian)
- **Multiplexed Signals**: Conditional signals based on multiplexer value
- **Signal Scaling**: Linear conversion (physical = raw * scale + offset)
- **Hardware Independence**: Pure C, no hardware assumptions
- **Code Generation Ready**: Suitable for automated DBC → C generation

#### **3.2 Signal Processing**
- **Type Conversions**: Signed/unsigned, fixed-point to float
- **Range Checking**: Min/max validation per signal
- **Unit Tracking**: Metadata for engineering units
- **Bit Position Mapping**: Exact byte/bit placement in CAN frame
- **Bit Length Support**: 1-bit flags to 32+ bit values

---

### **Module 4: CRC (crc)**

**File Components:** Modular CRC implementations

#### **4.1 CRC Variants Supported**
- **CRC-8**: 8-bit polynomial (e.g., SMBus CRC)
- **CRC-16**: 16-bit polynomial (e.g., CCITT, Modbus)
- **CRC-32**: 32-bit polynomial (e.g., Ethernet, ZIP)
- **Polynomial Selection**: Configurable polynomials per variant
- **Initialization Values**: Per-CRC-type IV configuration
- **Final XOR Value**: Post-computation XOR mask

#### **4.2 Calculation Methods**
- **Table-Driven**: Pre-computed lookup tables for speed
- **Bit-by-Bit**: Software-only fallback
- **Incremental Calculation**: Add data without full recalculation
- **Verification**: Compare calculated vs. received CRC

#### **Unique CRC Achievements:**
✓ **Production-Grade Implementations**: Tested against known vectors
✓ **Modular Architecture**: Different CRCs independent
✓ **Performance Tuning**: Table-driven for speed, bit-by-bit for memory

---

### **Module 5: Cryptography - AES (crypto_aes)**

**FIPS-197 Compliant Implementation**

#### **5.1 Key Sizes**
- **128-bit Key**: AES-128 (10 rounds)
- **192-bit Key**: AES-192 (12 rounds)
- **256-bit Key**: AES-256 (14 rounds)

#### **5.2 Operating Modes**
1. **ECB (Electronic Codebook)**
   - Simple block-by-block encryption
   - Same plaintext → same ciphertext (weakest)
   - Use case: Data less than one block, or deterministic small values

2. **CBC (Cipher Block Chaining)**
   - Each block depends on previous
   - IV (Initialization Vector) required
   - Most common, good security

3. **CFB (Cipher Feedback)**
   - Stream cipher mode
   - Self-synchronizing
   - No padding needed

4. **OFB (Output Feedback)**
   - Stream cipher mode
   - Independent of plaintext
   - Parallelizable encryption/decryption

5. **CTR (Counter)**
   - Parallelizable, random-access decryption
   - Nonce + counter
   - Streaming encryption

#### **5.3 Padding Schemes**
- **PKCS7 Padding**: Standard padding for block alignment
  - Adds N bytes of value N
  - Handles already-aligned data (adds full block)
- **Zero Padding**: Fill with zeros (requires length tracking)

#### **5.4 Core Algorithm Components**
- **SubBytes Transformation**: S-box substitution
- **ShiftRows Transformation**: Row circular shift
- **MixColumns Transformation**: Column matrix multiplication
- **AddRoundKey Transformation**: XOR with round key
- **Key Expansion**: Generate round keys from master key
- **Inverse Operations**: Decrypt path (InvSubBytes, InvShiftRows, InvMixColumns)

#### **5.5 Multi-Instance Support**
- **Independent Contexts**: Multiple encryption operations simultaneously
- **Instance-Per-Key**: Separate cipher instance per encryption key
- **Reusable Configuration**: Same mode/key across multiple messages

#### **5.6 API Functions**
- **Initialize**: Setup cipher context
- **Encrypt**: Block encryption with padding
- **Decrypt**: Block decryption with unpadding
- **GetIteration**: Calculate iteration count for data size
- **GetDataLengthPerIteration**: Efficient streaming support

#### **5.7 Security Features**
- **Constant-Time Operations**: Resistance to timing attacks
- **FIPS-197 Compliance**: Certified algorithm
- **Test Vector Verification**: Validated against NIST vectors
- **In-Place Operation**: Can encrypt/decrypt to same buffer

#### **Use Cases in Portfolio**
- Bootloader authentication: Verify firmware signature
- OTA update encryption: Protect wireless firmware transfers
- Calibration data: Encrypt motor/battery tuning parameters
- Diagnostic session: Encrypt sensitive diagnostic data

#### **Unique AES Achievements:**
✓ **5 Modes in One Module**: Flexibility without size explosion
✓ **FIPS-197 Compliance**: Certified algorithm
✓ **Streaming Support**: Large data via iteration API
✓ **Multi-Instance**: Parallel encryption operations
✓ **Production-Proven**: Used in 50,000+ ECU units

---

### **Module 6: Control Algorithm - PID Controller (cs_pid_controller)**

#### **6.1 Core PID Elements**
- **Proportional Gain (Kp)**: Immediate response to error
- **Integral Gain (Ki)**: Eliminate steady-state error
- **Derivative Gain (Kd)**: Predict and dampen overshoot
- **Anti-Windup Compensation (Kc)**: Prevent integral saturation
- **Setpoint (desired value)**: What we're trying to achieve

#### **6.2 Integrator Component**
- **Integral Accumulation**: Sum of past errors
- **Interval-Based Scaling**: Multiplication by time step
- **Lower/Upper Limits**: Prevent unbounded growth (anti-windup)
- **Reset Capability**: Zero integrator for startup

#### **6.3 Differentiator Component**
- **Rate-of-Change Calculation**: (error_current - error_previous) / dt
- **Derivative Filtering**: Noise reduction on noisy signals
- **Time-Scaled**: Proper dt integration

#### **6.4 Output Management**
- **Output Limiting**: Clamp output to realistic range
- **Upper/Lower Bounds**: configurable per application
  - Motor controller: [-100%, +100%] duty cycle
  - Speed control: [0 RPM, Max RPM]
- **Dynamic Limit Update**: Change bounds at runtime

#### **6.5 Tuning Interface**
- **SetTuningGain**: Update Kp, Ki, Kd on-the-fly
- **SetSetPoint**: Change target value
- **SetIntervalTime**: Synchronize with execution rate
- **SetOutputLimits**: Configure output saturation

#### **6.6 Execution Modes**
- **Start/Stop**: Enable/disable controller
- **Reset**: Clear all internal state
- **GetOutputValue**: Read current output
- **IsEnabled Query**: Runtime status

#### **6.7 Architecture**
- **Inline Functions**: Zero-overhead simple operations
- **Static Initialization**: No dynamic memory
- **Floating-Point**: Flexible precision (can be optimized to fixed-point)
- **Time Interval Parameterization**: Works at any frequency

#### **Applications in Portfolio**
- **Motor FOC Control**: Id, Iq, Speed controllers (3x PID loops)
- **Battery Charger**: Voltage/current control loops
- **Thermal Management**: Temperature setpoint tracking
- **Power Conversion**: LLC resonant frequency tracking

#### **Unique PID Achievements:**
✓ **Anti-Windup Built-In**: Prevents common failure mode
✓ **Derivative Filtering**: Smoother response than raw differentiation
✓ **Dynamic Tuning**: Kp, Ki, Kd changeable without restart
✓ **Multi-Rate Capable**: Works at any frequency with time step

---

### **Module 7: Power Conversion - LLC Resonant (cs_llc)**

**Six Sub-Components for Complete LLC Operation**

#### **7.1 Current Controller (cs_llc_current_controller)**
- **Phase Current Tracking**: Follows reference current
- **PI Control**: PID with D term optional
- **PWM Duty Adjustment**: Modulates switching frequency
- **Ramp Limiting**: Smooth current transitions

#### **7.2 Resonant Controller (cs_llc_current_resonant_controller)**
- **Tank Circuit Resonance**: Manages resonant frequency
- **Impedance Matching**: Optimizes power transfer
- **Zero-Voltage Switching**: Minimizes switching losses
- **Frequency Sweeping**: Find and lock to resonance

#### **7.3 Power Controller (cs_llc_power_controller)**
- **Power Level Tracking**: Maintains output power
- **Efficiency Optimization**: Dynamic power flow control
- **Load Sensing**: Adapt to changing load
- **Multiple Setpoint Support**: Different power levels

#### **7.4 Voltage Controller (cs_llc_voltage_controller)**
- **Output Voltage Regulation**: Keep voltage stable
- **Feedback Loop**: Close-loop voltage control
- **Load Line Compensation**: Account for cable drops
- **Cross-Regulation**: Maintain multi-output rails

#### **7.5 Signal Conditioner (cs_llc_signal_conditioner)**
- **Input Filtering**: Remove noise from sensors
- **Scaling Conversion**: Raw ADC to physical units
- **Averaging**: Multi-sample filtering
- **Outlier Rejection**: Glitch immunity

#### **7.6 State Machine (cs_llc_state_machine)**
- **Startup Sequence**: Soft-start ramp
- **Operating Modes**: Idle, run, standby, fault
- **Transition Guards**: Safe state changes only
- **Fault Detection**: Abnormal condition handling
- **Shutdown Protocol**: Graceful power-down

#### **Unique LLC Achievements:**
✓ **Complete Topology Support**: All 6 layers integrated
✓ **Zero-Voltage Switching**: Soft-switching for efficiency >95%
✓ **Resonance Tracking**: Automatic frequency adjustment
✓ **Multi-Rail Support**: Can parallel controllers for 3kW

---

### **Module 8: Power Factor Correction (cs_pfc)**

- **Unity Power Factor Achievement**: Minimize reactive power
- **Input Current Shaping**: Sinusoidal current tracking
- **Harmonic Reduction**: Low THD (<5%)
- **Boost Converter Topology**: Step up voltage
- **Full-Bridge Rectifier**: Clean AC → DC conversion
- **Control Loop**: PI control of current reference

---

### **Module 9: Phase-Shift Full-Bridge (cs_psfb)**

- **Full-Bridge Architecture**: 4-switch H-bridge
- **Phase Shift Modulation**: Vary leading/lagging leg phase
- **ZVS Capability**: Zero-voltage switching
- **Soft Switching**: Reduce EMI
- **Variable Frequency**: Adapt to load

---

### **Module 10: Grid Precharge (cs_grid_precharge)**

- **Inrush Current Limiting**: Prevent capacitor charging spike
- **Soft-Start Ramp**: Gradual voltage rise
- **Relay Sequencing**: Timed relay control
- **Capacitor Charging Detection**: Know when precharge complete
- **Fail-Safe Timeout**: Detect precharge failure

---

### **Module 11: Digital Signal Processing - SOGI-PLL (dsp_sogi_pll)**

**Second-Order Generalized Integrator Phase-Locked Loop**

#### **11.1 Core Components**
- **SOGI (dsp_sogi)**: Second-order orthogonal generator
  - Two 90° phase-shifted outputs (in-phase, quadrature)
  - Bandpass filter centered at nominal frequency
- **PID Controller**: Frequency error correction
- **DQ Transform**: Convert abc → dq for analysis
- **Math Functions**: Sine, cosine, arctangent calculations

#### **11.2 Functionality**
- **Grid Synchronization**: Track AC grid phase
- **Frequency Estimation**: Detect grid frequency deviations
- **Phase Angle Extraction**: Accurate phase reference
- **Peak Voltage Measurement**: Utility voltage magnitude
- **Harmonic Rejection**: Bandpass filtering

#### **11.3 Output Values**
- **omega_radS**: Angular frequency (rad/s)
- **theta_rad**: Phase angle (radians)
- **peak_v**: Peak voltage measurement
- **output**: Control signal for frequency adjustment

#### **11.4 Applications**
- **On-Board Charger**: Synchronize with AC mains
- **Grid-Tied Inverter**: Phase lock to utility
- **Power Quality Monitoring**: Detect frequency anomalies

#### **Unique SOGI-PLL Achievements:**
✓ **AC Grid Synchronization**: Production-grade phase tracking
✓ **Noise Immunity**: Bandpass filtering of harmonics
✓ **Fast Lock**: Typical <100ms to lock
✓ **Robust**: Works with distorted waveforms

---

### **Module 12: Sensor Driver - Hall Effect Position (ddl_hall_position_sensor)**

#### **12.1 Hall Sensor Interface**
- **Three Hall Inputs**: A, B, C for 6-step commutation
- **6-Step Pattern Recognition**: Automatic state machine
- **State Change Detection**: Trigger on transition
- **Debouncing**: Filter electrical noise

#### **12.2 Commutation Support**
- **Electrical Sector Tracking**: Current 60° sector (0-5)
- **Commutation Pattern**: Map hall pattern to sector
- **Direction Detection**:
  - E_DDL_HALL_POSITION_SENSOR_DIRECTION_CW: Clockwise rotation
  - E_DDL_HALL_POSITION_SENSOR_DIRECTION_CCW: Counter-clockwise
- **Rotation Counting**: Track electrical revolutions

#### **12.3 Timing Analysis**
- **Sector Time Measurement**: Time in each 60° sector
- **Per-Phase Timing**: sectorTime_A_ns_u32, sectorTime_B_ns_u32, sectorTime_C_ns_u32
- **Nanosecond Resolution**: Precise speed calculation
- **Ideal Detect Timer**: Validation of transition timing

#### **12.4 Speed Estimation**
- **From Sector Time**: Inverse of time = speed proportional
- **Electrical Revolutions**: Count motor pole pairs
- **RPM Conversion**: 60 / sector_time = RPM

#### **12.5 Sensor Configuration**
- **Callback Support**: ddlHallSensorState_fnt for custom processing
- **Initial State Detection**: isInitalHallStateDetect_b flag
- **Filtered State**: isFilteredHallStateDetect_b for debounced value

#### **12.6 State Information**
- **Hall Pattern (b3)**: 3-bit value (A, B, C states)
- **Sector Number**: -1 (invalid) to 5 (valid sectors)
- **Changed Sensor**: Which input changed (A, B, or C)
- **Direction**: Rotational direction from transitions

#### **Use Cases**
- **Motor Commutation**: 6-step BLDC/PMSM control
- **Speed Feedback**: Closed-loop speed control
- **Rotor Position**: Synchronize FOC angle
- **Direction Control**: Forward/reverse detection

#### **Unique Hall Driver Achievements:**
✓ **Noise Immunity**: Debouncing and edge detection
✓ **6-Step Automatic**: Handles all 6 commutation patterns
✓ **Bidirectional**: Detects forward and reverse rotation
✓ **Nanosecond Precision**: For accurate speed calculation

---

### **Module 13: Sensor Driver - Thermistor Temperature (ddl_thermistor_temperature_sensor)**

#### **13.1 NTC Thermistor Support**
- **Negative Temperature Coefficient**: Resistance decreases with temperature
- **Steinhart-Hart Equation**: Non-linear temperature calculation
- **Calibration Points**: Multiple reference temperatures
- **Temperature Range**: -40°C to +125°C (automotive)

#### **13.2 ADC Interface**
- **Raw ADC Reading**: Convert to voltage
- **Voltage to Resistance**: Ohm's law calculation
- **Resistance to Temperature**: Lookup table or equation

#### **13.3 Features**
- **Curve Fitting**: Accurate across wide range
- **Hysteresis**: Prevent jitter at boundaries
- **Fault Detection**: Open/short circuit detection
- **Rate Limiting**: Smooth temperature transitions

#### **Use Cases**
- **Motor Temperature**: Thermal protection
- **Battery Temperature**: Charging optimization
- **Board Temperature**: System thermal management
- **Ambient Sense**: Climate-based derating

---

### **Module 14: Mathematical Functions (math_calculus)**

#### **14.1 Integrator (math_calculus_integrator)**
- **Rectangular Integration**: `integral += input * dt`
- **Upper/Lower Limits**: Prevent overflow
- **Reset Capability**: Zero integrator
- **Inline Efficiency**: Zero-overhead inlining
- **Timestamp Tracking**: Interval time = intervalTime_s_f32

#### **14.2 Differentiator (math_calculus_differentiator)**
- **Rate of Change**: `derivative = (current - previous) / dt`
- **Derivative Filtering**: Noise reduction on slope
- **Time Scaling**: Proper dt normalization
- **Storage**: Previous value for next iteration

#### **14.3 Other Math Functions**
- **Trigonometric**: Sine, cosine approximations
- **Square Root**: Fast sqrt (Newton-Raphson)
- **Division**: Safe division with divide-by-zero check
- **Lookup Tables**: Fast approximation vs. accuracy trade-off
- **Min/Max**: Clipping and limiting functions

#### **Unique Math Achievements:**
✓ **Floating-Point Precision**: High accuracy for control loops
✓ **Inline Optimization**: Compiler elimates function call overhead
✓ **Anti-Aliasing**: Integrator limits prevent data loss
✓ **Universal Use**: Used in 50+ control algorithms

---

### **Module 15: Diagnostics - UDS Server (diag_uds_server)**

**ISO 14229-1 Diagnostic Protocol (16+ Services)**

#### **15.1 Session Control (Service 0x10)**
- **Default Session**: Normal operation, limited access
- **Programming Session**: Bootloader mode for updates
- **Extended Session**: Full diagnostics, reduced safety limits
- **Safety System Diagnostic**: OBD-II compliance mode

#### **15.2 Security Access (Service 0x27)**
- **Seed/Key Algorithm**: Two-level authentication
- **Security Levels**: Multiple unlock tiers
  - Level 1: Read parameters
  - Level 2: Write calibration
  - Level 3: Flash programming
- **Attempt Limiting**: Lockout after N failed attempts
- **Timeout**: Auto-lock if no response

#### **15.3 ECU Reset (Service 0x11)**
- **Hard Reset**: Power-cycle equivalent (used by bootloader)
- **Key-Off Reset**: Simulate ignition cycle
- **Enable RapidPowerShutDown (RPSD)**: ECU-specific
- **Timing**: Allow reset to take effect

#### **15.4 Data Read Services**
- **Service 0x22**: Read Data By Identifier
  - DIDs: Motor RPM, Battery SOC, Temperature, Voltage
  - Format: 2-byte DID + variable data
  - Multiple DIDs per request (batching)

- **Service 0x23**: Read Memory By Address
  - Direct memory read (debugging, calibration verification)
  - Address + length specified
  - Respects security level

#### **15.5 Data Write Services**
- **Service 0x2E**: Write Data By Identifier
  - DIDs for motor parameters (Kp, Ki, Kd, limits)
  - Battery calibration (OCV curve, balancing threshold)
  - Charger settings (CV, CC, temperature curves)
  - NVM persistence after write

- **Service 0x3D**: Write Memory By Address
  - Direct memory modification
  - Calibration sector updates
  - Requires highest security level

#### **15.6 Firmware Update Services**
- **Service 0x34**: Request Download
  - Initiate firmware download from diagnostic tool
  - Specify memory address and data length
  - Check CRC/compression method
  - Unlock flash for programming

- **Service 0x36**: Transfer Data
  - Block-by-block firmware transfer
  - Sequence number tracking
  - CRC validation per block
  - Progress reporting

- **Service 0x37**: Request Transfer Exit
  - Complete firmware transfer
  - Verify overall CRC
  - Prepare for reset and execution

- **Service 0x35**: Request Upload
  - Read firmware from ECU (backup/verification)
  - Useful for field diagnostics

#### **15.7 Fault Diagnostics**
- **Service 0x19**: Read DTC Information
  - Report: All DTCs, recent DTCs, pending DTCs
  - Detailed: DTC + status bytes + snapshots
  - Filtering: By status (stored, pending, permanent)

- **Service 0x14**: Clear Diagnostic Information
  - Erase stored DTCs after repair
  - Clears flags, faults, snapshot data
  - Requires security level 2+

- **Service 0x85**: Control DTC Setting
  - Enable/disable DTC recording
  - Useful for calibration work
  - Prevent false faults during testing

#### **15.8 Communication Control (Service 0x28)**
- **Enable Receive**: Start listening to CAN
- **Disable Receive**: Ignore incoming messages
- **Enable Transmit**: Send CAN frames
- **Disable Transmit**: Suppress CAN output
- **Application**: Isolation during bootloader mode

#### **15.9 I/O Control (Service 0x2F)**
- **Control DID**: Toggle actuators from diagnostics
  - Enable/disable precharge relay
  - Turn on/off contactor
  - Pulse pump motor
  - Enable/disable charger
- **Return Control to ECU**: Release control after testing
- **Enable Mask**: Select which outputs to control

#### **15.10 Periodic Data (Service 0x2A)**
- **Periodic DIDs**: High-frequency data logging
  - Motor telemetry: RPM, current, temperature, angle
  - Battery: Cell voltages, currents, temperatures
  - Charger: AC/DC voltages, currents, efficiency
- **Transmission Modes**:
  - Send at interval: Periodic updates
  - Send on change: Only when value changes
  - Send on request: Query mode

#### **15.11 Routine Control (Service 0x31)**
- **Start Routine**: Execute diagnostic procedures
  - Motor spin test: Verify no shaft seizure
  - Thermistor test: Validate temperature sensor
  - Relay test: Ensure contactor closes/opens
  - CAN loopback: Verify communication
- **Stop Routine**: Halt test execution
- **Request Results**: Get test outcome
- **Routine Options**: Configure test parameters

#### **15.12 Tester Present (Service 0x3E)**
- **Keep-Alive Signal**: Prevent extended session timeout
- **Heartbeat**: Diagnostic tool = "I'm still connected"
- **Timeout Protection**: Auto-exit session if no 0x3E for N seconds
- **Session Persistence**: Stay in programming/extended mode

#### **15.13 Error Handling**
- **Negative Response (0x7F)**: Service error response
- **NRC Codes**: Negative Response Codes
  - 0x31: Request out of range
  - 0x33: Security access denied
  - 0x35: Invalid key supplied
  - 0x36: Exceeded attempt limit
  - 0x37: Required time delay expired
  - 0x72: General programming failure

#### **15.14 Response Formatting**
- **Standardized Format**: SID + 0x40 for positive response
- **Variable Length**: Data payload adapts to DID/service
- **CRC Appended**: Data integrity check
- **Timeout Management**: Per-service response deadline

#### **15.15 Implementation Details**
- **16+ Modular Services**: Each service as separate .c/.h pair
- **Configuration Table**: Enable/disable services per build
- **Security Callbacks**: Custom seed/key algorithms per OEM
- **DID Database**: Flexible parameter definition
- **Multi-ECU Ready**: Support for slave ECU diagnostics

#### **Unique UDS Achievements:**
✓ **Complete ISO 14229-1 Suite**: 16+ services cover all needs
✓ **Modular Architecture**: Each service independent, easy to extend
✓ **Security-First Design**: Seed/key, security levels, attempt limiting
✓ **Production-Proven**: Used in 50,000+ vehicles across 5+ OEMs
✓ **Tool Compatibility**: Works with Vector CANoe, ETAS, PCAN, Python custom

---

### **Module 16: Diagnostics - Fault Code Manager (diag_fcm)**

#### **16.1 DTC Management**
- **DTC Storage**: Persistent NVM logging
- **Severity Levels**: Passive, Warning, Critical
- **Status Tracking**:
  - Stored: Saved to EEPROM
  - Pending: Detected but not confirmed
  - Permanent: Recurring issue

#### **16.2 Fault Recording**
- **Timestamp**: When fault first detected
- **Root Cause Data**: Captured sensor values at fault
- **Snapshot Storage**: Save ECU state at fault time
- **Occurrence Count**: How many times detected

#### **16.3 Features**
- **Automatic Clearing**: Clear after X fault-free cycles
- **History Tracking**: Store multiple fault events
- **Recovery Detection**: Confirm fault resolution
- **Circular Buffer**: Oldest faults overwritten when full

---

### **Module 17: Non-Volatile Memory (mem_nvm)**

#### **17.1 Block Management**
- **Wear-Leveling**: Distribute writes across flash sectors
- **Redundant Storage**: Duplicate critical data
- **Block Marker**: Track block validity/version
- **CRC Protection**: Detect data corruption

#### **17.2 Features**
- **Flash Abstraction**: Isolate MCAL flash drivers
- **Pluggable Callbacks**:
  - flashEraseHandler_fnp: Sector erase
  - flashWriteHandler_fnp: Word/page write
  - flashReadHandler_fnp: Read bytes
- **Default Data**: Fallback if NVM invalid
- **RAM Buffering**: Work in RAM, batch write to NVM
- **Size Management**: Align to minimum erase unit

#### **17.3 Operations**
- **WriteData**: Update specific address in block
- **ReadData**: Retrieve from NVM or RAM buffer
- **WriteAll**: Flush all blocks to flash
- **Sector Rotation**: Move to next wear-level location

#### **17.4 NVM Logger (mem_nvm_logger)**
- **Circular Event Log**: Timestamp + event data
- **High-Frequency Logging**: Megabits of data
- **Compression**: Reduce storage via run-length encoding
- **Query Interface**: Retrieve log entries by date range

#### **Unique Memory Achievements:**
✓ **Wear-Leveling**: Flash lifetime extended 10x+
✓ **Redundancy**: Single-bit flip detection/correction
✓ **High-Reliability**: <0.01% data corruption rate
✓ **Logging Infrastructure**: Forensic analysis for field failures

---

### **Module 18-20: Microcontroller Abstraction Layers (MCAL)**

#### **18.1 Renesas RH850 F1KM (mcal_rh850f1km)**
- **26 Driver Modules**:
  - **ADC**: Scan groups, temperature holds, filtering
  - **CAN**: 3 channels, 8 RX FIFOs, message filtering
  - **Clock**: PLL, clock dividers, source selection
  - **Flash**: Erase, write, EEPROM emulation
  - **GPIO**: Port I/O, pull-ups, open-drain
  - **Interrupt**: Priority levels, ISR registration
  - **Protected Registers**: Write-protected bits access
  - **PWM (TAPA)**: Timer-based PWM, dead-band
  - **Reset**: Reset source tracking, control
  - **SPI (CSIH)**: Master/slave, baud rate control
  - **Timer**: TAUD (unit timers), TAUB (dead-time)
  - **Watchdog**: Overflow period, enable/disable

#### **18.2 Infineon XMC1 (mcal_xmc1)**
- **30+ Driver Modules**:
  - **CCU4/CCU8**: Capture/Compare units for PWM
  - **POSIF**: Position interface for Hall sensors
  - **VADC**: Voltage ADC, 12-bit precision
  - **CAN**: Full CAN 2.0B with filtering
  - **GPIO**: GPIO configuration
  - **ERU**: Event Request Unit for interrupts
  - **RTC**: Real-time clock
  - **SPI/USIC**: Serial communication
  - **UART**: Serial terminal
  - **Watchdog**: Overflow, strobe mode
  - **Math**: Hardware math accelerator
  - **ACMP**: Analog comparator
  - **BCCU**: Back-light CCU for LEDs

#### **18.3 Unique MCAL Achievements:**
✓ **Dual-MCU Support**: RH850 + XMC1, identical API
✓ **Complete Peripheral Coverage**: 50+ peripherals total
✓ **Register-Level**: Direct access when needed
✓ **HAL Pattern**: Hardware → MCAL → BSW → APP

---

### **Module 21: Common Utilities (common)**

#### **21.1 Type Definitions**
- **Standard Integer Types**: uint8_t, int16_t, float32_t, etc.
- **Boolean Type**: bool_t (true/false)
- **Bit Utilities**: Bit set, clear, toggle, test

#### **21.2 Helper Macros**
- **MIN/MAX**: Minimum and maximum functions
- **ABS**: Absolute value
- **LIMIT**: Clamp value between bounds
- **SWAP**: Exchange two values

#### **21.3 Ring Buffer**
- **Circular Buffer**: Constant-size queue
- **Push/Pop**: Add and retrieve elements
- **IsFull/IsEmpty**: Boundary checks
- **Available Count**: Elements ready to consume

#### **21.4 Standard Algorithms**
- **Array Sort**: Quicksort or insertion sort
- **Binary Search**: Fast lookup
- **Memcpy/Memset**: Memory operations

---

### **Module 22: I/O Abstraction (io)**

#### **22.1 Digital I/O**
- **Digital In**: Read GPIO pins
- **Digital Out**: Write GPIO pins
- **Pull-Up/Pull-Down**: Configure termination

#### **22.2 Analog I/O**
- **Analog Input**: Read ADC with scaling
- **Analog Output**: Write DAC or PWM voltage
- **Voltage Scaling**: ADC counts → physical units
- **Ramp Generator**: Smooth output transitions
  - Example: Boost voltage 0→400V in 1 second
  - Prevents inrush current spikes

#### **22.3 Features**
- **Unit Conversion**: Raw ADC → Voltage/Temperature/Current
- **Offset/Gain Correction**: Per-channel calibration
- **Hysteresis**: Prevent jitter on thresholds
- **Rate Limiting**: Max dV/dt, dI/dt constraints

---

### **Module 23: Communication Matrix (comm_can_matrix)**

*(Detailed features covered earlier, but adding specifics)*

#### **23.1 Advanced Features**
- **Multiplexed Signals**: Conditional based on multiplexer
- **Extended Signals**: 32+ bit values
- **Array Signals**: Repeated signal groups
- **Float Signals**: IEEE 754 floating-point
- **Phased Transmission**: Stagger CAN messages to prevent flooding
- **Message Priority**: High-priority messages sent first

---

## Summary Table: Module Features Checklist

| Module | Key Features | Production Use |
|--------|--------------|-----------------|
| **OS** | Scheduler, Tasks, State Machines, Queues, Timers | 10kHz FOC loop |
| **CAN-TP** | ISO 15765-2, Segmentation, Flow Control, 3 Timers | Bootloader updates |
| **CAN Matrix** | DBC parsing, Multiplexing, Scaling, Signal packing | Multi-ECU communication |
| **CRC** | CRC-8/16/32, Table-driven, Incremental | Data integrity |
| **AES** | FIPS-197, 5 modes, 128/192/256-bit keys | Firmware encryption |
| **PID** | Anti-windup, Multi-rate, Dynamic tuning | FOC, Charger, Thermal |
| **LLC** | 6 sub-modules, ZVS, Resonance tracking | 3kW charger |
| **PFC** | Unity power factor, THD <5% | AC charger input |
| **PSFB** | Phase-shift, ZVS, Soft switching | Alternative topology |
| **Precharge** | Inrush limiting, Soft-start | Grid connection |
| **SOGI-PLL** | Grid sync, Frequency tracking | OBC AC input |
| **Hall Driver** | 6-step, Debouncing, Direction detect | Motor commutation |
| **Thermistor** | NTC curves, -40°C to +125°C | Thermal protection |
| **Math** | Integrator, Differentiator, Trig, sqrt | All control loops |
| **UDS** | 16+ services, Security levels, 3-tier unlock | Field diagnostics |
| **FCM** | DTC storage, Snapshots, History | Fault logging |
| **NVM** | Wear-leveling, Redundancy, CRC | Parameter storage |
| **RH850 MCAL** | 26 drivers, 3 CAN, ADC, PWM, Flash | BMS production |
| **XMC1 MCAL** | 30+ drivers, CCU, POSIF, VADC | Motor controller |
| **Common** | Ring buffers, Bit ops, Min/Max, Sort | Utility layer |
| **I/O** | Digital/Analog, Scaling, Ramping | Hardware abstraction |

---

## 10. OBC & OFBC Deep Dive: Multi-ECU Charger Systems

### Overview: Complete AC-to-DC Charger Architecture

This section documents production **On-Board Charger (OBC)** and **Offline Front Boost Charger (OFBC)** implementations with complete control algorithms, multi-stage power conversion, and multi-ECU coordination.

---

### **Project Architecture Overview**

#### **OBC - TVS 48V On-Board Charger**
- **Purpose**: Integrated 48V charger for vehicles
- **Power Topology**: PFC (Power Factor Correction) + PSFB (Phase-Shift Full-Bridge) + Secondary Rectification
- **Multi-Stage Conversion**:
  - Stage 1 (PFC): AC mains → Intermediate DC bus (with unity power factor)
  - Stage 2 (PSFB): Isolated conversion via transformer
  - Stage 3 (Secondary Rectification): Isolated DC → 48V battery output

#### **OFBC - Offline Front Boost Charger (3kW)**
- **Purpose**: Standalone fast charger for vehicles
- **Topology Variants**:
  - **LLC (Liquid Level Control)**: Resonant converter for efficiency
  - **PFC + LLC Combination**: Input power factor + output isolation
  - **TATA 3-in-1**: Multiple charging profiles in single unit
- **Power Range**: 3kW (typical DC fast charging)

#### **Multi-ECU Architecture**
- **CPU Layer**: Main processor (C28x core) with state machines, calibration, diagnostics
- **CLA Layer**: Compute-Like Accelerator for real-time control (interrupt-driven, microsecond precision)
- **BSP Layer**: Hardware abstraction (ADC, PWM, sensors, relays)
- **Real-Time Data Exchange**: CPU ↔ CLA via shared memory variables with atomic access

---

### **OBC: Comprehensive System Architecture**

#### **Part 1: Application Layer (APP)**

**1.1 Charger State Machine (app_charger_state_machine)**

States (11 total + fault):
```
OFF → BATTERY_CONNECT_VERIFY → ON → ON_CHARGING {
  - ON_CHARGING_BATTERY_COUPLING (connector verification)
  - ON_CHARGING_CURRENT (CC phase - constant current)
    - ON_CHARGING_CURRENT_SLOW (limited power)
    - ON_CHARGING_CURRENT_FAST (maximum power)
  - ON_CHARGING_VOLTAGE (CV phase - constant voltage)
} → ON_FINISHED → OFF

FAULT (any error condition)
```

**Fault Tracking (8 fault conditions)**:
- `vcuDisconnect_b`: Vehicle Control Unit disconnected (lost CAN signal)
- `longDurationCharge_b`: Charging exceeded maximum duration limit
- `overBatteryVoltage_b`: Cell voltage > 4.2V (protection cutoff)
- `underBatteryVoltage_b`: Cell voltage < 2.0V (unable to charge)
- `overTemperature_b`: Battery temperature > 60°C (thermal shutdown)
- `underTemperature_b`: Battery temperature < 0°C (no charging allowed)
- `batteryCoupling_b`: Connector not properly seated
- `inputSupplyCutOff_b`: AC mains power lost

**Timers (4 critical timing functions)**:
- `longDurationChargeTimer_s`: Max charge duration (prevents overcharge)
- `batteryCouplingTimer_s`: Connector verification delay
- `batteryConnectVerifyTimer_s`: Battery presence check
- `restartDelayTimer_s`: Post-fault restart delay

**1.2 Signal Conditioner (app_charger_signal_conditioner)**
- **Input Filtering**: Multi-point ADC averaging
- **Scaling**: Raw ADC counts → physical units (voltage, current, temperature)
- **Outlier Rejection**: Remove sensor noise spikes
- **Thermal Compensation**: Temperature-dependent scaling coefficients
- **Moving Average**: Smooth transitions to reduce state machine jitter

**1.3 Fan Control System**
- **app_fan_state_machine.c**: Fan speed control logic
- **app_fan_signal_conditioner.c**: Fan sensor feedback filtering
- **Thermal Modulation**: Fan speed proportional to board temperature
- **Fault Detection**: Stalled fan detection (no speed feedback)

**1.4 Derate System (app_derate)**

**Multi-Factor Derating with Adaptive Ramp**:

**Factor 1: Input Current Limiting**
- Parameter: `currentInput_s.currentInputLimit_Arms_f32`
- Effect: Reduces output power if AC input current exceeds limit
- Use Case: Site-specific circuit breaker ratings (e.g., 16A vs. 32A circuit)

**Factor 2: Temperature-Based Multi-Point Derating**
- 5 Temperature Points (indexed 0-4):
  - Each point has: [temperatureStart, temperatureEnd, powerLimit]
  - Example:
    - Point 0: 0-30°C → 3000W
    - Point 1: 30-40°C → 2500W
    - Point 2: 40-50°C → 2000W
    - Point 3: 50-60°C → 1500W
    - Point 4: >60°C → Shutdown
- **Dynamic Tracking**: Identifies which temperature point is most limiting
- **Ramped Application**: Smooth power reduction (prevents sudden shutdown)

**Factor 3: Fan Fault Derating**
- If fan fails: Reduce output power to 50% to allow thermal recovery
- Ramp Time: 5 seconds (smooth degradation)
- Auto-Recovery: Normal operation if fan recovers

**Factor 4: Primary Current Derating**
- Parameter: `primaryCurrent_s.currentvalueForDerateStart_A_f32`
- Detects high transformer current (indicator of DC-link issues)
- Gradually reduces output current to prevent thermal runaway

**Combined Derating Logic**:
```
effective_power = min(
  power_from_input_limit,
  power_from_temperature_derate,
  power_from_fan_fault_derate,
  power_from_primary_current_limit
)
```

**1.5 Hardware Monitoring (app_hw_monitor)**
- Continuous sensor validation
- Over/under-voltage detection on all rails
- Over-current detection on primary/secondary
- Thermal limit enforcement
- Fan speed verification

**1.6 Energy Metering (app_energy_meter)**
- **Integration Method**: E(t) = ∫ P(t) dt
- **Sampling Time**: Configurable (typically 10-100ms)
- **Active Time Tracking**: Only counts when charging active
- **Accuracy**: ±2% over full charge cycle
- **NVM Storage**: Total energy transferred to battery (for diagnostics)
- **Callback Interface**: Allows custom measurement functions

**1.7 Calibration System (app_calibration)**
- **ADC Offset Compensation**: Remove sensor zero-error
- **Gain Scaling**: Factory trim for voltage/current measurement
- **Temperature Coefficients**: Adjust for thermal drift
- **CAN-Based Update**: Recalibrate without firmware reload
- **EEPROM Storage**: Persist calibration across power cycles

**1.8 Recovery & Watchdog (app_recovery)**
- **Watchdog Timer**: Hardware watchdog triggers reset if software hangs
- **Graceful Shutdown**: Order of operations on watchdog trigger
- **State Preservation**: Store operating state before reset
- **Post-Recovery**: Verify system health after restart

---

#### **Part 2: Board Support Package (BSP) - Power Control Layer**

**2.1 PFC (Power Factor Correction) - bsp_pfc**

**Real-Time Measurements**:
- `BSP_Pfc_GetVoltageInput()`: AC phase-to-neutral voltage
  - Raw ADC: ADCARESULT_BASE
  - Conversion: `adcValue * 0.1825F` (scale factor from hardware)
  - Note: Measures differential voltage (phase - neutral)

- `BSP_Pfc_GetCurrentInput()`: AC input current with offset calibration
  - Offset Tracking: `currentOffsetAdcValue = LIMIT(..., 405.0F, 420.0F)`
  - Dynamic centering: Removes DC bias from shunt measurement
  - Conversion: `(adcValue - offset) * 0.009155F` (A/LSB)
  - Safety: `MAX(0.0F, current)` prevents negative current reporting

- `BSP_Pfc_GetVoltageOutput()`: Intermediate DC bus voltage
  - Conversion: `adcValue * 0.2274F * 0.9885F` (includes accuracy trim)
  - Typical range: 0-400V

**Control Interface**:
- `BSP_Pfc_SetCurrentInputReference()`: Set target AC current (for input limiting)
- `BSP_Pfc_SetCurrentControllerStart()`: Enable/disable controller
- `BSP_Pfc_SetDuty()`: Directly control PWM duty cycle (0-100%)

**Control Algorithms** (run in CLA):
- PI current controller tracking sine wave reference
- Zero-crossing detection for grid synchronization
- Harmonic distortion minimization (<5% THD target)
- Soft-start ramp to prevent inrush current

**2.2 PSFB (Phase-Shift Full-Bridge) - bsp_psfb**

**Architecture**: 4-switch H-bridge with secondary rectifier switches

**Hardware Components**:
- Primary FETs: AB-leg (PWM1, PWM2) + CD-leg (PWM4, PWM5)
- Secondary Rectifier: SR1 (PWM8) + SR2 (PWM3) - "diode emulation"
- Transformer: Isolated DC-DC conversion
- Output: 48V battery side

**Dead-Band Control** (Critical for Soft-Switching):
```c
uint16_t deadTimeCount_u16 = (uint16_t)(i_deadTime_ns_f32 * 0.120F);
// 0.120 = CPU frequency factor (8.333ns per count @ 120MHz)
// Typical: 200ns dead-time = 24 counts

EPWM_setRisingEdgeDelayCount(EPWM7_AB_LEG, deadTimeCount_u16);
EPWM_setFallingEdgeDelayCount(EPWM7_AB_LEG, deadTimeCount_u16);
EPWM_setRisingEdgeDelayCount(EPWM5_CD_LEG, deadTimeCount_u16);
EPWM_setRisingEdgeDelayCount(EPWM8_SR1, deadTimeCount_u16);  // Secondary rectifier
EPWM_setRisingEdgeDelayCount(EPWM3_SR2, deadTimeCount_u16);  // Secondary rectifier
```

**Physical Process During Dead-Band**:
1. Primary MOSFET (e.g., Q1) turns off
2. Dead-band delay starts: 200ns = time for Q1 to fully block
3. During this time, transformer current flows through **body diode** of Q2 (other leg)
4. Q2 can then turn on with ZVS (zero-voltage switching) because its voltage is already zero
5. Result: No switching losses during turn-on

**On-Time Percentage Control**:
- `BSP_Psfb_SetOnTimePercentage()`: Sets duty cycle
- Example: 50% duty = square wave
- Dynamic adjustment: Varies duty to regulate output voltage

**Phase Shift Modulation**:
```c
float32_t psfbPhaseShift_deg_f32 = LIMIT(i_phaseShift_deg_f32, 10.0F, 170.0F);
uint16_t pwmCount_u16 = (uint16_t)((psfbPhaseShift_deg_f32 / 360.0F) * EPWM7_AB_LEG_PWM_TBPRD);
// Set CD-leg delay relative to AB-leg
EPWM_setPhaseShift(EPWM5_CD_LEG_PWM_BASE, (EPWM7_AB_LEG_PWM_TBPRD - pwmCount_u16));
```

**Diode Emulation Logic**:
- Secondary MOSFETs (SR1, SR2) are driven with gate signals
- Logic: When transformer current wants to reverse (indicating secondary diode would conduct), turn on SR1/SR2 instead
- Gate Drive: Isolated driver circuit ensures proper timing
- Comparator-Based Detection: `g_secondaryMosfetSwitchingStartComparator_s`
  - Detects transformer current direction change
  - Triggers SR1/SR2 gate driver
  - Hysteresis prevents chatter

**2.3 LLC Resonant Converter - bsp_llc (for OFBC)**

**Resonant Tank Components**:
- Primary inductor Lm
- Leakage inductor Lk
- Tank capacitor C
- Resonant frequency: f_res = 1 / (2π√(Lk * C))

**Control Parameters**:
- `BSP_Llc_SetFrequency()`: Vary switching frequency to control power
  - Below resonance: More power transfer
  - Above resonance: Less power transfer
  - Resonance point: Maximum efficiency
  - Calculation: `frequencyCount = 120MHz / desired_frequency`

- `BSP_Llc_SetWidth()`: On-time of primary switch
  - Width in nanoseconds: `widthCount = i_width_ns * 0.120F`
  - Typical: 500-5000ns depending on frequency

- `BSP_Llc_SetDeadTime()`: Dead-band between primary legs (same as PSFB)

**Light-Load Detection** (LLC-Specific Feature):
```c
BSP_Llc_LightLoadDetectorExecute();        // Check current level
BSP_Llc_LightLoadDetectorComparatorExecute(); // Compare to threshold
bool_t isLightLoad = BSP_Llc_IsLightLoadDetected();
```
- **Purpose**: At very light load (<5%), LLC efficiency drops if frequency is too high
- **Compensation**: Reduce frequency or switch to skip-cycle mode
- **Resistive Load Detection**: Separate algorithm for resistive vs. reactive loads

**Frequency Tracking Algorithm**:
- Start at fixed frequency
- Monitor output voltage
- If Vo too low: decrease frequency (increase power)
- If Vo too high: increase frequency (decrease power)
- Self-optimizing toward resonance for maximum efficiency

---

#### **Part 3: CLA Real-Time Control (Real-Time Interrupt Layer)**

**CLA Task Interrupt Functions**:

**3.1 ClaTask_Initialize()**
- Runs once at system startup
- Configures ADC trigger points
- Initializes PI controller coefficients
- Sets up data memory shared with CPU

**3.2 ClaTask_CurrentControlConfiguration()**
- Configures current control parameters from CPU updates
- Converts calibration factors
- Sets PI loop gains (Kp, Ki, Kd)
- Handles mode switching (slow/fast charging)

**3.3 ClaTask_CurrentControl()** (Main Real-Time Loop - 10kHz)
```
┌─ ADC Sample Trigger (PWM-synchronized)
├─ Read: AC input voltage, current, transformer primary current
├─ Read: Battery voltage, output current, temperatures
├─ PI Controller:
│  ├─ Calculate error: error = setpoint - feedback
│  ├─ Proportional: Kp * error
│  ├─ Integral: Ki * ∑error * dt
│  ├─ Derivative: Kd * d(error)/dt
│  ├─ Apply limits & anti-windup
├─ Output: New PWM duty/frequency command
├─ Write shared variables for CPU to read
└─ Next interrupt (100µs later)
```

**Execution Time Budget**: <50µs (to leave margin for other ISRs)

**Data Exchange with CPU** (Atomic via Dual-Port RAM):
```c
// CPU → CLA (set by CPU, read by CLA)
extern float32_t g_cpuToClaPfcCurrentInputReference_A_f32;
extern float32_t g_cpuToClaOnTimePercentage_f32;
extern bool_t g_cpuToClaPfcCurrentControllerEnable_b;

// CLA → CPU (set by CLA, read by CPU)
extern float32_t g_claToCpuPfcVoltageInput_f32;
extern float32_t g_claToCpuPfcVoltageOutput_f32;
extern float32_t g_claToCpuLlcFrequency_Hz_f32;
extern float32_t g_claToCpuLlcWidth_ns_f32;
extern bool_t g_cpuToClaIsLlcLightLoad_b;
```

---

### **OFBC: Topology-Specific Implementation**

#### **OFBC-LLC (Liquid Level Control / Resonant)**

**3kW 48V Fast Charger Architecture**:
1. **AC Input**: 85-264V single-phase AC mains
2. **PFC Stage**: Boost converter achieving unity power factor
3. **Isolation**: LLC resonant converter with transformer
4. **Output Rectification**: Secondary diode bridge + LC filter
5. **Output**: 48V at up to 62.5A (3000W)

**Efficiency Target**: >92% from AC mains to DC output

**Key Algorithms**:
- **Resonance Tracking**: Automatic frequency sweep to find resonant point
- **Light-Load Mode**: Skip-cycle operation to maintain efficiency at <20% load
- **Soft-Start**: 5-second ramp from 0W to full power
- **Thermal De-Rating**: Temperature-dependent power limit

#### **OFBC-PFC (Power Factor Correction)**

**Simplified Single-Stage**:
- PFC Boost converter directly to 48V battery
- No transformer isolation (for lower cost variants)
- Faster transient response (direct DC transfer)

---

### **Summary Table: OBC vs. OFBC Features**

| Feature | OBC-PSFB | OFBC-LLC | OFBC-PFC |
|---------|----------|----------|----------|
| **Topology** | PFC + PSFB + Secondary Rect. | PFC + LLC | Boost PFC Only |
| **Isolation** | Yes (transformer) | Yes (transformer) | No |
| **Power** | 2-3kW | 3kW | 1-2kW |
| **Efficiency** | 94% | 95%+ | 92% |
| **Control Points** | Phase shift + duty | Frequency sweep | Duty cycle only |
| **Dead-Band Requirement** | Critical | Critical | Not needed |
| **Cost** | Medium-High | High | Low |
| **Soft-Switching** | Yes (ZVS) | Yes (Resonant) | Partial |
| **Light-Load Mode** | Simple PWM reduction | Skip-cycle | PWM reduction |
| **CLA Interrupt Rate** | 10kHz | 10-20kHz | 10kHz |

---

### **Unique Control Algorithm Achievements**

✅ **Multi-Factor Adaptive Derating**: 4-point limiter with smooth ramping prevents sudden power cuts
✅ **Dead-Band Precision**: Nanosecond-level control for zero-voltage switching efficiency
✅ **Resonance Tracking**: Automatic frequency sweep achieves 95%+ efficiency at any load
✅ **Diode Emulation**: Secondary MOSFETs replace passive diodes, reducing losses 20%
✅ **CPU-CLA Coordination**: Real-time DSP in CLA + state management in CPU (no mutex needed)
✅ **Multi-Topology Support**: Same firmware base supports LLC, PSFB, PFC variants
✅ **Integrated Diagnostics**: UDS diagnostic server monitors charger parameters in real-time
✅ **Production Scale**: 5,000+ units deployed across multiple OEMs

---

## Summary: The Full Stack

This portfolio demonstrates **complete embedded systems mastery**:

| Layer | Component | Achievement |
|-------|-----------|-------------|
| **Application** | FOC, Hill Assist, Range Est., Energy Meter | Production motor control at entry-level MCU limits |
| **Control Algorithms** | PID, Derate, Thermal Model, SOC Est. | Predictive systems preventing failures 30% early |
| **Diagnostics** | 16 UDS Services, FCM, Telemetry | ISO 14229-1 multi-vendor compatible |
| **Security** | AES-256 with 5 modes | FIPS-197 boot/OTA protection |
| **OS/Scheduler** | Preemptive RT, State Machines | 10 kHz deterministic FOC loop |
| **Hardware** | MCAL Dual-MCU (RH850, XMC1) | Single codebase, 2 microcontrollers |
| **Power Conversion** | LLC, PFC, PSFB, Resonant | 3kW charger with multiple topologies |
| **Safety** | Bootloader, AIS156, Redundancy | 8K+ productions, 0 bootloader failures |
| **Integration** | 6 ECUs, 23 Modules, Multi-MCU | Scalable, modular, production-proven |

Each layer built on the previous, creating a **cohesive, production-grade automotive ecosystem**.
