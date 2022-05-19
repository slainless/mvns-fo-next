import create from 'zustand'
import shallow from 'zustand/shallow'

export type DisclosureStore = {
  state: boolean
  setState: (state: boolean) => void
  open: () => void
  close: () => void
}
export default function createDisclosureStore(defaultState = false) {
  const store = create<DisclosureStore>((set, get) => ({
    state: defaultState,
    open: () => set({ state: true }),
    close: () => set({ state: false }),
    setState: (state: boolean) => set({ state }),
  }))

  return () => {
    const { state, setState, open, close } = store(
      (state) => ({
        state: state.state,
        open: state.open,
        close: state.close,
        setState: state.setState,
      }),
      shallow
    )
    return { state, setState, open, close }
  }
}
