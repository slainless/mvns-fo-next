import { Box } from '@Components/Box'
import { Image } from '@Components/Image'
import { Card } from '@Components/Card'
import { isEmpty } from 'lodash-es'
import { Flex } from '@Components/Flex'
import { Heading } from '@Components/Heading'
import { Separator } from '@radix-ui/react-separator'
import { styled, CSS } from '@Theme'
import { merge } from 'lodash-es'
import { getSlot } from '@Functions/children'

type Props = HTMLAttr<'div'> & {
  title?: string
  href?: string
  backgroundUrl?: string

  rootCSS?: CSS
  contentCSS?: CSS
  headerCSS?: CSS
  overlayCSS?: CSS
}
export default function BaseCard(props: Props) {
  const {
    title,
    children,
    backgroundUrl,
    contentCSS,
    overlayCSS,
    rootCSS,
    headerCSS,
    href,
    ...rest
  } = props

  const slots = getSlot(
    children,
    'pre-content',
    'header',
    'post-content',
    'overlay'
  )

  return (
    <Card
      as="a"
      href={href}
      variant="interactive"
      css={merge<CSS, CSS>(
        {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          // overflow: 'hidden',
          height: 'inherit',

          '&::before': {
            zIndex: 1,
          },
        },
        rootCSS!
      )}
    >
      <Box
        className="overlay"
        css={{
          display: 'contents',
        }}
      >
        {!isEmpty(backgroundUrl) && (
          <Image
            src={backgroundUrl}
            css={{
              position: 'absolute',
              zIndex: 0,
              width: '100%',
              objectFit: 'cover',
              rounded: '$3',
              height: '100%',
              inset: 0,
            }}
          />
        )}
        {slots['overlay']}
      </Box>
      <Flex
        className="card-header"
        css={merge<CSS, CSS>(
          {
            p: '$4',
            // jc: 'space-between',
            zIndex: 2,
            // pointerEvents: 'none',
          },
          headerCSS!
        )}
      >
        {slots['header']}
      </Flex>
      <Box
        className="card-content"
        css={merge<CSS, CSS>(
          {
            p: '$4',
            textAlign: 'center',
            zIndex: 1,

            '& :last-child': {
              mb: 0,
            },
          },
          contentCSS!
        )}
      >
        {slots['pre-content']}
        {!isEmpty(title) && (
          <Heading
            as="h3"
            className="card-title"
            size="2"
            css={{ mb: '$2', ff: '$spaceGrotesk', fontWeight: '$bold' }}
          >
            {title}
          </Heading>
        )}
        {slots['post-content']}
      </Box>
    </Card>
  )
}
