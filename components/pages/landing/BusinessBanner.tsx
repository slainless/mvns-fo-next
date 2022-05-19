import { Box } from '@Components/Box'
import { Card } from '@Components/Card'
import { Flex } from '@Components/Flex'
import { Heading } from '@Components/Heading'
import { StyledSlot } from '@Components/Slot'
import { Image } from '@Components/Image'
import { TitledSection } from '@Components/TitledSection'
import { Button } from '@Components/Button'

export default function BusinessBanner() {
  return (
    <TitledSection>
      <Flex
        css={{
          minHeight: '28rem',
          position: 'relative',
          ai: 'center',
          p: '$7',
          rounded: '$3',
          backgroundColor: '$red3',
          color: '$red11',
          // borderColor: '$red6',
          // border: '1px solid $red6',
        }}
      >
        <Box
          css={{
            backgroundImage: `url('/media/business-banner.png')`,
            // filter: 'blur(1px)',
            opacity: 0.8,
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            width: '100%',
            height: '100%',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '10rem -7rem',
          }}
        />
        <Box
          css={{
            zIndex: 1,
          }}
        >
          <Heading
            as="h2"
            size="3"
            css={{
              ff: '$anybody',
              letterSpacing: '$wide',
              fontVariationSettings: `'wdth' 70`,
              color: '$red11',
              mb: '$4',
            }}
          >
            <StyledSlot
              css={{
                fontSet: '$7xl',
              }}
            >
              <span>Mavens</span>
            </StyledSlot>{' '}
            for
            <br />
            <StyledSlot
              css={{
                fontSet: '$7xl',
                fontWeight: '$bold',
                color: '$red12',
              }}
            >
              <span>Business</span>
            </StyledSlot>
          </Heading>
          <Button variant="red" size="2">
            Register Business
          </Button>
        </Box>
      </Flex>
    </TitledSection>
  )
}
