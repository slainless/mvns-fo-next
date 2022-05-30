export const fonts = {
  urbanist: 'Urbanist, $fallbackFonts$default',
  recursive: 'Recursive, $fallbackFonts$default',
  anybody: 'Anybody, $fallbackFonts$default',
  spaceGrotesk: `'Space Grotesk', $fallbackFonts$default`,
  jost: `Jost, $fallbackFonts$default`,
  inter: `Inter, $fallbackFonts$default`,
  epilogue: `Epilogue, $fallbackFonts$default`,
  libreFranklin: `'Libre Franklin', $fallbackFonts$default`,
  bigShouldersDisplay: `'Big Shoulders Display', $fallbackFonts$default`,
  poppins: `Poppins, $fallbackFonts$default`,
  default: `$fallbackFonts$default`,
}

export const variableFonts: Record<keyof typeof fonts, string> = {
  urbanist: 'UrbanistVariable',
  recursive: 'RecursiveVariable',
  anybody: 'AnybodyVariable',
  spaceGrotesk: `'Space GroteskVariable'`,
  jost: 'JostVariable',
  inter: `InterVariable, $fallbackFonts$default`,
  epilogue: `EpilogueVariable, $fallbackFonts$default`,
  libreFranklin: `'Libre FranklinVariable', $fallbackFonts$default`,
  bigShouldersDisplay: `'Big Shoulders DisplayVariable', $fallbackFonts$default`,
  poppins: `Poppins, $fallbackFonts$default`,
  default: `$fallbackFonts$default`,
}

export const fallbackFonts = {
  default:
    'ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji',
}

export const fontSizes = {
  1: '12px',
  2: '13px',
  3: '15px',
  4: '17px',
  5: '19px',
  6: '21px',
  7: '27px',
  8: '35px',
  9: '59px',
  xs: '0.75rem',
  sm: '0.875rem',
  md: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
  '3xl': '1.875rem',
  '4xl': '2.25rem',
  '5xl': '3rem',
  '6xl': '3.75rem',
  '7xl': '4.5rem',
  '8xl': '6rem',
  '9xl': '8rem',
}

export const fontWeights = {
  thin: 100,
  extralight: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
}

export const lineHeights = {
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  7: '1.75rem',
  8: '2rem',
  9: '2.25rem',
  10: '2.5rem',
  tight: '1.25',
  snug: '1.375',
  normal: '1.5',
  relaxed: '1.625',
  loose: '2',
  xs: '1rem',
  sm: '1.25rem',
  md: '1.5rem',
  lg: '1.75rem',
  xl: '1.75rem',
  '2xl': '2rem',
  '3xl': '2.25rem',
  '4xl': '2.5rem',
  '5xl': '1',
  '6xl': '1',
  '7xl': '1',
  '8xl': '1',
  '9xl': '1',
}

export const letterSpacings = {
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0em',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em',
}
