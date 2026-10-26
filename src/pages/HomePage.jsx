import React from 'react';
import { Link } from 'react-router-dom';
import HeroMacroZoom from '../components/HeroMacroZoom';
import Building3DExplorer from '../components/Building3DExplorer';
import { ArrowRight, Compass, Sparkles, Layers, Eye, Calendar } from 'lucide-react';
import { propertyMeta } from '../data/residencesData';

export default function HomePage({ onOpenBooking }) {
  const handleExploreScroll = () => {
    const el = document.getElementById('residences');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      {/* 1. Hero & Macro-to-Micro Aerial Descent */}
      <HeroMacroZoom
        onOpenBooking={onOpenBooking}
        onExploreClick={handleExploreScroll}
      />

      {/* 2. Interactive 3D Building & Architectural Explorer */}
      <Building3DExplorer onOpenBooking={onOpenBooking} />

      {/* 3. Sub-Pages Gateway: Curated Architectural Chapters */}
      <section className="bg-sand-100 text-graphite-900 py-24 md:py-36 border-t border-sand-300">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-2xl mb-16">
            <p className="text-[10px] uppercase font-mono tracking-[0.35em] text-bronze-dark mb-2">
              THE CURATED CHAPTERS
            </p>
            <h2 className="font-serif text-4xl sm:text-6xl font-light text-graphite-950 tracking-tight">
              Explore the sanctuary in <span className="italic font-normal">depth.</span>
            </h2>
            <p className="text-graphite-600 text-sm md:text-base mt-4 font-light leading-relaxed">
              Discover dedicated sub-pages detailing residential collections, bespoke interior spaces, architectural blueprints, private amenities, and VIP gallery visits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1: Residences */}
            <Link
              to="/residences"
              className="group p-8 rounded-3xl bg-sand-200/50 hover:bg-white border border-sand-300 transition-all duration-500 shadow-sm hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between min-h-[340px]"
              data-cursor="pointer"
            >
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-bronze-dark">
                  Chapter 01
                </span>
                <h3 className="font-serif text-3xl font-light text-graphite-950 mt-2 group-hover:text-bronze-dark transition-colors">
                  The Residences
                </h3>
                <p className="text-xs text-graphite-600 font-light mt-3 leading-relaxed">
                  3D perspective model, vertical floor plate analysis, and detailed specifications across all 48 storeys.
                </p>
              </div>
              <div className="pt-6 border-t border-sand-300 flex items-center justify-between text-xs font-mono uppercase tracking-wider text-graphite-900 group-hover:text-bronze-dark">
                <span>Explore Residences</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
              </div>
            </Link>

            {/* Card 2: Interiors */}
            <Link
              to="/interiors"
              className="group p-8 rounded-3xl bg-sand-200/50 hover:bg-white border border-sand-300 transition-all duration-500 shadow-sm hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between min-h-[340px]"
              data-cursor="pointer"
            >
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-bronze-dark">
                  Chapter 02
                </span>
                <h3 className="font-serif text-3xl font-light text-graphite-950 mt-2 group-hover:text-bronze-dark transition-colors">
                  Interior Walkthrough
                </h3>
                <p className="text-xs text-graphite-600 font-light mt-3 leading-relaxed">
                  "Step inside the everyday." Fluid horizontal panoramic scrubbing, Studio Liaigre curation, and materials palette.
                </p>
              </div>
              <div className="pt-6 border-t border-sand-300 flex items-center justify-between text-xs font-mono uppercase tracking-wider text-graphite-900 group-hover:text-bronze-dark">
                <span>Step Inside</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
              </div>
            </Link>

            {/* Card 3: Floor Plans */}
            <Link
              to="/floor-plans"
              className="group p-8 rounded-3xl bg-sand-200/50 hover:bg-white border border-sand-300 transition-all duration-500 shadow-sm hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between min-h-[340px]"
              data-cursor="pointer"
            >
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-bronze-dark">
                  Chapter 03
                </span>
                <h3 className="font-serif text-3xl font-light text-graphite-950 mt-2 group-hover:text-bronze-dark transition-colors">
                  Floor Plans & Specs
                </h3>
                <p className="text-xs text-graphite-600 font-light mt-3 leading-relaxed">
                  Interactive architectural SVG blueprints, room dimensioning, SQ FT / SQ M toggle, and downloadable brochures.
                </p>
              </div>
              <div className="pt-6 border-t border-sand-300 flex items-center justify-between text-xs font-mono uppercase tracking-wider text-graphite-900 group-hover:text-bronze-dark">
                <span>View Blueprints</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
              </div>
            </Link>

            {/* Card 4: Amenities */}
            <Link
              to="/amenities"
              className="group p-8 rounded-3xl bg-sand-200/50 hover:bg-white border border-sand-300 transition-all duration-500 shadow-sm hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between min-h-[340px]"
              data-cursor="pointer"
            >
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-bronze-dark">
                  Chapter 04
                </span>
                <h3 className="font-serif text-3xl font-light text-graphite-950 mt-2 group-hover:text-bronze-dark transition-colors">
                  Amenities & Lifestyle
                </h3>
                <p className="text-xs text-graphite-600 font-light mt-3 leading-relaxed">
                  "Room to move. Time to exhale." 50m cantilevered sky pool, Nordic spa, private yacht berths, and butler service.
                </p>
              </div>
              <div className="pt-6 border-t border-sand-300 flex items-center justify-between text-xs font-mono uppercase tracking-wider text-graphite-900 group-hover:text-bronze-dark">
                <span>Discover Lifestyle</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
              </div>
            </Link>

            {/* Card 5: Architecture */}
            <Link
              to="/architecture"
              className="group p-8 rounded-3xl bg-sand-200/50 hover:bg-white border border-sand-300 transition-all duration-500 shadow-sm hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between min-h-[340px]"
              data-cursor="pointer"
            >
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-bronze-dark">
                  Chapter 05
                </span>
                <h3 className="font-serif text-3xl font-light text-graphite-950 mt-2 group-hover:text-bronze-dark transition-colors">
                  Architecture & Design
                </h3>
                <p className="text-xs text-graphite-600 font-light mt-3 leading-relaxed">
                  Foster & Partners engineering, post-tensioned cantilevered slabs, acoustic triple glazing, and LEED Platinum sustainability.
                </p>
              </div>
              <div className="pt-6 border-t border-sand-300 flex items-center justify-between text-xs font-mono uppercase tracking-wider text-graphite-900 group-hover:text-bronze-dark">
                <span>Read Philosophy</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
              </div>
            </Link>

            {/* Card 6: Contact & VIP Viewing */}
            <Link
              to="/contact"
              className="group p-8 rounded-3xl bg-graphite-950 text-sand-50 border border-bronze/30 transition-all duration-500 shadow-xl hover:-translate-y-1 flex flex-col justify-between min-h-[340px]"
              data-cursor="pointer"
            >
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-bronze">
                  VIP Invitation
                </span>
                <h3 className="font-serif text-3xl font-light text-sand-50 mt-2 group-hover:text-bronze-light transition-colors">
                  Private Sales Gallery
                </h3>
                <p className="text-xs text-sand-300 font-light mt-3 leading-relaxed">
                  Schedule a private viewing appointment with complimentary Rolls-Royce chauffeur transfer and direct WhatsApp concierge.
                </p>
              </div>
              <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono uppercase tracking-wider text-bronze group-hover:text-bronze-light">
                <span>Request Appointment</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

