import CourseCard from '@Components/CourseCard'
import { Grid } from '@Components/Grid'
import { slimCard } from '@Dev/dummy'

export default function CardGrid() {
  return (
    <Grid
      columns={4}
      css={{
        gap: '$6',
        mt: '$6',
      }}
    >
      {slimCard.map((card, i) => (
        <CourseCard
          key={i}
          css={{
            height: '24rem',
          }}
          {...card}
        />
      ))}
    </Grid>
  )
}
