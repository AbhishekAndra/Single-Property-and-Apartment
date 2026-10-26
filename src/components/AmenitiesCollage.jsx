import React, { useState } from 'react';
import { amenitiesCollageData, architecturalHighlights } from '../data/amenitiesData';
import { Sparkles, ArrowRight, ShieldCheck, Award, Maximize2 } from 'lucide-react';

export default function AmenitiesCollage({ onOpenBooking }) {
  const [activeModalImage, setActiveModalImage] = useState(null);

  return (
    <section
      id="amenities"
      className="relative w-full min-h-screen bg-sand-100 text-graphite-900 py-24 md:py-36 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Kinetic Header inspired by video frame 14 ("Room to move" & "Time to exhale") */}
        <div className="relative mb-20">
          <div className="flex flex-col md:flex-row items-baseline justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.35em] text-bronze-dark font-mono mb-2">
                THE LIFESTYLE COMPENDIUM
              </p>
              <h2 className="font-serif text-5xl sm:text-7xl md:text-8xl font-light tracking-tight text-graphite-950 leading-[0.95]">
                Room to <span className="italic font-normal">move.</span>
              </h2>
            </div>

            <div className="mt-4 md:mt-0 text-left md:text-right">
              <h2 className="font-serif text-5xl sm:text-7xl md:text-8xl font-light tracking-tight text-graphite-400 leading-[0.95]">
                Time to <span className="italic font-normal text-graphite-950">exhale.</span>
              </h2>
            </div>
          </div>
          <div className="w-full h-[1px] bg-sand-300 mt-8" />
        </div>

        {/* Staggered Kinetic Amenities Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-24">
          {/* Item 1: Large Feature - Cantilevered 50m Infinity Pool (Left, 7 columns) */}
          <div
            onClick={() => setActiveModalImage(amenitiesCollageData[0])}
            className="md:col-span-7 group relative h-[480px] md:h-[620px] rounded-3xl overflow-hidden border border-sand-300 cursor-pointer shadow-lg transform transition-transform duration-700 hover:-translate-y-1.5"
            data-cursor="explore"
            data-cursor-text="VIEW"
          >
            <img
              src={amenitiesCollageData[0].image}
              alt={amenitiesCollageData[0].title}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-graphite-950/85 via-graphite-950/20 to-transparent" />
            
            <div className="absolute top-6 left-6">
              <span className="px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-graphite-950 text-[10px] uppercase font-mono tracking-widest font-semibold">
                {amenitiesCollageData[0].badge}
              </span>
            </div>

            <div className="absolute bottom-8 left-8 right-8">
              <p className="text-[10px] uppercase font-mono tracking-widest text-bronze-light mb-1">
                {amenitiesCollageData[0].category}
              </p>
              <h3 className="font-serif text-3xl md:text-4xl text-sand-50 font-light">
                {amenitiesCollageData[0].title}
              </h3>
              <p className="text-sand-300 text-sm mt-2 font-light max-w-lg leading-relaxed">
                {amenitiesCollageData[0].subtitle}
              </p>
            </div>
          </div>

          {/* Right Column (5 columns): Stacked Thermal Spa & Wine Cellar */}
          <div className="md:col-span-5 flex flex-col space-y-8">
            {/* Item 2: Private Thermal Suite */}
            <div
              onClick={() => setActiveModalImage(amenitiesCollageData[1])}
              className="group relative h-[290px] rounded-3xl overflow-hidden border border-sand-300 cursor-pointer shadow-md transform transition-transform duration-700 hover:-translate-y-1"
              data-cursor="explore"
              data-cursor-text="VIEW"
            >
              <img
                src={amenitiesCollageData[1].image}
                alt={amenitiesCollageData[1].title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-graphite-950/80 via-transparent to-transparent" />
              <div className="absolute top-5 left-5">
                <span className="px-3 py-1 rounded-full bg-white/90 text-graphite-950 text-[10px] uppercase font-mono tracking-wider font-semibold">
                  {amenitiesCollageData[1].badge}
                </span>
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <h4 className="font-serif text-2xl text-sand-50 font-light">
                  {amenitiesCollageData[1].title}
                </h4>
                <p className="text-xs text-sand-300 mt-1 font-light line-clamp-2">
                  {amenitiesCollageData[1].subtitle}
                </p>
              </div>
            </div>

            {/* Item 3: Private Sommelier Cellar & Club */}
            <div
              onClick={() => setActiveModalImage(amenitiesCollageData[2])}
              className="group relative h-[290px] rounded-3xl overflow-hidden border border-sand-300 cursor-pointer shadow-md transform transition-transform duration-700 hover:-translate-y-1"
              data-cursor="explore"
              data-cursor-text="VIEW"
            >
              <img
                src={amenitiesCollageData[2].image}
                alt={amenitiesCollageData[2].title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-graphite-950/80 via-transparent to-transparent" />
              <div className="absolute top-5 left-5">
                <span className="px-3 py-1 rounded-full bg-white/90 text-graphite-950 text-[10px] uppercase font-mono tracking-wider font-semibold">
                  {amenitiesCollageData[2].badge}
                </span>
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <h4 className="font-serif text-2xl text-sand-50 font-light">
                  {amenitiesCollageData[2].title}
                </h4>
                <p className="text-xs text-sand-300 mt-1 font-light line-clamp-2">
                  {amenitiesCollageData[2].subtitle}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Lower Row: Nautical Access & Bespoke Butler Service */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch mb-24">
          {/* Item 4: Private Marina Berths */}
          <div
            onClick={() => setActiveModalImage(amenitiesCollageData[3])}
            className="md:col-span-6 group relative h-[380px] rounded-3xl overflow-hidden border border-sand-300 cursor-pointer shadow-md"
            data-cursor="explore"
            data-cursor-text="VIEW"
          >
            <img
              src={amenitiesCollageData[3].image}
              alt={amenitiesCollageData[3].title}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-graphite-950/85 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-[10px] uppercase font-mono tracking-widest text-bronze-light">
                {amenitiesCollageData[3].category}
              </span>
              <h4 className="font-serif text-3xl text-sand-50 font-light mt-1">
                {amenitiesCollageData[3].title}
              </h4>
              <p className="text-xs text-sand-300 mt-1 font-light">
                {amenitiesCollageData[3].subtitle}
              </p>
            </div>
          </div>

          {/* Item 5: White Glove Butler & Concierge */}
          <div
            onClick={() => setActiveModalImage(amenitiesCollageData[4])}
            className="md:col-span-6 group relative h-[380px] rounded-3xl overflow-hidden border border-sand-300 cursor-pointer shadow-md"
            data-cursor="explore"
            data-cursor-text="VIEW"
          >
            <img
              src={amenitiesCollageData[4].image}
              alt={amenitiesCollageData[4].title}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-graphite-950/85 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-[10px] uppercase font-mono tracking-widest text-bronze-light">
                {amenitiesCollageData[4].category}
              </span>
              <h4 className="font-serif text-3xl text-sand-50 font-light mt-1">
                {amenitiesCollageData[4].title}
              </h4>
              <p className="text-xs text-sand-300 mt-1 font-light">
                {amenitiesCollageData[4].subtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Section: Architectural Engineering Highlights */}
        <div id="architecture" className="bg-sand-200/60 rounded-3xl p-8 md:p-14 border border-sand-300">
          <div className="max-w-2xl mb-12">
            <p className="text-[10px] uppercase tracking-[0.35em] text-bronze-dark font-mono mb-2">
              STRUCTURAL BRILLIANCE
            </p>
            <h3 className="font-serif text-3xl md:text-4xl font-light text-graphite-950">
              Architectural integrity engineered for permanence.
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {architecturalHighlights.map((item) => (
              <div key={item.number} className="flex flex-col justify-between border-t border-sand-400/60 pt-6">
                <div>
                  <span className="font-mono text-2xl text-bronze-dark font-light">{item.number}</span>
                  <h4 className="font-serif text-xl font-light text-graphite-950 mt-2">{item.label}</h4>
                  <p className="text-xs text-graphite-600 font-light mt-2 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-sand-300 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3 text-xs text-graphite-700">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>Full 10-Year Master Builder Guarantee & Strata Management by St. Regis</span>
            </div>

            <button
              onClick={() => onOpenBooking('Architectural Advisory')}
              className="px-6 py-3 rounded-full bg-graphite-950 text-sand-50 text-xs uppercase tracking-[0.2em] font-medium hover:bg-black transition-colors"
              data-cursor="pointer"
            >
              Consult Architectural Team
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeModalImage && (
        <div
          onClick={() => setActiveModalImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-6 cursor-zoom-out"
        >
          <div className="max-w-4xl max-h-[85vh] bg-graphite-950 rounded-3xl overflow-hidden border border-white/20 shadow-2xl flex flex-col">
            <img
              src={activeModalImage.image}
              alt={activeModalImage.title}
              className="w-full max-h-[60vh] object-cover"
            />
            <div className="p-8 text-sand-50 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-bronze uppercase tracking-widest">{activeModalImage.category}</span>
                <h3 className="font-serif text-3xl font-light mt-1">{activeModalImage.title}</h3>
                <p className="text-xs text-sand-300 mt-1 max-w-xl">{activeModalImage.subtitle}</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveModalImage(null);
                  onOpenBooking(activeModalImage.title);
                }}
                className="px-6 py-3 rounded-full bg-bronze text-graphite-950 text-xs font-semibold uppercase tracking-wider hover:bg-bronze-light transition-colors"
              >
                Inquire
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

