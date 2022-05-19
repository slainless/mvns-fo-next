import { Box } from '@Components/Box'
import { Button } from '@Components/Button'
import { Flex } from '@Components/Flex'
import { Heading } from '@Components/Heading'
import { Image } from '@Components/Image'
import { Link } from '@Components/Link'
import { Paragraph } from '@Components/Paragraph'
import { Section } from '@Components/Section'
import { Text } from '@Components/Text'

export default function Hero() {
  return (
    <Section
      size="2"
      // as="section"
      css={{
        display: 'flex',
        width: '100%',
        gap: '$tw_16',
        order: '$first',
        flexDirection: 'column',
        ai: 'center',
        px: 0,

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
          objectFit: 'cover',
          objectPosition: 'top',
          maxHeight: '$tw_72',
          // transform: 'translateX($space$4)',
          order: '$last',

          '@lg': {
            maxHeight: 'initial',
            width: '$tw_7p12',
            roundedX: '$2xl',
          },
        }}
        src="/media/instructor-hero.jpg"
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
            ff: '$anybody',
            fontSet: '$7xl',
            fontVariationSettings: `'wdth' 70`,
            textTransform: 'uppercase',
            fontWeight: '$bold',
            mb: '$3',
            // mx: 'auto',
            width: 'max-content',
          }}
        >
          <Text
            as="span"
            css={{
              display: 'inline',
              fontWeight: 'inherit',
              fontSet: 'inherit',

              '@sm': {},
            }}
          >
            Who
          </Text>{' '}
          <Text
            as="span"
            css={{
              display: 'inline',
              color: '$red9',
              fontWeight: 'inherit',
              fontSet: 'inherit',
            }}
          >
            We
          </Text>{' '}
          <Text
            as="span"
            css={{
              display: 'inline',
              fontWeight: 'inherit',
              fontSet: 'inherit',
            }}
          >
            Are.
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
          We are here for the betterment of you.
        </Paragraph>
        {/* <Button
          size="3"
          css={{
            px: '$7',
          }}
        >
          Register Now
        </Button> */}
      </Flex>
    </Section>
  )
}
