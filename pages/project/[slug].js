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
            font-family: sans-serif;
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
            font-family: sans-serif;
            gap: 20px;
          }
          .btn-back {
            padding: 12px 24px;
            border: 1px solid #C8FF5C;
            color: #C8FF5C;
            text-decoration: none;
            text-transform: uppercase;
            font-weight: 700;
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

  return (
    <div className={`project-page ${isDark ? 'is-dark' : 'is-light'}`}>
      <Head>
        <title>{project.title} - Portfolio Case Study</title>
        <meta name="description" content={project.description} />
      </Head>

      {/* Background Aurora / Ambient Glow */}
      <div className="ambient-radial-glow" />

      {/* Top Navbar */}
      <nav className="nav-container">
        <Link href="/#projects" className="back-button">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          <span>Back to Projects</span>
        </Link>

        <div className="nav-actions">
          {mounted && (
            <CinematicThemeSwitcher theme={theme} onThemeChange={handleThemeToggle} />
          )}
        </div>
      </nav>

      {/* Main Container */}
      <main className="main-content">
        {/* Header Block */}
        <header className="project-header">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="project-category"
          >
            Project {project.id} // {project.tags.join(' & ')}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {project.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="project-subtitle"
          >
            {project.subtitle}
          </motion.p>
        </header>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="hero-image-container"
        >
          <Image
            src={project.image}
            alt={`${project.title} detailed preview`}
            width={1400}
            height={800}
            priority
            className="hero-image"
          />
        </motion.div>

        {/* Overview Information Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="meta-info-bar"
        >
          <div className="meta-item">
            <span className="meta-label">Domain</span>
            <span className="meta-value">{project.tags[0]}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Client / Focus</span>
            <span className="meta-value">{project.tags[1] || 'Independent'}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Technology Stack</span>
            <div className="tech-tags">
              {project.stack.slice(0, 4).map((tech) => (
                <span key={tech} className="tech-tag">{tech}</span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Case Study Details - Left Aligned Stacked Column Layout */}
        <section className="details-container">
          {/* About Section */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="details-section"
          >
            <h2>About This Project</h2>
            <p className="description-paragraph">{project.about}</p>
          </motion.div>

          {/* What's Included */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="details-section"
          >
            <h2>What's Included</h2>
            <ul className="details-list">
              {project.whatsIncluded.map((item, idx) => {
                const [title, desc] = item.split(' — ')
                return (
                  <li key={idx} className="list-item">
                    <span className="bullet-dot">•</span>
                    <div>
                      <strong>{title}</strong>
                      {desc && <span className="item-desc"> — {desc}</span>}
                    </div>
                  </li>
                )
              })}
            </ul>
          </motion.div>

          {/* Project Impact */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="details-section"
          >
            <h2>Project Impact</h2>
            <ul className="details-list">
              {project.projectImpact.map((item, idx) => (
                <li key={idx} className="list-item">
                  <span className="bullet-dot">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </section>

        {/* Dynamic CTA Footer Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="cta-section"
        >
          <p className="cta-heading">Ready to see it in action?</p>
          <div className="cta-buttons">
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer" className="cta-button primary">
                Launch Live Site
              </a>
            )}
            {hasGitHub && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="cta-button secondary">
                Explore Repository
              </a>
            )}
          </div>
        </motion.section>
      </main>

      {/* Styled JSX (Vanilla CSS control) */}
      <style jsx>{`
        .project-page {
          --page-bg: #030800;
          --surface-bg: #030800;
          --brand: #C8FF5C;
          --text-main: #f8f8f6;
          --text-muted: rgba(248, 248, 246, 0.62);
          --text-soft: rgba(248, 248, 246, 0.42);
          --border: rgba(248, 248, 246, 0.1);
          background: var(--page-bg);
          color: var(--text-main);
          min-height: 100vh;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          transition: background-color 700ms ease, color 700ms ease;
          position: relative;
          overflow-x: hidden;
          padding-bottom: 96px;
        }

        .project-page.is-light {
          --page-bg: #f3f4f6;
          --surface-bg: #f3f4f6;
          --brand: #8ec438;
          --text-main: #243612;
          --text-muted: rgba(36, 54, 18, 0.64);
          --text-soft: rgba(36, 54, 18, 0.42);
          --border: rgba(36, 54, 18, 0.15);
        }

        .ambient-radial-glow {
          position: absolute;
          top: -10vh;
          left: 50%;
          transform: translateX(-50%);
          width: min(100vw, 1200px);
          height: 60vh;
          background: radial-gradient(
            circle at center,
            color-mix(in srgb, var(--brand) 8%, transparent) 0%,
            transparent 70%
          );
          pointer-events: none;
          z-index: 0;
        }

        .nav-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
          z-index: 10;
        }

        .back-button {
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--text-main);
          text-decoration: none;
          font-weight: 700;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          transition: color 250ms ease, transform 250ms ease;
        }

        .back-button:hover {
          color: var(--brand);
          transform: translateX(-4px);
        }

        .main-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          position: relative;
          z-index: 5;
        }

        .project-header {
          text-align: center;
          padding-top: clamp(48px, 6vw, 96px);
          padding-bottom: clamp(48px, 6vw, 84px);
        }

        .project-category {
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--brand);
          margin-bottom: 20px;
        }

        h1 {
          font-size: clamp(38px, 6.5vw, 82px);
          font-weight: 900;
          letter-spacing: -0.04em;
          line-height: 1.05;
          margin: 0 0 24px;
          color: var(--text-main);
        }

        .project-subtitle {
          font-size: clamp(16px, 1.85vw, 22px);
          font-weight: 500;
          line-height: 1.5;
          color: var(--text-muted);
          max-width: 800px;
          margin: 0 auto;
        }

        .hero-image-container {
          position: relative;
          width: 100%;
          border-radius: 8px;
          overflow: hidden;
          background: rgba(0, 0, 0, 0.15);
          box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.35);
          border: 1px solid var(--border);
          margin-bottom: 72px;
        }

        .hero-image-container :global(.hero-image) {
          width: 100%;
          height: auto;
          display: block;
          object-fit: cover;
          transition: transform 1200ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .hero-image-container:hover :global(.hero-image) {
          transform: scale(1.02);
        }

        .meta-info-bar {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          padding: 40px 0;
          border-top: 1.5px solid var(--border);
          border-bottom: 1.5px solid var(--border);
          margin-bottom: 96px;
        }

        .meta-item {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .meta-label {
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--text-soft);
        }

        .meta-value {
          font-size: 16px;
          font-weight: 700;
          color: var(--text-main);
        }

        .tech-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .tech-tag {
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          border: 1px solid var(--border);
          padding: 4px 10px;
          border-radius: 4px;
          color: var(--text-muted);
          background: rgba(255, 255, 255, 0.02);
        }

        .details-container {
          max-width: 840px;
          margin: 0 auto 100px;
          display: flex;
          flex-direction: column;
          gap: clamp(48px, 7vw, 84px);
          padding-top: 48px;
        }

        .details-section h2 {
          font-size: clamp(28px, 4vw, 42px);
          font-weight: 900;
          letter-spacing: -0.03em;
          margin: 0 0 32px;
          color: var(--text-main);
        }

        .description-paragraph {
          font-size: clamp(16px, 1.45vw, 18.5px);
          line-height: 1.75;
          font-weight: 500;
          color: var(--text-muted);
          white-space: pre-line;
        }

        .details-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .list-item {
          display: flex;
          align-items: flex-start;
          font-size: clamp(15px, 1.35vw, 17.5px);
          line-height: 1.65;
          font-weight: 500;
          color: var(--text-muted);
        }

        .bullet-dot {
          color: var(--brand);
          font-size: 1.4rem;
          line-height: 1;
          margin-top: -3px;
          margin-right: 14px;
          flex-shrink: 0;
          user-select: none;
        }

        .item-desc {
          color: var(--text-soft);
        }

        .cta-section {
          text-align: center;
          padding-top: clamp(220px, 28vw, 360px);
          padding-bottom: 96px;
          max-width: 840px;
          margin: 120px auto 0;
          width: 100%;
        }

        .cta-heading {
          font-size: clamp(22px, 3vw, 32px);
          font-weight: 900;
          letter-spacing: -0.02em;
          color: var(--text-main);
          margin: 0 0 36px;
        }

        .cta-buttons {
          display: flex;
          justify-content: center;
          gap: 28px;
          flex-wrap: wrap;
        }

        .cta-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 190px;
          height: 56px;
          text-decoration: none;
          text-transform: uppercase;
          font-size: 14px;
          font-weight: 900;
          letter-spacing: 0.06em;
          transition: background-color 250ms ease, color 250ms ease, border-color 250ms ease, transform 250ms ease, box-shadow 250ms ease;
        }

        .cta-button.primary {
          background: var(--brand);
          color: #000000;
          border: 1px solid var(--brand);
          box-shadow: 0 8px 20px -6px color-mix(in srgb, var(--brand) 45%, transparent);
        }

        .cta-button.primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 14px 28px -4px color-mix(in srgb, var(--brand) 65%, transparent);
          background: color-mix(in srgb, var(--brand) 90%, #ffffff);
        }

        .project-page.is-light .cta-button.primary:hover {
          background: color-mix(in srgb, var(--brand) 90%, #000000);
          color: #ffffff;
        }

        .cta-button.secondary {
          background: transparent;
          color: var(--text-main);
          border: 1px solid color-mix(in srgb, var(--text-main) 25%, transparent);
        }

        .cta-button.secondary:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: var(--text-main);
          transform: translateY(-3px);
        }

        .project-page.is-light .cta-button.secondary:hover {
          background: rgba(36, 54, 18, 0.06);
        }

        @media (max-width: 900px) {
          .meta-info-bar {
            grid-template-columns: 1fr;
            gap: 20px;
            padding: 24px 0;
          }

          .splits-container {
            grid-template-columns: 1fr;
            gap: 56px;
            padding-top: 56px;
          }

          .details-grid {
            gap: 56px;
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
