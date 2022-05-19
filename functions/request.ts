import { APIResponse } from '@Models/response'
import { ClassConstructor, plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'
import { isArray, isEmpty } from 'lodash-es'
import ky, { HTTPError, Options } from 'ky'
import { useAuthUserStore } from '@Methods/auth'

type ClassOf<T extends Record<any, any>> = {
  [k in keyof T]: InstanceType<T[k]>
}
type Result<A, B> = ClassOf<Omit<A, keyof B> & B>
const defaultResponseType = {
  200: APIResponse.OK,
  201: APIResponse.Created,
  401: APIResponse.Unauthorized,
  404: APIResponse.NotFound,
  500: APIResponse.InternalError,
  default: APIResponse.Generic,
}

export type RequestResult<T> = {
  data: Result<typeof defaultResponseType, T>[keyof Result<
    typeof defaultResponseType,
    T
  >]
  response: Response
  code: number
  error?: HTTPError
}
export async function requestJSON<
  T extends { [k in number | 'default']?: typeof APIResponse.Generic } = {}
>(
  url: Parameters<typeof ky>[0],
  options: Options & {
    responseType?: T
    useAuth?: boolean
  }
): Promise<RequestResult<T>> {
  const { responseType, useAuth, ...rest } = options

  let rawJSON
  let code: number
  let response: Response
  let error: HTTPError | undefined = undefined
  try {
    response = await ky(url, {
      ...rest,
      headers: {
        // Accept: 'application/json',
        Authorization: (() => {
          if (!useAuth) return undefined
          const token = useAuthUserStore.getState().user?.token
          if (isEmpty(token)) return undefined
          return `Bearer ${token}`
        })(),
      },
    })
    rawJSON = await response.json()
    code = response.status
  } catch (e) {
    if (!(e instanceof HTTPError)) throw e
    response = e.response
    rawJSON = await response.json()
    code = response.status
    error = e
  }

  const mergedDataType = Object.assign({}, defaultResponseType, responseType)
  const dataType = mergedDataType[code] ?? mergedDataType.default

  const data = dataType
    ? // @ts-ignore
      plainToInstance(dataType, rawJSON)
    : plainToInstance(APIResponse.Generic, rawJSON)

  const errors = await validate(data)
  if (errors.length > 0) {
    if (process.env.MODE === 'development')
      console.error('Validation failed with:', errors)
    throw new Error('Response mismatch!')
  }

  // @ts-expect-error
  return {
    data,
    code,
    response,
    error,
  }
}

export function getData<
  T extends RequestResult<any>,
  K extends ClassConstructor<T['data']>
>(res: T, pick: K | K[]): InstanceType<K>['data'] | null {
  const { data } = res ?? {}
  if (data == null) return null

  const Classes = isArray(pick) ? pick : [pick]
  if (Classes.every((cls) => data instanceof cls == false)) return null
  return data.data
}
