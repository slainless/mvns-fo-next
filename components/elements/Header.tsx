import { Box } from '@Components/Box'
import { Grid } from '@Components/Grid'
import { Image } from '@Components/Image'
import Search from './Header/Search'
import Links from './Header/Links'
import { Token, useColorSchemeStore } from '@Functions/use-color-scheme'
import { Logo } from './Logo'
import { darkTheme, styled } from '@Theme'

const MavensLogo = styled(Logo, {
  height: 'inherit',
  ['$screen-fill']: '$colors$sand12',
  ['$dot-fill']: '$colors$tomato11',
  ['$screen-drop-shadow-opacity']: '0.2',

  [`.${darkTheme} &`]: {
    ['$screen-drop-shadow-opacity']: '1',
  },
})
export function Header() {
  return (
    <Box
      css={{
        bc: '$loContrast',
        position: 'sticky',
        top: 0,
      }}
    >
      <Grid
        columns={{
          '@initial': 2,
          '@lg': 3,
        }}
        container="xl"
        css={{
          py: '$3',
          // bc: '$loContrast',
          // position: 'sticky',
          // top: 0,
          ai: 'center',
        }}
      >
        <Box css={{ height: '$tw_10', '@lg': { height: '$7' } }}>
          <MavensLogo />
        </Box>
        {/* <Image
          src={
            colorScheme === Token.dark
              ? '/shadowed-logo-white.svg'
              : '/shadowed-logo-black.svg'
          }
          css={{
            height: '$7',
          }}
        /> */}
        <Search
          css={{
            display: 'none',

            '@lg': {
              display: 'flex',
            },
          }}
        />
        <Links />
      </Grid>
    </Box>
  )
}
