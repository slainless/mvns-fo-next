import { Cross1Icon } from '@radix-ui/react-icons'
import { Button } from '@Components/Button'
import { useRequest } from '@Functions/use-request'
import { CartAPI } from '@Methods/cart'
import { useCallback, useEffect } from 'react'
import { CartResponse } from '@Models/cart'

type Props = {
  itemId: number
  onRemove: (id: number) => void
}
export default function Remove(props: Props) {
  const { itemId, onRemove } = props
  const {
    data: data,
    loading,
    error,
    run,
  } = useRequest(CartAPI.remove, {
    manual: true,
    acceptOnly: CartResponse.Remove,
  })
  const $run = useCallback(() => run(itemId), [])

  useEffect(() => {
    if (data == null) return
    if (data instanceof CartResponse.Remove) return void onRemove(itemId)
  }, [data])
  return (
    <Button
      variant="red"
      css={{ width: '$5', height: '$5', p: 0 }}
      onClick={$run}
    >
      <Cross1Icon />
    </Button>
  )
}
