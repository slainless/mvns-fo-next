import { Separator } from '@Components/Separator'
import { styled } from '@Theme'

export const ORSeparator = styled(Separator, {
  my: '$6',
  position: 'relative',
  width: '100% !important',

  '&::before': {
    content: 'OR',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    letterSpacing: '$widest',
    fontSize: '$1',
    color: '$slate11',
    backgroundColor: '$panel',
    px: '$2',
  },
})

export default ORSeparator
