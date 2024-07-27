import { baseHost, basePath } from 'BASE_PATH'
import SettingsPage from 'app/_pages/SettingsPage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Settings and Preferences - artbot for Stable Diffusion',
  openGraph: {
    description: 'Manage your preferences for artbot and the Stable Horde',
    title: 'artbot - Settings',
    images: [`${baseHost}${basePath}/robot_gears.png`]
  },
  twitter: {
    images: `${baseHost}${basePath}/robot_gears.png`
  }
}

export default function Page() {
  return <SettingsPage />
}
