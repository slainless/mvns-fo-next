import type { NextPage } from 'next'
import { TitledSection } from '@Components/TitledSection'
import getConfig from 'next/config'
import SideList from '@Pages/blog/SideList'
import Article from '@Pages/blog/Article'
import { blogItems } from '@Dev/dummy'
import { ArticleCardData } from '@Pages/blog/Card'
import { Box } from '@Components/Box'
import { Grid } from '@Components/Grid'
import Config from '@Config'
import { useReadRequest, ReadProvider } from '@Pages/blog/use-read'
import { useIsomorphicLayoutEffect } from 'ahooks'
import isBrowser from '@Functions/is-browser'
import AnyError from '@Components/AnyError'
import { useRouter } from 'next/router'
// import NotFoundError from '@Pages/blog/NotFoundError'
// import { APIError } from '@Models/response'

const items: ArticleCardData[] = blogItems.map((item) => ({
  title: item.title,
  imgSrc: item.backgroundUrl,
  summary: item.summary,
  tags: item.badges,
  date: item.date,
}))
const { categories } = Config

const Page: NextPage = () => {
  const router = useRouter()
  const id = isBrowser
    ? new URL(window.location.href).searchParams.get('id')
    : null

  useIsomorphicLayoutEffect(() => {
    if (id == null) router.replace('/not-found')
  }, [id])

  const request = useReadRequest({
    defaultParams: [id],
    manual: id == null,
  })
  const { error } = request

  if (error) {
    // if (error instanceof APIError.NotFound)
    //   return <NotFoundError error={error} />

    return <AnyError error={error} />
  }

  return (
    <ReadProvider value={request}>
      <TitledSection>
        <Grid
          css={{
            gridTemplateColumns: '70% auto',
            gap: '$6',
          }}
        >
          <Article />
          <Box
            css={{
              width: '100%',
            }}
          >
            <SideList articles={items} />
          </Box>
        </Grid>
      </TitledSection>
    </ReadProvider>
  )
}

export default Page
