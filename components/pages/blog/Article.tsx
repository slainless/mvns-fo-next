import { Box } from '@Components/Box'
import { Flex } from '@Components/Flex'
import { Heading } from '@Components/Heading'
import { Text } from '@Components/Text'
import { Badge } from '@Components/Badge'
import { Button } from '@Components/Button'
import { Image } from '@Components/Image'
import { AspectRatio } from '@radix-ui/react-aspect-ratio'
import { Prose } from '@Components/Prose'
import ReactMarkdown from 'react-markdown'
import { Card } from '@Components/Card'

export default function Article() {
  return (
    <Box>
      <Box
        css={{
          mb: '$6',
        }}
      >
        <Flex
          css={{
            gap: '$2',
            mb: '$2',
          }}
        >
          {['News', 'Tech'].map((i) => (
            <Badge variant="red" size="2">
              {i}
            </Badge>
          ))}
        </Flex>
        <Heading
          css={{
            fontSet: '$5xl',
            fontWeight: '$black',
            mb: '$4',
          }}
        >
          Briefly Explaining What Self-Care Is (And What It Isn’t)
        </Heading>
        <Text
          css={{
            fontSize: '$lg',
            fontWeight: '$bold',
            color: '$red11',
            mb: '$1',
          }}
        >
          Paul Bankhead
        </Text>
        <Text
          css={{
            fontSize: '$sm',
            fontStyle: 'italic',
            color: '$slate11',
          }}
        >
          January 20, 2022
        </Text>
      </Box>
      <Box
        css={{
          position: 'relative',
          mb: '$2',
        }}
      >
        <AspectRatio ratio={16 / 9}>
          <Image
            src="https://picsum.photos/800"
            css={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              rounded: '$3',
            }}
          ></Image>
        </AspectRatio>
        <Button
          css={{
            position: 'absolute',
            left: '$2',
            bottom: '$2',
            fontWeight: '$bold',
          }}
          size="2"
          variant="transparentWhite"
        >
          Share
        </Button>
      </Box>
      <Text
        css={{
          pb: '$2',
          color: '$slate11',
          fontStyle: 'italic',
          pl: '$4',
          mb: '$6',
          borderBottom: '1px solid $invertColorSchemeA5',
        }}
      >
        This is the caption of the picture
      </Text>
      <Prose
        css={{
          mb: '$9',
        }}
      >
        <ReactMarkdown
          children={`
## What is Lorem Ipsum?

Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

## Why do we use it?

It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).

## Where does it come from?

Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.

## Where can I get some?

There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
        `}
        />
      </Prose>
      <Card
        css={{
          // mt: '$9',
          display: 'grid',
          gridTemplateColumns: '24rem auto',
        }}
        // variant="active"
      >
        <Box
          css={{
            p: '$6',
          }}
        >
          <Heading
            css={{
              fontSet: '$4xl',
              lineHeight: '0.8 !important',
              // textTransform: 'uppercase',
              color: '$slate11',
              fontWeight: 'bold',
              // fontVariationSettings: `i 70`,
              ff: '$libreFranklin',
              letterSpacing: '$tighter',
              mb: '$3',
            }}
          >
            Let's learn with our instructor
          </Heading>
          <Button variant="red" size="2">
            Register
          </Button>
        </Box>
        <Box
          css={{
            width: '100%',
            height: '100%',
            backgroundSize: 'cover',
            roundedR: '$3',
            backgroundPosition: 'center',
            backgroundImage: `url('/media/stocks/mimi-thian-196FBkoiApU-unsplash.jpg')`,
          }}
        ></Box>
      </Card>
    </Box>
  )
}
