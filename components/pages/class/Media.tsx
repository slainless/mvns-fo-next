import { Box } from '@Components/Box'
import { Text } from '@Components/Text'
import { Badge } from '@Components/Badge'
import { FiGrid, FiRadio } from 'react-icons/fi'
import { TitledSection } from '@Components/TitledSection'
import { Heading } from '@Components/Heading'
import { Button } from '@Components/Button'
import { Grid } from '@Components/Grid'
import { StyledSlot } from '@Components/Slot'
import { Flex } from '@Components/Flex'
import { Card } from '@Components/Card'
import { styled } from '@Theme'
import {
  StarIcon,
  ClockIcon,
  MixIcon,
  CardStackIcon,
  PlayIcon,
} from '@radix-ui/react-icons'
import { AspectRatio } from '@radix-ui/react-aspect-ratio'
import { useCourseStore } from './use-detail'
import shallow from 'zustand/shallow'
import { Skeleton, Conditional, If, Else } from '@Components/Conditional'

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
export default function Media() {
  let { result, fallback } = useCourseStore(
    (state) => ({
      result: state.acceptedData,
      fallback: state.shouldFallback,
    }),
    shallow
  )
  const data = result?.data
  // fallback = true

  return (
    <Grid css={{ gridTemplateColumns: '70% auto', mt: '$6', gap: '$6' }}>
      <Box>
        <AspectRatio ratio={16 / 9}>
          <Skeleton css={{ width: '100%', height: '100%' }} when={fallback}>
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/oTKXv191tYU"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </Skeleton>
        </AspectRatio>
      </Box>
      <Grid css={{ gridTemplateRows: 'max-content max-content auto' }}>
        <Grid
          css={{
            gap: '$2',
            visibility: fallback ? 'hidden' : undefined,
            gridTemplateColumns: 'repeat(2, 1fr)',
            [`& > ${Button}`]: {
              jc: 'flex-start',
              // py: '$4',
              '& > svg': {
                mr: '$2',
              },
            },
          }}
        >
          <Button size="2" variant="blue">
            <TextualIcon icon={PlayIcon}>Watch Trailer</TextualIcon>
          </Button>
          <Button size="2" variant="green">
            <TextualIcon icon={CardStackIcon}>Class Gallery</TextualIcon>
          </Button>
        </Grid>
        <Heading
          as="h4"
          css={{
            my: '$3',
            color: '$slate11',
            // visibility: fallback ? 'hidden' : undefined,
          }}
        >
          Lessons
        </Heading>
        <Card
          css={{
            // flexGrow: 1,
            height: 'max-content',
            position: 'relative',
            // overflow: 'auto',
          }}
        >
          <Conditional value={fallback}>
            <If is={true}>
              <Flex direction="column" css={{ py: '$4', px: '$6', gap: '$6' }}>
                <Skeleton css={{ width: '90%' }} />
                <Skeleton css={{ width: '95%' }} />
                <Skeleton css={{ width: '85%' }} />
                <Skeleton css={{ width: '90%' }} />
              </Flex>
            </If>
            <Else>
              <Box
                as="ol"
                css={{
                  px: '$6',
                  my: 0,
                  position: 'absolute',
                  maxHeight: '100%',
                  overflow: 'auto',
                  '& > li': {
                    py: '$3',
                    position: 'relative',
                    '&:not(:last-child)::after': {
                      content: '',
                      height: '1px',
                      width: 'calc(100% + $6 + $6)',
                      backgroundColor: '$slate6',
                      position: 'absolute',
                      bottom: 0,
                      left: '$-6',
                    },
                    '& > span': {
                      lineHeight: '$sm',
                      display: 'inline-flex',
                      pl: '$2',
                    },
                  },
                }}
              >
                {data?.lessons?.map((i, k) => (
                  <li key={k}>
                    <span>{i.title}</span>
                  </li>
                ))}
              </Box>
            </Else>
          </Conditional>
        </Card>
      </Grid>
    </Grid>
  )
}
