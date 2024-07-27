'use client'

import { useEffect, useRef } from 'react'
import { IconCircleArrowRight } from '@tabler/icons-react'
import FlexRow from 'app/_components/FlexRow'
import PromptTypewriter from 'app/_modules/Typewriter'
import styles from './component.module.css'
import HomePageContentWrapper from 'app/_components/HomePageContentWrapper'
import { basePath } from 'BASE_PATH'

export default function HomePage() {
  const highlightedTextRef = useRef<HTMLSpanElement | null>(null)

  useEffect(() => {
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1']

    const changeColor = () => {
      const randomColor = colors[Math.floor(Math.random() * colors.length)]
      if (highlightedTextRef.current) {
        highlightedTextRef.current.style.color = randomColor
      }
    }

    const intervalId = setInterval(changeColor, 2000) // Change color every 2 seconds

    return () => clearInterval(intervalId) // Cleanup on component unmount
  }, [])

  return (
    <HomePageContentWrapper>
      <FlexRow style={{ justifyContent: 'center', width: '100%' }}>
        <h1 className={styles.HeroTitle}>
          Welcome to{' '}
          <span ref={highlightedTextRef} className={styles.HighlightedText}>
            Kutty's artbot!
          </span>
        </h1>
      </FlexRow>
      <div className={styles.Blurb}>
        artbot is your gateway to experiment with the wonderful world of
        generative AI art using the power of the <strong>AI Horde</strong>, a
        distributed open source network of GPUs running{' '}
        <strong>Stable Diffusion</strong>. <br />
        <br />
        It&apos;s free to use, no registration required. View the{' '}
        <a
          href={`${basePath}/showcase`}
          className={styles.Link}
          aria-label="View community showcase"
        >
          community showcase
        </a>{' '}
        or{' '}
        <a
          href={`${basePath}/create`}
          className={styles.Link}
          aria-label="Get started with artbot"
        >
          <span>get started</span> <IconCircleArrowRight size={16} />
        </a>
      </div>
      <div className={styles.TypewriterContainer}>
        <PromptTypewriter />
      </div>
    </HomePageContentWrapper>
  )
}
