import { Slot } from '@radix-ui/react-slot'
import { styled } from '@Theme'

export const Icon = styled(Slot, {
  width: '15px',
  height: '15px',
  variants: {
    thin: {
      true: {
        strokeWidth: 1,
        '& path': {
          strokeWidth: 1,
        },
      },
    },
  },
  defaultVariants: {
    thin: true,
  },
})
