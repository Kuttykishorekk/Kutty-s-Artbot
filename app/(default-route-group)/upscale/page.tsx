import ChangelogPage from 'app/_pages/ChangelogPage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Upscale - artbot for Stable Diffusion',
  description:
    'artbot - Image upscaling and post processing via the Stable Horde',
  openGraph: {
    title: 'artbot - Upscale'
  }
}

export default function Page() {
  return <ChangelogPage />
}
