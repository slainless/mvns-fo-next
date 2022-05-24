import { Blog, BlogResponse } from '@Models/blog'
import { requestJSON } from '@Functions/request'
import urlJoin from 'url-join'
import create from 'zustand'
import Endpoints from './endpoint'
import { isArray } from 'lodash-es'
import React from 'react'
import { useEffect } from 'react'

type Options = {
  page?: number
  limit?: number
}

export module BlogAPI {
  export function all(options?: Pick<Options, 'page'>) {
    const { page } = options ?? {}
    return requestJSON(urlJoin(Endpoints.BLOG_ALL, `?page=${page}`), {
      method: 'get',
      responseType: {
        200: BlogResponse.Get,
      },
    })
  }

  export function latest(options?: Pick<Options, 'limit'>) {
    const { limit } = options ?? {}
    return requestJSON(
      urlJoin(Endpoints.BLOG_LATEST, `?limit=${limit ?? 10}`),
      {
        method: 'get',
        responseType: {
          200: BlogResponse.Get,
        },
      }
    )
  }

  export function detail(id: number | string) {
    return requestJSON(urlJoin(Endpoints.BLOG_DETAIL, id.toString()), {
      method: 'get',
      responseType: {
        200: BlogResponse.GetOne,
      },
    })
  }
}

export default BlogAPI
