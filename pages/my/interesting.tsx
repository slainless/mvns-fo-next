import type { NextPage } from 'next'
import { TitledSection } from '@Components/TitledSection'
import getConfig from 'next/config'
import { Text } from '@Components/Text'
import List from '@Pages/interesting/List'
import Category from '@Pages/interesting/Category'

const { publicRuntimeConfig } = getConfig() as MyNextConfig
const { categories } = publicRuntimeConfig

const Page: NextPage = () => {
  const interestedCategories = [categories[0], categories[1], categories[2]]

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
        <Category name={category.name} />
      ))}
    </TitledSection>
  )
}

export default Page
