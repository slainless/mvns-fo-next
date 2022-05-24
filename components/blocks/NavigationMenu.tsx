import { Box } from '@Components/Box'
import { Button } from '@Components/Button'
import { Flex } from '@Components/Flex'
import { Link as _Link } from '@Components/Link'
import { IconButton } from '@Components/IconButton'
import { panelStyles } from '@Components/Panel'
import Span from '@Components/Span'
import { DashboardIcon, HamburgerMenuIcon } from '@radix-ui/react-icons'
import * as Primitive from '@radix-ui/react-navigation-menu'
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

const enterFromRight = keyframes({
  from: { transform: 'translateX(200px)', opacity: 0 },
  to: { transform: 'translateX(0)', opacity: 1 },
})

const enterFromLeft = keyframes({
  from: { transform: 'translateX(-200px)', opacity: 0 },
  to: { transform: 'translateX(0)', opacity: 1 },
})

const exitToRight = keyframes({
  from: { transform: 'translateX(0)', opacity: 1 },
  to: { transform: 'translateX(200px)', opacity: 0 },
})

const exitToLeft = keyframes({
  from: { transform: 'translateX(0)', opacity: 1 },
  to: { transform: 'translateX(-200px)', opacity: 0 },
})

const scaleIn = keyframes({
  from: { transform: 'rotateX(-30deg) scale(0.9)', opacity: 0 },
  to: { transform: 'rotateX(0deg) scale(1)', opacity: 1 },
})

const scaleOut = keyframes({
  from: { transform: 'rotateX(0deg) scale(1)', opacity: 1 },
  to: { transform: 'rotateX(-10deg) scale(0.95)', opacity: 0 },
})

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
})

const fadeOut = keyframes({
  from: { opacity: 1 },
  to: { opacity: 0 },
})

const StyledMenu = styled(Primitive.Root, {
  position: 'relative',
  jc: 'center',
  zIndex: 1,
  $$arrowSize: '11px',
})

const StyledContent = styled(Primitive.Content, {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  '@media only screen and (min-width: 600px)': { width: 'auto' },
  '@media (prefers-reduced-motion: no-preference)': {
    animationDuration: '250ms',
    animationTimingFunction: 'ease',
    '&[data-motion="from-start"]': { animationName: enterFromLeft },
    '&[data-motion="from-end"]': { animationName: enterFromRight },
    '&[data-motion="to-start"]': { animationName: exitToLeft },
    '&[data-motion="to-end"]': { animationName: exitToRight },
  },
})

const StyledList = styled(Primitive.List, {
  // all: 'unset',
})
const StyledItem = styled(Primitive.Item, {
  // all: 'unset',
})

const StyledViewport = styled(Primitive.Viewport, panelStyles, {
  position: 'absolute',
  right: 0,
  top: 'calc($$arrowSize - 2px)',
  overflow: 'hidden',
  height: 'var(--radix-navigation-menu-viewport-height)',
  width: 'var(--radix-navigation-menu-viewport-width)',
  '@media (prefers-reduced-motion: no-preference)': {
    transition: 'width, height, 300ms ease',
    '&[data-state="open"]': { animation: `${scaleIn} 200ms ease` },
    '&[data-state="closed"]': { animation: `${scaleOut} 200ms ease` },
  },
})

const StyledIndicator = styled(Primitive.Indicator, {
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'center',
  height: '$$arrowSize',
  top: '100%',
  overflow: 'hidden',
  zIndex: 1,

  '@media (prefers-reduced-motion: no-preference)': {
    transition: 'width, transform 250ms ease',
    '&[data-state="visible"]': { animation: `${fadeIn} 200ms ease` },
    '&[data-state="hidden"]': { animation: `${fadeOut} 200ms ease` },
  },
})

const StyledArrow = styled('div', {
  position: 'relative',
  top: '70%',
  backgroundColor: '$panel',
  width: '$$arrowSize',
  height: '$$arrowSize',
  transform: 'rotate(45deg)',
  borderTopLeftRadius: 2,
})

const StyledIndicatorWithArrow = forwardRef((props, forwardedRef) => (
  <StyledIndicator {...props} ref={forwardedRef}>
    <StyledArrow />
  </StyledIndicator>
))
StyledIndicatorWithArrow.displayName = 'NavigationMenu.IndicatorWithArrow'

const StyledTrigger = styled(Primitive.Trigger, {
  all: 'unset',
})

const StyledViewportContainer = styled('div', {
  position: 'absolute',
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  top: '100%',
  left: 0,
  perspective: '2000px',
})

const StyledLink = styled(Primitive.Link, _Link)

export const NavigationMenu = StyledMenu
export const NavigationMenuList = StyledList
export const NavigationMenuItem = StyledItem
export const NavigationMenuTrigger = StyledTrigger
export const NavigationMenuLink = StyledLink
export const NavigationMenuContent = StyledContent
export const NavigationMenuViewport = StyledViewport
export const NavigationMenuViewportContainer = StyledViewportContainer
export const NavigationMenuIndicator = StyledIndicatorWithArrow

export const Root = StyledMenu
export const List = StyledList
export const Item = StyledItem
export const Trigger = StyledTrigger
export const Link = StyledLink
export const Content = StyledContent
export const Viewport = StyledViewport
export const ViewportContainer = StyledViewportContainer
export const Indicator = StyledIndicatorWithArrow
