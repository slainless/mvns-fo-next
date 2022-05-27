import { CartResponse } from '@Models/cart'
import { requestJSON } from '@Functions/request'
import urlJoin from 'url-join'
import Endpoints from './endpoint'

export module CartAPI {
  export function get() {
    return requestJSON(urlJoin(Endpoints.CART_ALL), {
      useAuth: true,
      method: 'get',
      responseType: {
        200: CartResponse.Get,
      },
    })
  }

  export function add(courseId?: number, quantity = 1) {
    return requestJSON(urlJoin(Endpoints.CART_ADD), {
      useAuth: true,
      method: 'post',
      json: {
        course_id: courseId,
        quantity: quantity,
      },
      responseType: {
        200: CartResponse.Add,
      },
    })
  }

  export function remove(cartId?: number) {
    return requestJSON(
      urlJoin(Endpoints.CART_REMOVE, cartId?.toString() ?? ''),
      {
        useAuth: true,
        method: 'delete',
        responseType: {
          200: CartResponse.Remove,
        },
      }
    )
  }
}
