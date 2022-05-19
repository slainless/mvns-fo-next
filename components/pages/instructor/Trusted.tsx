import { TitledSection } from '@Components/TitledSection'
import { Grid } from '@Components/Grid'
import { Slot } from '@radix-ui/react-slot'
import { styled } from '@Theme'
import CEAI from '@Pages/instructor/partners/CEAI'
import Blanchard from '@Pages/instructor/partners/Blanchard'
import PSB from '@Pages/instructor/partners/PSB'

const StyledSlot = styled(Slot, {
  height: '$tw_32',
  $$grayscale11: '$colors$slate11',
  $$grayscale12: '$colors$slate12',
  filter: 'grayscale(1)',

  '&:hover': {
    filter: 'grayscale(0)',
  },
})

export default function Trusted() {
  return (
    <TitledSection
      title="Trusted By"
      headingProps={{
        size: '2',
        css: {
          mb: '$5',
          mx: 'auto',
        },
      }}
    >
      <Grid
        columns={3}
        css={{
          maxWidth: '$4xl',
          mx: 'auto',
          columnGap: '$5',
          justifyItems: 'center',
        }}
      >
        <StyledSlot>
          <CEAI />
        </StyledSlot>
        <StyledSlot>
          <Blanchard />
        </StyledSlot>
        <StyledSlot>
          <PSB />
        </StyledSlot>
      </Grid>
    </TitledSection>
  )
}
