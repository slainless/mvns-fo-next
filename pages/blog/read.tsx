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
