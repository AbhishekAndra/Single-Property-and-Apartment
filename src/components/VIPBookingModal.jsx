import React, { useState } from 'react';
import { X, Calendar, Clock, MessageSquare, Check, Sparkles, Phone, Mail, User, Shield } from 'lucide-react';
import { propertyMeta } from '../data/residencesData';

export default function VIPBookingModal({ isOpen, onClose, preselectedTier }) {
  const [formData, setFormData] = useState({
    title: 'Mr.',
    fullName: '',
    email: '',
    phone: '',
    tier: preselectedTier || 'The Sky Penthouse Crown',
    viewingDate: '2027-02-15',
    timeSlot: '17:30 (Golden Hour Sunset)',
    transportation: 'rolls-royce',
    notes: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  if (!isOpen) return null;

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-graphite-950/85 backdrop-blur-xl transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-[#141312] border border-bronze/30 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden z-10 text-sand-50 animate-in fade-in zoom-in-95 duration-300">
        {/* Top Gold Accent Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-bronze-dark via-bronze to-amber-300" />

        {/* Modal Header */}
        <div className="p-6 md:p-8 flex items-center justify-between border-b border-white/10">
          <div>
            <div className="flex items-center space-x-2 text-[10px] uppercase font-mono tracking-[0.25em] text-bronze">
              <Sparkles className="w-3 h-3 text-bronze" />
              <span>Private Viewing & Sales Gallery</span>
            </div>
            <h3 className="font-serif text-2xl md:text-3xl font-light text-sand-50 mt-1">
              VIP Private Appointment
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-white/5 hover:bg-white/15 text-sand-300 hover:text-white transition-colors border border-white/10"
            data-cursor="pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body or Confirmation State */}
        <div className="p-6 md:p-8">
          {isSubmitted ? (
            <div className="text-center py-8 space-y-6">
              <div className="w-16 h-16 rounded-full bg-bronze/20 border border-bronze flex items-center justify-center mx-auto text-bronze">
                <Check className="w-8 h-8" />
              </div>

              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-bronze">
                  Reservation Registered
                </span>
                <h4 className="font-serif text-3xl font-light text-sand-50 mt-2">
                  We look forward to welcoming you.
                </h4>
                <p className="text-sand-300 text-sm max-w-md mx-auto mt-2 font-light leading-relaxed">
                  Your private viewing invitation has been prepared. Our Senior Client Director will contact you within 2 business hours.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 max-w-sm mx-auto text-left font-mono text-xs space-y-1">
                <div className="flex justify-between text-sand-400">
                  <span>Reference Code:</span>
                  <span className="text-bronze-light font-bold">{bookingRef}</span>
                </div>
                <div className="flex justify-between text-sand-400">
                  <span>Residence Tier:</span>
                  <span className="text-sand-100">{formData.tier}</span>
                </div>
                <div className="flex justify-between text-sand-400">
                  <span>Date & Slot:</span>
                  <span className="text-sand-100">{formData.viewingDate} at {formData.timeSlot.split(' ')[0]}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <button
                  onClick={openWhatsApp}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-black font-semibold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Connect with Butler on WhatsApp</span>
                </button>
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full border border-white/20 hover:border-white text-sand-200 text-xs uppercase tracking-wider"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1: Name & Title */}
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

              {/* Row 2: Contact Info */}
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

              {/* Row 3: Residence of Interest */}
              <div>
                <label className="block text-[10px] uppercase font-mono tracking-wider text-sand-400 mb-1.5">
                  Residence Collection of Primary Interest
                </label>
                <select
                  value={formData.tier}
                  onChange={(e) => setFormData({ ...formData, tier: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sand-100 text-xs focus:outline-none focus:border-bronze"
                >
                  <option value="The Sky Penthouse Crown (Duplex)" className="bg-graphite-900">
                    The Sky Penthouse Crown (Duplex 8,450 sq ft - AED 52M)
                  </option>
                  <option value="The Horizon Residences (3-Bed Panorama)" className="bg-graphite-900">
                    The Horizon Residences (3-Bed 3,940 sq ft - AED 21.5M)
                  </option>
                  <option value="Signature Waterfront Suites (2-Bed)" className="bg-graphite-900">
                    Signature Waterfront Suites (2-Bed 2,280 sq ft - AED 12.2M)
                  </option>
                  <option value="The Atelier Suite (1-Bed Executive)" className="bg-graphite-900">
                    The Atelier Suite (1-Bed 1,420 sq ft - AED 8.9M)
                  </option>
                </select>
              </div>

              {/* Row 4: Date & Time slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase font-mono tracking-wider text-sand-400 mb-1.5">
                    Preferred Viewing Date
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
                    Curated Viewing Window
                  </label>
                  <select
                    value={formData.timeSlot}
                    onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sand-100 text-xs focus:outline-none focus:border-bronze"
                  >
                    <option value="10:00 (Morning Light & Harbor View)" className="bg-graphite-900">
                      10:00 AM (Morning Sun & Harbor View)
                    </option>
                    <option value="14:00 (Midday Architectural Tour)" className="bg-graphite-900">
                      02:00 PM (Midday Architectural Tour)
                    </option>
                    <option value="17:30 (Golden Hour Sunset)" className="bg-graphite-900">
                      05:30 PM (Golden Hour Sunset Reception)
                    </option>
                    <option value="20:00 (Twilight Skyline & Wine)" className="bg-graphite-900">
                      08:00 PM (Twilight Starlight Champagne)
                    </option>
                  </select>
                </div>
              </div>

              {/* VIP Courtesy Transfer Option */}
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-bronze shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-sand-100">Complimentary Chauffeur Transfer</p>
                    <p className="text-[10px] text-sand-400">Rolls-Royce Ghost chauffeur service from anywhere in Dubai</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-white/20 text-bronze focus:ring-bronze w-4 h-4 bg-graphite-900"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="flex-1 py-4 rounded-full bg-bronze hover:bg-bronze-light text-graphite-950 font-semibold text-xs uppercase tracking-[0.2em] shadow-lg transition-all"
                  data-cursor="pointer"
                >
                  Confirm VIP Reservation
                </button>

                <button
                  type="button"
                  onClick={openWhatsApp}
                  className="px-6 py-4 rounded-full border border-emerald-500/40 hover:border-emerald-400 bg-emerald-500/10 text-emerald-300 font-semibold text-xs uppercase tracking-[0.15em] flex items-center justify-center space-x-2 transition-all"
                  data-cursor="pointer"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp Concierge</span>
                </button>
              </div>

              <p className="text-[10px] text-center text-sand-500 tracking-wide">
                Strict confidentiality assured. All client data managed under DIFC banking privacy standards.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

