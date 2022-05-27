import { Box } from '@Components/Box'
import { Flex } from '@Components/Flex'
import { Heading } from '@Components/Heading'
import { Text } from '@Components/Text'
import { Badge } from '@Components/Badge'
import { Button } from '@Components/Button'
import { Image } from '@Components/Image'
import { AspectRatio } from '@radix-ui/react-aspect-ratio'
import { Prose } from '@Components/Prose'
import { Card } from '@Components/Card'
import { Skeleton, Conditional, If, Else } from '@Components/Conditional'
import { useRead } from './use-read'
import { DateTime } from 'luxon'
import parse from 'html-react-parser'
import Sharer from '@Components/Sharer'

export default function Article() {
  const { data: $data } = useRead()
  const data = $data?.data
  const fallback = data == null
  // fallback = true

  return (
    <Box>
      <Box css={{ mb: '$6' }}>
        <Conditional value={fallback}>
          <If is={true}>
            <Flex css={{ gap: '$2', mb: '$2' }}>
              <Badge variant="gray" size="2">
                <Skeleton css={{ width: '$tw_12' }} />
              </Badge>
              <Badge variant="gray" size="2">
                <Skeleton css={{ width: '$tw_12' }} />
              </Badge>
            </Flex>
          </If>
          <Else>
            <Flex css={{ gap: '$2', mb: '$2' }}>
              {data?.keywords?.map((i) => (
                <Badge key={i} variant="red" size="2">
                  {i}
                </Badge>
              ))}
            </Flex>
          </Else>
        </Conditional>
        <Skeleton
          variant="title"
          css={{ mb: '$4', width: '90%' }}
          when={fallback}
        >
          <Heading
            css={{
              fontSet: '$5xl',
              fontWeight: '$black',
              mb: '$4',
            }}
          >
            {data?.title}
          </Heading>
        </Skeleton>
        <Skeleton css={{ mb: '$2', width: '$tw_40' }} when={fallback}>
          <Text
            css={{
              fontSize: '$lg',
              fontWeight: '$bold',
              color: '$red11',
              mb: '$1',
            }}
          >
            {data?.user?.firstname ?? ''}
            {data?.user?.lastname ?? ''}
          </Text>
        </Skeleton>
        <Skeleton css={{ width: '$tw_28' }} when={fallback}>
          <Text
            css={{
              fontSize: '$sm',
              fontStyle: 'italic',
              color: '$slate11',
            }}
          >
            {(() => {
              if (data?.updated_at == null) return ''
              return DateTime.fromISO(data.updated_at).toLocaleString(
                DateTime.DATE_FULL
              )
            })()}
          </Text>
        </Skeleton>
      </Box>
      <Box css={{ position: 'relative', mb: '$2' }}>
        <AspectRatio ratio={16 / 9}>
          <Skeleton
            css={{ width: '100%', height: '100%', rounded: '$3' }}
            when={fallback}
          >
            <Image
              src="https://picsum.photos/800"
              css={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                rounded: '$3',
              }}
            ></Image>
          </Skeleton>
        </AspectRatio>
        <Sharer title={data?.title ?? ''}>
          <Button
            css={{
              position: 'absolute',
              left: '$2',
              bottom: '$2',
              fontWeight: '$bold',
              visibility: fallback ? 'hidden' : undefined,
            }}
            size="2"
            variant="transparentWhite"
          >
            Share
          </Button>
        </Sharer>
      </Box>
      <Text
        css={{
          pb: '$2',
          color: '$slate11',
          fontStyle: 'italic',
          pl: '$4',
          mb: '$6',
          borderBottom: '1px solid $invertColorSchemeA5',
          visibility: fallback ? 'hidden' : undefined,
        }}
      >
        This is the caption of the picture
      </Text>
      <Conditional value={fallback}>
        <If is={true}>
          <Box
            css={{
              display: 'flex',
              flexDirection: 'column',
              gap: '$3',
              mb: '$9',
            }}
          >
            <Skeleton variant="heading" css={{ width: '$tw_80', mb: '$2' }} />
            <Skeleton css={{ width: '90%' }} />
            <Skeleton css={{ width: '95%' }} />
            <Skeleton css={{ width: '93%' }} />
            <Skeleton css={{ width: '97%' }} />
            <Skeleton css={{ width: '92%' }} />
            <Skeleton
              variant="heading"
              css={{ width: '$tw_80', mb: '$2', mt: '$6' }}
            />
            <Skeleton css={{ width: '90%' }} />
            <Skeleton css={{ width: '95%' }} />
            <Skeleton css={{ width: '93%' }} />
            <Skeleton css={{ width: '97%' }} />
            <Skeleton css={{ width: '92%' }} />
          </Box>
        </If>
        <Else>
          <Prose
            css={{
              mb: '$9',
            }}
          >
            {/* <ReactMarkdown>{data?.content ?? ''}</ReactMarkdown> */}
            {parse(data?.content ?? '')}
          </Prose>
        </Else>
      </Conditional>

      <Card
        css={{ display: 'grid', gridTemplateColumns: '24rem auto' }}
        // variant="active"
      >
        <Box css={{ p: '$6' }}>
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
            Let&apos;s learn with our instructor
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
