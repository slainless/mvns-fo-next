import { Box } from '@Components/Box'
import { Link, NextLink } from '@Components/Link'
import Login from '@Components/Login'
import Register from '@Components/Register'

export default function PublicMenu() {
  return (
    <Box
      css={{
        display: 'none',
        '@lg': { display: 'contents' },
        '& > ::after': { width: 0 },
        [`& > ${Link}`]: {
          mr: '$4',
          cursor: 'pointer',
          '&:last-child': { mr: 0 },
        },
      }}
    >
      <NextLink type="decorative" href="/instructor">
        Become Instructor
      </NextLink>
      <Login>
        <Link as="button" type="decorative">
          Log In
        </Link>
      </Login>
      <Register>
        <Link as="button" type="decorative">
          Register
        </Link>
      </Register>
    </Box>
  )
}
