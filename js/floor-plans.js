/**
 * The Solaire Residences — Interactive Architectural Floor Plans & Unit Customizer
 * Features:
 * - High-precision architectural SVG floor plans with wall geometries & door swing arcs
 * - Room hover highlighting with floating live dimension, orientation & finish tooltips
 * - Instant SQ FT ⇋ SQ M dynamic metric conversion
 * - Filterable collections (1-Bed to 5-Bed Duplex Penthouse)
 */

window.initFloorPlans = function () {
  const plansData = {
    '1bed': {
      name: 'The Atelier Suite',
      category: '1 Bedroom Sky Villa',
      levels: 'Levels 06 – 15',
      sqft: 1420,
      sqm: 132,
      beds: 1,
      baths: 1.5,
      ceiling: '3.4m Clear Height',
      exposure: 'North-West Sunset & Marina',
      price: 'From AED 8,900,000',
      description: 'Designed for refined solo living or international executives. Features a dramatic open-plan salon, tailored Poliform kitchen, and a master sanctuary opening directly to a deep sea-view loggia.',
      rooms: [
        { name: 'Living & Dining Salon', dim: '7.8m × 5.4m', exp: 'West Sunset', finish: 'Arabescato marble floors, motorized Schuco sliding glass' },
        { name: 'Master Bedroom Sanctuary', dim: '5.2m × 4.2m', exp: 'North-West', finish: 'French fluted walnut walls, Rimadesio custom walk-in closet' },
        { name: 'En-Suite Master Spa', dim: '3.6m × 2.8m', exp: 'Internal', finish: 'Single-block Calacatta vanity, Dornbracht rain sky shower' },
        { name: 'Gourmet Chef Kitchen', dim: '4.2m × 3.2m', exp: 'East', finish: 'Taj Mahal quartzite island, Gaggenau 400 series induction' },
        { name: 'Sunset Loggia Balcony', dim: '6.2m × 2.4m', exp: 'Full Sunset', finish: 'Thermally treated teak decking, frameless glass balustrade' }
      ],
      svg: `
        <svg viewBox="0 0 800 560" class="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="gridPattern" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(197,168,128,0.12)" stroke-width="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#gridPattern)" />

          <!-- Outer Perimeter Walls -->
          <rect x="40" y="40" width="720" height="480" rx="16" fill="rgba(255,255,255,0.7)" stroke="#3D3B37" stroke-width="4" />

          <!-- Balcony Zone (Top) -->
          <path d="M 40 40 L 760 40 L 760 110 L 40 110 Z" class="blueprint-room" data-room-idx="4" fill="rgba(223, 207, 183, 0.25)" stroke="#9A784E" stroke-width="2" stroke-dasharray="6,4" />
          <text x="400" y="80" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" font-weight="600" fill="#695133">SUNSET LOGGIA BALCONY (6.2m × 2.4m)</text>

          <!-- Grand Salon & Dining (Left Center) -->
          <path d="M 40 110 L 460 110 L 460 380 L 40 380 Z" class="blueprint-room" data-room-idx="0" fill="rgba(197, 168, 128, 0.12)" stroke="#C5A880" stroke-width="2" />
          <text x="250" y="240" text-anchor="middle" font-family="'Cormorant Garamond', serif" font-size="22" font-weight="600" fill="#141413">GRAND SALON & DINING</text>
          <text x="250" y="265" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="12" fill="#73706A">7.8m × 5.4m • Sunset Aspect</text>

          <!-- Master Bedroom Suite (Right Center) -->
          <path d="M 460 110 L 760 110 L 760 380 L 460 380 Z" class="blueprint-room" data-room-idx="1" fill="rgba(197, 168, 128, 0.18)" stroke="#C5A880" stroke-width="2" />
          <text x="610" y="240" text-anchor="middle" font-family="'Cormorant Garamond', serif" font-size="22" font-weight="600" fill="#141413">MASTER SANCTUARY</text>
          <text x="610" y="265" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="12" fill="#73706A">5.2m × 4.2m • En-Suite Walk-in</text>

          <!-- Gourmet Kitchen (Bottom Left) -->
          <path d="M 40 380 L 340 380 L 340 520 L 40 520 Z" class="blueprint-room" data-room-idx="3" fill="rgba(197, 168, 128, 0.1)" stroke="#C5A880" stroke-width="2" />
          <text x="190" y="445" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="600" fill="#141413">GOURMET KITCHEN</text>
          <text x="190" y="468" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="11" fill="#73706A">4.2m × 3.2m</text>

          <!-- Master Spa (Bottom Right) -->
          <path d="M 460 380 L 760 380 L 760 520 L 460 520 Z" class="blueprint-room" data-room-idx="2" fill="rgba(197, 168, 128, 0.22)" stroke="#C5A880" stroke-width="2" />
          <text x="610" y="445" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="600" fill="#141413">MASTER MARBLE SPA</text>
          <text x="610" y="468" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="11" fill="#73706A">3.6m × 2.8m • Calacatta Tub</text>

          <!-- Private Foyer & Vestibule (Bottom Center) -->
          <path d="M 340 380 L 460 380 L 460 520 L 340 520 Z" fill="rgba(0,0,0,0.04)" stroke="#B0AEA9" stroke-width="1.5" />
          <text x="400" y="445" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="600" fill="#73706A">PRIVATE LIFT</text>
          <text x="400" y="465" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="10" fill="#9E9B95">FOYER</text>

          <!-- Door Swing Arcs -->
          <path d="M 460 320 A 40 40 0 0 1 500 360" fill="none" stroke="#9A784E" stroke-width="1.5" stroke-dasharray="3,3" />
          <path d="M 460 440 A 35 35 0 0 1 495 475" fill="none" stroke="#9A784E" stroke-width="1.5" stroke-dasharray="3,3" />
        </svg>
      `
    },
    '2bed': {
      name: 'The Grand Haven',
      category: '2 Bedroom Residence',
      levels: 'Levels 16 – 28',
      sqft: 2380,
      sqm: 221,
      beds: 2,
      baths: 2.5,
      ceiling: '3.6m Clear Height',
      exposure: 'Dual Aspect: East Sunrise & West Sunset',
      price: 'From AED 14,500,000',
      description: 'An expansive dual-orientation sanctuary with flow-through ocean breezes, separate prep kitchen, discreet service corridor, and expansive split master wings.',
      rooms: [
        { name: 'Grand Entertaining Salon', dim: '9.6m × 6.8m', exp: 'Sunset Aspect', finish: 'Single slab Arabescato fireplace, motorized panoramic glass' },
        { name: 'Principal Master Wing', dim: '6.0m × 4.6m', exp: 'West Sunset', finish: 'Fluted walnut headboard, automated blackout drapery' },
        { name: 'Guest En-Suite Suite', dim: '5.0m × 4.0m', exp: 'East Sunrise', finish: 'Limestone en-suite bath, integrated acoustic baffles' },
        { name: 'Show Kitchen & Island', dim: '4.5m × 3.5m', exp: 'Central', finish: 'Taj Mahal quartzite waterfall island, Sub-Zero wine columns' },
        { name: 'Wraparound Ocean Terrace', dim: '12.4m × 2.8m', exp: 'Dual Aspect', finish: 'Teak flooring, frameless structural glass balustrades' }
      ],
      svg: `
        <svg viewBox="0 0 800 560" class="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="gridPattern2" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(197,168,128,0.12)" stroke-width="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#gridPattern2)" />
          <rect x="30" y="30" width="740" height="500" rx="16" fill="rgba(255,255,255,0.7)" stroke="#3D3B37" stroke-width="4" />

          <!-- Wrap Terrace (Top) -->
          <path d="M 30 30 L 770 30 L 770 95 L 30 95 Z" class="blueprint-room" data-room-idx="4" fill="rgba(223, 207, 183, 0.3)" stroke="#9A784E" stroke-width="2" stroke-dasharray="6,4" />
          <text x="400" y="70" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" font-weight="600" fill="#695133">WRAPAROUND OCEAN TERRACE (12.4m × 2.8m)</text>

          <!-- Guest Wing (Left) -->
          <path d="M 30 95 L 240 95 L 240 400 L 30 400 Z" class="blueprint-room" data-room-idx="2" fill="rgba(197, 168, 128, 0.16)" stroke="#C5A880" stroke-width="2" />
          <text x="135" y="240" text-anchor="middle" font-family="'Cormorant Garamond', serif" font-size="20" font-weight="600" fill="#141413">GUEST SUITE II</text>
          <text x="135" y="265" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="11" fill="#73706A">5.0m × 4.0m</text>

          <!-- Grand Salon (Center) -->
          <path d="M 240 95 L 560 95 L 560 400 L 240 400 Z" class="blueprint-room" data-room-idx="0" fill="rgba(197, 168, 128, 0.14)" stroke="#C5A880" stroke-width="2" />
          <text x="400" y="240" text-anchor="middle" font-family="'Cormorant Garamond', serif" font-size="24" font-weight="600" fill="#141413">GRAND ENTERTAINING SALON</text>
          <text x="400" y="265" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="12" fill="#73706A">9.6m × 6.8m • 3.6m Ceilings</text>

          <!-- Principal Master Wing (Right) -->
          <path d="M 560 95 L 770 95 L 770 400 L 560 400 Z" class="blueprint-room" data-room-idx="1" fill="rgba(197, 168, 128, 0.22)" stroke="#C5A880" stroke-width="2" />
          <text x="665" y="240" text-anchor="middle" font-family="'Cormorant Garamond', serif" font-size="20" font-weight="600" fill="#141413">MASTER WING</text>
          <text x="665" y="265" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="11" fill="#73706A">6.0m × 4.6m</text>

          <!-- Show Kitchen (Bottom Center) -->
          <path d="M 240 400 L 430 400 L 430 530 L 240 530 Z" class="blueprint-room" data-room-idx="3" fill="rgba(197, 168, 128, 0.1)" stroke="#C5A880" stroke-width="2" />
          <text x="335" y="465" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" font-weight="600" fill="#141413">CHEF KITCHEN</text>

          <!-- Foyer & Lift (Bottom Center Right) -->
          <path d="M 430 400 L 560 400 L 560 530 L 430 530 Z" fill="rgba(0,0,0,0.05)" stroke="#B0AEA9" stroke-width="1.5" />
          <text x="495" y="465" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="600" fill="#73706A">PRIVATE LIFT</text>
        </svg>
      `
    },
    '3bed': {
      name: 'The Celestial Residence',
      category: '3 Bedroom Panorama',
      levels: 'Levels 30 – 40',
      sqft: 4120,
      sqm: 382,
      beds: 3,
      baths: 4,
      ceiling: '3.6m Clear Height',
      exposure: 'Full 270° Gulf & Skyline Aspect',
      price: 'From AED 24,000,000',
      description: 'Occupying half an entire floor plate with 3.6m ceiling clearances. Features private direct-to-unit elevators, temperature-controlled wine gallery, and bespoke Dornbracht brushed champagne brassware.',
      rooms: [
        { name: 'Formal Reception Hall', dim: '12.0m × 8.2m', exp: 'Panoramic 270°', finish: 'Monolithic travertine floors, French oak library wall' },
        { name: 'Primary Master Sanctuary', dim: '7.5m × 5.2m', exp: 'North-West Sunset', finish: 'Dual custom dressing galleries, private morning coffee loggia' },
        { name: 'Junior Suite Two', dim: '5.4m × 4.4m', exp: 'Skyline Aspect', finish: 'En-suite bath, fluted walnut millwork' },
        { name: 'Junior Suite Three', dim: '5.0m × 4.2m', exp: 'Harbor Aspect', finish: 'En-suite bath, floor-to-ceiling glass' },
        { name: 'Continuous Sky Terrace', dim: '16.5m × 3.2m', exp: 'Full Horizon', finish: 'Teak wood planking, outdoor fireplace & dining pavilion' }
      ],
      svg: `
        <svg viewBox="0 0 800 560" class="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="gridPattern3" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(197,168,128,0.12)" stroke-width="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#gridPattern3)" />
          <rect x="25" y="25" width="750" height="510" rx="16" fill="rgba(255,255,255,0.7)" stroke="#3D3B37" stroke-width="4" />

          <!-- Continuous Deep Loggia (Top) -->
          <path d="M 25 25 L 775 25 L 775 90 L 25 90 Z" class="blueprint-room" data-room-idx="4" fill="rgba(223, 207, 183, 0.35)" stroke="#9A784E" stroke-width="2" stroke-dasharray="6,4" />
          <text x="400" y="65" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" font-weight="600" fill="#695133">CONTINUOUS SKY TERRACE & LOGGIA (16.5m × 3.2m)</text>

          <!-- Reception Hall (Center) -->
          <path d="M 230 90 L 570 90 L 570 420 L 230 420 Z" class="blueprint-room" data-room-idx="0" fill="rgba(197, 168, 128, 0.18)" stroke="#C5A880" stroke-width="2" />
          <text x="400" y="240" text-anchor="middle" font-family="'Cormorant Garamond', serif" font-size="24" font-weight="600" fill="#141413">FORMAL RECEPTION HALL</text>
          <text x="400" y="265" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="12" fill="#73706A">12.0m × 8.2m • 270° Panoramic</text>

          <!-- Primary Master Suite (Right) -->
          <path d="M 570 90 L 775 90 L 775 420 L 570 420 Z" class="blueprint-room" data-room-idx="1" fill="rgba(197, 168, 128, 0.25)" stroke="#C5A880" stroke-width="2" />
          <text x="672" y="240" text-anchor="middle" font-family="'Cormorant Garamond', serif" font-size="20" font-weight="600" fill="#141413">PRIMARY MASTER</text>
          <text x="672" y="265" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="11" fill="#73706A">7.5m × 5.2m</text>

          <!-- Suite 2 (Top Left) -->
          <path d="M 25 90 L 230 90 L 230 255 L 25 255 Z" class="blueprint-room" data-room-idx="2" fill="rgba(197, 168, 128, 0.14)" stroke="#C5A880" stroke-width="2" />
          <text x="127" y="175" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" font-weight="600" fill="#141413">SUITE TWO</text>

          <!-- Suite 3 (Bottom Left) -->
          <path d="M 25 255 L 230 255 L 230 420 L 25 420 Z" class="blueprint-room" data-room-idx="3" fill="rgba(197, 168, 128, 0.14)" stroke="#C5A880" stroke-width="2" />
          <text x="127" y="340" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" font-weight="600" fill="#141413">SUITE THREE</text>
        </svg>
      `
    },
    'penthouse': {
      name: 'The Sky Crown Duplex',
      category: '5 Bedroom Duplex Palace',
      levels: 'Levels 46 & 47',
      sqft: 8650,
      sqm: 803,
      beds: 5,
      baths: 6.5,
      ceiling: '7.0m Cathedral Salon',
      exposure: '360° Omnidirectional Panoramic',
      price: 'AED 58,000,000',
      description: 'The architectural pinnacle of The Solaire. A two-story glass mansion in the sky with 7m double-height living room, private cantilevered infinity pool, indoor reflection ponds, and private rooftop stargazing lounge.',
      rooms: [
        { name: 'Cathedral Salon (7m Ceilings)', dim: '15.0m × 10.5m', exp: '360° Panorama', finish: 'Double-height bookmatched Arabescato marble walls' },
        { name: '18m Cantilevered Sky Pool', dim: '18.0m × 6.5m', exp: 'Open Sky', finish: 'Glass-bottom viewport, heated freshwater with ozone purification' },
        { name: 'Presidential Master Suite', dim: '9.2m × 6.8m', exp: 'Sunset & Skyline', finish: 'Dual master dressing rooms, private sauna & cold plunge' },
        { name: 'Private Screening Cinema', dim: '6.5m × 5.0m', exp: 'Acoustic Core', finish: 'Dolby Atmos architectural baffles, motorized velvet recliners' },
        { name: 'Rooftop Stargazing Lounge', dim: '14.0m × 8.0m', exp: 'Full Sky', finish: 'Bio-ethanol firepit, outdoor teppanyaki dining table' }
      ],
      svg: `
        <svg viewBox="0 0 800 560" class="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="gridPattern4" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(197,168,128,0.12)" stroke-width="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#gridPattern4)" />
          <rect x="20" y="20" width="760" height="520" rx="16" fill="rgba(255,255,255,0.7)" stroke="#3D3B37" stroke-width="4" />

          <!-- Cathedral Salon (Left/Center) -->
          <path d="M 180 60 L 580 60 L 580 440 L 180 440 Z" class="blueprint-room" data-room-idx="0" fill="rgba(197, 168, 128, 0.28)" stroke="#C5A880" stroke-width="2.5" />
          <text x="380" y="240" text-anchor="middle" font-family="'Cormorant Garamond', serif" font-size="26" font-weight="700" fill="#141413">CATHEDRAL SALON (7M CEILINGS)</text>
          <text x="380" y="270" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="13" fill="#73706A">15.0m × 10.5m • Double Height Glass</text>

          <!-- Cantilevered Sky Pool (Right) -->
          <path d="M 580 60 L 760 60 L 760 280 L 580 280 Z" class="blueprint-room" data-room-idx="1" fill="rgba(28, 163, 184, 0.35)" stroke="#1CA3B8" stroke-width="2.5" />
          <text x="670" y="165" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" font-weight="700" fill="#0C4A54">18M SKY POOL</text>
          <text x="670" y="190" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="10" fill="#0C4A54">Cantilevered Glass</text>

          <!-- Sunset Terrace (Bottom Right) -->
          <path d="M 580 280 L 760 280 L 760 480 L 580 480 Z" class="blueprint-room" data-room-idx="4" fill="rgba(223, 207, 183, 0.4)" stroke="#9A784E" stroke-width="2" />
          <text x="670" y="380" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="600" fill="#695133">STARGAZING</text>
          <text x="670" y="400" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="600" fill="#695133">LOUNGE</text>

          <!-- Presidential Suite (Top Left) -->
          <path d="M 20 60 L 180 60 L 180 320 L 20 320 Z" class="blueprint-room" data-room-idx="2" fill="rgba(197, 168, 128, 0.22)" stroke="#C5A880" stroke-width="2" />
          <text x="100" y="185" text-anchor="middle" font-family="'Cormorant Garamond', serif" font-size="18" font-weight="600" fill="#141413">PRESIDENTIAL</text>
          <text x="100" y="208" text-anchor="middle" font-family="'Cormorant Garamond', serif" font-size="18" font-weight="600" fill="#141413">SUITE</text>

          <!-- Cinema Room (Bottom Left) -->
          <path d="M 20 320 L 180 320 L 180 480 L 20 480 Z" class="blueprint-room" data-room-idx="3" fill="rgba(197, 168, 128, 0.16)" stroke="#C5A880" stroke-width="2" />
          <text x="100" y="400" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="600" fill="#141413">CINEMA</text>
        </svg>
      `
    }
  };

  let activePlanId = '1bed';
  let unitMetric = 'sqft';

  // Floating room tooltip
  let tooltipEl = document.getElementById('blueprint-room-tooltip');
  if (!tooltipEl) {
    tooltipEl = document.createElement('div');
    tooltipEl.id = 'blueprint-room-tooltip';
    tooltipEl.className = 'fixed pointer-events-none z-50 bg-[#121110]/95 backdrop-blur-md border border-bronze/40 rounded-xl p-3 shadow-2xl text-sand-50 transition-opacity duration-150 opacity-0 max-w-xs';
    document.body.appendChild(tooltipEl);
  }

  function renderPlan() {
    const data = plansData[activePlanId];
    if (!data) return;

    const nameEl = document.getElementById('plan-name');
    const catEl = document.getElementById('plan-category');
    const levEl = document.getElementById('plan-levels');
    const priceEl = document.getElementById('plan-price');
    const descEl = document.getElementById('plan-desc');
    const expEl = document.getElementById('plan-exposure');
    const bedsEl = document.getElementById('plan-beds');
    const bathsEl = document.getElementById('plan-baths');
    const areaEl = document.getElementById('plan-area');

    if (nameEl) nameEl.textContent = data.name;
    if (catEl) catEl.textContent = data.category;
    if (levEl) levEl.textContent = data.levels;
    if (priceEl) priceEl.textContent = data.price;
    if (descEl) descEl.textContent = data.description;
    if (expEl) expEl.textContent = `EXPOSURE: ${data.exposure}`;
    if (bedsEl) bedsEl.textContent = data.beds;
    if (bathsEl) bathsEl.textContent = data.baths;
    if (areaEl) areaEl.textContent = unitMetric === 'sqft' ? `${data.sqft.toLocaleString()} ft²` : `${data.sqm} m²`;

    const svgContainer = document.getElementById('plan-svg-layout');
    if (svgContainer) {
      svgContainer.innerHTML = data.svg;
      attachRoomHoverEvents(data);
    }

    const roomsContainer = document.getElementById('plan-rooms-list');
    if (roomsContainer) {
      roomsContainer.innerHTML = data.rooms.map((r, idx) => `
        <div class="p-2.5 rounded-xl bg-sand-100 hover:bg-bronze/10 border border-sand-200 cursor-pointer transition-colors" data-highlight-room="${idx}">
          <p class="text-[10px] uppercase font-mono text-graphite-500 truncate">${r.name}</p>
          <p class="text-xs font-mono font-medium text-graphite-900 mt-0.5">${r.dim}</p>
        </div>
      `).join('');

      roomsContainer.querySelectorAll('[data-highlight-room]').forEach((item) => {
        const idx = item.getAttribute('data-highlight-room');
        item.addEventListener('mouseenter', () => highlightRoom(idx));
        item.addEventListener('mouseleave', () => unhighlightRoom());
      });
    }
  }

  function highlightRoom(idx) {
    const targetRoom = document.querySelector(`.blueprint-room[data-room-idx="${idx}"]`);
    if (targetRoom) targetRoom.classList.add('active');
  }

  function unhighlightRoom() {
    document.querySelectorAll('.blueprint-room').forEach((el) => el.classList.remove('active'));
    if (tooltipEl) tooltipEl.classList.add('opacity-0');
  }

  function attachRoomHoverEvents(data) {
    const rooms = document.querySelectorAll('.blueprint-room');
    rooms.forEach((room) => {
      room.addEventListener('mouseenter', (e) => {
        const idx = parseInt(room.getAttribute('data-room-idx'), 10);
        const roomData = data.rooms[idx];
        if (!roomData) return;

        tooltipEl.innerHTML = `
          <div class="flex items-center justify-between border-b border-white/10 pb-1 mb-1">
            <span class="font-serif text-sm font-light text-sand-50">${roomData.name}</span>
            <span class="text-[9px] font-mono text-bronze uppercase">${roomData.exp}</span>
          </div>
          <p class="text-[11px] font-mono text-bronze-light font-semibold">${roomData.dim}</p>
          <p class="text-[10px] text-sand-300 font-light mt-1">${roomData.finish}</p>
        `;
        tooltipEl.classList.remove('opacity-0');
      });

      room.addEventListener('mousemove', (e) => {
        tooltipEl.style.left = `${e.clientX + 14}px`;
        tooltipEl.style.top = `${e.clientY + 14}px`;
      });

      room.addEventListener('mouseleave', () => {
        tooltipEl.classList.add('opacity-0');
      });
    });
  }

  // Plan tab buttons
  const planTabs = document.querySelectorAll('[data-plan-tab]');
  planTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      planTabs.forEach((t) => {
        t.classList.remove('bg-graphite-950', 'text-sand-50', 'border-graphite-950', 'shadow-xl');
        t.classList.add('bg-white/80', 'text-graphite-900', 'border-sand-300/80');
      });
      tab.classList.add('bg-graphite-950', 'text-sand-50', 'border-graphite-950', 'shadow-xl');
      tab.classList.remove('bg-white/80', 'text-graphite-900', 'border-sand-300/80');

      activePlanId = tab.getAttribute('data-plan-tab');
      renderPlan();
    });
  });

  // Metric Toggle
  const btnSqft = document.getElementById('btn-metric-sqft');
  const btnSqm = document.getElementById('btn-metric-sqm');
  if (btnSqft && btnSqm) {
    btnSqft.addEventListener('click', () => {
      unitMetric = 'sqft';
      btnSqft.classList.add('bg-white', 'shadow', 'text-graphite-950');
      btnSqft.classList.remove('text-graphite-600');
      btnSqm.classList.remove('bg-white', 'shadow', 'text-graphite-950');
      btnSqm.classList.add('text-graphite-600');
      renderPlan();
    });
    btnSqm.addEventListener('click', () => {
      unitMetric = 'sqm';
      btnSqm.classList.add('bg-white', 'shadow', 'text-graphite-950');
      btnSqm.classList.remove('text-graphite-600');
      btnSqft.classList.remove('bg-white', 'shadow', 'text-graphite-950');
      btnSqft.classList.add('text-graphite-600');
      renderPlan();
    });
  }

  // Brochure Download Toast
  const downloadBtn = document.getElementById('download-brochure-btn');
  const toast = document.getElementById('download-toast');
  if (downloadBtn && toast) {
    downloadBtn.addEventListener('click', () => {
      toast.classList.remove('hidden');
      setTimeout(() => toast.classList.add('hidden'), 4000);
    });
  }

  renderPlan();
};
