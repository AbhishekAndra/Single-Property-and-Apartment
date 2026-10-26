/**
 * The Solaire Residences — Interactive 3D Architectural Model
 * Built with Three.js: Procedural 32-plate skyscraper with cantilevered terraces,
 * glass curtain walls, glowing interior core, suspended sky pool, and 360° drag orbit.
 */

window.initThreeBuilding = function (containerId) {
  const container = document.getElementById(containerId);
  if (!container || typeof THREE === 'undefined') return;

  const width = container.clientWidth;
  const height = container.clientHeight;

  // 1. Scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x121110);
  scene.fog = new THREE.FogExp2(0x121110, 0.015);

  // 2. Camera
  const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
  camera.position.set(0, 15, 38);

  // 3. Renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  container.appendChild(renderer.domElement);

  // 4. Lights
  const ambientLight = new THREE.AmbientLight(0xfff5ea, 0.9);
  scene.add(ambientLight);

  const sunLight = new THREE.DirectionalLight(0xffdfad, 2.8);
  sunLight.position.set(25, 45, 20);
  sunLight.castShadow = true;
  scene.add(sunLight);

  const rimLight = new THREE.DirectionalLight(0x7fb3d5, 1.2);
  rimLight.position.set(-20, 20, -25);
  scene.add(rimLight);

  // 5. Build Tower
  const towerGroup = new THREE.Group();
  scene.add(towerGroup);

  const concreteMat = new THREE.MeshStandardMaterial({ color: 0xded8ce, roughness: 0.45, metalness: 0.1 });
  const glassMat = new THREE.MeshPhysicalMaterial({ color: 0x1a2e38, metalness: 0.2, roughness: 0.05, transmission: 0.75, transparent: true, opacity: 0.85 });
  const bronzeMat = new THREE.MeshStandardMaterial({ color: 0xc5a880, metalness: 0.85, roughness: 0.25 });
  const glowMat = new THREE.MeshBasicMaterial({ color: 0xffe6c2, transparent: true, opacity: 0.8 });
  const poolMat = new THREE.MeshPhysicalMaterial({ color: 0x22a6b3, metalness: 0.1, roughness: 0.05, transmission: 0.85, transparent: true, opacity: 0.9 });

  const totalFloors = 32;
  const floorHeight = 0.72;

  for (let i = 0; i < totalFloors; i++) {
    const floorGroup = new THREE.Group();
    const floorY = (i - totalFloors / 2) * floorHeight;
    floorGroup.position.y = floorY;

    const isPenthouse = i >= 28;
    const isSkyDeck = i === 14;
    const isPodium = i <= 2;

    let slabWidth = 7.5;
    let slabDepth = 5.5;

    if (isPodium) {
      slabWidth = 12.0 - i * 1.5;
      slabDepth = 9.0 - i * 1.2;
    } else if (isSkyDeck) {
      slabWidth = 9.2;
      slabDepth = 6.2;
    } else if (isPenthouse) {
      slabWidth = 8.0 + (i % 2) * 0.8;
      slabDepth = 6.0;
    } else {
      slabWidth = 7.5 + Math.sin(i * 0.45) * 0.6;
      slabDepth = 5.2 + Math.cos(i * 0.4) * 0.4;
    }

    // Concrete Slab
    const slabMesh = new THREE.Mesh(new THREE.BoxGeometry(slabWidth, 0.12, slabDepth), concreteMat);
    slabMesh.castShadow = true;
    floorGroup.add(slabMesh);

    // Glass Enclosure
    const coreMesh = new THREE.Mesh(new THREE.BoxGeometry(slabWidth - 0.7, floorHeight - 0.12, slabDepth - 0.7), glassMat);
    coreMesh.position.y = (floorHeight - 0.12) / 2;
    floorGroup.add(coreMesh);

    // Glowing Inner Heart
    const innerMesh = new THREE.Mesh(new THREE.BoxGeometry(slabWidth - 2.2, floorHeight - 0.2, slabDepth - 2.2), glowMat);
    innerMesh.position.y = (floorHeight - 0.12) / 2;
    floorGroup.add(innerMesh);

    // Glass Balustrade
    const railMesh = new THREE.Mesh(new THREE.BoxGeometry(slabWidth - 0.1, 0.35, slabDepth - 0.1), glassMat);
    railMesh.position.y = 0.22;
    floorGroup.add(railMesh);

    if (isSkyDeck) {
      const poolMesh = new THREE.Mesh(new THREE.BoxGeometry(3.5, 0.2, 2.2), poolMat);
      poolMesh.position.set(2.4, 0.1, 0);
      floorGroup.add(poolMesh);
    }

    if (isPenthouse) {
      const crownMesh = new THREE.Mesh(new THREE.BoxGeometry(slabWidth + 0.2, 0.08, slabDepth + 0.2), bronzeMat);
      crownMesh.position.y = floorHeight;
      floorGroup.add(crownMesh);
    }

    towerGroup.add(floorGroup);
  }

  // Ground Podium
  const groundMesh = new THREE.Mesh(new THREE.CylinderGeometry(20, 22, 1.2, 64), concreteMat);
  groundMesh.position.y = -(totalFloors / 2) * floorHeight - 0.6;
  towerGroup.add(groundMesh);

  // Reflecting Water Ring
  const waterMesh = new THREE.Mesh(new THREE.RingGeometry(8, 19.5, 64), poolMat);
  waterMesh.rotation.x = -Math.PI / 2;
  waterMesh.position.y = -(totalFloors / 2) * floorHeight + 0.05;
  towerGroup.add(waterMesh);

  // 6. Interactive Drag & 360° Orbit
  let isDragging = false;
  let prevMousePos = { x: 0, y: 0 };
  let targetRotationY = 0.4;
  let targetRotationX = 0.05;
  let currentRotationY = 0.4;
  let currentRotationX = 0.05;

  const domEl = renderer.domElement;
  domEl.addEventListener('mousedown', (e) => {
    isDragging = true;
    prevMousePos = { x: e.clientX, y: e.clientY };
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - prevMousePos.x;
    const deltaY = e.clientY - prevMousePos.y;
    targetRotationY += deltaX * 0.008;
    targetRotationX = Math.max(-0.25, Math.min(0.4, targetRotationX + deltaY * 0.005));
    prevMousePos = { x: e.clientX, y: e.clientY };
  });

  window.addEventListener('mouseup', () => (isDragging = false));

  // Touch Support
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
    targetRotationY += deltaX * 0.008;
    targetRotationX = Math.max(-0.25, Math.min(0.4, targetRotationX + deltaY * 0.005));
    prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, { passive: true });

  window.addEventListener('touchend', () => (isDragging = false));

  // 7. Animation Loop
  function animate() {
    requestAnimationFrame(animate);
    if (!isDragging) targetRotationY += 0.002;
    currentRotationY += (targetRotationY - currentRotationY) * 0.06;
    currentRotationX += (targetRotationX - currentRotationX) * 0.06;
    towerGroup.rotation.y = currentRotationY;
    towerGroup.rotation.x = currentRotationX;
    renderer.render(scene, camera);
  }
  animate();

  // 8. Resize Handler
  window.addEventListener('resize', () => {
    if (!container) return;
    const w = container.clientWidth;
    const h = container.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });

  // 9. Camera Fly-To function for hotspots
  window.flyToTier = function (tierId) {
    let targetY = 15;
    let targetZ = 38;
    if (tierId === 'penthouse') { targetY = 22; targetZ = 32; }
    else if (tierId === 'horizon') { targetY = 16; targetZ = 34; }
    else if (tierId === 'amenities') { targetY = 8; targetZ = 30; }
    else if (tierId === 'signature') { targetY = -2; targetZ = 32; }
    else if (tierId === 'lobby') { targetY = -8; targetZ = 28; }

    const startY = camera.position.y;
    const startZ = camera.position.z;
    const startTime = performance.now();
    const duration = 1000;

    function step(now) {
      const elapsed = now - startTime;
      const p = Math.min(1, elapsed / duration);
      const ease = 0.5 - Math.cos(p * Math.PI) / 2;
      camera.position.y = startY + (targetY - startY) * ease;
      camera.position.z = startZ + (targetZ - startZ) * ease;
      camera.lookAt(0, camera.position.y * 0.4, 0);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  };
};

