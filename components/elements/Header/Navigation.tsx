import { Flex } from '@Components/Flex'
import { Box } from '@Components/Box'
import Public from './Menu/Public'
import Authed, { CartButton } from './Menu/Authed'
import Fullscreen from './Menu/Fullscreen'
import ThemeToggler from '@Components/ThemeToggler'
import { useAuthUserStore } from '@Methods/auth'

export default function Navigation() {
  const user = useAuthUserStore((state) => state.user)
  return (
    <Flex as="nav" css={{ jc: 'flex-end', ai: 'center' }}>
      <Flex css={{ ai: 'center', gap: '$2' }}>
        <Box>{user == null && <Public />}</Box>
        <Box>
          <ThemeToggler />
        </Box>
        <Box>{user && <CartButton />}</Box>
        <Box>{user && <Authed />}</Box>
      </Flex>
      <Box
        css={{
          display: 'contents',

          '@lg': {
            display: 'none',
          },
        }}
      >
        <Fullscreen />
      </Box>
    </Flex>
  )
}
