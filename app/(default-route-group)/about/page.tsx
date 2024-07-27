import AboutPage from 'app/_pages/AboutPage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About - artbot for Stable Diffusion',
  openGraph: {
    title: 'artbot - About'
  }
}

export default function Page() {
  return <AboutPage />
}
