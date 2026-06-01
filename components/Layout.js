export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-[#040d00]">
      <main className="flex-grow">
        {children}
      </main>
    </div>
  )
}
