import { SearchResult, SearchResponse } from '@Models/search'
import { requestJSON } from '@Functions/request'
import urlJoin from 'url-join'
import create from 'zustand'
import Endpoints from './endpoint'

type Options = {
  page?: number
  limit?: number
}

export module SearchAPI {
  export function query(query: string, options?: Pick<Options, 'page'>) {
    const { page } = options ?? {}
    return requestJSON(urlJoin(Endpoints.SEARCH, `?q=${query}`), {
      method: 'get',
      responseType: {
        200: SearchResponse.Get,
      },
    })
  }
}

export type SearchStore = {
  result: SearchResult | null
  loading: boolean
  search: (query: string) => void
}
export const useSearchStore = create<SearchStore>((set, get) => ({
  result: null,
  loading: false,
  search: async (query: string) => {
    if (get().loading == true) return

    set({ loading: true })
    const { data } = (await SearchAPI.query(query)) ?? {}
    set({ loading: false })
    if (!(data instanceof SearchResponse.Get))
      throw new Error('Response Mismatch')
    if (!(data.data instanceof SearchResult))
      throw new Error('Response Mismatch')
    return set({
      result: data.data,
    })
  },
}))

export default SearchAPI
