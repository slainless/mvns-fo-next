import APIResponse from '@Models/response'
import { RequestResult } from './request'
import { isArray } from 'lodash-es'
import { ClassConstructor } from 'class-transformer'

export function getData<
  T extends RequestResult<any>,
  K extends ClassConstructor<T['data']>
>(res: T, pick: K | K[]) {
  const { data } = res ?? {}
  if (data == null) return null

  const Classes = isArray(pick) ? pick : [pick]
  if (Classes.every((cls) => data instanceof cls == false)) return null
  return data.data
}
