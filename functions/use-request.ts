import { useRequest as useReq } from 'ahooks'
import type {
  Service,
  Options,
  Plugins,
  Result,
} from 'ahooks/lib/useRequest/src/types'
import { APIResponse } from '@Models/response'
import { ClassConstructor } from 'class-transformer'
import { createContext, useMemo, useContext } from 'react'

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
    isWrongType: data == null && $data != null,
  }
}

export function createRequestContext<
  TData,
  TParams extends any[],
  AccType extends Awaited<ReturnType<TData>>['data'] =
    | APIResponse.OK
    | APIResponse.Created
>(
  service: Service<TData, TParams>,
  acceptOnly?: ClassConstructor<AccType> | ClassConstructor<AccType>[]
) {
  const Context = createContext<Contextable<TData, TParams, AccType>>({
    data: undefined,
    error: undefined,
    response: undefined,
    loading: false,
    isWrongType: false,
  })
  //
  // const Provider = (props: {
  //   options?: RequestOptions<Fn>
  //   plugins?: RequestPlugins<Fn>
  //   children?: ReactNode
  // }) => {
  //   const { options, plugins, children } = props
  //   const request = useRequest(service, {
  //     ...options,
  //     acceptOnly
  //   }, plugins)
  //
  //   return createElement(Context.Provider, {
  //     value: request
  //   }, children)
  // }
  const RequestHook = (
    options: Options<TData, TParams>,
    plugins?: Plugins<TData, TParams>
  ) =>
    useRequest<TData, TParams, AccType>(
      service,
      { ...options, acceptOnly },
      plugins
    )
  const ConsumerHook = () => useContext(Context)

  return {
    Provider: Context.Provider,
    Consumer: Context.Consumer,
    Context,
    RequestHook,
    ConsumerHook,
  }
}
