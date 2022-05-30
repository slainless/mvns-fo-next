import { Flex } from '@Components/Flex'
import { Button } from '@Components/Button'
import * as Base from '@Components/Popover'
import { styled } from '@Theme'
import { ComponentProps, ElementRef, forwardRef } from 'react'

export const PopoverContent = styled(Base.PopoverContent, {
  p: '$4',
  // pt: '$6',
  rtmv: true,
})

export module Action {
  export const Root = styled(Flex, {
    mt: '$4',
    defaultVariants: { justify: 'between' },
  })

  export const Reset = forwardRef<
    ElementRef<'button'>,
    ComponentProps<'button'>
  >((props, ref) => {
    return (
      <Button variant={'red'} {...props}>
        Reset
      </Button>
    )
  })
  Reset.displayName = 'Action.Reset'

  export const Apply = forwardRef<
    ElementRef<'button'>,
    ComponentProps<'button'>
  >((props, ref) => {
    return (
      <Button variant={'green'} {...props}>
        Apply
      </Button>
    )
  })
  Apply.displayName = 'Action.Apply'
}

export function FilterButtons() {
  return (
    <Flex css={{ mt: '$4', jc: 'space-between' }}>
      <Button variant="red">Reset</Button>
      <Button variant="green">Apply</Button>
    </Flex>
  )
}
