import type { NextPage } from 'next'
import { TitledSection } from '@Components/TitledSection'
import getConfig from 'next/config'
import { Text } from '@Components/Text'
import List from '@Pages/interesting/List'
import Category from '@Pages/interesting/Category'
import Config from '@Config'
import { useRouter } from 'next/router'

const { categories } = Config
const Page: NextPage = () => {
  const router = useRouter()

  return (
    <TitledSection title="You may like one of these courses">
      <Text
        css={{
          color: '$slate11',
          fontSet: '$md',
          mb: '$2',
        }}
      >
        Here is our recommendation for these topics:
      </Text>
      <List categories={interestedCategories} />
      {interestedCategories.map((category, i) => (
        <Category name={category.keyword} key={i} />
      ))}
    </TitledSection>
  )
}

export default Page
