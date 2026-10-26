/**
 * The Solaire Residences — Core Global Engine
 * Handles: Lenis momentum smooth scrolling, Web Audio ambient soundscape,
 * custom magnetic cursor, universal VIP modal, and mobile menu drawer.
 */

document.addEventListener('DOMContentLoaded', () => {
  initLenis();
  initCustomCursor();
  initAmbientAudio();
  initBookingModal();
  initMobileMenu();
  if (window.lucide) {
    window.lucide.createIcons();
  }
});

/* 1. Lenis Smooth Momentum Scrolling */
let lenisInstance = null;
function initLenis() {
  if (typeof Lenis !== 'undefined') {
    lenisInstance = new Lenis({
      duration: 1.3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      smooth: true,
      mouseMultiplier: 0.9,
      touchMultiplier: 1.5,
    });

    function raf(time) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Sync with GSAP ScrollTrigger if present
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      lenisInstance.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => lenisInstance.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    }
  }
}

/* 2. Custom Magnetic Trailing Cursor */
function initCustomCursor() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const dot = document.createElement('div');
  dot.className = 'custom-cursor-dot';
  document.body.appendChild(dot);

  const ring = document.createElement('div');
  ring.className = 'custom-cursor-ring';
  const ringText = document.createElement('span');
  ringText.className = 'custom-cursor-text';
  ring.appendChild(ringText);
  document.body.appendChild(ring);

  let mouseX = -100, mouseY = -100;
  let ringX = -100, ringY = -100;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;

    // Detect interactive target
    const target = e.target;
    const interactiveEl = target.closest('[data-cursor]');
    if (interactiveEl) {
      const type = interactiveEl.getAttribute('data-cursor');
      const text = interactiveEl.getAttribute('data-cursor-text') || '';
      ring.className = `custom-cursor-ring cursor-${type}`;
      ringText.textContent = text;
    } else if (target.closest('button, a, input, select, textarea, [role="button"]')) {
      ring.className = 'custom-cursor-ring cursor-hover';
      ringText.textContent = '';
    } else {
      ring.className = 'custom-cursor-ring';
      ringText.textContent = '';
    }
  });

  function renderRing() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
    requestAnimationFrame(renderRing);
  }
  requestAnimationFrame(renderRing);
}

/* 3. Coastal Ambient Soundscape (Web Audio API) */
let audioCtx = null;
let masterGain = null;
let isAudioPlaying = false;

function initAmbientAudio() {
  const soundBtns = document.querySelectorAll('.ambient-sound-toggle');
  soundBtns.forEach((btn) => {
    btn.addEventListener('click', toggleAmbientSound);
  });
}

function toggleAmbientSound() {
  const soundBtns = document.querySelectorAll('.ambient-sound-toggle');
  if (isAudioPlaying) {
    if (masterGain && audioCtx) {
      masterGain.gain.setTargetAtTime(0, audioCtx.currentTime, 0.4);
    }
    isAudioPlaying = false;
    soundBtns.forEach((btn) => {
      btn.innerHTML = `<i data-lucide="volume-x" class="w-4 h-4 opacity-60"></i><span class="text-[9px] uppercase tracking-wider opacity-60 hidden md:inline ml-1">Sound</span>`;
    });
  } else {
    try {
      if (!audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioCtx = new AudioContext();
        masterGain = audioCtx.createGain();
        masterGain.gain.setValueAtTime(0.001, audioCtx.currentTime);
        masterGain.connect(audioCtx.destination);

        // Harmonic swell chord
        [108.0, 162.0, 216.0].forEach((freq, idx) => {
          const osc = audioCtx.createOscillator();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

          const filter = audioCtx.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(260 + idx * 80, audioCtx.currentTime);

          const lfo = audioCtx.createOscillator();
          const lfoGain = audioCtx.createGain();
          lfo.frequency.setValueAtTime(0.12 + idx * 0.05, audioCtx.currentTime);
          lfoGain.gain.setValueAtTime(0.015, audioCtx.currentTime);
          lfo.connect(lfoGain.gain);
          lfo.start();

          osc.connect(filter);
          filter.connect(masterGain);
          osc.start();
        });
      }

      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      masterGain.gain.setTargetAtTime(0.07, audioCtx.currentTime, 0.8);
      isAudioPlaying = true;
      soundBtns.forEach((btn) => {
        btn.innerHTML = `<i data-lucide="volume-2" class="w-4 h-4 text-bronze animate-pulse"></i><span class="text-[9px] uppercase tracking-wider text-bronze hidden md:inline ml-1 font-semibold">Ambient On</span>`;
      });
    } catch (e) {
      console.warn('Audio notice:', e);
    }
  }
  if (window.lucide) window.lucide.createIcons();
}

/* 4. Universal VIP Lead Capture & Private Tour Modal */
function initBookingModal() {
  const modal = document.getElementById('vip-booking-modal');
  if (!modal) return;

  const closeBtns = modal.querySelectorAll('.close-booking-modal');
  closeBtns.forEach((btn) => {
    btn.addEventListener('click', closeBookingModal);
  });

  const openBtns = document.querySelectorAll('[data-open-booking]');
  openBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const tier = btn.getAttribute('data-open-booking') || 'The Sky Penthouse Crown';
      openBookingModal(tier);
    });
  });

  const form = document.getElementById('vip-booking-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const ref = `SLR-${Math.floor(100000 + Math.random() * 900000)}`;
      document.getElementById('modal-ref-code').textContent = ref;
      document.getElementById('booking-form-view').classList.add('hidden');
      document.getElementById('booking-success-view').classList.remove('hidden');
    });
  }

  const waBtn = document.getElementById('modal-whatsapp-btn');
  if (waBtn) {
    waBtn.addEventListener('click', () => {
      const tierEl = document.getElementById('modal-tier-select');
      const tier = tierEl ? tierEl.value : 'The Solaire Residences';
      const text = encodeURIComponent(`Hello, I would like to arrange a Private VIP Viewing for ${tier} at The Solaire Residences, Dubai.`);
      window.open(`https://wa.me/971501234567?text=${text}`, '_blank');
    });
  }
}

function openBookingModal(tier = '') {
  const modal = document.getElementById('vip-booking-modal');
  if (!modal) return;
  const tierSelect = document.getElementById('modal-tier-select');
  if (tierSelect && tier) {
    tierSelect.value = tier;
  }
  document.getElementById('booking-form-view').classList.remove('hidden');
  document.getElementById('booking-success-view').classList.add('hidden');
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeBookingModal() {
  const modal = document.getElementById('vip-booking-modal');
  if (!modal) return;
  modal.classList.add('hidden');
  document.body.style.overflow = '';
}

/* 5. Mobile Menu Drawer */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const drawer = document.getElementById('mobile-drawer');
  if (!toggleBtn || !drawer) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = drawer.classList.contains('opacity-100');
    if (isOpen) {
      drawer.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0');
      drawer.classList.add('opacity-0', 'pointer-events-none', '-translate-y-4');
    } else {
      drawer.classList.remove('opacity-0', 'pointer-events-none', '-translate-y-4');
      drawer.classList.add('opacity-100', 'pointer-events-auto', 'translate-y-0');
    }
  });
}

