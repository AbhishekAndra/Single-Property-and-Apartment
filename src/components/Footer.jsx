import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowUp, Mail, Phone, MapPin } from 'lucide-react';
import { propertyMeta } from '../data/residencesData';

export default function Footer({ onOpenBooking }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-graphite-950 text-sand-50 pt-24 pb-12 border-t border-white/10 overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-bronze/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Upper Big Architectural Headline */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-16 mb-16">
          <div className="max-w-xl">
            <span className="text-[10px] uppercase font-mono tracking-[0.35em] text-bronze">
              THE PINNACLE OF WATERFRONT LIVING
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl font-light text-sand-50 mt-3 leading-tight">
              An enduring legacy sculpted in stone & sky.
            </h2>
          </div>

          <div className="mt-8 md:mt-0 flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => onOpenBooking()}
              className="px-8 py-4 rounded-full bg-bronze hover:bg-bronze-light text-graphite-950 font-semibold text-xs uppercase tracking-[0.25em] transition-all shadow-xl"
              data-cursor="pointer"
            >
              Inquire Privately
            </button>
            <button
              onClick={scrollToTop}
              className="p-4 rounded-full border border-white/20 hover:border-white text-sand-300 hover:text-white transition-colors w-fit flex items-center justify-center"
              data-cursor="pointer"
              title="Return to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 4-Column Directory Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Col 1: Identity & Location */}
          <div>
            <Link to="/" className="inline-block">
              <h3 className="font-serif text-2xl font-light tracking-widest text-sand-50 hover:text-bronze transition-colors">
                {propertyMeta.name}
              </h3>
            </Link>
            <p className="text-xs uppercase font-mono tracking-widest text-bronze mt-1">
              Jumeirah Bay Island, Dubai
            </p>
            <p className="text-xs text-sand-400 font-light mt-4 leading-relaxed">
              Coordinates: {propertyMeta.coordinates} <br />
              Direct Yacht Slip #14-22 <br />
              Private Helipad Access Level 48
            </p>
          </div>

          {/* Col 2: Residences & Sub-Pages */}
          <div>
            <h4 className="text-[10px] uppercase font-mono tracking-[0.25em] text-sand-400 mb-4">
              Explore Sub-Pages
            </h4>
            <ul className="space-y-2.5 text-xs text-sand-300 font-light">
              <li><Link to="/residences" className="hover:text-bronze transition-colors">3D Building & Residences</Link></li>
              <li><Link to="/interiors" className="hover:text-bronze transition-colors">Interiors Walkthrough</Link></li>
              <li><Link to="/floor-plans" className="hover:text-bronze transition-colors">Floor Plans & Specs</Link></li>
              <li><Link to="/amenities" className="hover:text-bronze transition-colors">Amenities & Lifestyle</Link></li>
              <li><Link to="/architecture" className="hover:text-bronze transition-colors">Architecture & Engineering</Link></li>
              <li><Link to="/contact" className="hover:text-bronze transition-colors">VIP Private Viewing</Link></li>
            </ul>
          </div>

          {/* Col 3: Collaboration Partners */}
          <div>
            <h4 className="text-[10px] uppercase font-mono tracking-[0.25em] text-sand-400 mb-4">
              Collaborative Masters
            </h4>
            <ul className="space-y-2 text-xs text-sand-300 font-light">
              <li>Master Architecture: <span className="text-sand-100">Foster & Partners</span></li>
              <li>Interior Design: <span className="text-sand-100">Studio Liaigre</span></li>
              <li>Landscape Architecture: <span className="text-sand-100">Wirtz International</span></li>
              <li>Culinary Systems: <span className="text-sand-100">Boffi & Gaggenau</span></li>
              <li>Hospitality Services: <span className="text-sand-100">St. Regis Residences</span></li>
            </ul>
          </div>

          {/* Col 4: Private Sales Gallery */}
          <div>
            <h4 className="text-[10px] uppercase font-mono tracking-[0.25em] text-sand-400 mb-4">
              Private Sales Gallery
            </h4>
            <div className="space-y-3 text-xs text-sand-300 font-light">
              <p className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-bronze shrink-0" />
                <span>+971 4 800 SOLAIRE (76524)</span>
              </p>
              <p className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-bronze shrink-0" />
                <span>concierge@thesolaire-dubai.ae</span>
              </p>
              <p className="text-[11px] text-sand-400 pt-2">
                Hours: Monday – Sunday by prior invitation only.
              </p>
            </div>
          </div>
        </div>

        {/* Regulatory Disclosure & Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-[11px] text-sand-500 font-light gap-4">
          <p>© {new Date().getFullYear()} The Solaire Residences LLC. All architectural designs and trademarks reserved.</p>
          <div className="flex items-center space-x-6 text-[10px] uppercase font-mono tracking-wider">
            <span className="hover:text-sand-300 cursor-pointer">DREC Escrow Account #98234-A</span>
            <span className="hover:text-sand-300 cursor-pointer">Privacy & GDPR</span>
            <span className="hover:text-sand-300 cursor-pointer">Terms of Living</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
