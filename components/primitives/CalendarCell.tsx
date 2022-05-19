import { AriaCalendarCellProps, useCalendarCell } from '@react-aria/calendar'
import { useLocale } from '@react-aria/i18n'
import {
  forwardRef,
  ElementRef,
  ReactNode,
  useRef,
  ComponentProps,
} from 'react'
import {
  useCalendarContext,
  useCalendarGridContext,
  CalendarCellContext,
  useCalendarCellContext,
  useRangeCalendarContext,
} from './CalendarContext'
import { Button as PrimitiveButton } from './Button'
import { makeDisplayName } from '@Functions/display-name'

const MODULE_NAME = 'CalendarCell'
const name = makeDisplayName(MODULE_NAME)

export function Root(props: AriaCalendarCellProps & { children: ReactNode }) {
  const { children, ...rest } = props
  const normalContext = useCalendarContext()
  const rangeContext = useRangeCalendarContext()
  const commonContext = normalContext || rangeContext

  const context = useCalendarGridContext()
  const controlRef = useRef<HTMLDivElement>(null)
  if (commonContext == null)
    throw new Error(
      'CalendarCell.Root can only be used inside Calendar.Root context'
    )

  const contextProps = useCalendarCell(
    rest,
    commonContext.calendarState,
    controlRef
  )

  return (
    <CalendarCellContext.Provider
      value={{
        ...contextProps,
        controlRef,
      }}
    >
      {children}
    </CalendarCellContext.Provider>
  )
}
Root.displayName = name('Root')

export const Content = forwardRef<ElementRef<'div'>, ComponentProps<'div'>>(
  (props, ref) => {
    const context = useCalendarCellContext()

    return <div {...props} {...context?.cellProps} ref={ref} />
  }
)
Content.displayName = name('Content')

export const Button = forwardRef<
  ElementRef<typeof PrimitiveButton>,
  ComponentProps<typeof PrimitiveButton>
>((props, ref) => {
  const context = useCalendarCellContext()

  // @ts-ignore
  return <PrimitiveButton {...props} {...context?.buttonProps} ref={ref} />
})
Button.displayName = name('Button')

export const Consumer = CalendarCellContext.Consumer
