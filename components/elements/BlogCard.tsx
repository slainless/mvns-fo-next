import { Badge } from '@Components/Badge'
import { Box } from '@Components/Box'
import { FiCalendar } from 'react-icons/fi'
import { isEmpty } from 'lodash-es'
import { Flex } from '@Components/Flex'
import { Text } from '@Components/Text'
import { Icon } from '@Components/Icon'
import { merge } from 'lodash-es'
import BaseCard from './BaseCard'
import Slot from '@Components/Slot'

type Props = ReactProps<typeof BaseCard> & {
  badges?: {
    display: string
    href?: string
  }[]
  date?: string | Date
  summary?: string
}
export default function BlogCard(props: Props) {
  const {
    children,
    badges,
    backgroundUrl,
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
          textAlign: 'left',
          p: '$6',
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
            badges!.map((badge) => (
              <Badge
                as="a"
                interactive
                css={{ rounded: '$full', px: '$2' }}
                href={badge.href}
              >
                {badge.display}
              </Badge>
            ))}
        </Flex>
      </Slot>

      <Slot name="post-content">
        {!isEmpty(date) && (
          <Text size="2" css={{ mb: '$1', color: '$slate11' }}>
            <Icon>
              <FiCalendar />
            </Icon>{' '}
            {date?.toString()}
          </Text>
        )}
      </Slot>

      {children}
    </BaseCard>
  )
}
