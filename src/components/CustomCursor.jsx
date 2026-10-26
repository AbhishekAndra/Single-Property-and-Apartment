import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [cursorType, setCursorType] = useState('default');
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable custom cursor on non-touch screens
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target;
      const interactiveEl = target.closest('[data-cursor]');
      if (interactiveEl) {
        setCursorType(interactiveEl.getAttribute('data-cursor') || 'hover');
        setCursorText(interactiveEl.getAttribute('data-cursor-text') || '');
      } else if (target.closest('button, a, input, select, textarea, [role="button"]')) {
        setCursorType('pointer');
        setCursorText('');
      } else {
        setCursorType('default');
        setCursorText('');
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  // Smooth lerp trailing position
  useEffect(() => {
    let animId;
    const lerp = () => {
      setTrailingPos((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.18,
        y: prev.y + (position.y - prev.y) * 0.18,
      }));
      animId = requestAnimationFrame(lerp);
    };
    animId = requestAnimationFrame(lerp);
    return () => cancelAnimationFrame(animId);
  }, [position]);

  if (!isVisible) return null;

  return (
    <div className="hidden md:block pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Central pinpoint */}
      <div
        className="fixed w-2 h-2 -ml-1 -mt-1 rounded-full bg-bronze transition-opacity duration-300 shadow-[0_0_8px_rgba(197,168,128,0.8)]"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        }}
      />

      {/* Trailing dynamic circle */}
      <div
        className={`fixed rounded-full flex items-center justify-center transition-all duration-200 ease-out ${
          cursorType === 'drag'
            ? 'w-16 h-16 -ml-8 -mt-8 bg-bronze/20 border border-bronze backdrop-blur-sm'
            : cursorType === 'explore'
            ? 'w-20 h-20 -ml-10 -mt-10 bg-graphite-900/90 text-white border border-bronze/40 scale-110 shadow-2xl backdrop-blur-md'
            : cursorType === 'pointer'
            ? 'w-12 h-12 -ml-6 -mt-6 border border-bronze/60 bg-bronze/10 scale-110'
            : 'w-8 h-8 -ml-4 -mt-4 border border-bronze/40 bg-transparent'
        }`}
        style={{
          transform: `translate3d(${trailingPos.x}px, ${trailingPos.y}px, 0)`,
        }}
      >
        {cursorText && (
          <span className="text-[10px] tracking-widest uppercase font-semibold text-bronze-light select-none">
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
}

