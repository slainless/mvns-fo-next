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
import { useCourseStore } from './use-detail'
import shallow from 'zustand/shallow'
import { Skeleton } from '@Components/Skeleton'

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
  let { result, fallback } = useCourseStore(
    (state) => ({
      result: state.acceptedData,
      fallback: state.shouldFallback,
    }),
    shallow
  )
  const data = result?.data

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
        {fallback ? (
          <Skeleton
            css={{
              width: '$tw_24',
            }}
          />
        ) : (
          <TextualIcon
            icon={FiRadio}
            css={{
              mr: '$2',
            }}
          >
            {data?.type} Class
          </TextualIcon>
        )}
      </Badge>
      {fallback ? (
        <Skeleton
          variant="title"
          css={{
            mb: '$2',
            maxWidth: '30ch',
            ff: '$spaceGrotesk',
            fontSet: '$5xl',
          }}
        />
      ) : (
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
      )}
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
          {fallback ? (
            <Skeleton
              css={{
                width: '$tw_24',
              }}
            />
          ) : (
            <TextualIcon icon={StarIcon}>
              {data?.avg_rating ? data.avg_rating : 'No review'}
            </TextualIcon>
          )}
        </Text>
        <Text>
          {fallback ? (
            <Skeleton
              css={{
                width: '$tw_24',
              }}
            />
          ) : (
            <TextualIcon icon={ClockIcon}>1 Lectures (2 hours)</TextualIcon>
          )}
        </Text>
        <Text>
          {fallback ? (
            <Skeleton
              css={{
                width: '$tw_24',
              }}
            />
          ) : (
            <TextualIcon icon={MixIcon}>{data?.category}</TextualIcon>
          )}
        </Text>
      </Flex>
    </Box>
  )
}
