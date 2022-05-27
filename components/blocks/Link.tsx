import { styled } from '@Theme'
import { Text } from './Text'
import PrimitiveLink from 'next/link'
import { Url } from 'url'
import { ComponentProps, ElementRef, forwardRef } from 'react'

const StyledAnchor = styled('a')
export const Link = styled('a', {
  alignItems: 'center',
  gap: '$1',
  flexShrink: 0,
  outline: 'none',
  textDecorationLine: 'none',
  WebkitTapHighlightColor: 'rgba(0,0,0,0)',
  lineHeight: 'inherit',
  '&:focus': {
    outlineWidth: '2px',
    outlineStyle: 'solid',
    outlineOffset: '2px',
  },
  [`& ${Text}`]: {
    color: 'inherit',
  },
  variants: {
    type: {
      underline: {
        textDecorationLine: 'none',
        textUnderlineOffset: '3px',
        textDecorationColor: '$slate4',

        '@hover': {
          '&:hover': {
            textDecorationLine: 'underline',
          },
        },
        '&:focus': {
          textDecorationLine: 'none',
        },
      },
      decorative: {
        position: 'relative',

        '&::after': {
          content: `''`,
          width: '$tw_1p3',
          position: 'absolute',
          left: 0,
          bottom: '$-1',
          transitionProperty: 'all',
          transitionTimingFunction: '$in-out',
          transitionDuration: '200ms',
          height: '2px',
        },
        '&:hover::after': {
          width: '100%',
        },
        '&:focus::after': {
          width: 0,
        },
      },
    },
    variant: {
      blue: {
        color: '$blue11',
        '&:focus': {
          outlineColor: '$blue8',
        },
      },
      red: {
        color: '$red11',
        '&:focus': {
          outlineColor: '$red8',
        },
      },
      subtle: {
        color: '$slate11',
        '&:focus': {
          outlineColor: '$slate8',
        },
      },
      contrast: {
        color: '$hiContrast',
        '&:focus': {
          outlineColor: '$slate8',
        },
      },
    },
  },
  compoundVariants: [
    {
      type: 'underline',
      variant: 'blue',
      css: {
        textDecorationColor: '$blue4',
      },
    },
    {
      type: 'decorative',
      variant: 'blue',
      css: {
        '&::after': {
          backgroundColor: '$blue4',
        },
      },
    },
    {
      type: 'underline',
      variant: 'red',
      css: {
        textDecorationColor: '$red4',
      },
    },
    {
      type: 'decorative',
      variant: 'red',
      css: {
        '&::after': {
          backgroundColor: '$red4',
        },
      },
    },
    {
      type: 'underline',
      variant: 'subtle',
      css: {
        textDecorationColor: '$slate4',
      },
    },
    {
      type: 'decorative',
      variant: 'subtle',
      css: {
        '&::after': {
          backgroundColor: '$red4',
        },
      },
    },
    {
      type: 'underline',
      variant: 'contrast',
      css: {
        textDecorationLine: 'underline',
        textDecorationColor: '$slate4',
        '@hover': {
          '&:hover': {
            textDecorationColor: '$slate7',
          },
        },
      },
    },
    {
      type: 'decorative',
      variant: 'contrast',
      css: {
        '&::after': {
          backgroundColor: '$red8',
        },
      },
    },
  ],
  defaultVariants: {
    type: 'underline',
    variant: 'contrast',
  },
})

type NextLinkProps = Omit<ComponentProps<typeof StyledAnchor>, 'href'> &
  Omit<ComponentProps<typeof PrimitiveLink>, 'passHref' | 'as'> & {
    asUrl?: Url
  }
const PrimitiveNextLink = forwardRef<
  ElementRef<typeof StyledAnchor>,
  NextLinkProps
>((props, ref) => {
  const { asUrl, prefetch, replace, scroll, shallow, locale, href, ...rest } =
    props
  return (
    <PrimitiveLink
      passHref
      as={asUrl}
      href={href}
      prefetch={prefetch}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      locale={locale}
    >
      <StyledAnchor {...rest} ref={ref} />
    </PrimitiveLink>
  )
})
PrimitiveNextLink.displayName = 'NextLink'
const StyledNextLink = styled(PrimitiveNextLink, Link)
export const NextLink = StyledNextLink
