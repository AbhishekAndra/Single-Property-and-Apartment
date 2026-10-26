import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { hotspots } from '../data/residencesData';
import { Layers, ChevronRight, Eye, Sparkles, Compass, Check, ArrowRight, Rotate3d } from 'lucide-react';

export default function Building3DExplorer({ onOpenBooking }) {
  const mountRef = useRef(null);
  const [activeHotspot, setActiveHotspot] = useState(hotspots[0]);
  const [selectedFloor, setSelectedFloor] = useState(48);
  const [isOrbiting, setIsOrbiting] = useState(false);
  const [is3DMode, setIs3DMode] = useState(true);

  // References for Three.js scene
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const towerGroupRef = useRef(null);
  const floorMeshesRef = useRef([]);

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x121110);
    scene.fog = new THREE.FogExp2(0x121110, 0.015);

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(0, 15, 38);
    cameraRef.current = camera;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xfff5ea, 0.9);
    scene.add(ambientLight);

    // Warm golden hour sunlight
    const sunLight = new THREE.DirectionalLight(0xffdfad, 2.8);
    sunLight.position.set(25, 45, 20);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    scene.add(sunLight);

    // Cool rim light from water / ocean horizon
    const rimLight = new THREE.DirectionalLight(0x7fb3d5, 1.2);
    rimLight.position.set(-20, 20, -25);
    scene.add(rimLight);

    // Soft upward warm bounce light
    const bounceLight = new THREE.PointLight(0xc5a880, 1.5, 40);
    bounceLight.position.set(0, -2, 10);
    scene.add(bounceLight);

    // 5. Build Architectural Tower Model
    const towerGroup = new THREE.Group();
    towerGroupRef.current = towerGroup;
    scene.add(towerGroup);

    // Materials
    const concreteMaterial = new THREE.MeshStandardMaterial({
      color: 0xded8ce,
      roughness: 0.45,
      metalness: 0.1,
    });

    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x1a2e38,
      metalness: 0.2,
      roughness: 0.05,
      transmission: 0.75,
      transparent: true,
      opacity: 0.85,
      reflectivity: 0.9,
      ior: 1.52,
    });

    const bronzeMetalMaterial = new THREE.MeshStandardMaterial({
      color: 0xc5a880,
      metalness: 0.85,
      roughness: 0.25,
    });

    const interiorGlowMaterial = new THREE.MeshBasicMaterial({
      color: 0xffe6c2,
      transparent: true,
      opacity: 0.8,
    });

    const poolWaterMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x22a6b3,
      metalness: 0.1,
      roughness: 0.05,
      transmission: 0.85,
      transparent: true,
      opacity: 0.9,
    });

    // Create 32 architectural floor plates
    const floorMeshes = [];
    const totalFloors = 32;
    const floorHeight = 0.72;

    for (let i = 0; i < totalFloors; i++) {
      const floorGroup = new THREE.Group();
      const floorY = (i - totalFloors / 2) * floorHeight;
      floorGroup.position.y = floorY;

      // Slab dimensions (tapering slightly and stepping with cantilevered balconies)
      const isPenthouse = i >= 28;
      const isSkyDeck = i === 14;
      const isPodium = i <= 2;

      let slabWidth = 7.5;
      let slabDepth = 5.5;

      if (isPodium) {
        slabWidth = 12.0 - i * 1.5;
        slabDepth = 9.0 - i * 1.2;
      } else if (isSkyDeck) {
        slabWidth = 9.2; // Extended cantilevered pool deck
        slabDepth = 6.2;
      } else if (isPenthouse) {
        slabWidth = 8.0 + (i % 2) * 0.8; // Dramatic staggered penthouse terraces
        slabDepth = 6.0;
      } else {
        // Sculpted undulating floor lines
        const wave = Math.sin(i * 0.45) * 0.6;
        slabWidth = 7.5 + wave;
        slabDepth = 5.2 + Math.cos(i * 0.4) * 0.4;
      }

      // Concrete floor slab
      const slabGeo = new THREE.BoxGeometry(slabWidth, 0.12, slabDepth);
      const slabMesh = new THREE.Mesh(slabGeo, concreteMaterial);
      slabMesh.castShadow = true;
      slabMesh.receiveShadow = true;
      floorGroup.add(slabMesh);

      // Glass core
      const coreGeo = new THREE.BoxGeometry(slabWidth - 0.7, floorHeight - 0.12, slabDepth - 0.7);
      const coreMesh = new THREE.Mesh(coreGeo, glassMaterial);
      coreMesh.position.y = (floorHeight - 0.12) / 2;
      floorGroup.add(coreMesh);

      // Inner glowing core
      const innerCoreGeo = new THREE.BoxGeometry(slabWidth - 2.2, floorHeight - 0.2, slabDepth - 2.2);
      const innerCoreMesh = new THREE.Mesh(innerCoreGeo, interiorGlowMaterial);
      innerCoreMesh.position.y = (floorHeight - 0.12) / 2;
      floorGroup.add(innerCoreMesh);

      // Balcony glass railings
      const railGeo = new THREE.BoxGeometry(slabWidth - 0.1, 0.35, slabDepth - 0.1);
      const railMesh = new THREE.Mesh(railGeo, glassMaterial);
      railMesh.position.y = 0.22;
      floorGroup.add(railMesh);

      // Add pool on SkyDeck
      if (isSkyDeck) {
        const poolGeo = new THREE.BoxGeometry(3.5, 0.2, 2.2);
        const poolMesh = new THREE.Mesh(poolGeo, poolWaterMaterial);
        poolMesh.position.set(2.4, 0.1, 0);
        floorGroup.add(poolMesh);
      }

      // Add architectural louvers & bronze mullions on Penthouse
      if (isPenthouse) {
        const crownGeo = new THREE.BoxGeometry(slabWidth + 0.2, 0.08, slabDepth + 0.2);
        const crownMesh = new THREE.Mesh(crownGeo, bronzeMetalMaterial);
        crownMesh.position.y = floorHeight;
        floorGroup.add(crownMesh);
      }

      floorGroup.userData = { floorNumber: Math.round((i / totalFloors) * 48) + 1 };
      towerGroup.add(floorGroup);
      floorMeshes.push(floorGroup);
    }

    floorMeshesRef.current = floorMeshes;

    // Ground podium & reflecting pool
    const groundGeo = new THREE.CylinderGeometry(20, 22, 1.2, 64);
    const groundMesh = new THREE.Mesh(groundGeo, concreteMaterial);
    groundMesh.position.y = -(totalFloors / 2) * floorHeight - 0.6;
    groundMesh.receiveShadow = true;
    towerGroup.add(groundMesh);

    // Reflecting water ring around tower
    const waterRingGeo = new THREE.RingGeometry(8, 19.5, 64);
    const waterRingMesh = new THREE.Mesh(waterRingGeo, poolWaterMaterial);
    waterRingMesh.rotation.x = -Math.PI / 2;
    waterRingMesh.position.y = -(totalFloors / 2) * floorHeight + 0.05;
    towerGroup.add(waterRingMesh);

    // 6. Interactive Drag & Mouse Rotation
    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };
    let targetRotationY = 0.4;
    let targetRotationX = 0.05;
    let currentRotationY = 0.4;
    let currentRotationX = 0.05;

    const onMouseDown = (e) => {
      isDragging = true;
      setIsOrbiting(true);
      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMousePos.x;
      const deltaY = e.clientY - prevMousePos.y;
      targetRotationY += deltaX * 0.008;
      targetRotationX = Math.max(-0.25, Math.min(0.4, targetRotationX + deltaY * 0.005));
      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
      setIsOrbiting(false);
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Touch support for mobile devices
    const onTouchStart = (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        setIsOrbiting(true);
        prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    const onTouchMove = (e) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - prevMousePos.x;
      const deltaY = e.touches[0].clientY - prevMousePos.y;
      targetRotationY += deltaX * 0.008;
      targetRotationX = Math.max(-0.25, Math.min(0.4, targetRotationX + deltaY * 0.005));
      prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const onTouchEnd = () => {
      isDragging = false;
      setIsOrbiting(false);
    };

    domEl.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // 7. Animation Loop with smooth inertia
    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Auto slow rotation when idle
      if (!isDragging) {
        targetRotationY += 0.002;
      }

      currentRotationY += (targetRotationY - currentRotationY) * 0.06;
      currentRotationX += (targetRotationX - currentRotationX) * 0.06;

      if (towerGroupRef.current) {
        towerGroupRef.current.rotation.y = currentRotationY;
        towerGroupRef.current.rotation.x = currentRotationX;
      }

      renderer.render(scene, camera);
    };
    animate();

    // 8. Resize Handler
    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      domEl.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      domEl.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      if (renderer.domElement && mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // When a hotspot is clicked, adjust camera and floor highlight
  const handleSelectHotspot = (spot) => {
    setActiveHotspot(spot);
    if (!cameraRef.current) return;

    let targetY = 15;
    let targetZ = 38;

    if (spot.id === 'penthouse') {
      targetY = 22;
      targetZ = 32;
      setSelectedFloor(48);
    } else if (spot.id === 'horizon') {
      targetY = 16;
      targetZ = 34;
      setSelectedFloor(36);
    } else if (spot.id === 'amenities') {
      targetY = 8;
      targetZ = 30;
      setSelectedFloor(20);
    } else if (spot.id === 'signature') {
      targetY = -2;
      targetZ = 32;
      setSelectedFloor(12);
    } else if (spot.id === 'lobby') {
      targetY = -8;
      targetZ = 28;
      setSelectedFloor(1);
    }

    // Smoothly animate camera
    if (cameraRef.current) {
      const cam = cameraRef.current;
      const startY = cam.position.y;
      const startZ = cam.position.z;
      const startTime = performance.now();
      const duration = 1000;

      const step = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / duration);
        const ease = 0.5 - Math.cos(progress * Math.PI) / 2; // in-out sine

        cam.position.y = startY + (targetY - startY) * ease;
        cam.position.z = startZ + (targetZ - startZ) * ease;
        cam.lookAt(0, cam.position.y * 0.4, 0);

        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }
  };

  return (
    <section
      id="residences"
      className="relative w-full min-h-screen bg-graphite-950 text-sand-50 py-24 md:py-32 overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-graphite-900 via-graphite-950 to-black pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-graphite-950 to-transparent pointer-events-none z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-20">
        {/* Section Header: Inspired by video's editorial serif style */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-white/10 pb-8">
          <div>
            <div className="inline-flex items-center space-x-2 text-[10px] uppercase tracking-[0.3em] text-bronze font-mono mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-bronze" />
              <span>ARCHITECTURAL VOLUMETRICS</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-sand-50">
              EXPLORE <span className="italic text-gold-gradient font-normal">RESIDENCES</span>
            </h2>
            <p className="text-sand-400 text-sm md:text-base mt-2 max-w-lg font-light">
              Interactive perspective exploration. Drag or rotate the 3D model to inspect cantilevered elevations, sky decks, and private pool tiers.
            </p>
          </div>

          <div className="mt-6 md:mt-0 flex items-center space-x-3">
            <div className="flex items-center space-x-2 text-xs text-sand-400 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
              <Rotate3d className="w-4 h-4 text-bronze animate-spin" style={{ animationDuration: '8s' }} />
              <span className="font-mono text-[11px] uppercase tracking-wider">360° Drag & Orbit Active</span>
            </div>
          </div>
        </div>

        {/* Main 3D Canvas & Interactive HUD Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[640px]">
          {/* Left Column: Hotspot Navigation & Elevator Tiers */}
          <div className="lg:col-span-4 flex flex-col space-y-3 order-2 lg:order-1">
            <p className="text-[10px] uppercase tracking-[0.3em] text-bronze-light font-mono mb-1">
              Select Vertical Tier
            </p>

            {hotspots.map((spot) => {
              const isActive = activeHotspot.id === spot.id;
              return (
                <button
                  key={spot.id}
                  onClick={() => handleSelectHotspot(spot)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-300 relative overflow-hidden group ${
                    isActive
                      ? 'bg-gradient-to-r from-bronze/25 to-white/5 border-bronze shadow-[0_0_20px_rgba(197,168,128,0.25)] translate-x-1.5'
                      : 'bg-white/[0.03] border-white/10 hover:border-bronze/40 hover:bg-white/[0.06]'
                  }`}
                  data-cursor="pointer"
                >
                  {/* Subtle active glow indicator */}
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-bronze" />
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-bronze">
                      {spot.level}
                    </span>
                    <span className="text-[9px] uppercase px-2 py-0.5 rounded-full bg-white/10 text-sand-300 font-mono">
                      {spot.badge}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg md:text-xl font-light text-sand-50 mt-1 group-hover:text-bronze-light transition-colors">
                    {spot.title}
                  </h3>
                  <p className="text-xs text-sand-400 font-light mt-0.5 line-clamp-1">
                    {spot.subtitle}
                  </p>

                  <div className="mt-2.5 flex items-center justify-between text-xs text-sand-300 pt-2 border-t border-white/5">
                    <span className="font-mono text-bronze-light">{spot.price}</span>
                    <span className="text-[10px] text-sand-400">{spot.area}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Center Column: Interactive 3D Three.js Viewport */}
          <div className="lg:col-span-5 relative h-[520px] md:h-[620px] rounded-2xl overflow-hidden border border-white/15 bg-graphite-900/60 backdrop-blur-md shadow-2xl order-1 lg:order-2"
               data-cursor="drag" data-cursor-text="ROTATE">
            {/* The WebGL Canvas */}
            <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

            {/* Orbit Helper Prompt */}
            <div className="absolute top-4 left-4 pointer-events-none bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-[10px] font-mono text-sand-300 flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-bronze animate-pulse" />
              <span>CLICK & DRAG TO ROTATE TOWER</span>
            </div>

            {/* Floor Level Gauge (Right overlay) */}
            <div className="absolute top-4 right-4 pointer-events-none bg-black/60 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/10 text-right">
              <p className="text-[9px] uppercase tracking-widest text-sand-400 font-mono">Active Tier</p>
              <p className="font-serif text-2xl text-sand-50 font-light tabular-nums">
                L{selectedFloor}
              </p>
              <p className="text-[9px] text-bronze font-mono uppercase">
                {activeHotspot.elevation}
              </p>
            </div>

            {/* Visual Floor Pins Overlay */}
            <div className="absolute inset-y-0 left-6 flex flex-col justify-between py-12 pointer-events-none">
              <div className="text-[9px] font-mono text-bronze tracking-widest uppercase">▲ Sky Penthouse L48</div>
              <div className="text-[9px] font-mono text-sand-400 tracking-widest uppercase">― Sky Deck L20</div>
              <div className="text-[9px] font-mono text-sand-400 tracking-widest uppercase">▼ Grand Lobby L01</div>
            </div>
          </div>

          {/* Right Column: Contextual Detail Card for Active Hotspot */}
          <div className="lg:col-span-3 flex flex-col space-y-4 order-3">
            <div className="p-6 rounded-2xl glass-panel-dark border border-white/15 shadow-2xl flex flex-col justify-between">
              <div>
                <div className="relative h-44 rounded-xl overflow-hidden mb-5 border border-white/10">
                  <img
                    src={activeHotspot.image}
                    alt={activeHotspot.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-bronze bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded border border-white/10">
                      {activeHotspot.level}
                    </span>
                    <span className="text-xs font-serif text-sand-50">
                      {activeHotspot.elevation}
                    </span>
                  </div>
                </div>

                <div className="inline-block text-[10px] uppercase tracking-[0.25em] text-bronze font-mono mb-1">
                  Residences Specification
                </div>
                <h4 className="font-serif text-2xl font-light text-sand-50">
                  {activeHotspot.title}
                </h4>
                <p className="text-xs text-sand-300 font-light mt-1">
                  {activeHotspot.subtitle}
                </p>

                {/* Key Architectural Amenities */}
                <div className="mt-4 space-y-2 border-t border-white/10 pt-4">
                  {activeHotspot.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-xs text-sand-300 font-light">
                      <Check className="w-3.5 h-3.5 text-bronze shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Booking & Inquiry Action */}
              <div className="mt-6 pt-4 border-t border-white/10 flex flex-col space-y-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-[10px] uppercase tracking-wider text-sand-400 font-mono">Pricing</span>
                  <span className="text-sm font-mono text-bronze-light font-semibold">
                    {activeHotspot.price}
                  </span>
                </div>

                <button
                  onClick={() => onOpenBooking(activeHotspot.title)}
                  className="w-full py-3.5 rounded-full bg-bronze hover:bg-bronze-light text-graphite-950 font-semibold text-xs uppercase tracking-[0.2em] transition-all shadow-lg flex items-center justify-center space-x-2"
                  data-cursor="pointer"
                >
                  <span>Inquire This Tier</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

