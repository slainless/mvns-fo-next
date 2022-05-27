import type { NextPage } from 'next'
import Overview from '@Pages/class/Overview'
import Navigation from '@Pages/class/Navigation'
import Instructor from '@Pages/class/Instructor'
import Reviews from '@Pages/class/Reviews'
import Recommendation from '@Pages/class/Recommendation'
import Heading from '@Pages/class/Heading'
import Media from '@Pages/class/Media'
import { TitledSection } from '@Components/TitledSection'
import { useIsomorphicLayoutEffect } from 'ahooks'
import { useDetailRequest, DetailProvider } from '@Pages/class/use-detail'
import isBrowser from '@Functions/is-browser'
import { APIError } from '@Models/response'
import AnyError from '@Components/AnyError'
import NotFoundError from '@Pages/class/NotFoundError'
import { useRouter } from 'next/router'

const Page: NextPage = () => {
  const router = useRouter()
  const id = isBrowser
    ? new URL(window.location.href).searchParams.get('id')
    : null

  useIsomorphicLayoutEffect(() => {
    if (id == null) router.replace('/not-found')
  }, [id])

  const request = useDetailRequest({
    defaultParams: [id],
    manual: id == null,
  })
  const { error } = request

  if (error) {
    if (error instanceof APIError.NotFound)
      return <NotFoundError error={error} />

    return <AnyError error={error} />
  }

  return (
    <DetailProvider value={request}>
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
    </DetailProvider>
  )
}

export default Page
