/**
 * The Solaire Residences — Award-Winning Luxury Experience Engine
 * Features:
 * - Luxury Editorial Preloader & Asset Loading
 * - Lenis Momentum Scrolling with GSAP ScrollTrigger Integration
 * - Global Golden Reading / Scroll Progress Bar
 * - Live Dubai Meridian Telemetry (Local Time UTC+4 & Weather)
 * - Crystalline Acoustic Haptic Feedback Chime (Web Audio API)
 * - Custom Magnetic Follower Cursor
 * - Universal VIP Private Appointment Modal & WhatsApp Concierge
 */

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initLenis();
  initHeaderScroll();
  initCustomCursor();
  initMagneticButtons();
  initAmbientAudio();
  initDubaiClock();
  initScrollProgressBar();
  initBookingModal();
  initCinematicTrailerModal();
  initMobileMenu();
  initAcousticHaptics();
  if (window.lucide) {
    window.lucide.createIcons();
  }
});

/* 1. Luxury Editorial Preloader */
function initPreloader() {
  const preloader = document.getElementById('luxury-preloader');
  const countEl = document.getElementById('preloader-count');
  const progressEl = document.getElementById('preloader-progress');
  if (!preloader) return;

  let progress = 0;
  const startTime = performance.now();
  const duration = 1200; // 1.2s smooth load

  function step(now) {
    const elapsed = now - startTime;
    progress = Math.min(100, Math.floor((elapsed / duration) * 100));

    if (countEl) countEl.textContent = progress;
    if (progressEl) progressEl.style.width = `${progress}%`;

    if (progress < 100) {
      requestAnimationFrame(step);
    } else {
      setTimeout(() => {
        preloader.classList.add('loaded');
        document.body.classList.remove('overflow-hidden');
        if (typeof ScrollTrigger !== 'undefined') {
          ScrollTrigger.refresh();
        }
      }, 250);
    }
  }
  requestAnimationFrame(step);
}

/* 2. Lenis Butter-Smooth Momentum Scrolling */
window.lenisInstance = null;
function initLenis() {
  if (typeof Lenis !== 'undefined') {
    const lenis = new Lenis({
      duration: 1.35,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential luxury ease-out
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 0.95,
      touchMultiplier: 1.5,
      infinite: false,
    });
    window.lenisInstance = lenis;

    // Connect Lenis to GSAP ScrollTrigger & Scroll Progress Bar
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      lenis.on('scroll', (e) => {
        ScrollTrigger.update();
        updateScrollProgressBar(e.progress);
        updateHeaderOnScroll(e.scroll);
      });
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    } else {
      lenis.on('scroll', (e) => {
        updateScrollProgressBar(e.progress);
        updateHeaderOnScroll(e.scroll);
      });
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }
  } else {
    window.addEventListener('scroll', () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const progress = h > 0 ? window.scrollY / h : 0;
      updateScrollProgressBar(progress);
      updateHeaderOnScroll(window.scrollY);
    }, { passive: true });
  }
}

/* Header Frosted Glass on Scroll */
function updateHeaderOnScroll(scrollPos) {
  const header = document.getElementById('main-header');
  if (!header) return;
  if (scrollPos > 30) {
    header.classList.add('nav-scrolled');
  } else {
    header.classList.remove('nav-scrolled');
  }
}

function initHeaderScroll() {
  updateHeaderOnScroll(window.scrollY || 0);
  window.addEventListener('scroll', () => {
    updateHeaderOnScroll(window.scrollY || 0);
  }, { passive: true });
}

/* Global Reading / Scroll Progress Bar */
function initScrollProgressBar() {
  let bar = document.getElementById('global-scroll-progress');
  if (!bar) {
    bar = document.createElement('div');
    bar.id = 'global-scroll-progress';
    document.body.appendChild(bar);
  }
}

function updateScrollProgressBar(progress) {
  const bar = document.getElementById('global-scroll-progress');
  if (bar) {
    bar.style.width = `${Math.min(100, Math.max(0, progress * 100))}%`;
  }
}

/* 3. Live Dubai Meridian Clock & Weather Telemetry */
function initDubaiClock() {
  function updateTime() {
    const dubaiClocks = document.querySelectorAll('.live-dubai-clock');
    if (!dubaiClocks.length) return;

    // Dubai is UTC+4
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const dubaiTime = new Date(utc + (3600000 * 4));

    let hours = dubaiTime.getHours();
    const minutes = String(dubaiTime.getMinutes()).padStart(2, '0');
    const seconds = String(dubaiTime.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedHours = String(hours).padStart(2, '0');

    const str = `DUBAI (GMT+4) • ${formattedHours}:${minutes}:${seconds} ${ampm} • 28°C SUNNY`;
    dubaiClocks.forEach(el => {
      el.textContent = str;
    });
  }

  updateTime();
  setInterval(updateTime, 1000);
}

/* 4. Crystalline Acoustic Haptic Feedback Chime */
let chimeAudioCtx = null;
window.playLuxuryChime = function (freq = 659.25) { // Default E5 crystal note
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!chimeAudioCtx) chimeAudioCtx = new AudioContext();
    if (chimeAudioCtx.state === 'suspended') chimeAudioCtx.resume();

    const osc = chimeAudioCtx.createOscillator();
    const gain = chimeAudioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, chimeAudioCtx.currentTime);

    gain.gain.setValueAtTime(0.045, chimeAudioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, chimeAudioCtx.currentTime + 0.35);

    osc.connect(gain);
    gain.connect(chimeAudioCtx.destination);

    osc.start();
    osc.stop(chimeAudioCtx.currentTime + 0.36);
  } catch (e) {
    // Audio context silent fallback
  }
};

function initAcousticHaptics() {
  document.addEventListener('click', (e) => {
    const target = e.target.closest('button, [data-magnetic], .tier-nav-btn, [data-lighting-toggle]');
    if (target) {
      window.playLuxuryChime(587.33); // D5 soft ping
    }
  });
}

/* 5. Magnetic Button Interactions */
function initMagneticButtons() {
  const magnets = document.querySelectorAll('[data-magnetic]');
  magnets.forEach((el) => {
    let bounds = null;

    el.addEventListener('mouseenter', () => {
      bounds = el.getBoundingClientRect();
    });

    el.addEventListener('mousemove', (e) => {
      if (!bounds) bounds = el.getBoundingClientRect();
      const x = e.clientX - bounds.left - bounds.width / 2;
      const y = e.clientY - bounds.top - bounds.height / 2;
      el.style.transform = `translate3d(${x * 0.35}px, ${y * 0.35}px, 0)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = `translate3d(0, 0, 0)`;
      bounds = null;
    });
  });
}

/* 6. Custom Magnetic Trailing Cursor */
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

    const target = e.target;
    const interactiveEl = target.closest('[data-cursor]');
    if (interactiveEl) {
      const type = interactiveEl.getAttribute('data-cursor');
      const text = interactiveEl.getAttribute('data-cursor-text') || '';
      ring.className = `custom-cursor-ring cursor-${type}`;
      ringText.textContent = text;
    } else if (target.closest('button, a, input, select, textarea, [role="button"], [data-magnetic]')) {
      ring.className = 'custom-cursor-ring cursor-hover';
      ringText.textContent = '';
    } else {
      ring.className = 'custom-cursor-ring';
      ringText.textContent = '';
    }
  });

  function renderRing() {
    ringX += (mouseX - ringX) * 0.16;
    ringY += (mouseY - ringY) * 0.16;
    ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
    requestAnimationFrame(renderRing);
  }
  requestAnimationFrame(renderRing);
}

/* 7. Coastal Ambient Soundscape (Web Audio API) */
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

        // Warm harmonic chord (F# major chord in low octaves)
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

/* 8. Universal VIP Lead Capture & Private Tour Modal */
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
      const refCodeEl = document.getElementById('modal-ref-code');
      if (refCodeEl) refCodeEl.textContent = ref;
      document.getElementById('booking-form-view')?.classList.add('hidden');
      document.getElementById('booking-success-view')?.classList.remove('hidden');
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
  document.getElementById('booking-form-view')?.classList.remove('hidden');
  document.getElementById('booking-success-view')?.classList.add('hidden');
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeBookingModal() {
  const modal = document.getElementById('vip-booking-modal');
  if (!modal) return;
  modal.classList.add('hidden');
  document.body.style.overflow = '';
}

/* 9. Mobile Menu Drawer */
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

/* 10. Direct Helper: Open Booking For Specific Tier */
window.openBookingFor = function (tierName) {
  openBookingModal(tierName);
};

/* 11. Cinematic 4K Film Trailer Theater Modal */
function initCinematicTrailerModal() {
  const modal = document.getElementById('cinematic-trailer-modal');
  if (!modal) return;

  const closeBtns = modal.querySelectorAll('.close-trailer-btn');
  closeBtns.forEach((btn) => {
    btn.addEventListener('click', closeCinematicTrailer);
  });

  // Close on Escape
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeCinematicTrailer();
    }
  });
}

window.openCinematicTrailer = function (videoSrc = 'assets/videos/dubai-skyline.mp4') {
  const modal = document.getElementById('cinematic-trailer-modal');
  const video = document.getElementById('cinematic-trailer-video');
  if (!modal || !video) return;

  if (videoSrc) {
    const source = video.querySelector('source');
    if (source) source.src = videoSrc;
    video.load();
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  video.currentTime = 0;
  video.play().catch(() => {});
  if (typeof window.playLuxuryChime === 'function') {
    window.playLuxuryChime(659.25);
  }
};

window.closeCinematicTrailer = function () {
  const modal = document.getElementById('cinematic-trailer-modal');
  const video = document.getElementById('cinematic-trailer-video');
  if (!modal) return;

  if (video) {
    video.pause();
  }
  modal.classList.remove('active');
  document.body.style.overflow = '';
};

