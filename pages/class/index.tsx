import type { NextPage } from 'next'
import { TitledSection } from '@Components/TitledSection'
import getConfig from 'next/config'
import { Text } from '@Components/Text'
import Filter from '@Pages/class/Filter'
import CardGrid from '@Pages/class/CardGrid'

const { publicRuntimeConfig } = getConfig() as MyNextConfig
const Page: NextPage = () => {
  const { categories } = publicRuntimeConfig

  return (
    <TitledSection title="All Classes">
      <Text
        css={{
          fontSet: '$md',
          mb: '$1',
          color: '$slate11',
        }}
      >
        You can also filter the courses by:
      </Text>
      <Filter />
      <CardGrid />
    </TitledSection>
  )
}

export default Page
