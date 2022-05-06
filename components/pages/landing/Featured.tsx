import { Card } from '@Components/Card'
import CourseCard from '@Components/CourseCard'
import { TitledSection } from '@Components/TitledSection'
import { Slot } from '@Components/Slot'
import { Badge } from '@Components/Badge'
import { Box } from '@Components/Box'
import { Image } from '@Components/Image'
import { Button } from '@Components/Button'
import { Icon } from '@Components/Icon'
import { PlayIcon } from '@radix-ui/react-icons'

export default function Featured() {
  return (
    <TitledSection title="New classes added every month">
      <CourseCard
        title="Politics: Inclusive Leadership"
        author="Bill Clinton"
        date="January 18, 2022"
        rootCSS={{
          height: '32rem',
        }}
        contentCSS={{
          position: 'absolute',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '$tw_96',
          alignSelf: 'flex-end',
          p: '$6',
        }}
      >
        <Slot name="overlay">
          <Image
            src="/media/featured-image.png"
            css={{
              position: 'absolute',
              zIndex: 0,
              width: 'calc(100% - $tw_96)',
              objectFit: 'cover',
              objectPosition: 'left',
              height: '100%',
              inset: 0,
            }}
          ></Image>
        </Slot>
        <Slot name="pre-content">
          <Badge
            variant="gray"
            css={{
              mb: '$2',
            }}
          >
            New
          </Badge>
        </Slot>
        <Slot name="post-content">
          <Button size="2" css={{ mt: '$2' }}>
            <Icon css={{ mr: '$1' }}>
              <PlayIcon />
            </Icon>
            Watch Trailer
          </Button>
        </Slot>
      </CourseCard>
    </TitledSection>
  )
}
