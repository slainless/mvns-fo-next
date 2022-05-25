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
import { useCourseStore } from './use-detail'
import shallow from 'zustand/shallow'
import { Skeleton } from '@Components/Conditional'

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
  let { result, fallback } = useCourseStore(
    (state) => ({
      result: state.acceptedData,
      fallback: state.shouldFallback,
    }),
    shallow
  )
  const data = result?.data

  return (
    <TitledSection title="Reviews" size="2">
      <Flex css={{ display: 'inline-flex', ai: 'center' }}>
        <Icon
          icon={StarFilledIcon}
          css={{
            width: '$5',
            height: '$5',
            mr: '$2',
            color: '$gray9',
          }}
        />
        <Skeleton variant="heading" css={{ width: '$tw_40' }} when={fallback}>
          <Text size="6">
            <Span css={{ fontWeight: '$bold' }}>{data?.avg_rating ?? 0}</Span>{' '}
            <Span>
              {(() => {
                const rating = data?.total_rating ?? 0
                const many = rating > 1
                return rating > 0
                  ? `${rating} Review${many ? 's' : ''}`
                  : `No review yet`
              })()}
            </Span>
          </Text>
        </Skeleton>
      </Flex>
    </TitledSection>
  )
}
