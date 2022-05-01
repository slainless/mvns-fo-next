import create from 'zustand'
import { persist } from 'zustand/middleware'
import { darkTheme } from '@Theme'
import Cycler from './cycler'

// const CACHE = new Map()

export enum Preference {
  OS_DEFAULT = 'os_default',
  LIGHT = 'light',
  DARK = 'dark',
}
const Values = [Preference.OS_DEFAULT, Preference.LIGHT, Preference.DARK]

export const Token = {
  dark: darkTheme.toString(),
  light: 'default-theme',
}
type ThemeToken = typeof Token[keyof typeof Token]

type Store = {
  preference: Preference
  colorScheme: ThemeToken
  cyclePref: () => void
  setPreference: (pref: Preference) => void
  setColorScheme: (theme: ThemeToken) => void
  __cycler: Cycler<Preference>
}
export const useColorSchemeStore = create<Store>()(
  persist(
    (set, get) => ({
      preference: Preference.OS_DEFAULT,
      colorScheme: Token[Preference.DARK],
      setPreference: (pref) => set({ preference: pref }),
      setColorScheme: (theme) => set({ colorScheme: theme }),
      __cycler: new Cycler(new Set(Values)),
      cyclePref: () => {
        const cycler = get().__cycler
        cycler.next()
        set({
          preference: cycler.current,
        })
      },
    }),
    {
      name: 'color-scheme',
      serialize: (state) =>
        JSON.stringify({
          ...state,
          state: {
            ...state.state,
            __cycler: null,
          },
        }),
      deserialize: (state) => {
        // if (CACHE.has('deserialize')) return CACHE.get('deserialize')
        const parsed = JSON.parse(state)
        const returned = {
          ...parsed,
          state: {
            ...parsed.state,
            __cycler: new Cycler(
              new Set(Values),
              parsed['state']?.['preference']
            ),
          },
        }
        // CACHE.set('deserialize', returned)
        return returned
      },
    }
  )
)

// export function readStorage() {
//   if(CACHE.has('deserialize')) return CACHE.get('deserialize')
//   const parsed = JSON.parse(localStorage.getItem('color-scheme') )
//   const returned = {
//     ...parsed,
//     state: {
//       ...parsed.state,
//       __cycler: new Cycler(new Set(Values), parsed['preference']),
//     },
//   }
//   CACHE.set('deserialize', returned)
//   return returned
// }
