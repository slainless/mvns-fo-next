import Card, { ArticleCardData } from './Card'
import { Grid } from '@Components/Grid'
import { Flex } from '@Components/Flex'
import { merge } from 'lodash-es'

const horizontalCard: ReactProps<typeof Card> = {
  css: {
    display: 'grid',
    gridTemplateColumns: '20rem auto',
    gridColumn: '1 / span 3',
    '& [data-radix-aspect-ratio-wrapper]': {
      pb: '0 !important',
      height: '100%',
    },
  },
  contentProps: {
    css: {
      px: '$6',
    },
  },
  headingProps: {
    size: '2',
  },
  badgeProps: {
    size: '2',
  },
}

export default function List(
  props: ReactProps<typeof Flex> & { articles: ArticleCardData[] }
) {
  const { articles, ...rest } = props
  return (
    <Flex
      {...merge(
        {
          css: {
            // gridAutoRows: '24rem',
            flexDirection: 'column',
            gap: '$6',
          },
        },
        rest
      )}
    >
      {articles?.map((item, i) => (
        <Card key={i} {...item} {...horizontalCard} />
      ))}
    </Flex>
  )
}
