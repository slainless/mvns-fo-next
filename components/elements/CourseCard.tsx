import { Badge } from '@Components/Badge'
import { Box } from '@Components/Box'
import { HeartIcon } from '@radix-ui/react-icons'
import { FiCalendar } from 'react-icons/fi'
import { IconButton } from '@Components/IconButton'
import { isEmpty } from 'lodash-es'
import { Flex } from '@Components/Flex'
import { Text } from '@Components/Text'
import { Separator } from '@radix-ui/react-separator'
import { styled, CSS, darkTheme } from '@Theme'
import { Icon } from '@Components/Icon'
import { merge } from 'lodash-es'
import BaseCard from './BaseCard'
import Slot from '@Components/Slot'

const VisualSeparator = styled(Separator, {
  height: '2px',
  width: '$4',
  mb: '$2',
  mx: 'auto',
  backgroundColor: '$hiContrastA',
})

type Props = ReactProps<typeof BaseCard> & {
  badges?: {
    display: string
    href?: string
  }[]
  isFavorited?: boolean
  hideFavorited?: boolean
  hideSeparator?: boolean
  author?: string
  date?: string
}
export default function CourseCard(props: Props) {
  const {
    children,
    badges,
    isFavorited,
    hideFavorited,
    hideSeparator,
    backgroundUrl,
    author,
    date,
    href,
    headerCSS,
    contentCSS,
    ...rest
  } = props

  return (
    <BaseCard
      backgroundUrl={backgroundUrl}
      headerCSS={merge(
        {
          jc: 'space-between',
        },
        headerCSS
      )}
      contentCSS={merge(
        {
          jc: 'space-between',
          // '& .card-title': {
          //   color: '$loContrast',
          //   [`.${darkTheme} &`]: {
          //     color: '$hiContrast',
          //   },
          // },
        },
        contentCSS
      )}
      {...rest}
    >
      <Slot name="overlay">
        {!isEmpty(backgroundUrl) && (
          <Box
            css={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              opacity: 1,
              inset: 0,
              top: '$5',
              $$overlayColor: '$colors$loContrast',
              background:
                'linear-gradient(to bottom, transparent, $$overlayColor)',

              // [`.${darkTheme} &`]: {
              //   $$overlayColor: '$colors$loContrast',
              // },
            }}
          />
        )}
      </Slot>

      <Slot name="header">
        <Flex
          css={{
            flexDirection: 'column',
            ai: 'flex-start',
            gap: '$1',
          }}
        >
          {!isEmpty(badges) &&
            badges!.map((badge, i) => (
              <Badge
                as="a"
                interactive
                css={{ rounded: '$full', px: '$2' }}
                href={badge.href}
                key={i}
              >
                {badge.display}
              </Badge>
            ))}
        </Flex>

        {!hideFavorited && (
          <IconButton css={{ rounded: '$full' }}>
            <HeartIcon />
          </IconButton>
        )}
      </Slot>

      <Slot name="post-content">
        {!hideSeparator && <VisualSeparator />}
        {!isEmpty(author) && (
          <Text as="h4" css={{ mb: '$1' }}>
            {author}
          </Text>
        )}
        {!isEmpty(date) && (
          <Text size="2" css={{ mb: '$1', color: '$slate11' }}>
            <Icon thin={false}>
              <FiCalendar />
            </Icon>{' '}
            {date}
          </Text>
        )}
      </Slot>

      {children}
    </BaseCard>
  )
}
