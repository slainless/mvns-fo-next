import { Grid } from '@Components/Grid'
import { TitledSection } from '@Components/TitledSection'
import Card, { ArticleCardData } from './Card'

const bigCard: ReactProps<typeof Card> = {
  css: {
    gridColumn: '1 / 3',
    gridRow: '1 / 3',
    height: 'max-content',
  },
  headingProps: {
    size: '3',
  },
  contentProps: {
    css: {
      p: '$6',
    },
  },
  badgeProps: {
    size: 2,
  },
  summaryProps: {
    css: {
      fontSet: '$lg',
    },
  },
  dateProps: {
    css: {
      fontSet: '$sm',
    },
  },
}

export default function Latest(props: { articles: ArticleCardData[] }) {
  const { articles } = props
  return (
    <Grid
      css={{
        gridTemplateColumns: 'repeat(4, 1fr)',
        // gridAutoRows: '24rem',
        gap: '$6',
        mb: '$6',
      }}
    >
      {articles?.slice(0, 5).map((item, i) => (
        <Card key={i} {...item} {...(i === 0 ? bigCard : {})} />
      ))}
    </Grid>
  )
}
