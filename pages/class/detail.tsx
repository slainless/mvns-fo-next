import type { NextPage } from 'next'
import Head from 'next/head'
import Overview from '@Pages/class/Overview'
import Navigation from '@Pages/class/Navigation'
import Instructor from '@Pages/class/Instructor'
import Reviews from '@Pages/class/Reviews'
import Recommendation from '@Pages/class/Recommendation'
import Heading from '@Pages/class/Heading'
import Media from '@Pages/class/Media'
import { styled } from '@Theme'
import { TitledSection } from '@Components/TitledSection'

const Page: NextPage = () => {
  return (
    <>
      <Overview />
      <Navigation />
      <TitledSection
        css={{
          py: 0,
        }}
      >
        <Heading />
        <Media />
      </TitledSection>
      <Instructor />
      <Reviews />
      <Recommendation />
    </>
  )
}

export default Page
