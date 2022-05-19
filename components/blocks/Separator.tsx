import { styled } from '@Theme'
import * as SeparatorPrimitive from '@radix-ui/react-separator'

export const Separator = styled(SeparatorPrimitive.Root, {
  border: 'none',
  margin: 0,
  flexShrink: 0,
  backgroundColor: '$slate6',
  cursor: 'default',

  variants: {
    size: {
      '1': {
        '.group[data-orientation="horizontal"] &, &[data-orientation="horizontal"]':
          {
            height: '1px',
            width: '$3',
          },

        '.group[data-orientation="vertical"] &, &[data-orientation="vertical"]':
          {
            width: '1px',
            height: '$3',
          },
      },
      '2': {
        '.group[data-orientation="horizontal"] &, &[data-orientation="horizontal"]':
          {
            height: '1px',
            width: '$7',
          },

        '.group[data-orientation="vertical"] &, &[data-orientation="vertical"]':
          {
            width: '1px',
            height: '$7',
          },
      },
    },
  },
  defaultVariants: {
    size: '1',
  },
})
