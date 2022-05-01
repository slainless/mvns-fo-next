import { IconButton } from '@Components/IconButton'
import { Half2Icon, MoonIcon, SunIcon } from '@radix-ui/react-icons'
import { darkTheme } from '@Theme'
import { useEffect, useState } from 'react'
import isBrowser from '@Functions/is-browser'
import useStateCycle from '@Functions/use-state-cycle'
import {
  Preference,
  Token,
  useColorSchemeStore,
} from '@Functions/use-color-scheme'

export default function ThemeToggler() {
  const [next, pref] = useColorSchemeStore((state) => [
    state.cyclePref,
    state.preference,
  ])

  const Icon =
    pref === Preference.OS_DEFAULT ? (
      <Half2Icon />
    ) : pref === Preference.LIGHT ? (
      <SunIcon />
    ) : (
      <MoonIcon />
    )

  return (
    <IconButton
      onClick={() => {
        next()
      }}
    >
      {isBrowser ? Icon : <></>}
    </IconButton>
  )
}
