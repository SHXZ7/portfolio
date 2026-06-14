import '../styles/globals.css'
import Layout from '../components/Layout'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
      <Analytics />
      <SpeedInsights />
    </Layout>
  )
}
