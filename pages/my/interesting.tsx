import type { NextPage } from 'next'
import { TitledSection } from '@Components/TitledSection'
import getConfig from 'next/config'
import { Text } from '@Components/Text'
import List from '@Pages/interesting/List'
import Category from '@Pages/interesting/Category'
import Config from '@Config'
import { useAuthUserStore } from '@Methods/auth'
import { useIsomorphicLayoutEffect } from 'ahooks'
import { useRouter } from 'next/router'
import { mapKeys } from 'lodash-es'
import { Overlay } from '@Components/RouteGuard'

const { categories } = Config
const mappedCategories = mapKeys(categories, (v, k) => v.id)
const Page: NextPage = () => {
  const router = useRouter()
  const user = useAuthUserStore((state) => state.user)
  const userCategories = user?.student_interest ?? []
  const interestedCategories = Array.from(
    new Set(userCategories.map((v) => mappedCategories[v.keyword_id]))
  )

  useIsomorphicLayoutEffect(() => {
    if (user == null) return void router.replace('/')
    if (interestedCategories.length === 0)
      return void router.replace('/first-time')
  })

  if (user == null) return <Overlay />
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
