import { Grid } from '@Components/Grid'
import { Box } from '@Components/Box'
import { Button } from '@Components/Button'
import { styled } from '@Theme'

const NaviButton = styled(Button, {
  py: '$5',
  borderBottom: '1px solid $slate8',
  borderBottomLeftRadius: '0 !important',
  borderBottomRightRadius: '0 !important',
  defaultVariants: {
    ghost: true,
    size: 2,
  },
})
export default function Navigation() {
  return (
    <Box
      css={{
        mb: '$6',
        position: 'sticky',
        top: '$sizes$header',
        backgroundColor: '$slate1',
        boxShadow: 'inset 0 -1px 0 $colors$slate6',
        zIndex: '40',
      }}
    >
      <Grid
        columns={3}
        css={{
          width: '$tw_96',
          mx: 'auto',
        }}
      >
        <NaviButton>Details</NaviButton>
        <NaviButton>Instructor</NaviButton>
        <NaviButton>Reviews</NaviButton>
      </Grid>
    </Box>
  )
}
