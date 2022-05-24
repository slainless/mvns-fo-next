import create from 'zustand'
import shallow from 'zustand/shallow'
import { useRequest } from 'ahooks'
import { omit } from 'lodash-es'
import { Data } from 'ahooks/lib/usePagination/types'
import { useEffect } from 'react'
import { RequestResult } from './request'
import { ClassConstructor } from 'class-transformer'
import APIResponse from '@Models/response'

type StateStore<T> = {
  state: T
  set: (state: T) => void
}

export function createStateStore<T>(initialValue: T) {
  const store = create<StateStore<T>>((set) => ({
    state: initialValue,
    set: (state) => set({ state }),
  }))

  return store
}

type GenericResponse = ClassConstructor<APIResponse.Generic>
type RequestStore<T extends RequestResult<{}>, Type extends T['data']> = {
  data?: T
  loading: boolean
  error?: Error
  /** Will only `true` when data is not null and data is accepted by `accept` criterion */
  shouldFallback: boolean
  acceptedData?: Type
  setData: (data: T) => void
  setLoading: (state: boolean) => void
  setShouldFallback: (state: boolean) => void
  setAcceptedData: (data: Type) => void
  setError: (error: Error) => void
}

type Service<D, P extends any[]> = Parameters<typeof useRequest<D, P>>[0]
type Options<D, P extends any[]> = Parameters<typeof useRequest<D, P>>[1]
type Plugins<D, P extends any[]> = Parameters<typeof useRequest<D, P>>[2]

export function createRequestStore<
TData extends RequestResult<{}>,
TParams extends any[],
TType extends TData['data'] = APIResponse.OK | APIResponse.Created
>(
  service: Service<TData, TParams>,
  options?: Options<TData, TParams> & {
    /** Response to accept, as a flag for fallback. If response is one of these class, then will set `shouldFallback` flag to false */
    accept?: ClassConstructor<TType>[]
  },
  plugins?: Plugins<TData, TParams>
) {
  const { manual = true, accept = [APIResponse.OK, APIResponse.Created] } = options ?? {}

  const store = create<RequestStore<TData, TType>>((set) => ({
    loading: manual,
    shouldFallback: true,
    setData: (data) => set(state => ({...omit(state, ['error']), data }), true),
    setAcceptedData: (data) => set({ acceptedData: data }),
    setLoading: (state) => set({ loading: state }),
    setShouldFallback: (state) => set({ shouldFallback: state }),
    setError: (error) => set(state => ({ ...omit(state, ['data', 'acceptedData']), error }), true),
  }))

  const requestHook = ($options?: Options<TData, TParams>, $plugins?: Plugins<TData, TParams>) => {
    const request = useRequest(service, {
      ...options,
      ...$options
    }, Array.from(new Set([...$plugins ?? [], ...plugins ?? []])))
    const { setData, setLoading, setError, setAcceptedData, setShouldFallback } = store(state => ({
      setData: state.setData,
      setLoading: state.setLoading,
      setError: state.setError,
      setShouldFallback: state.setShouldFallback,
      setAcceptedData: state.setAcceptedData,
    }), shallow)

    useEffect(() => {
      if(request.error !== undefined) {
        setShouldFallback(true)
        return void setError(request.error)
      }

      if(request.data !== undefined) {
        const data = request.data.data
        for(const acc of accept) {
          if(data instanceof acc) {
            setAcceptedData(data as TType)
            setShouldFallback(false)
            return void setData(request.data)
          }
        }
        setShouldFallback(true)
        return void setData(request.data)
      }
    }, [request.data, request.error])
  
    useEffect(() => {
      setLoading(request.loading)
    }, [request.loading])

    return request
  }
  requestHook['store'] = store
  return requestHook
}
