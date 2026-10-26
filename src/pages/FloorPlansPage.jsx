import React from 'react';
import FloorPlansSection from '../components/FloorPlansSection';
import { Download, Compass, Layers, Check, Sparkles, ArrowRight } from 'lucide-react';
import { floorPlans } from '../data/residencesData';

export default function FloorPlansPage({ onOpenBooking }) {
  const zoningSchedule = [
    {
      tier: "Sky Penthouses",
      levels: "Levels 44 – 48",
      plates: "2 Duplex Penthouses per floor plate",
      features: "Private 18m cantilevered infinity pool, 7m cathedral salon ceilings, internal glass lift."
    },
    {
      tier: "The Horizon Residences",
      levels: "Levels 28 – 42",
      plates: "3 Panorama Residences per floor plate",
      features: "3.2m deep cantilevered loggias, dual-orientation ocean/skyline aspects, private service corridor."
    },
    {
      tier: "The Celestial Sky Deck",
      levels: "Levels 18 – 20",
      plates: "Dedicated 16,000 sq ft Resident Amenity Deck",
      features: "50m cantilevered glass-bottom lap pool, Nordic thermal spa, executive boardrooms."
    },
    {
      tier: "Signature Waterfront Suites",
      levels: "Levels 05 – 16",
      plates: "4 Luxury Suites per floor plate",
      features: "Direct yacht marina views, custom Poliform kitchens, biometric direct-to-unit elevators."
    },
    {
      tier: "Grand Arrival & Promenade",
      levels: "Ground & Marina Level",
      plates: "Subterranean Porte-Cochère & Yacht Harbor",
      features: "12m travertine grand foyer, private marina slips up to 45m vessels, 24/7 concierge."
    }
  ];

  return (
    <div className="bg-sand-100 text-graphite-900 pt-28">
      {/* Floor Plans Page Hero */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 border-b border-sand-300">
        <div className="flex items-center space-x-2 text-[10px] uppercase font-mono tracking-[0.3em] text-bronze-dark mb-3">
          <Sparkles className="w-3.5 h-3.5 text-bronze-dark" />
          <span>BLUEPRINT SCHEMATICS & METRICS</span>
        </div>
        <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-light text-graphite-950 tracking-tight leading-[0.95]">
          ARCHITECTURAL <br />
          <span className="italic font-normal">FLOOR PLANS</span>
        </h1>
        <p className="max-w-2xl text-graphite-700 text-sm md:text-base font-light mt-4 leading-relaxed">
          Engineered by Foster & Partners for flow-through breezes, column-free living expanses, and unobstructed vistas of the Arabian Gulf and Dubai skyline.
        </p>
      </div>

      {/* Main Floor Plans Component with Interactive Blueprint SVG */}
      <FloorPlansSection onOpenBooking={onOpenBooking} />

      {/* Vertical Building Zoning & Floor Plate Schedule */}
      <section className="py-24 max-w-7xl mx-auto px-6 md:px-12">
        <div className="max-w-xl mb-14">
          <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-bronze-dark">
            VERTICAL STACKING
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-graphite-950 mt-2">
            Building Stacking Plan
          </h2>
          <p className="text-graphite-600 text-sm md:text-base font-light mt-3">
            An overview of floor plate distribution from the subterranean marina arrival up to the cloud duplex penthouses.
          </p>
        </div>

        <div className="space-y-4">
          {zoningSchedule.map((zone, idx) => (
            <div
              key={idx}
              className="p-6 md:p-8 rounded-2xl bg-white border border-sand-300 shadow-sm hover:border-bronze-dark transition-colors flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="md:w-1/4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-bronze-dark">
                  {zone.levels}
                </span>
                <h3 className="font-serif text-2xl font-light text-graphite-950 mt-1">
                  {zone.tier}
                </h3>
              </div>

              <div className="md:w-1/3">
                <p className="text-xs font-mono text-graphite-700">
                  {zone.plates}
                </p>
              </div>

              <div className="md:w-1/3">
                <p className="text-xs text-graphite-600 font-light leading-relaxed">
                  {zone.features}
                </p>
              </div>

              <div>
                <button
                  onClick={() => onOpenBooking(zone.tier)}
                  className="px-5 py-2 rounded-full border border-sand-400 hover:border-graphite-950 text-graphite-900 text-xs uppercase font-mono tracking-wider transition-colors"
                >
                  Inquire
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

