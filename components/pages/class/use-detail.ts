import { CourseAPI } from '@Methods/course'
import { CourseResponse } from '@Models/course'
import { createRequestContext } from '@Functions/use-request'

const { Provider, ConsumerHook, RequestHook } = createRequestContext(
  CourseAPI.detail,
  CourseResponse.GetOne
)

export const useDetailRequest = RequestHook
export const useDetail = ConsumerHook
export const DetailProvider = Provider
