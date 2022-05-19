import { makeDisplayName } from '@Functions/display-name'
import {
  CalendarDate,
  endOfMonth,
  getWeeksInMonth,
  startOfWeek,
} from '@internationalized/date'
import {
  useCalendar,
  useCalendarGrid,
  AriaCalendarGridProps,
} from '@react-aria/calendar'
import { useLocale, useDateFormatter } from '@react-aria/i18n'
import { forwardRef, ElementRef, ComponentProps, ReactNode } from 'react'
import {
  CalendarGridContext,
  useCalendarContext,
  useCalendarGridContext,
  useRangeCalendarContext,
} from './CalendarContext'

const MODULE_NAME = 'CalendarGrid'
const name = makeDisplayName(MODULE_NAME)

export function Root(props: AriaCalendarGridProps & { children: ReactNode }) {
  const { children, ...rest } = props
  const { locale } = useLocale()
  const context = useCalendarContext() || useRangeCalendarContext()
  const state = context?.calendarState
  if (state == null)
    throw new Error('CalendarGrid should be used in Calendar context!')

  const contextProps = useCalendarGrid(rest, state)
  const monthStart = startOfWeek(
    rest.startDate || state.visibleRange.start,
    locale
  )
  const weeksInMonth = getWeeksInMonth(
    rest.startDate || state.visibleRange.start,
    locale
  )
  const dayFormatter = useDateFormatter({
    weekday: 'long',
    timeZone: state.timeZone,
  })
  const weekDays = [...new Array(7).keys()].map((index) => {
    let date = monthStart.add({
      days: index,
    })
    let dateDay = date.toDate(state.timeZone)
    return dayFormatter.format(dateDay)
  })

  return (
    <CalendarGridContext.Provider
      value={{
        ...contextProps,
        weekDays,
        monthStart,
        weeksInMonth,
      }}
    >
      {children}
    </CalendarGridContext.Provider>
  )
}
Root['displayName'] = name('Root')

export const Table = forwardRef<ElementRef<'table'>, ComponentProps<'table'>>(
  (props, ref) => {
    const context = useCalendarGridContext()

    return <table {...props} {...context?.gridProps} ref={ref} />
  }
)
Table.displayName = name('Table')

export const Thead = forwardRef<
  ElementRef<'thead'>,
  ComponentProps<'thead'> & {
    children?: (weekDays: string[]) => ReactNode
  }
>((props, ref) => {
  const { children, ...rest } = props
  const context = useCalendarGridContext()
  if (context == null)
    throw new Error(
      'Cannot use CalendarGrid.Thead outside CalendarGrid context!'
    )

  return (
    <thead {...rest} {...context?.headerProps} ref={ref}>
      {children?.(context.weekDays)}
    </thead>
  )
})
Thead.displayName = name('Thead')

export const Tbody = forwardRef<
  ElementRef<'tbody'>,
  ComponentProps<'tbody'> & {
    children?: (props: {
      weekDays: string[]
      monthStart: CalendarDate
    }) => ReactNode
  }
>((props, ref) => {
  const { children, ...rest } = props
  const context = useCalendarGridContext()
  if (context == null)
    throw new Error(
      'Cannot use CalendarGrid.Tbody outside CalendarGrid context!'
    )

  return (
    <tbody {...rest} ref={ref}>
      {children?.({
        weekDays: context.weekDays,
        monthStart: context.monthStart,
      })}
    </tbody>
  )
})
Tbody.displayName = name('Tbody')

export const Consumer = CalendarGridContext.Consumer
