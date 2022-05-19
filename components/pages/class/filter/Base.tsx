import { Flex } from '@Components/Flex'
import { Button } from '@Components/Button'
import * as Base from '@Components/Popover'
import { styled } from '@Theme'

export const PopoverContent = styled(Base.PopoverContent, {
  p: '$4',
  // pt: '$6',
  rtmv: true,
})

export function FilterButtons() {
  return (
    <Flex
      css={{
        mt: '$4',
        jc: 'space-between',
      }}
    >
      <Button variant="red">Reset</Button>
      <Button variant="green">Apply</Button>
    </Flex>
  )
}
