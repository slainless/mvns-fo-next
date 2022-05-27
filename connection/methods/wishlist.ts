import { WishResponse } from '@Models/wishlist'
import { requestJSON } from '@Functions/request'
import urlJoin from 'url-join'
import Endpoints from './endpoint'

export module WishlistAPI {
  export function get() {
    return requestJSON(urlJoin(Endpoints.WISH_ALL), {
      useAuth: true,
      method: 'get',
      responseType: {
        200: WishResponse.Get,
      },
    })
  }

  export function add(courseId?: number) {
    return requestJSON(urlJoin(Endpoints.WISH_ADD), {
      useAuth: true,
      method: 'post',
      json: {
        course_id: courseId,
      },
      responseType: {
        201: WishResponse.Add,
      },
    })
  }

  export function remove(courseId?: number) {
    return requestJSON(
      urlJoin(Endpoints.WISH_REMOVE, courseId?.toString() ?? ''),
      {
        useAuth: true,
        method: 'delete',
        responseType: {
          200: WishResponse.Remove,
        },
      }
    )
  }
}
