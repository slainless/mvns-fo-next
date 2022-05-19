import { CalendarStateOptions, useCalendarState } from '@react-stately/calendar'
import {
  CalendarAria,
  CalendarGridAria,
  CalendarCellAria,
  useCalendar,
} from '@react-aria/calendar'
import { useLocale } from '@react-aria/i18n'
import { createCalendar } from '@internationalized/date'
import {
  ComponentProps,
  createContext,
  ElementRef,
  ReactNode,
  RefObject,
  useContext,
  useRef,
  forwardRef,
} from 'react'
import { Button } from './Button'
import { useCalendarContext, CalendarContext } from './CalendarContext'
import { makeDisplayName } from '@Functions/display-name'

const MODULE_NAME = 'Calendar'
const name = makeDisplayName(MODULE_NAME)

export const Root = (props: CalendarStateOptions & { children: ReactNode }) => {
  const { locale } = useLocale()
  const { children, ...rest } = props
  const state = useCalendarState({
    ...rest,
    locale,
    createCalendar,
  })

  const contextProps = useCalendar(rest, state)
  return (
    <CalendarContext.Provider
      value={{
        ...contextProps,
        calendarState: state,
      }}
    >
      {children}
    </CalendarContext.Provider>
  )
}
Root.displayButton = name('Root')

export const Content = forwardRef<ElementRef<'div'>, ComponentProps<'div'>>(
  (props, ref) => {
    const context = useCalendarContext()

    return <div {...props} {...context?.calendarProps} ref={ref} />
  }
)
Content.displayName = name('Content')

export const PrevButton = forwardRef<
  ElementRef<typeof Button>,
  ComponentProps<typeof Button>
>((props, ref) => {
  const context = useCalendarContext()

  // @ts-ignore
  return <Button {...props} {...context?.prevButtonProps} ref={ref} />
})
PrevButton.displayName = name('PrevButton')

export const NextButton = forwardRef<
  ElementRef<typeof Button>,
  ComponentProps<typeof Button>
>((props, ref) => {
  const context = useCalendarContext()

  // @ts-ignore
  return <Button {...props} {...context?.nextButtonProps} ref={ref} />
})
NextButton.displayName = name('NextButton')
