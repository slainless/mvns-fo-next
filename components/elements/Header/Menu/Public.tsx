import { Box } from '@Components/Box'
import { Link, NextLink } from '@Components/Link'
import ThemeToggler from '@Components/ThemeToggler'
import FullscreenMenu from './Fullscreen'
import Login from '@Components/Login'
import Register from '@Components/Register'

export default function PublicMenu() {
  return (
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
    </Box>
  )
}
