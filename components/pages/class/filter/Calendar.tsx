import { ReactNode } from 'react'
import {
  DialogTrigger,
  DialogContent,
  DialogOverlay,
  DialogTitle,
} from '@Components/Dialog'
import * as Dialog from '@radix-ui/react-dialog'
import { Heading } from '@Components/Heading'
import { FilterButtons } from './Base'
import * as Calendar from '@Components/RangeCalendar'
import { Box } from '@Components/Box'
import { Flex } from '@Components/Flex'
import { Grid } from '@Components/Grid'
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import CalendarGrid from '@Components/CalendarGrid'
import { endOfMonth, DateFormatter } from '@internationalized/date'
import { useDateFormatter, useLocale } from '@react-aria/i18n'

export default function TheCalendar(props: { children: ReactNode }): JSX.Element
export default function TheCalendar(props: { trigger: ReactNode }): JSX.Element
export default function TheCalendar(props: {
  children?: ReactNode
  trigger?: ReactNode
}) {
  const { trigger, children } = props
  const { locale } = useLocale()

  return (
    <Dialog.Root>
      <DialogTrigger asChild>{trigger || children}</DialogTrigger>
      <Dialog.Portal>
        <DialogOverlay
          css={{
            zIndex: 2147483647,
          }}
        />
        <DialogContent
          css={{
            zIndex: 2147483647,
          }}
        >
          <DialogTitle asChild>
            <Heading
              size="1"
              css={{
                mb: '$4',
                textAlign: 'center',
              }}
            >
              Date Range Selection
            </Heading>
          </DialogTitle>
          <Calendar.Root
            visibleDuration={{
              months: 2,
            }}
          >
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
                  <Calendar.Content
                    css={{
                      position: 'relative',
                    }}
                  >
                    <Grid
                      columns={2}
                      css={{
                        gap: '$4',
                      }}
                    >
                      <Calendar.PrevButton
                        css={{
                          position: 'absolute',
                          left: 0,
                        }}
                      >
                        <ChevronLeftIcon />
                      </Calendar.PrevButton>
                      <Calendar.NextButton
                        css={{
                          position: 'absolute',
                          right: 0,
                        }}
                      >
                        <ChevronRightIcon />
                      </Calendar.NextButton>
                      <Heading
                        as="h2"
                        css={{
                          textAlign: 'center',
                          fontSet: '$md',
                        }}
                      >
                        {dateFormatter.format(
                          state.visibleRange.start.toDate(state.timeZone)
                        )}
                      </Heading>
                      <Heading
                        as="h2"
                        css={{
                          textAlign: 'center',
                          fontSet: '$md',
                        }}
                      >
                        {dateFormatter.format(
                          nextMonthDate.toDate(state.timeZone)
                        )}
                      </Heading>
                    </Grid>
                    <Grid
                      columns={2}
                      css={{
                        gap: '$4',
                      }}
                    >
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
          <FilterButtons />
        </DialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
