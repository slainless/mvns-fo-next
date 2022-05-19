import { AuthUser } from '@Models/user'
import create from 'zustand'
import { persist } from 'zustand/middleware'

export type AuthUserStore = {
  user: AuthUser | null
  setUser: (user: AuthUser) => void
  removeUser: () => void
}
export const useAuthUserStore = create<AuthUserStore>()(
  persist(
    (set, get) => ({
      user: null,
      setUser: (user: AuthUser) => set({ user }),
      removeUser: () => set({ user: null }),
    }),
    {
      name: 'user',
    }
  )
)
