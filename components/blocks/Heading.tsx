import { styled, CSS } from '@Theme'
import { Base, Color, $ } from '@Styles/variants/text'

const Size = $.Size
export const Heading = styled('h1', Base, Color, {
  fontWeight: '$medium',
  fontVariantNumeric: 'proportional-nums',
  ff: '$poppins',
  variants: {
    size: {
      '1': {
        ...Size[4],
        lineHeight: '20px',
        '@bp2': {
          ...Size[5],
          lineHeight: '23px',
        },
      },
      '2': {
        ...Size[6],
        lineHeight: '25px',
        '@bp2': {
          ...Size[7],
          lineHeight: '30px',
        },
      },
      '3': {
        ...Size[7],
        lineHeight: '33px',
        '@bp2': {
          ...Size[8],
          lineHeight: '41px',
        },
      },
      '4': {
        ...Size[8],
        lineHeight: '35px',
        '@bp2': {
          ...Size[9],
          lineHeight: '55px',
        },
      },
    },
  },
  defaultVariants: {
    size: '2',
  },
})
