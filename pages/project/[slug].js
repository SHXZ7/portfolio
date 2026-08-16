import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'
import { motion } from 'framer-motion'
import { PROJECTS } from '@/lib/projectsData'
import CinematicThemeSwitcher from '@/components/CinematicThemeSwitcher'

export default function ProjectDetail({ project }) {
  const router = useRouter()
  const [theme, setTheme] = useState('dark')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const storedTheme = localStorage.getItem('theme')
    if (storedTheme === 'light' || storedTheme === 'dark') {
      setTheme(storedTheme)
    }

    const handleThemeChange = (event) => {
      const nextTheme = event.detail
      if (nextTheme === 'light' || nextTheme === 'dark') {
        setTheme(nextTheme)
      }
    }

    window.addEventListener('theme-change', handleThemeChange)
    return () => {
      window.removeEventListener('theme-change', handleThemeChange)
    }
  }, [])

  if (router.isFallback) {
    return (
      <div className="loading-screen">
        <div className="spinner" />
        <p>Loading project details...</p>
        <style jsx>{`
          .loading-screen {
            min-height: 100vh;
            background: #030800;
            color: #f8f8f6;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 16px;
          }
          .spinner {
            width: 40px;
            height: 40px;
            border: 3px solid rgba(200, 255, 92, 0.2);
            border-top-color: #C8FF5C;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="error-screen">
        <h1>Project Not Found</h1>
        <p>We couldn't find the project you are looking for.</p>
        <Link href="/#projects" className="btn-back">
          Back to Projects
        </Link>
        <style jsx>{`
          .error-screen {
            min-height: 100vh;
            background: #030800;
            color: #f8f8f6;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 20px;
          }
          .btn-back {
            padding: 12px 24px;
            border: 1px solid #C8FF5C;
            color: #C8FF5C;
            text-decoration: none;
            text-transform: uppercase;
            font-weight: 700;
            border-radius: 8px;
            transition: all 0.2s ease;
          }
          .btn-back:hover {
            background: #C8FF5C;
            color: #000;
          }
        `}</style>
      </div>
    )
  }

  const handleThemeToggle = (newTheme) => {
    setTheme(newTheme)
    const event = new CustomEvent('theme-change', { detail: newTheme })
    window.dispatchEvent(event)
  }

  const isDark = theme === 'dark'
  const hasGitHub = project.github && project.github !== '#'
  const hasLive = Boolean(project.live)
  const accentColor = project.accent || (isDark ? '#C8FF5C' : '#8ec438')

  // Find next project for smooth navigation
  const currentIndex = PROJECTS.findIndex((p) => p.slug === project.slug)
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length]

  return (
    <div className={`project-page ${isDark ? 'is-dark' : 'is-light'}`}>
      <Head>
        <title>{project.title} — Case Study</title>
        <meta name="description" content={project.description} />
      </Head>

      {/* Ambient Radial Glow */}
      <div className="ambient-radial-glow" style={{ '--project-accent': accentColor }} />

      {/* Top Navbar */}
      <header className="top-nav-bar">
        <div className="nav-content">
          <Link href="/#projects" className="back-button" aria-label="Back to Projects">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </Link>

          <div className="nav-actions">
            {hasLive && (
              <a href={project.live} target="_blank" rel="noopener noreferrer" className="nav-cta-link primary">
                Live Demo ↗
              </a>
            )}
            {hasGitHub && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="nav-cta-link secondary">
                View Repo ↗
              </a>
            )}
            {mounted && (
              <CinematicThemeSwitcher theme={theme} onThemeChange={handleThemeToggle} />
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="main-content">
        {/* Hero Header */}
        <section className="project-header">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="project-title"
          >
            {project.title.toUpperCase()}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="project-subtitle"
          >
            {project.subtitle}
          </motion.p>
        </section>

        {/* Hero Image Showcase Frame */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="hero-image-frame"
        >
          <div className="window-bar">
            <span className="dot red" />
            <span className="dot yellow" />
            <span className="dot green" />
            <span className="window-title">{project.slug} — preview</span>
          </div>
          <div className="image-wrapper">
            <Image
              src={project.image}
              alt={`${project.title} Preview`}
              width={1400}
              height={850}
              priority
              className="hero-image"
            />
          </div>
        </motion.div>

        {/* Meta Info Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="meta-grid"
        >
          <div className="meta-card">
            <span className="meta-label">Primary Domain</span>
            <span className="meta-value">{project.tags.join(' • ')}</span>
          </div>

          <div className="meta-card">
            <span className="meta-label">Tech Stack</span>
            <div className="tech-badge-list">
              {project.stack.map((tech) => (
                <span key={tech} className="tech-badge">{tech}</span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Main Content Sections Layout */}
        <div className="content-grid">
          {/* Main Column */}
          <div className="main-column">
            {/* About Project Card */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="content-card"
            >
              <h2 className="section-heading">
                <span className="heading-icon">✦</span> About The Project
              </h2>
              <div className="description-text">
                {project.about.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </motion.section>

            {/* Key Features / Included */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="content-card"
            >
              <h2 className="section-heading">
                <span className="heading-icon">⚙️</span> Key Features & Architecture
              </h2>
              <div className="feature-grid">
                {project.whatsIncluded.map((item, idx) => {
                  const parts = item.split(' — ')
                  const title = parts[0]
                  const desc = parts.slice(1).join(' — ')
                  return (
                    <div key={idx} className="feature-item">
                      <div className="feature-icon-box">✓</div>
                      <div className="feature-text">
                        <h3 className="feature-title">{title}</h3>
                        {desc && <p className="feature-desc">{desc}</p>}
                      </div>
                    </div>
                  )
                })}
              </div>
            </motion.section>
          </div>

          {/* Sidebar / Secondary Column */}
          <div className="sidebar-column">
            {/* Impact & Key Outcomes */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="content-card impact-card"
            >
              <h2 className="section-heading">
                <span className="heading-icon">🚀</span> Project Impact
              </h2>
              <ul className="impact-list">
                {project.projectImpact.map((item, idx) => (
                  <li key={idx} className="impact-item">
                    <span className="impact-bullet">⚡</span>
                    <span className="impact-text">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.section>
          </div>
        </div>

        {/* Compact CTA & Next Project Card */}
        <motion.section
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="cta-banner"
        >
          <div className="cta-banner-content">
            <h2>Explore Next Project</h2>
            <p>Check out <strong>{nextProject.title}</strong> ({nextProject.subtitle})</p>
            <div className="cta-banner-actions">
              <Link href={`/project/${nextProject.slug}`} className="banner-btn primary">
                View {nextProject.title} →
              </Link>
            </div>
          </div>
        </motion.section>
      </main>

      {/* Styled JSX - Premium Responsive Styles */}
      <style jsx>{`
        .project-page {
          --page-bg: #040d00;
          --card-bg: rgba(12, 22, 8, 0.7);
          --card-border: rgba(200, 255, 92, 0.15);
          --brand: #C8FF5C;
          --text-main: #f8f8f6;
          --text-muted: rgba(248, 248, 246, 0.72);
          --text-soft: rgba(248, 248, 246, 0.45);
          background: var(--page-bg);
          color: var(--text-main);
          min-height: 100vh;
          font-family: 'Satoshi', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          transition: background-color 500ms ease, color 500ms ease;
          position: relative;
          padding-bottom: 80px;
        }

        .project-page.is-light {
          --page-bg: #f4f6f0;
          --card-bg: #ffffff;
          --card-border: rgba(142, 196, 56, 0.25);
          --brand: #8ec438;
          --text-main: #18260c;
          --text-muted: rgba(24, 38, 12, 0.78);
          --text-soft: rgba(24, 38, 12, 0.5);
        }

        .ambient-radial-glow {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: min(100vw, 1200px);
          height: 600px;
          background: radial-gradient(
            circle at top center,
            color-mix(in srgb, var(--project-accent) 14%, transparent) 0%,
            transparent 70%
          );
          pointer-events: none;
          z-index: 0;
        }

        /* Top Navbar */
        .top-nav-bar {
          position: sticky;
          top: 0;
          z-index: 50;
          backdrop-filter: blur(12px);
          background: color-mix(in srgb, var(--page-bg) 85%, transparent);
          border-bottom: 1px solid var(--card-border);
        }

        .nav-content {
          max-width: 1280px;
          margin: 0 auto;
          padding: 16px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .back-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--card-border);
          color: var(--text-main);
          text-decoration: none;
          transition: all 200ms ease;
        }

        .back-button:hover {
          color: var(--brand);
          border-color: var(--brand);
          background: color-mix(in srgb, var(--brand) 12%, transparent);
          transform: translateX(-3px);
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .nav-cta-link {
          font-size: 13px;
          font-weight: 700;
          padding: 8px 16px;
          border-radius: 999px;
          text-decoration: none;
          transition: all 200ms ease;
          display: inline-flex;
          align-items: center;
        }

        .nav-cta-link.primary {
          background: var(--brand);
          color: #000;
        }

        .nav-cta-link.primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 14px color-mix(in srgb, var(--brand) 40%, transparent);
        }

        .nav-cta-link.secondary {
          background: rgba(255, 255, 255, 0.08);
          color: var(--text-main);
          border: 1px solid var(--card-border);
        }

        .nav-cta-link.secondary:hover {
          background: rgba(255, 255, 255, 0.16);
          transform: translateY(-2px);
        }

        /* Main Content */
        .main-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          position: relative;
          z-index: 10;
        }

        /* Header */
        .project-header {
          text-align: center;
          padding-top: clamp(40px, 5vw, 64px);
          padding-bottom: clamp(32px, 4vw, 48px);
          max-width: 860px;
          margin: 0 auto;
        }

        .project-category-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--brand);
          background: color-mix(in srgb, var(--brand) 10%, transparent);
          border: 1px solid color-mix(in srgb, var(--brand) 25%, transparent);
          padding: 6px 16px;
          border-radius: 999px;
          margin-bottom: 20px;
        }

        .badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--brand);
        }

        .project-title {
          font-size: clamp(36px, 5.5vw, 68px);
          font-weight: 900;
          letter-spacing: -0.02em;
          text-transform: uppercase;
          line-height: 1.1;
          margin: 0 0 16px;
          color: var(--text-main);
        }

        .project-subtitle {
          font-size: clamp(16px, 1.6vw, 20px);
          font-weight: 500;
          line-height: 1.5;
          color: var(--text-muted);
          margin: 0 0 28px;
        }

        .hero-actions {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .action-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          height: 48px;
          padding: 0 24px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 800;
          text-decoration: none;
          transition: all 250ms ease;
        }

        .action-btn.primary {
          background: var(--brand);
          color: #000;
          box-shadow: 0 6px 20px color-mix(in srgb, var(--brand) 30%, transparent);
        }

        .action-btn.primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px color-mix(in srgb, var(--brand) 45%, transparent);
        }

        .action-btn.secondary {
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-main);
          border: 1px solid var(--card-border);
        }

        .action-btn.secondary:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-2px);
        }

        /* Hero Image Window Frame */
        .hero-image-frame {
          border-radius: 16px;
          overflow: hidden;
          background: var(--card-bg);
          border: 1px solid var(--card-border);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
          margin-bottom: 40px;
        }

        .window-bar {
          height: 38px;
          padding: 0 16px;
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(0, 0, 0, 0.25);
          border-bottom: 1px solid var(--card-border);
        }

        .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }

        .dot.red { background: #ff5f56; }
        .dot.yellow { background: #ffbd2e; }
        .dot.green { background: #27c93f; }

        .window-title {
          font-size: 11px;
          font-family: monospace;
          color: var(--text-soft);
          margin-left: 12px;
        }

        .image-wrapper {
          position: relative;
          width: 100%;
          overflow: hidden;
        }

        .hero-image-frame :global(.hero-image) {
          width: 100%;
          height: auto;
          display: block;
          object-fit: cover;
        }

        /* Meta Grid */
        .meta-grid {
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          gap: clamp(40px, 6vw, 80px);
          padding: 44px 0;
          border-top: 1px solid var(--card-border);
          border-bottom: 1px solid var(--card-border);
          margin-bottom: 72px;
          margin-top: 24px;
        }

        .meta-card {
          background: transparent;
          border: none;
          padding: 0;
          border-radius: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .meta-card.span-2 {
          grid-column: span 1;
        }

        .meta-label {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-soft);
        }

        .meta-value {
          font-size: 16px;
          font-weight: 800;
          color: var(--text-main);
        }

        .tech-badge-list {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .tech-badge {
          font-size: 11px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 6px;
          background: color-mix(in srgb, var(--brand) 12%, transparent);
          color: var(--brand);
          border: 1px solid color-mix(in srgb, var(--brand) 20%, transparent);
        }

        /* Content Layout */
        .content-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 28px;
          margin-bottom: 48px;
          margin-top: 40px;
          padding-top: 18px;
        }

        .main-column, .sidebar-column {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        .content-card {
          background: var(--card-bg);
          border: 1px solid var(--card-border);
          border-radius: 20px;
          padding: 32px;
        }

        .section-heading {
          font-size: 22px;
          font-weight: 900;
          letter-spacing: -0.02em;
          margin: 0 0 24px;
          color: var(--text-main);
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .heading-icon {
          font-size: 20px;
        }

        .description-text p {
          font-size: 16px;
          line-height: 1.7;
          color: var(--text-muted);
          margin: 0 0 16px;
        }

        .description-text p:last-child {
          margin-bottom: 0;
        }

        /* Feature Grid */
        .feature-grid {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .feature-item {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 14px 16px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid color-mix(in srgb, var(--text-main) 6%, transparent);
        }

        .feature-icon-box {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: color-mix(in srgb, var(--brand) 20%, transparent);
          color: var(--brand);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 900;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .feature-title {
          font-size: 15px;
          font-weight: 800;
          color: var(--text-main);
          margin: 0 0 4px;
        }

        .feature-desc {
          font-size: 13.5px;
          line-height: 1.5;
          color: var(--text-muted);
          margin: 0;
        }

        /* Impact List */
        .impact-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .impact-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 14px 16px;
          border-radius: 12px;
          background: color-mix(in srgb, var(--brand) 5%, transparent);
          border: 1px solid color-mix(in srgb, var(--brand) 15%, transparent);
        }

        .impact-bullet {
          font-size: 14px;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .impact-text {
          font-size: 14px;
          line-height: 1.6;
          font-weight: 600;
          color: var(--text-muted);
        }

        /* CTA Banner */
        .cta-banner {
          background: linear-gradient(135deg, color-mix(in srgb, var(--brand) 12%, var(--card-bg)), var(--card-bg));
          border: 1px solid var(--card-border);
          border-radius: 24px;
          padding: 40px;
          text-align: center;
          margin-top: 24px;
        }

        .cta-banner h2 {
          font-size: 26px;
          font-weight: 900;
          margin: 0 0 8px;
          color: var(--text-main);
        }

        .cta-banner p {
          font-size: 16px;
          color: var(--text-muted);
          margin: 0 0 24px;
        }

        .cta-banner-actions {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .banner-btn {
          height: 48px;
          padding: 0 28px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 800;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          transition: all 200ms ease;
        }

        .banner-btn.primary {
          background: var(--brand);
          color: #000;
        }

        .banner-btn.primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px color-mix(in srgb, var(--brand) 40%, transparent);
        }

        .banner-btn.secondary {
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-main);
          border: 1px solid var(--card-border);
        }

        .banner-btn.secondary:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-2px);
        }

        /* Responsive Breakpoints */
        @media (max-width: 960px) {
          .meta-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .meta-card.span-2 {
            grid-column: span 2;
          }

          .content-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .meta-grid {
            grid-template-columns: 1fr;
            gap: 48px;
            padding: 36px 0;
            margin-bottom: 56px;
          }

          .meta-card.span-2 {
            grid-column: span 1;
          }

          .cta-banner {
            padding: 28px 20px;
          }
        }
      `}</style>
    </div>
  )
}

export async function getStaticPaths() {
  const paths = PROJECTS.map((project) => ({
    params: { slug: project.slug }
  }))

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const project = PROJECTS.find((p) => p.slug === params.slug) || null

  return {
    props: {
      project
    }
  }
}
