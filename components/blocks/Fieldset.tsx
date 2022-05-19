import { styled } from '@Theme'
import { Label } from './Label'

export const Fieldset = styled('fieldset', {
  all: 'unset',
  display: 'flex',
  flexDirection: 'column',
  gap: '$2',
  mb: '$4',

  [`& > ${Label}`]: {
    // mb: '$2',
  },
})
