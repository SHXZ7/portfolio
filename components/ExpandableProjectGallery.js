import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function ExpandableProjectGallery({ projects = [], theme = 'dark', className = '' }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  // Split projects into two rows
  const firstRowProjects = projects.slice(0, 4);
  const secondRowProjects = projects.slice(4, 7);

  const openProject = (index) => {
    setSelectedIndex(index);
  };

  const closeProject = () => {
    setSelectedIndex(null);
  };

  const goToNext = (e) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % projects.length);
    }
  };

  const goToPrev = (e) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + projects.length) % projects.length);
    }
  };

  const getFlexValue = (index, rowProjects, rowHoveredIndex) => {
    if (rowHoveredIndex === null) {
      return 1;
    }
    return rowHoveredIndex === index ? 2 : 0.5;
  };

  const renderProjectRow = (rowProjects, rowIndex) => {
    return (
      <div className="flex gap-3 h-[500px] w-full">
        {rowProjects.map((project, index) => {
          const globalIndex = rowIndex === 0 ? index : 4 + index;
          const isHovered = hoveredIndex === globalIndex;
          
          return (
            <motion.div
              key={project.id}
              className="relative cursor-pointer overflow-hidden rounded-2xl group"
              style={{ flex: 1 }}
              animate={{ flex: getFlexValue(index, rowProjects, hoveredIndex === null ? null : (rowIndex === 0 ? hoveredIndex : hoveredIndex - 4)) }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              onMouseEnter={() => setHoveredIndex(globalIndex)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => setSelectedIndex(globalIndex)}
            >
              {/* Project Background */}
              <div 
                className="w-full h-full absolute inset-0"
                style={{
                  background: project.gradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                }}
              />
              
              {/* Project Image */}
              {project.image && (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              )}

              {/* Dark Overlay - Theme Aware */}
              <motion.div
                className={`absolute inset-0 ${theme === 'dark' ? 'bg-black/60' : 'bg-white/70'}`}
                initial={{ opacity: 1 }}
                animate={{ opacity: isHovered ? (theme === 'dark' ? 0.3 : 0.5) : (theme === 'dark' ? 0.6 : 0.8) }}
                transition={{ duration: 0.3 }}
              />

              {/* Project Info */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between">
                {/* Top: Number */}
                <div className="flex justify-between items-start">
                  <span className={`text-sm font-bold ${theme === 'dark' ? 'text-[#C8FF5C]' : 'text-[#8ec438]'}`}>
                    0{project.id}
                  </span>
                  <motion.div
                    animate={{ 
                      opacity: isHovered ? 1 : 0,
                      scale: isHovered ? 1 : 0.8
                    }}
                    transition={{ duration: 0.3 }}
                    className={theme === 'dark' ? 'text-white' : 'text-gray-900'}
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </motion.div>
                </div>

                {/* Bottom: Title */}
                <div>
                  <motion.h3 
                    className={`font-black text-2xl mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
                    animate={{
                      fontSize: isHovered ? '28px' : '24px'
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {project.title}
                  </motion.h3>
                  <motion.p 
                    className={`text-sm line-clamp-2 ${theme === 'dark' ? 'text-white/80' : 'text-gray-800'}`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ 
                      opacity: isHovered ? 1 : 0,
                      height: isHovered ? 'auto' : 0
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {project.shortDescription}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={className}>
      {/* Two Row Layout */}
      <div className="space-y-3">
        {/* First Row - 4 Projects */}
        {renderProjectRow(firstRowProjects, 0)}
        
        {/* Second Row - 3 Projects */}
        {secondRowProjects.length > 0 && renderProjectRow(secondRowProjects, 1)}
      </div>

      {/* Expanded View Modal - Theme Aware */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-lg ${
              theme === 'dark' ? 'bg-black/70' : 'bg-white/70'
            }`}
            onClick={() => setSelectedIndex(null)}
          >
            {/* Close Button */}
            <button
              className={`absolute top-6 right-6 z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:rotate-90 ${
                theme === 'dark'
                  ? 'bg-white/10 hover:bg-white/20 text-white'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
              }`}
              onClick={() => setSelectedIndex(null)}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Project Details */}
            <motion.div
              className={`relative max-w-4xl w-full max-h-[85vh] overflow-y-auto rounded-3xl p-6 md:p-10 border ${
                theme === 'dark'
                  ? 'bg-gradient-to-br from-[#1a1a1a]/95 to-[#0d0d0d]/95 backdrop-blur-xl border-white/10'
                  : 'bg-white/95 backdrop-blur-xl border-gray-200'
              }`}
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Project Header */}
              <div className="mb-6">
                <span className={`text-xs font-bold uppercase tracking-wider ${
                  theme === 'dark' ? 'text-[#C8FF5C]' : 'text-[#8ec438]'
                }`}>
                  PROJECT {projects[selectedIndex].id}
                </span>
                <h2 className={`text-3xl md:text-4xl font-black mt-2 mb-3 leading-tight ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {projects[selectedIndex].title}
                </h2>
                <p className={`text-base leading-relaxed ${
                  theme === 'dark' ? 'text-white/70' : 'text-gray-700'
                }`}>
                  {projects[selectedIndex].description}
                </p>
              </div>

              {/* Features */}
              {projects[selectedIndex].features && (
                <div className="mb-6">
                  <h3 className={`text-xl font-bold mb-3 ${
                    theme === 'dark' ? 'text-[#C8FF5C]' : 'text-[#8ec438]'
                  }`}>
                    Key Features
                  </h3>
                  <ul className="space-y-2">
                    {projects[selectedIndex].features.map((feature, idx) => (
                      <li key={idx} className={`text-sm flex items-start gap-2 ${
                        theme === 'dark' ? 'text-white/70' : 'text-gray-700'
                      }`}>
                        <span className={`mt-1 flex-shrink-0 ${
                          theme === 'dark' ? 'text-[#C8FF5C]' : 'text-[#8ec438]'
                        }`}>•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tech Stack */}
              <div className="mb-6">
                <h3 className={`text-xl font-bold mb-3 ${
                  theme === 'dark' ? 'text-[#C8FF5C]' : 'text-[#8ec438]'
                }`}>
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {projects[selectedIndex].tech.map((tech, idx) => (
                    <span 
                      key={idx}
                      className={`px-3 py-1.5 border rounded-full text-xs transition-all duration-300 ${
                        theme === 'dark'
                          ? 'bg-white/5 border-white/10 text-white/80 hover:border-[#C8FF5C]/50 hover:text-[#C8FF5C]'
                          : 'bg-gray-100 border-gray-200 text-gray-800 hover:border-[#C8FF5C]/50 hover:text-[#8ec438] hover:bg-[#C8FF5C]/10'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Highlights */}
              {projects[selectedIndex].highlights && (
                <div className="mb-6">
                  <h3 className={`text-xl font-bold mb-3 ${
                    theme === 'dark' ? 'text-[#C8FF5C]' : 'text-[#8ec438]'
                  }`}>
                    ✨ Highlights
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {projects[selectedIndex].highlights.map((highlight, idx) => (
                      <div 
                        key={idx}
                        className={`border rounded-xl p-3 ${
                          theme === 'dark'
                            ? 'bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10'
                            : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                        <p className={`text-sm ${
                          theme === 'dark' ? 'text-white/80' : 'text-gray-700'
                        }`}>
                          {highlight}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Links */}
              {(projects[selectedIndex].github || projects[selectedIndex].demo) && (
                <div className={`flex flex-wrap gap-3 pt-4 border-t ${
                  theme === 'dark' ? 'border-white/10' : 'border-gray-200'
                }`}>
                  {projects[selectedIndex].github && (
                    <a
                      href={projects[selectedIndex].github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`px-5 py-2.5 border rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                        theme === 'dark'
                          ? 'bg-white/10 hover:bg-white/20 border-white/20 hover:border-[#C8FF5C]/50 text-white'
                          : 'bg-gray-100 hover:bg-gray-200 border-gray-200 hover:border-[#C8FF5C]/50 text-gray-900'
                      }`}
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      GitHub
                    </a>
                  )}
                  {projects[selectedIndex].demo && (
                    <a
                      href={projects[selectedIndex].demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`px-5 py-2.5 text-sm font-bold rounded-full transition-all duration-300 flex items-center gap-2 ${
                        theme === 'dark'
                          ? 'bg-[#C8FF5C] hover:bg-[#a8d949] text-[#1a1a1a]'
                          : 'bg-[#8ec438] hover:bg-[#7ab32e] text-white'
                      }`}
                    >
                      Live Demo
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
