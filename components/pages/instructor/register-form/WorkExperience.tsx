import { Box } from '@Components/Box'
import { ControlGroup } from '@Components/ControlGroup'
import { Flex } from '@Components/Flex'
import { Grid } from '@Components/Grid'
import { IconButton } from '@Components/IconButton'
import { Button } from '@Components/Button'
import { Label } from '@Components/Label'
import { TextField } from '@Components/TextField'
import { styled } from '@Theme'
import {
  FiInstagram,
  FiTwitter,
  FiFacebook,
  FiLinkedin,
  FiYoutube,
} from 'react-icons/fi'
import { TextArea } from '@Components/TextArea'

const Fieldset = styled('fieldset', {
  all: 'unset',
  display: 'flex',
  flexDirection: 'column',
  gap: '$2',
  mb: '$4',
})

export default function Identity() {
  return (
    <Grid
      css={{
        gridTemplateColumns: 'repeat(2, 1fr)',
        columnGap: '$4',
      }}
    >
      <Fieldset>
        <Label htmlFor="reason">Reason to become an instructor</Label>
        <TextArea id="reason" size="2"></TextArea>
      </Fieldset>
      <Fieldset>
        <Label htmlFor="relevant-achievement">Relevant achievements</Label>
        <TextArea id="relevant-achievement" size="2"></TextArea>
      </Fieldset>
      <Fieldset>
        <Label htmlFor="training-experience">Training experience</Label>
        <TextArea id="training-experience" size="2"></TextArea>
      </Fieldset>
      <Fieldset>
        <Label htmlFor="relevant-experience">
          Relevant industries experience
        </Label>
        <TextArea id="relevant-experience" size="2"></TextArea>
      </Fieldset>
    </Grid>
  )
}
