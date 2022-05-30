import { Course, CourseQuery, CourseResponse, CourseType } from '@Models/course'
import { requestJSON } from '@Functions/request'
import { isEmpty } from 'lodash-es'
import urlJoin from 'url-join'
import create from 'zustand'
import Endpoints from './endpoint'
import { makeFilterParam } from '@Functions/filter-param'
import { Category } from '@Models/category'
import { CalendarDate } from '@internationalized/date'

type Options = {
  page?: number
  limit?: number
  query?: CourseQuery
}

export type FilterParams = {
  category?: Category[]
  type?: CourseType[]
  price?: [min: number, max: number] | null
  rating?: [min: number, max: number] | null
  date?: [start: CalendarDate, end: CalendarDate] | null
  popularity?: CourseQuery[]
}

export module CourseAPI {
  export function all(options?: Pick<Options, 'page'>) {
    const { page } = options ?? {}
    return requestJSON(urlJoin(Endpoints.COURSE_ALL, `?page=${page}`), {
      useAuth: true,
      method: 'get',
      responseType: {
        200: CourseResponse.Get,
      },
    })
  }

  export function trending(options?: Pick<Options, 'limit'>) {
    const { limit } = options ?? {}
    return requestJSON(
      urlJoin(
        Endpoints.COURSE_TRENDING,
        isEmpty(limit) ? '' : `?limit=${limit ?? 10}`
      ),
      {
        useAuth: true,
        method: 'get',
        responseType: {
          200: CourseResponse.Get,
        },
      }
    )
  }

  export function filter(options: FilterParams) {
    return requestJSON(
      urlJoin(Endpoints.COURSE_FILTER, makeFilterParam(options)),
      {
        useAuth: true,
        method: 'get',
        responseType: {
          200: CourseResponse.Get,
        },
      }
    )
  }

  export function ofType(
    type: CourseType,
    options?: Pick<Options, 'limit' | 'query'>
  ) {
    const { limit, query } = options ?? {}

    if (Object.values(CourseType).includes(type) == false) {
      throw new Error(`Course should be of type 'video/online/physical'`)
    }

    return requestJSON(
      urlJoin(
        Endpoints.COURSE_OF_TYPE,
        type,
        `?q=${query ?? 'newest'}`,
        isEmpty(limit) ? '' : `&limit=${limit ?? 10}`
      ),
      {
        useAuth: true,
        method: 'get',
        responseType: {
          200: CourseResponse.Get,
        },
      }
    )
  }

  export function detail(id: number | string) {
    return requestJSON(urlJoin(Endpoints.COURSE_DETAIL, id.toString()), {
      method: 'get',
      responseType: {
        200: CourseResponse.GetOne,
      },
    })
  }

  export function my() {
    return requestJSON(Endpoints.COURSE_MY, {
      useAuth: true,
      method: 'get',
      responseType: {
        200: CourseResponse.Get,
      },
    })
  }
}
