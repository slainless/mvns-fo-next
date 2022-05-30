import { ReactNode } from 'react'
import { useAuthUserStore } from '@Methods/auth'
import { Box } from '@Components/Box'
import { useIsomorphicLayoutEffect } from 'ahooks'
import { useRouter } from 'next/router'
import { styled } from '@Theme'
import isBrowser from '@Functions/is-browser'
import ColorSchemeHandler from '@Components/ColorSchemeHandler'

export const Overlay = styled('div', {
  height: '100vh',
  zIndex: 999999,
  width: '100vw',
  position: 'fixed',
  top: 0,
  left: 0,
  bc: '$loContrast',
})

export module Guard {
  export function Auth({ children }) {
    const user = useAuthUserStore((state) => state.user)
    const router = useRouter()
    useIsomorphicLayoutEffect(() => {
      if (user == null) router.replace('/')
    })

    if (user == null) return <Overlay />
    return <>{children}</>
  }

  export function FirstTime({ children }) {
    const user = useAuthUserStore((state) => state.user)
    const router = useRouter()

    const shouldRoute = user != null && user.student_interest?.length === 0

    useIsomorphicLayoutEffect(() => {
      if (shouldRoute) router.replace('/interesting')
    })

    if (shouldRoute) return <Overlay />
    return <>{children}</>
  }
}
