'use client';

import { Sun, Moon } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function CinematicThemeSwitcher({ onThemeChange }) {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [particles, setParticles] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const toggleRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('theme');
    if (stored) {
      setIsDark(stored === 'dark');
    }
  }, []);

  const generateParticles = () => {
    const newParticles = [];
    const particleCount = 3;

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        delay: i * 0.1,
        duration: 0.6 + i * 0.1,
      });
    }

    setParticles(newParticles);
    setIsAnimating(true);

    setTimeout(() => {
      setIsAnimating(false);
      setParticles([]);
    }, 1000);
  };

  const handleToggle = () => {
    generateParticles();
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    if (onThemeChange) {
      onThemeChange(newTheme ? 'dark' : 'light');
    }
  };

  if (!mounted) {
    return <div className="relative inline-block"><div className="relative flex h-[64px] w-[104px] items-center rounded-full bg-gray-200 p-1" /></div>;
  }

  return (
    <div className="relative inline-block">
      <motion.button
        ref={toggleRef}
        onClick={handleToggle}
        className={`relative flex h-[64px] w-[104px] items-center rounded-full p-[6px] transition-all duration-500 focus:outline-none backdrop-blur-xl ${
          isDark
            ? 'bg-gradient-to-br from-[#1a1a1a]/90 via-[#0f0f0f]/85 to-[#1a1a1a]/90'
            : 'bg-gradient-to-br from-white/90 via-[#f8f9fa]/85 to-[#e9ecef]/90'
        }`}
        style={{
          boxShadow: isDark
            ? `
              inset 5px 5px 12px rgba(0, 0, 0, 0.6),
              inset -5px -5px 12px rgba(200, 255, 92, 0.05),
              0 8px 32px rgba(0, 0, 0, 0.3),
              0 4px 12px rgba(0, 0, 0, 0.2)
            `
            : `
              inset 5px 5px 12px rgba(142, 196, 56, 0.15),
              inset -5px -5px 12px rgba(255, 255, 255, 1),
              0 8px 32px rgba(0, 0, 0, 0.08),
              0 4px 12px rgba(0, 0, 0, 0.06)
            `,
          border: isDark 
            ? '2px solid rgba(200, 255, 92, 0.2)' 
            : '2px solid rgba(200, 255, 92, 0.4)',
        }}
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        role="switch"
        aria-checked={isDark}
        whileTap={{ scale: 0.98 }}
      >
        {/* Deep inner groove/rim effect */}
        <div 
          className="absolute inset-[3px] rounded-full pointer-events-none"
          style={{
            boxShadow: isDark
              ? 'inset 0 2px 6px rgba(0, 0, 0, 0.7), inset 0 -1px 3px rgba(200, 255, 92, 0.05)'
              : 'inset 0 2px 6px rgba(120, 170, 40, 0.2), inset 0 -1px 3px rgba(255, 255, 255, 0.8)',
          }}
        />
        
        {/* Multi-layer glossy overlay */}
        <div 
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: isDark
              ? `
                radial-gradient(ellipse at top, rgba(200, 255, 92, 0.05) 0%, transparent 50%),
                linear-gradient(to bottom, rgba(200, 255, 92, 0.03) 0%, transparent 30%, transparent 70%, rgba(0, 0, 0, 0.2) 100%)
              `
              : `
                radial-gradient(ellipse at top, rgba(255, 255, 255, 0.9) 0%, transparent 50%),
                linear-gradient(to bottom, rgba(255, 255, 255, 0.8) 0%, transparent 30%, transparent 70%, rgba(142, 196, 56, 0.1) 100%)
              `,
            mixBlendMode: 'overlay',
          }}
        />
        
        {/* Ambient occlusion effect */}
        <div 
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            boxShadow: isDark
              ? 'inset 0 0 15px rgba(0, 0, 0, 0.3)'
              : 'inset 0 0 15px rgba(142, 196, 56, 0.15)',
          }}
        />

        {/* Background Icons */}
        <div className="absolute inset-0 flex items-center justify-between px-4">
          <Sun size={20} className={isDark ? 'text-[#C8FF5C]/30' : 'text-[#8ec438]'} />
          <Moon size={20} className={isDark ? 'text-[#C8FF5C]' : 'text-gray-400'} />
        </div>

        {/* Circular Thumb with Bouncy Spring Physics */}
        <motion.div
          className="relative z-10 flex h-[44px] w-[44px] items-center justify-center rounded-full overflow-hidden"
          style={{
            background: isDark
              ? 'linear-gradient(145deg, #2a2a2a 0%, #1a1a1a 50%, #0f0f0f 100%)'
              : 'linear-gradient(145deg, #ffffff 0%, #fefefe 50%, #f8fafc 100%)',
            boxShadow: isDark
              ? `
                inset 2px 2px 4px rgba(200, 255, 92, 0.1),
                inset -2px -2px 4px rgba(0, 0, 0, 0.6),
                0 8px 32px rgba(0, 0, 0, 0.4),
                0 4px 12px rgba(0, 0, 0, 0.3)
              `
              : `
                inset 2px 2px 4px rgba(200, 255, 92, 0.15),
                inset -2px -2px 4px rgba(255, 255, 255, 1),
                0 8px 32px rgba(0, 0, 0, 0.12),
                0 4px 12px rgba(0, 0, 0, 0.08)
              `,
            border: isDark
              ? '2px solid rgba(200, 255, 92, 0.15)'
              : '2px solid rgba(200, 255, 92, 0.3)',
          }}
          animate={{ x: isDark ? 46 : 0 }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 20,
          }}
        >
          {/* Glossy shine overlay on thumb */}
          <div 
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: isDark
                ? 'linear-gradient(to bottom, rgba(200, 255, 92, 0.05) 0%, transparent 40%, rgba(0, 0, 0, 0.2) 100%)'
                : 'linear-gradient(to bottom, rgba(255, 255, 255, 0.4) 0%, transparent 40%, rgba(0, 0, 0, 0.1) 100%)',
              mixBlendMode: 'overlay',
            }}
          />

          {/* Particle Layer */}
          {isAnimating && particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <motion.div
                className="absolute rounded-full"
                style={{
                  width: '10px',
                  height: '10px',
                  background: isDark
                    ? 'radial-gradient(circle, rgba(200, 255, 92, 0.5) 0%, rgba(200, 255, 92, 0) 70%)'
                    : 'radial-gradient(circle, rgba(200, 255, 92, 0.7) 0%, rgba(200, 255, 92, 0) 70%)',
                  mixBlendMode: 'normal',
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: isDark ? 6 : 8, opacity: [0, 1, 0] }}
                transition={{
                  duration: isDark ? 0.5 : particle.duration,
                  delay: particle.delay,
                  ease: 'easeOut',
                }}
              />
            </motion.div>
          ))}

          {/* Icon */}
          <div className="relative z-10">
            {isDark ? (
              <Moon size={20} className="text-[#C8FF5C]" />
            ) : (
              <Sun size={20} className="text-[#8ec438]" />
            )}
          </div>
        </motion.div>
      </motion.button>
    </div>
  );
}
