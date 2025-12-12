import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const router = useRouter()
  const [hoveredItem, setHoveredItem] = useState(null)
  const [blobPosition, setBlobPosition] = useState({ x: 0, y: 0, width: 0, height: 0 })
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  const isActive = (path) => {
    return router.pathname === path
  }

  const handleMouseEnter = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const parentRect = e.currentTarget.closest('nav').getBoundingClientRect()
    
    setBlobPosition({
      x: rect.left - parentRect.left + rect.width / 2,
      y: rect.top - parentRect.top + rect.height / 2,
      width: rect.width,
      height: rect.height
    })
    setHoveredItem(e.currentTarget.dataset.item)
  }

  const handleMouseLeave = () => {
    setHoveredItem(null)
  }

  // Add useEffect to handle client-side mounting
  useState(() => {
    setMounted(true)
  }, [])

  return (
    <>
      {/* Desktop Navbar */}
      <div className="hidden md:block fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[55%]">
        <header className="bg-black/30 backdrop-blur-xl text-white relative overflow-hidden rounded-[45px] border border-white/30 shadow-2xl shadow-black/50">
          {/* Glass effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 rounded-[45px]" />
          
          {/* Subtle inner border for depth */}
          <div className="absolute inset-[1px] rounded-[44px] border border-white/10" />
          
          {/* Grainy texture overlay */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '200px 200px'
          }} />
          
          <nav className="px-6 relative z-10">
            {/* Fluid Glass Blob - Enhanced */}
            {mounted && (
              <>
                <motion.div
                  className="absolute pointer-events-none rounded-full"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{
                    opacity: hoveredItem ? 1 : 0,
                    scale: hoveredItem ? 1 : 0.5,
                    left: blobPosition.x,
                    top: blobPosition.y,
                    width: blobPosition.width + 32,
                    height: blobPosition.height + 20,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 35,
                    mass: 0.5,
                    opacity: { duration: 0.3 },
                    scale: { duration: 0.3 }
                  }}
                  style={{
                    background: 'radial-gradient(ellipse, rgba(34, 211, 238, 0.4) 0%, rgba(6, 182, 212, 0.3) 30%, rgba(8, 145, 178, 0.15) 60%, transparent 100%)',
                    filter: 'blur(20px) saturate(1.5)',
                    boxShadow: '0 0 60px rgba(34, 211, 238, 0.6), 0 0 100px rgba(6, 182, 212, 0.3), inset 0 0 30px rgba(34, 211, 238, 0.3)',
                    transform: 'translate(-50%, -50%)',
                    mixBlendMode: 'screen',
                  }}
                >
                  {/* Inner glow layer */}
                  <div 
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: 'radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 70%)',
                      filter: 'blur(8px)',
                    }}
                  />
                </motion.div>

                {/* Secondary blur layer for depth */}
                <motion.div
                  className="absolute pointer-events-none rounded-full"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: hoveredItem ? 0.6 : 0,
                    left: blobPosition.x,
                    top: blobPosition.y,
                    width: blobPosition.width + 48,
                    height: blobPosition.height + 28,
                }}
                transition={{
                  type: "spring",
                  stiffness: 350,
                  damping: 40,
                  opacity: { duration: 0.4 }
                }}
                style={{
                  background: 'radial-gradient(ellipse, rgba(34, 211, 238, 0.2) 0%, transparent 70%)',
                  filter: 'blur(30px)',
                  transform: 'translate(-50%, -50%)',
                }}
                />
              </>
            )}

            <div className="flex items-center h-[75px]">
              {/* Profile Icon */}
              <div className="ml-2">
                <div className="w-[48px] h-[48px] rounded-full overflow-hidden border-white">
                  <Image 
                    src="/photo.jpg" 
                    alt="Profile" 
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Navigation Links */}
              <ul className="flex items-center ml-14 space-x-10">
                <li>
                  <Link 
                    href="/" 
                    data-item="home"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={handleMouseEnter}
                    onTouchEnd={handleMouseLeave}
                    className={`transition-colors font-medium text-[15px] relative z-10 ${
                      isActive('/') 
                        ? 'text-white drop-shadow-lg' 
                        : 'text-gray-300 hover:text-white drop-shadow-md'
                    }`}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/about" 
                    data-item="about"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={handleMouseEnter}
                    onTouchEnd={handleMouseLeave}
                    className={`transition-colors font-medium text-[15px] relative z-10 ${
                      isActive('/about') 
                        ? 'text-white drop-shadow-lg' 
                        : 'text-gray-300 hover:text-white drop-shadow-md'
                    }`}
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/blogs" 
                    data-item="Certifications"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={handleMouseEnter}
                    onTouchEnd={handleMouseLeave}
                    className={`transition-colors font-medium text-[15px] relative z-10 ${
                      isActive('/blogs') 
                        ? 'text-white drop-shadow-lg' 
                        : 'text-gray-300 hover:text-white drop-shadow-md'
                    }`}
                  >
                    Achievements
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/projects" 
                    data-item="projects"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={handleMouseEnter}
                    onTouchEnd={handleMouseLeave}
                    className={`transition-colors font-medium text-[15px] relative z-10 ${
                      isActive('/projects') 
                        ? 'text-white drop-shadow-lg' 
                        : 'text-gray-300 hover:text-white drop-shadow-md'
                    }`}
                  >
                    Projects
                  </Link>
                </li>
              </ul>

              {/* Contact Button - Far Right */}
              <div className="ml-auto mr-2">
                <Link 
                  href="/contact" 
                  data-item="contact"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onTouchStart={handleMouseEnter}
                  onTouchEnd={handleMouseLeave}
                  className="bg-white text-black px-7 py-2.5 rounded-full hover:bg-gray-100 transition-colors font-medium text-[15px] inline-block shadow-lg relative z-10"
                >
                  Contact
                </Link>
              </div>
            </div>
          </nav>
        </header>
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden fixed top-4 left-4 right-4 z-50">
        <header className="bg-black/30 backdrop-blur-xl text-white relative overflow-hidden rounded-3xl border border-white/30 shadow-2xl shadow-black/50">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 rounded-3xl" />
          <div className="absolute inset-[1px] rounded-[23px] border border-white/10" />
          
          <nav className="px-4 py-3 relative z-10">
            <div className="flex items-center justify-between">
              {/* Profile Icon */}
              <div className="w-[40px] h-[40px] rounded-full overflow-hidden border-white">
                <Image 
                  src="/photo.jpg" 
                  alt="Profile" 
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Hamburger Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="relative w-8 h-8 flex items-center justify-center z-50"
                aria-label="Toggle menu"
              >
                <div className="flex flex-col items-center justify-center gap-1.5">
                  <motion.span
                    animate={mobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                    className="w-6 h-0.5 bg-white rounded-full"
                  />
                  <motion.span
                    animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                    className="w-6 h-0.5 bg-white rounded-full"
                  />
                  <motion.span
                    animate={mobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                    className="w-6 h-0.5 bg-white rounded-full"
                  />
                </div>
              </button>
            </div>
          </nav>
        </header>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 mt-2 bg-black/30 backdrop-blur-xl rounded-3xl border border-white/30 shadow-2xl shadow-black/50 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 rounded-3xl" />
              <div className="absolute inset-[1px] rounded-[23px] border border-white/10" />
              
              <ul className="relative z-10 py-2">
                <li>
                  <Link 
                    href="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-6 py-3 transition-colors font-medium text-sm ${
                      isActive('/') 
                        ? 'text-white bg-white/10' 
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/about"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-6 py-3 transition-colors font-medium text-sm ${
                      isActive('/about') 
                        ? 'text-white bg-white/10' 
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/blogs"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-6 py-3 transition-colors font-medium text-sm ${
                      isActive('/blogs') 
                        ? 'text-white bg-white/10' 
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    Achievements
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/projects"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-6 py-3 transition-colors font-medium text-sm ${
                      isActive('/projects') 
                        ? 'text-white bg-white/10' 
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    Projects
                  </Link>
                </li>
                <li className="px-4 py-2">
                  <Link 
                    href="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block bg-white text-black px-6 py-2.5 rounded-full hover:bg-gray-100 transition-colors font-medium text-sm text-center shadow-lg"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
