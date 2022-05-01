import { Flex } from '@Components/Flex'
import { Box } from '@Components/Box'
import { Link } from '@Components/Link'
import ThemeToggler from '@Components/ThemeToggler'
import FullMenu from './FullMenu'

export default function Links() {
  return (
    <Flex
      as="nav"
      css={{
        jc: 'flex-end',
        ai: 'center',

        [`& ${Link}`]: {
          mr: '$4',
        },
      }}
    >
      <Box
        css={{
          display: 'none',

          '@lg': {
            display: 'contents',
          },
        }}
      >
        <Link href="#">Become Instructor</Link>
        <Link href="#">Log In</Link>
        <Link href="#">Register</Link>
        <ThemeToggler />
      </Box>
      <Box
        css={{
          display: 'contents',

          '@lg': {
            display: 'none',
          },
        }}
      >
        <FullMenu />
      </Box>
    </Flex>
  )
}
