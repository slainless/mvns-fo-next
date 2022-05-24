import type { NextPage } from 'next'
import { TitledSection } from '@Components/TitledSection'
import { Card } from '@Components/Card'
import { Text } from '@Components/Text'
import { Grid } from '@Components/Grid'
import { Checkbox } from '@Components/Checkbox'
import Config from '@Config'

const { publicRuntimeConfig } = getConfig() as MyNextConfig
const Page: NextPage = () => {
  const { categories } = Config

  return (
    <TitledSection
      title="What topics do you find interesting?"
      headingProps={{
        css: {
          mx: 'auto',
          mb: '$6',
        },
      }}
    >
      <Grid
        columns={3}
        css={{
          columnGap: '$6',
          rowGap: '$4',
          px: '$9',
        }}
      >
        {categories.map((category, i) => (
          <Card
            as="label"
            key={i}
            css={{
              display: 'flex',
              jc: 'space-between',
              columnGap: '$6',
              ai: 'center',
              py: '$6',
              px: '$6',
              ff: '$spaceGrotesk',
            }}
          >
            <Text
              css={{
                fontSet: '$md',
              }}
            >
              {category.keyword}
            </Text>
            <Checkbox size="1" />
          </Card>
        ))}
      </Grid>
    </TitledSection>
  )
}

export default Page
