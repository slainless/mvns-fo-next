import { Button } from '@Components/Button'
import { useRequest } from '@Functions/use-request'
import { CartAPI } from '@Methods/cart'
import { useDetail } from '@Pages/class/use-detail'
import { CartResponse } from '@Models/cart'
import { useEffect } from 'react'
import Loader from 'react-loaders'
import { toast } from 'react-hot-toast'

export default function CartButton() {
  const { data: $data, response } = useDetail()
  const course = $data?.data
  const fallback = course == null

  const { data, loading, error, run } = useRequest(CartAPI.add, {
    manual: true,
    acceptOnly: CartResponse.Add,
  })

  useEffect(() => {
    if (data == null) return
    toast.success('Class added to cart')
  }, [data])

  useEffect(() => {
    if (error == null) return
    toast.error(error.message)
  }, [error])

  return (
    <Button
      variant="red"
      size="3"
      onClick={() => {
        run(course?.id)
      }}
    >
      {loading ? <Loader type="ball-pulse" active /> : 'Add to cart'}
    </Button>
  )
}
