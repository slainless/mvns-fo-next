import { Box } from '@Components/Box'
import { Text } from '@Components/Text'
import { Badge } from '@Components/Badge'
import { FiRadio } from 'react-icons/fi'
import { Heading } from '@Components/Heading'
import { StyledSlot } from '@Components/Slot'
import { Flex } from '@Components/Flex'
import { styled } from '@Theme'
import { StarIcon, ClockIcon, MixIcon } from '@radix-ui/react-icons'
import { useDetail } from './use-detail'
import { Skeleton } from '@Components/Conditional'

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
  let { data: $data } = useDetail()
  const data = $data?.data
  const fallback = $data == null

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
        <Skeleton css={{ width: '$tw_24' }} when={fallback}>
          <TextualIcon
            icon={FiRadio}
            css={{
              mr: '$2',
            }}
          >
            {data?.type} Class
          </TextualIcon>
        </Skeleton>
      </Badge>
      <Skeleton
        variant="title"
        css={{
          mb: '$2',
          maxWidth: '30ch',
          ff: '$spaceGrotesk',
          fontSet: '$5xl',
        }}
        when={fallback}
      >
        <Heading
          css={{
            fontSet: '$5xl',
            fontWeight: '$black',
            maxWidth: '40ch',
            mb: '$1',
          }}
        >
          {data?.title}
        </Heading>
      </Skeleton>
      <Flex
        css={{
          '& > *': {
            display: 'flex',
            ai: 'center',
            fontSet: '$md',

            mr: '$4',
            pr: '$4',
            minHeight: '$4',
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
          <Skeleton css={{ width: '$tw_24' }} when={fallback}>
            <TextualIcon icon={StarIcon}>
              {data?.avg_rating ? data.avg_rating : 'No review'}
            </TextualIcon>
          </Skeleton>
        </Text>
        <Text>
          <Skeleton css={{ width: '$tw_24' }} when={fallback}>
            <TextualIcon icon={ClockIcon}>1 Lectures (2 hours)</TextualIcon>
          </Skeleton>
        </Text>
        <Text>
          <Skeleton css={{ width: '$tw_24' }} when={fallback}>
            <TextualIcon icon={MixIcon}>{data?.category}</TextualIcon>
          </Skeleton>
        </Text>
      </Flex>
    </Box>
  )
}
