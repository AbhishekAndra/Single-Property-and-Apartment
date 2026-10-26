import React from 'react';
import AmenitiesCollage from '../components/AmenitiesCollage';
import { Sparkles, Shield, Anchor, Coffee, Utensils, Plane, ArrowRight } from 'lucide-react';

export default function AmenitiesPage({ onOpenBooking }) {
  const whiteGloveServices = [
    {
      icon: <Utensils className="w-5 h-5 text-bronze-dark" />,
      title: "In-Residence Private Chef",
      desc: "Curated multi-course dining experiences prepared directly in your custom Gaggenau show kitchen by guest Michelin-star chefs."
    },
    {
      icon: <Anchor className="w-5 h-5 text-bronze-dark" />,
      title: "Private Yacht Valet",
      desc: "Direct private harbor berthing with full maintenance, fueling, and crew boarding coordination for yachts up to 45 meters."
    },
    {
      icon: <Plane className="w-5 h-5 text-bronze-dark" />,
      title: "Helicopter Transfer Service",
      desc: "Direct access to the Level 48 rooftop helipad with automated VIP private customs and luxury helicopter charters."
    },
    {
      icon: <Coffee className="w-5 h-5 text-bronze-dark" />,
      title: "Dedicated Sommelier & Cellar",
      desc: "Climate-controlled private vaults for personal wine collections with private sommelier tastings and rare vintage acquisitions."
    }
  ];

  return (
    <div className="bg-sand-100 text-graphite-900 pt-28">
      {/* Amenities Page Hero */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 border-b border-sand-300">
        <div className="flex items-center space-x-2 text-[10px] uppercase font-mono tracking-[0.3em] text-bronze-dark mb-3">
          <Sparkles className="w-3.5 h-3.5 text-bronze-dark" />
          <span>CURATED WELLNESS & LEISURE COMPENDIUM</span>
        </div>
        <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-light text-graphite-950 tracking-tight leading-[0.95]">
          A LIFE ELEVATED <br />
          <span className="italic font-normal">WITHOUT COMPROMISE</span>
        </h1>
        <p className="max-w-2xl text-graphite-700 text-sm md:text-base font-light mt-4 leading-relaxed">
          Over 35,000 square feet of private resident amenities orchestrated with St. Regis standard hospitality. From suspended sky pools to restorative thermal grottos.
        </p>
      </div>

      {/* Main Kinetic Amenities Collage Component ("Room to move." / "Time to exhale.") */}
      <AmenitiesCollage onOpenBooking={onOpenBooking} />

      {/* Bespoke White-Glove Concierge Services */}
      <section className="py-24 bg-sand-200/50 border-t border-sand-300">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-2xl mb-16">
            <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-bronze-dark">
              WHITE-GLOVE HOSPITALITY
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-graphite-950 mt-2">
              At Your Service, 24 Hours a Day
            </h2>
            <p className="text-graphite-600 text-sm md:text-base font-light mt-3">
              Unrivaled estate management and personalized lifestyle concierge dedicated exclusively to the ninety-two resident families.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {whiteGloveServices.map((service, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-8 border border-sand-300 shadow-sm flex flex-col justify-between hover:shadow-xl transition-all duration-300"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-sand-100 border border-sand-200 flex items-center justify-center mb-6">
                    {service.icon}
                  </div>
                  <h3 className="font-serif text-2xl font-light text-graphite-950">
                    {service.title}
                  </h3>
                  <p className="text-xs text-graphite-600 font-light mt-3 leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <button
              onClick={() => onOpenBooking('Amenities Tour')}
              className="px-8 py-4 rounded-full bg-graphite-950 hover:bg-black text-sand-50 text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-lg"
              data-cursor="pointer"
            >
              Arrange Private Amenity Viewing
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

