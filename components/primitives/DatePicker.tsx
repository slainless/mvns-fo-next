import {
  DatePickerState,
  DatePickerStateOptions,
  useDatePickerState,
} from '@react-stately/datepicker'
import { DatePickerAria, useDatePicker } from '@react-aria/datepicker'
import { createCalendar } from '@internationalized/date'
import { useLocale } from '@react-aria/i18n'
import {
  ComponentProps,
  ElementRef,
  forwardRef,
  ReactNode,
  useRef,
} from 'react'
import { DatePickerContext, useDatePickerContext } from './DateContext'
import useMergedRef from '@react-hook/merged-ref'
import cleanProps from 'clean-react-props'
import * as DateField from './DateField'
import { Button as PrimitiveButton } from './Button'
import { Root as PrimitiveCalendar } from './Calendar'
import { CalendarStateOptions } from '@react-stately/calendar'

export const Root = (
  props: DatePickerStateOptions & { children: ReactNode }
) => {
  const { children, ...rest } = props
  const state = useDatePickerState({
    ...rest,
  })

  const controlRef = useRef<HTMLDivElement>(null)
  const contextProps = useDatePicker(rest, state, controlRef)
  return (
    <DatePickerContext.Provider
      value={{
        ...contextProps,
        controlRef,
      }}
    >
      {children}
    </DatePickerContext.Provider>
  )
}

export const Content = forwardRef<ElementRef<'div'>, ComponentProps<'div'>>(
  (props, ref) => {
    const context = useDatePickerContext()
    const mergedRef =
      context?.controlRef == null ? ref : useMergedRef(ref, context.controlRef)

    return <div {...context?.groupProps} {...props} ref={mergedRef} />
  }
)

export const Field = forwardRef<
  ElementRef<typeof DateField.Root>,
  ComponentProps<typeof DateField.Root>
>((props, ref) => {
  const context = useDatePickerContext()

  // @ts-expect-error
  return <DateField.Root {...context?.fieldProps} {...props} ref={ref} />
})

export const Label = forwardRef<ElementRef<'label'>, ComponentProps<'label'>>(
  (props, ref) => {
    const context = useDatePickerContext()

    return <span {...context?.labelProps} {...props} ref={ref} />
  }
)

export const Button = forwardRef<
  ElementRef<typeof PrimitiveButton>,
  ComponentProps<typeof PrimitiveButton>
>((props, ref) => {
  const context = useDatePickerContext()

  return (
    <PrimitiveButton
      {...context?.buttonProps}
      {...props}
      // @ts-expect-error
      ref={ref}
    />
  )
})

export const Calendar = (props: CalendarStateOptions) => {
  const context = useDatePickerContext()

  return <Calendar {...context?.calendarProps} {...props} />
}

export { Segment } from './DateField'
