import ImagePage from 'app/_pages/ImagePage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Image Details Page - artbot for Stable Diffusion'
}

export default function Page({ params }: { params: { id: string } }) {
  return <ImagePage id={params.id} />
}
