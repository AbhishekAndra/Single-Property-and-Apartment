import React, { useState } from 'react';
import { Sparkles, Phone, Mail, MapPin, Calendar, Clock, MessageSquare, Check, Shield, Compass } from 'lucide-react';
import { propertyMeta } from '../data/residencesData';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    title: 'Mr.',
    fullName: '',
    email: '',
    phone: '',
    tier: 'The Sky Penthouse Crown',
    viewingDate: '2027-02-15',
    timeSlot: '17:30 (Golden Hour Sunset)',
    notes: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const ref = `SLR-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingRef(ref);
    setIsSubmitted(true);
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello, I would like to arrange a Private VIP Viewing for ${formData.tier} at ${propertyMeta.name}, Dubai. My name is ${formData.title} ${formData.fullName || 'VIP Guest'}.`
    );
    window.open(`https://wa.me/971501234567?text=${text}`, '_blank');
  };

  return (
    <div className="bg-sand-100 text-graphite-900 pt-28">
      {/* Contact Page Hero */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 border-b border-sand-300">
        <div className="flex items-center space-x-2 text-[10px] uppercase font-mono tracking-[0.3em] text-bronze-dark mb-3">
          <Sparkles className="w-3.5 h-3.5 text-bronze-dark" />
          <span>BY INVITATION ONLY</span>
        </div>
        <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-light text-graphite-950 tracking-tight leading-[0.95]">
          PRIVATE SALES <br />
          <span className="italic font-normal">GALLERY</span>
        </h1>
        <p className="max-w-2xl text-graphite-700 text-sm md:text-base font-light mt-4 leading-relaxed">
          The Solaire Private Sales Gallery is located on Jumeirah Bay Island. We welcome prospective residents and family office representatives for confidential, one-on-one architectural presentations.
        </p>
      </div>

      {/* Main Grid: Form & Location Details */}
      <section className="py-20 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: VIP Appointment Booking Form */}
          <div className="lg:col-span-7 bg-graphite-950 text-sand-50 p-8 md:p-12 rounded-3xl border border-bronze/30 shadow-2xl">
            <div className="mb-8">
              <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-bronze">
                RESERVATION PORTAL
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-light text-sand-50 mt-1">
                Schedule Private Viewing
              </h2>
              <p className="text-xs text-sand-400 mt-2 font-light">
                Please complete the form below. Our Senior Client Director will confirm your reservation within 2 business hours.
              </p>
            </div>

            {isSubmitted ? (
              <div className="text-center py-12 space-y-6">
                <div className="w-16 h-16 rounded-full bg-bronze/20 border border-bronze flex items-center justify-center mx-auto text-bronze">
                  <Check className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-bronze">
                    Confirmed
                  </span>
                  <h3 className="font-serif text-3xl font-light mt-2">
                    Invitation Prepared
                  </h3>
                  <p className="text-sand-300 text-sm max-w-md mx-auto mt-2 font-light">
                    Your appointment has been registered under reference code{' '}
                    <strong className="text-bronze-light font-mono">{bookingRef}</strong>.
                  </p>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
                  <button
                    onClick={openWhatsApp}
                    className="px-6 py-3.5 rounded-full bg-[#25D366] text-black font-semibold text-xs uppercase tracking-wider flex items-center justify-center space-x-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp Concierge</span>
                  </button>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-3.5 rounded-full border border-white/20 text-sand-200 text-xs uppercase tracking-wider"
                  >
                    Book Another Slot
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div className="sm:col-span-1">
                    <label className="block text-[10px] uppercase font-mono tracking-wider text-sand-400 mb-1.5">
                      Salutation
                    </label>
                    <select
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-3 py-3 rounded-xl bg-white/5 border border-white/10 text-sand-100 text-xs focus:outline-none focus:border-bronze"
                    >
                      <option value="Mr." className="bg-graphite-900">Mr.</option>
                      <option value="Ms." className="bg-graphite-900">Ms.</option>
                      <option value="Dr." className="bg-graphite-900">Dr.</option>
                      <option value="H.E." className="bg-graphite-900">H.E. (Excellency)</option>
                      <option value="Sheikh" className="bg-graphite-900">Sheikh / Sheikha</option>
                    </select>
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-[10px] uppercase font-mono tracking-wider text-sand-400 mb-1.5">
                      Full Legal Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Lord Alexander Sterling"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sand-100 text-xs placeholder:text-sand-500 focus:outline-none focus:border-bronze"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase font-mono tracking-wider text-sand-400 mb-1.5">
                      Direct Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alexander@familyoffice.ae"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sand-100 text-xs placeholder:text-sand-500 focus:outline-none focus:border-bronze"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-mono tracking-wider text-sand-400 mb-1.5">
                      International Telephone
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+971 50 000 0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sand-100 text-xs placeholder:text-sand-500 focus:outline-none focus:border-bronze"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-mono tracking-wider text-sand-400 mb-1.5">
                    Residence Tier of Interest
                  </label>
                  <select
                    value={formData.tier}
                    onChange={(e) => setFormData({ ...formData, tier: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sand-100 text-xs focus:outline-none focus:border-bronze"
                  >
                    <option value="The Sky Penthouse Crown" className="bg-graphite-900">
                      The Sky Penthouse Crown (Duplex 8,450 sq ft - AED 52M)
                    </option>
                    <option value="The Horizon Residences" className="bg-graphite-900">
                      The Horizon Residences (3-Bed 3,940 sq ft - AED 21.5M)
                    </option>
                    <option value="Signature Waterfront Suites" className="bg-graphite-900">
                      Signature Waterfront Suites (2-Bed 2,280 sq ft - AED 12.2M)
                    </option>
                    <option value="The Atelier Suite" className="bg-graphite-900">
                      The Atelier Suite (1-Bed 1,420 sq ft - AED 8.9M)
                    </option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase font-mono tracking-wider text-sand-400 mb-1.5">
                      Viewing Date
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.viewingDate}
                      onChange={(e) => setFormData({ ...formData, viewingDate: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sand-100 text-xs focus:outline-none focus:border-bronze"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-mono tracking-wider text-sand-400 mb-1.5">
                      Viewing Window
                    </label>
                    <select
                      value={formData.timeSlot}
                      onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sand-100 text-xs focus:outline-none focus:border-bronze"
                    >
                      <option value="10:00 (Morning Light)" className="bg-graphite-900">
                        10:00 AM (Morning Light & Harbor View)
                      </option>
                      <option value="14:00 (Midday Architectural Tour)" className="bg-graphite-900">
                        02:00 PM (Midday Architectural Tour)
                      </option>
                      <option value="17:30 (Golden Hour Sunset)" className="bg-graphite-900">
                        05:30 PM (Golden Hour Sunset Reception)
                      </option>
                      <option value="20:00 (Twilight Starlight Champagne)" className="bg-graphite-900">
                        08:00 PM (Twilight Starlight Champagne)
                      </option>
                    </select>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-bronze shrink-0" />
                    <div>
                      <p className="text-xs font-medium text-sand-100">Rolls-Royce Chauffeur Courtesy</p>
                      <p className="text-[10px] text-sand-400">Door-to-door transfer from any address in Dubai</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="rounded border-white/20 text-bronze focus:ring-bronze w-4 h-4 bg-graphite-900"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-4 rounded-full bg-bronze hover:bg-bronze-light text-graphite-950 font-semibold text-xs uppercase tracking-[0.2em] shadow-lg transition-all"
                    data-cursor="pointer"
                  >
                    Confirm Private Reservation
                  </button>
                  <button
                    type="button"
                    onClick={openWhatsApp}
                    className="px-6 py-4 rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 font-semibold text-xs uppercase tracking-[0.15em] flex items-center justify-center space-x-2"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                    <span>WhatsApp</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Gallery Address & Contact Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white p-8 md:p-10 rounded-3xl border border-sand-300 shadow-sm space-y-6">
              <span className="text-[10px] uppercase font-mono tracking-widest text-bronze-dark">
                SALES GALLERY DETAILS
              </span>
              <h3 className="font-serif text-3xl font-light text-graphite-950">
                The Solaire Pavilion
              </h3>

              <div className="space-y-4 text-xs text-graphite-700 font-light">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-bronze-dark shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-graphite-900">Jumeirah Bay Island Pavilion</p>
                    <p>Waterfront Promenade Suite #01, Dubai, UAE</p>
                    <p className="font-mono text-[11px] text-bronze-dark mt-1">GPS: {propertyMeta.coordinates}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-bronze-dark shrink-0" />
                  <p className="font-mono text-graphite-900 font-medium">+971 4 800 SOLAIRE (76524)</p>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-bronze-dark shrink-0" />
                  <p className="font-mono text-graphite-900 font-medium">concierge@thesolaire-dubai.ae</p>
                </div>
              </div>

              <div className="pt-6 border-t border-sand-200">
                <p className="text-[10px] uppercase font-mono text-graphite-500 tracking-wider">
                  Private Gallery Visiting Hours
                </p>
                <p className="text-xs text-graphite-800 mt-1">
                  Monday – Sunday: 09:00 to 21:00 <br />
                  Private sunset & dinner presentations by prior arrangement.
                </p>
              </div>
            </div>

            {/* Map Simulation Box */}
            <div className="relative h-64 rounded-3xl overflow-hidden border border-sand-300 shadow-sm bg-sand-200 flex items-center justify-center">
              <div
                className="absolute inset-0 bg-cover bg-center filter saturate-50 contrast-125 opacity-70"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80')`,
                }}
              />
              <div className="relative z-10 bg-graphite-950/85 backdrop-blur-md px-6 py-3 rounded-full border border-bronze/40 text-sand-50 text-xs font-mono flex items-center space-x-3 shadow-2xl">
                <Compass className="w-4 h-4 text-bronze animate-spin" style={{ animationDuration: '10s' }} />
                <span>Jumeirah Bay Archipelago Slipway #14</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

