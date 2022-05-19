import Default from '@Layouts/Default'
import type { AppProps } from 'next/app'
import 'modern-normalize/modern-normalize.css'
import '@fontsource/anybody/variable-full.css'
import '@fontsource/recursive/variable-full.css'
import '@fontsource/urbanist/variable.css'
import '@fontsource/urbanist/variable-italic.css'
import '@fontsource/jost/variable.css'
import '@fontsource/jost/variable-italic.css'
import '@fontsource/inter/variable-full.css'
import '@fontsource/space-grotesk/variable.css'
import '@fontsource/libre-franklin/variable.css'
import '@fontsource/libre-franklin/variable-italic.css'
import '@fontsource/epilogue/variable.css'
import '@fontsource/epilogue/variable-italic.css'
import 'loaders.css/src/animations/ball-pulse.scss'
// import { globalCss } from '@Theme'
import { globalCss } from '@Theme'
import ColorSchemeHandler from '@Components/ColorSchemeHandler'
// import { toast, Toaster, ToastBar } from 'react-hot-toast'
import Toaster from '@Components/Toaster'
import { toast } from 'react-hot-toast'

const globalStyles = globalCss({
  '#root': {
    ff: '$libreFranklin',
    // fontWeight: 500,
    letterSpacing: 'initial',
    bc: '$loContrast',
    width: '100%',
    $loaderColor: '$colors$hiContrast',
  },
  html: {
    scrollPaddingTop: '$sizes$header',
  },
  '.loader-inner': {
    lineHeight: 0,
    '& > div': {
      backgroundColor: 'var(--loaderColor) !important',
    },
  },
  // '*': {
  //   '-webkit-font-smoothing': 'antialiased',
  //   '-moz-osx-font-smoothing': 'grayscale',
  // },
})

function MyApp({ Component, pageProps }: AppProps) {
  globalStyles()

  return (
    <>
      <Default>
        <ColorSchemeHandler />
        <Component {...pageProps} />
      </Default>
      <Toaster />
    </>
  )
}

export default MyApp
