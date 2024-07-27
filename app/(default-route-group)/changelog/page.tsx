import ChangelogPage from 'app/_pages/ChangelogPage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Changelog - artbot for Stable Diffusion',
  openGraph: {
    title: 'artbot - Changelog'
  }
}

export default function Page() {
  return <ChangelogPage />
}
