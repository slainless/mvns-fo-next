import { styled } from '@Theme'

export const Section = styled('section', {
  // Reset
  boxSizing: 'border-box',
  flexShrink: 0,
  '&::before': {
    boxSizing: 'border-box',
    content: '""',
  },
  '&::after': {
    boxSizing: 'border-box',
    content: '""',
  },

  variants: {
    container: {
      xl: {
        // maxWidth: '$container-xl',
        maxWidth: '1340px',
        mx: 'auto',
        px: '$tw_4',

        '@md': {
          px: '$tw_8',
        },
        '@lg': {
          px: '$tw_12',
        },
      },
    },
    size: {
      '1': {
        py: '$3',
      },
      '2': {
        py: '$5',
      },
      '3': {
        py: '$9',
      },
    },
  },
  defaultVariants: {
    size: '3',
    container: 'xl',
  },
})
