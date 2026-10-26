import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import VIPBookingModal from './components/VIPBookingModal';
import ScrollToTop from './components/ScrollToTop';

import HomePage from './pages/HomePage';
import ResidencesPage from './pages/ResidencesPage';
import InteriorsPage from './pages/InteriorsPage';
import FloorPlansPage from './pages/FloorPlansPage';
import AmenitiesPage from './pages/AmenitiesPage';
import ArchitecturePage from './pages/ArchitecturePage';
import ContactPage from './pages/ContactPage';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState('');
  const [audioPlaying, setAudioPlaying] = useState(false);
  const audioContextRef = useRef(null);
  const gainNodeRef = useRef(null);
  const [lenisInstance, setLenisInstance] = useState(null);

  // 1. Initialize Lenis Smooth Momentum Scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.35,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential luxury ease-out
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 0.9,
      smoothTouch: false,
      touchMultiplier: 1.5,
    });
    setLenisInstance(lenis);

    lenis.on('scroll', ScrollTrigger.update);

    const rafLoop = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(rafLoop);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(rafLoop);
    };
  }, []);

  // 2. Synthesize Luxury Coastal Audio Atmosphere using Web Audio API
  const toggleAudio = () => {
    if (audioPlaying) {
      if (gainNodeRef.current && audioContextRef.current) {
        gainNodeRef.current.gain.setTargetAtTime(0, audioContextRef.current.currentTime, 0.4);
      }
      setAudioPlaying(false);
    } else {
      try {
        if (!audioContextRef.current) {
          const AudioContext = window.AudioContext || window.webkitAudioContext;
          const ctx = new AudioContext();
          audioContextRef.current = ctx;

          const gainNode = ctx.createGain();
          gainNode.gain.setValueAtTime(0.001, ctx.currentTime);
          gainNode.connect(ctx.destination);
          gainNodeRef.current = gainNode;

          // Warm harmonic resonance chord
          const freqs = [108.0, 162.0, 216.0];
          freqs.forEach((freq, idx) => {
            const osc = ctx.createOscillator();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, ctx.currentTime);

            const filter = ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(260 + idx * 80, ctx.currentTime);

            const lfo = ctx.createOscillator();
            const lfoGain = ctx.createGain();
            lfo.frequency.setValueAtTime(0.12 + idx * 0.05, ctx.currentTime);
            lfoGain.gain.setValueAtTime(0.015, ctx.currentTime);
            lfo.connect(lfoGain.gain);
            lfo.start();

            osc.connect(filter);
            filter.connect(gainNode);
            osc.start();
          });
        }

        if (audioContextRef.current.state === 'suspended') {
          audioContextRef.current.resume();
        }

        if (gainNodeRef.current) {
          gainNodeRef.current.gain.setTargetAtTime(0.07, audioContextRef.current.currentTime, 0.8);
        }
        setAudioPlaying(true);
      } catch (err) {
        console.error('Audio init notice:', err);
      }
    }
  };

  const handleOpenBooking = (tier = '') => {
    setSelectedTier(tier);
    setIsBookingOpen(true);
  };

  return (
    <BrowserRouter>
      <div className="relative min-h-screen bg-sand-100 text-graphite-900 selection:bg-bronze selection:text-white">
        {/* Scroll To Top on Route Navigation */}
        <ScrollToTop lenis={lenisInstance} />

        {/* Luxury Trailing Cursor */}
        <CustomCursor />

        {/* Persistent Floating Navigation Header with Sub-Page Links */}
        <Navbar
          onOpenBooking={handleOpenBooking}
          audioPlaying={audioPlaying}
          onToggleAudio={toggleAudio}
        />

        {/* Dynamic Route Pages */}
        <main>
          <Routes>
            <Route path="/" element={<HomePage onOpenBooking={handleOpenBooking} />} />
            <Route path="/residences" element={<ResidencesPage onOpenBooking={handleOpenBooking} />} />
            <Route path="/interiors" element={<InteriorsPage onOpenBooking={handleOpenBooking} />} />
            <Route path="/floor-plans" element={<FloorPlansPage onOpenBooking={handleOpenBooking} />} />
            <Route path="/amenities" element={<AmenitiesPage onOpenBooking={handleOpenBooking} />} />
            <Route path="/architecture" element={<ArchitecturePage onOpenBooking={handleOpenBooking} />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>

        {/* Shared Luxury Footer */}
        <Footer onOpenBooking={handleOpenBooking} />

        {/* Universal VIP Lead Capture & Private Tour Modal */}
        <VIPBookingModal
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
          preselectedTier={selectedTier}
        />
      </div>
    </BrowserRouter>
  );
}
