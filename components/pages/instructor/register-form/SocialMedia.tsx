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
        <Label htmlFor="instagram">Instagram</Label>
        <ControlGroup>
          <Button size="2" disabled>
            <FiInstagram />
          </Button>
          <TextField id="instagram" size="2"></TextField>
        </ControlGroup>
      </Fieldset>
      <Fieldset>
        <Label htmlFor="twitter">Twitter</Label>
        <ControlGroup>
          <Button size="2" disabled>
            <FiTwitter />
          </Button>
          <TextField id="twitter" size="2"></TextField>
        </ControlGroup>
      </Fieldset>
      <Fieldset>
        <Label htmlFor="facebook">Facebook</Label>
        <ControlGroup>
          <Button size="2" disabled>
            <FiFacebook />
          </Button>
          <TextField id="facebook" size="2"></TextField>
        </ControlGroup>
      </Fieldset>
      <Fieldset>
        <Label htmlFor="linked-in">LinkedIn</Label>
        <ControlGroup>
          <Button size="2" disabled>
            <FiLinkedin />
          </Button>
          <TextField id="linked-in" size="2"></TextField>
        </ControlGroup>
      </Fieldset>
      <Fieldset>
        <Label htmlFor="youtube">Youtube</Label>
        <ControlGroup>
          <Button size="2" disabled>
            <FiYoutube />
          </Button>
          <TextField id="youtube" size="2"></TextField>
        </ControlGroup>
      </Fieldset>
    </Grid>
  )
}
