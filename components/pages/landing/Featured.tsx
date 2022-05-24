// import { Card } from '@Components/Card'
// import CourseCard from '@Components/CourseCard'
import { TitledSection } from '@Components/TitledSection'
import { Slot } from '@Components/Slot'
import { Badge } from '@Components/Badge'
import { Box } from '@Components/Box'
import { Grid } from '@Components/Grid'
import { Flex } from '@Components/Flex'
import { Image } from '@Components/Image'
import { Button } from '@Components/Button'
import { Icon } from '@Components/Icon'
import { PlayIcon } from '@radix-ui/react-icons'
import * as Card from '@Components/CourseCard'
import { useAuthUserStore } from '@Methods/auth'

export default function Featured() {
  const user = useAuthUserStore((state) => state.user)
  return (
    <TitledSection title="New classes added every month">
      <Card.Root>
        {/* <Card.Overlay
          as="img"
          src={backgroundUrl}
          css={{
            objectFit: 'cover',
          }}
        /> */}
        <Grid
          css={{
            gridTemplateColumns: 'auto $sizes$tw_96',
            height: '28rem',
          }}
        >
          <Box
            css={{
              position: 'relative',
            }}
          >
            <Card.Overlay
              as="img"
              src="/media/featured-image.png"
              css={{
                objectFit: 'cover',
                roundedR: 0,
                zIndex: 0,
              }}
            />
            <Card.Header>
              <Flex
                css={{
                  flexDirection: 'column',
                  ai: 'flex-start',
                  gap: '$1',
                  zIndex: 1,
                }}
              >
                {[
                  { display: 'Video', href: '' },
                  { display: 'Financial literature', href: '' },
                ].map((badge, i) => (
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
            </Card.Header>
          </Box>
          <Flex
            css={{
              position: 'relative',
              ai: 'center',
            }}
          >
            <Card.Header
              css={{
                position: 'absolute',
                top: 0,
                right: 0,
              }}
            >
              {user != null && (
                <Card.FavoriteButton
                  css={{
                    rounded: '$full',
                  }}
                />
              )}
            </Card.Header>
            <Card.Content>
              <Badge
                variant="red"
                css={{
                  mb: '$2',
                }}
              >
                New
              </Badge>

              <Card.Title as="a" href="/" overlay>
                Politics: Inclusive Leadership
              </Card.Title>
              <Card.ContentSeparator
                css={{
                  my: '$2',
                  mx: 'auto',
                }}
              />
              <Card.Subtitle
                css={{ mt: '$1', maxWidth: 'max-content', mx: 'auto' }}
              >
                Bill Clinton
              </Card.Subtitle>
              <Card.Price
                css={{
                  my: '$2',
                  bc: '$slate5',
                  p: '$1',
                  width: 'max-content',
                  mx: 'auto',
                }}
              >
                $ 30
              </Card.Price>
              <Box
                css={{
                  mx: 'auto',
                  maxWidth: 'max-content',
                }}
              >
                <Card.Date
                  css={{
                    mt: '$1',
                  }}
                >
                  January 18, 2022
                </Card.Date>
              </Box>
              <Button size="2" css={{ mt: '$2', zIndex: 1 }}>
                <Icon css={{ mr: '$1' }}>
                  <PlayIcon />
                </Icon>
                Watch Trailer
              </Button>
            </Card.Content>
          </Flex>
        </Grid>
      </Card.Root>
    </TitledSection>
  )
}
