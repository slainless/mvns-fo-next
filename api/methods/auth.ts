import { Interest } from '@Models/interest'
import { AuthUser } from '@Models/user'
import produce from 'immer'
import create from 'zustand'
import { persist } from 'zustand/middleware'

export type AuthUserStore = {
  user: AuthUser | null
  setUser: (user: AuthUser) => void
  removeUser: () => void
  setInterest: (interests: Interest[]) => void
}
export const useAuthUserStore = create<AuthUserStore>()(
  persist(
    (set, get) => ({
      user: null,
      setUser: (user: AuthUser) => set({ user }),
      removeUser: () => set({ user: null }),
      setInterest: (interests: Interest[]) =>
        set(
          produce<AuthUserStore>((state) => {
            if (state.user) state.user.student_interest = interests
          })
        ),
    }),
    {
      name: 'user',
    }
  )
)
