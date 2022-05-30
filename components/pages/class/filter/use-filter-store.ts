import create from 'zustand'
import { FilterParams } from '@Methods/course'
import produce from 'immer'
import { omit } from 'lodash-es'

type Store = {
  state: FilterParams | null
  setState: (state: FilterParams | null) => void
  setCategory: (category: FilterParams['category'] | null) => void
  setType: (type: FilterParams['type'] | null) => void
  setPopularity: (popularity: FilterParams['popularity'] | null) => void
  setPrice: (price: FilterParams['price'] | null) => void
  setDate: (date: FilterParams['date'] | null) => void
  setRating: (rating: FilterParams['rating'] | null) => void
}

export const useFilterStore = create<Store>()((set) => ({
  state: {
    type: [],
    category: [],
    popularity: [],
    price: null,
    date: null,
    rating: null,
  },
  setState: (state) => set((s) => ({ state, ...omit(s, ['state']) }), true),

  setCategory: (category) =>
    set(
      produce((state) => {
        state.state.category = category
      })
    ),
  setType: (type) =>
    set(
      produce((state) => {
        state.state.type = type
      })
    ),
  setPopularity: (popularity) =>
    set(
      produce((state) => {
        state.state.popularity = popularity
      })
    ),
  setPrice: (price) =>
    set(
      produce((state) => {
        state.state.price = price
      })
    ),
  setDate: (date) =>
    set(
      produce((state) => {
        state.state.date = date
      })
    ),
  setRating: (rating) =>
    set(
      produce((state) => {
        state.state.rating = rating
      })
    ),
}))
