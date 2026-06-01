'use client'

import Image from 'next/image'
import Link from 'next/link'
import { PROJECTS } from '@/lib/projectsData'

export default function ProjectsSection({ theme = 'dark' }) {
  const isDark = theme === 'dark'

  return (
    <section
      id="projects"
      className={`projects-stack-section scroll-mt-20 ${isDark ? 'is-dark' : 'is-light'}`}
    >
      <div className="projects-entry-shadow" aria-hidden="true" />

      <div className="projects-stack-header">
        <h2>Selected Projects</h2>
        <p className="projects-stack-subtitle">
          Explore my portfolio of data science, machine learning, and full-stack development projects. Hover to preview, click to view details.
        </p>
      </div>

      <div className="projects-stack-list">
        {PROJECTS.filter(p => p.id !== '03').map((project, index, arr) => (
          <StickyProject
            key={project.id}
            project={project}
            index={index}
            total={arr.length}
            isReversed={index % 2 === 1}
          />
        ))}
      </div>

      <style jsx>{`
        .projects-stack-section {
          --page-bg: #030800;
          --surface-bg: #030800;
          --brand: #C8FF5C;
          --brand-strong: #C8FF5C;
          --text-main: #f8f8f6;
          --text-muted: rgba(248, 248, 246, 0.62);
          --text-soft: rgba(248, 248, 246, 0.42);
          background: var(--page-bg);
          color: var(--text-main);
          font-family: inherit;
          position: relative;
          overflow: visible;
          transition: background-color 700ms ease, color 700ms ease;
        }

        .projects-entry-shadow {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: clamp(120px, 15vw, 240px);
          pointer-events: none;
          z-index: 0;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.95) 0%,
            rgba(0, 0, 0, 0.6) 32%,
            rgba(0, 0, 0, 0) 100%
          );
        }

        :global(html) {
          scroll-behavior: smooth;
        }

        .projects-stack-section.is-light {
          --page-bg: #f3f4f6;
          --surface-bg: #f3f4f6;
          --brand: #8ec438;
          --brand-strong: #2f4619;
          --text-main: #243612;
          --text-muted: rgba(36, 54, 18, 0.64);
          --text-soft: rgba(36, 54, 18, 0.42);
        }

        .projects-stack-section.is-light .projects-entry-shadow {
          background: linear-gradient(
            to bottom,
            rgba(229, 231, 235, 0.94) 0%,
            rgba(229, 231, 235, 0.74) 32%,
            rgba(229, 231, 235, 0) 100%
          );
        }

        .projects-stack-header {
          position: relative;
          z-index: 1;
          max-width: 1480px;
          margin: 0 auto;
          padding: clamp(72px, 9vw, 128px) clamp(24px, 6vw, 72px) clamp(54px, 7vw, 96px);
        }

        .projects-stack-header h2 {
          margin: 0;
          color: #ffffff;
          font-size: clamp(36px, 6vw, 68px);
          font-weight: 900;
          letter-spacing: -0.03em;
          line-height: 1.05;
        }

        .projects-stack-subtitle {
          margin: 16px 0 0;
          color: var(--text-muted);
          font-size: clamp(16px, 1.45vw, 18px);
          font-weight: 500;
          line-height: 1.625;
          max-width: 768px;
        }

        .projects-stack-section.is-light .projects-stack-header h2 {
          color: #000000;
        }

        .projects-stack-list {
          position: relative;
          z-index: 1;
          overflow: visible;
          isolation: isolate;
        }

        @media (max-width: 900px) {
          .projects-stack-header {
            padding: 48px 20px 24px;
          }
          .projects-stack-header h2 {
            font-size: 32px;
          }
          .projects-stack-subtitle {
            font-size: 14px;
            margin-top: 8px;
          }
        }
      `}</style>
    </section>
  )
}

function StickyProject({ project, index, total, isReversed }) {
  const hasShadow = index > 0

  return (
    <article
      className={`project-sticky-card ${hasShadow ? 'has-shadow' : ''}`}
      style={{
        zIndex: 20 + index
      }}
    >
      <div className={`project-layout ${isReversed ? 'is-reversed' : ''}`}>
        <ProjectImage project={project} priority={index < 2} />
        <ProjectInfo project={project} index={index} total={total} />
      </div>

      <style jsx>{`
        .project-sticky-card {
          position: sticky;
          top: 0;
          height: 100vh;
          background: var(--surface-bg);
          display: flex;
          align-items: center;
          overflow: hidden;
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
          will-change: transform;
          contain: paint;
        }

        .project-sticky-card.has-shadow {
          box-shadow: var(--shadow-effect);
        }

        .project-layout {
          width: min(1480px, 100%);
          margin: 0 auto;
          display: grid;
          grid-template-columns: minmax(0, 1.18fr) minmax(360px, 0.82fr);
          align-items: center;
          gap: clamp(48px, 6vw, 96px);
          padding: clamp(54px, 7vw, 92px) clamp(24px, 6vw, 72px);
          transform: translate3d(0, 0, 0);
        }

        .project-layout.is-reversed {
          grid-template-columns: minmax(360px, 0.82fr) minmax(0, 1.18fr);
        }

        .project-layout.is-reversed :global(.project-image-shell) {
          order: 2;
        }

        .project-layout.is-reversed :global(.project-info) {
          order: 1;
        }

        @media (max-width: 900px) {
          .project-sticky-card {
            position: relative;
            height: auto;
            min-height: auto;
          }

          .project-layout,
          .project-layout.is-reversed {
            grid-template-columns: 1fr;
            gap: 20px;
            padding: 24px 16px 40px;
          }

          .project-layout.is-reversed :global(.project-image-shell),
          .project-layout.is-reversed :global(.project-info) {
            order: initial;
          }
        }
      `}</style>
    </article>
  )
}

function ProjectImage({ project, priority }) {
  return (
    <Link href={`/project/${project.slug}`} style={{ display: 'block', width: '100%' }}>
      <div className="project-image-shell">
        <Image
          src={project.previewImage || project.image}
          alt={`${project.title} project preview`}
          fill
          priority={priority}
          sizes="(max-width: 900px) 100vw, 58vw"
          className="project-image"
        />
        <div className="project-image-number">/ Project {project.id}</div>

      <style jsx>{`
        .project-image-shell {
          position: relative;
          width: 100%;
          aspect-ratio: 1.55 / 1;
          min-height: 420px;
          overflow: hidden;
          background: var(--page-bg);
        }

        .project-image-shell :global(.project-image) {
          object-fit: cover;
          object-position: center;
          transform: scale(1.01);
          transition: transform 700ms ease, filter 700ms ease;
        }

        .project-image-shell:hover :global(.project-image) {
          transform: scale(1.045);
          filter: saturate(1.08);
        }

        .project-image-number {
          position: absolute;
          left: 28px;
          top: 24px;
          color: rgba(255, 255, 255, 0.48);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        @media (max-width: 900px) {
          .project-image-shell {
            min-height: auto;
            aspect-ratio: 1.6 / 1;
          }
        }
      `}</style>
    </div>
  </Link>
  )
}

function ProjectInfo({ project, index, total }) {
  const hasGitHub = project.github && project.github !== '#'

  return (
    <div className="project-info">
      <div className="project-rule" />

      <div className="project-tags">
        {project.tags.map((tag) => (
          <span key={tag}>
            {tag}
          </span>
        ))}
      </div>

      <h3>
        <Link href={`/project/${project.slug}`} className="project-title-link">
          {project.title}
        </Link>
      </h3>
      <p className="project-subtitle">{project.subtitle}</p>
      <p className="project-description">{project.description}</p>

      <div className="project-stack">
        {project.stack.map((tech) => (
          <span key={tech}>{tech}</span>
        ))}
      </div>

      <div className="project-actions">
        <Link href={`/project/${project.slug}`} className="project-btn-details">
          Details
        </Link>
        {project.live && (
          <a href={project.live} target="_blank" rel="noopener noreferrer">
            Demo
          </a>
        )}
        {hasGitHub && (
          <a href={project.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        )}
      </div>

      <div className="project-progress" aria-hidden="true">
        {Array.from({ length: total }).map((_, i) => (
          <span
            key={i}
            style={{
              width: i === index ? 22 : 6,
              background: i === index ? 'var(--brand)' : 'var(--text-soft)'
            }}
          />
        ))}
      </div>

      <style jsx>{`
        .project-info {
          position: relative;
          color: var(--text-main);
          min-height: 420px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .project-rule {
          width: min(100%, 520px);
          height: 1.5px;
          margin-bottom: 42px;
          background: var(--brand);
          box-shadow: 0 0 18px color-mix(in srgb, var(--brand) 24%, transparent);
        }

        .project-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 20px;
        }

        .project-tags span {
          border: 1px solid color-mix(in srgb, var(--brand) 38%, transparent);
          border-radius: 999px;
          padding: 5px 12px;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--brand);
          background: color-mix(in srgb, var(--brand) 7%, transparent);
        }

        h3 {
          margin: 0 0 18px;
          color: var(--text-main);
          font-size: clamp(42px, 5vw, 76px);
          font-weight: 900;
          line-height: 0.96;
          letter-spacing: 0;
        }

        h3 :global(a) {
          color: inherit;
          text-decoration: none;
          transition: color 200ms ease;
        }

        h3 :global(a):hover {
          color: var(--brand);
        }

        .project-subtitle {
          margin: 0 0 24px;
          color: var(--text-muted);
          font-size: clamp(15px, 1.45vw, 22px);
          font-weight: 700;
          line-height: 1.35;
        }

        .project-description {
          margin: 0 0 28px;
          max-width: 560px;
          color: var(--text-muted);
          font-size: 15px;
          line-height: 1.7;
          font-weight: 500;
        }

        .project-stack {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          max-width: 580px;
          margin-bottom: 34px;
        }

        .project-stack span {
          border: 1px solid color-mix(in srgb, var(--text-main) 10%, transparent);
          border-radius: 4px;
          color: var(--text-soft);
          padding: 6px 10px;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .project-actions {
          display: flex;
          gap: 14px;
          align-items: center;
        }

        .project-actions a {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 82px;
          height: 48px;
          border: 1px solid var(--brand);
          color: var(--brand);
          text-decoration: none;
          text-transform: uppercase;
          font-size: 20px;
          font-weight: 900;
          letter-spacing: 0;
          transition: background 220ms ease, color 220ms ease, transform 220ms ease;
        }

        .project-actions a:hover {
          background: var(--brand);
          color: #000;
          transform: translateY(-2px);
        }

        .project-progress {
          position: absolute;
          right: 0;
          bottom: 0;
          display: flex;
          gap: 7px;
          align-items: center;
        }

        .project-progress span {
          height: 2px;
          border-radius: 999px;
          transition: width 260ms ease, background 260ms ease;
        }

        @media (max-width: 900px) {
          .project-info {
            min-height: auto;
          }

          .project-rule {
            margin-bottom: 16px;
          }

          .project-tags {
            margin-bottom: 12px;
          }

          h3 {
            font-size: 28px;
            margin-bottom: 10px;
          }

          .project-subtitle {
            font-size: 15px;
            margin-bottom: 14px;
          }

          .project-description {
            font-size: 13.5px;
            margin-bottom: 20px;
            line-height: 1.6;
          }

          .project-stack {
            margin-bottom: 24px;
            gap: 6px;
          }

          .project-stack span {
            padding: 4px 8px;
            font-size: 9px;
          }

          .project-actions a {
            height: 38px;
            min-width: 68px;
            font-size: 14px;
          }

          .project-progress {
            position: relative;
            right: auto;
            bottom: auto;
            margin-top: 24px;
          }
        }
      `}</style>
    </div>
  )
}
