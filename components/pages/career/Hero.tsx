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
    <Box
      size="2"
      // as="section"
      css={{
        display: 'flex',
        width: '100%',
        height: '28rem',
        gap: '$tw_16',
        order: '$first',
        flexDirection: 'column',
        position: 'relative',
        ai: 'center',
        px: 0,

        '@lg': {
          gap: '0',
          flexDirection: 'row',
        },
      }}
      id="hero"
    >
      <Box
        id="hero-image"
        css={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 0,
          pointerEvents: 'none',
          backgroundImage: `url('/media/career-banner.jpg')`,
          backgroundSize: 'cover',

          // '&::after': {
          //   content: '',
          //   width: '100%',
          //   height: '$4',
          //   backgroundImage: `linear-gradient(to bottom, transparent, $loContrast)`,
          //   position: 'absolute',
          //   bottom: 0,
          // },
        }}
      />
      <Box
        css={{
          zIndex: 1,
          justifySelf: 'start',
          // mx: 0,
          width: '100%',
        }}
        container={'xl'}
      >
        <Flex
          id="hero-callout"
          direction="column"
          css={{
            textAlign: 'center',
            ai: 'center',
            width: '$sm',
            // mx: 'auto',

            // '@lg': {
            //   // width: '$tw_5p12',
            // },
          }}
        >
          <Heading
            as="h1"
            css={{
              ff: '$anybody',
              fontSet: '$8xl',
              fontVariationSettings: `'wdth' 70`,
              textTransform: 'uppercase',
              fontWeight: '$bold',
              mb: '$3',
              // mx: 'auto',
              width: 'max-content',
              color: 'white',
            }}
          >
            Careers
          </Heading>
        </Flex>
      </Box>
    </Box>
  )
}
