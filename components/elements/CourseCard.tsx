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
import { useFavorite } from './CourseCard/favorite'
import Link from 'next/link'

/* -------------------------------------------------------------------------- */
/*                            Extension Components                            */
/* -------------------------------------------------------------------------- */

/* ---------------------------------- Price --------------------------------- */

const StyledPrice = styled(Text, {
  fontWeight: '$bold',
  ff: '$spaceGrotesk',
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
        <Link href={`/class/detail?id=${itemId}`} passHref>
          <Card.Title
            as="a"
            css={{
              color: 'white',
              rounded: '$2',
            }}
            overlay
          >
            {title}
          </Card.Title>
        </Link>

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
export default CourseCard

// type Props = ReactProps<typeof BaseCard> & CourseCardData
// export default function CourseCard(props: Props) {
//   const {
//     children,
//     badges,
//     isFavorited,
//     hideFavorited,
//     hideSeparator,
//     backgroundUrl,
//     author,
//     date,
//     href,
//     price,
//     itemId,

//     headerCSS,
//     contentCSS,
//     ...rest
//   } = props
//   const {
//     state: isFav,
//     error: favErr,
//     loading: favLoading,
//     toggle: toggleFav,
//   } = useFavorite(itemId, isFavorited)

//   return (
//     <BaseCard
//       css={{
//         position: ''
//       }}
//       backgroundUrl={backgroundUrl}
//       href={itemId ? `/class/detail?id=${itemId}` : undefined}
//       headerCSS={merge(
//         {
//           jc: 'space-between',
//         },
//         headerCSS
//       )}
//       contentCSS={merge(
//         {
//           jc: 'space-between',
//           [`& .card-title`]: {
//             color: 'white',
//             // bc: '$blackA10',
//             rounded: '$2',
//           },
//           // '& .card-title': {
//           //   color: '$loContrast',
//           //   [`.${darkTheme} &`]: {
//           //     color: '$hiContrast',
//           //   },
//           // },
//         },
//         contentCSS
//       )}
//       {...rest}
//     >
//       <Slot name="overlay">
//         {!isEmpty(backgroundUrl) && (
//           <Box
//             css={{
//               position: 'absolute',
//               width: '100%',
//               height: '100%',
//               opacity: 1,
//               bottom: 0,
//               rounded: '$3',
//               $$overlayColor: '$colors$blackA11',
//               background:
//                 'linear-gradient(to bottom, transparent, $$overlayColor)',

//               // [`.${darkTheme} &`]: {
//               //   $$overlayColor: '$colors$loContrast',
//               // },
//             }}
//           />
//         )}
//       </Slot>

//       <Slot name="header">
//         <Flex
//           css={{
//             flexDirection: 'column',
//             ai: 'flex-start',
//             gap: '$1',
//           }}
//         >
//           {!isEmpty(badges) &&
//             badges!.map((badge, i) => (
//               <Badge
//                 as="a"
//                 interactive
//                 css={{ rounded: '$full', px: '$2' }}
//                 href={badge.href}
//                 key={i}
//               >
//                 {badge.display}
//               </Badge>
//             ))}
//         </Flex>

//         {!hideFavorited && (
//           <IconButton css={{ rounded: '$full' }} onClick={toggleFav}>
//             {isFav ? <HeartFilledIcon /> : <HeartIcon />}
//           </IconButton>
//         )}
//       </Slot>

//       <Slot name="post-content">
//         {!hideSeparator && (
//           <VisualSeparator className="separator" css={{ bc: '$whiteA11' }} />
//         )}
//         {!isEmpty(price) && (
//           <Text
//             size="4"
//             css={{
//               mb: '$1',
//               fontWeight: '$bold',
//               bc: '$blackA11',
//               width: 'max-content',
//               mx: 'auto',
//               p: '$1',
//               rounded: '$1',
//               color: '$whiteA12',
//               ff: '$spaceGrotesk',
//             }}
//           >
//             $ {price}
//           </Text>
//         )}
//         {!isEmpty(author) && (
//           <Text as="h4" css={{ mb: '$1' }}>
//             {author}
//           </Text>
//         )}
//         {!isEmpty(date) && (
//           <Text
//             size="2"
//             className="date"
//             css={{ mb: '$1', color: '$whiteA12' }}
//           >
//             <Icon thin={false}>
//               <FiCalendar />
//             </Icon>{' '}
//             {date}
//           </Text>
//         )}
//       </Slot>

//       {children}
//     </BaseCard>
//   )
// }
