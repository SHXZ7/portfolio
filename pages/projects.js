import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Projects() {
  const router = useRouter()

  useEffect(() => {
    router.push('/#projects')
  }, [router])

  return (
    <div className="bg-[#1a1a1a] min-h-screen flex items-center justify-center">
      <p className="text-white">Redirecting...</p>
    </div>
  )
}
