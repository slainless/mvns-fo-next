import type { NextPage } from 'next'
import { TitledSection } from '@Components/TitledSection'
import { Text } from '@Components/Text'
import { useAuthUserStore } from '@Methods/auth'
import CourseGrid from '@Components/CourseGrid'
import { useRequest } from '@Functions/use-request'
import { WishlistAPI } from '@Methods/wishlist'
import { WishResponse } from '@Models/wishlist'
import { courseToCard } from '@Functions/data-conversion'

const Page: NextPage = () => {
  // const user = useAuthUserStore((state) => state.user)
  const { data, loading, error, response } = useRequest(WishlistAPI.get, {
    acceptOnly: WishResponse.Get,
  })
  console.log(data, response)
  return (
    <TitledSection title="My Wishlist">
      <Text color={'gray'} css={{ mb: '$4' }}>
        Here is the classes that you saved. You can add it to cart at anytime
        you want.
      </Text>
      <CourseGrid courses={data?.data.map((v) => courseToCard(v.course!))} />
    </TitledSection>
  )
}

export default Page
