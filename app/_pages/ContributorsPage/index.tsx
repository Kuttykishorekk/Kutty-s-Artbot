'use client'

/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import PageTitle from 'app/_components/PageTitle'
import { baseHost, basePath } from 'BASE_PATH'
import Linker from 'app/_components/Linker'

const ContributorsPage = () => {
  return (
    <>
      <Head>
        <title>Awesome Contributors - artbot for Stable Diffusion</title>
        <meta name="twitter:title" content="artbot - Awesome Contributors" />
        <meta
          name="twitter:image"
          content={`${baseHost}${basePath}/robots_coding.jpg`}
        />
      </Head>
      <PageTitle>Awesome Contributors</PageTitle>
      <div className="pb-2">
        <img
          src={`${basePath}/robots_coding.jpg`}
          alt="painting of a robot painting robots"
        />
      </div>
      <div className="pb-2">
        artbot is a passion project originally created by{' '}
        <Linker
          href="https://daveschumaker.net/"
          target="_blank"
          rel="noreferrer"
        >
          Dave Schumaker
        </Linker>{' '}
        and first launched in October 2022.
      </div>
      <div className="pb-2">
        Since then, a number of people have contributed their knowledge and
        coding abilities to help improve artbot. I am immensely grateful.
        Special thanks and shout outs to:
      </div>
      <div className="pb-2">
        <ul>
          <li>- aurror</li>
          <li>- brimstone</li>
          <li>- Cubox</li>
          <li>- Efreak</li>
          <li>- FredHappyface</li>
          <li>- Litnine</li>
          <li>- tijszwinkels</li>
          <li>- voodoocode</li>
          <li>- WuKaiYi</li>
        </ul>
      </div>
      <div className="pb-2">
        Are you interested in helping improve artbot? Feel free to open a
        feature request or start slinging some code. Contributions are always
        welcome. Check out{' '}
        <Linker
          href="https://github.com/Kuttykishorekk/"
          target="_blank"
          rel="noreferrer"
        >
          artbot on Github
        </Linker>
        .
      </div>
    </>
  )
}

export default ContributorsPage
