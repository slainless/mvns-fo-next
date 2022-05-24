import create from 'zustand'
import shallow from 'zustand/shallow'

type StateStore<T> = {
  state: T
  set: (state: T) => void
}

export function createStateStore<T>(initialValue: T) {
  const store = create<StateStore<T>>((set) => ({
    state: initialValue,
    set: (state) => set({ state }),
  }))

  return store
}
