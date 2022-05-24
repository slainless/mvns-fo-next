import { WishlistAPI } from '@Methods/wishlist'
import { APIResponse } from '@Models/response'
import { WishResponse } from '@Models/wishlist'
import { useRequest } from 'ahooks'
import { useCallback, useEffect, useMemo, useState } from 'react'

async function favorite(id: number, set: boolean) {
  const method = set === true ? WishlistAPI.add : WishlistAPI.remove
  return method(id)
}

export function useFavorite(id?: number, defaultState?: boolean) {
  const [state, setState] = useState(defaultState)
  const {
    data,
    error: err,
    loading,
    run,
  } = useRequest(favorite, {
    manual: true,
  })

  const [error, setError] = useState<Error>()
  const toggle = () => {
    if (id == null) return
    run(id, !state)
  }

  useEffect(() => {
    if (error) return void setError(error)

    if (data == null) return
    const d = data.data
    if (state)
      if (d instanceof WishResponse.Remove || d instanceof APIResponse.NotFound)
        return void setState(false)

    if (!state)
      if (d instanceof WishResponse.Add || d instanceof APIResponse.Conflict)
        return void setState(true)

    setError(new Error(d.message))
  }, [data, error])

  return {
    toggle,
    state,
    loading,
    error,
  }
}
