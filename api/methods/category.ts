import { CategoryResponse } from '@Models/category'
import { requestJSON } from '@Functions/request'
import urlJoin from 'url-join'
import Endpoints from './endpoint'

module CategoryAPI {
  export function all() {
    return requestJSON(urlJoin(Endpoints.CATEGORY_ALL), {
      useAuth: true,
      method: 'get',
      responseType: {
        200: CategoryResponse.Get,
      },
    })
  }
}

export default CategoryAPI
