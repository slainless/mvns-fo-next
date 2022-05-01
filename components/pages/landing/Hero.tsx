import { Box } from '@Components/Box'
import { Button } from '@Components/Button'
import { Flex } from '@Components/Flex'
import { Heading } from '@Components/Heading'
import { Image } from '@Components/Image'
import { Link } from '@Components/Link'
import { Paragraph } from '@Components/Paragraph'
import { Text } from '@Components/Text'

export default function Hero() {
  return (
    <Flex
      as="section"
      align="center"
      css={{
        width: '100%',
        gap: '$tw_16',
        order: '$first',
        flexDirection: 'column',

        '@lg': {
          gap: '0',
          flexDirection: 'row',
        },
      }}
      id="hero"
    >
      <Image
        id="hero-image"
        css={{
          width: '100%',
          pointerEvents: 'none',
          maxHeight: '$72',
          objectFit: 'cover',
          objectPosition: 'top',
          maxHeight: '$tw_72',

          '@lg': {
            maxHeight: 'initial',
            width: '$tw_7p12',
            roundedR: '$2xl',
          },
        }}
        src="/media/landing/hero.jpg"
      />
      <Flex
        id="hero-callout"
        direction="column"
        css={{
          textAlign: 'center',
          ai: 'center',
          width: 'max-content',
          mx: 'auto',

          // '@lg': {
          //   // width: '$tw_5p12',
          // },
        }}
      >
        <Heading
          as="h1"
          css={{
            fontFamily: '$display',
            textTransform: 'uppercase',
            fontWeight: '$black',
            mb: '$5',
            // mx: 'auto',
            width: 'max-content',
          }}
        >
          <Text
            as="span"
            css={{
              fontSet: '$8xl',
              fontWeight: 'inherit',
              lineHeight: '0.5 !important',

              '@sm': {
                fontSet: '$9xl',
              },
              '@lg': {
                fontSet: '$8xl',
              },
            }}
          >
            Get
          </Text>
          <br />
          <Text
            as="span"
            css={{
              color: '$red9',
              fontSet: '$5xl',
              fontWeight: 'inherit',

              '@sm': {
                fontSet: '$6xl',
              },
              '@lg': {
                fontSet: '$6xl',
              },
            }}
          >
            Certified!
          </Text>
        </Heading>
        <Paragraph
          size="1"
          css={{
            maxWidth: '30ch',
            // mx: 'auto',
            mb: '$5',
            // lineHeight: '1.5',
          }}
        >
          Learn from the most inspiring artists, leaders, and icons in the
          world.
        </Paragraph>
        <Button
          size="3"
          css={{
            width: '100%',
            mb: '$3',
          }}
        >
          Register Now
        </Button>
        <Text>
          Not sure what to learn?{' '}
          <Link css={{ ml: '$1' }}>View all classes</Link>
        </Text>
      </Flex>
    </Flex>
  )
}
