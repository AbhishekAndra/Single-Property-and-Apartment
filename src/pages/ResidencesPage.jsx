import React, { useState } from 'react';
import Building3DExplorer from '../components/Building3DExplorer';
import { hotspots, floorPlans, propertyMeta } from '../data/residencesData';
import { Check, ArrowRight, ShieldCheck, Sparkles, SlidersHorizontal, Bed, Bath, Maximize2 } from 'lucide-react';

export default function ResidencesPage({ onOpenBooking }) {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const comparisonTiers = [
    {
      name: 'The Sky Penthouse Crown',
      levels: 'Levels 44 – 48',
      area: '8,450 sq ft (785 m²)',
      beds: '5 Bedrooms + Staff',
      ceiling: '7.0m Double Height',
      terrace: '18m Private Sky Pool & Deck',
      aspect: '360° Omnidirectional',
      price: 'AED 52,000,000',
      availability: 'Only 2 Available',
    },
    {
      name: 'The Horizon Panorama Suite',
      levels: 'Levels 28 – 42',
      area: '3,940 sq ft (366 m²)',
      beds: '3 En-Suite Bedrooms',
      ceiling: '3.6m Clear Height',
      terrace: '3.4m Cantilevered Wrap Loggia',
      aspect: 'West Sunset & Marina Harbor',
      price: 'AED 21,500,000',
      availability: '4 Available',
    },
    {
      name: 'Signature Waterfront Residence',
      levels: 'Levels 05 – 16',
      area: '2,280 sq ft (212 m²)',
      beds: '2 En-Suite Bedrooms',
      ceiling: '3.4m Clear Height',
      terrace: 'Expansive Sea Loggia',
      aspect: 'Direct Yacht Marina',
      price: 'AED 12,200,000',
      availability: '6 Available',
    },
    {
      name: 'The Atelier Executive Suite',
      levels: 'Levels 06 – 15',
      area: '1,420 sq ft (132 m²)',
      beds: '1 Bedroom + Powder',
      ceiling: '3.4m Clear Height',
      terrace: 'Deep Sunset Terrace',
      aspect: 'North-West Marina',
      price: 'AED 8,900,000',
      availability: '3 Available',
    },
  ];

  return (
    <div className="bg-graphite-950 text-sand-50 pt-28">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 border-b border-white/10">
        <div className="flex items-center space-x-2 text-[10px] uppercase font-mono tracking-[0.3em] text-bronze mb-3">
          <Sparkles className="w-3.5 h-3.5 text-bronze" />
          <span>ESTATE PORTFOLIO</span>
        </div>
        <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-light text-sand-50 tracking-tight">
          THE RESIDENCES <br />
          <span className="italic font-normal text-gold-gradient">COLLECTION</span>
        </h1>
        <p className="max-w-2xl text-sand-400 text-sm md:text-base font-light mt-4 leading-relaxed">
          Ninety-two bespoke homes elevated above the Persian Gulf. Each residence is sculpted with expansive cantilevered balconies, triple-glazed acoustic walls, and private elevator vestibules.
        </p>
      </div>

      {/* 3D Interactive Building Explorer */}
      <Building3DExplorer onOpenBooking={onOpenBooking} />

      {/* In-Depth Tier Breakdown Cards */}
      <section className="py-24 max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-12 border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-end justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-bronze">
              ARCHITECTURAL CLASSIFICATION
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-light text-sand-50 mt-1">
              Curated Residential Tiers
            </h2>
          </div>
          <p className="text-xs text-sand-400 font-mono mt-2 md:mt-0">
            TOTAL 48 LEVELS • 92 SANCTUARIES
          </p>
        </div>

        <div className="space-y-12">
          {hotspots.map((spot, idx) => (
            <div
              key={spot.id}
              className="p-8 md:p-12 rounded-3xl bg-white/[0.03] border border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center hover:border-bronze/40 transition-colors shadow-2xl"
            >
              <div className="lg:col-span-5 relative h-72 md:h-96 rounded-2xl overflow-hidden border border-white/10">
                <img
                  src={spot.image}
                  alt={spot.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider text-bronze border border-white/10">
                  {spot.level}
                </div>
              </div>

              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase font-mono tracking-widest text-bronze">
                      {spot.elevation}
                    </span>
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/10 text-sand-200">
                      {spot.badge}
                    </span>
                  </div>

                  <h3 className="font-serif text-3xl md:text-4xl font-light text-sand-50 mt-2">
                    {spot.title}
                  </h3>
                  <p className="text-sm font-light text-sand-400 mt-1 font-serif italic">
                    {spot.subtitle}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-6">
                    {spot.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start space-x-2 text-xs text-sand-300 font-light">
                        <Check className="w-3.5 h-3.5 text-bronze shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-sand-500">
                      Starting Investment
                    </span>
                    <p className="font-mono text-xl font-semibold text-bronze-light">
                      {spot.price}
                    </p>
                  </div>

                  <button
                    onClick={() => onOpenBooking(spot.title)}
                    className="px-8 py-3.5 rounded-full bg-bronze hover:bg-bronze-light text-graphite-950 font-semibold text-xs uppercase tracking-[0.2em] transition-all shadow-lg flex items-center justify-center space-x-2"
                    data-cursor="pointer"
                  >
                    <span>Request Tier Dossier</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Comprehensive Architectural Comparison Matrix */}
      <section className="py-24 bg-graphite-900/60 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-xl mb-12">
            <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-bronze">
              CROSS-COLLECTION COMPARISON
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-light text-sand-50 mt-2">
              Estate Specifications Matrix
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-white/20 text-[10px] uppercase font-mono tracking-widest text-sand-400">
                  <th className="py-4 px-4">Residence Collection</th>
                  <th className="py-4 px-4">Level Plate</th>
                  <th className="py-4 px-4">Internal Area</th>
                  <th className="py-4 px-4">Bedrooms</th>
                  <th className="py-4 px-4">Ceiling Clearance</th>
                  <th className="py-4 px-4">Terrace Feature</th>
                  <th className="py-4 px-4">Price</th>
                  <th className="py-4 px-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 font-light text-sand-200">
                {comparisonTiers.map((tier, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.04] transition-colors">
                    <td className="py-5 px-4 font-serif text-base text-sand-50 font-normal">
                      {tier.name}
                    </td>
                    <td className="py-5 px-4 font-mono text-sand-300">{tier.levels}</td>
                    <td className="py-5 px-4 font-mono text-sand-300">{tier.area}</td>
                    <td className="py-5 px-4">{tier.beds}</td>
                    <td className="py-5 px-4 font-mono">{tier.ceiling}</td>
                    <td className="py-5 px-4">{tier.terrace}</td>
                    <td className="py-5 px-4 font-mono font-semibold text-bronze-light">{tier.price}</td>
                    <td className="py-5 px-4">
                      <button
                        onClick={() => onOpenBooking(tier.name)}
                        className="px-3.5 py-1.5 rounded-full border border-bronze/60 text-bronze-light hover:bg-bronze hover:text-graphite-950 text-[10px] uppercase font-mono tracking-wider transition-all"
                      >
                        Inquire
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

