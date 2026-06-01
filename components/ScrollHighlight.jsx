import { motion } from 'framer-motion'

export default function ScrollHighlight({ children, delay = 0.2, theme = 'dark' }) {
  const isDark = theme === 'dark'

  // Dynamic highlighter system matched to website forest/lime brand palette
  const background = isDark
    ? 'linear-gradient(90deg, #C8FF5C 0%, #a2e030 100%)' // Glowing brand neon-lime green
    : 'linear-gradient(90deg, rgba(200, 255, 92, 0.75) 0%, rgba(162, 224, 48, 0.6) 100%)' // Rich semi-transparent lime highlighter wash

  const shadow = isDark
    ? 'rgba(200, 255, 92, 0.35)'
    : 'rgba(162, 224, 48, 0.15)'

  const textColor = isDark ? '#ffffff' : '#142c00' // moss green text in light mode, white text in dark mode

  return (
    <span className="relative inline-block mx-1 font-extrabold z-10 group">
      {/* The main text which sits on top of the highlight */}
      <span 
        className="relative z-10 transition-colors duration-300"
        style={{ color: textColor }}
      >
        {children}
      </span>
      
      {/* The animated highlighter bar that sweeps from left to right */}
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ 
          duration: 0.85, 
          ease: [0.16, 1, 0.3, 1], // easeOutExpo
          delay: delay 
        }}
        style={{
          position: 'absolute',
          bottom: '2px',
          left: '-4px',
          right: '-4px',
          height: '42%', // Covers the lower portion of the text like a real highlighter pen
          background: background,
          transformOrigin: 'left',
          zIndex: 1,
          borderRadius: '3px',
          boxShadow: `0 2px 12px ${shadow}`,
        }}
      />
    </span>
  )
}
