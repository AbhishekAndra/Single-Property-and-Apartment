import React from 'react';
import InteriorWalkthrough from '../components/InteriorWalkthrough';
import { interiorSpaces } from '../data/residencesData';
import { Sparkles, ArrowRight, ShieldCheck, Layers, Eye } from 'lucide-react';

export default function InteriorsPage({ onOpenBooking }) {
  const materialLibrary = [
    {
      title: "Arabescato Orobico Marble",
      origin: "Bergamo, Northern Italy",
      application: "Grand salon monolithic fireplace & bathroom vanities",
      description: "Characterized by sweeping veins of pewter grey, dove white, and warm gold swirls, honed to a velvety satin finish.",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "French Fluted Walnut",
      origin: "Dordogne Valley, France",
      application: "Master suite millwork & concealed acoustic wall paneling",
      description: "Naturally dried for 36 months, hand-waxed with organic beeswax to yield a deep, tactile grain that softens room acoustics.",
      image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Brushed Champagne Brass",
      origin: "Iserlohn, Germany (Dornbracht)",
      application: "Bathroom mixers, shower rain-skies, and pivot doors",
      description: "Custom PVD coated brassware engineered with microscopic nano-finishes that repel water spots and fingerprint patinas.",
      image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Taj Mahal Quartzite",
      origin: "Ceará, Brazil",
      application: "Chef's show kitchen waterfall island and splashbacks",
      description: "An ultra-dense natural metamorphic quartzite with warm translucent ivory crystal matrices, resistant to heat and acids.",
      image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <div className="bg-sand-100 text-graphite-900 pt-28">
      {/* Interior Page Hero */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 border-b border-sand-300">
        <div className="flex items-center space-x-2 text-[10px] uppercase font-mono tracking-[0.3em] text-bronze-dark mb-3">
          <Sparkles className="w-3.5 h-3.5 text-bronze-dark" />
          <span>INTERIOR CURATION BY STUDIO LIAIGRE</span>
        </div>
        <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-light text-graphite-950 tracking-tight leading-[0.95]">
          A POETRY OF <br />
          <span className="italic font-normal">LIGHT & STONE</span>
        </h1>
        <p className="max-w-2xl text-graphite-700 text-sm md:text-base font-light mt-4 leading-relaxed">
          The interiors of The Solaire celebrate honest materiality, tactile woods, and serene spatial proportions. Every detail has been tailored to dissolve the barrier between private sanctuary and endless coastal horizon.
        </p>
      </div>

      {/* Main Interactive Walkthrough Component ("Step inside the everyday.") */}
      <InteriorWalkthrough onOpenBooking={onOpenBooking} />

      {/* The Tactile Material Library */}
      <section className="py-24 bg-sand-200/50 border-t border-sand-300">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-2xl mb-16">
            <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-bronze-dark">
              MATERIAL HONESTY
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-graphite-950 mt-2">
              The Tactile Material Palette
            </h2>
            <p className="text-graphite-600 text-sm md:text-base font-light mt-3">
              Noble stones, sustainably harvested woods, and hand-patinated metals sourced from historic European quarries and master workshops.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {materialLibrary.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 border border-sand-300 shadow-sm flex flex-col justify-between hover:shadow-xl transition-all duration-300"
              >
                <div>
                  <div className="h-48 rounded-2xl overflow-hidden mb-6 border border-sand-200">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    />
                  </div>
                  <span className="text-[9px] uppercase font-mono tracking-widest text-bronze-dark">
                    {item.origin}
                  </span>
                  <h3 className="font-serif text-2xl font-light text-graphite-950 mt-1">
                    {item.title}
                  </h3>
                  <p className="text-[11px] font-mono text-graphite-500 mt-1">
                    {item.application}
                  </p>
                  <p className="text-xs text-graphite-700 font-light mt-3 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Designer Quote & Philosophy */}
      <section className="py-24 max-w-5xl mx-auto px-6 md:px-12 text-center">
        <span className="text-[10px] uppercase font-mono tracking-[0.35em] text-bronze-dark">
          DESIGN PHILOSOPHY
        </span>
        <blockquote className="font-serif text-3xl sm:text-5xl font-light text-graphite-950 italic mt-6 leading-relaxed">
          "True luxury is silence, space, and sunlight falling across honest stone. We did not build walls; we framed the sky."
        </blockquote>
        <p className="text-xs font-mono uppercase tracking-widest text-graphite-500 mt-6">
          — Studio Liaigre Design Direction, Paris
        </p>

        <div className="mt-12">
          <button
            onClick={() => onOpenBooking('Interior Presentation')}
            className="px-8 py-4 rounded-full bg-graphite-950 hover:bg-black text-sand-50 text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-lg"
            data-cursor="pointer"
          >
            Schedule In-Person Interior Tour
          </button>
        </div>
      </section>
    </div>
  );
}

