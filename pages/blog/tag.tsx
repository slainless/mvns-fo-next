import type { NextPage } from 'next'
import { TitledSection } from '@Components/TitledSection'
import getConfig from 'next/config'
import { Text } from '@Components/Text'
import Highlight from '@Pages/blog/Highlight'
import List from '@Pages/blog/List'
import { blogItems } from '@Dev/dummy'
import { ArticleCardData } from '@Pages/blog/Card'
import { Box } from '@Components/Box'
import { Grid } from '@Components/Grid'
import SideList from '@Pages/blog/SideList'
import Config from '@Config'

const items: ArticleCardData[] = blogItems.map((item) => ({
  title: item.title,
  imgSrc: item.backgroundUrl,
  summary: item.summary,
  tags: item.badges,
  date: item.date,
}))

const Page: NextPage = () => {
  const { categories } = Config

  return (
    <TitledSection title="Business">
      <Grid
        css={{
          gridTemplateColumns: '70% auto',
          gap: '$6',
        }}
      >
        <List articles={items} />
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
