"use client"

import { useState } from "react"

export default function DownloadCVButton({ theme = "dark" }) {
  const [downloadStatus, setDownloadStatus] = useState("idle")
  const [progress, setProgress] = useState(0)

  const handleDownload = async () => {
    setDownloadStatus("downloading")
    setProgress(0)

    // Simulate download progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setDownloadStatus("downloaded")
          setTimeout(() => {
            setDownloadStatus("complete")
            setTimeout(() => setDownloadStatus("idle"), 1000)
          }, 1500)
          return 100
        }
        return prev + 10
      })
    }, 100)

    // Actual download logic
    try {
      const link = document.createElement('a')
      link.href = '/cv/shaaz.pdf'
      link.download = 'shaaz.pdf'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error('Download failed:', error)
      setDownloadStatus("idle")
      clearInterval(interval)
    }
  }

  return (
    <button
      onClick={handleDownload}
      className={`relative overflow-hidden backdrop-blur-xl border transition-all duration-300 shadow-lg group ${
        theme === "dark"
          ? "bg-[#1a1a1a]/30 border-white/10 hover:border-[#C8FF5C]/50 shadow-black/20 hover:shadow-[#C8FF5C]/20"
          : "bg-white/90 border-gray-200/50 hover:border-[#C8FF5C]/60 shadow-gray-200/50 hover:shadow-[#C8FF5C]/30"
      } ${downloadStatus === "downloading" && "pointer-events-none"} rounded-lg px-3 py-2 sm:px-4 sm:py-2.5 md:px-6 md:py-3`}
      disabled={downloadStatus !== "idle" && downloadStatus !== "complete"}
    >
      {/* Subtle gradient overlay */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
          theme === "dark"
            ? "bg-gradient-to-b from-white/[0.03] to-transparent"
            : "bg-gradient-to-b from-gray-50/50 to-transparent"
        }`}
      />

      {/* Hover gradient effect */}
      <div 
        className={`absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 pointer-events-none ${
          theme === "dark"
            ? "bg-gradient-to-r from-[#C8FF5C]/5 to-transparent"
            : "bg-gradient-to-r from-[#C8FF5C]/10 to-transparent"
        }`}
      />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center gap-1.5 sm:gap-2">
        {downloadStatus === "idle" && (
          <>
            <svg className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-300 ${
              theme === "dark" 
                ? "text-white/60 group-hover:text-[#C8FF5C]" 
                : "text-gray-600 group-hover:text-[#8ec438]"
            }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className={`font-bold text-xs sm:text-sm transition-colors duration-300 ${
              theme === "dark" 
                ? "text-white/80 group-hover:text-[#C8FF5C]" 
                : "text-gray-800 group-hover:text-[#8ec438]"
            }`}>
              <span className="hidden sm:inline">Download CV</span>
              <span className="sm:hidden">CV</span>
            </span>
          </>
        )}
        
        {downloadStatus === "downloading" && (
          <>
            <svg className={`w-4 h-4 sm:w-5 sm:h-5 animate-spin ${
              theme === "dark" ? "text-[#C8FF5C]" : "text-[#8ec438]"
            }`} fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className={`font-bold text-xs sm:text-sm ${
              theme === "dark" ? "text-[#C8FF5C]" : "text-[#8ec438]"
            }`}>
              {progress}%
            </span>
          </>
        )}
        
        {downloadStatus === "downloaded" && (
          <>
            <svg className={`w-4 h-4 sm:w-5 sm:h-5 ${
              theme === "dark" ? "text-[#C8FF5C]" : "text-[#8ec438]"
            }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className={`font-bold text-xs sm:text-sm ${
              theme === "dark" ? "text-[#C8FF5C]" : "text-[#8ec438]"
            }`}>
              Done
            </span>
          </>
        )}
        
        {downloadStatus === "complete" && (
          <>
            <svg className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-300 ${
              theme === "dark" 
                ? "text-white/60 group-hover:text-[#C8FF5C]" 
                : "text-gray-600 group-hover:text-[#8ec438]"
            }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className={`font-bold text-xs sm:text-sm transition-colors duration-300 ${
              theme === "dark" 
                ? "text-white/80 group-hover:text-[#C8FF5C]" 
                : "text-gray-800 group-hover:text-[#8ec438]"
            }`}>
              <span className="hidden sm:inline">Download CV</span>
              <span className="sm:hidden">CV</span>
            </span>
          </>
        )}
      </div>

      {/* Download Progress Bar */}
      {downloadStatus === "downloading" && (
        <div
          className={`absolute bottom-0 left-0 h-1 transition-all duration-200 ease-in-out ${
            theme === "dark" ? "bg-[#C8FF5C]" : "bg-[#8ec438]"
          }`}
          style={{ width: `${progress}%` }}
        />
      )}
    </button>
  )
}
