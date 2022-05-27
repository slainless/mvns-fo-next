import { RequestResult } from './request'
import { useRequest as useReq } from 'ahooks'
import type {
  Service,
  Options,
  Plugins,
  Result,
} from 'ahooks/lib/useRequest/src/types'
import { APIResponse } from '@Models/response'
import { ClassConstructor } from 'class-transformer'
import {
  createContext,
  createElement,
  useEffect,
  useMemo,
  ReactNode,
  useContext,
} from 'react'
import shallow from 'zustand/shallow'

type ExtendedResult<
  TData,
  TParams extends any[],
  TType extends Awaited<ReturnType<TData>>['data']
> = Omit<Result<TData, TParams>, 'data'> & {
  data: TType | undefined
  response: TData
}

export function useRequest<
  TData,
  TParams extends any[],
  TType extends Awaited<ReturnType<TData>>['data'] =
    | APIResponse.OK
    | APIResponse.Created
>(
  service: Service<TData, TParams>,
  options?: Options<TData, TParams> & {
    acceptOnly?: ClassConstructor<TType> | ClassConstructor<TType>[]
  },
  plugins?: Plugins<TData, TParams>[]
): ExtendedResult<TData, TParams, TType> {
  const { acceptOnly = [APIResponse.OK, APIResponse.Created] } = options ?? {}
  const {
    data: $data,
    error,
    run,
    runAsync,
    loading,
  } = useReq(service, options, plugins)

  const data = useMemo(() => {
    if (!$data) return undefined

    for (const cls of Array.isArray(acceptOnly) ? acceptOnly : [acceptOnly]) {
      if ($data?.data instanceof cls) return $data.data
    }
    return undefined
  }, [$data, acceptOnly])

  return {
    data: data as TType | undefined,
    response: $data,
    error,
    run,
    runAsync,
    loading,
    isWrongType: data == null && $data != null
  }
}
