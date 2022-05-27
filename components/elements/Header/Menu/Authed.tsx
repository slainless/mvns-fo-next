import { Avatar } from '@Components/Avatar'
import { Button } from '@Components/Button'
import { Flex } from '@Components/Flex'
import { IconButton } from '@Components/IconButton'
import Span from '@Components/Span'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import * as Menu from '@Components/NavigationMenu'
import { styled } from '@Theme'
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
import Link from 'next/link'

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

const StyledButton = styled(Button, {
  cursor: 'pointer',
  defaultVariants: {
    ghost: true,
  },
})

export default function Authed() {
  const removeUser = useAuthUserStore((state) => state.removeUser)
  return (
    <Menu.Root>
      <List>
        <Item value="hamburger-menu" css={{ mr: '$2' }}>
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
          <Content css={{ width: '$tw_32' }}>
            <StyledButton as="a" href={'/portal'} variant="blue">
              <Span css={{ mr: '$2' }}>
                <FiGrid />
              </Span>{' '}
              Dashboard
            </StyledButton>
            <Link href={'/blog'} passHref>
              <StyledButton as="a">
                <Span css={{ mr: '$2' }}>
                  <FiRss />
                </Span>{' '}
                Blog
              </StyledButton>
            </Link>
            {/* <StyledButton>Terms</Button> */}
            <Link href={'/faq'} passHref>
              <StyledButton as="a">
                <Span css={{ mr: '$2' }}>
                  <FiHelpCircle />
                </Span>{' '}
                FAQ
              </StyledButton>
            </Link>
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
          <Content css={{ width: '$tw_32' }}>
            <Link href={'/my/class'} passHref>
              <StyledButton as="a">
                <Span css={{ mr: '$2' }}>
                  <FiBook />
                </Span>{' '}
                Classes
              </StyledButton>
            </Link>
            <Link href={'/my/wishlist'} passHref>
              <StyledButton as="a">
                <Span css={{ mr: '$2' }}>
                  <FiStar />
                </Span>{' '}
                Wishlist
              </StyledButton>
            </Link>
            {/* <StyledButton>Terms</Button> */}
            <Link href={'/my/cart'} passHref>
              <StyledButton as="a">
                <Span css={{ mr: '$2' }}>
                  <FiShoppingCart />
                </Span>{' '}
                Cart
              </StyledButton>
            </Link>
            <StyledButton
              variant="red"
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
            </StyledButton>
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

export function CartButton() {
  return (
    <Link href="/my/cart" passHref>
      <IconButton as={'a'}>
        <FiShoppingCart />
      </IconButton>
    </Link>
  )
}

export function NotificationButton() {
  return (
    <IconButton
    // size="2"
    // css={{
    //   '& svg': {
    //     width: '$4',
    //     height: '$4',
    //   },
    // }}
    >
      <FiShoppingCart />
    </IconButton>
  )
}
