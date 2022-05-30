import { ReactNode, useEffect, useRef, useState } from 'react'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from '@Components/Dialog'
import { Popover, PopoverTrigger } from '@Components/Popover'
import { Action, FilterButtons, PopoverContent } from './Base'
import { Heading } from '@Components/Heading'
import * as DRP from '@Components/DateRangePicker'
import { styled } from '@Theme'
import { ControlGroup } from '@Components/ControlGroup'
import { FiCalendar } from 'react-icons/fi'
import TheCalendar from './Calendar'
import { useFilterStore } from './use-filter-store'
import { useSelections } from 'ahooks'
import { CourseQuery } from '@Models/course'
import { CalendarDate, parseDate } from '@internationalized/date'
// import { isEqual } from 'lodash-es'

type Range = [CalendarDate, CalendarDate]
const isEqual = (a: Range, b: Range) =>
  a[0].compare(b[0]) === 0 && a[1].compare(b[1]) === 0
const getDefault = () => [
  parseDate(new Date().toISOString().slice(0, 10)),
  parseDate(new Date().toISOString().slice(0, 10)),
]

export default function $Date(props: { children: ReactNode }): JSX.Element
export default function $Date(props: { trigger: ReactNode }): JSX.Element
export default function $Date(props: {
  children?: ReactNode
  trigger?: ReactNode
}) {
  const { trigger, children } = props
  const state = useFilterStore((state) => state.state)
  const setDate = useFilterStore((state) => state.setDate)
  const [range, setRange] = useState<Range>(state?.date ?? getDefault())

  useEffect(() => {
    setRange(state?.date ?? getDefault())
  }, [state])

  const onReset = () => {
    // setPrice(null)
    setRange(getDefault())
  }

  const onApply = () => setDate(isEqual(range, getDefault()) ? null : range)

  return (
    <Popover>
      <PopoverTrigger asChild>{trigger || children}</PopoverTrigger>
      <PopoverContent css={{ maxWidth: '$xs' }}>
        <DRP.Root
          value={{
            start: range[0],
            end: range[1],
          }}
          onChange={(v) => setRange([v.start, v.end])}
        >
          <DRP.Content>
            <DRP.Label css={{ mb: '$2', fontWeight: '$bold' }} size="1">
              Type the date range
            </DRP.Label>
            <DRP.Description
              css={{ mb: '$1', color: '$slate11', lineHeight: '1.3' }}
              size="1"
            >
              You can also pick the date using calendar, by clicking on 📆
              button.
            </DRP.Description>
            <ControlGroup>
              <DRP.Field
                css={{ display: 'inline-flex', ai: 'center', gap: '$1' }}
              >
                <DRP.StartSegments css={{ ff: '$poppins' }} />
                -
                <DRP.EndSegments css={{ ff: '$poppins' }} />
              </DRP.Field>
              <TheCalendar onReset={onReset} onApply={onApply}>
                <DRP.Button>📆</DRP.Button>
              </TheCalendar>
            </ControlGroup>
          </DRP.Content>
        </DRP.Root>
        <Action.Root>
          <Action.Reset onClick={onReset} />
          <Action.Apply
            disabled={isEqual(state?.date ?? getDefault(), range)}
            onClick={onApply}
          />
        </Action.Root>
      </PopoverContent>
    </Popover>
  )
}
