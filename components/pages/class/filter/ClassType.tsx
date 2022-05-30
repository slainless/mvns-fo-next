import { Box } from '@Components/Box'
import { Flex } from '@Components/Flex'
import { Checkbox } from '@Components/Checkbox'
import { Label } from '@Components/Label'
import { Popover, PopoverClose, PopoverTrigger } from '@Components/Popover'
import { PopoverContent, FilterButtons, Action } from './Base'
import { styled } from '@Theme'
import { ReactNode, useEffect } from 'react'
import { Button } from '@Components/Button'
import { Cross1Icon, Cross2Icon } from '@radix-ui/react-icons'
import { IconButton } from '@Components/IconButton'
import { useFilterStore } from './use-filter-store'
import { useSelections } from 'ahooks'
import { CourseType } from '@Models/course'
import { isEqual } from 'lodash-es'

const FieldSet = styled(Flex, {
  mt: '$2',
  [`& > ${Label}`]: {
    ml: '$2',
  },
})
export default function ClassType(props: { children: ReactNode }): JSX.Element
export default function ClassType(props: { trigger: ReactNode }): JSX.Element
export default function ClassType(props: {
  children?: ReactNode
  trigger?: ReactNode
}) {
  const { children, trigger } = props
  const state = useFilterStore((state) => state.state)
  const setType = useFilterStore((state) => state.setType)
  const { selected, isSelected, setSelected, toggle } = useSelections(
    Object.values(CourseType),
    state?.type ?? []
  )

  useEffect(() => {
    setSelected(state?.type)
  }, [state])

  return (
    <Popover
      onOpenChange={(o) => {
        if (!o) setSelected(state?.type ?? [])
        return o
      }}
    >
      <PopoverTrigger asChild>{trigger || children}</PopoverTrigger>
      <PopoverContent align="start">
        <FieldSet>
          <Checkbox
            checked={isSelected(CourseType.VIDEO)}
            onCheckedChange={() => toggle(CourseType.VIDEO)}
            id="video"
          />
          <Label htmlFor="video">Video on-demand</Label>
        </FieldSet>
        <FieldSet>
          <Checkbox
            checked={isSelected(CourseType.ONLINE)}
            onCheckedChange={() => toggle(CourseType.ONLINE)}
            id="online"
          />
          <Label htmlFor="online">Online Class</Label>
        </FieldSet>
        <FieldSet>
          <Checkbox
            checked={isSelected(CourseType.OFFLINE)}
            onCheckedChange={() => toggle(CourseType.OFFLINE)}
            id="offline"
          />
          <Label htmlFor="offline">Offline Class</Label>
        </FieldSet>
        <Action.Root>
          <Action.Reset
            onClick={() => {
              setSelected([])
            }}
          />
          <Action.Apply
            disabled={isEqual(state?.type ?? [], selected)}
            onClick={() => {
              setType(selected)
            }}
          />
        </Action.Root>
      </PopoverContent>
    </Popover>
  )
}
