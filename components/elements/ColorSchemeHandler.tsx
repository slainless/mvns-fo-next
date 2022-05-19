import isBrowser from '@Functions/is-browser'
import {
  Preference,
  Token,
  useColorSchemeStore,
} from '@Functions/use-color-scheme'
import shallow from 'zustand/shallow'
import { useEffect, useRef, useState } from 'react'
import { useIsomorphicLayoutEffect } from 'ahooks'

const getTheme = (pref: Preference) => {
  return {
    [Preference.DARK]: Token.dark,
    [Preference.LIGHT]: Token.light,
    [Preference.OS_DEFAULT]: !isBrowser
      ? Token.dark
      : window.matchMedia == null
      ? Token.dark
      : window.matchMedia('(prefers-color-scheme: light)').matches
      ? Token.light
      : Token.dark,
  }[pref]
}

export default function ColorSchemeHandler() {
  const [pref, setColorScheme] = useColorSchemeStore(
    (state) => [state.preference, state.setColorScheme] as const,
    shallow
  )

  useIsomorphicLayoutEffect(() => {
    document.body.classList.remove(Token.light, Token.dark)
    const colorScheme = getTheme(pref)
    setColorScheme(colorScheme)
    document.body.classList.add(colorScheme)
    document.documentElement.style.colorScheme =
      colorScheme === Token.dark ? 'dark' : 'light'
  }, [pref])

  return <></>
}
