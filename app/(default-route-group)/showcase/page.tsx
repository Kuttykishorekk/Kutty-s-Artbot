import { baseHost, basePath } from 'BASE_PATH'
import ShowcasePage from 'app/_pages/ShowcasePage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Community Showcase - artbot for Stable Diffusion',
  openGraph: {
    title: 'artbot - Community Showcase',
    images: [`${baseHost}${basePath}/robot_showcase.jpg`],
    description:
      'Get inspiration and discover what other artbot fans have created and publicly shared with the artbot Showcase.'
  },
  twitter: {
    images: `${baseHost}${basePath}/robot_showcase.jpg`
  }
}

export default async function Page() {
  return <ShowcasePage />
}
