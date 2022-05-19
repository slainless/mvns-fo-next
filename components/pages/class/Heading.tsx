import { Box } from '@Components/Box'
import { Text } from '@Components/Text'
import { Badge } from '@Components/Badge'
import { FiRadio } from 'react-icons/fi'
import { TitledSection } from '@Components/TitledSection'
import { Heading } from '@Components/Heading'
import { StyledSlot } from '@Components/Slot'
import { Flex } from '@Components/Flex'
import { styled } from '@Theme'
import {
  StarIcon,
  StarFilledIcon,
  ClockIcon,
  MixIcon,
} from '@radix-ui/react-icons'

const TextualIcon = (
  props: ReactProps<typeof StyledSlot> & {
    icon: any
  }
) => {
  const { icon, children, ...rest } = props
  const StyledIcon = styled(icon)
  return (
    <>
      <StyledIcon {...rest} />
      {children}
    </>
  )
}
export default function Detail() {
  return (
    <Box
      css={{
        mb: '$6',
      }}
    >
      <Badge
        size="3"
        css={{
          display: 'flex',
          width: 'max-content',
          ai: 'center',
          mb: '$2',
        }}
      >
        <TextualIcon
          icon={FiRadio}
          css={{
            mr: '$2',
          }}
        >
          Online Class
        </TextualIcon>
      </Badge>
      <Heading
        css={{
          fontSet: '$5xl',
          fontWeight: '$black',
          maxWidth: '40ch',
          mb: '$1',
        }}
      >
        Blanchard Leadership– The SLII Experience™
      </Heading>
      <Flex
        css={{
          '& > *': {
            display: 'flex',
            ai: 'center',
            fontSet: '$md',

            mr: '$4',
            pr: '$4',
            borderRight: '1px solid $slate6',
            '& > svg': {
              mr: '$2',
            },
            '&:last-child': {
              mr: 0,
              pr: 0,
              borderRight: 'none',
            },
          },
        }}
      >
        <Text>
          <TextualIcon icon={StarIcon}>No review</TextualIcon>
        </Text>
        <Text>
          <TextualIcon icon={ClockIcon}>1 Lectures (2 hours)</TextualIcon>
        </Text>
        <Text>
          <TextualIcon icon={MixIcon}>Business</TextualIcon>
        </Text>
      </Flex>
    </Box>
  )
}
