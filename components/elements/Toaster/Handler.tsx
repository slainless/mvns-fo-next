import { animated, useSpring } from '@react-spring/web'
import { styled, CSS } from '@Theme'
import { forwardRef, ElementRef, ComponentProps } from 'react'
import { Toast, ToastPosition, useToaster, ToastIcon } from 'react-hot-toast'
import { Box } from '@Components/Box'
import { Flex } from '@Components/Box'
import { Bar } from './Bar'

const getPositionStyle = (position: ToastPosition, offset: number): CSS => {
  const top = position.includes('top')
  const verticalStyle: CSS = top ? { top: 0 } : { bottom: 0 }
  const horizontalStyle: CSS = position.includes('center')
    ? {
        justifyContent: 'center',
      }
    : position.includes('right')
    ? {
        justifyContent: 'flex-end',
      }
    : {}
  return {
    left: 0,
    right: 0,
    display: 'flex',
    position: 'absolute',
    // transition: prefersReducedMotion()
    //   ? undefined
    //   : `all 230ms cubic-bezier(.21,1.02,.73,1)`,
    transform: `translateY(${offset * (top ? 1 : -1)}px)`,
    ...verticalStyle,
    ...horizontalStyle,
  }
}

type Props = ComponentProps<typeof Div> & {
  toast: Toast
  handlers: ReturnType<typeof useToaster>['handlers']
}
const Div = styled(animated.div)
export const Handler = forwardRef<ElementRef<'div'>, Props>((props, ref) => {
  const { toast, handlers } = props
  const { calculateOffset, updateHeight } = handlers

  const toastPosition = toast.position!
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
    <Div
      css={{
        ...positionStyle,
      }}
    >
      <Bar toast={toast} />
    </Div>
  )
})
Handler.displayName = 'Toaster.Handler'
