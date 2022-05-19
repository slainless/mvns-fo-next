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

const items: ArticleCardData[] = blogItems.map((item) => ({
  title: item.title,
  imgSrc: item.backgroundUrl,
  summary: item.summary,
  tags: item.badges,
  date: item.date,
}))

const { publicRuntimeConfig } = getConfig() as MyNextConfig
const Page: NextPage = () => {
  const { categories } = publicRuntimeConfig

  return (
    <TitledSection>
      <Highlight articles={items?.slice(0, 5)} />
      <Grid
        css={{
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '$6',
        }}
      >
        <List
          articles={items?.slice(5)}
          css={{
            gridColumn: '1 / span 3',
          }}
        />
        <Box
          css={{
            width: '100%',
          }}
        >
          Aside
        </Box>
      </Grid>
    </TitledSection>
  )
}

export default Page
