import React, { useState, useRef, useEffect } from 'react';
import { interiorSpaces } from '../data/residencesData';
import { ChevronLeft, ChevronRight, Maximize2, Compass, Sparkles, Sun, Moon, Sunset } from 'lucide-react';

export default function InteriorWalkthrough({ onOpenBooking }) {
  const [activeSpaceIdx, setActiveSpaceIdx] = useState(0);
  const [scrubPosition, setScrubPosition] = useState(50);
  const [lightingMode, setLightingMode] = useState('sunset'); // 'day', 'sunset', 'night'
  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const currentSpace = interiorSpaces[activeSpaceIdx];

  const handleNext = () => {
    setActiveSpaceIdx((prev) => (prev + 1) % interiorSpaces.length);
    setScrubPosition(50);
  };

  const handlePrev = () => {
    setActiveSpaceIdx((prev) => (prev - 1 + interiorSpaces.length) % interiorSpaces.length);
    setScrubPosition(50);
  };

  // Horizontal pan scrubbing
  const handleMouseMove = (e) => {
    if (!sliderRef.current || !isDragging) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    setScrubPosition((x / rect.width) * 100);
  };

  const handleTouchMove = (e) => {
    if (!sliderRef.current || !isDragging || e.touches.length !== 1) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, e.touches[0].clientX - rect.left));
    setScrubPosition((x / rect.width) * 100);
  };

  // Lighting filters
  const getLightingFilter = () => {
    if (lightingMode === 'sunset') return 'sepia(0.2) saturate(1.25) contrast(1.08) brightness(0.95)';
    if (lightingMode === 'night') return 'brightness(0.7) contrast(1.2) hue-rotate(-15deg)';
    return 'brightness(1.02) contrast(1.02) saturate(1.05)';
  };

  return (
    <section
      id="interiors"
      className="relative w-full min-h-screen bg-sand-100 text-graphite-900 py-24 md:py-36 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Editorial Title Section matching the video's "Step inside the everyday." */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-[10px] uppercase tracking-[0.35em] text-bronze-dark font-mono mb-3">
            INTERIOR ARCHITECTURE & BESPOKE FINISHES
          </p>
          <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl font-light tracking-tight text-graphite-950">
            Step inside <br className="hidden sm:block" />
            <span className="italic font-normal font-serif">the everyday.</span>
          </h2>
          <p className="mt-4 text-graphite-700 text-sm md:text-base font-light leading-relaxed max-w-xl mx-auto">
            Light, raw stone, and expansive volumes composed in harmonious balance.
            Every surface is tailored with honest materials that age with grace.
          </p>
        </div>

        {/* Space Selector Tabs */}
        <div className="flex items-center justify-center space-x-2 md:space-x-4 mb-10 overflow-x-auto pb-4 scrollbar-none">
          {interiorSpaces.map((space, idx) => (
            <button
              key={space.id}
              onClick={() => {
                setActiveSpaceIdx(idx);
                setScrubPosition(50);
              }}
              className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 whitespace-nowrap ${
                activeSpaceIdx === idx
                  ? 'bg-graphite-950 text-sand-50 shadow-lg'
                  : 'bg-sand-200/60 hover:bg-sand-300 text-graphite-700'
              }`}
              data-cursor="pointer"
            >
              {space.title}
            </button>
          ))}
        </div>

        {/* Main Split-Screen Editorial & Interactive Scrubbing Viewport */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Editorial Narrative Panel */}
          <div className="lg:col-span-5 bg-sand-200/50 p-8 md:p-12 rounded-3xl border border-sand-300 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-[10px] font-mono uppercase tracking-widest text-bronze-dark">
                  Space 0{activeSpaceIdx + 1} / 0{interiorSpaces.length}
                </span>
                <span className="px-3 py-1 rounded-full bg-bronze/15 text-bronze-deep text-[10px] uppercase font-mono tracking-wider">
                  {currentSpace.accent}
                </span>
              </div>

              <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-graphite-950 leading-tight">
                {currentSpace.title}
              </h3>
              <p className="text-sm font-medium text-bronze-dark mt-1 font-serif italic">
                {currentSpace.subtitle}
              </p>

              <p className="text-graphite-700 text-sm md:text-base font-light leading-relaxed mt-6">
                {currentSpace.description}
              </p>

              {/* Material and tactile highlights */}
              <div className="mt-8 border-t border-sand-300/80 pt-6 space-y-3">
                <p className="text-[10px] uppercase tracking-[0.25em] text-graphite-500 font-mono">
                  Bespoke Architectural Specifications
                </p>
                {currentSpace.details.map((detail, idx) => (
                  <div key={idx} className="flex items-center space-x-3 text-xs text-graphite-800">
                    <div className="w-1.5 h-1.5 rounded-full bg-bronze" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Lighting Mode Selector & Space Navigation */}
            <div className="mt-10 pt-6 border-t border-sand-300/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-[9px] uppercase tracking-widest text-graphite-500 font-mono mb-2">
                  Lighting Atmosphere
                </p>
                <div className="flex items-center space-x-1.5 bg-sand-300/50 p-1 rounded-full w-fit">
                  <button
                    onClick={() => setLightingMode('day')}
                    className={`p-1.5 rounded-full transition-all ${
                      lightingMode === 'day' ? 'bg-white shadow text-amber-600' : 'text-graphite-500 hover:text-graphite-900'
                    }`}
                    title="Midday Sun"
                  >
                    <Sun className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setLightingMode('sunset')}
                    className={`p-1.5 rounded-full transition-all ${
                      lightingMode === 'sunset' ? 'bg-white shadow text-amber-700' : 'text-graphite-500 hover:text-graphite-900'
                    }`}
                    title="Golden Hour Sunset"
                  >
                    <Sunset className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setLightingMode('night')}
                    className={`p-1.5 rounded-full transition-all ${
                      lightingMode === 'night' ? 'bg-white shadow text-indigo-700' : 'text-graphite-500 hover:text-graphite-900'
                    }`}
                    title="Twilight Sanctuary"
                  >
                    <Moon className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Prev / Next arrows */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={handlePrev}
                  className="p-3 rounded-full border border-sand-300 bg-white hover:bg-sand-50 text-graphite-800 transition-colors shadow-sm"
                  data-cursor="pointer"
                  title="Previous Space"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-3 rounded-full border border-sand-300 bg-white hover:bg-sand-50 text-graphite-800 transition-colors shadow-sm"
                  data-cursor="pointer"
                  title="Next Space"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Fluid Scrubbing Visual Pan */}
          <div
            ref={sliderRef}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={handleMouseMove}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => setIsDragging(false)}
            onTouchMove={handleTouchMove}
            className="lg:col-span-7 relative h-[480px] md:h-[620px] rounded-3xl overflow-hidden cursor-ew-resize select-none border border-sand-300 shadow-xl group"
            data-cursor="drag"
            data-cursor-text="PAN"
          >
            {/* The High-Resolution Interior Visual */}
            <div
              className="absolute inset-0 w-full h-full bg-cover transition-transform duration-300 ease-out origin-center"
              style={{
                backgroundImage: `url('${currentSpace.image}')`,
                filter: getLightingFilter(),
                transform: `scale(1.15) translateX(${(scrubPosition - 50) * -0.2}%)`,
              }}
            />

            {/* Subtle Vignette & Grain */}
            <div className="absolute inset-0 bg-gradient-to-t from-graphite-950/70 via-transparent to-graphite-950/20 pointer-events-none" />

            {/* Scrub HUD / Drag Indicator */}
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between pointer-events-none">
              <div className="bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-white flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-bronze animate-pulse" />
                <span className="text-[10px] uppercase font-mono tracking-widest">
                  Drag Horizontally to Pan Interior
                </span>
              </div>

              <div className="bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-white font-mono text-xs">
                {Math.round(scrubPosition)}% Pan
              </div>
            </div>

            {/* Inquire on this interior */}
            <div className="absolute top-6 right-6">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenBooking(currentSpace.title);
                }}
                className="px-5 py-2.5 rounded-full bg-white/90 hover:bg-white text-graphite-950 font-medium text-xs uppercase tracking-widest shadow-lg backdrop-blur-md transition-all hover:scale-105"
                data-cursor="pointer"
              >
                Book Tour
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

