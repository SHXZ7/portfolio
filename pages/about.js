import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function About() {
  const router = useRouter()

  useEffect(() => {
    router.push('/#about')
  }, [router])

  return (
    <div className="bg-[#1a1a1a] min-h-screen flex items-center justify-center">
      <p className="text-white">Redirecting...</p>
    </div>
  )
}
