import { createRequestStore } from '@Functions/use-store'
import { BlogAPI } from '@Methods/blog'
import { BlogResponse } from '@Models/blog'

export const useBlogRequest = createRequestStore(BlogAPI.detail, {
  accept: [BlogResponse.GetOne],
})
export const useBlogStore = useBlogRequest.store
