import { styled } from '@Theme'
import {
  ComponentProps,
  createElement,
  ElementRef,
  forwardRef,
  useRef,
} from 'react'
import { useButton } from '@react-aria/button'
import useMergedRef from '@react-hook/merged-ref'

const StyledButton = styled('button', {})

// @ts-ignore
export const Button: <T extends keyof ReactHTML = 'button'>(
  props: HTMLAttr<T>
) => JSX.Element = forwardRef((props, ref) => {
  const controlRef = useRef(null)
  const mergedRef = ref == null ? controlRef : useMergedRef(ref, controlRef)
  const { buttonProps } = useButton(
    // @ts-ignore
    {
      ...props,
      elementType: props['as'],
    },
    controlRef
  )
  return createElement(props['as'] ?? 'button', {
    ...props,
    ...buttonProps,
    ref: mergedRef,
  })
})
Button['displayButton'] = 'AriaButton'
