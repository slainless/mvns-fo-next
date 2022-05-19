import { DateValue } from '@internationalized/date'
import { DatePickerAria, DateRangePickerAria } from '@react-aria/datepicker'
import { createContext, ElementRef, RefObject, useContext } from 'react'

export const DatePickerContext = createContext<
  | (DatePickerAria & {
      controlRef: RefObject<HTMLDivElement>
    })
  | null
>(null)
export function useDatePickerContext() {
  return useContext(DatePickerContext)
}

export const DateRangePickerContext = createContext<
  | (DateRangePickerAria & {
      controlRef: RefObject<HTMLDivElement>
    })
  | null
>(null)
export function useDateRangePickerContext() {
  return useContext(DateRangePickerContext)
}
