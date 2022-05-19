import { Box } from '@Components/Box'
import {
  useToaster,
  ToastPosition,
  DefaultToastOptions,
  resolveValue,
} from 'react-hot-toast'
import { Container } from './Toaster/Container'
import { Bar } from './Toaster/Bar'
import { getPositionStyle } from './Toaster/helper'

type Props = {
  position?: ToastPosition
  toastOptions?: DefaultToastOptions
  reverseOrder?: boolean
  gutter?: number
}
export default function Toaster(props: Props) {
  const { position = 'top-left', reverseOrder, gutter, toastOptions } = props
  const { toasts, handlers } = useToaster()
  const { startPause, endPause, calculateOffset, updateHeight } = handlers
  return (
    <Box
      css={{
        position: 'fixed',
        inset: '$5',
        top: 'calc($sizes$header + $5)',
        zIndex: '99999',
        pointerEvents: 'none',
      }}
      onMouseEnter={startPause}
      onMouseLeave={endPause}
    >
      {toasts.map((toast) => {
        const toastPosition = toast.position || position
        const offset = calculateOffset(toast, {
          reverseOrder: false,
          gutter: 8,
        })
        const theRef = (el) => {
          if (el && !toast.height) {
            const height = el.getBoundingClientRect().height
            updateHeight(toast.id, height)
          }
        }
        const positionStyle = getPositionStyle(toastPosition, offset)

        return (
          <Container
            key={toast.id}
            position={toastPosition}
            css={positionStyle}
            ref={theRef}
          >
            <Bar {...toast} position={toastPosition} />
          </Container>
        )
      })}
    </Box>
  )
}
