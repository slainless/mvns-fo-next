import CourseCard, { CourseCardData } from '@Components/CourseCard'
import { Grid } from '@Components/Grid'

type Props = {
  courses?: CourseCardData[]
}
export default function CourseGrid(props: Props) {
  const { courses } = props
  return (
    <Grid columns={4} css={{ gap: '$6', mt: '$6', gridAutoRows: '28rem' }}>
      {courses?.map((data, i) => (
        <CourseCard key={i} hideFavorited={true} {...data} />
      ))}
    </Grid>
  )
}
