import { Badge as _Badge } from '@Components/Badge'
import { HeartFilledIcon, HeartIcon } from '@radix-ui/react-icons'
import { FiCalendar } from 'react-icons/fi'
import { IconButton } from '@Components/IconButton'
import { isEmpty } from 'lodash-es'
import { Flex } from '@Components/Flex'
import { Text } from '@Components/Text'
import { Separator } from '@radix-ui/react-separator'
import { styled, CSS, darkTheme } from '@Theme'
import { Icon } from '@Components/Icon'
import * as Card from '@Components/DisplayCard'
import { Alert } from '@Components/Alert'
import { forwardRef, useState, ElementRef, ComponentProps } from 'react'
import { useFavorite } from './CourseCard/use-favorite'
import Link from 'next/link'
import { makeDisplayName } from '@Functions/display-name'

const name = makeDisplayName('CourseCard')

/* -------------------------------------------------------------------------- */
/*                            Extension Components                            */
/* -------------------------------------------------------------------------- */

/* ---------------------------------- Price --------------------------------- */

const StyledPrice = styled(Text, {
  fontWeight: '$bold',
  ff: '$poppins',
  defaultVariants: {
    size: '4',
  },
})
export const Price = StyledPrice
export const CourseCardPrice = StyledPrice

/* -------------------------------- Favorite -------------------------------- */

const _FavoriteButton = forwardRef<
  ElementRef<typeof IconButton>,
  Omit<ComponentProps<typeof IconButton>, 'children'> & {
    isFavorite?: boolean
  }
>(({ isFavorite, ...rest }, ref) => {
  return (
    <IconButton {...rest} ref={ref}>
      {isFavorite ? <HeartFilledIcon /> : <HeartIcon />}
    </IconButton>
  )
})
_FavoriteButton.displayName = name('FavoriteButton')

export const StyledFavoriteButton = styled(_FavoriteButton, IconButton, {
  rounded: '$full',
})
export const FavoriteButton = StyledFavoriteButton
export const CourseCardFavoriteButton = StyledFavoriteButton

/* -------------------------------------------------------------------------- */
/*                               Main Components                              */
/* -------------------------------------------------------------------------- */

export * from '@Components/DisplayCard'

export type CourseCardData = {
  title?: string
  itemId?: number
  price?: string
  badges?: {
    display?: string
    href?: string
  }[]
  isFavorited?: boolean
  hideFavorited?: boolean
  hideSeparator?: boolean
  author?: string
  date?: string
  backgroundUrl?: string
}

type CardType = typeof Card.Root
export const CourseCard = forwardRef<
  ElementRef<CardType>,
  ComponentProps<CardType> & CourseCardData
>((props, ref) => {
  const {
    title,
    badges,
    isFavorited,
    hideFavorited,
    hideSeparator,
    backgroundUrl,
    author,
    date,
    price,
    itemId,
  } = props
  const {
    state: isFav,
    error: favErr,
    loading: favLoading,
    toggle: toggleFav,
  } = useFavorite(itemId, isFavorited)

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
    <Card.Root ref={ref}>
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
      <Card.Header
        css={{
          jc: 'space-between',
        }}
      >
        <Flex
          css={{
            flexDirection: 'column',
            ai: 'flex-start',
            gap: '$1',
          }}
        >
          {!isEmpty(badges) &&
            badges!.map((badge, i) => (
              <Card.Badge
                as="a"
                href={badge.href}
                key={i}
                css={{
                  rounded: '$full',
                  px: '$2',
                }}
              >
                {badge.display}
              </Card.Badge>
            ))}
        </Flex>

        {!hideFavorited && (
          <StyledFavoriteButton onClick={toggleFav} isFavorite={isFav} />
        )}
      </Card.Header>
      <Card.Content>
        {itemId != null ? (
          <Link href={`/class/detail?id=${itemId}`} passHref>
            {titleEl}
          </Link>
        ) : (
          titleEl
        )}

        {!hideSeparator && (
          <Card.ContentSeparator
            css={{
              my: '$2',
              mx: 'auto',
              bc: '$whiteA11',
            }}
          />
        )}

        {!isEmpty(author) && (
          <Card.Subtitle css={{ mt: '$1' }}>{author}</Card.Subtitle>
        )}

        {!isEmpty(price) && (
          <StyledPrice
            css={{
              mt: '$1',
              fontWeight: '$bold',
              bc: '$blackA11',
              width: 'max-content',
              mx: 'auto',
              p: '$1',
              rounded: '$1',
              color: '$whiteA12',
            }}
          >
            $ {price}
          </StyledPrice>
        )}

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
CourseCard.displayName = name('Card')

export default CourseCard
