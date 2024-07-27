import ImagesPage from 'app/_pages/ImagesPage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Your images - artbot for Stable Diffusion',
  openGraph: {
    title: 'artbot - Your images'
  }
}

export default function Page() {
  return <ImagesPage />
}
