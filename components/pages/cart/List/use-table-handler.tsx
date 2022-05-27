import { useRequest } from '@Functions/use-request'
import { CartResponse } from '@Models/cart'
import { useMemo, useState, useEffect } from 'react'
import { AspectRatio } from '@radix-ui/react-aspect-ratio'
import { Image } from '@Components/Image'
import { Text } from '@Components/Text'
import Quantity from './Quantity'
import { CartAPI } from '@Methods/cart'
import { useTable } from 'react-table'
import Remove from './Remove'

export type Item = {
  itemId?: number
  product?: {
    img: string
    name: string
  }
  price?: number
  quantity?: number
  subtotal?: number
}

export default function useTableHandler() {
  const [localData, setLocalData] = useState<Item[]>([])
  const {
    data: $data,
    loading,
    error,
  } = useRequest(CartAPI.get, {
    acceptOnly: CartResponse.Get,
  })

  useEffect(() => {
    setLocalData(
      $data?.data.map(
        (data) =>
          ({
            itemId: data.id,
            product: {
              img: data.course.image,
              name: data.course.title,
            },
            price: 0,
            quantity: data.quantity,
            subtotal: 0,
          } as Item)
      ) ?? []
    )
  }, [$data])

  const onRemove = (id: number) => {
    setLocalData((old) => old.filter((i) => i.itemId !== id))
  }

  const columns: Column<Item>[] = useMemo(
    () => [
      {
        Header: () => null,
        accessor: (row) => (
          <AspectRatio ratio={16 / 9}>
            <Image
              src={row.product?.img}
              css={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </AspectRatio>
        ),
        id: 'image', // accessor is the "key" in the data,
      },
      {
        Header: 'Product',
        accessor: (row) => <Text>{row.product?.name}</Text>,
        id: 'product', // accessor is the "key" in the data
      },
      {
        Header: 'Price',
        accessor: (row) => (
          <Text>
            ${row.price}
            {/* <br />
            <span className="inline md:hidden text-white/30 text-sm">
              x&nbsp;<span className="text-white">{row.quantity}</span>
              pcs
            </span> */}
          </Text>
        ),
        id: 'price', // accessor is the "key" in the data
      },
      {
        Header: 'Qty',
        accessor: (row) => (
          <Quantity itemId={row.itemId} initialValue={row.quantity} />
        ),
        id: 'quantity', // accessor is the "key" in the data
      },
      {
        Header: 'Subtotal',
        accessor: (row) => <Text>${row.subtotal}</Text>,
        id: 'subtotal', // accessor is the "key" in the data
      },
      {
        Header: () => null,
        accessor: (row) => <Remove itemId={row.itemId} onRemove={onRemove} />,
        id: 'actions', // accessor is the "key" in the data
      },
    ],
    []
  )

  return useTable({ columns, data: localData })
}
