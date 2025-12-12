// Create this file if it doesn't exist

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1a1a1a]/80 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="#" className="text-xl font-black text-white">
            MS
          </a>
          
          <div className="flex gap-8">
            <a 
              href="#about" 
              className="text-white/70 hover:text-[#C8FF5C] transition-colors duration-300"
            >
              About
            </a>
            <a 
              href="#achievements" 
              className="text-white/70 hover:text-[#C8FF5C] transition-colors duration-300"
            >
              Achievements
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
