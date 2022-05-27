import { BlogAPI } from '@Methods/blog'
import { BlogResponse } from '@Models/blog'
import { createRequestContext } from '@Functions/use-request'

const { Provider, RequestHook, ConsumerHook } = createRequestContext(
  BlogAPI.detail,
  BlogResponse.GetOne
)

export const useReadRequest = RequestHook
export const useRead = ConsumerHook
export const ReadProvider = Provider
