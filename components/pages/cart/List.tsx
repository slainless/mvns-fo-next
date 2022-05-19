import { Flex } from '@Components/Flex'
import { Box } from '@Components/Box'
import { Image } from '@Components/Image'
import { Card } from '@Components/Card'
import { AspectRatio } from '@radix-ui/react-aspect-ratio'
import { cartItems } from '@Dev/dummy'
import { useMemo } from 'react'
import { useTable, Column } from 'react-table'
import { Table, Thead, Td, Tr, Th, Tbody, Tfoot } from '@Components/Table'
import { Text } from '@Components/Text'
import { Button } from '@Components/Button'
import { ArrowRightIcon, Cross1Icon } from '@radix-ui/react-icons'
import { TextField } from '@Components/TextField'

type Item = {
  product?: {
    img: string
    name: string
  }
  price?: number
  quantity?: number
  subtotal?: number
}

export default function List() {
  const data: Item[] = useMemo(() => cartItems, [])

  const columns: Column<Item>[] = useMemo(
    () => [
      {
        Header: () => null,
        accessor: (row) => (
          <AspectRatio ratio={16 / 9}>
            <Image src={row.product?.img} />
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
        accessor: (row) => <Text>{row.quantity}</Text>,
        id: 'quantity', // accessor is the "key" in the data
      },
      {
        Header: 'Subtotal',
        accessor: (row) => <Text>${row.subtotal}</Text>,
        id: 'subtotal', // accessor is the "key" in the data
      },
      {
        Header: () => null,
        accessor: (row) => (
          <>
            <Button
              variant="red"
              css={{
                width: '$5',
                height: '$5',
                p: 0,
              }}
            >
              <Cross1Icon />
            </Button>
            {/* <Icon
              icon="close"
              className="transition-colors w-6 h-6 rounded-full flex items-center justify-center text-red-600 border-2 border-red-600 text-base hover:bg-red-600 hover:text-white"
            /> */}
          </>
        ),
        id: 'actions', // accessor is the "key" in the data
      },
    ],
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    footerGroups,
    headerGroups,
    rows,
    prepareRow,
    ...rest
  } = useTable({ columns, data })

  return (
    <>
      <Card>
        <Table {...getTableProps()}>
          <Thead>
            {headerGroups.map((headerGroup) => (
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => {
                  const { className, ...rest } = column.getHeaderProps()
                  return (
                    <Th
                      css={{
                        borderColor: '$slate6',
                        fontSize: '$sm !important',
                        py: '$4 !important',
                        width: (() => {
                          switch (column.id) {
                            case 'image':
                              return '$tw_32'
                            case 'product':
                              return ''
                            case 'quantity':
                              return '$tw_12'
                            case 'price':
                              return '$tw_24'
                            case 'subtotal':
                              return '$tw_24'
                            case 'actions':
                              return '$tw_12'
                            default:
                              return '0'
                          }
                        })(),
                        px: '$2',
                      }}
                      {...rest}
                    >
                      {column.render('Header')}
                    </Th>
                  )
                })}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row)
              return (
                <Tr
                  css={{
                    borderColor: '$slate4',
                    '&:last-child > td': {
                      borderBottomColor: '$slate6',
                    },
                  }}
                  {...row.getRowProps()}
                >
                  {row.cells.map((cell) => (
                    <Td
                      css={{
                        px: '$2',
                        borderColor: '$slate4',
                        borderWidth: '1px',
                        borderLeftStyle: (() => {
                          switch (cell.column.id) {
                            case 'price':
                            case 'quantity':
                            case 'subtotal':
                            case 'actions':
                              return 'solid'
                            default:
                              return undefined
                          }
                        })(),
                      }}
                      {...cell.getCellProps()}
                    >
                      {cell.render('Cell')}
                    </Td>
                  ))}
                </Tr>
              )
            })}
          </Tbody>
          <Tfoot>
            <Tr
              css={{
                '& td': {
                  fontSize: '$sm !important',
                  py: '$2 !important',
                },
              }}
            >
              <Td
                colSpan={rest.allColumns.length - 4}
                css={{
                  px: '$2',
                }}
              >
                <TextField
                  size="2"
                  placeholder="Coupon code"
                  css={{
                    mr: '$2',
                    width: 'max-content',
                  }}
                />
                <Button size="2" variant="blue">
                  Apply
                </Button>
              </Td>
              <Td
                css={{
                  px: '$2',
                }}
              >
                Total
              </Td>
              <Td
                colSpan={3}
                css={{
                  px: '$2',
                  borderLeft: '1px solid $gray4',
                  fontWeight: '$bold',
                }}
              >
                $
                {cartItems
                  .map((i) => i.subtotal)
                  .reduce((a, b) => (a ?? 0) + (b ?? 0))}
              </Td>
            </Tr>
          </Tfoot>
        </Table>
        {/* <div id="alt-cart-view" className="flex flex-col sm:hidden">
          <div
            id="alt-header"
            className="border-b-2 py-3 w-full px-2 font-heading border-white/20 text-lg text-center font-bold"
          >
            Products
          </div>
          <div>
            {cartItems.map((item) => {
              return (
                <div className="border-b-2 last:border-b-0 border-white/10 px-2 py-2 flex flex-col gap-1">
                  <div className="flex gap-2 xs:gap-5">
                    <div className="w-32 ">
                      <img className="w-full h-auto" src={item.product?.img} />
                    </div>
                    <div className="product-name xs:text-lg">
                      {item.product?.name}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="product-price text-neutral-300 text-sm">
                      <span className="text-neutral-500">Price: </span>
                      <span className="tracking-wider">${item.price}</span>
                    </div>
                    <div className="product-quantity text-neutral-500 font-mono">
                      x&nbsp;
                      <span className="px-1.5 py-0.5 rounded-md border-2 bg-white/5 text-neutral-300 border-white/10 text-xs">
                        {item.quantity}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="product-subtotal text-neutral-300 text-sm">
                      <span className="text-neutral-500">Subtotal: </span>
                      <span className="tracking-wider">
                        ${(item.price ?? 0) * (item.quantity ?? 0)}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div> */}
      </Card>
      <Box
        css={{
          mt: '$4',
          display: 'flex',
          jc: 'flex-end',
        }}
      >
        <Button
          css={{
            ml: 'auto',
            '& svg': {
              ml: '$2',
            },
          }}
          size="3"
          variant="green"
        >
          Checkout <ArrowRightIcon />
        </Button>
      </Box>
    </>
  )
}
