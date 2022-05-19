import create from 'zustand'
import shallow from 'zustand/shallow'

type StateStore<T> = {
  state: T
  set: (state: T) => void
}

export default function createStateStore<T>(initialValue: T) {
  const store = create<StateStore<T>>((set) => ({
    state: initialValue,
    set: (state) => set({ state }),
  }))

  return () => {
    const { state, set } = store(
      (state) => ({
        state: state.state,
        set: state.set,
      }),
      shallow
    )
    return [state, set] as const
  }
}
