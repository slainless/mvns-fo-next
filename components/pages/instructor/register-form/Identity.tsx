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
  FiAtSign,
  FiUser,
  FiFlag,
  FiPhone,
  FiGlobe,
  FiFileText,
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
      <Box>
        <Grid
          columns={2}
          css={{
            columnGap: '$2',
          }}
        >
          <Fieldset>
            <Label htmlFor="first-name">First Name</Label>
            <TextField id="first-name" size="2"></TextField>
          </Fieldset>
          <Fieldset>
            <Label htmlFor="last-name">Last Name</Label>
            <TextField id="last-name" size="2"></TextField>
          </Fieldset>
        </Grid>

        <Fieldset>
          <Label htmlFor="email">Email</Label>
          <ControlGroup>
            <Button size="2" disabled>
              <FiAtSign />
            </Button>
            <TextField id="email" size="2"></TextField>
          </ControlGroup>
        </Fieldset>
        <Fieldset>
          <Label htmlFor="username">Username</Label>
          <ControlGroup>
            <Button size="2" disabled>
              <FiUser />
            </Button>
            <TextField id="username" size="2"></TextField>
          </ControlGroup>
        </Fieldset>
      </Box>
      <Box>
        <Fieldset>
          <Label htmlFor="country">Country</Label>
          <ControlGroup>
            <Button size="2" disabled>
              <FiFlag />
            </Button>
            <TextField id="country" size="2"></TextField>
          </ControlGroup>
        </Fieldset>
        <Fieldset>
          <Label htmlFor="city">City</Label>
          <TextField id="city" size="2"></TextField>
        </Fieldset>
        <Fieldset>
          <Label htmlFor="phone-number">Phone Number</Label>
          <ControlGroup>
            <Button size="2" disabled>
              <FiPhone />
            </Button>
            <TextField id="phone-number" size="2"></TextField>
          </ControlGroup>
        </Fieldset>
      </Box>
      <Box>
        <Fieldset>
          <Label htmlFor="website">Website</Label>
          <ControlGroup>
            <Button size="2" disabled>
              <FiGlobe />
            </Button>
            <TextField id="website" size="2"></TextField>
          </ControlGroup>
        </Fieldset>
        <Fieldset>
          <Label htmlFor="address">Address</Label>
          <TextArea id="address" size="2"></TextArea>
        </Fieldset>
      </Box>
      <Box>
        <Fieldset>
          <Label htmlFor="upload-cv">Curriculum Vitae</Label>
          <ControlGroup>
            <Button size="2" disabled>
              <FiFileText />
            </Button>
            <TextField
              id="upload-cv"
              size="2"
              placeholder="Upload your file here"
            ></TextField>
          </ControlGroup>
        </Fieldset>
      </Box>
    </Grid>
  )
}
