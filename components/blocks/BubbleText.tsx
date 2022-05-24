import { Text } from '@Components/Text'
import { styled } from '@Theme'

const StyledBubbleText = styled(Text, {
  p: '$2',
  rounded: '$2',
  position: 'relative',
  bc: '$$bubbleColor',
  // mb: '$5',
  '&::after': {
    content: '',
    transform: 'translateX(-50%) rotate(45deg)',
    borderBottomRightRadius: 2,
    width: '$3',
    height: '$3',
    position: 'absolute',
    bottom: '$-1',
    left: '50%',
    bc: '$$bubbleColor',
  },

  variants: {
    variant: {
      red: {
        $$bubbleColor: '$colors$red4',
      },
      crimson: {
        $$bubbleColor: '$colors$crimson4',
      },
      pink: {
        $$bubbleColor: '$colors$pink4',
      },
      purple: {
        $$bubbleColor: '$colors$purple4',
      },
      violet: {
        $$bubbleColor: '$colors$violet4',
      },
      indigo: {
        $$bubbleColor: '$colors$indigo4',
      },
      blue: {
        $$bubbleColor: '$colors$blue4',
      },
      cyan: {
        $$bubbleColor: '$colors$cyan4',
      },
      teal: {
        $$bubbleColor: '$colors$teal4',
      },
      green: {
        $$bubbleColor: '$colors$green4',
      },
      lime: {
        $$bubbleColor: '$colors$lime4',
      },
      yellow: {
        $$bubbleColor: '$colors$yellow4',
      },
      orange: {
        $$bubbleColor: '$colors$orange4',
      },
      gold: {
        $$bubbleColor: '$colors$gold4',
      },
      bronze: {
        $$bubbleColor: '$colors$bronze4',
      },
      gray: {
        $$bubbleColor: '$colors$slate4',
      },
      contrast: {
        color: '$loContrast',
        $$bubbleColor: '$colors$hiContrast',
      },
    },
  },

  defaultVariants: {
    size: '4',
  },
})
export const BubbleText = StyledBubbleText
