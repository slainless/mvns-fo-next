import type { NextPage } from 'next'
import { TitledSection } from '@Components/TitledSection'
import getConfig from 'next/config'
import { Text } from '@Components/Text'
import Filter from '@Pages/class/Filter'
import CourseGrid from '@Components/CourseGrid'
import Config from '@Config'
import { slimCard } from '@Dev/dummy'

const Page: NextPage = () => {
  const { categories } = Config

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
      <CourseGrid courses={slimCard} />
    </TitledSection>
  )
}

export default Page
