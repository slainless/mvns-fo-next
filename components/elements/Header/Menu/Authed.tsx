import { Avatar } from '@Components/Avatar'
import { Box } from '@Components/Box'
import { Button } from '@Components/Button'
import { Flex } from '@Components/Flex'
import { IconButton } from '@Components/IconButton'
import { panelStyles } from '@Components/Panel'
import Span from '@Components/Span'
import { DashboardIcon, HamburgerMenuIcon } from '@radix-ui/react-icons'
import * as Menu from '@Components/NavigationMenu'
import { styled, keyframes } from '@Theme'
import { forwardRef } from 'react'
import {
  FiBook,
  FiGrid,
  FiHelpCircle,
  FiLogOut,
  FiRss,
  FiShoppingCart,
  FiStar,
} from 'react-icons/fi'
import { useAuthUserStore } from '@Methods/auth'
import { toast } from 'react-hot-toast'

const List = styled(Menu.List, Flex, {
  my: 0,
  bc: '$slate3',
  boxShadow: 'inset 0 0 0 1px $colors$blackA5',
  p: '$1',
  pl: '$2',
  rounded: '$full',
  defaultVariants: {
    align: 'center',
  },
})

const Content = styled(Menu.Content, Flex, {
  p: '$2',
  gap: '3px',
  [`& ${Button}`]: {
    jc: 'flex-start',
    '& svg': {
      width: '$3',
      height: '$3',
    },
  },
  defaultVariants: {
    direction: 'column',
  },
})

const Item = styled(Menu.Item, {
  display: 'flex',
})

export default function Authed() {
  const removeUser = useAuthUserStore((state) => state.removeUser)
  return (
    <Menu.Root>
      <List>
        <Item
          value="hamburger-menu"
          css={{
            mr: '$2',
          }}
        >
          <Menu.Trigger>
            <IconButton
              css={{
                color: '$hiContrast',
                '@hover': {
                  '&:hover': {
                    bc: '$invertColorSchemeA4',
                  },
                },
                '&:active': {
                  backgroundColor: '$invertColorSchemeA5',
                },
              }}
            >
              <HamburgerMenuIcon />
            </IconButton>
          </Menu.Trigger>
          <Content
            css={{
              width: '$tw_32',
            }}
          >
            <Button variant="blue" ghost>
              <Span css={{ mr: '$2' }}>
                <FiGrid />
              </Span>{' '}
              Dashboard
            </Button>
            <Button ghost>
              <Span css={{ mr: '$2' }}>
                <FiRss />
              </Span>{' '}
              Blog
            </Button>
            {/* <Button ghost>Terms</Button> */}
            <Button ghost>
              <Span css={{ mr: '$2' }}>
                <FiHelpCircle />
              </Span>{' '}
              FAQ
            </Button>
          </Content>
        </Item>
        <Item value="avatar-menu">
          <Menu.Trigger>
            <Avatar
              src="https://i.pravatar.cc/300"
              css={{
                width: '$6',
                height: '$6',
                '& > span': {
                  width: 'inherit',
                  height: 'inherit',
                },
              }}
            />
          </Menu.Trigger>
          <Content
            css={{
              width: '$tw_32',
            }}
          >
            <Button ghost>
              <Span css={{ mr: '$2' }}>
                <FiBook />
              </Span>{' '}
              Classes
            </Button>
            <Button ghost>
              <Span css={{ mr: '$2' }}>
                <FiStar />
              </Span>{' '}
              Wishlist
            </Button>
            {/* <Button ghost>Terms</Button> */}
            <Button ghost>
              <Span css={{ mr: '$2' }}>
                <FiShoppingCart />
              </Span>{' '}
              Cart
            </Button>
            <Button
              variant="red"
              ghost
              onClick={() => {
                removeUser()
                toast('Logged Out', {
                  icon: '👋',
                })
                // window.location.reload()
              }}
            >
              <Span css={{ mr: '$2' }}>
                <FiLogOut />
              </Span>{' '}
              Log Out
            </Button>
          </Content>
        </Item>
        <Menu.Indicator />
      </List>

      <Menu.ViewportContainer>
        <Menu.Viewport />
      </Menu.ViewportContainer>
    </Menu.Root>
  )
}
