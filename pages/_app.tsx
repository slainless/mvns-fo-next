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
import { useAuthUserStore } from '@Methods/auth'
import { useIsomorphicLayoutEffect } from 'ahooks'
import isBrowser from '@Functions/is-browser'
import { useRouter } from 'next/router'

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
  svg: {
    display: 'block',
  },
  // '*': {
  //   '-webkit-font-smoothing': 'antialiased',
  //   '-moz-osx-font-smoothing': 'grayscale',
  // },
})

function MyApp({ Component, pageProps }: AppProps) {
  globalStyles()

  const router = useRouter()
  const user = useAuthUserStore((state) => state.user)
  const isFirstTime = user != null && user.student_interest?.length === 0

  const isInFT = (() => {
    if (!isBrowser) return false
    return ['/interesting', '/interesting/'].includes(router.pathname)
  })()

  if (isFirstTime && !isInFT) {
    router.replace('/interesting')
    return (
      <>
        <ColorSchemeHandler />
      </>
    )
  }

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
