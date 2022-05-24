import { Card as $Card } from './Card'
import { Alert as $Alert } from './Alert'
import { Heading as $Heading } from './Heading'
import { Flex } from './Flex'
import { Text } from './Text'
import { styled } from '@Theme'

/* -------------------------------------------------------------------------- */
/*                                   Layout                                   */
/* -------------------------------------------------------------------------- */

const StyledViewport = styled(Flex, {
  minHeight: 'calc(100vh - $sizes$header)',
  defaultVariants: {
    direction: 'column',
    align: 'center',
    justify: 'center',
  },
})
export const Viewport = StyledViewport
export const ErrorCardViewport = StyledViewport

const ContentStyle = {
  display: 'flex',
  p: '$6',
  flexDirection: 'column',
  ai: 'center',
}

const StyledCard = styled($Card, ContentStyle)
export const Content = StyledCard
export const ErrorCardContent = StyledCard

const StyledAlert = styled($Alert, ContentStyle, {
  defaultVariants: {
    size: false,
  },
})
export const Alert = StyledAlert
export const ErrorCardAlert = StyledAlert

/* -------------------------------------------------------------------------- */
/*                                 Components                                 */
/* -------------------------------------------------------------------------- */

/* ------------------------------- Big Heading ------------------------------ */

const StyledHeading = styled($Heading, {
  fontSet: '$9xl',
  ff: '$spaceGrotesk',
  // fontVariationSettings: `'wdth' 70`,
  fontWeight: '$extrabold',
  // mb: '$1',
  defaultVariants: {
    size: false,
    variant: 'red',
  },
})
export const Heading = StyledHeading
export const ErrorCardHeading = StyledHeading
