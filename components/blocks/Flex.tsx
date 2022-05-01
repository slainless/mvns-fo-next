import { styled } from '@Theme'
import { Layout } from './Box'

export const Flex = styled(Layout, {
  display: 'flex',

  variants: {
    direction: {
      row: {
        flexDirection: 'row',
      },
      column: {
        flexDirection: 'column',
      },
      rowReverse: {
        flexDirection: 'row-reverse',
      },
      columnReverse: {
        flexDirection: 'column-reverse',
      },
    },
    wrap: {
      noWrap: {
        flexWrap: 'nowrap',
      },
      wrap: {
        flexWrap: 'wrap',
      },
      wrapReverse: {
        flexWrap: 'wrap-reverse',
      },
    },
    columnAt: {
      xs: {
        '@xs': {
          flexDirection: 'column',
        },
      },
      sm: {
        '@sm': {
          flexDirection: 'column',
        },
      },
      md: {
        '@md': {
          flexDirection: 'column',
        },
      },
      lg: {
        '@lg': {
          flexDirection: 'column',
        },
      },
      xl: {
        '@xl': {
          flexDirection: 'column',
        },
      },
      '2xl': {
        '@2xl': {
          flexDirection: 'column',
        },
      },
    },
    rowAt: {
      xs: {
        '@xs': {
          flexDirection: 'row',
        },
      },
      sm: {
        '@sm': {
          flexDirection: 'row',
        },
      },
      md: {
        '@md': {
          flexDirection: 'row',
        },
      },
      lg: {
        '@lg': {
          flexDirection: 'row',
        },
      },
      xl: {
        '@xl': {
          flexDirection: 'row',
        },
      },
      '2xl': {
        '@2xl': {
          flexDirection: 'row',
        },
      },
    },
  },
  defaultVariants: {
    direction: 'row',
    align: 'stretch',
    justify: 'start',
    wrap: 'noWrap',
  },
})
