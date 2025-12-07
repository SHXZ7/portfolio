import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Header() {
  const router = useRouter()
  
  const isActive = (path) => {
    return router.pathname === path
  }

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[55%]">
      <header className="bg-black/95 backdrop-blur-md text-white relative overflow-hidden rounded-[45px] border-2 border-cyan-400/30 shadow-2xl">
        {/* Grainy texture overlay */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px'
        }} />
        
        <nav className="px-6 relative z-10">
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
                  className={`transition-colors font-medium text-[15px] ${
                    isActive('/') 
                      ? 'text-white' 
                      : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className={`transition-colors font-medium text-[15px] ${
                    isActive('/about') 
                      ? 'text-white' 
                      : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  About
                </Link>
              </li>
              <li>
                <Link 
                  href="/projects" 
                  className={`transition-colors font-medium text-[15px] ${
                    isActive('/projects') 
                      ? 'text-white' 
                      : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link 
                  href="/blogs" 
                  className={`transition-colors font-medium text-[15px] ${
                    isActive('/blogs') 
                      ? 'text-white' 
                      : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  Blogs
                </Link>
              </li>
            </ul>

            {/* Contact Button - Far Right */}
            <div className="ml-auto mr-2">
              <Link 
                href="/contact" 
                className="bg-gray-200 text-black px-7 py-2.5 rounded-full hover:bg-white transition-colors font-medium text-[15px] inline-block shadow-md"
              >
                Contact
              </Link>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}
