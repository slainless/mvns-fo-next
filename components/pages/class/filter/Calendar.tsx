import { ReactNode } from 'react'
import {
  DialogTrigger,
  DialogContent,
  DialogOverlay,
  DialogTitle,
} from '@Components/Dialog'
import * as Dialog from '@radix-ui/react-dialog'
import { Heading } from '@Components/Heading'
import { Action, FilterButtons } from './Base'
import * as Calendar from '@Components/RangeCalendar'
import { Box } from '@Components/Box'
import { Flex } from '@Components/Flex'
import { Grid } from '@Components/Grid'
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import CalendarGrid from '@Components/CalendarGrid'
import {
  endOfMonth,
  DateFormatter,
  CalendarDate,
  parseDate,
} from '@internationalized/date'
import { useDateFormatter, useLocale } from '@react-aria/i18n'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { useDateRangePickerContext } from '@Primitives/DateContext'
import { useFilterStore } from '@Pages/class/filter/use-filter-store'

type Range = [CalendarDate, CalendarDate]
const isEqual = (a: Range, b: Range) =>
  a[0].compare(b[0]) === 0 && a[1].compare(b[1]) === 0
const getDefault = () => [
  parseDate(new Date().toISOString().slice(0, 10)),
  parseDate(new Date().toISOString().slice(0, 10)),
]

type OnActions = {
  onReset: () => void
  onApply: () => void
}
export default function TheCalendar(
  props: { children: ReactNode } & OnActions
): JSX.Element
export default function TheCalendar(
  props: { trigger: ReactNode } & OnActions
): JSX.Element
export default function TheCalendar(
  props: {
    children?: ReactNode
    trigger?: ReactNode
  } & OnActions
) {
  const { trigger, children, onReset, onApply } = props
  const { locale } = useLocale()
  const { calendarProps } = useDateRangePickerContext()

  const state = useFilterStore((state) => state.state)

  return (
    <Dialog.Root>
      <DialogTrigger asChild>{trigger || children}</DialogTrigger>
      <Dialog.Portal>
        <DialogOverlay css={{ zIndex: 2147483647 }} />
        <DialogContent css={{ zIndex: 2147483647, pt: '$7' }}>
          <DialogTitle asChild>
            <VisuallyHidden>
              <Heading size="1" css={{ mb: '$4', textAlign: 'center' }}>
                Date Range Selection
              </Heading>
            </VisuallyHidden>
          </DialogTitle>
          <Calendar.Root {...calendarProps} visibleDuration={{ months: 2 }}>
            <Calendar.Consumer>
              {(context) => {
                const state = context!.calendarState
                const nextMonthDate = state.visibleRange.start.add({
                  months: 1,
                })
                const dateFormatter = new DateFormatter(locale, {
                  month: 'long',
                  year: 'numeric',
                  timeZone: state.timeZone,
                })
                return (
                  <Calendar.Content css={{ position: 'relative' }}>
                    <Grid columns={2} css={{ gap: '$4' }}>
                      <Calendar.PrevButton
                        css={{ position: 'absolute', left: 0 }}
                      >
                        <ChevronLeftIcon />
                      </Calendar.PrevButton>
                      <Calendar.NextButton
                        css={{ position: 'absolute', right: 0 }}
                      >
                        <ChevronRightIcon />
                      </Calendar.NextButton>
                      <Heading
                        as="h2"
                        css={{ textAlign: 'center', fontSet: '$md' }}
                      >
                        {dateFormatter.format(
                          state.visibleRange.start.toDate(state.timeZone)
                        )}
                      </Heading>
                      <Heading
                        as="h2"
                        css={{ textAlign: 'center', fontSet: '$md' }}
                      >
                        {dateFormatter.format(
                          nextMonthDate.toDate(state.timeZone)
                        )}
                      </Heading>
                    </Grid>
                    <Grid columns={2} css={{ gap: '$4' }}>
                      <CalendarGrid />
                      <CalendarGrid
                        startDate={nextMonthDate}
                        endDate={endOfMonth(nextMonthDate)}
                      />
                    </Grid>
                  </Calendar.Content>
                )
              }}
            </Calendar.Consumer>
          </Calendar.Root>
          <Action.Root>
            <Action.Reset onClick={onReset} />
            <Action.Apply
              disabled={isEqual(state?.date ?? getDefault(), [
                calendarProps.value.start,
                calendarProps.value.end,
              ])}
              onClick={onApply}
            />
          </Action.Root>
        </DialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
