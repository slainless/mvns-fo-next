import { Box } from '@Components/Box'
import { Flex } from '@Components/Flex'
import { Checkbox } from '@Components/Checkbox'
import { Label } from '@Components/Label'
import { Popover, PopoverClose, PopoverTrigger } from '@Components/Popover'
import { PopoverContent, FilterButtons } from './Base'
import { styled } from '@Theme'
import { ReactNode } from 'react'
import { Button } from '@Components/Button'
import { Cross1Icon, Cross2Icon } from '@radix-ui/react-icons'
import { IconButton } from '@Components/IconButton'

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

  return (
    <Popover>
      <PopoverTrigger asChild>{trigger || children}</PopoverTrigger>
      <PopoverContent align="start">
        {/* <PopoverClose asChild>
          <IconButton
            css={{
              rounded: '100%',
              position: 'absolute',
              right: '$2',
              top: '$2',
            }}
            ghost
          >
            <Cross2Icon />
          </IconButton>
        </PopoverClose> */}
        <FieldSet>
          <Checkbox name="class_type[]" value="video" id="video" />
          <Label htmlFor="video">Video on-demand</Label>
        </FieldSet>
        <FieldSet>
          <Checkbox name="class_type[]" value="online" id="online" />
          <Label htmlFor="online">Online Class</Label>
        </FieldSet>
        <FieldSet>
          <Checkbox name="class_type[]" value="offline" id="offline" />
          <Label htmlFor="offline">Offline Class</Label>
        </FieldSet>
        <FilterButtons />
      </PopoverContent>
    </Popover>
  )
}
