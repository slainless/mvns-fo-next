import { Box } from '@Components/Box'
import { Flex } from '@Components/Flex'
import { Link } from '@Components/Link'
import { Heading } from '@Components/Heading'
import { TitledSection } from '@Components/TitledSection'

const categories: [display: string, href?: string][] = [
  ['Design'],
  ['Personal Development'],
  ['IT & Software'],
  ['Business & Policy'],
  ['Marketing'],
  ['Photography & Video'],
  ['Teaching & Academics'],
  ['Health & Fitness'],
  ['Finance & Accounting'],
]

export default function Category() {
  return (
    <Box
      css={{
        backgroundImage: `url('/media/neonbrand-1-aA2Fadydc-unsplash.jpg')`,
        backgroundSize: 'cover',
        height: '1800px',
        width: '100%',
        my: '$9',
      }}
    >
      <Flex
        container="xl"
        css={{
          py: '$6',
          position: 'sticky',
          top: '$8',
        }}
      >
        <Box
          css={{
            pl: 0,
            maxWidth: '$lg',
          }}
        >
          <Heading size="4">
            Choose a category to watch a class highlight.
          </Heading>
        </Box>
        <Box css={{ width: '100%' }}>
          <Flex
            css={{
              flexDirection: 'column',
              width: 'max-content',
              rowGap: '$2',
              mx: 'auto',
            }}
          >
            {categories.map((cat) => (
              <Link
                css={{
                  fontSet: '$3xl',
                }}
              >
                {cat[0]}
              </Link>
            ))}
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}
