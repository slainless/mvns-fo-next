import { Box } from '@Components/Box'
import { Flex } from '@Components/Flex'
import { Grid } from '@Components/Grid'
import { Link } from '@Components/Link'
import { Text } from '@Components/Text'
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
        position: 'relative',
        height: '1800px',
        width: '100%',
        mt: '$9',
      }}
    >
      <Box
        css={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          inset: 0,
          transitionProperty: 'all',
          transitionTimingFunction: '$in-out',
          transitionDuration: '100ms',
          backgroundColor: '$blackA9',
          ':hover > &': {
            backgroundColor: '$blackA11',
          },
        }}
      ></Box>
      <Grid
        columns={2}
        container="xl"
        css={{
          py: '$9',
          position: 'sticky',
          top: '$8',
          columnGap: '$9',
        }}
      >
        <Box
          css={{
            pl: 0,
            maxWidth: '$lg',
          }}
        >
          <Heading
            size="4"
            css={{
              fontWeight: '$black',
              color: '$whiteA11',
            }}
          >
            Choose a category to watch a class highlight.
          </Heading>
        </Box>
        <Box css={{ width: '100%' }}>
          <Flex
            css={{
              flexDirection: 'column',
              width: 'max-content',
              rowGap: '$2',
              ff: '$spaceGrotesk',
              fontWeight: '$semibold',
            }}
          >
            {categories.map((cat) => (
              <Text
                css={{
                  fontSet: '$4xl',
                  fontWeight: 'inherit',
                  color: '$whiteA11',
                  dropShadow: '$md',
                  transitionTimingFunction: '$in-out',
                  transitionProperty: 'all',
                  transitionDuration: '100ms',

                  '&:hover': {
                    color: '$whiteA12',
                  },

                  '&::before': {
                    content: `''`,
                    display: 'inline-block',
                    height: '$2',
                    width: 0,
                    backgroundColor: '$red8',
                    transitionTimingFunction: '$in-out',
                    transitionProperty: 'all',
                    transitionDuration: '100ms',
                  },

                  '&:hover::before': {
                    width: '$2',
                    mr: '$2',
                  },
                }}
              >
                {cat[0]}
              </Text>
            ))}
          </Flex>
        </Box>
      </Grid>
    </Box>
  )
}
