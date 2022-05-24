import { createRequestStore } from '@Functions/use-store'
import { CourseAPI } from '@Methods/course'
import { CourseResponse } from '@Models/course'

export const useCourseRequest = createRequestStore(CourseAPI.detail, {
  accept: [CourseResponse.GetOne],
})
export const useCourseStore = useCourseRequest.store
