import { useRegisterControl } from '@Components/Auth/control'
import { Box } from '@Components/Box'
import { Button } from '@Components/Button'
import { Flex } from '@Components/Flex'
import { Heading } from '@Components/Heading'
import { Image } from '@Components/Image'
import { Link, NextLink } from '@Components/Link'
import { Paragraph } from '@Components/Paragraph'
import { Section } from '@Components/Section'
import { Text } from '@Components/Text'
import { useAuthUserStore } from '@Methods/auth'

export default function Hero() {
  const { open } = useRegisterControl()
  const user = useAuthUserStore((state) => state.user)
  if (user != null) return <></>

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
          ml: '$-4',

          '@lg': {
            maxHeight: 'initial',
            width: '$tw_7p12',
            roundedX: '$2xl',
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
            ff: '$anybody',
            fontVariationSettings: `'wdth' 70`,
            textTransform: 'uppercase',
            fontWeight: '$bold',
            mb: '$5',
            // mx: 'auto',
            width: 'max-content',
          }}
        >
          <Text
            as="span"
            css={{
              fontSet: '$9xl',
              fontWeight: 'inherit',
            }}
          >
            Get
          </Text>
          <Text
            as="span"
            css={{
              fontSet: '$7xl',
              color: '$red9',
              fontWeight: 'inherit',
              mt: '$-5',
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
          onClick={() => {
            if (user == null) open()
          }}
        >
          Register Now
        </Button>
        <Text>
          Not sure what to learn?{' '}
          <NextLink css={{ ml: '$1' }} href="/class">
            View all classes
          </NextLink>
        </Text>
      </Flex>
    </Section>
  )
}
