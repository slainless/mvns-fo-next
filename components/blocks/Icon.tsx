import { styled } from '@Theme'

export const Icon = styled('span', {
  width: '15px',
  height: '15px',
  display: 'inline-block',
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
