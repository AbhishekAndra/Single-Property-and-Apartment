import React from 'react';
import { architecturalHighlights } from '../data/amenitiesData';
import { propertyMeta } from '../data/residencesData';
import { Sparkles, Check, ArrowRight, ShieldCheck, Award, Layers } from 'lucide-react';

export default function ArchitecturePage({ onOpenBooking }) {
  const constructionMilestones = [
    {
      quarter: "Q1 2024",
      milestone: "Piling & Caisson Marine Foundation",
      status: "Completed",
      details: "128 deep friction piles driven 45 meters into seabed bedrock."
    },
    {
      quarter: "Q4 2025",
      milestone: "Substructure & Marina Podium Top-Out",
      status: "Completed",
      details: "Completion of the 3-level subterranean VIP car vault and marina docks."
    },
    {
      quarter: "Q3 2026",
      milestone: "Level 48 Superstructure Pinnacle",
      status: "In Progress",
      details: "Structural completion of the cantilevered sky penthouses and rooftop helipad."
    },
    {
      quarter: "Q2 2027",
      milestone: "Facade Glazing & Interior Custom Millwork",
      status: "Scheduled",
      details: "Installation of motorized Schuco acoustic facades and Italian marble finishes."
    },
    {
      quarter: "Q4 2027",
      milestone: "Official Key Handover & VIP Move-In",
      status: "Guaranteed",
      details: "Full resident possession with St. Regis white-glove estate service initiation."
    }
  ];

  return (
    <div className="bg-sand-100 text-graphite-900 pt-28">
      {/* Architecture Page Hero */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 border-b border-sand-300">
        <div className="flex items-center space-x-2 text-[10px] uppercase font-mono tracking-[0.3em] text-bronze-dark mb-3">
          <Sparkles className="w-3.5 h-3.5 text-bronze-dark" />
          <span>FOSTER & PARTNERS ARCHITECTURAL MONOGRAPH</span>
        </div>
        <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-light text-graphite-950 tracking-tight leading-[0.95]">
          ENGINEERED FOR <br />
          <span className="italic font-normal">PERMANENCE</span>
        </h1>
        <p className="max-w-2xl text-graphite-700 text-sm md:text-base font-light mt-4 leading-relaxed">
          The Solaire represents a landmark feat of marine structural engineering. Designed to withstand coastal elements while providing pure uninterrupted transparency to the sea.
        </p>
      </div>

      {/* Hero Visual Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="relative h-[480px] md:h-[600px] rounded-3xl overflow-hidden border border-sand-300 shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=2400&q=90"
            alt="The Solaire Tower Architecture"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-graphite-950/80 via-transparent to-transparent" />
          <div className="absolute bottom-10 left-10 right-10 flex flex-col md:flex-row md:items-end justify-between text-sand-50">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-bronze">
                Architectural Form
              </span>
              <h2 className="font-serif text-3xl md:text-5xl font-light mt-1">
                Cantilevered Horizontal Planes
              </h2>
            </div>
            <div className="mt-4 md:mt-0 font-mono text-xs text-sand-300">
              HEIGHT: 185M • STOREYS: 48 • LEED PLATINUM
            </div>
          </div>
        </div>
      </section>

      {/* Structural Engineering Deep Dive */}
      <section className="py-24 bg-sand-200/50 border-t border-sand-300">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-2xl mb-16">
            <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-bronze-dark">
              ENGINEERING INNOVATION
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-graphite-950 mt-2">
              Pioneering Marine Structural Design
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {architecturalHighlights.map((item) => (
              <div
                key={item.number}
                className="bg-white rounded-3xl p-8 md:p-10 border border-sand-300 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-3xl text-bronze-dark font-light">{item.number}</span>
                  <h3 className="font-serif text-2xl font-light text-graphite-950 mt-3">{item.label}</h3>
                  <p className="text-sm text-graphite-600 font-light mt-3 leading-relaxed">{item.desc}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-sand-200 flex items-center space-x-2 text-xs text-bronze-dark font-mono">
                  <Check className="w-4 h-4" />
                  <span>Tested to 100-Year Storm Criteria</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Construction Timeline */}
      <section className="py-24 max-w-7xl mx-auto px-6 md:px-12">
        <div className="max-w-2xl mb-16">
          <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-bronze-dark">
            DELIVERY TIMELINE
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-graphite-950 mt-2">
            Construction Milestones to Q4 2027
          </h2>
        </div>

        <div className="space-y-6">
          {constructionMilestones.map((item, idx) => (
            <div
              key={idx}
              className="p-6 md:p-8 rounded-2xl bg-white border border-sand-300 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="md:w-1/4">
                <span className="font-mono text-xs uppercase tracking-widest text-bronze-dark">
                  {item.quarter}
                </span>
                <h3 className="font-serif text-2xl font-light text-graphite-950 mt-1">
                  {item.milestone}
                </h3>
              </div>

              <div className="md:w-1/2">
                <p className="text-xs text-graphite-600 font-light leading-relaxed">
                  {item.details}
                </p>
              </div>

              <div>
                <span
                  className={`px-4 py-1.5 rounded-full text-[10px] uppercase font-mono tracking-wider font-semibold ${
                    item.status === 'Completed'
                      ? 'bg-emerald-100 text-emerald-800'
                      : item.status === 'In Progress'
                      ? 'bg-amber-100 text-amber-800 animate-pulse'
                      : 'bg-sand-200 text-graphite-700'
                  }`}
                >
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button
            onClick={() => onOpenBooking('Architectural Advisory')}
            className="px-8 py-4 rounded-full bg-graphite-950 hover:bg-black text-sand-50 text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-lg"
            data-cursor="pointer"
          >
            Request Engineering Dossier (PDF)
          </button>
        </div>
      </section>
    </div>
  );
}

