import { Avatar } from '@Components/Avatar'
import { Flex } from '@Components/Flex'
import { Box } from '@Components/Box'
import { Text } from '@Components/Text'
import { TitledSection } from '@Components/TitledSection'
import { Paragraph } from '@Components/Paragraph'
import { useCourseStore } from './use-detail'
import shallow from 'zustand/shallow'
import { Skeleton } from '@Components/Skeleton'
import { DateTime } from 'luxon'

export default function Instructor() {
  let { result, fallback } = useCourseStore(
    (state) => ({
      result: state.acceptedData,
      fallback: state.shouldFallback,
    }),
    shallow
  )
  const data = result?.data

  return (
    <TitledSection
      title="Instructor"
      size="2"
      css={{
        pt: '$7',
      }}
    >
      <Flex
        css={{
          gap: '$6',
          ai: 'center',
          mb: '$5',
        }}
      >
        {fallback ? (
          <Skeleton variant="avatar6" />
        ) : (
          <Avatar size="6" fallback="F" src="https://i.pravatar.cc/300" />
        )}
        <Box>
          {fallback ? (
            <Skeleton
              variant="heading"
              css={{
                width: '$tw_32',
                mb: '$2',
              }}
            />
          ) : (
            <Text
              size="6"
              css={{
                fontWeight: '$bold',
                mb: '$1',
              }}
            >
              {data?.instructor_user.firstname ?? ''}{' '}
              {data?.instructor_user.lastname ?? ''}
            </Text>
          )}
          {fallback ? (
            <Skeleton
              css={{
                width: '$tw_64',
              }}
            />
          ) : (
            <Text
              // size="6"
              css={{
                color: '$slate11',
              }}
            >
              {(() => {
                const year = DateTime.fromISO(
                  data?.instructor_user.created_at ?? ''
                ).year
                if (Number.isNaN(year)) return ''
                return `Hosted on mavensdotlive since ${year}`
              })()}
            </Text>
          )}
        </Box>
      </Flex>
      {fallback ? (
        <Flex
          direction="column"
          css={{
            gap: '$3',
            maxWidth: '60ch',
          }}
        >
          <Skeleton
            css={{
              width: '90%',
            }}
          />
          <Skeleton
            css={{
              width: '95%',
            }}
          />
          <Skeleton
            css={{
              width: '93%',
            }}
          />
          <Skeleton
            css={{
              width: '70%',
            }}
          />
        </Flex>
      ) : (
        <Paragraph
          css={{
            maxWidth: '60ch',
          }}
        >
          Pg Muhd Uwuis Al Qarni is a certified Professional Scrum Master,
          Product Owner and a Business Coach with his vast experience mainly in
          Software Development Projects. He is keen to support the community in
          coaching startups with their product designs and business model.
        </Paragraph>
      )}
    </TitledSection>
  )
}
