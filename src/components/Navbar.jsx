import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Volume2, VolumeX, Menu, X, Calendar, ArrowUpRight } from 'lucide-react';
import { propertyMeta } from '../data/residencesData';

export default function Navbar({ onOpenBooking, audioPlaying, onToggleAudio }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Overview', to: '/' },
    { label: 'Residences', to: '/residences' },
    { label: 'Interiors', to: '/interiors' },
    { label: 'Floor Plans', to: '/floor-plans' },
    { label: 'Amenities', to: '/amenities' },
    { label: 'Architecture', to: '/architecture' },
    { label: 'Contact', to: '/contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'py-3.5 bg-graphite-950/85 backdrop-blur-xl border-b border-white/10 shadow-2xl'
            : 'py-6 bg-gradient-to-b from-graphite-950/70 via-graphite-950/25 to-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
          {/* Brand Identity */}
          <Link
            to="/"
            className="group flex flex-col tracking-widest text-left"
            data-cursor="pointer"
          >
            <span className="font-serif text-xl md:text-2xl font-light tracking-[0.25em] text-sand-50 transition-colors group-hover:text-bronze-light">
              {propertyMeta.name}
            </span>
            <span className="text-[9px] uppercase tracking-[0.35em] text-bronze font-medium -mt-1 opacity-90">
              DUBAI WATERFRONT
            </span>
          </Link>

          {/* Desktop Sub-Page Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                className={({ isActive }) =>
                  `relative text-[11px] uppercase tracking-[0.25em] transition-all duration-300 py-1 ${
                    isActive
                      ? 'text-bronze font-semibold after:w-full'
                      : 'text-sand-300 hover:text-white after:w-0'
                  } after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[1px] after:bg-bronze hover:after:w-full after:transition-all after:duration-300`
                }
                data-cursor="pointer"
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Action CTAs & Sensory Controls */}
          <div className="hidden sm:flex items-center space-x-4">
            {/* Ambient Sound Toggle */}
            <button
              onClick={onToggleAudio}
              className="p-2.5 rounded-full border border-white/15 text-sand-300 hover:text-white hover:border-bronze transition-all duration-300 backdrop-blur-sm group"
              title={audioPlaying ? 'Mute ambient soundscape' : 'Enable ambient soundscape'}
              data-cursor="pointer"
            >
              {audioPlaying ? (
                <div className="flex items-center space-x-1.5 px-1">
                  <Volume2 className="w-3.5 h-3.5 text-bronze animate-pulse" />
                  <span className="text-[9px] uppercase tracking-wider text-bronze hidden md:inline">Ambient On</span>
                </div>
              ) : (
                <div className="flex items-center space-x-1.5 px-1">
                  <VolumeX className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                  <span className="text-[9px] uppercase tracking-wider opacity-60 hidden md:inline">Sound</span>
                </div>
              )}
            </button>

            {/* Quick Action Schedule Tour CTA */}
            <button
              onClick={() => onOpenBooking()}
              className="relative group overflow-hidden px-5 py-2.5 rounded-full border border-bronze/60 bg-bronze/10 hover:bg-bronze text-white text-[11px] uppercase tracking-[0.2em] font-medium transition-all duration-500 shadow-[0_0_15px_rgba(197,168,128,0.15)] hover:shadow-[0_0_25px_rgba(197,168,128,0.4)]"
              data-cursor="pointer"
            >
              <span className="relative z-10 flex items-center space-x-2">
                <Calendar className="w-3.5 h-3.5 text-bronze-light group-hover:text-graphite-950 transition-colors" />
                <span className="group-hover:text-graphite-950 transition-colors font-semibold">Schedule Tour</span>
                <ArrowUpRight className="w-3 h-3 text-bronze-light group-hover:text-graphite-950 transition-colors" />
              </span>
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex sm:hidden items-center space-x-2">
            <button
              onClick={() => onOpenBooking()}
              className="px-3 py-1.5 rounded-full border border-bronze bg-bronze/20 text-bronze-light text-[10px] uppercase tracking-wider"
            >
              Tour
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-sand-100 hover:text-bronze"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 z-40 bg-graphite-950/95 backdrop-blur-2xl transition-all duration-500 lg:hidden flex flex-col justify-between p-8 pt-28 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-4'
        }`}
      >
        <div className="flex flex-col space-y-5">
          <p className="text-[10px] tracking-[0.3em] uppercase text-bronze font-semibold">Directory</p>
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `font-serif text-3xl font-light transition-colors ${
                  isActive ? 'text-bronze font-normal' : 'text-sand-100 hover:text-bronze'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-widest text-sand-400">Audio Experience</span>
            <button
              onClick={onToggleAudio}
              className="px-3 py-1.5 rounded-full border border-white/20 text-xs text-sand-200"
            >
              {audioPlaying ? 'Active' : 'Muted'}
            </button>
          </div>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenBooking();
            }}
            className="w-full py-4 rounded-full bg-bronze text-graphite-950 uppercase tracking-[0.2em] font-semibold text-xs shadow-lg"
          >
            Request Private VIP Viewing
          </button>
        </div>
      </div>
    </>
  );
}
