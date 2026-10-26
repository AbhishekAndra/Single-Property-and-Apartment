import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Compass, ChevronDown, Sparkles, MapPin, Layers } from 'lucide-react';
import { propertyMeta } from '../data/residencesData';

gsap.registerPlugin(ScrollTrigger);

export default function HeroMacroZoom({ onOpenBooking, onExploreClick }) {
  const containerRef = useRef(null);
  const visualRef = useRef(null);
  const cloudsRef = useRef(null);
  const titleRef = useRef(null);
  const metricsRef = useRef(null);
  const buildingApproachRef = useRef(null);
  const [elevation, setElevation] = useState(1250);
  const [zoomProgress, setZoomProgress] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin hero and perform macro-to-micro descent zoom
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=200%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            setZoomProgress(p);
            // Simulate altitude readout descending from 1250m to 48m
            const currentElev = Math.round(1250 - p * (1250 - 48));
            setElevation(currentElev);
          },
        },
      });

      // 1. Initial title subtly fades up & disperses as descent begins
      tl.to(titleRef.current, {
        opacity: 0,
        y: -60,
        scale: 0.95,
        duration: 0.4,
        ease: 'power2.inOut',
      }, 0);

      // 2. High altitude aerial view zooms into the peninsula / island
      tl.to(visualRef.current, {
        scale: 2.2,
        y: '8%',
        ease: 'none',
        duration: 1,
      }, 0);

      // 3. Clouds & atmospheric haze disperse outwards
      tl.to(cloudsRef.current, {
        opacity: 0,
        scale: 1.8,
        filter: 'blur(20px)',
        ease: 'power1.out',
        duration: 0.6,
      }, 0.1);

      // 4. Tower approach closeup overlays smoothly
      tl.fromTo(buildingApproachRef.current, 
        { opacity: 0, scale: 0.85 },
        { opacity: 1, scale: 1, ease: 'power2.out', duration: 0.6 },
        0.4
      );

      // 5. Elevate metrics and micro details
      tl.fromTo(metricsRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, ease: 'power2.out', duration: 0.3 },
        0.6
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full h-screen overflow-hidden bg-graphite-950 text-sand-50 select-none"
    >
      {/* Visual Canvas Container */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {/* Macro Aerial Master View (High Drone Shot of circular island / waterfront) */}
        <div
          ref={visualRef}
          className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform origin-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2400&q=90')`,
            filter: 'brightness(0.78) contrast(1.15) saturate(1.05)',
          }}
        />

        {/* Cinematic atmospheric fog / clouds overlay */}
        <div
          ref={cloudsRef}
          className="absolute inset-0 pointer-events-none mix-blend-screen opacity-70"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.4) 0%, rgba(210,195,175,0.2) 40%, transparent 80%)`,
          }}
        />

        {/* Transitioning Close-up Approach of the Tower (Micro Approach) */}
        <div
          ref={buildingApproachRef}
          className="absolute inset-0 w-full h-full bg-cover bg-center origin-bottom pointer-events-none opacity-0"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=2400&q=90')`,
            filter: 'brightness(0.85) contrast(1.1)',
          }}
        />

        {/* Subtle Luxury Film Grain */}
        <div className="absolute inset-0 film-grain pointer-events-none" />

        {/* Vignette & Soft Gradient Masks */}
        <div className="absolute inset-0 bg-gradient-to-t from-graphite-950 via-graphite-950/30 to-graphite-950/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-graphite-950/80 via-transparent to-graphite-950/60" />
      </div>

      {/* Floating Macro Data Overlay (Telemetry & Coordinates) */}
      <div className="absolute top-28 left-6 md:left-12 z-20 flex flex-col space-y-3 pointer-events-none">
        <div className="flex items-center space-x-2 text-[10px] tracking-[0.3em] uppercase text-bronze-light font-mono bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 w-fit">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
          <span>AERIAL DRONE TELEMETRY</span>
        </div>
        <div className="font-mono text-xs md:text-sm text-sand-300 tracking-wider">
          <p className="flex items-center space-x-2">
            <Compass className="w-3.5 h-3.5 text-bronze" />
            <span>{propertyMeta.coordinates}</span>
          </p>
          <p className="text-[11px] text-sand-400 mt-0.5">JUMEIRAH BAY ARCHIPELAGO</p>
        </div>
      </div>

      {/* Live Altitude & Descent Indicator (Right Side) */}
      <div className="absolute top-28 right-6 md:right-12 z-20 flex flex-col items-end pointer-events-none">
        <div className="bg-black/40 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 text-right">
          <p className="text-[9px] uppercase tracking-[0.3em] text-sand-400 font-mono">Camera Elevation</p>
          <div className="flex items-baseline justify-end space-x-1">
            <span className="font-serif text-2xl md:text-3xl text-sand-50 font-light tabular-nums">
              {elevation.toLocaleString()}
            </span>
            <span className="text-xs text-bronze uppercase font-mono">Meters</span>
          </div>
          <div className="w-32 h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-bronze to-amber-300 transition-all duration-75"
              style={{ width: `${Math.min(100, (1 - elevation / 1250) * 100)}%` }}
            />
          </div>
          <p className="text-[9px] text-bronze-light font-mono mt-1 tracking-wider uppercase">
            {elevation > 600 ? 'Macro Masterplan View' : elevation > 150 ? 'Tower Mid-Level Scan' : 'Ground Level Arrival'}
          </p>
        </div>
      </div>

      {/* Central Hero Typography (Initial Frame) */}
      <div
        ref={titleRef}
        className="relative z-20 h-full max-w-6xl mx-auto px-6 flex flex-col items-center justify-center text-center pt-16"
      >
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border border-bronze/40 bg-graphite-950/60 backdrop-blur-md mb-6 shadow-2xl">
          <Sparkles className="w-3 h-3 text-bronze animate-pulse" />
          <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-bronze-light font-medium">
            Architectural Masterpiece by Foster & Partners
          </span>
        </div>

        <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-tight leading-[0.95] text-sand-50 mb-6 drop-shadow-2xl">
          THE <span className="italic font-normal text-gold-gradient">SOLAIRE</span>
        </h1>

        <p className="max-w-2xl text-sand-300 text-sm md:text-base lg:text-lg font-light tracking-wide leading-relaxed mb-10 text-center">
          Ninety-two bespoke sky residences sculpted against the Arabian Gulf horizon.
          Private cantilevered pools, 360° panoramic vistas, and effortless waterfront serenity.
        </p>

        {/* CTA Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <button
            onClick={onExploreClick}
            className="group relative px-8 py-4 rounded-full bg-bronze hover:bg-bronze-light text-graphite-950 font-semibold text-xs uppercase tracking-[0.25em] transition-all duration-300 shadow-[0_10px_30px_rgba(197,168,128,0.3)] hover:shadow-[0_15px_40px_rgba(197,168,128,0.5)] transform hover:-translate-y-0.5"
            data-cursor="pointer"
          >
            Explore Residences
          </button>

          <button
            onClick={() => onOpenBooking()}
            className="px-8 py-4 rounded-full border border-sand-50/30 hover:border-bronze bg-white/5 hover:bg-white/10 text-sand-100 font-medium text-xs uppercase tracking-[0.25em] backdrop-blur-md transition-all duration-300"
            data-cursor="pointer"
          >
            Schedule VIP Viewing
          </button>
        </div>
      </div>

      {/* Micro-Approach HUD Details (Reveals on Descent) */}
      <div
        ref={metricsRef}
        className="absolute bottom-12 inset-x-0 z-20 max-w-5xl mx-auto px-6 pointer-events-auto opacity-0"
      >
        <div className="p-6 md:p-8 rounded-2xl glass-panel-dark border border-white/15 grid grid-cols-2 md:grid-cols-4 gap-6 text-left shadow-2xl">
          <div>
            <p className="text-[9px] uppercase tracking-[0.3em] text-bronze">Total Storeys</p>
            <p className="font-serif text-2xl md:text-3xl font-light text-sand-50 mt-1">48 Levels</p>
            <p className="text-[10px] text-sand-400 mt-0.5">185m Tower Height</p>
          </div>
          <div>
            <p className="text-[9px] uppercase tracking-[0.3em] text-bronze">Collection</p>
            <p className="font-serif text-2xl md:text-3xl font-light text-sand-50 mt-1">92 Residences</p>
            <p className="text-[10px] text-sand-400 mt-0.5">1 to 5 Bedroom Estates</p>
          </div>
          <div>
            <p className="text-[9px] uppercase tracking-[0.3em] text-bronze">Harbor Berth</p>
            <p className="font-serif text-2xl md:text-3xl font-light text-sand-50 mt-1">45m Marina</p>
            <p className="text-[10px] text-sand-400 mt-0.5">Private Slipway</p>
          </div>
          <div>
            <p className="text-[9px] uppercase tracking-[0.3em] text-bronze">Delivery</p>
            <p className="font-serif text-2xl md:text-3xl font-light text-sand-50 mt-1">Q4 2027</p>
            <p className="text-[10px] text-sand-400 mt-0.5">Handover Guaranteed</p>
          </div>
        </div>
      </div>

      {/* Scroll Down Prompt */}
      <div className="absolute bottom-6 inset-x-0 z-20 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-[9px] uppercase tracking-[0.35em] text-sand-400 font-mono mb-2">
          {zoomProgress > 0.1 ? 'Scroll to Enter Residences' : 'Scroll to Descend'}
        </span>
        <div className="w-5 h-8 rounded-full border border-sand-400/40 flex items-start justify-center p-1.5">
          <div className="w-1 h-2 rounded-full bg-bronze animate-bounce" />
        </div>
      </div>
    </section>
  );
}

