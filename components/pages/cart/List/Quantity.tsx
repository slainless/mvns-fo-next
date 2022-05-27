import { TextField } from '@Components/TextField'
import { useCallback, useEffect, useState } from 'react'
import { useRequest } from '@Functions/use-request'
import { CartAPI } from '@Methods/cart'

type Props = {
  itemId: number
  initialValue: number
}
export default function Quantity(props: Props) {
  const { itemId, initialValue } = props
  const {
    data: $data,
    loading,
    run,
  } = useRequest(CartAPI.add, {
    manual: true,
  })
  const [value, setValue] = useState(initialValue)
  const $run = useCallback(() => run(itemId), [])

  useEffect(() => {
    // $run(itemId, value)
  }, [value])
  return (
    <TextField
      css={{
        maxWidth: '$tw_12',
        width: 'max-content',
      }}
      value={value}
      type={'number'}
      onChange={(e) => {
        const value = +e.target.value
        console.log(value)
        if (Number.isNaN(value) || !Number.isFinite(value) || value < 1) return
        return void setValue(value)
      }}
    />
  )
}
