import { animated, useSpring } from '@react-spring/web'
import { styled } from '@Theme'
import { ComponentProps, ElementRef, forwardRef } from 'react'
import { ToastPosition } from 'react-hot-toast'

type Props = ComponentProps<typeof StyledAnimated> & {
  position: ToastPosition
}
const StyledAnimated = styled(animated.div)
export const Container = forwardRef<ElementRef<'div'>, Props>((props, ref) => {
  return <StyledAnimated {...props} ref={ref} />
})
Container.displayName = 'Toaster.Container'
