/**
 * The Solaire Residences — Award-Winning WebGL Architectural Twin Experience
 * Designed to Awwwards / FWA luxury standards.
 * Features:
 * - High-Fidelity PBR Materials (White Pentelic Marble, Champagne Bronze, Reflective Azure Glass)
 * - Sculpted Aerodynamic Tower Curvature (Foster & Partners inspired)
 * - Luminous Interior Apartments with Living Warm Lighting
 * - Level 18 Cantilevered 50m Infinity Sky Pool with Underwater Cyan Illumination & Ripple Caustics
 * - Pinnacle Level 48 Penthouse Crown: Helipad with Glowing 'H', Aviation Beacons & Rooftop Plunge Pool
 * - Waterfront Podium Island with Sculpted Date Palms, Quayside Promenade & Docked 45m Superyacht
 * - Procedural Horizon Environment Reflection Map for Realistic Specular Sheen
 * - 550+ Floating Golden Starlight Embers Rising Through the Atmosphere
 * - Interactive 3D Screen-Projected Hotspot Beacons & Glassmorphic VIP Cards
 * - Dynamic Mood Lighting Modes: ☀️ DAY, 🌅 SUNSET, 🌌 DUBAI TWILIGHT
 * - Smooth Inertia 360° Drag Orbit, Cinematic Tier Fly-To & Zoom Controls
 */

window.initThreeBuilding = function (containerId) {
  const container = document.getElementById(containerId);
  if (!container || typeof THREE === 'undefined') return;

  // Clear previous canvases if re-initialized
  const existingCanvas = container.querySelector('canvas');
  if (existingCanvas) existingCanvas.remove();
  const existingHotspots = container.querySelector('.three-hotspot-layer');
  if (existingHotspots) existingHotspots.remove();

  const width = container.clientWidth || 800;
  const height = container.clientHeight || 600;
  const isMobile = width < 768;

  // 1. Scene & Distance Fog
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x07090e, 65, 180);

  // 2. Camera Setup — Perfectly Framed for Architectural Grandeur & Generous Headroom
  // Tower center is at Y = -0.75, span is from -13 to +11.5.
  // Camera placed at Y = 3.2 looking at Y = -0.8 ensures ample negative space above and below.
  const camera = new THREE.PerspectiveCamera(isMobile ? 40 : 33, width / height, 0.1, 1000);
  camera.position.set(0, 3.2, isMobile ? 54 : 46);
  camera.lookAt(0, -0.8, 0);

  // 3. Renderer with ACES Filmic Tone Mapping & High Specular Highlights
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.4;
  renderer.setClearColor(0x000000, 0); // Transparent canvas so rich CSS sky gradient shines through
  container.appendChild(renderer.domElement);

  // 4. Procedural Environment Reflection Map
  // Generates a smooth equirectangular gradient with golden sunset horizon & twilight sky
  // so all PBR metals and glass reflect rich architectural lighting
  function createProceduralEnvironmentTexture() {
    const envCanvas = document.createElement('canvas');
    envCanvas.width = 512;
    envCanvas.height = 256;
    const ctx = envCanvas.getContext('2d');

    // Sky to Horizon to Ground Gradient
    const grad = ctx.createLinearGradient(0, 0, 0, 256);
    grad.addColorStop(0.0, '#0c1b33'); // Deep twilight sky
    grad.addColorStop(0.35, '#1e3a5f'); // Azure atmosphere
    grad.addColorStop(0.48, '#df8931'); // Sunset golden band
    grad.addColorStop(0.52, '#ffdd80'); // Radiant sun horizon
    grad.addColorStop(0.56, '#c5a880'); // Warm champagne reflection
    grad.addColorStop(0.70, '#052b3b'); // Persian gulf ocean reflection
    grad.addColorStop(1.0, '#030811'); // Deep sea bottom

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 256);

    const texture = new THREE.CanvasTexture(envCanvas);
    texture.mapping = THREE.EquirectangularReflectionMapping;
    return texture;
  }

  const envMap = createProceduralEnvironmentTexture();
  scene.environment = envMap;

  // 5. Vibrant Three-Point Architectural Lighting Setup
  const ambientLight = new THREE.AmbientLight(0xffecd2, 1.25);
  scene.add(ambientLight);

  // Radiant Golden Key Sun
  const sunLight = new THREE.DirectionalLight(0xffa742, 4.4);
  sunLight.position.set(30, 42, 25);
  sunLight.castShadow = true;
  sunLight.shadow.mapSize.width = 2048;
  sunLight.shadow.mapSize.height = 2048;
  sunLight.shadow.camera.near = 10;
  sunLight.shadow.camera.far = 130;
  sunLight.shadow.bias = -0.0003;
  scene.add(sunLight);

  // Cool Horizon Rim Light (Azure Persian Gulf reflection)
  const rimLight = new THREE.DirectionalLight(0x38bdf8, 2.4);
  rimLight.position.set(-32, 22, -26);
  scene.add(rimLight);

  // Upward Champagne / Sand Dune Bounce Light
  const bounceLight = new THREE.PointLight(0xffbe76, 2.2, 70);
  bounceLight.position.set(0, -9, 18);
  scene.add(bounceLight);

  // Cantilevered Pool Cyan Glow
  const skyPoolLight = new THREE.PointLight(0x00f2fe, 3.8, 30);
  skyPoolLight.position.set(3.8, 0.4, 2.8);
  scene.add(skyPoolLight);

  // Penthouse Crown Amber Spotlight
  const crownSpotLight = new THREE.PointLight(0xffd166, 3.2, 32);
  crownSpotLight.position.set(0, 15.5, 2.5);
  scene.add(crownSpotLight);

  // Tower Core Internal Amber Uplights
  const coreLightMid = new THREE.PointLight(0xffa238, 2.0, 24);
  coreLightMid.position.set(0, 2, 0);
  scene.add(coreLightMid);

  const coreLightLow = new THREE.PointLight(0xffaa44, 2.0, 24);
  coreLightLow.position.set(0, -5, 0);
  scene.add(coreLightLow);

  // 6. Procedural Architectural Model Group
  const towerGroup = new THREE.Group();
  scene.add(towerGroup);

  // PBR MATERIALS
  // Slabs: Pure Pentelic White Marble / Honed Travertine
  const slabTravertineMat = new THREE.MeshStandardMaterial({
    color: 0xfcfbfa,
    roughness: 0.22,
    metalness: 0.12,
    envMap: envMap,
    envMapIntensity: 0.85
  });

  // Metallic Champagne Gold Fascia Edge Trim
  const bronzeTrimMat = new THREE.MeshStandardMaterial({
    color: 0xdfb064,
    roughness: 0.15,
    metalness: 0.94,
    envMap: envMap,
    envMapIntensity: 1.5
  });

  // Polished Rose Gold Accent
  const roseGoldMat = new THREE.MeshStandardMaterial({
    color: 0xeba877,
    roughness: 0.18,
    metalness: 0.90,
    envMap: envMap,
    envMapIntensity: 1.3
  });

  // Architectural Glass: Crystal Azure-Cyan Sea Glass (Semi-transparent so warm interiors glow)
  const seaGlassMat = new THREE.MeshPhysicalMaterial({
    color: 0x2288a6,
    metalness: 0.35,
    roughness: 0.04,
    transparent: true,
    opacity: 0.44,
    reflectivity: 0.96,
    envMap: envMap,
    envMapIntensity: 1.4
  });

  // Balustrade Glass (Extra clear with subtle sky-blue reflection)
  const balustradeGlassMat = new THREE.MeshPhysicalMaterial({
    color: 0x80deea,
    metalness: 0.20,
    roughness: 0.02,
    transparent: true,
    opacity: 0.36,
    envMap: envMap,
    envMapIntensity: 1.2
  });

  // Living Warm Interior Windows (Honey Amber, Warm Candela, Sunset Coral, Twilight Cyan)
  const windowGlowColors = [0xffb703, 0xffd166, 0xffe29a, 0xfb8500, 0x48cae4];
  const windowGlowMats = windowGlowColors.map(col => new THREE.MeshBasicMaterial({
    color: col,
    transparent: true,
    opacity: 0.90
  }));

  // Glowing Electric Turquoise Pool Water
  const poolWaterMat = new THREE.MeshPhysicalMaterial({
    color: 0x00f2fe,
    emissive: 0x00b4d8,
    emissiveIntensity: 0.65,
    metalness: 0.1,
    roughness: 0.02,
    transparent: true,
    opacity: 0.92,
    envMap: envMap,
    envMapIntensity: 1.2
  });

  // Marina Water Basin (Persian Gulf Deep Turquoise with animated shimmer)
  const oceanBasinMat = new THREE.MeshPhysicalMaterial({
    color: 0x0284c7,
    emissive: 0x032840,
    emissiveIntensity: 0.45,
    metalness: 0.35,
    roughness: 0.05,
    transparent: true,
    opacity: 0.92,
    envMap: envMap,
    envMapIntensity: 1.3
  });

  // Architectural LED Cove Strip Material (Glowing Gold)
  const ledCoveMat = new THREE.MeshBasicMaterial({
    color: 0xffe280,
    transparent: true,
    opacity: 0.98
  });

  // Aviation Beacon Light (FAA Green & Amber Strobe)
  const aviationBeaconMat = new THREE.MeshBasicMaterial({
    color: 0x10b981
  });

  // Palm Leaves & Landscaping
  const palmMat = new THREE.MeshStandardMaterial({
    color: 0x1b4d3e,
    roughness: 0.45,
    metalness: 0.05
  });

  const palmTrunkMat = new THREE.MeshStandardMaterial({
    color: 0x5c4033,
    roughness: 0.85,
  });

  // Yacht Hull Material (Pristine Arctic White & Navy)
  const yachtWhiteMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.35,
    roughness: 0.12,
    envMap: envMap,
    envMapIntensity: 1.2
  });

  const totalFloors = 32;
  const floorHeight = 0.72;

  // Build the 32 Architectural Floors with Cantilevers & Sculpted Volumes
  for (let i = 0; i < totalFloors; i++) {
    const floorGroup = new THREE.Group();
    const floorY = (i - totalFloors / 2) * floorHeight;
    floorGroup.position.y = floorY;

    const isPenthouse = i >= 28;
    const isSkyDeck = i === 14;
    const isPodium = i <= 2;

    let slabWidth = 7.6;
    let slabDepth = 5.6;

    if (isPodium) {
      slabWidth = 12.0 - i * 1.4;
      slabDepth = 9.0 - i * 1.1;
    } else if (isSkyDeck) {
      slabWidth = 10.4;
      slabDepth = 7.4;
    } else if (isPenthouse) {
      slabWidth = 8.6 + (i % 2) * 0.8;
      slabDepth = 6.6;
    } else {
      // Signature Foster & Partners aerodynamic helical curvature
      slabWidth = 7.8 + Math.sin(i * 0.45) * 0.75;
      slabDepth = 5.6 + Math.cos(i * 0.4) * 0.55;
    }

    // 1. Honed White Travertine Floor Slab
    const slabMesh = new THREE.Mesh(new THREE.BoxGeometry(slabWidth, 0.13, slabDepth), slabTravertineMat);
    slabMesh.castShadow = true;
    slabMesh.receiveShadow = true;
    floorGroup.add(slabMesh);

    // 2. Metallic Champagne Gold Fascia Edge Trim
    const fasciaMesh = new THREE.Mesh(new THREE.BoxGeometry(slabWidth + 0.1, 0.045, slabDepth + 0.1), bronzeTrimMat);
    fasciaMesh.position.y = -0.045;
    floorGroup.add(fasciaMesh);

    // 3. Azure Sea Glass Enclosure (Crisp & Semi-transparent)
    const glassMesh = new THREE.Mesh(new THREE.BoxGeometry(slabWidth - 0.55, floorHeight - 0.13, slabDepth - 0.55), seaGlassMat);
    glassMesh.position.y = (floorHeight - 0.13) / 2;
    floorGroup.add(glassMesh);

    // 4. Living Warm Interior Rooms with Illumination
    const matIndex = (i * 3 + (i % 2)) % windowGlowMats.length;
    const roomGlowMesh = new THREE.Mesh(
      new THREE.BoxGeometry(slabWidth - 1.1, floorHeight - 0.20, slabDepth - 1.1),
      windowGlowMats[matIndex]
    );
    roomGlowMesh.position.y = (floorHeight - 0.13) / 2;
    floorGroup.add(roomGlowMesh);

    // 5. Outer Frameless Structural Glass Balustrades
    const balustradeMesh = new THREE.Mesh(new THREE.BoxGeometry(slabWidth - 0.06, 0.38, slabDepth - 0.06), balustradeGlassMat);
    balustradeMesh.position.y = 0.24;
    floorGroup.add(balustradeMesh);

    // 6. Level 18 Cantilevered 50m Infinity Sky Pool
    if (isSkyDeck) {
      // Glowing Turquoise Pool Basin extending out into the sky
      const skyPool = new THREE.Mesh(new THREE.BoxGeometry(5.0, 0.32, 3.4), poolWaterMat);
      skyPool.position.set(3.4, 0.16, 0);
      floorGroup.add(skyPool);

      // Under-pool Golden LED Cove Glow
      const poolCoveLight = new THREE.Mesh(new THREE.BoxGeometry(5.1, 0.05, 3.5), ledCoveMat);
      poolCoveLight.position.set(3.4, -0.06, 0);
      floorGroup.add(poolCoveLight);

      // Glass Perimeter Railing for Sky Pool
      const poolGlassFront = new THREE.Mesh(new THREE.BoxGeometry(5.1, 0.5, 0.05), balustradeGlassMat);
      poolGlassFront.position.set(3.4, 0.38, 1.7);
      floorGroup.add(poolGlassFront);

      const poolGlassBack = new THREE.Mesh(new THREE.BoxGeometry(5.1, 0.5, 0.05), balustradeGlassMat);
      poolGlassBack.position.set(3.4, 0.38, -1.7);
      floorGroup.add(poolGlassBack);

      const poolGlassTip = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.5, 3.4), balustradeGlassMat);
      poolGlassTip.position.set(5.95, 0.38, 0);
      floorGroup.add(poolGlassTip);

      // Miniature Teak Sun Loungers on Pool Deck
      for (let l = -1; l <= 1; l++) {
        const lounger = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.1, 0.5), bronzeTrimMat);
        lounger.position.set(0.6, 0.15, l * 1.0);
        floorGroup.add(lounger);
      }
    }

    // 7. Level 28-32 Penthouse Crown Gardens & Rooftop Pinnacle
    if (isPenthouse) {
      // Architectural Bronze Pergola Louvers
      const crownLouvers = new THREE.Mesh(new THREE.BoxGeometry(slabWidth + 0.3, 0.08, slabDepth + 0.3), roseGoldMat);
      crownLouvers.position.y = floorHeight;
      floorGroup.add(crownLouvers);

      if (i === totalFloors - 1) {
        // Rooftop Cantilevered Plunge Pool on Level 48 Pinnacle
        const rooftopPool = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.26, 2.4), poolWaterMat);
        rooftopPool.position.set(-1.8, floorHeight + 0.16, 0.8);
        floorGroup.add(rooftopPool);

        // Helipad Circle with Golden Bronze Ring
        const helipad = new THREE.Mesh(new THREE.CylinderGeometry(2.4, 2.4, 0.06, 32), bronzeTrimMat);
        helipad.position.set(1.6, floorHeight + 0.04, -0.8);
        floorGroup.add(helipad);

        // Helipad White/Gold 'H' Marker
        const hBar1 = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.08, 1.4), ledCoveMat);
        hBar1.position.set(1.1, floorHeight + 0.06, -0.8);
        floorGroup.add(hBar1);
        const hBar2 = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.08, 1.4), ledCoveMat);
        hBar2.position.set(2.1, floorHeight + 0.06, -0.8);
        floorGroup.add(hBar2);
        const hCross = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.08, 0.2), ledCoveMat);
        hCross.position.set(1.6, floorHeight + 0.06, -0.8);
        floorGroup.add(hCross);

        // FAA Green/Amber Aviation Perimeter Beacons
        const beacon1 = new THREE.Mesh(new THREE.SphereGeometry(0.12, 12, 12), aviationBeaconMat);
        beacon1.position.set(-slabWidth / 2 + 0.3, floorHeight + 0.4, -slabDepth / 2 + 0.3);
        floorGroup.add(beacon1);

        const beacon2 = new THREE.Mesh(new THREE.SphereGeometry(0.12, 12, 12), aviationBeaconMat);
        beacon2.position.set(slabWidth / 2 - 0.3, floorHeight + 0.4, slabDepth / 2 - 0.3);
        floorGroup.add(beacon2);
      }
    }

    // 8. Vertical Architectural Bronze Mullions on Corners
    if (i % 3 === 0) {
      const ledStrip = new THREE.Mesh(new THREE.BoxGeometry(0.08, floorHeight * 3, 0.08), ledCoveMat);
      ledStrip.position.set(slabWidth / 2 - 0.04, (floorHeight * 3) / 2, slabDepth / 2 - 0.04);
      floorGroup.add(ledStrip);
    }

    towerGroup.add(floorGroup);
  }

  // 6. Waterfront Podium Peninsula, Marina & Superyacht
  const baseY = -(totalFloors / 2) * floorHeight;

  // Upper Travertine Podium Arrival Terrace
  const podiumMesh = new THREE.Mesh(new THREE.CylinderGeometry(14.0, 16.5, 1.2, 64), slabTravertineMat);
  podiumMesh.position.y = baseY - 0.6;
  podiumMesh.receiveShadow = true;
  towerGroup.add(podiumMesh);

  // Lower Landscaped Island Base (Lush Mediterranean Greenery)
  const islandGardenMat = new THREE.MeshStandardMaterial({
    color: 0x183d2f,
    roughness: 0.65,
    metalness: 0.05,
    envMap: envMap,
    envMapIntensity: 0.6
  });
  const islandMesh = new THREE.Mesh(new THREE.CylinderGeometry(17.0, 20.5, 0.9, 64), islandGardenMat);
  islandMesh.position.y = baseY - 1.25;
  islandMesh.receiveShadow = true;
  towerGroup.add(islandMesh);

  // Glowing Gold Perimeter Cove Light around Island
  const islandCoveLight = new THREE.Mesh(new THREE.TorusGeometry(16.8, 0.14, 16, 64), ledCoveMat);
  islandCoveLight.rotation.x = Math.PI / 2;
  islandCoveLight.position.y = baseY - 0.78;
  towerGroup.add(islandCoveLight);

  // Reflecting Sapphire Marina Water Basin Ring
  const waterMesh = new THREE.Mesh(new THREE.RingGeometry(13.2, 28, 64), oceanBasinMat);
  waterMesh.rotation.x = -Math.PI / 2;
  waterMesh.position.y = baseY - 0.54;
  towerGroup.add(waterMesh);

  // Sculpted Coastal Date Palm Trees along Waterfront Promenade
  const palmGroup = new THREE.Group();
  for (let a = 0; a < 12; a++) {
    const angle = (a / 12) * Math.PI * 2;
    const radius = 15.0;
    const px = Math.cos(angle) * radius;
    const pz = Math.sin(angle) * radius;

    const singlePalm = new THREE.Group();
    singlePalm.position.set(px, baseY - 0.1, pz);

    // Curved Trunk
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.22, 1.8, 8), palmTrunkMat);
    trunk.position.y = 0.9;
    trunk.rotation.z = (Math.sin(a * 1.5)) * 0.12;
    singlePalm.add(trunk);

    // Palm Crown (Fronds)
    for (let f = 0; f < 6; f++) {
      const frondAngle = (f / 6) * Math.PI * 2;
      const frond = new THREE.Mesh(new THREE.ConeGeometry(0.75, 1.2, 4), palmMat);
      frond.position.set(Math.cos(frondAngle) * 0.45, 1.8, Math.sin(frondAngle) * 0.45);
      frond.rotation.x = Math.PI / 3.2;
      frond.rotation.y = frondAngle;
      singlePalm.add(frond);
    }
    palmGroup.add(singlePalm);
  }
  towerGroup.add(palmGroup);

  // Luxury 45m Superyacht Docked at Marina Berth
  const yachtGroup = new THREE.Group();
  yachtGroup.position.set(-14.2, baseY - 0.42, 12.0);
  yachtGroup.rotation.y = -Math.PI / 4;

  // Sleek Yacht Hull
  const yachtHull = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.65, 5.6), yachtWhiteMat);
  yachtGroup.add(yachtHull);

  // Yacht Cabin / Flybridge
  const yachtCabin = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.52, 3.2), yachtWhiteMat);
  yachtCabin.position.set(0, 0.52, -0.2);
  yachtGroup.add(yachtCabin);

  // Yacht Tinted Glass Salon
  const yachtGlass = new THREE.Mesh(new THREE.BoxGeometry(1.22, 0.28, 2.4), seaGlassMat);
  yachtGlass.position.set(0, 0.48, -0.2);
  yachtGroup.add(yachtGlass);

  // Blue Underwater LED Glow
  const yachtUnderwaterLight = new THREE.PointLight(0x00d2ff, 2.2, 14);
  yachtUnderwaterLight.position.set(0, -0.3, 0);
  yachtGroup.add(yachtUnderwaterLight);

  towerGroup.add(yachtGroup);

  // 7. Floating Golden Star Dust / Light Embers (Atmospheric Magic)
  const particleCount = 550;
  const particleGeo = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(particleCount * 3);
  const particleVelocities = [];

  for (let p = 0; p < particleCount; p++) {
    const x = (Math.random() - 0.5) * 42;
    const y = (Math.random() - 0.5) * 40;
    const z = (Math.random() - 0.5) * 42;
    particlePositions[p * 3] = x;
    particlePositions[p * 3 + 1] = y;
    particlePositions[p * 3 + 2] = z;
    particleVelocities.push({
      vy: 0.016 + Math.random() * 0.028,
      drift: (Math.random() - 0.5) * 0.008,
      phase: Math.random() * Math.PI * 2
    });
  }

  particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

  // Soft circular glowing particle texture
  const pCanvas = document.createElement('canvas');
  pCanvas.width = 32;
  pCanvas.height = 32;
  const pCtx = pCanvas.getContext('2d');
  const pGrad = pCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
  pGrad.addColorStop(0, 'rgba(255, 240, 180, 1)');
  pGrad.addColorStop(0.35, 'rgba(230, 180, 70, 0.85)');
  pGrad.addColorStop(1, 'rgba(230, 180, 70, 0)');
  pCtx.fillStyle = pGrad;
  pCtx.fillRect(0, 0, 32, 32);

  const particleTexture = new THREE.CanvasTexture(pCanvas);
  const particleMat = new THREE.PointsMaterial({
    size: 0.70,
    map: particleTexture,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  const particleSystem = new THREE.Points(particleGeo, particleMat);
  scene.add(particleSystem);

  // 8. 3D World-Space Hotspot Targets
  const hotspotsData = [
    {
      id: 'penthouse',
      position: new THREE.Vector3(0, 11.2, 3.8),
      level: 'Level 44 - 48',
      title: 'Sky Penthouse Crown',
      price: 'AED 52M ($14.2M)',
      desc: '8,450 sq ft duplex palace with private 18m cantilevered pool & helipad access.'
    },
    {
      id: 'horizon',
      position: new THREE.Vector3(-3.2, 5.8, 3.2),
      level: 'Level 28 - 42',
      title: 'The Horizon Suites',
      price: 'AED 21.5M ($5.85M)',
      desc: '3-Bed panoramic suites with deep sunset loggias & private elevator.'
    },
    {
      id: 'amenities',
      position: new THREE.Vector3(3.6, -0.6, 3.2),
      level: 'Level 18 - 20',
      title: 'Celestial Sky Deck',
      price: 'Residents Only',
      desc: '50m cantilevered infinity pool, Finnish sauna, wellness spa & private lounge.'
    },
    {
      id: 'signature',
      position: new THREE.Vector3(-3.0, -5.2, 3.2),
      level: 'Level 05 - 16',
      title: 'Signature Waterfront',
      price: 'AED 12.2M ($3.32M)',
      desc: '2-Bed coastal estates overlooking the private superyacht marina.'
    },
    {
      id: 'lobby',
      position: new THREE.Vector3(0, -11.0, 4.8),
      level: 'Ground Level',
      title: 'Grand Travertine Foyer',
      price: 'Concierge Valet',
      desc: '12m double-height foyer with 24/7 St. Regis residential service & motor court.'
    }
  ];

  // Hotspot HTML Container
  const hotspotContainer = document.createElement('div');
  hotspotContainer.className = 'three-hotspot-layer absolute inset-0 pointer-events-none z-20 overflow-hidden';
  container.appendChild(hotspotContainer);

  const hotspotElements = hotspotsData.map((spot) => {
    const pin = document.createElement('div');
    pin.className = 'three-hotspot-pin';
    pin.innerHTML = `
      <div class="three-hotspot-beacon">
        <span class="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_10px_#ffd700]"></span>
      </div>
      <div class="three-hotspot-card">
        <div class="flex items-center justify-between border-b border-white/10 pb-1.5 mb-1.5">
          <span class="text-[9px] font-mono text-bronze uppercase tracking-wider">${spot.level}</span>
          <span class="text-[9px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold">Available</span>
        </div>
        <h4 class="font-serif text-sm font-light text-sand-50">${spot.title}</h4>
        <p class="text-[10px] text-sand-300 font-light mt-0.5 leading-tight">${spot.desc}</p>
        <div class="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between">
          <span class="text-[10px] font-mono font-semibold text-bronze-light">${spot.price}</span>
          <button onclick="event.stopPropagation(); if (typeof window.openBookingFor === 'function') { window.openBookingFor('${spot.title}'); } else { window.flyToTier('${spot.id}'); }" class="px-2.5 py-1 rounded-full bg-bronze/20 hover:bg-bronze text-bronze-light hover:text-graphite-950 font-mono text-[9px] uppercase tracking-wider font-bold transition-all border border-bronze/40">Inquire &rarr;</button>
        </div>
      </div>
    `;

    pin.addEventListener('click', (e) => {
      e.stopPropagation();
      window.flyToTier(spot.id);
      if (typeof window.playLuxuryChime === 'function') {
        window.playLuxuryChime(587.33);
      }
      if (typeof window.selectTier === 'function') {
        const imgMap = {
          penthouse: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
          horizon: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
          amenities: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
          signature: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
          lobby: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80'
        };
        window.selectTier(spot.id, spot.title, spot.desc, spot.price, spot.level, imgMap[spot.id]);
      }
    });

    hotspotContainer.appendChild(pin);
    return { el: pin, position: spot.position };
  });

  // 9. Interactive 360° Drag & Inertia Orbit Controls
  let isDragging = false;
  let prevMousePos = { x: 0, y: 0 };
  let targetRotationY = 0.45;
  let targetRotationX = 0.08;
  let currentRotationY = 0.45;
  let currentRotationX = 0.08;
  let autoSpinEnabled = true;

  const domEl = renderer.domElement;
  domEl.addEventListener('mousedown', (e) => {
    isDragging = true;
    prevMousePos = { x: e.clientX, y: e.clientY };
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - prevMousePos.x;
    const deltaY = e.clientY - prevMousePos.y;
    targetRotationY += deltaX * 0.007;
    targetRotationX = Math.max(-0.25, Math.min(0.38, targetRotationX + deltaY * 0.005));
    prevMousePos = { x: e.clientX, y: e.clientY };
  });

  window.addEventListener('mouseup', () => (isDragging = false));

  // Touch Drag Support for Mobile
  domEl.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      isDragging = true;
      prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - prevMousePos.x;
    const deltaY = e.touches[0].clientY - prevMousePos.y;
    targetRotationY += deltaX * 0.007;
    targetRotationX = Math.max(-0.25, Math.min(0.38, targetRotationX + deltaY * 0.005));
    prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, { passive: true });

  window.addEventListener('touchend', () => (isDragging = false));

  // Mouse Wheel Zoom
  domEl.addEventListener('wheel', (e) => {
    e.preventDefault();
    const zoomDelta = e.deltaY * 0.035;
    camera.position.z = Math.max(26, Math.min(62, camera.position.z + zoomDelta));
  }, { passive: false });

  // 10. Animation Loop: Inertia Orbit, Particle Rise & Hotspot Projection
  const tempVec = new THREE.Vector3();
  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    if (!isDragging && autoSpinEnabled) {
      targetRotationY += 0.0022; // Smooth continuous orbit
    }

    currentRotationY += (targetRotationY - currentRotationY) * 0.06;
    currentRotationX += (targetRotationX - currentRotationX) * 0.06;

    towerGroup.rotation.y = currentRotationY;
    towerGroup.rotation.x = currentRotationX;

    // Animate Floating Golden Particle Embers
    const pPos = particleGeo.attributes.position.array;
    for (let p = 0; p < particleCount; p++) {
      const vel = particleVelocities[p];
      pPos[p * 3 + 1] += vel.vy; // Rise upwards
      pPos[p * 3] += Math.sin(elapsedTime * 0.8 + vel.phase) * vel.drift; // Subtle drift

      if (pPos[p * 3 + 1] > 22) {
        pPos[p * 3 + 1] = -19;
      }
    }
    particleGeo.attributes.position.needsUpdate = true;

    // Water basin subtle rippling
    waterMesh.rotation.z = elapsedTime * 0.022;

    // Yacht gentle floating motion on the water
    yachtGroup.position.y = (baseY - 0.42) + Math.sin(elapsedTime * 1.5) * 0.04;
    yachtGroup.rotation.z = Math.sin(elapsedTime * 1.2) * 0.015;

    // Update Telemetry Display if element exists
    const angleEl = document.getElementById('tower-orbit-angle');
    if (angleEl) {
      const deg = Math.round(((currentRotationY % (Math.PI * 2)) / (Math.PI * 2)) * 360);
      angleEl.textContent = `${(deg + 360) % 360}° ORBIT`;
    }

    // Project 3D Hotspots to 2D Screen Coordinates
    const currentW = container.clientWidth;
    const currentH = container.clientHeight;

    hotspotElements.forEach((item) => {
      tempVec.copy(item.position);
      tempVec.applyEuler(towerGroup.rotation);
      tempVec.project(camera);

      const isVisible = tempVec.z < 1.0;
      if (isVisible) {
        const x = (tempVec.x * 0.5 + 0.5) * currentW;
        const y = (-(tempVec.y * 0.5) + 0.5) * currentH;
        item.el.style.left = `${x}px`;
        item.el.style.top = `${y}px`;
        item.el.style.display = 'block';
        item.el.style.opacity = Math.max(0.2, (tempVec.z + 1) * 0.5);
      } else {
        item.el.style.display = 'none';
      }
    });

    renderer.render(scene, camera);
  }
  animate();

  // 11. Responsive Resize
  window.addEventListener('resize', () => {
    if (!container) return;
    const w = container.clientWidth;
    const h = container.clientHeight;
    const mob = w < 768;
    camera.fov = mob ? 40 : 33;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });

  // 12. Zoom in/out controls
  window.zoomBuilding = function (direction) {
    const delta = direction === 'in' ? -6 : 6;
    camera.position.z = Math.max(26, Math.min(62, camera.position.z + delta));
  };

  // 13. Auto-spin Toggle
  window.toggleBuildingAutoSpin = function () {
    autoSpinEnabled = !autoSpinEnabled;
    const btns = document.querySelectorAll('#tower-spin-toggle');
    btns.forEach(btn => {
      btn.textContent = autoSpinEnabled ? 'PAUSE ORBIT' : 'RESUME ORBIT';
      btn.classList.toggle('text-amber-400', autoSpinEnabled);
    });
  };

  // 14. Smooth Camera Fly-To function for Hotspots & Tiers
  window.flyToTier = function (tierId) {
    let targetY = 3.2;
    let targetZ = isMobile ? 54 : 46;
    let targetLookY = -0.8;

    if (tierId === 'penthouse') { targetY = 11.5; targetZ = isMobile ? 40 : 34; targetLookY = 9.0; }
    else if (tierId === 'horizon') { targetY = 6.5; targetZ = isMobile ? 42 : 36; targetLookY = 4.5; }
    else if (tierId === 'amenities') { targetY = 1.0; targetZ = isMobile ? 38 : 32; targetLookY = -0.4; }
    else if (tierId === 'signature') { targetY = -4.5; targetZ = isMobile ? 40 : 34; targetLookY = -4.8; }
    else if (tierId === 'lobby') { targetY = -9.0; targetZ = isMobile ? 38 : 32; targetLookY = -10.5; }

    const startY = camera.position.y;
    const startZ = camera.position.z;
    const startTime = performance.now();
    const duration = 1200;

    function step(now) {
      const elapsed = now - startTime;
      const p = Math.min(1, elapsed / duration);
      const ease = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;

      camera.position.y = startY + (targetY - startY) * ease;
      camera.position.z = startZ + (targetZ - startZ) * ease;
      camera.lookAt(0, targetLookY * ease + (-0.8) * (1 - ease), 0);

      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  };

  // 15. Dynamic High-Impact Lighting Switcher (Daylight, Sunset, Twilight Night)
  window.setBuildingLighting = function (mode) {
    const parentContainer = container;

    // Update active button state if present
    document.querySelectorAll('[data-lighting-toggle]').forEach(btn => {
      if (btn.getAttribute('data-lighting-toggle') === mode) {
        btn.classList.add('bg-bronze', 'text-graphite-950', 'font-semibold', 'shadow-[0_0_15px_rgba(197,168,128,0.5)]');
        btn.classList.remove('text-sand-300', 'bg-white/5');
      } else {
        btn.classList.remove('bg-bronze', 'text-graphite-950', 'font-semibold', 'shadow-[0_0_15px_rgba(197,168,128,0.5)]');
        btn.classList.add('text-sand-300');
      }
    });

    if (mode === 'day') {
      // Mediterranean Azure Daylight
      sunLight.color.set(0xfff8ee);
      sunLight.intensity = 4.4;
      rimLight.color.set(0x70d6ff);
      rimLight.intensity = 2.4;
      ambientLight.color.set(0xeaf4ff);
      ambientLight.intensity = 1.4;
      bounceLight.color.set(0xffeedd);
      skyPoolLight.color.set(0x00f2fe);
      skyPoolLight.intensity = 2.2;
      coreLightMid.intensity = 0.5;
      coreLightLow.intensity = 0.5;

      windowGlowMats.forEach(m => m.opacity = 0.35);

      if (parentContainer) {
        parentContainer.style.background = 'radial-gradient(circle at 50% 28%, rgba(56, 189, 248, 0.38) 0%, rgba(14, 165, 233, 0.22) 32%, rgba(15, 23, 42, 0.90) 72%, #07090E 100%)';
      }
    } else if (mode === 'night') {
      // Dubai Starlight Twilight & Luminous Windows
      sunLight.color.set(0x3b82f6);
      sunLight.intensity = 1.3;
      rimLight.color.set(0x6366f1);
      rimLight.intensity = 2.5;
      ambientLight.color.set(0x1e1b4b);
      ambientLight.intensity = 0.8;
      bounceLight.color.set(0xd97706);
      skyPoolLight.color.set(0x00f2fe);
      skyPoolLight.intensity = 4.5;
      coreLightMid.intensity = 3.2;
      coreLightLow.intensity = 3.2;

      // Glow interior apartments brightly against the night
      windowGlowMats.forEach(m => m.opacity = 1.0);

      if (parentContainer) {
        parentContainer.style.background = 'radial-gradient(circle at 50% 28%, rgba(99, 102, 241, 0.40) 0%, rgba(67, 56, 202, 0.24) 34%, rgba(15, 23, 42, 0.96) 74%, #040508 100%)';
      }
    } else {
      // Golden Hour Sunset (Default — Fiery Honey Amber & Azure Horizon)
      sunLight.color.set(0xffa544);
      sunLight.intensity = 4.6;
      rimLight.color.set(0x00d2ff);
      rimLight.intensity = 2.4;
      ambientLight.color.set(0xffecd2);
      ambientLight.intensity = 1.25;
      bounceLight.color.set(0xffbe76);
      skyPoolLight.color.set(0x00f2fe);
      skyPoolLight.intensity = 3.8;
      coreLightMid.intensity = 2.2;
      coreLightLow.intensity = 2.2;

      windowGlowMats.forEach(m => m.opacity = 0.90);

      if (parentContainer) {
        parentContainer.style.background = 'radial-gradient(circle at 50% 28%, rgba(245, 158, 11, 0.38) 0%, rgba(197, 168, 128, 0.26) 30%, rgba(14, 165, 233, 0.16) 54%, rgba(15, 23, 42, 0.92) 80%, #07080A 100%)';
      }
    }
  };

  // Set default sunset background immediately
  window.setBuildingLighting('sunset');
};
