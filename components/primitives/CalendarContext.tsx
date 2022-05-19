import { CalendarDate } from '@internationalized/date'
import {
  CalendarAria,
  CalendarCellAria,
  CalendarGridAria,
} from '@react-aria/calendar'
import { CalendarState, RangeCalendarState } from '@react-stately/calendar'
import { createContext, RefObject, useContext } from 'react'

export const CalendarContext = createContext<
  (CalendarAria & { calendarState: CalendarState }) | null
>(null)
export function useCalendarContext() {
  return useContext(CalendarContext)
}

export const CalendarGridContext = createContext<
  | (CalendarGridAria & {
      monthStart: CalendarDate
      weeksInMonth: number
    })
  | null
>(null)
export function useCalendarGridContext() {
  return useContext(CalendarGridContext)
}
export const CalendarCellContext = createContext<
  | (CalendarCellAria & {
      controlRef: RefObject<HTMLElement>
    })
  | null
>(null)
export function useCalendarCellContext() {
  return useContext(CalendarCellContext)
}

export const RangeCalendarContext = createContext<
  | (CalendarAria & {
      calendarState: RangeCalendarState
      controlRef: RefObject<HTMLDivElement>
    })
  | null
>(null)
export function useRangeCalendarContext() {
  return useContext(RangeCalendarContext)
}
