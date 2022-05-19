import type { NextPage } from 'next'
import Head from 'next/head'
import List from '@Pages/cart/List'
import { styled } from '@Theme'
import { TitledSection } from '@Components/TitledSection'

const Page: NextPage = () => {
  return (
    <TitledSection
      title="My Cart"
      headingProps={{
        css: {
          mb: '$4',
        },
      }}
    >
      <List />
    </TitledSection>
  )
}

export default Page
