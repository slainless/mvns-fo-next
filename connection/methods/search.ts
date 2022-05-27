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

export default SearchAPI
