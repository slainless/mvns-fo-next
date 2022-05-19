import React from 'react'
import { styled, CSS } from '@Theme'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { Separator } from './Separator'

export const Tabs = styled(TabsPrimitive.Root, {
  display: 'flex',
  boxShadow: `inset 0 0 0 1px rgba(0,0,0,.1)`,
  backgroundColor: '$slate2',
  rounded: '$3',

  '&[data-orientation="horizontal"]': {
    flexDirection: 'column',
  },
})

export const TabsTrigger = styled(TabsPrimitive.Trigger, {
  all: 'unset',
  flexShrink: 0,
  height: '$5',
  display: 'inline-flex',
  lineHeight: 1,
  fontSize: '$1',
  px: '$2',
  userSelect: 'none',
  outline: 'none',
  alignItems: 'center',
  justifyContent: 'center',
  color: '$slate11',
  border: '1px solid transparent',
  zIndex: '10',

  '@hover': {
    '&:hover': {
      color: '$hiContrast',
    },
  },

  '&[data-state="active"]': {
    color: '$hiContrast',
    borderColor: 'rgba(0,0,0,.1)',
    borderBottomColor: 'transparent',
    backgroundColor: '$slate3',
  },

  '&[data-orientation="vertical"]': {
    justifyContent: 'flex-start',
    borderBottomColor: 'transparent',

    '&[data-state="active"]': {
      borderColor: 'rgba(0,0,0,.1)',
      borderRightColor: 'transparent',
    },
  },
  variants: {
    size: {
      '1': {
        height: '$5',
        px: '$2',
        fontSize: '$1',
        lineHeight: '$sizes$5',
      },
      '2': {
        height: '$6',
        px: '$3',
        fontSize: '$3',
        lineHeight: '$sizes$6',
      },
      '3': {
        height: '$7',
        px: '$4',
        fontSize: '$4',
        lineHeight: '$sizes$7',
      },
    },
  },
  defaultVariants: {
    size: '1',
  },
})

const StyledTabsList = styled(TabsPrimitive.List, {
  flexShrink: 0,
  display: 'flex',
  '&:focus': {
    outline: 'none',
    boxShadow: 'inset 0 0 0 1px $slate8, 0 0 0 1px $slate8',
  },
  '&[data-orientation="vertical"]': {
    flexDirection: 'column',
    boxShadow: 'inset -1px 0 0 $slate6',
  },
})

type TabsListPrimitiveProps = React.ComponentProps<typeof TabsPrimitive.List>
type TabsListProps = TabsListPrimitiveProps & { css?: CSS }

export const TabsList = React.forwardRef<
  React.ElementRef<typeof StyledTabsList>,
  TabsListProps
>((props, forwardedRef) => (
  <>
    <StyledTabsList {...props} ref={forwardedRef} />
    <Separator
      css={{
        display: 'none',
      }}
    />
  </>
))
TabsList.displayName = 'Tabs.List'

export const TabsContent = styled(TabsPrimitive.Content, {
  flexGrow: 1,
  boxShadow: `-1px 0 0 0 rgba(0,0,0,.1), inset -1px 0 rgba(0,0,0,.1), inset 0 1px rgba(0,0,0,.1), inset 0 -1px rgba(0,0,0,.1)`,
  backgroundColor: '$slate3',
  roundedR: '$2',

  '&:focus': {
    boxShadow:
      '-1px 0 0 1px $colors$slate8, -2px 0 0 0 $colors$slate8, 1px 0 0 0 $colors$slate8, inset -1px 0 $colors$slate8, inset 0 1px $colors$slate8, inset 0 -1px $colors$slate8',
  },
})
