import { useEffect } from 'react'
import { useRouter } from 'next/router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Lenis from 'lenis'

export default function SmoothScroll({ children }) {
  const router = useRouter()

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Register ScrollTrigger plugin with GSAP
    gsap.registerPlugin(ScrollTrigger)

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    })

    // Synchronize Lenis scroll position with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    // Add Lenis RAF ticker to GSAP main loop
    const updateRaf = (time) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(updateRaf)
    gsap.ticker.lagSmoothing(0)

    // Expose lenis instance globally for custom programmatic scrolling if needed
    window.lenis = lenis

    // Reset scroll position on route change
    const handleRouteChange = () => {
      lenis.scrollTo(0, { immediate: true })
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
      gsap.ticker.remove(updateRaf)
      lenis.destroy()
      if (window.lenis === lenis) {
        delete window.lenis
      }
    }
  }, [router])

  return <>{children}</>
}
