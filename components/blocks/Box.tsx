import { css, styled } from '@Theme'

export const Box = styled('div', {
  // Reset
  boxSizing: 'border-box',
  variants: {
    container: {
      xl: {
        // maxWidth: '$container-xl',
        maxWidth: '1340px',
        mx: 'auto',
        px: '$tw_4',

        '@md': {
          px: '$tw_8',
        },
        '@lg': {
          px: '$tw_12',
        },
      },
    },
  },
})

export const Layout = styled(Box, {
  variants: {
    align: {
      start: {
        alignItems: 'start',
      },
      center: {
        alignItems: 'center',
      },
      end: {
        alignItems: 'end',
      },
      stretch: {
        alignItems: 'stretch',
      },
      baseline: {
        alignItems: 'baseline',
      },
    },
    justify: {
      start: {
        justifyContent: 'start',
      },
      center: {
        justifyContent: 'center',
      },
      end: {
        justifyContent: 'end',
      },
      between: {
        justifyContent: 'space-between',
      },
    },
    gap: {
      1: {
        gap: '$1',
      },
      2: {
        gap: '$2',
      },
      3: {
        gap: '$3',
      },
      4: {
        gap: '$4',
      },
      5: {
        gap: '$5',
      },
      6: {
        gap: '$6',
      },
      7: {
        gap: '$7',
      },
      8: {
        gap: '$8',
      },
      9: {
        gap: '$9',
      },
    },
    gapX: {
      1: {
        columnGap: '$1',
      },
      2: {
        columnGap: '$2',
      },
      3: {
        columnGap: '$3',
      },
      4: {
        columnGap: '$4',
      },
      5: {
        columnGap: '$5',
      },
      6: {
        columnGap: '$6',
      },
      7: {
        columnGap: '$7',
      },
      8: {
        columnGap: '$8',
      },
      9: {
        columnGap: '$9',
      },
    },
    gapY: {
      1: {
        rowGap: '$1',
      },
      2: {
        rowGap: '$2',
      },
      3: {
        rowGap: '$3',
      },
      4: {
        rowGap: '$4',
      },
      5: {
        rowGap: '$5',
      },
      6: {
        rowGap: '$6',
      },
      7: {
        rowGap: '$7',
      },
      8: {
        rowGap: '$8',
      },
      9: {
        rowGap: '$9',
      },
    },
  },
})
