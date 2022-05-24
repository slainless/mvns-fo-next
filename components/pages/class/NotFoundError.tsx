import * as ErrorCard from '@Components/ErrorCard'
import { Text } from '@Components/Text'
import { Box } from '@Components/Box'
import { Image } from '@Components/Image'
import { Flex } from '@Components/Flex'
import { Button } from '@Components/Button'
import Link from 'next/link'
import { APIError } from '@Models/response'
import { styled } from '@Theme'

export default function AnyError(props: { error: APIError.Generic }) {
  const { error } = props
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
          src="/media/sparks/confused-2.png"
          css={{
            width: '$tw_48',
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
            Course not found!
          </ErrorCard.Heading>
          <Text size="4">
            The course you are looking for doesn&apos;t exist.
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
