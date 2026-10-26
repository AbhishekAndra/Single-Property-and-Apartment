import React, { useState } from 'react';
import { floorPlans } from '../data/residencesData';
import { Compass, Download, Maximize, Bed, Bath, ArrowUpRight, Check, Eye } from 'lucide-react';

export default function FloorPlansSection({ onOpenBooking }) {
  const [selectedPlanId, setSelectedPlanId] = useState(floorPlans[0].id);
  const [unitMetric, setUnitMetric] = useState('sqft'); // 'sqft' or 'sqm'
  const [hoveredRoom, setHoveredRoom] = useState(null);
  const [downloadToast, setDownloadToast] = useState(false);

  const activePlan = floorPlans.find((p) => p.id === selectedPlanId) || floorPlans[0];

  const handleDownload = () => {
    setDownloadToast(true);
    setTimeout(() => setDownloadToast(false), 4000);
  };

  return (
    <section
      id="plans"
      className="relative w-full min-h-screen bg-sand-200/40 text-graphite-900 py-24 md:py-36 border-t border-sand-300"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 border-b border-sand-300 pb-8">
          <div>
            <p className="text-[10px] uppercase tracking-[0.35em] text-bronze-dark font-mono mb-3">
              ARCHITECTURAL LAYOUTS & BLUEPRINTS
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-graphite-950">
              RESIDENCE <span className="italic font-normal">SPECIFICATIONS</span>
            </h2>
            <p className="text-graphite-600 text-sm md:text-base mt-2 max-w-xl font-light">
              Filterable architectural layouts with room dimensioning, exposure analysis, and customizable floor plate selections.
            </p>
          </div>

          {/* Metric Toggle (SQ FT / SQ M) */}
          <div className="mt-6 md:mt-0 flex items-center space-x-3">
            <span className="text-xs uppercase tracking-widest text-graphite-500 font-mono">Unit Measure:</span>
            <div className="bg-sand-300/60 p-1 rounded-full flex items-center">
              <button
                onClick={() => setUnitMetric('sqft')}
                className={`px-3 py-1 rounded-full text-xs font-mono font-medium transition-all ${
                  unitMetric === 'sqft' ? 'bg-white shadow text-graphite-950' : 'text-graphite-600 hover:text-graphite-950'
                }`}
              >
                SQ FT
              </button>
              <button
                onClick={() => setUnitMetric('sqm')}
                className={`px-3 py-1 rounded-full text-xs font-mono font-medium transition-all ${
                  unitMetric === 'sqm' ? 'bg-white shadow text-graphite-950' : 'text-graphite-600 hover:text-graphite-950'
                }`}
              >
                SQ M
              </button>
            </div>
          </div>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          {floorPlans.map((plan) => {
            const isSelected = plan.id === selectedPlanId;
            return (
              <button
                key={plan.id}
                onClick={() => setSelectedPlanId(plan.id)}
                className={`p-4 rounded-2xl border text-left transition-all duration-300 ${
                  isSelected
                    ? 'bg-graphite-950 text-sand-50 border-graphite-950 shadow-xl'
                    : 'bg-white/80 hover:bg-white text-graphite-900 border-sand-300/80 shadow-sm'
                }`}
                data-cursor="pointer"
              >
                <div className="flex items-center justify-between text-[10px] uppercase font-mono tracking-wider opacity-70 mb-1">
                  <span>{plan.category}</span>
                  <span>{plan.levelRange}</span>
                </div>
                <h4 className="font-serif text-lg md:text-xl font-light">{plan.name}</h4>
                <div className="mt-2 text-xs font-mono text-bronze-dark">
                  {unitMetric === 'sqft' ? `${plan.sqft.toLocaleString()} SQ FT` : `${plan.sqm} SQ M`}
                </div>
              </button>
            );
          })}
        </div>

        {/* Blueprint Viewer & Metrics Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Interactive Architectural Blueprint SVG Canvas */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 border border-sand-300 shadow-xl flex flex-col justify-between relative overflow-hidden">
            {/* Compass Heading & Level Overlay */}
            <div className="flex items-center justify-between border-b border-sand-200 pb-4 mb-6">
              <div className="flex items-center space-x-2 text-xs font-mono text-graphite-600">
                <Compass className="w-4 h-4 text-bronze-dark animate-spin" style={{ animationDuration: '20s' }} />
                <span>EXPOSURE: {activePlan.exposure}</span>
              </div>
              <span className="text-[11px] font-mono uppercase bg-sand-100 text-bronze-deep px-3 py-1 rounded-full border border-sand-200">
                {activePlan.levelRange}
              </span>
            </div>

            {/* Interactive Blueprint Schematic */}
            <div className="relative w-full aspect-[4/3] rounded-2xl border border-sand-200 bg-[#FCFAF7] p-6 flex items-center justify-center overflow-hidden">
              {/* Architectural Grid Lines */}
              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage: `linear-gradient(#C5A880 1px, transparent 1px), linear-gradient(90deg, #C5A880 1px, transparent 1px)`,
                  backgroundSize: '24px 24px',
                }}
              />

              {/* Dynamic Room Layout SVG */}
              <div className="relative w-full h-full">
                {activePlan.svgPlan.roomsLayout.map((room, idx) => (
                  <div
                    key={idx}
                    onMouseEnter={() => setHoveredRoom(room.label)}
                    onMouseLeave={() => setHoveredRoom(null)}
                    className="absolute border border-bronze/40 rounded-lg p-2 flex flex-col items-center justify-center transition-all duration-300 cursor-pointer shadow-sm hover:scale-[1.02] hover:z-20 hover:border-bronze hover:shadow-md"
                    style={{
                      left: room.x,
                      top: room.y,
                      width: room.w,
                      height: room.h,
                      backgroundColor: hoveredRoom === room.label ? 'rgba(197, 168, 128, 0.35)' : room.color,
                    }}
                    data-cursor="pointer"
                  >
                    <span className="text-[10px] md:text-xs font-serif font-light text-graphite-900 text-center leading-tight">
                      {room.label}
                    </span>
                    <span className="text-[8px] font-mono text-bronze-deep opacity-80 mt-0.5">
                      {hoveredRoom === room.label ? 'Active Room' : 'Interactive'}
                    </span>
                  </div>
                ))}
              </div>

              {/* Blueprint Watermark */}
              <div className="absolute bottom-3 right-4 text-[9px] font-mono uppercase text-graphite-400 tracking-widest pointer-events-none">
                FOSTER & PARTNERS BLUEPRINT REF: #{activePlan.id.toUpperCase()}-2027
              </div>
            </div>

            {/* Room Dimension Explorer List */}
            <div className="mt-6 pt-4 border-t border-sand-200 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {activePlan.rooms.map((room, idx) => (
                <div
                  key={idx}
                  onMouseEnter={() => setHoveredRoom(room.name.split(' ')[0])}
                  onMouseLeave={() => setHoveredRoom(null)}
                  className="p-2.5 rounded-xl bg-sand-100 hover:bg-bronze/10 border border-sand-200 transition-colors"
                >
                  <p className="text-[10px] uppercase font-mono text-graphite-500 line-clamp-1">{room.name}</p>
                  <p className="text-xs font-mono font-medium text-graphite-900 mt-0.5">{room.dimensions}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Metrics & Inquiry Specification Card */}
          <div className="lg:col-span-5 bg-sand-100 p-8 md:p-10 rounded-3xl border border-sand-300 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-mono tracking-widest text-bronze-dark font-semibold">
                  {activePlan.category} Suite
                </span>
                <span className="text-sm font-mono text-graphite-950 font-bold">
                  {activePlan.price}
                </span>
              </div>

              <h3 className="font-serif text-3xl md:text-4xl font-light text-graphite-950 mt-2">
                {activePlan.name}
              </h3>

              <p className="text-sm text-graphite-700 font-light leading-relaxed mt-4">
                {activePlan.description}
              </p>

              {/* Key Numeric Metrics */}
              <div className="grid grid-cols-3 gap-4 my-8 p-4 rounded-2xl bg-white border border-sand-200 text-center">
                <div>
                  <p className="text-[9px] uppercase font-mono text-graphite-500">Internal Area</p>
                  <p className="font-serif text-xl font-light text-graphite-950 mt-1">
                    {unitMetric === 'sqft' ? `${activePlan.sqft.toLocaleString()} ft²` : `${activePlan.sqm} m²`}
                  </p>
                </div>
                <div className="border-x border-sand-200">
                  <p className="text-[9px] uppercase font-mono text-graphite-500">Bedrooms</p>
                  <p className="font-serif text-xl font-light text-graphite-950 mt-1 flex items-center justify-center space-x-1">
                    <Bed className="w-4 h-4 text-bronze-dark" />
                    <span>{activePlan.bedrooms}</span>
                  </p>
                </div>
                <div>
                  <p className="text-[9px] uppercase font-mono text-graphite-500">Bathrooms</p>
                  <p className="font-serif text-xl font-light text-graphite-950 mt-1 flex items-center justify-center space-x-1">
                    <Bath className="w-4 h-4 text-bronze-dark" />
                    <span>{activePlan.bathrooms}</span>
                  </p>
                </div>
              </div>

              {/* Included Specifications */}
              <div className="space-y-2.5">
                <p className="text-[10px] uppercase tracking-widest font-mono text-graphite-500">
                  Included Amenities & Privileges
                </p>
                {[
                  'Private automated underground parking stalls (2 slots)',
                  'Direct elevator access with biometric residency key',
                  'Gaggenau 400 Series integrated culinary appliances',
                  'Private climate-controlled storage locker in cellar'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-xs text-graphite-700">
                    <Check className="w-3.5 h-3.5 text-bronze-dark shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-8 pt-6 border-t border-sand-300 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => onOpenBooking(activePlan.name)}
                className="flex-1 py-4 rounded-full bg-graphite-950 hover:bg-black text-sand-50 text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-lg flex items-center justify-center space-x-2"
                data-cursor="pointer"
              >
                <span>Schedule Viewing</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-bronze" />
              </button>

              <button
                onClick={handleDownload}
                className="px-6 py-4 rounded-full border border-sand-400/70 hover:border-graphite-950 text-graphite-800 text-xs uppercase tracking-[0.2em] font-medium transition-all flex items-center justify-center space-x-2 bg-white"
                data-cursor="pointer"
              >
                <Download className="w-3.5 h-3.5 text-bronze-dark" />
                <span>Brochure</span>
              </button>
            </div>
          </div>
        </div>

        {/* Download Feedback Toast */}
        {downloadToast && (
          <div className="fixed bottom-8 right-8 z-50 bg-graphite-950 text-sand-50 px-6 py-4 rounded-2xl shadow-2xl border border-bronze flex items-center space-x-4 animate-bounce">
            <div className="w-3 h-3 rounded-full bg-emerald-400" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-bronze-light">Download Initialized</p>
              <p className="text-xs text-sand-300">Brochure for {activePlan.name} (PDF, 14.2 MB) prepared.</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

