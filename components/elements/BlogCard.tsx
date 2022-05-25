import { isEmpty } from 'lodash-es'
import { Flex } from '@Components/Flex'
import * as Card from '@Components/DisplayCard'
import { ComponentProps, ElementRef, forwardRef } from 'react'
import Link from 'next/link'
import { makeDisplayName } from '@Functions/display-name'

const name = makeDisplayName(`BlogCard`)

/* -------------------------------------------------------------------------- */
/*                               Main Component                               */
/* -------------------------------------------------------------------------- */

export * from '@Components/DisplayCard'

export type BlogCardData = {
  itemId?: number
  badges?: {
    display?: string
    href?: string
  }[]
  date?: string | Date
  summary?: string
  backgroundUrl?: string
}

type CardType = typeof Card.Root
export const BlogCard = forwardRef<
  ElementRef<CardType>,
  ComponentProps<CardType> & BlogCardData
>((props, ref) => {
  const { title, badges, backgroundUrl, date, itemId } = props
  const titleEl = (
    <Card.Title
      as="a"
      css={{
        color: 'white',
        rounded: '$2',
      }}
      overlay={itemId != null}
    >
      {title}
    </Card.Title>
  )

  return (
    <Card.Root>
      <Card.Overlay
        as="img"
        src={backgroundUrl}
        css={{
          objectFit: 'cover',
        }}
      />
      <Card.Overlay
        css={{
          rounded: '$3',
          $$overlayColor: '$colors$blackA11',
          background: 'linear-gradient(to bottom, transparent, $$overlayColor)',
        }}
      />
      <Card.Header>
        <Flex
          css={{
            flexDirection: 'column',
            ai: 'flex-start',
            gap: '$1',
          }}
        >
          {!isEmpty(badges) &&
            badges!.map((badge, i) => (
              <Card.Badge as="a" href={badge.href} key={i}>
                {badge.display}
              </Card.Badge>
            ))}
        </Flex>
      </Card.Header>
      <Card.Content>
        {itemId != null ? (
          <Link href={`/blog/read?id=${itemId}`} passHref>
            {titleEl}
          </Link>
        ) : (
          titleEl
        )}

        <Card.ContentSeparator
          css={{
            my: '$2',
            mx: 'auto',
            bc: '$whiteA11',
          }}
        />

        {!isEmpty(date) && (
          <Card.Date
            css={{
              mt: '$1',
              color: '$whiteA12',
            }}
          >
            {date}
          </Card.Date>
        )}
      </Card.Content>
    </Card.Root>
  )
})
BlogCard.displayName = name('Card')

export default BlogCard
