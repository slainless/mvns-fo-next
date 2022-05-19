import { Box } from '@Components/Box'
import { Flex } from '@Components/Flex'
import { Slider } from '@Components/Slider'
import { Label } from '@Components/Label'
import { Popover, PopoverClose, PopoverTrigger } from '@Components/Popover'
import { PopoverContent, FilterButtons } from './Base'
import { styled } from '@Theme'
import { ReactNode, useState } from 'react'
import { Button } from '@Components/Button'
import { Cross1Icon, Cross2Icon } from '@radix-ui/react-icons'
import { IconButton } from '@Components/IconButton'
import { FiDollarSign, FiPlus } from 'react-icons/fi'
import { Grid } from '@Components/Grid'
import { TextField } from '@Components/TextField'
import { ControlGroup } from '@Components/ControlGroup'

export default function Pricing(props: { children: ReactNode }): JSX.Element
export default function Pricing(props: { trigger: ReactNode }): JSX.Element
export default function Pricing(props: {
  children?: ReactNode
  trigger?: ReactNode
}) {
  const [value, setValue] = useState([0, 1000])
  const { children, trigger } = props

  return (
    <Popover>
      <PopoverTrigger asChild>{trigger || children}</PopoverTrigger>
      <PopoverContent
        css={{
          maxWidth: '$tw_sm',
        }}
      >
        <Slider value={value} onValueChange={setValue} max={1000} step={10} />
        <Grid
          columns={2}
          css={{
            gap: '$2',
            mt: '$2',
            ai: 'center',
          }}
        >
          <Box>
            <Label htmlFor="min-price" size="1">
              Minimum
            </Label>
            <ControlGroup>
              <Button disabled>
                <FiDollarSign />
              </Button>
              <TextField
                id="min-price"
                type="number"
                min="0"
                max="1000"
                value={value[0]}
                onChange={(e) => {
                  setValue((o) => [+e.target['value'], o[1]])
                }}
              ></TextField>
            </ControlGroup>
          </Box>
          <Box>
            <Label htmlFor="max-price" size="1">
              Maximum
            </Label>
            <ControlGroup>
              <Button disabled>
                <FiDollarSign />
              </Button>
              <TextField
                id="max-price"
                type="number"
                min="0"
                max="1000"
                value={value[1]}
                onChange={(e) => {
                  setValue((o) => [o[0], +e.target['value']])
                }}
              ></TextField>
              {value[1] === 1000 ? (
                <Button
                  css={{
                    px: '$1',
                  }}
                  disabled
                >
                  <FiPlus />
                </Button>
              ) : null}
            </ControlGroup>
          </Box>
        </Grid>
        <FilterButtons />
      </PopoverContent>
    </Popover>
  )
}
