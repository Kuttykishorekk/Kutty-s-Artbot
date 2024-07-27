import WorkerInfoPage from 'app/_pages/InfoPage/workers'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'GPU Worker Details - artbot for Stable Diffusion',
  openGraph: {
    title: 'artbot - GPU Worker Details'
  }
}

export default function Page() {
  return <WorkerInfoPage />
}
