import {
  RangeCalendarStateOptions,
  useRangeCalendarState,
} from '@react-stately/calendar'
import { useRangeCalendar } from '@react-aria/calendar'
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
import {
  useRangeCalendarContext,
  RangeCalendarContext,
} from './CalendarContext'
import useMergedRef from '@react-hook/merged-ref'
import { makeDisplayName } from '@Functions/display-name'

const MODULE_NAME = 'RangeCalendar'
const name = makeDisplayName(MODULE_NAME)

export const Root = (
  props: Partial<RangeCalendarStateOptions> & { children: ReactNode }
) => {
  const { locale } = useLocale()
  const { children, ...rest } = props
  const state = useRangeCalendarState({
    ...rest,
    locale,
    createCalendar,
  })

  const ref = useRef<HTMLDivElement>(null)
  const contextProps = useRangeCalendar(rest, state, ref)
  return (
    <RangeCalendarContext.Provider
      value={{
        ...contextProps,
        calendarState: state,
        controlRef: ref,
      }}
    >
      {children}
    </RangeCalendarContext.Provider>
  )
}
Root['displayName'] = name('Root')

export const Content = forwardRef<ElementRef<'div'>, ComponentProps<'div'>>(
  (props, ref) => {
    const context = useRangeCalendarContext()
    if (context == null)
      throw new Error(
        'RangeCalendar.Content should not be used outside of RangeCalendar.Root context!'
      )
    const mergedRef = useMergedRef(ref, context.controlRef)

    return <div {...props} {...context?.calendarProps} ref={mergedRef} />
  }
)
Content.displayName = name('Content')

export const PrevButton = forwardRef<
  ElementRef<typeof Button>,
  ComponentProps<typeof Button>
>((props, ref) => {
  const context = useRangeCalendarContext()

  // @ts-ignore
  return <Button {...props} {...context?.prevButtonProps} ref={ref} />
})
PrevButton.displayName = name('PrevButton')

export const NextButton = forwardRef<
  ElementRef<typeof Button>,
  ComponentProps<typeof Button>
>((props, ref) => {
  const context = useRangeCalendarContext()

  // @ts-ignore
  return <Button {...props} {...context?.nextButtonProps} ref={ref} />
})
NextButton.displayName = name('NextButton')
