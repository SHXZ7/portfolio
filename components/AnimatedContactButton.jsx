"use client"

import * as React from "react"
import { motion } from "framer-motion"

export default function AnimatedContactButton({ theme = 'dark' }) {
  const [isHovered, setIsHovered] = React.useState(false)

  const scrollToContact = (e) => {
    e.preventDefault()
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <a 
      href="#contact" 
      onClick={scrollToContact}
      className="block"
    >
      <motion.div
        initial={{ width: 48, height: 48 }}
        whileHover={{ width: 140 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`flex items-center justify-center overflow-hidden relative backdrop-blur-xl shadow-lg cursor-pointer transition-colors duration-300 ${
          theme === 'dark'
            ? 'bg-[#C8FF5C]/90 hover:bg-[#C8FF5C] border border-[#C8FF5C]/30'
            : 'bg-[#8ec438]/90 hover:bg-[#8ec438] border border-[#8ec438]/30'
        }`}
        style={{ borderRadius: 24 }}
      >
        {/* Icon - shows when not hovered */}
        <motion.div
          className="absolute"
          animate={{ 
            opacity: isHovered ? 0 : 1,
            scale: isHovered ? 0.8 : 1
          }}
          transition={{ duration: 0.2 }}
        >
          <svg 
            className={`w-5 h-5 ${theme === 'dark' ? 'text-[#1a1a1a]' : 'text-white'}`}
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2.5} 
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
            />
          </svg>
        </motion.div>

        {/* Text - shows when hovered */}
        <motion.div
          className="w-full flex justify-center items-center gap-1.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2, delay: isHovered ? 0.1 : 0 }}
        >
          <span className={`text-sm font-black whitespace-nowrap ${
            theme === 'dark' ? 'text-[#1a1a1a]' : 'text-white'
          }`}>
            Contact
          </span>
          <svg 
            className={`w-4 h-4 ${theme === 'dark' ? 'text-[#1a1a1a]' : 'text-white'}`}
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2.5} 
              d="M14 5l7 7m0 0l-7 7m7-7H3" 
            />
          </svg>
        </motion.div>

        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          animate={{
            x: isHovered ? ['-100%', '100%'] : '-100%'
          }}
          transition={{
            duration: 0.6,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </a>
  )
}
