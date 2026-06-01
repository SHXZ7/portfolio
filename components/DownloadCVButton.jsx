"use client"

import { useState } from "react"

export default function DownloadCVButton({ theme = "dark" }) {
  const [status, setStatus]     = useState("idle")   // idle | loading | done
  const [progress, setProgress] = useState(0)

  const isDark = theme === "dark"
  
  // Custom theme-based colors to guarantee perfect contrast on light cream backgrounds
  const ACCENT   = isDark ? "#C8FF5C" : "#3b522a" // Rich moss green in light mode
  const ACCENT_D = isDark ? "#a8e63c" : "#233319"

  const handleDownload = () => {
    if (status !== "idle") return
    setStatus("loading")
    setProgress(0)

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setStatus("done")
          setTimeout(() => {
            setStatus("idle")
            setProgress(0)
          }, 2200)
          return 100
        }
        return prev + 8
      })
    }, 80)

    try {
      const a = document.createElement("a")
      a.href = "/cv/shaaz.pdf"
      a.download = "Mohammed_Shaaz_CV.pdf"
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    } catch (e) {
      console.error(e)
    }
  }

  // SVG ring params
  const R   = 11
  const C   = 2 * Math.PI * R          // circumference ≈ 69.1
  const dash = (progress / 100) * C

  return (
    <>
      <button
        onClick={handleDownload}
        disabled={status === "loading"}
        style={{
          position:        "relative",
          display:         "inline-flex",
          alignItems:      "center",
          justifyContent:  "center",
          width:           "40px",
          height:          "40px",
          borderRadius:    "50%",
          border:          `1.5px solid ${isDark ? "rgba(200,255,92,0.35)" : "rgba(59,82,42,0.40)"}`,
          background:      isDark
            ? "rgba(200,255,92,0.06)"
            : "rgba(59,82,42,0.08)",
          cursor:          status === "loading" ? "default" : "pointer",
          backdropFilter:  "blur(12px)",
          transition:      "border-color 0.25s, box-shadow 0.25s, background 0.25s",
          overflow:        "hidden",
          userSelect:      "none",
          outline:         "none",
          padding:         0,
        }}
        onMouseEnter={(e) => {
          if (status !== "loading") {
            e.currentTarget.style.borderColor  = ACCENT
            e.currentTarget.style.background   = isDark ? "rgba(200,255,92,0.12)" : "rgba(59,82,42,0.15)"
            e.currentTarget.style.boxShadow    = isDark 
              ? `0 0 15px rgba(200,255,92,0.25)` 
              : `0 0 15px rgba(59,82,42,0.20)`
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor  = isDark ? "rgba(200,255,92,0.35)" : "rgba(59,82,42,0.40)"
          e.currentTarget.style.background   = isDark ? "rgba(200,255,92,0.06)" : "rgba(59,82,42,0.08)"
          e.currentTarget.style.boxShadow    = "none"
        }}
        aria-label="Download CV"
      >
        {/* ── Progress fill overlay ── */}
        {status === "loading" && (
          <span
            style={{
              position:   "absolute",
              bottom:     0,
              left:       0,
              height:     "100%",
              width:      "100%",
              background: isDark ? "rgba(200,255,92,0.03)" : "rgba(59,82,42,0.04)",
              pointerEvents: "none",
            }}
          />
        )}

        {/* ── Icon / Ring Centered ── */}
        <span
          style={{
            width: 24, height: 24,
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
            flexShrink:     0,
            position:       "relative",
          }}
        >
          {/* IDLE — download arrow */}
          {status === "idle" && (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 2v8M5 7l3 3 3-3" stroke={ACCENT}
                strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 13h12" stroke={ACCENT}
                strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          )}

          {/* LOADING — circular progress ring */}
          {status === "loading" && (
            <div style={{ position: "relative", width: 24, height: 24 }}>
              <svg width="24" height="24" viewBox="0 0 28 28" style={{ transform: "rotate(-90deg)", position: "absolute", top: -2, left: -2 }}>
                {/* track */}
                <circle cx="14" cy="14" r={R}
                  fill="none" stroke={isDark ? "rgba(200,255,92,0.12)" : "rgba(59,82,42,0.12)"} strokeWidth="2"/>
                {/* progress */}
                <circle cx="14" cy="14" r={R}
                  fill="none"
                  stroke={ACCENT}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray={`${dash} ${C}`}
                  style={{ transition: "stroke-dasharray 0.12s linear",
                    filter: `drop-shadow(0 0 3px ${ACCENT})` }}
                />
              </svg>
              {/* Percent number inside the circle */}
              <span style={{
                position: "absolute",
                top: 0, left: 0, width: "100%", height: "100%",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "8.5px", fontWeight: 800, color: ACCENT
              }}>
                {progress}
              </span>
            </div>
          )}

          {/* DONE — animated checkmark */}
          {status === "done" && (
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
              <polyline
                points="3,9 7,13 15,5"
                stroke={ACCENT}
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  strokeDasharray: 24,
                  strokeDashoffset: 0,
                  animation: "cvCheckDraw 0.4s ease forwards",
                }}
              />
            </svg>
          )}
        </span>
      </button>

      <style jsx global>{`
        @keyframes cvCheckDraw {
          from { stroke-dashoffset: 24; }
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </>
  )
}
