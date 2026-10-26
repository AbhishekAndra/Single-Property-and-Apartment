/**
 * The Solaire Residences — Interior Walkthrough Scrubber ("Step inside the everyday")
 * Handles interactive horizontal pan scrubbing and lighting atmosphere transitions.
 */

window.initInteriorScrubber = function () {
  const container = document.getElementById('interior-scrub-viewport');
  const image = document.getElementById('interior-scrub-image');
  const readout = document.getElementById('interior-scrub-percent');
  if (!container || !image) return;

  let isDragging = false;
  let scrubPercent = 50;

  function updateScrub(clientX) {
    const rect = container.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
    scrubPercent = (x / rect.width) * 100;
    image.style.transform = `scale(1.15) translateX(${(scrubPercent - 50) * -0.25}%)`;
    if (readout) readout.textContent = `${Math.round(scrubPercent)}% Pan`;
  }

  container.addEventListener('mousedown', (e) => {
    isDragging = true;
    updateScrub(e.clientX);
  });
  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    updateScrub(e.clientX);
  });
  window.addEventListener('mouseup', () => (isDragging = false));

  // Touch Support
  container.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      isDragging = true;
      updateScrub(e.touches[0].clientX);
    }
  }, { passive: true });
  window.addEventListener('touchmove', (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    updateScrub(e.touches[0].clientX);
  }, { passive: true });
  window.addEventListener('touchend', () => (isDragging = false));

  // Room Switchers
  const roomButtons = document.querySelectorAll('[data-interior-room]');
  roomButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      roomButtons.forEach((b) => b.classList.remove('bg-graphite-950', 'text-sand-50', 'shadow-lg'));
      roomButtons.forEach((b) => b.classList.add('bg-sand-200/60', 'text-graphite-700'));
      btn.classList.add('bg-graphite-950', 'text-sand-50', 'shadow-lg');
      btn.classList.remove('bg-sand-200/60', 'text-graphite-700');

      const imgUrl = btn.getAttribute('data-img');
      const title = btn.getAttribute('data-title');
      const subtitle = btn.getAttribute('data-subtitle');
      const desc = btn.getAttribute('data-desc');
      const accent = btn.getAttribute('data-accent');

      if (image) image.style.backgroundImage = `url('${imgUrl}')`;
      const titleEl = document.getElementById('interior-room-title');
      const subEl = document.getElementById('interior-room-subtitle');
      const descEl = document.getElementById('interior-room-desc');
      const accentEl = document.getElementById('interior-room-accent');

      if (titleEl) titleEl.textContent = title;
      if (subEl) subEl.textContent = subtitle;
      if (descEl) descEl.textContent = desc;
      if (accentEl) accentEl.textContent = accent;

      scrubPercent = 50;
      image.style.transform = `scale(1.15) translateX(0%)`;
      if (readout) readout.textContent = `50% Pan`;
    });
  });

  // Lighting Filter Buttons
  const lightButtons = document.querySelectorAll('[data-lighting-mode]');
  lightButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const mode = btn.getAttribute('data-lighting-mode');
      lightButtons.forEach((b) => b.classList.remove('bg-white', 'shadow'));
      btn.classList.add('bg-white', 'shadow');

      if (mode === 'sunset') {
        image.style.filter = 'sepia(0.2) saturate(1.25) contrast(1.08) brightness(0.95)';
      } else if (mode === 'night') {
        image.style.filter = 'brightness(0.7) contrast(1.2) hue-rotate(-15deg)';
      } else {
        image.style.filter = 'brightness(1.02) contrast(1.02) saturate(1.05)';
      }
    });
  });
};

