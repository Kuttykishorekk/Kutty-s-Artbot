import { baseHost, basePath } from 'BASE_PATH'
import PrivacyPage from 'app/_pages/PrivacyPage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy - artbot for Stable Diffusion',
  openGraph: {
    title: 'artbot - Privacy Policy',
    images: [`${baseHost}${basePath}/robot_towel.jpg`]
  },
  twitter: {
    images: `${baseHost}${basePath}/robot_towel.jpg`
  }
}

export default function Page() {
  return <PrivacyPage />
}
