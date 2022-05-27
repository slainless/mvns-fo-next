import { WishlistAPI } from '@Methods/wishlist'
import { APIError, APIResponse } from '@Models/response'
import { WishResponse } from '@Models/wishlist'
import { useRequest } from '@Functions/use-request'
import { useCallback, useEffect, useMemo, useState } from 'react'

async function favorite(id: number, set: boolean) {
  const method = set ? WishlistAPI.add : WishlistAPI.remove
  return method(id)
}

export function useFavorite(id?: number, defaultState?: boolean) {
  const [state, setState] = useState(!!defaultState)
  const { data, error, loading, run } = useRequest(favorite, {
    manual: true,
    acceptOnly: [WishResponse.Add, WishResponse.Remove],
  })

  const toggle = () => {
    if (id == null) return
    run(id, !state)
  }

  useEffect(() => {
    if (data == null) return
    if (data instanceof WishResponse.Remove) return void setState(false)
    return void setState(true)
  }, [data, state])

  useEffect(() => {
    if (error == null) return
    console.log(error, error instanceof APIError.NotFound)
    if (error instanceof APIError.Conflict) return void setState(true)
    if (error instanceof APIError.NotFound) return void setState(false)
  }, [error, state])

  return {
    toggle,
    state,
    loading,
    error,
  }
}
