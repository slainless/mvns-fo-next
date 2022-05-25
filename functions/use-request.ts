import { RequestResult } from './request'
import { useRequest as useReq } from 'ahooks'
import { APIResponse } from '@Models/response'
import { ClassConstructor } from 'class-transformer'
import { useEffect, useMemo } from 'react'
import shallow from 'zustand/shallow'

type Service<Data, Params extends any[]> = Parameters<typeof useReq<Data, Params>>[0]
type Options<Data, Params extends any[]> = Parameters<typeof useReq<Data, Params>>[1]
type Plugins<Data, Params extends any[]> = Parameters<typeof useReq<Data, Params>>[2]

export function useRequest<
TData extends RequestResult<{}>,
TParams extends any[],
TType extends TData['data'] = APIResponse.OK | APIResponse.Created
>(
  service: Service<TData, TParams>,
  options?: Options<TData, TParams> & {
    /** Response to accept, as a flag for fallback. If response is one of these class, then will set `shouldFallback` flag to false */
    acceptOnly?: ClassConstructor<TType> | ClassConstructor<TType>[]
  },
  plugins?: Plugins<TData, TParams>
) {
  const { acceptOnly = [APIResponse.OK, APIResponse.Created] } = options ?? {}
  const { data: $data, error, run, runAsync } = useReq(service, options, plugins)

  const data = useMemo(() => {
    if(!$data) return undefined

    for(const cls of Array.isArray(acceptOnly) ? acceptOnly : [acceptOnly]) {
      if($data?.data instanceof cls) return $data.data.data
    }
    return undefined
  }, [$data])

  return {
    data: data as TType,
    response: $data,
    error,
    run,
    runAsync,
    isWrongType: data == null && $data != null
  }
}
