import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

export function ExpandableProjectGallery({ projects, theme = 'dark', className = '' }) {
  const [expandedProject, setExpandedProject] = useState(null)

  return (
    <>
      {/* Backdrop Modal for Expanded Project */}
      <AnimatePresence>
        {expandedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            onClick={() => setExpandedProject(null)}
          >
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`absolute inset-0 backdrop-blur-lg transition-colors duration-700 ${
                theme === 'dark' ? 'bg-black/85' : 'bg-white/85'
              }`} 
            />
            
            {/* Modal Content */}
            {projects.filter(p => p.id === expandedProject).map((project) => (
              <motion.div 
                key={project.id}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className={`relative rounded-[32px] p-8 md:p-12 max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl transition-colors duration-700 ${
                  theme === 'dark'
                    ? 'bg-[#1a1a1a]/98 border border-white/10'
                    : 'bg-white/98 border border-gray-200 backdrop-blur-xl'
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setExpandedProject(null)}
                  className={`absolute top-6 right-6 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:rotate-90 ${
                    theme === 'dark'
                      ? 'bg-white/10 hover:bg-white/20 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Project Header */}
                <div className="mb-8">
                  <span className="text-xs font-bold text-[#C8FF5C] uppercase tracking-wider mb-2 block">
                    Project {project.id} • {project.category}
                  </span>
                  <h2 className={`text-3xl md:text-4xl font-black mb-4 tracking-tight ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {project.title}
                  </h2>
                  <p className={`text-lg mb-6 leading-relaxed ${
                    theme === 'dark' ? 'text-white/70' : 'text-gray-700'
                  }`}>
                    {project.description}
                  </p>
                </div>

                {/* Key Features */}
                <div className="mb-8">
                  <h3 className={`text-xl font-bold mb-4 ${
                    theme === 'dark' ? 'text-[#C8FF5C]' : 'text-[#8ec438]'
                  }`}>
                    Key Features
                  </h3>
                  <ul className="space-y-3">
                    {project.features.map((feature, index) => (
                      <li key={index} className={`flex items-start gap-3 ${
                        theme === 'dark' ? 'text-white/70' : 'text-gray-700'
                      }`}>
                        <span className="text-[#C8FF5C] mt-1 flex-shrink-0">•</span>
                        <span className="text-sm leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack */}
                <div className="mb-8">
                  <h3 className={`text-xl font-bold mb-4 ${
                    theme === 'dark' ? 'text-[#C8FF5C]' : 'text-[#8ec438]'
                  }`}>
                    Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span 
                        key={tech}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                          theme === 'dark'
                            ? 'bg-white/5 text-white/80 border border-white/10 hover:border-[#C8FF5C]/50 hover:text-[#C8FF5C]'
                            : 'bg-gray-100 text-gray-800 border border-gray-200 hover:border-[#C8FF5C]/50 hover:text-[#8ec438] hover:bg-[#C8FF5C]/10'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Project Highlights */}
                {project.highlights && project.highlights.length > 0 && (
                  <div className="mb-8">
                    <h3 className={`text-xl font-bold mb-4 ${
                      theme === 'dark' ? 'text-[#C8FF5C]' : 'text-[#8ec438]'
                    }`}>
                      Highlights
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {project.highlights.map((highlight, index) => (
                        <div 
                          key={index}
                          className={`p-4 rounded-xl transition-all duration-300 ${
                            theme === 'dark'
                              ? 'bg-white/5 border border-white/10 hover:border-[#C8FF5C]/30'
                              : 'bg-gray-50 border border-gray-200 hover:border-[#C8FF5C]/50'
                          }`}
                        >
                          <p className={`text-sm leading-relaxed ${
                            theme === 'dark' ? 'text-white/70' : 'text-gray-700'
                          }`}>
                            {highlight}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  {project.github !== '#' && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-6 py-3 rounded-xl text-center font-bold transition-all duration-300 bg-[#C8FF5C] text-black hover:bg-[#C8FF5C]/90 hover:scale-105 shadow-lg hover:shadow-[#C8FF5C]/20"
                    >
                      View on GitHub
                    </a>
                  )}
                  {project.demo !== '#' && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex-1 px-6 py-3 rounded-xl text-center font-bold transition-all duration-300 border-2 hover:scale-105 ${
                        theme === 'dark'
                          ? 'border-[#C8FF5C] text-[#C8FF5C] hover:bg-[#C8FF5C]/10'
                          : 'border-[#8ec438] text-[#8ec438] hover:bg-[#8ec438]/10'
                      }`}
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project Cards Grid */}
      <div className={className}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                theme === 'dark'
                  ? 'bg-gradient-to-br from-[#1a1a1a]/80 to-[#0d0d0d]/60 border border-white/10 hover:border-[#C8FF5C]/40 hover:shadow-[#C8FF5C]/10'
                  : 'bg-white border border-gray-200 hover:border-[#C8FF5C]/60 hover:shadow-[#C8FF5C]/20'
              }`}
              onClick={() => setExpandedProject(project.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Gradient Overlay */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                style={{ background: project.gradient }}
              />

              {/* Project Card Content */}
              <div className="relative p-6">
                {/* Category Badge */}
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    theme === 'dark'
                      ? 'bg-[#C8FF5C]/20 text-[#C8FF5C]'
                      : 'bg-[#C8FF5C]/30 text-[#8ec438]'
                  }`}>
                    {project.category}
                  </span>
                </div>

                <h3 className={`text-xl font-bold mb-3 transition-colors duration-300 pr-20 ${
                  theme === 'dark' 
                    ? 'text-white group-hover:text-[#C8FF5C]' 
                    : 'text-gray-900 group-hover:text-[#8ec438]'
                }`}>
                  {project.title}
                </h3>
                
                <p className={`text-sm mb-4 transition-colors duration-300 line-clamp-2 ${
                  theme === 'dark' ? 'text-white/70' : 'text-gray-600'
                }`}>
                  {project.shortDescription}
                </p>

                {/* Tech Stack Preview (First 3) */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.slice(0, 3).map((tech) => (
                    <span 
                      key={tech}
                      className={`px-3 py-1 rounded-lg text-xs font-medium transition-all duration-300 ${
                        theme === 'dark'
                          ? 'bg-white/5 text-white/70 border border-white/10'
                          : 'bg-gray-100 text-gray-700 border border-gray-200'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span 
                      className={`px-3 py-1 rounded-lg text-xs font-medium ${
                        theme === 'dark' ? 'text-white/50' : 'text-gray-500'
                      }`}
                    >
                      +{project.tech.length - 3} more
                    </span>
                  )}
                </div>

                {/* View Details Button */}
                <button className={`w-full py-2 px-4 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                  theme === 'dark'
                    ? 'bg-white/5 text-white/80 hover:bg-[#C8FF5C]/20 hover:text-[#C8FF5C] border border-white/10 hover:border-[#C8FF5C]/30'
                    : 'bg-gray-100 text-gray-800 hover:bg-[#C8FF5C]/20 hover:text-[#8ec438] border border-gray-200 hover:border-[#C8FF5C]/30'
                }`}>
                  View Details
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  )
}