import {
  DateRangePickerState,
  DateRangePickerStateOptions,
  useDateRangePickerState,
} from '@react-stately/datepicker'
import { DateRangePickerAria, useDateRangePicker } from '@react-aria/datepicker'
import { createCalendar } from '@internationalized/date'
import { useLocale } from '@react-aria/i18n'
import {
  ComponentProps,
  ElementRef,
  forwardRef,
  ReactNode,
  useRef,
} from 'react'
import {
  DateRangePickerContext,
  useDateRangePickerContext,
} from './DateContext'
import useMergedRef from '@react-hook/merged-ref'
import cleanProps from 'clean-react-props'
import * as DateField from './DateField'
import { Button as PrimitiveButton } from './Button'
import { makeDisplayName } from '@Functions/display-name'

const MODULE_NAME = `DateRangePicker`
const name = makeDisplayName(MODULE_NAME)

export const Root = (
  props: DateRangePickerStateOptions & { children: ReactNode }
) => {
  const { children, ...rest } = props
  const state = useDateRangePickerState({
    ...rest,
    label: '$PLACEHOLDER$',
    description: '$PLACEHOLDER$',
  })

  const controlRef = useRef<HTMLDivElement>(null)
  const contextProps = useDateRangePicker(rest, state, controlRef)
  return (
    <DateRangePickerContext.Provider
      value={{
        ...contextProps,
        controlRef,
      }}
    >
      {children}
    </DateRangePickerContext.Provider>
  )
}

export const Content = forwardRef<ElementRef<'div'>, ComponentProps<'div'>>(
  (props, ref) => {
    const context = useDateRangePickerContext()
    const mergedRef = useMergedRef(ref, context?.controlRef ?? (() => {}))

    return <div {...props} {...context?.groupProps} ref={mergedRef} />
  }
)
Content.displayName = name('Content')

export const StartField = forwardRef<
  ElementRef<typeof DateField.Root>,
  ComponentProps<typeof DateField.Root>
>((props, ref) => {
  const context = useDateRangePickerContext()

  // @ts-expect-error
  return <DateField.Root {...props} {...context?.startFieldProps} ref={ref} />
})
StartField.displayName = name('StartField')

export const EndField = forwardRef<
  ElementRef<typeof DateField.Root>,
  ComponentProps<typeof DateField.Root>
>((props, ref) => {
  const context = useDateRangePickerContext()

  // @ts-expect-error
  return <DateField.Root {...props} {...context?.endFieldProps} ref={ref} />
})
EndField.displayName = name('EndField')

export const Label = forwardRef<ElementRef<'label'>, ComponentProps<'label'>>(
  (props, ref) => {
    const context = useDateRangePickerContext()

    return (
      <span
        id={
          context?.startFieldProps['aria-labelledby'] ||
          context?.endFieldProps['aria-labelledby']
        }
        {...props}
        {...context?.labelProps}
        ref={ref}
      />
    )
  }
)
Label.displayName = name('Label')

export const Description = forwardRef<
  ElementRef<'span'>,
  ComponentProps<'span'>
>((props, ref) => {
  const context = useDateRangePickerContext()

  return <span {...context?.descriptionProps} {...props} ref={ref} />
})
Description.displayName = name('Description')

export const Button = forwardRef<
  ElementRef<typeof PrimitiveButton>,
  ComponentProps<typeof PrimitiveButton>
>((props, ref) => {
  const context = useDateRangePickerContext()

  // @ts-ignore
  return <PrimitiveButton {...props} {...context?.buttonProps} ref={ref} />
})
Button.displayName = name('Button')
