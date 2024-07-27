import FaqPage from 'app/_pages/FaqPage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions - artbot for Stable Diffusion',
  openGraph: {
    title: 'artbot - FAQ'
  }
}

export default function Page() {
  return <FaqPage />
}
