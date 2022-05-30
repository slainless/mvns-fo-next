import { Box } from '@Components/Box'
import { Button } from '@Components/Button'
import { Flex } from '@Components/Flex'
import { Heading } from '@Components/Heading'
import { Image } from '@Components/Image'
import { Link } from '@Components/Link'
import { Paragraph } from '@Components/Paragraph'
import { Section } from '@Components/Section'
import { Text } from '@Components/Text'
import { styled } from '@Theme'
import NextLink from 'next/link'

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
              fontWeight: 'inherit',
              fontSet: 'inherit',

              '@sm': {},
            }}
          >
            Terms and
          </Text>
          <Text
            as="span"
            css={{
              color: '$red9',
              fontWeight: 'inherit',
              fontSet: 'inherit',
            }}
          >
            Condition
          </Text>
        </Heading>
      </Flex>
    </Section>
  )
}
