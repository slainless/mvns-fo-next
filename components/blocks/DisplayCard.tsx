import { Box } from '@Components/Box'
import { Card as _Card } from '@Components/Card'
import { Flex } from '@Components/Flex'
import { Badge as _Badge } from '@Components/Badge'
import { Text } from '@Components/Text'
import { Heading as _Heading } from '@Components/Heading'
import { Icon } from '@Components/Icon'
import { Separator } from '@radix-ui/react-separator'
import { styled } from '@Theme'
import { forwardRef, ElementRef, ComponentProps } from 'react'
import { FiCalendar } from 'react-icons/fi'

/* -------------------------------------------------------------------------- */
/*                                 Main Layout                                */
/* -------------------------------------------------------------------------- */

const StyledCard = styled(_Card, {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  // overflow: 'hidden',
  height: 'inherit',

  '&::before': {
    zIndex: 1,
  },
  defaultVariants: {
    variant: 'interactive',
  },
})
const StyledHeader = styled(Flex, {
  p: '$4',
  // jc: 'space-between',
  zIndex: 2,
  pointerEvents: 'none',
  '& *': {
    pointerEvents: 'auto',
  },
  // pointerEvents: 'none',
})
const StyledContent = styled(Box, {
  p: '$4',
  textAlign: 'center',
  zIndex: 1,
  pointerEvents: 'none',
  '& *': {
    pointerEvents: 'auto',
  },

  '& :last-child': {
    mb: 0,
  },
})
const StyledOverlay = styled(Box, {
  position: 'absolute',
  zIndex: 0,
  width: '100%',
  rounded: '$3',
  height: '100%',
  inset: 0,
})
const StyledTitle = styled(_Heading, {
  fontWeight: '$black',
  variants: {
    overlay: {
      true: {
        // display: 'none',
        textDecoration: 'none',
        zIndex: 0,
        '&::before': {
          content: '',
          top: 0,
          left: 0,
          zIndex: -1,
          width: '100%',
          height: '100%',
          position: 'absolute',
        },
      },
    },
  },
})

export const Root = StyledCard
export const Header = StyledHeader
export const Content = StyledContent
export const Title = StyledTitle
export const Overlay = StyledOverlay
export const Card = StyledCard
export const CardHeader = StyledHeader
export const CardContent = StyledContent
export const CardTitle = StyledTitle
export const CardOverlay = StyledOverlay

/* -------------------------------------------------------------------------- */
/*                            Extension Components                            */
/* -------------------------------------------------------------------------- */

/* ---------------------------------- Date ---------------------------------- */

export const _Date = forwardRef<
  ElementRef<typeof Text>,
  ComponentProps<typeof Text>
>(({ children, ...props }, ref) => {
  return (
    <Text {...props} ref={ref}>
      <Icon
        css={{
          mr: '$1',
        }}
        thin={false}
      >
        <FiCalendar />
      </Icon>
      {children}
    </Text>
  )
})
const StyledDate = styled(_Date, Text, {
  color: '$slate11',
  display: 'inline-flex',
  lineHeight: '$3',
  width: '100%',
  jc: 'center',
  ai: 'center',
  defaultVariants: {
    size: '2',
  },
})
export const CardDate = StyledDate
export const Date = StyledDate

/* --------------------------------- Subtitle --------------------------------- */

const StyledSubtitle = styled('h3', Text)
export const Subtitle = StyledSubtitle
export const CardSubtitle = StyledSubtitle

/* -------------------------------- Separator ------------------------------- */

const StyledSeparator = styled(Separator, {
  height: '2px',
  width: '$4',
  backgroundColor: '$hiContrastA',
})
export const ContentSeparator = StyledSeparator
export const CardContentSeparator = StyledSeparator

/* ---------------------------------- Badge --------------------------------- */

const StyledBadge = styled('a', _Badge, {
  rounded: '$1',
  // px: '$2',
  defaultVariants: {
    interactive: true,
  },
})
export const Badge = StyledBadge
export const CardBadge = StyledBadge
