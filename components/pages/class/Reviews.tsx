import { Avatar } from '@Components/Avatar'
import { Flex } from '@Components/Flex'
import { Box } from '@Components/Box'
import { Text } from '@Components/Text'
import { Span } from '@Components/Span'
import { TitledSection } from '@Components/TitledSection'
import { StarIcon, StarFilledIcon } from '@radix-ui/react-icons'
import { Paragraph } from '@Components/Paragraph'
import { StyledSlot } from '@Components/Slot'
import { styled } from '@Theme'

function Review() {}

const Icon = (
  props: ReactProps<typeof StyledSlot> & {
    icon: any
  }
) => {
  const { icon, children, ...rest } = props
  const StyledIcon = styled(icon)
  return <StyledIcon {...rest} />
}
export default function Reviews() {
  return (
    <TitledSection title="Reviews" size="2">
      <Flex
        css={{
          display: 'inline-flex',
          ai: 'center',
        }}
      >
        <Icon
          icon={StarFilledIcon}
          css={{
            width: '$5',
            height: '$5',
            mr: '$2',
            color: '$gray9',
          }}
        />
        <Text size="6">
          <Span
            css={{
              fontWeight: '$bold',
            }}
          >
            0
          </Span>{' '}
          <Span>(No review yet)</Span>
        </Text>
      </Flex>
    </TitledSection>
  )
}
