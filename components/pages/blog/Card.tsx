import { DateTime } from 'luxon'
import { AspectRatio } from '@radix-ui/react-aspect-ratio'
import { Card } from '@Components/Card'
import { Image } from '@Components/Image'
import { Box } from '@Components/Box'
import { Badge } from '@Components/Badge'
import { Heading } from '@Components/Heading'
import { Text } from '@Components/Text'
import { Flex } from '@Components/Flex'
import { merge } from 'lodash-es'

export type ArticleCardData = {
  title?: string
  imgSrc?: string
  summary?: string
  date?: string | Date
  tags?: {
    display: string
    href?: string
  }[]
}
export default function ArticleCard(
  props: ReactProps<typeof Card> &
    ArticleCardData & {
      headingProps?: ReactProps<typeof Heading>
      contentProps?: ReactProps<typeof Box>
      summaryProps?: ReactProps<typeof Text>
      badgeProps?: ReactProps<typeof Badge>
      dateProps?: ReactProps<typeof Text>
      imageProps?: ReactProps<typeof Image>

      imgRatio?: number
    }
) {
  const {
    title,
    imgSrc,
    summary,
    date,
    tags,
    headingProps,
    contentProps,
    summaryProps,
    badgeProps,
    dateProps,
    imageProps,
    css,
    imgRatio,
    ...rest
  } = props
  const luxonDate =
    date instanceof Date
      ? DateTime.fromJSDate(date)
      : DateTime.fromISO(date ?? '')
  return (
    <Card
      css={{
        overflow: 'hidden',
        ...css,
      }}
      {...rest}
    >
      <Box className="card-img-container">
        <AspectRatio className="card-img-ar" ratio={imgRatio ?? 1.8}>
          <Image
            src={imgSrc}
            {...merge(
              {
                css: {
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                },
              },
              imageProps
            )}
          />
        </AspectRatio>
      </Box>
      <Box
        className="card-content"
        {...merge(
          {
            css: {
              p: '$4',
            },
          },
          contentProps
        )}
      >
        <Flex
          className="card-tag-container"
          css={{
            gap: '$2',
          }}
        >
          {tags?.map((tag, i) => (
            <Badge
              key={i}
              className="card-tag"
              variant="red"
              {...merge(
                {
                  css: {
                    mb: '$2',
                  },
                },
                badgeProps
              )}
            >
              {tag.display}
            </Badge>
          ))}
        </Flex>
        <Heading
          className="card-title"
          {...merge(
            {
              css: {
                pb: '$3',
                mb: '$3',
                fontWeight: '$black',
                borderBottom: '1px solid $invertColorSchemeA5',
              },
            },
            headingProps
          )}
        >
          {title}
        </Heading>
        <Text
          className="card-summary"
          {...merge(
            {
              css: {
                fontSize: '$md',
                lineHeight: '$sm',
                WebkitLineClamp: 4,
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                mb: '$2',
              },
            },
            summaryProps
          )}
        >
          {summary}
        </Text>
        <Text
          {...merge({ css: { fontSize: '$xs', color: '$slate11' } }, dateProps)}
        >
          {luxonDate.toLocaleString(DateTime.DATE_FULL)}
        </Text>
      </Box>
    </Card>
  )
}
