import Link from 'next/link'
import { useState } from 'react'

export default function Footer() {
  const [isToggled, setIsToggled] = useState(false)

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        {/* Top Section with Profile and Navigation */}
        <div className="flex items-center justify-between mb-8 pb-8 border-b border-gray-700">
          {/* Profile Section */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-700">
              <img
                src="/profile.jpg"
                alt="Profile"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/48'
                }}
              />
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center gap-8">
            <Link href="/" className="text-white hover:text-gray-300 transition">
              Home
            </Link>
            <Link
              href="/about"
              className="text-white hover:text-gray-300 transition"
            >
              About
            </Link>
            <Link
              href="/blogs"
              className="text-white hover:text-gray-300 transition"
            >
              Blogs
            </Link>
            <Link
              href="/projects"
              className="text-white hover:text-gray-300 transition"
            >
              Projects
            </Link>
            <Link
              href="/contact"
              className="bg-white text-gray-900 px-6 py-2 rounded-full hover:bg-gray-200 transition"
            >
              Contact
            </Link>
          </nav>

          {/* Toggle Switch */}
          <button
            onClick={() => setIsToggled(!isToggled)}
            className={`relative w-14 h-7 rounded-full transition-colors ${
              isToggled ? 'bg-green-500' : 'bg-gray-700'
            }`}
          >
            <span
              className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                isToggled ? 'translate-x-7' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Bottom Copyright Section */}
        <div className="text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
