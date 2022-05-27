import * as ErrorCard from '@Components/ErrorCard'
import { Text } from '@Components/Text'
import { Image } from '@Components/Image'
import { Flex } from '@Components/Flex'
import { Button } from '@Components/Button'
import Link from 'next/link'

export default function NotFoundError() {
  return (
    <ErrorCard.Viewport>
      <ErrorCard.Alert
        css={{
          ai: 'center',
          flexDirection: 'row',
          gap: '$7',
        }}
      >
        <Image
          src="/media/sparks/umm.png"
          css={{
            width: '$tw_48',
            position: 'relative',
            bottom: '$-6',
          }}
        ></Image>
        <Flex direction="column" align="start">
          <ErrorCard.Heading
            size="3"
            variant="contrast"
            css={{
              mb: '$4',
            }}
          >
            Article not found!
          </ErrorCard.Heading>
          <Text size="4">
            The article you are looking for doesn&apos;t exist.
          </Text>
          <Link passHref href="/">
            <Button
              as="a"
              size="3"
              css={{
                // alignSelf: 'end',
                mt: '$4',
              }}
            >
              Back to Home
            </Button>
          </Link>
        </Flex>
      </ErrorCard.Alert>
    </ErrorCard.Viewport>
  )
}
