# Portrixe-Style Sticky Scroll Stacking — Projects Section

## What We're Building

Each project card sticks to the top of the viewport as you scroll. The next card
slides up from below and overlaps the previous one, creating a cinematic stacking
effect. The label/title info sits to the right while the image dominates the left.

Reference: https://portrixe.framer.website → "Selected Projects" section

---

## How the Effect Works (Concept)

```
SCROLL POSITION: 0vh
┌─────────────────────────────┐
│  Project 1 image (full)     │   ← sticky top:0
└─────────────────────────────┘

SCROLL POSITION: 50vh
┌─────────────────────────────┐
│  Project 1 image (partial)  │   ← still sticky, being covered
│ ┌─────────────────────────┐ │
│ │  Project 2 slides up    │ │   ← coming from below
│ └─────────────────────────┘ │
└─────────────────────────────┘

SCROLL POSITION: 100vh
┌─────────────────────────────┐
│  Project 2 image (full)     │   ← now on top, sticky
└─────────────────────────────┘
```

The key CSS: each card has `position: sticky; top: 0` and a higher `z-index`
than the one before it. No JavaScript needed for the core effect.

---

## Step 1 — Replace your ProjectsSection component

Create or replace `components/ProjectsSection.jsx` with the following:

```jsx
'use client'
import { useRef } from 'react'
import Image from 'next/image'

const PROJECTS = [
  {
    id: '01',
    title: 'AutoFlow',
    subtitle: 'AI-Native Workflow Automation Platform',
    tags: ['AI Engineering', 'Full Stack'],
    stack: ['Next.js', 'FastAPI', 'React Flow', 'Groq', 'MongoDB'],
    description:
      'Built a visual workflow automation platform where natural language generates executable node graphs. Features NL→workflow generation, JWT auth, APScheduler, and real-time monitoring.',
    image: '/projects/autoflow.png',   // replace with your screenshot
    accent: '#C8FF5C',
    github: 'https://github.com/SHXZ7',
    live: null,
  },
  {
    id: '02',
    title: 'MedPrompt+',
    subtitle: 'RAG-Based Health Assistant',
    tags: ['AI Engineering', 'Full Stack'],
    stack: ['Next.js', 'FastAPI', 'RAG', 'Gemini AI', 'OCR'],
    description:
      'Full-stack AI health assistant with medical PDF parsing, OCR, ML risk prediction, and LLM-powered doctor chat. Combined RAG retrieval with multi-modal document ingestion.',
    image: '/projects/medprompt.png',
    accent: '#5CF0FF',
    github: 'https://github.com/SHXZ7',
    live: null,
  },
  {
    id: '03',
    title: 'MotorGuard',
    subtitle: 'IoT Motor Fault Detection System',
    tags: ['Data Engineering', 'IoT'],
    stack: ['ESP32', 'FastAPI', 'Next.js', 'MongoDB', 'Recharts'],
    description:
      'Five-layer IoT architecture monitoring motor faults in real-time using ESP32, INA219, ADXL345, and Hall effect sensors. ML anomaly detection with a live Next.js dashboard.',
    image: '/projects/motorguard.png',
    accent: '#FF9F5C',
    github: 'https://github.com/SHXZ7',
    live: null,
  },
  {
    id: '04',
    title: 'IPL Analytics',
    subtitle: 'Cricket Data Engineering & Analytics',
    tags: ['Data Engineering', 'Analytics'],
    stack: ['Python', 'SQL', 'Power BI', 'Pandas', 'Seaborn'],
    description:
      'Ball-by-ball IPL dataset pipeline with batting phase analysis, custom Player Value Index, and toss decision win-rate modelling — framed around franchise auction strategy.',
    image: '/projects/ipl.png',
    accent: '#FF5C8A',
    github: 'https://github.com/SHXZ7',
    live: null,
  },
]

export default function ProjectsSection({ theme = 'dark' }) {
  const isGreen = theme === 'dark'
  const bg      = isGreen ? '#060e06' : '#f2f7e8'
  const textMain  = isGreen ? '#ffffff' : '#0a0a0a'
  const textMuted = isGreen ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)'
  const cardBg    = isGreen ? '#0d1a0d' : '#ffffff'
  const borderCol = isGreen ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.08)'

  return (
    <section
      style={{ background: bg, paddingBottom: '10vh' }}
      id="projects"
    >
      {/* ── Section header (non-sticky) ── */}
      <div style={{
        padding: '80px 56px 48px',
        borderBottom: `0.5px solid ${borderCol}`,
      }}>
        <p style={{
          fontSize: 11, letterSpacing: '0.16em',
          textTransform: 'uppercase', color: '#C8FF5C',
          marginBottom: 12,
        }}>
          Selected Work
        </p>
        <h2 style={{
          fontSize: 'clamp(36px, 5vw, 64px)',
          fontWeight: 900, color: textMain,
          letterSpacing: '-0.03em', lineHeight: 1,
          margin: 0,
        }}>
          Featured Projects
        </h2>
      </div>

      {/* ── Sticky stack container ── */}
      {/*
        Each card needs enough scroll distance to "hold" on screen.
        We give the wrapper a tall height so the user scrolls through each card.
        Formula: (N cards × 100vh) = total scroll height
      */}
      <div style={{ position: 'relative' }}>
        {PROJECTS.map((project, index) => (
          <StickyCard
            key={project.id}
            project={project}
            index={index}
            total={PROJECTS.length}
            isGreen={isGreen}
            textMain={textMain}
            textMuted={textMuted}
            cardBg={cardBg}
            borderCol={borderCol}
          />
        ))}
      </div>
    </section>
  )
}

function StickyCard({ project, index, total, isGreen, textMain, textMuted, cardBg, borderCol }) {
  return (
    /*
      The outer div defines the scroll "window" for this card.
      height: 100vh means the user scrolls 100vh while this card is active.
      The last card can be shorter since nothing stacks on top of it.
    */
    <div style={{
      height: index === total - 1 ? 'auto' : '100vh',
      position: 'relative',
    }}>
      {/*
        The sticky card itself.
        z-index increases per card so later cards stack on top of earlier ones.
        top: 0 makes it stick to the top of the viewport.
      */}
      <div style={{
        position: 'sticky',
        top: 0,
        zIndex: 10 + index,
        height: '100vh',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        overflow: 'hidden',
        background: cardBg,
        borderTop: `0.5px solid ${borderCol}`,
      }}>

        {/* LEFT — Project image */}
        <div style={{
          position: 'relative',
          overflow: 'hidden',
          background: '#111',
        }}>
          <Image
            src={project.image}
            alt={project.title}
            fill
            style={{ objectFit: 'cover', objectPosition: 'center top' }}
          />
          {/* Dark scrim so image doesn't fight text */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to right, transparent 60%, rgba(0,0,0,0.4) 100%)',
          }} />
          {/* Project number watermark */}
          <div style={{
            position: 'absolute', top: 32, left: 32,
            fontSize: 11, letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.30)',
          }}>
            / Project {project.id}
          </div>
        </div>

        {/* RIGHT — Project info */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '48px 56px',
          gap: 0,
        }}>
          {/* Accent line */}
          <div style={{
            width: 40, height: 1.5,
            background: project.accent,
            marginBottom: 28,
          }} />

          {/* Tags */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
            {project.tags.map(tag => (
              <span key={tag} style={{
                fontSize: 11, fontWeight: 600,
                letterSpacing: '0.10em', textTransform: 'uppercase',
                color: project.accent,
                border: `0.5px solid ${project.accent}55`,
                borderRadius: 40,
                padding: '4px 12px',
                background: `${project.accent}10`,
              }}>
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3 style={{
            fontSize: 'clamp(32px, 3.5vw, 52px)',
            fontWeight: 900,
            color: textMain,
            letterSpacing: '-0.025em',
            lineHeight: 1,
            margin: '0 0 8px',
          }}>
            {project.title}
          </h3>

          {/* Subtitle */}
          <p style={{
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: '0.10em',
            textTransform: 'uppercase',
            color: textMuted,
            margin: '0 0 20px',
          }}>
            {project.subtitle}
          </p>

          {/* Description */}
          <p style={{
            fontSize: 15,
            color: isGreen ? 'rgba(255,255,255,0.60)' : 'rgba(0,0,0,0.60)',
            lineHeight: 1.65,
            margin: '0 0 32px',
            maxWidth: 420,
          }}>
            {project.description}
          </p>

          {/* Stack chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 36 }}>
            {project.stack.map(tech => (
              <span key={tech} style={{
                fontSize: 11, fontWeight: 600,
                letterSpacing: '0.08em', textTransform: 'uppercase',
                color: isGreen ? 'rgba(255,255,255,0.50)' : 'rgba(0,0,0,0.50)',
                border: `0.5px solid ${borderCol}`,
                borderRadius: 4,
                padding: '4px 10px',
              }}>
                {tech}
              </span>
            ))}
          </div>

          {/* Links */}
          <div style={{ display: 'flex', gap: 16 }}>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: 12, fontWeight: 600,
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  color: textMain,
                  textDecoration: 'none',
                  borderBottom: `1px solid ${isGreen ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.25)'}`,
                  paddingBottom: 2,
                  transition: 'border-color 0.2s',
                }}
                onMouseEnter={e => e.target.style.borderColor = project.accent}
                onMouseLeave={e => e.target.style.borderColor = isGreen ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.25)'}
              >
                GitHub ↗
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: 12, fontWeight: 600,
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  color: project.accent,
                  textDecoration: 'none',
                  borderBottom: `1px solid ${project.accent}55`,
                  paddingBottom: 2,
                }}
              >
                Live Demo ↗
              </a>
            )}
          </div>

          {/* Progress indicator — shows which project you're on */}
          <div style={{
            position: 'absolute',
            bottom: 32, right: 56,
            display: 'flex', gap: 6,
          }}>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} style={{
                width: i === index ? 20 : 6,
                height: 2,
                borderRadius: 2,
                background: i === index ? project.accent : (isGreen ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'),
                transition: 'width 0.3s ease',
              }} />
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
```

---

## Step 2 — Add project screenshots

Put your screenshots in `public/projects/`:

```
public/
  projects/
    autoflow.png      ← screenshot of AutoFlow UI
    medprompt.png     ← screenshot of MedPrompt+ UI
    motorguard.png    ← screenshot of MotorGuard dashboard
    ipl.png           ← screenshot of IPL dashboard / Power BI
```

**Tips for screenshots:**
- Use a dark browser window so they blend into the card
- Crop to 16:9 or 4:3 landscape — fills the card better than portrait
- If you don't have screenshots yet, use a dark placeholder:
  `background: '#0d1a0d'` temporarily and add a centered project name

---

## Step 3 — Replace old section in your page

In `app/page.jsx` (or wherever your sections live), swap:

```jsx
// REMOVE this:
<ProjectsSection />   // or whatever your old component is called

// ADD this:
import ProjectsSection from '@/components/ProjectsSection'
// ...
<ProjectsSection theme={theme} />
```

---

## Step 4 — Make sure no parent has overflow:hidden

**Critical:** The sticky effect breaks if any parent element has `overflow: hidden`
or `overflow: auto`. Check your layout wrappers:

```jsx
// BAD — kills sticky
<div style={{ overflow: 'hidden' }}>
  <ProjectsSection />
</div>

// GOOD
<div>
  <ProjectsSection />
</div>
```

In Next.js 13+ App Router, check `app/layout.jsx` — the `<body>` or root div
should NOT have `overflow: hidden`.

---

## Step 5 — Optional: scale-down effect on previous cards

To make buried cards slightly scale down as new ones stack on top
(more dramatic than pure overlap), add this to each card:

```jsx
// Inside StickyCard, wrap the card content:
import { useRef, useEffect, useState } from 'react'

// Add this hook inside StickyCard:
const cardRef = useRef(null)
const [scale, setScale] = useState(1)

useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      // As card leaves viewport top, shrink it slightly
      if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
        setScale(0.96)
      } else {
        setScale(1)
      }
    },
    { threshold: 0.1 }
  )
  if (cardRef.current) observer.observe(cardRef.current)
  return () => observer.disconnect()
}, [])

// Apply to the sticky card div:
style={{
  ...existingStyles,
  transform: `scale(${scale})`,
  transition: 'transform 0.4s ease',
  transformOrigin: 'top center',
}}
```

---

## How the CSS sticky stacking works

```
Parent div height: 100vh   ← this is the "scroll window" for the card
  └── Sticky child: top 0, z-index: 10  ← Card 1 (stays visible while parent scrolls)

Parent div height: 100vh
  └── Sticky child: top 0, z-index: 11  ← Card 2 (slides up over Card 1)

Parent div height: 100vh
  └── Sticky child: top 0, z-index: 12  ← Card 3 (slides up over Card 2)

Parent div height: auto   ← last card, no scroll window needed
  └── Sticky child: top 0, z-index: 13  ← Card 4
```

**Why it works:**
- Each parent div is 100vh tall, so the browser allocates 100vh of scrolling for it
- The sticky child "sticks" at top:0 for the entire 100vh of its parent's scroll
- The next parent starts immediately after, so its sticky child appears to slide up
  from the bottom as you scroll into it
- Higher z-index means newer cards layer on top of older ones

---

## Troubleshooting

| Problem | Fix |
|---|---|
| Cards don't stick | Remove `overflow:hidden` from any ancestor |
| Cards all show at once | Make sure each card's parent div has `height: 100vh` |
| Last card looks odd | Set last card's parent to `height: auto` |
| Mobile looks broken | Add responsive grid: `grid-template-columns: 1fr` on mobile |
| Image not filling | Confirm `fill` prop + parent has `position: relative` and explicit height |

---

## Mobile responsive addition

Add this to your global CSS or inside a `<style>` tag in the component:

```css
@media (max-width: 768px) {
  .project-card-grid {
    grid-template-columns: 1fr !important;
    grid-template-rows: 50vh auto;
  }
  .project-card-info {
    padding: 32px 24px !important;
    height: auto !important;
  }
}
```

Or use Tailwind breakpoints directly in the component if you prefer.