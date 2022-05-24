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
import { useBlogRequest, useBlogStore } from '@Pages/blog/use-read'
import { useIsomorphicLayoutEffect } from 'ahooks'
import { BlogResponse } from '@Models/blog'
import isBrowser from '@Functions/is-browser'
import shallow from 'zustand/shallow'
import { useEffect } from 'react'
import AnyError from '@Components/AnyError'

const items: ArticleCardData[] = blogItems.map((item) => ({
  title: item.title,
  imgSrc: item.backgroundUrl,
  summary: item.summary,
  tags: item.badges,
  date: item.date,
}))
const { categories } = Config

const Page: NextPage = () => {
  const id = isBrowser
    ? new URL(window.location.href).searchParams.get('id')
    : null
  useIsomorphicLayoutEffect(() => {
    if (id == null) window.location.replace('/not-found')
  }, [])
  useBlogRequest({
    defaultParams: id ? [id] : undefined,
    manual: id == null,
  })

  const { data, error, setError } = useBlogStore(
    (state) => ({
      data: state.data,
      error: state.error,
      setError: state.setError,
    }),
    shallow
  )

  useEffect(() => {
    if (data?.data == null) return
    if (!(data.data instanceof BlogResponse.GetOne))
      return void setError(data.data.toError())
  }, [data])

  if (error) {
    // if (error instanceof APIError.NotFound)
    //   return <NotFoundError error={error} />

    return <AnyError error={error} />
  }

  return (
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
  )
}

export default Page
