export default function NavPill({ links = ['Home','About','Projects','Blog','Contact'] }) {
  return (
    <nav className="inline-flex items-center gap-4 bg-black/70 backdrop-blur-md rounded-full px-4 py-2 shadow-lg">
      {links.map((l,i) => (
        <a
          key={l}
          href={l === 'Home' ? '/' : `#${l.toLowerCase()}`}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
            i === links.length - 1 ? 'bg-white text-black' : 'text-white/90 hover:bg-white/5'
          }`}
        >
          {l}
        </a>
      ))}
    </nav>
  )
}
