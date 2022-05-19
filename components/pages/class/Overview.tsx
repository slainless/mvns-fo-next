import { Box } from '@Components/Box'
import { Button } from '@Components/Button'
import { Flex } from '@Components/Flex'
import { Heading } from '@Components/Heading'
import { Image } from '@Components/Image'
import { Link, NextLink } from '@Components/Link'
import { Paragraph } from '@Components/Paragraph'
import { Section } from '@Components/Section'
import { Text } from '@Components/Text'
import { Grid } from '@Components/Grid'
import { Card } from '@Components/Card'
import { Span } from '@Components/Span'
import { StyledSlot } from '@Components/Slot'
import { PlayIcon, StackIcon, Share1Icon } from '@radix-ui/react-icons'

function Action(
  props: ReactProps<typeof Box> & {
    name: string
    icon: any
    href?: string
  }
) {
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
    >
      <Box
        css={{
          mb: '$1',
        }}
      >
        {icon}
      </Box>
      <Text>{name}</Text>
    </Button>
  )
}

export default function Hero() {
  return (
    <Box
      as="section"
      id="hero"
      css={{
        backgroundColor: '$slate1',
        pb: '$6',
      }}
    >
      <Section
        as="div"
        size="2"
        // as="section"
        css={{
          px: 0,
        }}
      >
        <Grid
          css={{
            gridTemplateColumns: '55% 45%',
            ai: 'center',
          }}
        >
          <Image
            id="hero-image"
            css={{
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
            src="/media/class-thumb.png"
          />
          <Flex
            id="hero-callout"
            direction="column"
            css={{
              textAlign: 'center',
              ai: 'center',
              jc: 'center',
              py: '$6',
              px: '$8',
              // width: 'max-content',
              mx: 'auto',

              // '@lg': {
              //   // width: '$tw_5p12',
              // },
            }}
          >
            <Heading
              as="h1"
              // size=""
              css={{
                fontSet: '$4xl',
                fontVariationSettings: `'wdth' 70`,
                // textTransform: 'uppercase',
                fontWeight: '$bold',
                display: 'inline',
                mb: '$2',
                // mx: 'auto',
              }}
            >
              Blanchard Leadership– The SLII Experience™
            </Heading>
            <Text
              size="4"
              css={{
                color: '$slate11',
                mb: '$6',
                fontWeight: '$bold',
                '& em': {
                  color: '$slate12',
                  ml: '$1',
                },
              }}
            >
              by <em>Uwais Zainal</em>
            </Text>
            <Text
              css={{
                fontSet: '$md',
                maxWidth: '40ch',
                mb: '$6',
                // mx: 'auto',
                // lineHeight: '1.5',
              }}
            >
              Next available date: 15th & 16th March 2022 SLII® is the most
              widely taught leadership model in the world. It teaches leaders to
              use the appropriate leadership
            </Text>
            <Flex
              css={{
                gap: '$2',
                mb: '$4',
              }}
            >
              <Action name="Trailer" icon={<PlayIcon />} />
              <Action name="Sample" icon={<StackIcon />} />
              <Action name="Share" icon={<Share1Icon />} />
            </Flex>
            <Card
              css={{
                p: '$4',
                display: 'flex',
                gap: '$6',
                ai: 'center',
              }}
            >
              <Text size="4">
                <Span
                  css={{
                    mr: '$1',
                  }}
                >
                  Price:
                </Span>
                <Span
                  css={{
                    color: '$red11',
                    fontWeight: '$semibold',
                  }}
                >
                  $30
                </Span>
              </Text>
              <Button variant="red" size="3">
                Add to cart
              </Button>
            </Card>
          </Flex>
        </Grid>
      </Section>
    </Box>
  )
}
