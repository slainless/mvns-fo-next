import { Box } from '@Components/Box'
import { Flex } from '@Components/Flex'
import { Slider } from '@Components/Slider'
import { Label } from '@Components/Label'
import { Popover, PopoverClose, PopoverTrigger } from '@Components/Popover'
import { PopoverContent, FilterButtons, Action } from './Base'
import { styled } from '@Theme'
import { ReactNode, useEffect, useState } from 'react'
import { Button } from '@Components/Button'
import { Cross1Icon, Cross2Icon } from '@radix-ui/react-icons'
import { IconButton } from '@Components/IconButton'
import { FiDollarSign, FiPlus } from 'react-icons/fi'
import { Grid } from '@Components/Grid'
import { TextField } from '@Components/TextField'
import { ControlGroup } from '@Components/ControlGroup'
import { useFilterStore } from './use-filter-store'
import { useMount } from 'ahooks'
import { isEqual } from 'lodash-es'

const MAX = 1000
const MIN = 1

const getDefault = () => [MIN, MAX]

export default function Pricing(props: { children: ReactNode }): JSX.Element
export default function Pricing(props: { trigger: ReactNode }): JSX.Element
export default function Pricing(props: {
  children?: ReactNode
  trigger?: ReactNode
}) {
  const state = useFilterStore((state) => state.state)
  const setPrice = useFilterStore((state) => state.setPrice)
  const [value, setValue] = useState(state?.price ?? getDefault())
  const { children, trigger } = props

  useEffect(() => {
    setValue(state?.price ?? getDefault())
  }, [state])

  return (
    <Popover
      onOpenChange={(e) => {
        if (!e) setValue(state?.price ?? getDefault())
        return e
      }}
    >
      <PopoverTrigger asChild>{trigger || children}</PopoverTrigger>
      <PopoverContent css={{ maxWidth: '$tw_sm' }}>
        <Slider
          value={value}
          onValueChange={setValue}
          max={MAX}
          min={MIN}
          step={10}
        />
        <Grid columns={2} css={{ gap: '$2', mt: '$2', ai: 'center' }}>
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
                min={MIN}
                max={MAX}
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
                min={MIN}
                max={MAX}
                value={value[1]}
                onChange={(e) => {
                  setValue((o) => [o[0], +e.target['value']])
                }}
              ></TextField>
              {value[1] === MAX ? (
                <Button css={{ px: '$1' }} disabled>
                  <FiPlus />
                </Button>
              ) : null}
            </ControlGroup>
          </Box>
        </Grid>
        <Action.Root>
          <Action.Reset
            onClick={() => {
              // setPrice(null)
              setValue(getDefault())
            }}
          />
          <Action.Apply
            disabled={isEqual(state?.price ?? getDefault(), value)}
            onClick={() =>
              setPrice(isEqual(value, getDefault()) ? null : value)
            }
          />
        </Action.Root>
      </PopoverContent>
    </Popover>
  )
}
