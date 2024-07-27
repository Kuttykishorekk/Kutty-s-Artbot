import PendingPage from 'app/_pages/PendingPage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pending images - artbot for Stable Diffusion',
  openGraph: {
    title: 'artbot - Pending images'
  }
}

export default function Page() {
  return <PendingPage />
}
