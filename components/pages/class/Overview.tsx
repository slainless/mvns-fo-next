import { Box } from '@Components/Box'
import { Button } from '@Components/Button'
import { Flex } from '@Components/Flex'
import { Heading } from '@Components/Heading'
import { Image } from '@Components/Image'
import { Section } from '@Components/Section'
import { Text } from '@Components/Text'
import { Grid } from '@Components/Grid'
import { Card } from '@Components/Card'
import { Span } from '@Components/Span'
import { PlayIcon, StackIcon, Share1Icon } from '@radix-ui/react-icons'
import { useDetail } from './use-detail'
import { Conditional, If, Else, Skeleton } from '@Components/Conditional'
import Sharer from '@Components/Sharer'
import { ComponentProps, ElementRef, forwardRef } from 'react'

const Action = forwardRef<
  ElementRef<typeof Button>,
  ComponentProps<typeof Button> & {
    name: string
    icon: any
    href?: string
  }
>((props, ref) => {
  const { name, icon, href, children, ...rest } = props
  return (
    <Button
      ghost
      as="a"
      css={{
        flexDirection: 'column',
        maxHeight: 'initial',
        height: 'max-content',
        p: '$2',
      }}
      {...rest}
      ref={ref}
    >
      <Box css={{ mb: '$1' }}>{icon}</Box>
      <Text>{name}</Text>
    </Button>
  )
})
Action.displayName = 'Class.Overview.Action'

export default function Hero() {
  let { data: $data } = useDetail()
  const data = $data?.data
  const fallback = $data == null

  return (
    <Box as="section" id="hero" css={{ backgroundColor: '$slate1', pb: '$6' }}>
      <Section as="div" size="2" css={{ px: 0 }}>
        <Grid css={{ gridTemplateColumns: '55% 45%', ai: 'center' }}>
          <Skeleton
            css={{
              width: '100%',
              height: '100%',
              minHeight: '28rem',
              rounded: '$3',
            }}
            when={fallback}
          >
            <Image
              id="hero-image"
              css={{
                display: fallback ? 'none' : undefined,
                pointerEvents: 'none',
                objectFit: 'cover',
                objectPosition: 'top',
                // maxHeight: '$tw_72',

                '@lg': {
                  // maxHeight: 'initial',
                  height: '100%',
                  roundedX: '$2xl',
                },
              }}
              src={data?.image}
            />
          </Skeleton>
          <Flex
            id="hero-callout"
            direction="column"
            css={{
              textAlign: 'center',
              ai: 'center',
              jc: 'center',
              width: '100%',
              py: '$6',
              px: '$8',
              // width: 'max-content',
              mx: 'auto',

              // '@lg': {
              //   // width: '$tw_5p12',
              // },
            }}
          >
            <Skeleton
              variant="title"
              css={{ width: '100%', mb: '$3' }}
              when={fallback}
            >
              <Heading
                as="h1"
                css={{
                  display: fallback ? 'none' : undefined,
                  fontSet: '$4xl',
                  fontVariationSettings: `'wdth' 70`,
                  // textTransform: 'uppercase',
                  fontWeight: '$bold',
                  display: 'inline',
                  mb: '$3',
                  // mx: 'auto',
                }}
              >
                {data?.title}
              </Heading>
            </Skeleton>
            <Skeleton css={{ width: '$tw_32', mb: '$6' }} when={fallback}>
              <Text
                size="4"
                css={{
                  color: '$slate12',
                  mb: '$6',
                  fontWeight: '$bold',
                  '&::before': {
                    content: 'by ',
                    color: '$slate11',
                    mr: '$1',
                  },
                }}
              >
                <em>
                  {data?.instructor_user?.firstname ?? ''}{' '}
                  {data?.instructor_user?.lastname ?? ''}
                </em>
              </Text>
            </Skeleton>
            <Conditional value={fallback}>
              <If is={true}>
                <Flex
                  direction="column"
                  css={{ mb: '$6', ai: 'center', gap: '$3' }}
                >
                  <Skeleton css={{ width: '$tw_80' }} />
                  <Skeleton css={{ width: '$tw_96' }} />
                  <Skeleton css={{ width: '$tw_80' }} />
                </Flex>
              </If>
              <Else>
                <Text
                  css={{
                    fontSet: '$md',
                    maxWidth: '40ch',
                    mb: '$6',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    // mx: 'auto',
                    // lineHeight: '1.5',
                  }}
                >
                  {data?.description}
                </Text>
              </Else>
            </Conditional>
            <Flex
              css={{
                gap: '$2',
                mb: '$4',
                visibility: fallback ? 'hidden' : undefined,
              }}
            >
              <Action name="Trailer" icon={<PlayIcon />} />
              <Action name="Sample" icon={<StackIcon />} />
              <Sharer title={data?.title ?? ''}>
                <Action name="Share" icon={<Share1Icon />} />
              </Sharer>
            </Flex>
            <Card css={{ p: '$4', display: 'flex', gap: '$6', ai: 'center' }}>
              <Skeleton css={{ width: '$tw_24' }} when={fallback}>
                <Text size="4">
                  <Span css={{ mr: '$1' }}>Price:</Span>
                  <Span css={{ color: '$red11', fontWeight: '$semibold' }}>
                    $30
                  </Span>
                </Text>
              </Skeleton>
              <Button
                variant="red"
                size="3"
                css={{
                  visibility: fallback ? 'hidden' : undefined,
                }}
              >
                Add to cart
              </Button>
            </Card>
          </Flex>
        </Grid>
      </Section>
    </Box>
  )
}
