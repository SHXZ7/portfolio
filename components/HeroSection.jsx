import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import Image from 'next/image'
import DownloadCVButton from './DownloadCVButton'
import CinematicThemeSwitcher from './CinematicThemeSwitcher'
import Aurora from './Aurora'
import Typewriter from './Typewriter'

const NAV_ITEMS = [
  { label: 'About',     href: '#about' },
  { label: 'Expertise', href: '#expertise' },
  { label: 'Projects',  href: '#projects' },
  { label: 'Contact',   href: '#contact' },
]

const ROLES = [
  'AI Engineer',
  'Data Engineer',
  'Full Stack Engineer',
]

export default function HeroSection({ theme = 'dark', onThemeChange, scrollY = 0 }) {
  const [activeNav, setActiveNav]   = useState(null)
  const [hoveredNav, setHoveredNav] = useState(null)
  const [lineStyle, setLineStyle]   = useState({ left: 0, width: 0, opacity: 0 })
  const [mobileOpen, setMobileOpen] = useState(false)
  const navRefs   = useRef({})
  const navBarRef = useRef(null)
  const canvasRef = useRef(null)
  const animRef   = useRef(null)

  // ── Canvas particle network ────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const N = 65
    const pts = Array.from({ length: N }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.4 + 0.4,
    }))
    const MAX = 145

    const tick = () => {
      const w = canvas.width, h = canvas.height
      ctx.clearRect(0, 0, w, h)
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0
      }
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y
          const d  = Math.sqrt(dx * dx + dy * dy)
          if (d < MAX) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(200,255,92,${(1 - d / MAX) * 0.16})`
            ctx.lineWidth   = 0.7
            ctx.moveTo(pts[i].x, pts[i].y)
            ctx.lineTo(pts[j].x, pts[j].y)
            ctx.stroke()
          }
        }
      }
      for (const p of pts) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(200,255,92,0.32)'
        ctx.fill()
      }
      animRef.current = requestAnimationFrame(tick)
    }
    tick()
    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  // ── Sliding indicator line position ───────────────────────
  const updateLine = (label) => {
    const el = navRefs.current[label]
    const bar = navBarRef.current
    if (!el || !bar) return
    const eRect = el.getBoundingClientRect()
    const bRect = bar.getBoundingClientRect()
    setLineStyle({
      left:    eRect.left - bRect.left,
      width:   eRect.width,
      opacity: 1,
    })
  }

  const handleNavClick = (item) => {
    setActiveNav(item.href)
    updateLine(item.label)
    const el = document.querySelector(item.href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setMobileOpen(false)
  }

  const isGreen = theme === 'dark'

  const textMain  = isGreen ? '#ffffff'            : '#0a0a0a'
  const textMuted = isGreen ? 'rgba(255,255,255,0.60)' : 'rgba(0,0,0,0.55)'
  const textLink  = isGreen ? 'rgba(255,255,255,0.78)' : 'rgba(0,0,0,0.68)'
  const accent    = '#C8FF5C'
  const fadeColor = isGreen ? '#060e06' : '#f2f7e8'

  // GPU-accelerated scroll hooks that bypass React rendering cycles for smooth 120fps animations
  const { scrollY: pageScrollY } = useScroll()
  const smoothScrollY = useSpring(pageScrollY, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001
  })

  // Fluid momentum transformations (parallax + opacity + scale transitions on scroll)
  const photoOpacity   = useTransform(smoothScrollY, [0, 700], [isGreen ? 0.55 : 0.45, 0])
  const photoScale     = useTransform(smoothScrollY, [0, 1500], [1.02, 0.94])
  const photoX         = useTransform(smoothScrollY, [0, 700], [0, 60])
  const auroraOpacity  = useTransform(smoothScrollY, [0, 600], [isGreen ? 0.38 : 0.46, 0])

  const navOpacity     = useTransform(smoothScrollY, [0, 160], [1, 0])
  const navY           = useTransform(smoothScrollY, [0, 160], [0, -30])

  const rolesOpacity   = useTransform(smoothScrollY, [0, 240], [1, 0])
  const rolesX         = useTransform(smoothScrollY, [0, 240], [0, 40])

  const contentOpacity = useTransform(smoothScrollY, [0, 420], [1, 0])
  const contentY       = useTransform(smoothScrollY, [0, 420], [0, 75])
  const contentScale   = useTransform(smoothScrollY, [0, 420], [1, 0.96])

  // Custom staggered spring reveal animations for big screen entry
  const titleContainer = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.14, delayChildren: 0.25 }
    }
  }

  const wordVariant = {
    hidden: { y: "100%" },
    visible: {
      y: 0,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } // Custom cubic easeOutExpo curve
    }
  }

  return (
    <section
      className="relative min-h-screen overflow-hidden flex flex-col"
      style={{
        background: isGreen
          ? 'linear-gradient(135deg,#040d00 0%,#091500 40%,#060e00 70%,#020800 100%)'
          : 'linear-gradient(135deg,#f2f7e8 0%,#e9f2d8 40%,#dcebc4 100%)',
      }}
    >
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: isGreen ? 1 : 0.35 }}
      />

      {/* Glow — bottom-left */}
      <div className="absolute pointer-events-none" style={{
        left:'-12%', bottom:'-8%', width:'60vw', height:'60vw',
        borderRadius:'50%',
        background: isGreen
          ? 'radial-gradient(circle,rgba(200,255,92,0.09) 0%,rgba(100,200,20,0.04) 50%,transparent 70%)'
          : 'radial-gradient(circle,rgba(142,196,56,0.10) 0%,transparent 70%)',
        filter:'blur(70px)',
      }}/>

      {/* Glow — top-right */}
      <div className="absolute pointer-events-none" style={{
        right:'4%', top:'8%', width:'28vw', height:'28vw',
        borderRadius:'50%',
        background: isGreen
          ? 'radial-gradient(circle,rgba(200,255,92,0.05) 0%,transparent 70%)'
          : 'radial-gradient(circle,rgba(142,196,56,0.07) 0%,transparent 70%)',
        filter:'blur(90px)',
      }}/>
      {/* Portrixe-style full-bleed background photo integration */}
      <motion.div 
        style={{ opacity: photoOpacity, scale: photoScale, x: photoX }}
        className="hidden md:block absolute top-0 right-0 w-[55%] h-full z-[1] select-none pointer-events-none overflow-hidden"
      >
        <motion.div
          initial={{ opacity: 0, scale: 1.05, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full relative"
        >
          <Image 
            src="/IMG_2213.PNG" 
            alt="Mohammed Shaaz Background" 
            fill
            priority
            className="object-cover object-[60%_top]"
          />
        </motion.div>
      </motion.div>

      {/* Dynamic gradient overlays to blend the photo edge seamlessly */}
      <div className="hidden md:block absolute inset-0 z-[2] pointer-events-none select-none">
        {/* Left fade */}
        <div 
          className="absolute inset-0 transition-all duration-700"
          style={{
            background: `linear-gradient(to right, ${fadeColor} 40%, transparent 75%)`
          }}
        />
        {/* Right fade */}
        <div 
          className="absolute top-0 right-0 h-full w-[40%] transition-all duration-700"
          style={{
            background: `linear-gradient(to left, ${fadeColor} 5%, transparent 70%)`
          }}
        />
        {/* Bottom fade */}
        <div 
          className="absolute bottom-0 left-0 w-full h-[200px] transition-all duration-700"
          style={{
            background: `linear-gradient(to top, ${fadeColor} 30%, transparent)`
          }}
        />
      </div>

      {/* Dynamic WebGL Aurora Wave overlay (Dark Mode Only) */}
      {isGreen && (
        <motion.div 
          className="absolute inset-0 pointer-events-none select-none overflow-hidden"
          style={{ zIndex: 3, opacity: auroraOpacity }}
        >
          <Aurora 
            colorStops={['#040d00', '#C8FF5C', '#020800']}
            blend={0.5}
            amplitude={1.1}
            speed={0.5}
          />
        </motion.div>
      )}

      {/* ═══════════════════════ NAVBAR ═══════════════════════ */}
      <motion.div style={{ opacity: navOpacity, y: navY }} className="relative z-30">
        <motion.nav
          ref={navBarRef}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="flex items-center justify-between px-8 md:px-14 pt-8 pb-0"
          style={{ position: 'relative' }}
        >
        {/* ── Brand (left) ── */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <div
            className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0"
            style={{ border: `2px solid ${isGreen ? 'rgba(200,255,92,0.55)' : 'rgba(36,54,18,0.3)'}` }}
          >
            <img src="/photo.jpg" alt="Mohammed Shaaz" className="w-full h-full object-cover" />
          </div>
          <span
            className="font-black text-[17px] tracking-tight hidden sm:block select-none"
            style={{ color: textMain, fontFamily: 'var(--font-heading,inherit)' }}
          >
            Mohammed Shaaz<span style={{ color: accent }}>®</span>
          </span>
        </div>

        {/* ── Desktop centre links + sliding line ── */}
        <div className="hidden md:flex flex-col items-center" style={{ position: 'relative' }}>
          <ul className="flex items-center gap-10">
            {NAV_ITEMS.map((item) => {
              const isActive  = activeNav  === item.href
              const isHovered = hoveredNav === item.label
              return (
                <li key={item.label}>
                  <button
                    ref={(el) => { navRefs.current[item.label] = el }}
                    onClick={() => handleNavClick(item)}
                    onMouseEnter={() => setHoveredNav(item.label)}
                    onMouseLeave={() => setHoveredNav(null)}
                    className="relative text-[15px] font-medium tracking-wide"
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '4px 0 8px',
                      color: isHovered ? textMain : (isActive ? accent : textLink),
                      transition: 'color 0.25s ease',
                    }}
                  >
                    <span className="relative z-10">{item.label}</span>
                    
                    {/* Hover Underline Effect */}
                    <span
                      style={{
                        position: 'absolute',
                        bottom: '2px',
                        left: 0,
                        right: 0,
                        height: '2px',
                        background: textMain,
                        transform: isHovered ? 'scaleX(1)' : 'scaleX(0)',
                        opacity: isHovered ? 1 : 0,
                        transformOrigin: 'center',
                        transition: 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.3s ease',
                        borderRadius: '1px',
                      }}
                    />
                  </button>
                </li>
              )
            })}
          </ul>

          {/* ── Sliding Indicator Line ── */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              bottom: 0,
              left: lineStyle.left,
              width: lineStyle.width,
              height: 2,
              background: `linear-gradient(90deg, ${accent}, #a8e63c)`,
              borderRadius: 2,
              opacity: lineStyle.opacity,
              transition: 'left 0.35s cubic-bezier(0.4,0,0.2,1), width 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.25s ease',
              boxShadow: `0 0 10px ${accent}99, 0 0 20px ${accent}44`,
            }}
          />
        </div>

        {/* ── Download CV + Theme Switcher (right) ── */}
        <div className="hidden md:flex items-center gap-4 flex-shrink-0">
          <DownloadCVButton theme={theme} />
          <CinematicThemeSwitcher theme={theme} onThemeChange={onThemeChange} />
        </div>

        {/* ── Mobile hamburger ── */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-1"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block h-[2px] rounded-full transition-all duration-300"
              style={{
                width: i === 1 ? '18px' : '24px',
                background: isGreen ? accent : '#0a0a0a',
                opacity: i === 1 ? 0.6 : 1,
                transformOrigin: 'center',
                transform: mobileOpen
                  ? i === 0 ? 'translateY(7px) rotate(45deg)'
                  : i === 1 ? 'scaleX(0)'
                  : 'translateY(-7px) rotate(-45deg)'
                  : 'none',
              }}
            />
          ))}
        </button>
      </motion.nav>
    </motion.div>

      {/* ── Mobile dropdown menu ── */}
      <div
        className="md:hidden relative z-20 overflow-hidden transition-all duration-300"
        style={{
          maxHeight: mobileOpen ? '460px' : '0',
          opacity: mobileOpen ? 1 : 0,
        }}
      >
        <div
          className="mx-6 mt-3 rounded-2xl p-4"
          style={{
            background: isGreen ? 'rgba(5,15,0,0.90)' : 'rgba(240,248,224,0.95)',
            border: `1px solid ${isGreen ? 'rgba(200,255,92,0.2)' : 'rgba(36,54,18,0.15)'}`,
            backdropFilter: 'blur(20px)',
          }}
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeNav === item.href
            return (
              <button
                key={item.label}
                onClick={() => handleNavClick(item)}
                className="block w-full text-left px-4 py-3 rounded-xl text-[15px] font-medium transition-all duration-200"
                style={{
                  background: isActive 
                    ? (isGreen ? 'rgba(200,255,92,0.10)' : 'rgba(142,196,56,0.12)') 
                    : 'none',
                  color: isActive 
                    ? (isGreen ? accent : '#243612') 
                    : textLink,
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                <span className="flex items-center gap-3">
                  <span
                    style={{
                      width: 6, height: 6,
                      borderRadius: '50%',
                      background: isActive ? (isGreen ? accent : '#8ec438') : 'transparent',
                      border: `1px solid ${isActive 
                        ? (isGreen ? accent : '#8ec438') 
                        : (isGreen ? 'rgba(200,255,92,0.3)' : 'rgba(36,54,18,0.25)')}`,
                      display: 'inline-block',
                      flexShrink: 0,
                      transition: 'background 0.2s',
                    }}
                  />
                  {item.label}
                </span>
              </button>
            )
          })}
          <div className="mt-3 pt-3 flex items-center justify-between px-2" style={{ borderTop: `1px solid ${isGreen ? 'rgba(200,255,92,0.12)' : 'rgba(36,54,18,0.1)'}` }}>
            <DownloadCVButton theme={theme} />
            <CinematicThemeSwitcher theme={theme} onThemeChange={onThemeChange} />
          </div>
        </div>
      </div>

      {/* ═══════════════════════ HERO BODY ════════════════════ */}
      <div className="relative z-10 flex-1 flex flex-col justify-between px-8 md:px-14 pt-10 pb-10">

        {/* Roles — top right (Portrixe style) */}
        <motion.div style={{ opacity: rolesOpacity, x: rolesX }} className="hidden md:flex flex-col items-end gap-[10px] self-end">
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="flex flex-col items-end gap-[10px]"
          >
            {ROLES.map((role) => (
              <div
                key={role}
                className="flex items-center gap-3 group cursor-default"
              >
                <span
                  className="text-[15px] font-medium tracking-wide transition-all duration-300 group-hover:translate-x-[-4px]"
                  style={{ color: textLink }}
                >
                  {role}
                </span>
                <span
                  className="flex-shrink-0 transition-all duration-300 group-hover:scale-125"
                  style={{
                    width: 7, height: 7, borderRadius: '50%',
                    background: accent,
                    boxShadow: `0 0 8px ${accent}88`,
                  }}
                />
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Bottom block: tagline + BIG NAME + scroll */}
        <motion.div style={{ opacity: contentOpacity, y: contentY, scale: contentScale }} className="mt-auto z-10 relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
            className="w-full"
          >
            {/* Desktop block: tagline + BIG NAME */}
            <div className="hidden md:block w-full">
              {/* Tagline */}
              <p
                className="text-sm md:text-[15px] font-semibold mb-4 tracking-[0.18em] uppercase"
                style={{ color: textMuted }}
              >
                Engineering that drives impact.
              </p>

              {/* Giant name with Staggered Word Reveal */}
              <div className="relative">
                <motion.h1
                  variants={titleContainer}
                  initial="hidden"
                  animate="visible"
                  className="font-black leading-none select-none flex flex-wrap"
                  style={{
                    fontSize: 'clamp(56px, 12vw, 190px)',
                    color: textMain,
                    letterSpacing: '-0.03em',
                    lineHeight: 0.88,
                    fontFamily: 'var(--font-heading,inherit)',
                  }}
                >
                  <span className="inline-block overflow-hidden mr-[0.2em] py-1">
                    <motion.span variants={wordVariant} className="inline-block">
                      Mohammed
                    </motion.span>
                  </span>
                  <span className="inline-block overflow-hidden py-1 relative">
                    <motion.span variants={wordVariant} className="inline-block">
                      Shaaz
                    </motion.span>
                    <motion.sup
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8, duration: 0.4 }}
                      style={{
                        color: accent,
                        fontSize: '0.28em',
                        fontWeight: 900,
                        verticalAlign: 'super',
                        letterSpacing: 0,
                        position: 'absolute',
                        top: '0.15em',
                      }}
                    >®</motion.sup>
                  </span>
                </motion.h1>

                {/* Green text-glow */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: isGreen
                      ? 'radial-gradient(ellipse 55% 35% at 25% 65%, rgba(200,255,92,0.06) 0%, transparent 70%)'
                      : 'none',
                  }}
                />
              </div>
            </div>

            {/* Mobile block: beautiful centered intro card */}
            <div className="md:hidden w-full flex flex-col items-center justify-center pt-2 pb-6 relative">
              {/* Spotlight Green Glow specifically behind the card on mobile */}
              <div 
                className="absolute pointer-events-none z-0" 
                style={{
                  width: '120%', 
                  height: '120%',
                  top: '-10%',
                  left: '-10%',
                  borderRadius: '50%',
                  background: isGreen
                    ? 'radial-gradient(circle, rgba(200,255,92,0.22) 0%, rgba(200,255,92,0.05) 50%, transparent 70%)'
                    : 'radial-gradient(circle, rgba(142,196,56,0.22) 0%, rgba(142,196,56,0.05) 50%, transparent 70%)',
                  filter: 'blur(60px)',
                }}
              />

              {/* Content Container to keep z-index above glow */}
              <div className="w-full max-w-[390px] relative z-10 flex flex-col items-start px-2">
                
                {/* Overlapping Chat Intro Bubble "Hi INTRO" */}
                <div className="z-20 relative mb-[-24px] ml-6 self-start pl-2">
                  <div 
                    className={`w-[78px] h-[78px] rounded-full flex flex-col items-center justify-center shadow-lg relative ${
                      isGreen 
                        ? 'bg-[#C8FF5C] text-black shadow-[#C8FF5C]/20' 
                        : 'bg-[#8ec438] text-white shadow-[#8ec438]/20'
                    }`}
                    style={{
                      filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.15))'
                    }}
                  >
                    <span className="text-[30px] font-black tracking-tight leading-none">Hi</span>
                    
                    {/* Chat bubble pointer/tail */}
                    <div 
                      className="absolute bottom-[-6px] left-[28px] w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent"
                      style={{
                        borderTop: `10px solid ${isGreen ? '#C8FF5C' : '#8ec438'}`
                      }}
                    />
                  </div>
                  
                  {/* INTRO text under the circle */}
                  <div 
                    className={`text-[11px] font-black uppercase tracking-[0.25em] mt-3.5 pl-1.5 ${
                      isGreen ? 'text-[#C8FF5C]' : 'text-[#6f9828]'
                    }`}
                  >
                    INTRO
                  </div>
                </div>

                {/* Glassmorphic Rounded Card */}
                <div 
                  className={`w-full rounded-[30px] border p-7 relative overflow-visible transition-colors duration-500 shadow-2xl ${
                    isGreen
                      ? 'bg-black/75 border-white/10 shadow-black/60'
                      : 'bg-white/80 border-gray-300/60 shadow-gray-400/20'
                  }`}
                >
                  {/* Accent line or glow inside the card */}
                  <div 
                    className="absolute top-0 left-0 right-0 h-[1.5px] rounded-t-[30px]"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${isGreen ? 'rgba(200,255,92,0.45)' : 'rgba(142,196,56,0.45)'}, transparent)`
                    }}
                  />

                  {/* Main Name */}
                  <h1 
                    className={`text-[34px] font-black tracking-tight leading-none mb-3.5 ${
                      isGreen ? 'text-white' : 'text-gray-900'
                    }`}
                    style={{ 
                      fontFamily: 'var(--font-heading, inherit)' 
                    }}
                  >
                    Mohammed Shaaz
                  </h1>

                  {/* Typewriter Description */}
                  <div className="flex items-center min-h-[48px]">
                    <p 
                      className={`text-sm sm:text-base font-semibold leading-relaxed ${
                        isGreen ? 'text-white/85' : 'text-gray-700'
                      }`}
                    >
                      <Typewriter 
                        words={[
                          "hi i build full stack web apps and can also work as a data analyst and worked as data engineer previously."
                        ]}
                        speed={75}
                        delayBetweenWords={1800}
                        className="inline"
                      />
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom row */}
            <div className="flex items-center justify-between mt-8">
              {/* Scroll hint */}
              <div className="flex items-center gap-2.5">
                <div
                >
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                  </svg>
                </div>
                <span
                  className="text-[11px] font-semibold tracking-[0.2em] uppercase"
                  style={{ color: isGreen ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.38)' }}
                >
                  Scroll to explore
                </span>
              </div>

              {/* Decorative gradient line */}
              <div
                className="hidden md:block h-px flex-1 mx-10"
                style={{ background: 'linear-gradient(90deg,rgba(200,255,92,0.18),transparent)' }}
              />

              {/* Social labels */}
              <div className="hidden md:flex items-center gap-7">
                {[
                  { label: 'GitHub',   url: 'https://github.com/SHXZ7' },
                  { label: 'LinkedIn', url: 'https://linkedin.com/in/mohammed-shaaz' },
                ].map(({ label, url }) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors duration-200 hover:text-[#C8FF5C]"
                    style={{ color: isGreen ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.38)', textDecoration: 'none' }}
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
        style={{
          background: isGreen
            ? 'linear-gradient(to bottom,transparent,#040d00)'
            : 'linear-gradient(to bottom,transparent,#f2f7e8)',
        }}
      />

      {/* Bounce keyframe */}
      <style>{`
        @keyframes heroBounce {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(4px); }
        }
      `}</style>
    </section>
  )
}
