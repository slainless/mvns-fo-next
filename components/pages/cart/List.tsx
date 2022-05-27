import { Box } from '@Components/Box'
import { Card } from '@Components/Card'
import { cartItems } from '@Dev/dummy'
import { Table, Thead, Td, Tr, Th, Tbody, Tfoot } from '@Components/Table'
import { Button } from '@Components/Button'
import { ArrowRightIcon, Cross1Icon } from '@radix-ui/react-icons'
import { TextField } from '@Components/TextField'
import { CSS, styled } from '@Theme'
import useTableHandler, { Item } from './List/use-table-handler'

const StyledHeadTd = styled(Td, {
  borderColor: '$slate6',
  fontSize: '$sm !important',
  py: '$4 !important',
  px: '$2',
})
const StyledTr = styled(Tr, {
  display: 'contents',
})
const StyledTd = styled(Td, {
  display: 'flex',
})

const defineWidth = (id: string): CSS => {
  switch (id) {
    case 'image':
      return {
        maxWidth: '$tw_24',
      }
    case 'product':
      return {}
    case 'quantity':
      return { maxWidth: 'max-content' }
    case 'price':
      return { maxWidth: '$tw_24' }
    case 'subtotal':
      return { maxWidth: '$tw_24' }
    case 'actions':
      return { maxWidth: '$tw_12' }
    default:
      return { maxWidth: '0' }
  }
}

export default function List() {
  const {
    getTableProps,
    getTableBodyProps,
    footerGroups,
    headerGroups,
    rows,
    prepareRow,
    ...rest
  } = useTableHandler()

  return (
    <>
      <Card>
        <Table
          css={{
            display: 'grid',
            gridTemplateColumns:
              '$tw_32 auto max-content max-content max-content max-content',
          }}
          {...getTableProps()}
        >
          <Thead css={{ display: 'contents' }}>
            {headerGroups.map((headerGroup, i) => (
              <StyledTr key={i} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, i) => {
                  const { className, ...rest } = column.getHeaderProps()
                  return (
                    <StyledHeadTd key={i} {...rest}>
                      {column.render('Header')}
                    </StyledHeadTd>
                  )
                })}
              </StyledTr>
            ))}
          </Thead>
          <Tbody css={{ display: 'contents' }} {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row)
              return (
                <StyledTr
                  key={i}
                  css={{
                    borderColor: '$slate4',
                    '&:last-child > td': {
                      borderBottomColor: '$slate6',
                    },
                  }}
                  {...row.getRowProps()}
                >
                  {row.cells.map((cell, i) => (
                    <StyledTd
                      key={i}
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
                    </StyledTd>
                  ))}
                </StyledTr>
              )
            })}
          </Tbody>
          <Tfoot css={{ display: 'contents' }}>
            <StyledTr
              css={{
                '& td': { fontSize: '$sm !important', py: '$2 !important' },
              }}
            >
              <StyledTd css={{ px: '$2', gridColumn: '1 / span 3' }}>
                <TextField
                  size="2"
                  placeholder="Coupon code"
                  id={'discount-coupon'}
                  css={{ mr: '$2', width: 'max-content' }}
                />
                <Button size="2" variant="blue">
                  Apply
                </Button>
              </StyledTd>
              <StyledTd css={{ px: '$2' }}>Total</StyledTd>
              <StyledTd
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
              </StyledTd>
            </StyledTr>
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
      <Box css={{ mt: '$4', display: 'flex', jc: 'flex-end' }}>
        <Button
          css={{ ml: 'auto', '& svg': { ml: '$2' } }}
          size="3"
          variant="green"
        >
          Checkout <ArrowRightIcon />
        </Button>
      </Box>
    </>
  )
}
