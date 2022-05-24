import { CSS, css, variant } from '@Theme'

export module $ {
  export const Size = variant({
    '1': {
      fontSize: '$1',
    },
    '2': {
      fontSize: '$2',
    },
    '3': {
      fontSize: '$3',
    },
    '4': {
      fontSize: '$4',
    },
    '5': {
      fontSize: '$5',
      letterSpacing: '-.015em',
    },
    '6': {
      fontSize: '$6',
      letterSpacing: '-.016em',
    },
    '7': {
      fontSize: '$7',
      letterSpacing: '-.031em',
      textIndent: '-.005em',
    },
    '8': {
      fontSize: '$8',
      letterSpacing: '-.034em',
      textIndent: '-.018em',
    },
    '9': {
      fontSize: '$9',
      letterSpacing: '-.055em',
      textIndent: '-.025em',
    },
  })

  export const Base: CSS = {
    lineHeight: '1',
    margin: '0',
    fontWeight: 400,
    fontVariantNumeric: 'tabular-nums',
    display: 'block',
  }

  export const Color = variant({
    red: {
      color: '$red11',
    },
    crimson: {
      color: '$crimson11',
    },
    pink: {
      color: '$pink11',
    },
    purple: {
      color: '$purple11',
    },
    violet: {
      color: '$violet11',
    },
    indigo: {
      color: '$indigo11',
    },
    blue: {
      color: '$blue11',
    },
    cyan: {
      color: '$cyan11',
    },
    teal: {
      color: '$teal11',
    },
    green: {
      color: '$green11',
    },
    lime: {
      color: '$lime11',
    },
    yellow: {
      color: '$yellow11',
    },
    orange: {
      color: '$orange11',
    },
    gold: {
      color: '$gold11',
    },
    bronze: {
      color: '$bronze11',
    },
    gray: {
      color: '$slate11',
    },
    contrast: {
      color: '$hiContrast',
    },
  })

  export const Gradient = variant({
    red: {
      background: 'linear-gradient(to right, $red11, $crimson11)',
    },
    crimson: {
      background: 'linear-gradient(to right, $crimson11, $pink11)',
    },
    pink: {
      background: 'linear-gradient(to right, $pink11, $purple11)',
    },
    purple: {
      background: 'linear-gradient(to right, $purple11, $violet11)',
    },
    violet: {
      background: 'linear-gradient(to right, $violet11, $indigo11)',
    },
    indigo: {
      background: 'linear-gradient(to right, $indigo11, $blue11)',
    },
    blue: {
      background: 'linear-gradient(to right, $blue11, $cyan11)',
    },
    cyan: {
      background: 'linear-gradient(to right, $cyan11, $teal11)',
    },
    teal: {
      background: 'linear-gradient(to right, $teal11, $green11)',
    },
    green: {
      background: 'linear-gradient(to right, $green11, $lime11)',
    },
    lime: {
      background: 'linear-gradient(to right, $lime11, $yellow11)',
    },
    yellow: {
      background: 'linear-gradient(to right, $yellow11, $orange11)',
    },
    orange: {
      background: 'linear-gradient(to right, $orange11, $red11)',
    },
    gold: {
      background: 'linear-gradient(to right, $gold11, $gold9)',
    },
    bronze: {
      background: 'linear-gradient(to right, $bronze11, $bronze9)',
    },
    gray: {
      background: 'linear-gradient(to right, $gray11, $gray12)',
    },
    contrast: {
      background: 'linear-gradient(to right, $hiContrast, $gray12)',
    },
  })
}

/**
 * Contains variants for text colors.
 * Including variants for basic color & gradient text.
 *
 * Variants added: `color: string`, `gradient: boolean`
 */
export const Color = css({
  variants: {
    color: $.Color,
    gradient: {
      true: {
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      },
    },
  },
  compoundVariants: Object.keys($.Color).map((key) => ({
    color: key as keyof typeof $.Color,
    gradient: true,
    css: $.Gradient[key as keyof typeof $.Color],
  })),
  defaultVariants: {
    color: 'contrast',
  },
})

export const Base = css($.Base)

export const Size = css({
  variants: {
    size: $.Size,
  },
  defaultVariants: {
    size: '3',
  },
})
