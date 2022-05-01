import Default from '@Layouts/Default'
import type { AppProps } from 'next/app'
import 'modern-normalize/modern-normalize.css'
// import { globalCss } from '@Theme'
import { globalCss } from '@Theme'
import ColorSchemeHandler from '@Components/ColorSchemeHandler'

const globalStyles = globalCss({
  '#root': {
    fontFamily: '$inter',
    bc: '$loContrast',
  },
})

function MyApp({ Component, pageProps }: AppProps) {
  globalStyles()
  return (
    <Default>
    <ColorSchemeHandler />
      <Component {...pageProps} />
    </Default>
  )
}

export default MyApp
