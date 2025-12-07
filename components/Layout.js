import Header from './Header'

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-[#1a1a1a]">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      {/* Footer removed from here as bottom toolbar is on index page */}
    </div>
  )
}
