import { Flex } from '@Components/Flex'
import { Box } from '@Components/Box'
import { Link, NextLink } from '@Components/Link'
import ThemeToggler from '@Components/ThemeToggler'
import FullMenu from './FullMenu'
import Login from '../Login'
import Register from '../Register'

export default function Links() {
  return (
    <Flex
      as="nav"
      css={{
        jc: 'flex-end',
        ai: 'center',
      }}
    >
      <Box
        css={{
          display: 'none',

          '@lg': {
            display: 'contents',
          },

          '& > a::after': {
            width: 0,
          },

          [`& > ${Link}`]: {
            mr: '$4',
          },
        }}
      >
        <NextLink type="decorative" href="/instructor">
          Become Instructor
        </NextLink>
        <Login>
          <Link type="decorative" href="javascript:void(0)">
            Log In
          </Link>
        </Login>
        <Register>
          <Link type="decorative" href="#">
            Register
          </Link>
        </Register>
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
