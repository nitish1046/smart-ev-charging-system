// 3D Presentation Deck Data for Smart EV Charging Station Management System (EV-CSMS)

export const PRESENTATION_METADATA = {
  title: "Smart EV Charging Station Management System",
  subtitle: "Next-Gen Autonomous Fleet, Microgrid & Cloud Management Ecosystem",
  author: "Silent Coders Systems & Architecture Team",
  date: "2026 Edition",
  totalSlides: 11,
};

export const SLIDES_DATA = [
  {
    id: "slide-1",
    slideNum: "01",
    category: "Executive Vision",
    badge: "System Overview",
    title: "Smart EV Charging Station Management System",
    subtitle: "The Intelligent Software Nervous System Powering Next-Gen E-Mobility",
    summary:
      "A comprehensive, cloud-native EV-CSMS acting as the central nexus between the electric grid, localized distributed energy resources (Solar PV + BESS), charging station hardware, and EV fleet operations.",
    keyPoints: [
      {
        title: "Grid & Microgrid Synchronization",
        desc: "Autonomous balancing between high-voltage utility feeds, onsite solar generation, and battery storage.",
        tag: "Microgrid Core",
      },
      {
        title: "Protocol Interoperability",
        desc: "Seamless end-to-end telemetry via OCPP 2.0.1, ISO 15118-20 Plug & Charge, and OCPI 2.2.1 roaming.",
        tag: "Open Standards",
      },
      {
        title: "99.2% Operational SLA",
        desc: "AI-driven automated self-healing, predictive thermal diagnostics, and real-time remote resolution.",
        tag: "Carrier Grade",
      },
    ],
    metrics: [
      { label: "Active Nodes", value: "2,450+", trend: "+38% YoY", subtext: "Managed Endpoints" },
      { label: "Fleet Uptime", value: "99.2%", trend: "NEVI Compliant", subtext: "Network Availability" },
      { label: "Peak Shaved", value: "4.8 MW", trend: "-34% Demand Cost", subtext: "Daily Grid Relief" },
      { label: "Annual Clean MWh", value: "18.2 GWh", trend: "100% Green Match", subtext: "Zero Scope 2" },
    ],
    architecture: {
      layer1: "Edge Layer: Smart Inverters, MID Meters, Embedded Linux RTOS Controllers",
      layer2: "Communication: OCPP 2.0.1 (WebSockets/WSS), ISO 15118 TLS PKI, MQTT IoT Streams",
      layer3: "Cloud Brain: Dynamic Load Balancer, AI Predictive Engine, Automated Billing Hub",
    },
    camera: {
      pos: [14, 10, 16],
      target: [0, 1.5, 0],
      fov: 45,
    },
    animationMode: "overview",
    speakerNotes:
      "Welcome everyone. Today we are presenting the architecture and real-world deployment of our Smart EV Charging Station Management System (EV-CSMS). In this opening 3D scene, notice how the microgrid is integrated: we have the high-voltage grid transformer on the left, the solar canopy on top, the commercial battery storage unit behind, and the dual-gun DC fast chargers servicing electric vehicles. Our CSMS unifies these disparate energy systems into one autonomous digital twin.",
  },
  {
    id: "slide-2",
    slideNum: "02",
    category: "Market Challenges",
    badge: "Pain Points",
    title: "The Unmanaged Charging Crisis",
    subtitle: "Grid Overloads, 20% Charger Failure Rates & Runaway Demand Charges",
    summary:
      "Deploying high-power DC fast charging (150kW - 350kW) without intelligent management triggers catastrophic utility demand penalties, localized transformer trip-outs, and pervasive consumer dissatisfaction.",
    keyPoints: [
      {
        title: "Localized Grid Congestion",
        desc: "Simultaneous unmanaged charging of 10 commercial EVs can overwhelm suburban distribution substations.",
        tag: "Transformer Stress",
      },
      {
        title: "The 20% Downtime Dilemma",
        desc: "Legacy networks suffer from unresponsive payment terminals, cable lock failures, and contactor wear.",
        tag: "Reliability Crisis",
      },
      {
        title: "Punitive Utility Demand Charges",
        desc: "Demand charges can account for over 70% of a charging station's monthly electric utility invoice.",
        tag: "Financial Bottleneck",
      },
    ],
    metrics: [
      { label: "Legacy Failure Rate", value: "20.8%", trend: "Industry Avg", subtext: "Unplanned Outages" },
      { label: "Demand Charge Share", value: "68%", trend: "Operating Expense", subtext: "Of Monthly Power Bill" },
      { label: "Transformer Lead Time", value: "78 Wks", trend: "Supply Chain", subtext: "Substation Upgrades" },
      { label: "User Abandonment", value: "14.2%", trend: "App Failures", subtext: "Payment/Auth Dropoffs" },
    ],
    architecture: {
      layer1: "Problem A: Uncontrolled coincidence factor (100% simultaneous peak load)",
      layer2: "Problem B: Zero edge fault isolation causing cascade charger shutdowns",
      layer3: "Problem C: Lack of dynamic tariff pass-through resulting in negative gross margins",
    },
    camera: {
      pos: [-10, 5, 8],
      target: [-6, 2, -2],
      fov: 42,
    },
    animationMode: "grid_stress",
    speakerNotes:
      "Looking at the 3D scene, our camera focuses down on the substation transformer. Notice the pulsing amber warning rings. When multiple fast-chargers ramp up simultaneously without smart management, the local transformer overheats. Furthermore, utility demand charges can turn a profitable station into a money-losing asset overnight unless peak power is autonomously shaved.",
  },
  {
    id: "slide-3",
    slideNum: "03",
    category: "Architecture & Standards",
    badge: "Open Protocols",
    title: "Standards-Based Interoperability",
    subtitle: "OCPP 2.0.1, ISO 15118-20 Plug & Charge & OCPI Roaming",
    summary:
      "Built strictly on open-industry protocols to eliminate vendor lock-in. Our modular microservices architecture enables secure hardware interchangeability and frictionless multi-network roaming.",
    keyPoints: [
      {
        title: "OCPP 2.0.1 Protocol Stack",
        desc: "Advanced device management, security profiles 1-3 with TLS 1.3, smart charging transactions, and display messaging.",
        tag: "Hardware Control",
      },
      {
        title: "ISO 15118-20 Plug & Charge",
        desc: "Cryptographic X.509 PKI certificate handshake directly between the vehicle VCCU and the charger SECC.",
        tag: "Zero-Touch Auth",
      },
      {
        title: "OCPI 2.2.1 Roaming",
        desc: "Cross-network billing, real-time CDR exchange, and reservation settlement with international CPOs and eMSPs.",
        tag: "Global Roaming",
      },
    ],
    metrics: [
      { label: "Auth Latency", value: "< 850ms", trend: "ISO 15118 TLS", subtext: "Vehicle Handshake" },
      { label: "Security Level", value: "TLS 1.3", trend: "X.509 PKI", subtext: "Hardware Root of Trust" },
      { label: "OCPP Compliance", value: "v2.0.1", trend: "OCTT Certified", subtext: "Full Core Profile" },
      { label: "Roaming Hubs", value: "14 Hubs", trend: "OCPI 2.2.1", subtext: "Instant Federation" },
    ],
    architecture: {
      layer1: "Edge Layer: OCPP WebSockets Client (JSON over WSS) + Local Offline Proxy (SQLite cache)",
      layer2: "Ingestion: Apache Kafka Event Bus (100k events/sec) + Redis Hot Telemetry Cache",
      layer3: "Business Services: Go/Node.js Microservices, Time-series DB (TimescaleDB), Multi-tenant Postgres",
    },
    camera: {
      pos: [0, 14, 8],
      target: [0, 2, 0],
      fov: 38,
    },
    animationMode: "iot_network",
    speakerNotes:
      "We now zoom up into a high-angle technical perspective. Notice the pulsating radio wave rings emitting from the edge IoT gateway. We do not use proprietary vendor APIs; everything is standardized on OCPP 2.0.1 and ISO 15118. With Plug & Charge, drivers simply plug the cable into the vehicle—the vehicle automatically presents its cryptographic certificate, authenticates within 850 milliseconds, and begins charging with zero app or RFID interaction.",
  },
  {
    id: "slide-4",
    slideNum: "04",
    category: "Smart Energy Core",
    badge: "Dynamic Load Management",
    title: "Dynamic Load Balancing & Microgrid Synergy",
    subtitle: "Peak Shaving, Solar PV Optimization & Sub-Second Phase Balancing",
    summary:
      "Our AI Dynamic Load Management (DLM) engine continuously samples grid capacity, building baseline loads, solar PV production, and BESS reserves to modulate current limits across all dispensers every 250 milliseconds.",
    keyPoints: [
      {
        title: "Hierarchical DLM Algorithm",
        desc: "Prioritizes critical fleet vehicles while dynamically scaling down consumer chargers to guarantee zero transformer trips.",
        tag: "Zero-Overload",
      },
      {
        title: "Solar Self-Consumption Engine",
        desc: "Directs 100% of onsite rooftop solar generation directly into connected EV batteries without AC-DC conversion losses.",
        tag: "Renewables First",
      },
      {
        title: "BESS Fast-Discharge Buffer",
        desc: "Deploys localized battery storage during sudden charging ramps to shield the utility feeder from demand spikes.",
        tag: "Peak Shaving",
      },
    ],
    metrics: [
      { label: "Current Throttling", value: "250ms", trend: "Sub-Second", subtext: "Response Interval" },
      { label: "Solar Capture", value: "96.4%", trend: "Direct to EV", subtext: "Avoided Grid Export" },
      { label: "Demand Reduction", value: "42%", trend: "Lower Utility Cost", subtext: "Peak KW Clipped" },
      { label: "Phase Imbalance", value: "< 2.1%", trend: "Dynamic 3-Phase", subtext: "IEEE 519 Compliant" },
    ],
    architecture: {
      layer1: "Inputs: Real-time Smart Meter (Modbus TCP) + Solar Inverter Pyranometer + BESS BMS state",
      layer2: "Algorithm: Quadratic Programming (QP) optimization solving power distribution every 250ms",
      layer3: "Output: SetChargingProfile.req dispatched to all dispensers via OCPP smart charging profile",
    },
    camera: {
      pos: [6, 7, -6],
      target: [2, 2.5, -2],
      fov: 40,
    },
    animationMode: "energy_balance",
    speakerNotes:
      "Look at the 3D scene now: our camera is framed between the solar canopy and the BESS battery container. Watch the flowing green solar particles and cyan battery lines. When three vehicles plug in simultaneously, rather than drawing 300 kW directly from the utility transformer, our DLM algorithm activates the battery storage and solar inverter, supplying 180 kW locally and keeping grid draw well under the contracted threshold.",
  },
  {
    id: "slide-5",
    slideNum: "05",
    category: "Grid Interactivity",
    badge: "V2G / V2X Technology",
    title: "Vehicle-to-Grid (V2G) & Virtual Power Plants",
    subtitle: "Turning Parked EVs into Decentralized Battery Storage Assets",
    summary:
      "Bi-directional DC charging transforms idle vehicle fleets into revenue-generating grid assets capable of supplying fast frequency response, synthetic inertia, and peak export power back to the grid.",
    keyPoints: [
      {
        title: "Bi-Directional DC Flow",
        desc: "ISO 15118-20 bidirectional power control enabling up to 22kW AC / 100kW DC vehicle discharge back into the hub.",
        tag: "Bi-Directional",
      },
      {
        title: "Virtual Power Plant (VPP) Aggregation",
        desc: "Aggregates thousands of plugged-in EVs to participate in wholesale energy markets and frequency regulation (FCR).",
        tag: "VPP Network",
      },
      {
        title: "Battery Health Preservation",
        desc: "Enforces non-degrading micro-cycling limits, SOC retention floors, and thermal protection to preserve vehicle warranty.",
        tag: "Cell Protection",
      },
    ],
    metrics: [
      { label: "Fleet Capacity", value: "12.4 MWh", trend: "Aggregate VPP", subtext: "Instant Reserve" },
      { label: "Discharge Revenue", value: "$1,150", trend: "/ Vehicle / Year", subtext: "Grid Ancillary Services" },
      { label: "Frequency Response", value: "< 400ms", trend: "Sub-Second Grid Support", subtext: "Grid Stabilization" },
      { label: "Cycle Degradation", value: "< 0.03%", trend: "Smart Micro-Cycling", subtext: "Negligible Wear" },
    ],
    architecture: {
      layer1: "Hardware: Bi-directional SiC (Silicon Carbide) Inverters with 97.8% round-trip efficiency",
      layer2: "Grid Link: OpenADR 2.0b Virtual Top Node (VTN) receiving automated demand response dispatch",
      layer3: "Incentive Engine: Smart contracts paying revenue share directly to driver digital wallets",
    },
    camera: {
      pos: [-4, 3, 5],
      target: [-1, 1.2, 1],
      fov: 36,
    },
    animationMode: "v2g_reverse",
    speakerNotes:
      "Notice the dramatic change in our 3D animation! The energy particles are now reversing direction—flowing from the vehicle's battery pack, back through the charging cable, into the microgrid, and out to the transformer. This is Vehicle-to-Grid (V2G) in action. Parked cars are no longer just energy consumers; they act as a distributed Virtual Power Plant, earning up to $1,150 per vehicle annually by supporting grid frequency during peak events.",
  },
  {
    id: "slide-6",
    slideNum: "06",
    category: "Reliability & Uptime",
    badge: "Digital Twin & AI",
    title: "Predictive Maintenance & Digital Twin Diagnostics",
    subtitle: "AI Thermal Profiling, Contactor Wear Prediction & 99%+ SLA Uptime",
    summary:
      "A complete real-time Digital Twin telemetry model continuously cross-checks thermal sensors, insulation resistance, voltage ripple, and connector locking pins to diagnose degradation before hardware failures manifest.",
    keyPoints: [
      {
        title: "AI Thermal Anomaly Detection",
        desc: "Tracks coolant flow and pin temperatures on CCS1/CCS2/NACS connectors to detect cable degradation and prevent thermal throttling.",
        tag: "Thermal Safety",
      },
      {
        title: "Automated Self-Healing Routine",
        desc: "Performs remote soft/hard reboot loops, automated cable unlock sequences, and isolated power module cycling without truck rolls.",
        tag: "Zero-Touch Recovery",
      },
      {
        title: "SLA & NEVI Compliance Tracker",
        desc: "Automated uptime auditing ensuring every port maintains greater than 97.0% uptime required for federal funding subsidies.",
        tag: "NEVI 97%+ SLA",
      },
    ],
    metrics: [
      { label: "Mean Time to Repair", value: "18 Mins", trend: "-76% Reduction", subtext: "Automated Fixes" },
      { label: "Prevented Outages", value: "342", trend: "Pre-Failure Alerts", subtext: "Over 6 Months" },
      { label: "Truck Rolls Avoided", value: "81.4%", trend: "Remote Resolved", subtext: "Zero Tech Travel" },
      { label: "Audited Uptime", value: "99.42%", trend: "Federally Certified", subtext: "Network Availability" },
    ],
    architecture: {
      layer1: "Edge Telemetry: 10Hz sampling of thermocouple sensors, pilot signal PWM, and DC bus capacitance",
      layer2: "AI Inference: Edge LightGBM model detecting abnormal resistance spikes and connector oxidation",
      layer3: "Service Integration: Jira/ServiceNow webhooks auto-dispatching technicians with exact replacement part numbers",
    },
    camera: {
      pos: [2.5, 3.2, 3],
      target: [0.8, 1.8, 0],
      fov: 34,
    },
    animationMode: "scanner_diagnostic",
    speakerNotes:
      "In this 3D view, watch the holographic laser scanner sweep across the internal components of the DC fast charger. Our Digital Twin monitors internal contactor cycles, capacitor health, and cable pin temperature at 10 Hertz. In 81% of cases, issues such as locked pins or firmware deadlocks are autonomously cleared by our self-healing software without ever sending a technician on site.",
  },
  {
    id: "slide-7",
    slideNum: "07",
    category: "Driver Experience",
    badge: "UX & Monetization",
    title: "Driver Experience & Automated Monetization",
    subtitle: "Zero-Tap Authentication, Dynamic Tariffs & Multi-Tenant Billing",
    summary:
      "A seamless digital experience combining ISO 15118 Plug & Charge, mobile app bay reservations, dynamic real-time kilowatt pricing, and automated enterprise expense reporting.",
    keyPoints: [
      {
        title: "Frictionless Plug & Charge",
        desc: "No apps to download, no RFID cards to tap, and no credit card skimming vulnerabilities—just plug and walk away.",
        tag: "Zero-Touch",
      },
      {
        title: "Dynamic Congestion Pricing",
        desc: "Adjusts per-kWh tariffs based on wholesale day-ahead spot electricity prices and station queuing congestion.",
        tag: "Dynamic Tariffs",
      },
      {
        title: "Multi-Tenant Fleet Billing",
        desc: "Automated Charge Detail Records (CDR) split corporate fleet charging from personal usage with one-click accounting sync.",
        tag: "Enterprise ERP",
      },
    ],
    metrics: [
      { label: "Driver Rating", value: "4.92 / 5", trend: "+1.2 vs Industry", subtext: "App Store Reviews" },
      { label: "Payment Time", value: "0.0s", trend: "Zero Friction", subtext: "With Plug & Charge" },
      { label: "Billing Accuracy", value: "99.999%", trend: "MID Certified Meters", subtext: "Micro-Cent Precision" },
      { label: "Idle Fee Compliance", value: "92.8%", trend: "Rapid Bay Turnover", subtext: "Cleared in <10m" },
    ],
    architecture: {
      layer1: "Driver Frontend: React Native Mobile App + In-Dash Apple CarPlay / Android Automotive Apps",
      layer2: "Payment Gateway: Stripe / Adyen Level 1 PCI-DSS compliant credit card processing & Apple Pay",
      layer3: "Invoicing Engine: Automated PDF billing, tax calculations, and ERP connectors (SAP, QuickBooks)",
    },
    camera: {
      pos: [1.2, 2.0, 1.8],
      target: [0.3, 1.6, 0.2],
      fov: 32,
    },
    animationMode: "kiosk_zoom",
    speakerNotes:
      "We've stepped into the driver's perspective right at the charging kiosk display. Notice the high-contrast display showing live session metrics. With our system, the driver experiences zero friction: dynamic pricing transparently displays current utility rates, bay reservation guarantees their stall before arrival, and idle fees incentivize rapid bay clearance so waiting queues are minimized.",
  },
  {
    id: "slide-8",
    slideNum: "08",
    category: "Commercial Fleet",
    badge: "Fleet Depot Management",
    title: "Commercial Fleet Depot Orchestration",
    subtitle: "Departure-Targeted Charging, Route Scheduling & Power Prioritization",
    summary:
      "Tailored for municipal transit buses, delivery vans, and logistics fleets. Our algorithms prioritize power delivery according to vehicle departure schedules, daily route mileage, and battery pre-conditioning needs.",
    keyPoints: [
      {
        title: "Departure-Targeted Scheduling",
        desc: "Guarantees 100% of fleet vehicles reach their required state-of-charge (SOC) right before their morning route departure.",
        tag: "Schedule Lock",
      },
      {
        title: "Sequential vs. Proportional Charging",
        desc: "Switches between sequential high-power charging for early dispatch vans and slow trickle charging for overnight trucks.",
        tag: "Smart Queuing",
      },
      {
        title: "Cabin & Battery Preconditioning",
        desc: "Draws grid power while still plugged in to warm/cool the battery to optimal 25°C, preserving 15-20% extra driving range.",
        tag: "Thermal Efficiency",
      },
    ],
    metrics: [
      { label: "Depot Fleet Size", value: "150 Vans", trend: "Supported per Hub", subtext: "Simultaneous Depot" },
      { label: "On-Time Dispatch", value: "99.94%", trend: "Zero Route Delays", subtext: "Mission Critical" },
      { label: "Fleet Power Savings", value: "31.2%", trend: "Off-Peak Night Charging", subtext: "Fuel Cost Reductions" },
      { label: "Range Extension", value: "+18%", trend: "Grid Preconditioning", subtext: "Cold Weather Gain" },
    ],
    architecture: {
      layer1: "Telematics Integration: Geotab, Samsara, and OEM APIs streaming live vehicle SOC, GPS, and route distance",
      layer2: "Optimization Engine: Mixed Integer Linear Programming (MILP) scheduling charging slots overnight",
      layer3: "Fail-Safe Redundancy: Local edge controller maintains schedule execution even during cloud network loss",
    },
    camera: {
      pos: [-8, 8, 12],
      target: [-2, 1.5, 0],
      fov: 42,
    },
    animationMode: "fleet_depot",
    speakerNotes:
      "This perspective overlooks the commercial fleet depot. When managing 150 electric delivery vans, you cannot charge them all at once. Our system ingests telematics data from each vehicle—route distance, driver schedule, and current battery level—and solves an automated schedule. Vans scheduled for 6 AM departure receive priority charging first, optimizing for off-peak overnight electricity rates.",
  },
  {
    id: "slide-9",
    slideNum: "09",
    category: "Financials & ESG",
    badge: "Economic ROI & Sustainability",
    title: "Economic ROI & Grid Decarbonization",
    subtitle: "3.2-Year Hardware Payback, 42% Demand Charge Savings & Zero Scope 2",
    summary:
      "Smart charging is not just an operational necessity—it is a high-yield financial investment. By stacking peak shaving, solar self-consumption, demand response revenue, and carbon credits, station operators achieve rapid payback.",
    keyPoints: [
      {
        title: "Multi-Stream Revenue Stacking",
        desc: "Combines per-kWh dispensing markups, idle fees, utility demand response payouts, and Low Carbon Fuel Standard (LCFS) credits.",
        tag: "Revenue Stacking",
      },
      {
        title: "Peak Demand Mitigation",
        desc: "Reduces peak utility draw charges by over $18,000 annually per 4-dispenser charging hub via BESS buffer integration.",
        tag: "Opex Slashed",
      },
      {
        title: "Audited Scope 2 Decarbonization",
        desc: "Real-time marginal emissions tracking matches charging events with hourly renewable grid availability for verified ESG reporting.",
        tag: "100% Green Match",
      },
    ],
    metrics: [
      { label: "Project Payback", value: "3.2 Yrs", trend: "Hardware + Install", subtext: "Capex Amortization" },
      { label: "Annual Opex Saved", value: "$42,600", trend: "Per Station Hub", subtext: "Via DLM & Solar" },
      { label: "Internal Rate of Return", value: "24.6%", trend: "10-Year Pro Forma", subtext: "IRR" },
      { label: "CO2 Offset / Yr", value: "480 Tons", trend: "Equivalent to 105 Cars", subtext: "Scope 1 & 2 Avoided" },
    ],
    architecture: {
      layer1: "Revenue Modules: Kiosk markup, subscription club memberships, idle penalties, utility capacity credits",
      layer2: "Carbon Accounting: Hourly eGRID marginal carbon factor integration verifying clean energy origin",
      layer3: "Asset Life Optimization: Temperature-capped fast charging extending dispenser power module lifespan by 40%",
    },
    camera: {
      pos: [12, 6, -10],
      target: [0, 2, 0],
      fov: 44,
    },
    animationMode: "golden_hour",
    speakerNotes:
      "Notice the golden-hour ambient lighting illuminating the station. From a financial perspective, our EV-CSMS transforms charging infrastructure from a cost center into a high-return asset. By actively clipping demand peaks and capturing solar generation, operators save over $42,000 per station annually in utility expenses, resulting in a full capital expenditure payback in just 3.2 years.",
  },
  {
    id: "slide-10",
    slideNum: "10",
    category: "Future Roadmap",
    badge: "Next-Gen Tech",
    title: "The Next Frontier: Megawatt Charging & Autonomy",
    subtitle: "3.75 MW Megawatt Charging (MCS), Robotic Docking & AI Power Trading",
    summary:
      "As heavy-duty Class 8 trucks and autonomous robotaxi fleets scale, our architecture is already architected for liquid-cooled Megawatt Charging, automated robotic docking hands-free connectors, and peer-to-peer microgrid trading.",
    keyPoints: [
      {
        title: "Megawatt Charging System (MCS)",
        desc: "Delivers up to 3,000 Amps at 1,250 Volts (3.75 MW peak) to replenish a 40-ton electric semi-truck in under 20 minutes.",
        tag: "3.75 MW Peak",
      },
      {
        title: "Autonomous Robotic Docking",
        desc: "Computer vision and 6-axis robotic arms autonomously plug into autonomous vehicle undercarriages and ports with zero human intervention.",
        tag: "Hands-Free",
      },
      {
        title: "Autonomous AI Microgrid Trading",
        desc: "Multi-agent reinforcement learning algorithms trading energy autonomously between neighboring charging hubs and microgrids.",
        tag: "AI Energy Agent",
      },
    ],
    metrics: [
      { label: "Peak Charging Power", value: "3.75 MW", trend: "MCS Standard", subtext: "Class 8 Semi-Trucks" },
      { label: "Truck 0-80% Time", value: "18 Mins", trend: "Mandatory Break", subtext: "Turnaround Time" },
      { label: "Robotic Alignment", value: "< 2.0mm", trend: "Laser Vision Guidance", subtext: "Docking Accuracy" },
      { label: "Trading Arbitrage", value: "+14.8%", trend: "Autonomous P2P", subtext: "Energy Margin Gain" },
    ],
    architecture: {
      layer1: "Heavy Conduit: Liquid-cooled (glycol-water) charging cables maintaining safe touch temperatures at 3000A",
      layer2: "Robotic Controller: ROS 2 (Robot Operating System) + Depth camera AI recognizing port insertion angles",
      layer3: "Market Agent: Decentralized energy smart contracts executing peer-to-peer energy trades in milliseconds",
    },
    camera: {
      pos: [2, 1.8, 4.5],
      target: [0, 1.4, 0],
      fov: 30,
    },
    animationMode: "megawatt_future",
    speakerNotes:
      "Looking forward to the next decade: commercial semi-trucks require megawatt-scale power. Our management platform is ready for the Megawatt Charging System standard, capable of safely coordinating up to 3.75 Megawatts per vehicle. Furthermore, as autonomous robotaxis take over our roads, robotic charging arms will plug in vehicles without any human intervention.",
  },
  {
    id: "slide-11",
    slideNum: "11",
    category: "Conclusion & Action",
    badge: "Strategic Blueprint",
    title: "Architecture Blueprint & Implementation Roadmap",
    subtitle: "From Pilot to Fleet-Scale Microgrid: 4-Phase Deployment Framework",
    summary:
      "A battle-tested deployment methodology to transition legacy stations into fully autonomous, revenue-optimized smart microgrids with zero disruption to active charging operations.",
    keyPoints: [
      {
        title: "Phase 1: Telemetry & Edge Gateway Setup",
        desc: "Deploy OCPP 2.0.1 edge controllers and smart metering to gain 100% asset visibility within 30 days.",
        tag: "Month 1",
      },
      {
        title: "Phase 2: Dynamic Load Management",
        desc: "Activate sub-second load balancing and building peak shaving to reduce utility demand charges by 35%+.",
        tag: "Month 2-3",
      },
      {
        title: "Phase 3: Solar PV & BESS Microgrid",
        desc: "Integrate onsite renewables and localized battery storage to buffer high-power charging sessions.",
        tag: "Month 4-6",
      },
      {
        title: "Phase 4: V2G & Virtual Power Plant",
        desc: "Enroll depot fleets in wholesale grid ancillary markets to monetize idle vehicle battery capacity.",
        tag: "Month 7+",
      },
    ],
    metrics: [
      { label: "Deployment Time", value: "30 Days", trend: "Phase 1 Rapid Launch", subtext: "Hardware Agnostic" },
      { label: "Lifetime Uptime", value: "99.5%", trend: "Guaranteed SLA", subtext: "Contractual Commitment" },
      { label: "Annual Savings", value: "$180k+", trend: "Per 10-Bay Depot", subtext: "Documented ROI" },
      { label: "Net Zero Target", value: "100%", trend: "Verified Scope 2", subtext: "Zero Carbon Mobility" },
    ],
    architecture: {
      layer1: "Platform: Cloud-native Kubernetes clusters with 99.99% multi-region redundancy",
      layer2: "Security: SOC 2 Type II certified, ISO 27001, end-to-end TLS 1.3 encryption with HSM key storage",
      layer3: "Support: 24/7/365 Network Operations Center (NOC) with automated failover and rapid response",
    },
    camera: {
      pos: [14, 11, 16],
      target: [0, 1.5, 0],
      fov: 46,
    },
    animationMode: "panoramic_orbit",
    speakerNotes:
      "To conclude: transforming your EV charging network into a smart, grid-responsive ecosystem is achievable through our 4-phase roadmap. We invite you to test our interactive 3D model: toggle Free Orbit mode to inspect any angle, or test our V2G discharge and diagnostic scanning simulations. Thank you, and we welcome your questions.",
  },
];
