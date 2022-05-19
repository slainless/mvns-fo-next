import { ToastPosition } from 'react-hot-toast'
import { CSS } from '@Theme'

export const getPositionStyle = (
  position: ToastPosition,
  offset: number
): CSS => {
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
