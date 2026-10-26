/**
 * The Solaire Residences — Interactive Floor Plans & Blueprints
 * Handles: Filterable suites, interactive SVG rooms, SQ FT / SQ M metric toggle,
 * and brochure download simulation.
 */

window.initFloorPlans = function () {
  const plansData = {
    '1bed': {
      name: 'The Atelier Suite',
      category: '1 Bedroom Suite',
      levels: 'Levels 06 - 15',
      sqft: 1420,
      sqm: 132,
      beds: 1,
      baths: 1.5,
      exposure: 'North-West Sunset & Marina',
      price: 'From AED 8,900,000',
      description: 'Designed for refined solo living or international executives. Features a dramatic open-plan salon, tailored Poliform kitchen, and a master sanctuary opening directly to a deep sea-view loggia.',
      rooms: [
        { name: 'Living & Dining Salon', dimensions: '7.8m × 5.4m' },
        { name: 'Master Suite', dimensions: '5.2m × 4.2m' },
        { name: 'En-Suite Bath & Spa', dimensions: '3.6m × 2.8m' },
        { name: 'Sunset Terrace', dimensions: '6.2m × 2.4m' }
      ],
      svg: `
        <div class="absolute border border-bronze/40 rounded-lg p-2 flex flex-col items-center justify-center transition-all bg-bronze/15 hover:bg-bronze/35 hover:scale-105 cursor-pointer" style="left:15%; top:20%; width:45%; height:45%;">
          <span class="text-xs font-serif">Living / Salon</span>
        </div>
        <div class="absolute border border-bronze/40 rounded-lg p-2 flex flex-col items-center justify-center transition-all bg-bronze/20 hover:bg-bronze/35 hover:scale-105 cursor-pointer" style="left:63%; top:20%; width:27%; height:45%;">
          <span class="text-xs font-serif">Master Suite</span>
        </div>
        <div class="absolute border border-bronze/40 rounded-lg p-2 flex flex-col items-center justify-center transition-all bg-bronze/10 hover:bg-bronze/35 hover:scale-105 cursor-pointer" style="left:15%; top:68%; width:35%; height:22%;">
          <span class="text-xs font-serif">Kitchen & Dining</span>
        </div>
        <div class="absolute border border-bronze/40 rounded-lg p-2 flex flex-col items-center justify-center transition-all bg-bronze/15 hover:bg-bronze/35 hover:scale-105 cursor-pointer" style="left:63%; top:68%; width:27%; height:22%;">
          <span class="text-xs font-serif">Master Spa</span>
        </div>
        <div class="absolute border border-amber-300/40 rounded-lg p-2 flex flex-col items-center justify-center transition-all bg-amber-100/40 hover:scale-105 cursor-pointer" style="left:5%; top:5%; width:90%; height:12%;">
          <span class="text-xs font-serif text-bronze-deep font-semibold">Sea Loggia & Balcony (6.2m)</span>
        </div>
      `
    },
    '2bed': {
      name: 'The Grand Haven',
      category: '2 Bedroom Residence',
      levels: 'Levels 16 - 28',
      sqft: 2380,
      sqm: 221,
      beds: 2,
      baths: 2.5,
      exposure: 'Dual Aspect: East Sunrise & West Sunset',
      price: 'From AED 14,500,000',
      description: 'An expansive dual-orientation sanctuary with flow-through ocean breezes, separate prep kitchen, discreet service corridor, and expansive split master wings.',
      rooms: [
        { name: 'Grand Salon & Entertaining', dimensions: '9.6m × 6.8m' },
        { name: 'Principal Master Wing', dimensions: '6.0m × 4.6m' },
        { name: 'Guest En-Suite Suite', dimensions: '5.0m × 4.0m' },
        { name: 'Show Kitchen & Island', dimensions: '4.5m × 3.5m' },
        { name: 'Wraparound Terrace', dimensions: '12.4m × 2.8m' }
      ],
      svg: `
        <div class="absolute border border-bronze/40 rounded-lg p-2 flex flex-col items-center justify-center transition-all bg-bronze/15 hover:bg-bronze/35 hover:scale-105 cursor-pointer" style="left:28%; top:22%; width:44%; height:48%;">
          <span class="text-xs font-serif">Grand Salon</span>
        </div>
        <div class="absolute border border-bronze/40 rounded-lg p-2 flex flex-col items-center justify-center transition-all bg-bronze/25 hover:bg-bronze/35 hover:scale-105 cursor-pointer" style="left:74%; top:15%; width:22%; height:55%;">
          <span class="text-xs font-serif">Master Wing</span>
        </div>
        <div class="absolute border border-bronze/40 rounded-lg p-2 flex flex-col items-center justify-center transition-all bg-bronze/20 hover:bg-bronze/35 hover:scale-105 cursor-pointer" style="left:4%; top:15%; width:22%; height:45%;">
          <span class="text-xs font-serif">Guest Suite II</span>
        </div>
        <div class="absolute border border-bronze/40 rounded-lg p-2 flex flex-col items-center justify-center transition-all bg-bronze/10 hover:bg-bronze/35 hover:scale-105 cursor-pointer" style="left:28%; top:73%; width:22%; height:22%;">
          <span class="text-xs font-serif">Kitchen</span>
        </div>
        <div class="absolute border border-bronze/40 rounded-lg p-2 flex flex-col items-center justify-center transition-all bg-bronze/15 hover:bg-bronze/35 hover:scale-105 cursor-pointer" style="left:52%; top:73%; width:20%; height:22%;">
          <span class="text-xs font-serif">Library</span>
        </div>
        <div class="absolute border border-amber-300/40 rounded-lg p-2 flex flex-col items-center justify-center transition-all bg-amber-100/40 hover:scale-105 cursor-pointer" style="left:2%; top:4%; width:96%; height:8%;">
          <span class="text-xs font-serif text-bronze-deep font-semibold">Continuous Panoramic Terrace (12.4m)</span>
        </div>
      `
    },
    '3bed': {
      name: 'The Celestial Residence',
      category: '3 Bedroom Panorama',
      levels: 'Levels 30 - 40',
      sqft: 4120,
      sqm: 382,
      beds: 3,
      baths: 4,
      exposure: 'Full 270° Gulf & Skyline Aspect',
      price: 'From AED 24,000,000',
      description: 'Occupying half an entire floor plate with 3.6m ceiling clearances. Features private direct-to-unit elevators, temperature-controlled wine gallery, and bespoke Dornbracht brushed champagne brassware.',
      rooms: [
        { name: 'Formal Reception Salon', dimensions: '12.0m × 8.2m' },
        { name: 'Primary Master Sanctuary', dimensions: '7.5m × 5.2m' },
        { name: 'Junior Suite I', dimensions: '5.4m × 4.4m' },
        { name: 'Junior Suite II', dimensions: '5.0m × 4.2m' },
        { name: 'Sky Garden Balcony', dimensions: '16.5m × 3.2m' }
      ],
      svg: `
        <div class="absolute border border-bronze/40 rounded-lg p-2 flex flex-col items-center justify-center transition-all bg-bronze/20 hover:bg-bronze/35 hover:scale-105 cursor-pointer" style="left:32%; top:20%; width:38%; height:55%;">
          <span class="text-xs font-serif">Formal Reception</span>
        </div>
        <div class="absolute border border-bronze/40 rounded-lg p-2 flex flex-col items-center justify-center transition-all bg-bronze/25 hover:bg-bronze/35 hover:scale-105 cursor-pointer" style="left:72%; top:15%; width:24%; height:60%;">
          <span class="text-xs font-serif">Master Spa Sanctuary</span>
        </div>
        <div class="absolute border border-bronze/40 rounded-lg p-2 flex flex-col items-center justify-center transition-all bg-bronze/15 hover:bg-bronze/35 hover:scale-105 cursor-pointer" style="left:4%; top:15%; width:25%; height:32%;">
          <span class="text-xs font-serif">Suite Two</span>
        </div>
        <div class="absolute border border-bronze/40 rounded-lg p-2 flex flex-col items-center justify-center transition-all bg-bronze/15 hover:bg-bronze/35 hover:scale-105 cursor-pointer" style="left:4%; top:50%; width:25%; height:35%;">
          <span class="text-xs font-serif">Suite Three</span>
        </div>
        <div class="absolute border border-amber-300/40 rounded-lg p-2 flex flex-col items-center justify-center transition-all bg-amber-100/40 hover:scale-105 cursor-pointer" style="left:2%; top:4%; width:96%; height:8%;">
          <span class="text-xs font-serif text-bronze-deep font-semibold">Continuous Sky Terrace (16.5m)</span>
        </div>
      `
    },
    'penthouse': {
      name: 'The Sky Crown Duplex',
      category: 'Duplex Penthouse Palace',
      levels: 'Levels 46 & 47',
      sqft: 8650,
      sqm: 803,
      beds: 5,
      baths: 6.5,
      exposure: '360° Omnidirectional Panoramic',
      price: 'AED 58,000,000',
      description: 'The architectural pinnacle of The Solaire. A two-story glass mansion in the sky with 7m double-height living room, private cantilevered infinity pool, indoor reflection ponds, and private rooftop stargazing lounge.',
      rooms: [
        { name: 'Cathedral Salon (7m Ceilings)', dimensions: '15.0m × 10.5m' },
        { name: 'Cantilevered Sky Pool & Deck', dimensions: '18.0m × 6.5m' },
        { name: 'Presidential Master Suite', dimensions: '9.2m × 6.8m' },
        { name: 'Private Screening Cinema', dimensions: '6.5m × 5.0m' },
        { name: 'Chef Commercial Scullery', dimensions: '5.5m × 4.2m' }
      ],
      svg: `
        <div class="absolute border border-bronze/40 rounded-lg p-2 flex flex-col items-center justify-center transition-all bg-bronze/25 hover:bg-bronze/35 hover:scale-105 cursor-pointer" style="left:25%; top:15%; width:50%; height:60%;">
          <span class="text-xs font-serif">Cathedral Double-Height Salon (7m)</span>
        </div>
        <div class="absolute border border-cyan-400/50 rounded-lg p-2 flex flex-col items-center justify-center transition-all bg-cyan-100/40 hover:scale-105 cursor-pointer" style="left:77%; top:15%; width:20%; height:40%;">
          <span class="text-xs font-serif text-cyan-900 font-semibold">18m Cantilevered Sky Pool</span>
        </div>
        <div class="absolute border border-amber-300/40 rounded-lg p-2 flex flex-col items-center justify-center transition-all bg-amber-100/40 hover:scale-105 cursor-pointer" style="left:77%; top:58%; width:20%; height:35%;">
          <span class="text-xs font-serif text-bronze-deep">Sunset Lounge</span>
        </div>
        <div class="absolute border border-bronze/40 rounded-lg p-2 flex flex-col items-center justify-center transition-all bg-bronze/20 hover:bg-bronze/35 hover:scale-105 cursor-pointer" style="left:3%; top:15%; width:20%; height:45%;">
          <span class="text-xs font-serif">Presidential Suite</span>
        </div>
        <div class="absolute border border-bronze/40 rounded-lg p-2 flex flex-col items-center justify-center transition-all bg-bronze/15 hover:bg-bronze/35 hover:scale-105 cursor-pointer" style="left:3%; top:63%; width:20%; height:30%;">
          <span class="text-xs font-serif">Cinema Room</span>
        </div>
      `
    }
  };

  let activePlanId = '1bed';
  let unitMetric = 'sqft';

  function renderPlan() {
    const data = plansData[activePlanId];
    if (!data) return;

    document.getElementById('plan-name').textContent = data.name;
    document.getElementById('plan-category').textContent = data.category;
    document.getElementById('plan-levels').textContent = data.levels;
    document.getElementById('plan-price').textContent = data.price;
    document.getElementById('plan-desc').textContent = data.description;
    document.getElementById('plan-exposure').textContent = `EXPOSURE: ${data.exposure}`;
    document.getElementById('plan-beds').textContent = data.beds;
    document.getElementById('plan-baths').textContent = data.baths;
    document.getElementById('plan-area').textContent = unitMetric === 'sqft' ? `${data.sqft.toLocaleString()} ft²` : `${data.sqm} m²`;

    const svgContainer = document.getElementById('plan-svg-layout');
    if (svgContainer) svgContainer.innerHTML = data.svg;

    const roomsContainer = document.getElementById('plan-rooms-list');
    if (roomsContainer) {
      roomsContainer.innerHTML = data.rooms.map((r) => `
        <div class="p-2.5 rounded-xl bg-sand-100 border border-sand-200">
          <p class="text-[10px] uppercase font-mono text-graphite-500 truncate">${r.name}</p>
          <p class="text-xs font-mono font-medium text-graphite-900 mt-0.5">${r.dimensions}</p>
        </div>
      `).join('');
    }
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

