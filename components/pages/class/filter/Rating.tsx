import { Box } from '@Components/Box'
import { Flex } from '@Components/Flex'
import { Slider } from '@Components/Slider'
import { Label } from '@Components/Label'
import { Popover, PopoverClose, PopoverTrigger } from '@Components/Popover'
import { PopoverContent, FilterButtons, Action } from './Base'
import { CSS, styled } from '@Theme'
import { ReactNode, useEffect, useState } from 'react'
import { Button } from '@Components/Button'
import {
  Cross1Icon,
  Cross2Icon,
  StarFilledIcon,
  StarIcon,
} from '@radix-ui/react-icons'
import { IconButton } from '@Components/IconButton'
import { FiDollarSign, FiPlus, FiStar } from 'react-icons/fi'
import { Grid } from '@Components/Grid'
import { TextField } from '@Components/TextField'
import { ControlGroup } from '@Components/ControlGroup'
import { useFilterStore } from './use-filter-store'
import { useMount } from 'ahooks'
import { clamp, isEqual } from 'lodash-es'
import { DynamicStarIcon } from '@Assets/icon/DynamicStarIcon'

const StyledStarIcon = styled(DynamicStarIcon, {
  $$staticFill: '$colors$slate7',
  $$dynamicFill: '$colors$blue9',
  width: '$5',
  height: '$5',
})

const MAX = 5

const getDefault = () => [0, MAX]

export default function Rating(props: { children: ReactNode }): JSX.Element
export default function Rating(props: { trigger: ReactNode }): JSX.Element
export default function Rating(props: {
  children?: ReactNode
  trigger?: ReactNode
}) {
  const state = useFilterStore((state) => state.state)
  const setRating = useFilterStore((state) => state.setRating)
  const [value, setValue] = useState(state?.rating ?? getDefault())
  const { children, trigger } = props

  useEffect(() => {
    setValue(state?.rating ?? getDefault())
  }, [state])

  return (
    <Popover
      onOpenChange={(e) => {
        if (!e) setValue(state?.rating ?? getDefault())
        return e
      }}
    >
      <PopoverTrigger asChild>{trigger || children}</PopoverTrigger>
      <PopoverContent css={{ width: '$sm' }}>
        <Slider
          value={value}
          onValueChange={setValue}
          max={MAX}
          min={0}
          step={0.01}
        />
        <Flex css={{ width: '100%', jc: 'center', gap: '$1' }}>
          {Array(MAX)
            .fill(null)
            .map((_, k) => {
              const property = (() => {
                if (k <= value[0] && value[0] <= k + 1)
                  return {
                    x: (value[0] - k) * 100 + '%',
                    width:
                      value[1] <= k + 1
                        ? (value[1] - value[0]) * 100 + '%'
                        : '100%',
                  }
                if (k <= value[1] && value[1] <= k + 1)
                  return {
                    x: (-1 + value[1] - k) * 100 + '%',
                    width: '100%',
                  }
                if (value[0] <= k && k <= value[1])
                  return { x: 0, width: '100%' }
                return { x: 0, width: '0%' }
              })()
              return (
                <IconButton
                  key={k}
                  size="2"
                  onClick={() => {
                    const leftOffset = Math.abs(value[0] - k)
                    const rightOffset = Math.abs(value[1] - k - 1)

                    const toLeft = leftOffset < rightOffset
                    if (toLeft) return void setValue((old) => [k, old[1]])
                    return void setValue((old) => [old[0], k + 1])
                  }}
                >
                  <StyledStarIcon
                    style={{
                      '---clipX': property.x,
                      '---clipWidth': property.width,
                    }}
                  />
                </IconButton>
              )
            })}
        </Flex>
        <Grid columns={2} css={{ gap: '$2', mt: '$2', ai: 'center' }}>
          <Box>
            <Label htmlFor="min-price" size="1">
              Minimum
            </Label>
            <ControlGroup>
              <Button disabled>
                <StarIcon />
              </Button>
              <TextField
                id="min-price"
                type="number"
                min={0}
                max={MAX}
                step={0.01}
                value={value[0]}
                onChange={(e) => {
                  const val = +e.target['value']
                  if (val > MAX) return
                  setValue((o) => [val, o[1]])
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
                <StarIcon />
              </Button>
              <TextField
                id="max-price"
                type="number"
                min={0}
                max={MAX}
                step={0.01}
                value={value[1]}
                onChange={(e) => {
                  const val = +e.target['value']
                  if (val > MAX) return
                  setValue((o) => [o[0], val])
                }}
              ></TextField>
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
            disabled={isEqual(state?.rating ?? getDefault(), value)}
            onClick={() => {
              console.log(value)
              setRating(isEqual(value, getDefault()) ? null : value)
            }}
          />
        </Action.Root>
      </PopoverContent>
    </Popover>
  )
}
