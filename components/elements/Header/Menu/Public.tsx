import { Box } from '@Components/Box'
import { Link, NextLink } from '@Components/Link'
import Login from '@Components/Login'
import Register from '@Components/Register'
import { styled } from '@Theme'

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
