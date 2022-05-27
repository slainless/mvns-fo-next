import type { NextPage } from 'next'
import { TitledSection } from '@Components/TitledSection'
import { Text } from '@Components/Text'
import { useAuthUserStore } from '@Methods/auth'
import CourseGrid from '@Components/CourseGrid'
import { useRequest } from '@Functions/use-request'
import { CourseAPI } from '@Methods/course'
import { CourseResponse } from '@Models/course'
import { courseToCard } from '@Functions/data-conversion'

const Page: NextPage = () => {
  // const user = useAuthUserStore((state) => state.user)
  const { data, loading, error, response } = useRequest(CourseAPI.my, {
    acceptOnly: CourseResponse.Get,
  })
  return (
    <TitledSection title="My Classes">
      <Text color={'gray'} css={{ mb: '$4', lineHeight: 1.15 }}>
        Here is the classes that you attended to. <br />
        Video-on-demand classes can be watched at anytime you want.
      </Text>
      <CourseGrid courses={data?.data != null ? courseToCard(data.data) : []} />
    </TitledSection>
  )
}

export default Page
