import {
  DateFieldState,
  DateFieldStateOptions,
  DateRangePickerStateOptions,
  DateSegment,
  useDateFieldState,
  useDateRangePickerState,
} from '@react-stately/datepicker'
import {
  DateFieldAria,
  useDateField,
  useDateRangePicker,
  useDateSegment,
} from '@react-aria/datepicker'
import { createCalendar } from '@internationalized/date'
import { useLocale } from '@react-aria/i18n'
import {
  ComponentProps,
  ElementRef,
  forwardRef,
  ReactNode,
  useRef,
  createContext,
  useContext,
} from 'react'
import { styled } from '@Theme'
import { TextField } from '../blocks/TextField'
import { Box } from '../blocks/Box'
import { Span } from '../blocks/Span'
import { omit } from 'lodash-es'
import useMergedRef from '@react-hook/merged-ref'
import cleanProps from 'clean-react-props'
import { makeDisplayName } from '@Functions/display-name'

const MODULE_NAME = 'DateField'
const name = makeDisplayName(MODULE_NAME)

export const DateFieldContext = createContext<DateFieldState | null>(null)
export function useDateFieldContext() {
  return useContext(DateFieldContext)
}

export const Root = forwardRef<
  ElementRef<'div'>,
  Partial<DateFieldStateOptions> & ComponentProps<'div'>
>((props, ref) => {
  let { locale } = useLocale()

  const state = useDateFieldState({
    ...props,
    locale,
    createCalendar,
  })

  const controlRef = useRef<HTMLDivElement>(null)
  const mergedRef = useMergedRef(ref, controlRef)
  const dateFieldProps = useDateField(props, state, controlRef)
  return (
    <DateFieldContext.Provider value={state}>
      <div
        {...cleanProps(props)}
        {...dateFieldProps.fieldProps}
        ref={mergedRef}
      >
        {props.children}
      </div>
    </DateFieldContext.Provider>
  )
})
Root.displayName = name('Root')

export const Segment = forwardRef<
  ElementRef<'div'>,
  DateSegment & ComponentProps<'div'>
>((props, ref) => {
  const context = useDateFieldContext()
  if (context == null)
    throw new Error(
      'DateField.Segment can only be used inside DateField context'
    )

  const controlRef = useRef<HTMLDivElement>(null)
  const state = useDateSegment(props, context, controlRef)

  const mergedRef = useMergedRef(ref, controlRef)
  return (
    <div {...cleanProps(props)} {...state.segmentProps} ref={mergedRef}>
      {props.text}
    </div>
  )
})
Segment.displayName = name('Segment')

export const Consumer = DateFieldContext.Consumer
