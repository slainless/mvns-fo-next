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
        variant="red"
      >
        <Image
          src="/media/sparks/sad.png"
          css={{
            width: '$tw_40',
          }}
        ></Image>
        <Flex direction="column">
          <ErrorCard.Heading
            size="4"
            css={{
              mb: '$4',
            }}
          >
            Sorry!
          </ErrorCard.Heading>
          <Text size="4" color="red">
            We encountered an issue, which is not your fault.
            <br /> Here is the error message:
          </Text>
          <Text
            size="4"
            css={{
              color: '$red12',
              my: '$4',
            }}
          >
            {error.message}
          </Text>
          <Link passHref href="/">
            <Button
              as="a"
              size="3"
              variant="red"
              css={{
                alignSelf: 'end',
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
