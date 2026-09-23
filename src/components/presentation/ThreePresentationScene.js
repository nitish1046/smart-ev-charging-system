import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

/**
 * ThreePresentationScene
 * Interactive 3D microgrid and EV charging station presentation scene
 * with procedural geometry, dynamic animations, particle flows, and camera choreography.
 */
export class ThreePresentationScene {
  constructor(containerElement, options = {}) {
    this.container = containerElement;
    this.options = options;

    this.animationFrameId = null;
    this.clock = new THREE.Clock();

    // Scene & Renderer
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x070c14); // Deep cyber navy
    this.scene.fog = new THREE.FogExp2(0x070c14, 0.022);

    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;

    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    this.camera.position.set(14, 10, 16);

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false,
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    if (THREE.SRGBColorSpace) {
      this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    }
    this.container.appendChild(this.renderer.domElement);

    // Controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.maxPolarAngle = Math.PI / 2 - 0.02; // Prevent going beneath floor
    this.controls.minDistance = 2;
    this.controls.maxDistance = 35;
    this.controls.enabled = false; // Disabled by default, camera driven by slides

    // Camera target interpolations
    this.targetCameraPos = new THREE.Vector3(14, 10, 16);
    this.targetLookAt = new THREE.Vector3(0, 1.5, 0);
    this.currentLookAt = new THREE.Vector3(0, 1.5, 0);
    this.isFreeOrbit = false;

    // Simulation states
    this.v2gReverse = false;
    this.isScanning = false;
    this.scanProgress = 0;
    this.currentTheme = 'cyber'; // 'cyber' | 'day' | 'golden'
    this.chargingSOC = 68;

    // Dynamic objects collections
    this.animatedObjects = [];
    this.particleSystems = [];
    this.warningNodes = [];

    // Build Scene
    this.initLighting();
    this.initEnvironment();
    this.initStationPedestal();
    this.initElectricVehicle();
    this.initSolarCanopy();
    this.initBESSUnit();
    this.initGridSubstation();
    this.initParticleFlows();
    this.initHolographicScanner();

    // Event Listeners
    this.handleResize = this.handleResize.bind(this);
    window.addEventListener('resize', this.handleResize);

    // Start loop
    this.animate = this.animate.bind(this);
    this.animate();
  }

  // ==========================================
  // LIGHTING & AMBIENT SETUP
  // ==========================================
  initLighting() {
    this.ambientLight = new THREE.AmbientLight(0x1a2639, 1.8);
    this.scene.add(this.ambientLight);

    // Main directional sunlight/moonlight
    this.dirLight = new THREE.DirectionalLight(0xa5c9ff, 2.5);
    this.dirLight.position.set(15, 22, 12);
    this.dirLight.castShadow = true;
    this.dirLight.shadow.mapSize.width = 2048;
    this.dirLight.shadow.mapSize.height = 2048;
    this.dirLight.shadow.camera.near = 0.5;
    this.dirLight.shadow.camera.far = 50;
    this.dirLight.shadow.camera.left = -16;
    this.dirLight.shadow.camera.right = 16;
    this.dirLight.shadow.camera.top = 16;
    this.dirLight.shadow.camera.bottom = -16;
    this.dirLight.shadow.bias = -0.0005;
    this.scene.add(this.dirLight);

    // Secondary fill light
    this.fillLight = new THREE.DirectionalLight(0x00d2ff, 0.8);
    this.fillLight.position.set(-15, 12, -10);
    this.scene.add(this.fillLight);

    // Charger neon halo light
    this.chargerHaloLight = new THREE.PointLight(0x10b981, 3.5, 6);
    this.chargerHaloLight.position.set(0, 2.6, 0);
    this.scene.add(this.chargerHaloLight);

    // EV underglow neon
    this.evUnderglow = new THREE.PointLight(0x06b6d4, 2.5, 5);
    this.evUnderglow.position.set(0, 0.15, 3.2);
    this.scene.add(this.evUnderglow);

    // Substation alert warning light
    this.substationLight = new THREE.PointLight(0xf59e0b, 1.5, 8);
    this.substationLight.position.set(-8, 3.5, -3);
    this.scene.add(this.substationLight);
  }

  // ==========================================
  // ENVIRONMENT & GROUND
  // ==========================================
  initEnvironment() {
    // Ground plane
    const groundGeo = new THREE.PlaneGeometry(60, 60, 32, 32);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x090f1a,
      roughness: 0.65,
      metalness: 0.25,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    this.scene.add(ground);

    // Technical grid overlay
    const grid = new THREE.GridHelper(50, 50, 0x1e293b, 0x0f172a);
    grid.position.y = 0.005;
    this.scene.add(grid);

    // Parking bay markings
    const bayGeo = new THREE.PlaneGeometry(3.2, 5.5);
    const bayMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.18,
      wireframe: false,
    });
    const bay = new THREE.Mesh(bayGeo, bayMat);
    bay.rotation.x = -Math.PI / 2;
    bay.position.set(0, 0.01, 3.2);
    this.scene.add(bay);

    // Bay border lines
    const bayBorderGeo = new THREE.EdgesGeometry(bayGeo);
    const bayBorderMat = new THREE.LineBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.4 });
    const bayBorder = new THREE.LineSegments(bayBorderGeo, bayBorderMat);
    bayBorder.rotation.x = -Math.PI / 2;
    bayBorder.position.set(0, 0.015, 3.2);
    this.scene.add(bayBorder);
  }

  // ==========================================
  // 1. SMART EV CHARGER PEDESTAL (DC FAST DISPENSER)
  // ==========================================
  initStationPedestal() {
    this.stationGroup = new THREE.Group();

    // Base plinth
    const plinthGeo = new THREE.BoxGeometry(1.4, 0.2, 1.0);
    const plinthMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.5, metalness: 0.5 });
    const plinth = new THREE.Mesh(plinthGeo, plinthMat);
    plinth.position.y = 0.1;
    plinth.castShadow = true;
    plinth.receiveShadow = true;
    this.stationGroup.add(plinth);

    // Main column body
    const bodyGeo = new THREE.BoxGeometry(0.9, 2.5, 0.6);
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.2,
      metalness: 0.8,
    });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = 1.35;
    body.castShadow = true;
    body.receiveShadow = true;
    this.stationGroup.add(body);

    // Side accent fins (anodized cyan aluminum)
    const finGeo = new THREE.BoxGeometry(0.06, 2.3, 0.64);
    const finMat = new THREE.MeshStandardMaterial({ color: 0x06b6d4, roughness: 0.3, metalness: 0.8 });
    const leftFin = new THREE.Mesh(finGeo, finMat);
    leftFin.position.set(-0.46, 1.35, 0);
    const rightFin = new THREE.Mesh(finGeo, finMat);
    rightFin.position.set(0.46, 1.35, 0);
    this.stationGroup.add(leftFin, rightFin);

    // Top status halo (rounded crown ring)
    const haloGeo = new THREE.TorusGeometry(0.38, 0.04, 16, 32);
    this.haloMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      emissive: 0x10b981,
      emissiveIntensity: 1.2,
      roughness: 0.2,
    });
    this.halo = new THREE.Mesh(haloGeo, this.haloMat);
    this.halo.rotation.x = Math.PI / 2;
    this.halo.position.set(0, 2.65, 0);
    this.stationGroup.add(this.halo);

    // Dynamic Touchscreen Display (Canvas Texture)
    this.screenCanvas = document.createElement('canvas');
    this.screenCanvas.width = 512;
    this.screenCanvas.height = 384;
    this.screenCtx = this.screenCanvas.getContext('2d');
    this.screenTexture = new THREE.CanvasTexture(this.screenCanvas);

    const screenGeo = new THREE.PlaneGeometry(0.68, 0.52);
    const screenMat = new THREE.MeshBasicMaterial({
      map: this.screenTexture,
    });
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.position.set(0, 1.72, 0.305);
    this.stationGroup.add(screenMesh);

    // Connector Holsters & Cables
    const holsterGeo = new THREE.BoxGeometry(0.18, 0.22, 0.12);
    const holsterMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.4 });
    const holster = new THREE.Mesh(holsterGeo, holsterMat);
    holster.position.set(0.38, 1.0, 0.15);
    this.stationGroup.add(holster);

    // Flexible Charging Cable (Curved spline tube to EV port)
    this.updateCableSpline();

    this.scene.add(this.stationGroup);
  }

  updateCableSpline() {
    if (this.cableMesh) {
      this.stationGroup.remove(this.cableMesh);
    }
    // Spline curve from dispenser to EV charge port
    const p0 = new THREE.Vector3(0.38, 0.95, 0.2);
    const p1 = new THREE.Vector3(0.55, 0.4, 0.8);
    const p2 = new THREE.Vector3(0.35, 0.15, 1.4);
    const p3 = new THREE.Vector3(0.0, 0.2, 2.0);
    const p4 = new THREE.Vector3(-0.85, 0.88, 2.35); // EV Charge Port on side

    const curve = new THREE.CatmullRomCurve3([p0, p1, p2, p3, p4]);
    const cableGeo = new THREE.TubeGeometry(curve, 32, 0.038, 10, false);
    const cableMat = new THREE.MeshStandardMaterial({
      color: 0x111827,
      roughness: 0.5,
      metalness: 0.3,
    });
    this.cableMesh = new THREE.Mesh(cableGeo, cableMat);
    this.cableMesh.castShadow = true;
    this.stationGroup.add(this.cableMesh);

    this.cableCurve = curve;
  }

  updateScreenDisplay(elapsedTime) {
    if (!this.screenCtx) return;
    const ctx = this.screenCtx;

    // Background gradient
    const grad = ctx.createLinearGradient(0, 0, 512, 384);
    grad.addColorStop(0, '#020617');
    grad.addColorStop(1, '#0f172a');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 384);

    // Header bar
    ctx.fillStyle = '#06b6d4';
    ctx.fillRect(0, 0, 512, 45);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 22px system-ui, sans-serif';
    ctx.fillText('EV-CSMS DISPENSER #01 - ACTIVE', 20, 32);

    // Status pill
    const isV2G = this.v2gReverse;
    ctx.fillStyle = isV2G ? '#f59e0b' : '#10b981';
    ctx.beginPath();
    ctx.roundRect(360, 10, 135, 26, 13);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 14px system-ui, sans-serif';
    ctx.fillText(isV2G ? 'V2G EXPORT' : 'FAST CHARGING', 375, 28);

    // Real-time animated Power
    const basePower = isV2G ? -35.4 : 148.6;
    const jitter = Math.sin(elapsedTime * 4) * 1.8;
    const currentKW = (basePower + jitter).toFixed(1);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '16px system-ui, sans-serif';
    ctx.fillText('POWER OUTPUT', 30, 95);

    ctx.fillStyle = isV2G ? '#fbbf24' : '#38bdf8';
    ctx.font = 'bold 54px monospace';
    ctx.fillText(`${currentKW} kW`, 30, 150);

    // Secondary metrics: Voltage & Amps
    ctx.fillStyle = '#94a3b8';
    ctx.font = '16px system-ui, sans-serif';
    ctx.fillText('VOLTAGE / CURRENT', 30, 200);
    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 24px monospace';
    ctx.fillText(`418.4 V   |   ${Math.abs((currentKW * 1000) / 418).toFixed(1)} A`, 30, 230);

    // SOC Gauge & Bar
    ctx.fillStyle = '#94a3b8';
    ctx.font = '16px system-ui, sans-serif';
    ctx.fillText('STATE OF CHARGE (SOC)', 30, 280);

    // SOC Bar Background
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.roundRect(30, 300, 452, 28, 6);
    ctx.fill();

    // SOC Filled Bar
    const progressWidth = 452 * (this.chargingSOC / 100);
    const barGrad = ctx.createLinearGradient(30, 0, 452, 0);
    barGrad.addColorStop(0, '#10b981');
    barGrad.addColorStop(1, '#06b6d4');
    ctx.fillStyle = barGrad;
    ctx.beginPath();
    ctx.roundRect(30, 300, progressWidth, 28, 6);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 18px monospace';
    ctx.fillText(`${Math.round(this.chargingSOC)}%`, 35 + progressWidth - 45, 321);

    // Footer telemetry
    ctx.fillStyle = '#64748b';
    ctx.font = '14px system-ui, sans-serif';
    ctx.fillText('ISO 15118-20 SECURE TLS 1.3  •  DLM OPTIMIZED', 30, 360);

    this.screenTexture.needsUpdate = true;
  }

  // ==========================================
  // 2. MODERN ELECTRIC VEHICLE (EV)
  // ==========================================
  initElectricVehicle() {
    this.evGroup = new THREE.Group();
    this.evGroup.position.set(0, 0, 3.2);

    // Main Body (Sleek aerodynamic curves)
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7, // Metallic electric blue
      metalness: 0.9,
      roughness: 0.15,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });

    // Lower Chassis
    const lowerGeo = new THREE.BoxGeometry(1.9, 0.45, 4.2);
    const lower = new THREE.Mesh(lowerGeo, bodyMat);
    lower.position.y = 0.45;
    lower.castShadow = true;
    lower.receiveShadow = true;
    this.evGroup.add(lower);

    // Upper Cabin Glass Canopy
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x0f172a,
      metalness: 0.2,
      roughness: 0.05,
      transmission: 0.85,
      thickness: 0.5,
      transparent: true,
      opacity: 0.8,
    });
    const cabinGeo = new THREE.BoxGeometry(1.5, 0.55, 2.3);
    const cabin = new THREE.Mesh(cabinGeo, glassMat);
    cabin.position.set(0, 0.85, -0.1);
    cabin.castShadow = true;
    this.evGroup.add(cabin);

    // Front Hood Slope
    const hoodGeo = new THREE.BoxGeometry(1.7, 0.2, 1.2);
    const hood = new THREE.Mesh(hoodGeo, bodyMat);
    hood.position.set(0, 0.58, -1.6);
    hood.rotation.x = 0.12;
    hood.castShadow = true;
    this.evGroup.add(hood);

    // Headlights (LED Daytime Running Light Strip)
    const lightGeo = new THREE.BoxGeometry(0.35, 0.05, 0.08);
    const headMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const leftHead = new THREE.Mesh(lightGeo, headMat);
    leftHead.position.set(-0.7, 0.48, -2.12);
    const rightHead = new THREE.Mesh(lightGeo, headMat);
    rightHead.position.set(0.7, 0.48, -2.12);
    this.evGroup.add(leftHead, rightHead);

    // Taillight Lightbar (Crimson continuous bar)
    const tailGeo = new THREE.BoxGeometry(1.7, 0.05, 0.08);
    const tailMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
    const tailLight = new THREE.Mesh(tailGeo, tailMat);
    tailLight.position.set(0, 0.58, 2.12);
    this.evGroup.add(tailLight);

    // 4 Wheels
    const wheelGeo = new THREE.CylinderGeometry(0.36, 0.36, 0.26, 24);
    const tireMat = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.8 });
    const rimMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9, roughness: 0.2 });

    const wheelPositions = [
      [-0.96, 0.36, -1.3],
      [0.96, 0.36, -1.3],
      [-0.96, 0.36, 1.3],
      [0.96, 0.36, 1.3],
    ];

    wheelPositions.forEach(([x, y, z]) => {
      const wheelGroup = new THREE.Group();
      wheelGroup.position.set(x, y, z);

      const tire = new THREE.Mesh(wheelGeo, tireMat);
      tire.rotation.z = Math.PI / 2;
      tire.castShadow = true;

      const rimGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.27, 12);
      const rim = new THREE.Mesh(rimGeo, rimMat);
      rim.rotation.z = Math.PI / 2;

      wheelGroup.add(tire, rim);
      this.evGroup.add(wheelGroup);
    });

    // BATTERY PACK REVEAL (Modular glowing battery cells underneath chassis)
    this.batteryGroup = new THREE.Group();
    this.batteryGroup.position.set(0, 0.24, 0);

    const packEnclosureGeo = new THREE.BoxGeometry(1.6, 0.12, 2.8);
    const packEnclosureMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.6,
      transparent: true,
      opacity: 0.7,
      wireframe: false,
    });
    const packEnclosure = new THREE.Mesh(packEnclosureGeo, packEnclosureMat);
    this.batteryGroup.add(packEnclosure);

    // Individual glowing battery cell modules (4x6 array)
    const cellGeo = new THREE.BoxGeometry(0.3, 0.08, 0.38);
    this.batteryCells = [];
    for (let row = -2; row <= 2; row++) {
      for (let col = -1.5; col <= 1.5; col++) {
        const cellMat = new THREE.MeshStandardMaterial({
          color: 0x10b981,
          emissive: 0x10b981,
          emissiveIntensity: 0.6,
          roughness: 0.3,
        });
        const cell = new THREE.Mesh(cellGeo, cellMat);
        cell.position.set(col * 0.38, 0.03, row * 0.48);
        this.batteryGroup.add(cell);
        this.batteryCells.push(cell);
      }
    }
    this.evGroup.add(this.batteryGroup);

    // Charge Port on side with pulsing ring
    const portGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.04, 16);
    this.portMat = new THREE.MeshBasicMaterial({ color: 0x06b6d4 });
    const port = new THREE.Mesh(portGeo, this.portMat);
    port.rotation.z = Math.PI / 2;
    port.position.set(-0.95, 0.85, -0.85);
    this.evGroup.add(port);

    this.scene.add(this.evGroup);
  }

  // ==========================================
  // 3. SOLAR PV CANOPY
  // ==========================================
  initSolarCanopy() {
    this.canopyGroup = new THREE.Group();
    this.canopyGroup.position.set(0, 0, 1.5);

    // Cantilever Steel Columns
    const colMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.7, roughness: 0.3 });
    const colGeo = new THREE.CylinderGeometry(0.12, 0.14, 4.2, 16);

    const col1 = new THREE.Mesh(colGeo, colMat);
    col1.position.set(-2.4, 2.1, 0);
    col1.castShadow = true;

    const col2 = new THREE.Mesh(colGeo, colMat);
    col2.position.set(2.4, 2.1, 0);
    col2.castShadow = true;

    this.canopyGroup.add(col1, col2);

    // Slanted Solar Canopy Roof
    const roofWidth = 6.2;
    const roofDepth = 6.8;
    const roofGeo = new THREE.BoxGeometry(roofWidth, 0.12, roofDepth);
    const roofMat = new THREE.MeshStandardMaterial({
      color: 0x091e3a, // Deep solar silicon blue
      metalness: 0.8,
      roughness: 0.2,
    });
    this.solarRoof = new THREE.Mesh(roofGeo, roofMat);
    this.solarRoof.position.set(0, 4.2, 0.5);
    this.solarRoof.rotation.x = -0.12; // 7 degree tilt for optimal irradiance
    this.solarRoof.castShadow = true;
    this.canopyGroup.add(this.solarRoof);

    // Grid cell lines on solar roof
    const solarGrid = new THREE.GridHelper(6, 12, 0x38bdf8, 0x1e3a5f);
    solarGrid.position.set(0, 4.28, 0.5);
    solarGrid.rotation.x = -0.12;
    this.canopyGroup.add(solarGrid);

    this.scene.add(this.canopyGroup);
  }

  // ==========================================
  // 4. BATTERY ENERGY STORAGE SYSTEM (BESS)
  // ==========================================
  initBESSUnit() {
    this.bessGroup = new THREE.Group();
    this.bessGroup.position.set(4.5, 0, -1.8);

    // Shipping container cabinet
    const cabinetGeo = new THREE.BoxGeometry(2.4, 2.6, 1.6);
    const cabinetMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.5,
      roughness: 0.4,
    });
    const cabinet = new THREE.Mesh(cabinetGeo, cabinetMat);
    cabinet.position.y = 1.3;
    cabinet.castShadow = true;
    cabinet.receiveShadow = true;
    this.bessGroup.add(cabinet);

    // Door seams & louvers
    const louverMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.7 });
    const louverGeo = new THREE.BoxGeometry(2.0, 0.6, 0.05);
    const louver = new THREE.Mesh(louverGeo, louverMat);
    louver.position.set(0, 1.8, 0.81);
    this.bessGroup.add(louver);

    // Dual Cooling Fans (with spinning blades)
    this.coolingFans = [];
    const fanBladeGeo = new THREE.BoxGeometry(0.42, 0.05, 0.02);
    const fanMat = new THREE.MeshStandardMaterial({ color: 0x06b6d4, metalness: 0.8 });

    [-0.5, 0.5].forEach((xOffset) => {
      const fanHub = new THREE.Group();
      fanHub.position.set(xOffset, 1.8, 0.84);

      for (let i = 0; i < 4; i++) {
        const blade = new THREE.Mesh(fanBladeGeo, fanMat);
        blade.rotation.z = (i * Math.PI) / 2;
        fanHub.add(blade);
      }
      this.bessGroup.add(fanHub);
      this.coolingFans.push(fanHub);
    });

    // Vertical SOC LED Bar on BESS
    this.bessLeds = [];
    const ledBarGeo = new THREE.BoxGeometry(0.08, 0.12, 0.03);
    for (let i = 0; i < 6; i++) {
      const ledMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
      const led = new THREE.Mesh(ledBarGeo, ledMat);
      led.position.set(0.9, 0.8 + i * 0.18, 0.82);
      this.bessGroup.add(led);
      this.bessLeds.push(led);
    }

    this.scene.add(this.bessGroup);
  }

  // ==========================================
  // 5. ELECTRIC GRID SUBSTATION / TRANSFORMER POLE
  // ==========================================
  initGridSubstation() {
    this.substationGroup = new THREE.Group();
    this.substationGroup.position.set(-6.5, 0, -2.5);

    // Concrete pad
    const padGeo = new THREE.BoxGeometry(2.8, 0.3, 2.4);
    const padMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.9 });
    const pad = new THREE.Mesh(padGeo, padMat);
    pad.position.y = 0.15;
    pad.castShadow = true;
    pad.receiveShadow = true;
    this.substationGroup.add(pad);

    // Cylindrical Step-Down Transformer
    const transGeo = new THREE.CylinderGeometry(0.8, 0.8, 1.8, 20);
    const transMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.6, roughness: 0.4 });
    const trans = new THREE.Mesh(transGeo, transMat);
    trans.position.y = 1.2;
    trans.castShadow = true;
    this.substationGroup.add(trans);

    // 3 High Voltage Ceramic Bushings (Insulators)
    const bushGeo = new THREE.CylinderGeometry(0.06, 0.12, 0.65, 8);
    const bushMat = new THREE.MeshStandardMaterial({ color: 0x991b1b, roughness: 0.3 }); // Porcelain red/brown
    [-0.35, 0, 0.35].forEach((xOff) => {
      const bush = new THREE.Mesh(bushGeo, bushMat);
      bush.position.set(xOff, 2.3, 0);
      bush.castShadow = true;
      this.substationGroup.add(bush);
    });

    // Warning Beacon Node for Grid Stress slide
    const beaconGeo = new THREE.SphereGeometry(0.18, 16, 16);
    this.beaconMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.8 });
    this.beacon = new THREE.Mesh(beaconGeo, this.beaconMat);
    this.beacon.position.set(0, 2.7, 0);
    this.substationGroup.add(this.beacon);

    // Warning Rings (pulsing alert effect)
    const ringGeo = new THREE.RingGeometry(0.4, 0.6, 24);
    this.warningRingMat = new THREE.MeshBasicMaterial({
      color: 0xef4444,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
    });
    this.warningRing = new THREE.Mesh(ringGeo, this.warningRingMat);
    this.warningRing.rotation.x = Math.PI / 2;
    this.warningRing.position.set(0, 2.7, 0);
    this.substationGroup.add(this.warningRing);

    this.scene.add(this.substationGroup);
  }

  // ==========================================
  // 6. ANIMATED 3D PARTICLE ENERGY FLOWS
  // ==========================================
  initParticleFlows() {
    this.particleFlowsGroup = new THREE.Group();

    // 1. Grid -> Station Flow
    this.gridCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-6.5, 2.2, -2.5),
      new THREE.Vector3(-3.5, 2.8, -1.2),
      new THREE.Vector3(-1.0, 1.8, -0.4),
      new THREE.Vector3(0, 1.4, 0),
    ]);
    this.gridParticles = this.createFlowSystem(this.gridCurve, 0xfbbf24, 60, 0.06);

    // 2. Solar -> Station Inverter Flow
    this.solarCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 4.1, 0.5),
      new THREE.Vector3(0, 2.8, -0.2),
      new THREE.Vector3(0, 1.6, 0),
    ]);
    this.solarParticles = this.createFlowSystem(this.solarCurve, 0x10b981, 45, 0.05);

    // 3. BESS -> Station Flow
    this.bessCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(4.5, 1.4, -1.8),
      new THREE.Vector3(2.5, 1.8, -0.9),
      new THREE.Vector3(0, 1.4, 0),
    ]);
    this.bessParticles = this.createFlowSystem(this.bessCurve, 0x06b6d4, 45, 0.05);

    // 4. Charger -> EV Cable Fast Flow (Reversible for V2G!)
    this.cableFlowCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.38, 0.95, 0.2),
      new THREE.Vector3(0.55, 0.4, 0.8),
      new THREE.Vector3(0.35, 0.15, 1.4),
      new THREE.Vector3(0.0, 0.2, 2.0),
      new THREE.Vector3(-0.85, 0.88, 2.35),
    ]);
    this.cableParticles = this.createFlowSystem(this.cableFlowCurve, 0x38bdf8, 70, 0.07);

    this.scene.add(this.particleFlowsGroup);
  }

  createFlowSystem(curve, colorHex, count, size) {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const offsets = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      offsets[i] = i / count;
      const pt = curve.getPoint(offsets[i]);
      positions[i * 3] = pt.x;
      positions[i * 3 + 1] = pt.y;
      positions[i * 3 + 2] = pt.z;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const mat = new THREE.PointsMaterial({
      color: colorHex,
      size: size,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geo, mat);
    this.particleFlowsGroup.add(points);

    const system = {
      curve,
      points,
      count,
      offsets,
      baseColor: colorHex,
      speed: 0.25,
      reverse: false,
    };
    this.particleSystems.push(system);
    return system;
  }

  // ==========================================
  // 7. HOLOGRAPHIC DIGITAL TWIN SCANNER
  // ==========================================
  initHolographicScanner() {
    this.scannerGroup = new THREE.Group();
    this.scannerGroup.position.set(0, 0, 0);

    // Horizontal Scanning Laser Plane
    const scanPlaneGeo = new THREE.PlaneGeometry(3.5, 3.5);
    this.scanPlaneMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
    });
    this.scanPlane = new THREE.Mesh(scanPlaneGeo, this.scanPlaneMat);
    this.scanPlane.rotation.x = Math.PI / 2;
    this.scannerGroup.add(this.scanPlane);

    // Outer Wireframe Laser Ring
    const scanRingGeo = new THREE.RingGeometry(1.6, 1.75, 48);
    this.scanRingMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
    });
    this.scanRing = new THREE.Mesh(scanRingGeo, this.scanRingMat);
    this.scanRing.rotation.x = Math.PI / 2;
    this.scannerGroup.add(this.scanRing);

    this.scene.add(this.scannerGroup);
  }

  // ==========================================
  // ANIMATION LOOP & UPDATE
  // ==========================================
  animate() {
    this.animationFrameId = requestAnimationFrame(this.animate);
    const elapsedTime = this.clock.getElapsedTime();
    const delta = this.clock.getDelta();

    // 1. Camera Lerp (when not in free orbit)
    if (!this.isFreeOrbit) {
      this.camera.position.lerp(this.targetCameraPos, 0.04);
      this.currentLookAt.lerp(this.targetLookAt, 0.04);
      this.camera.lookAt(this.currentLookAt);
    } else {
      this.controls.update();
    }

    // 2. Station Screen Texture Update
    this.updateScreenDisplay(elapsedTime);

    // 3. Fan Rotations on BESS
    this.coolingFans.forEach((fan, idx) => {
      fan.rotation.z += (idx % 2 === 0 ? 0.08 : -0.08);
    });

    // 4. Update Particle Energy Flows
    this.particleSystems.forEach((sys) => {
      const positions = sys.points.geometry.attributes.position.array;
      const isCable = sys === this.cableParticles;
      const dir = isCable && this.v2gReverse ? -1 : 1;

      for (let i = 0; i < sys.count; i++) {
        sys.offsets[i] += sys.speed * delta * dir;
        if (sys.offsets[i] > 1.0) sys.offsets[i] -= 1.0;
        if (sys.offsets[i] < 0.0) sys.offsets[i] += 1.0;

        const pt = sys.curve.getPoint(sys.offsets[i]);
        positions[i * 3] = pt.x;
        positions[i * 3 + 1] = pt.y;
        positions[i * 3 + 2] = pt.z;
      }
      sys.points.geometry.attributes.position.needsUpdate = true;
    });

    // 5. Update Cable Particle Color during V2G
    if (this.cableParticles) {
      if (this.v2gReverse) {
        this.cableParticles.points.material.color.setHex(0xf59e0b); // Amber V2G export
        this.haloMat.color.setHex(0xf59e0b);
        this.haloMat.emissive.setHex(0xf59e0b);
        this.chargerHaloLight.color.setHex(0xf59e0b);
      } else {
        this.cableParticles.points.material.color.setHex(0x38bdf8); // Cyan normal fast charge
        this.haloMat.color.setHex(0x10b981);
        this.haloMat.emissive.setHex(0x10b981);
        this.chargerHaloLight.color.setHex(0x10b981);
      }
    }

    // 6. Substation Alert Pulsing (Grid Stress Slide)
    if (this.warningRing && this.substationLight) {
      if (this.currentMode === 'grid_stress') {
        const pulse = (Math.sin(elapsedTime * 6) + 1) / 2;
        this.warningRingMat.opacity = 0.3 + pulse * 0.5;
        this.warningRing.scale.setScalar(1 + pulse * 0.8);
        this.substationLight.intensity = 2.0 + pulse * 3.0;
      } else {
        this.warningRingMat.opacity = 0;
        this.substationLight.intensity = 1.0;
      }
    }

    // 7. Holographic Scanner Sweep Animation
    if (this.isScanning || this.currentMode === 'scanner_diagnostic') {
      const scanY = 0.2 + Math.abs(Math.sin(elapsedTime * 2.5)) * 2.4;
      this.scanPlane.position.y = scanY;
      this.scanRing.position.y = scanY;
      this.scanRing.rotation.z += 0.03;
      this.scanPlaneMat.opacity = 0.25;
      this.scanRingMat.opacity = 0.85;

      // Glow battery cells in wave
      this.batteryCells.forEach((cell, idx) => {
        const wave = Math.sin(elapsedTime * 5 + idx * 0.4);
        cell.material.emissiveIntensity = 0.4 + wave * 0.6;
      });
    } else {
      this.scanPlaneMat.opacity = 0;
      this.scanRingMat.opacity = 0;
    }

    // 8. Slow ambient drone / wheel animation or subtle camera breathing
    this.renderer.render(this.scene, this.camera);
  }

  // ==========================================
  // PUBLIC CONTROLLER API
  // ==========================================
  setSlide(slideConfig) {
    if (!slideConfig) return;
    const { camera, animationMode } = slideConfig;
    this.currentMode = animationMode;

    if (camera) {
      this.targetCameraPos.set(...camera.pos);
      this.targetLookAt.set(...camera.target);
      if (camera.fov) {
        this.camera.fov = camera.fov;
        this.camera.updateProjectionMatrix();
      }
    }

    // Adjust specific animations based on slide theme
    if (animationMode === 'v2g_reverse') {
      this.v2gReverse = true;
    } else {
      this.v2gReverse = false;
    }

    if (animationMode === 'golden_hour') {
      this.setLightingTheme('golden');
    } else {
      this.setLightingTheme('cyber');
    }

    // If user was in free orbit, transition smoothly back to slide camera
    if (this.isFreeOrbit) {
      this.enableOrbit(false);
    }
  }

  toggleV2GFlow(forceState) {
    this.v2gReverse = forceState !== undefined ? forceState : !this.v2gReverse;
    return this.v2gReverse;
  }

  triggerDiagnosticScan() {
    this.isScanning = true;
    setTimeout(() => {
      if (this.currentMode !== 'scanner_diagnostic') {
        this.isScanning = false;
      }
    }, 4500);
  }

  enableOrbit(enable) {
    this.isFreeOrbit = !!enable;
    this.controls.enabled = this.isFreeOrbit;
    if (this.isFreeOrbit) {
      this.controls.target.copy(this.currentLookAt);
    }
  }

  setLightingTheme(theme) {
    this.currentTheme = theme;
    if (theme === 'golden') {
      this.scene.background.set(0x1a120b);
      this.scene.fog.color.set(0x1a120b);
      this.ambientLight.color.set(0x52361b);
      this.dirLight.color.set(0xffa726);
      this.dirLight.intensity = 3.0;
    } else {
      // Cyber standard
      this.scene.background.set(0x070c14);
      this.scene.fog.color.set(0x070c14);
      this.ambientLight.color.set(0x1a2639);
      this.dirLight.color.set(0xa5c9ff);
      this.dirLight.intensity = 2.5;
    }
  }

  handleResize() {
    if (!this.container || !this.renderer || !this.camera) return;
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  dispose() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    window.removeEventListener('resize', this.handleResize);

    if (this.controls) {
      this.controls.dispose();
    }

    if (this.renderer && this.renderer.domElement && this.renderer.domElement.parentNode) {
      this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
      this.renderer.dispose();
    }

    // Traverse and dispose geometries and materials
    this.scene.traverse((obj) => {
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) {
        if (Array.isArray(obj.material)) {
          obj.material.forEach((m) => m.dispose());
        } else {
          obj.material.dispose();
        }
      }
    });
  }
}
