import { styled } from '@Theme'

export const Prose = styled('div', {
  color: '$slate12',
  fontSet: '$md',

  '& p': {
    fontSet: '$md',
  },

  '& li': {
    fontSet: '$md',
  },

  '& :where(h2, h3)': {
    color: '$slate12',
    ff: '$spaceGrotesk',
    mt: '$8',
  },

  '& > :first-child': {
    mt: 0,
  },

  '& > :last-child': {
    mb: 0,
  },
})
