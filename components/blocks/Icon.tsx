import { Slot } from '@radix-ui/react-slot'
import { styled } from '@Theme'

export const Icon = styled(Slot, {
  width: '15px',
  height: '15px',
  '& path': {
    strokeWidth: 1,
  },
})
