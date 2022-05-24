import { InterestResponse } from '@Models/interest'
import { requestJSON } from '@Functions/request'
import urlJoin from 'url-join'
import Endpoints from './endpoint'

export module InterestAPI {
  export function set(interestId: number[]) {
    return requestJSON(urlJoin(Endpoints.INTEREST_SET), {
      useAuth: true,
      method: 'post',
      json: {
        keyword_id: interestId,
      },
      responseType: {
        201: InterestResponse.Add,
      },
    })
  }

  export function get() {
    return requestJSON(urlJoin(Endpoints.INTEREST_GET), {
      useAuth: true,
      method: 'get',
      responseType: {
        200: InterestResponse.Get,
      },
    })
  }
}

export default InterestAPI
