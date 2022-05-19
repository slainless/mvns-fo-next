import {
  AriaCalendarCellProps,
  AriaCalendarGridProps,
  CalendarGridAria,
} from '@react-aria/calendar'
import { Grid, Cell } from '@Components/Calendar'
import { styled } from '@Theme'
import { Consumer as GridConsumer } from '@Primitives/CalendarGrid'
import { Consumer as CellConsumer } from '@Primitives/CalendarCell'
import {
  useCalendarContext,
  useCalendarGridContext,
  useRangeCalendarContext,
} from '@Primitives/CalendarContext'
import { Button } from '@Components/Button'
import { Box } from '@Components/Box'
import { Flex } from '@Components/Flex'
import { Text } from '@Components/Text'
import { endOfMonth } from '@internationalized/date'

const N = (n: number) => Array(n).fill(0)

const Table = styled('table', {
  $$width: '$sizes$6',
  $$height: '$sizes$6',
  $$mWidth: '$sizes$5',
  $$mHeight: '$sizes$5',
  all: 'unset',
  display: 'grid',
  gridTemplateColumns: 'repeat(7, $$width)',
  gridAutoRows: '$$height',
  ai: 'center',
  jc: 'center',
})
const Thead = styled('thead', {
  all: 'unset',
  display: 'contents',
})
const Tbody = styled('tbody', {
  all: 'unset',
  display: 'contents',
})
const Tr = styled('tr', {
  all: 'unset',
  display: 'contents',
  my: '$3',
})
const Td = styled('td', {
  all: 'unset',
  display: 'flex',
  ai: 'center',
  jc: 'center',
  // transform: 'scaleX(1.05)',
})
const Th = styled('th')

const CellButton = styled(Button, {
  display: 'flex',
  p: '0 !important',
  ai: 'center',
  jc: 'center',
  width: '$$mWidth',
  height: '$$mHeight !important',
  '&[data-is-outside-visible-range], &[data-is-outside-of-month]': {
    display: 'none',
  },
  ':where([data-is-head], [data-is-tail]) &': {
    width: '100%',
    height: '$$height !important',
    rounded: '$full !important',
  },
  defaultVariants: {
    ghost: true,
  },
})

function CalendarCell(props: AriaCalendarCellProps) {
  const gridContext = useCalendarGridContext()
  const normalContext = useCalendarContext()
  const rangedContext = useRangeCalendarContext()
  if (gridContext == null)
    throw new Error('CalendarCell is used outside of grid context!')

  // const startDateOfMonth = gridContext.monthStart
  // const endDateOfMonth = endOfMonth(gridContext.monthStart)

  return (
    <Cell.Root {...props}>
      <CellConsumer>
        {(context) => {
          if (context == null) throw new Error('Context is empty!')
          // console.log(
          //   props.date.toString(),
          //   startDateOfMonth.toString(),
          //   endDateOfMonth.toString()
          // )

          const isHead =
            rangedContext?.calendarState.highlightedRange?.start.compare(
              props.date
            ) === 0
          const isTail =
            rangedContext?.calendarState.highlightedRange?.end.compare(
              props.date
            ) === 0
          // const isMonthTail = endDateOfMonth.compare(props.date) === 0
          // const isOutsideOfMonth =
          //   startDateOfMonth.compare(props.date) < 0 ||
          //   endDateOfMonth.compare(props.date) > 0

          return (
            <Td
              {...context.cellProps}
              // data-is-month-tail={isMonthTail || undefined}
              data-is-tail={isTail || undefined}
              data-is-head={isHead || undefined}
              css={{
                ':where(&[aria-selected]:first-child, :not([aria-selected]) + &[aria-selected]) > div::before':
                  {
                    roundedL: '$2',
                  },
                '&[aria-selected]:where([data-is-tail], [data-is-month-tail], :last-child) > div::before':
                  {
                    roundedR: '$2',
                  },
                '&[aria-selected] > div::before': {
                  backgroundColor: '$blue3',
                },
                '&[data-is-head] > div::before': {
                  roundedL: '$full',
                },
                '&[data-is-tail] > div::before': {
                  roundedR: '$full',
                },
              }}
            >
              <Flex
                css={{
                  width: '100%',
                  ai: 'center',
                  jc: 'center',
                  position: 'relative',
                  '&::before': {
                    content: '',
                    width: '100%',
                    height: '$$mHeight',
                    inset: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    position: 'absolute',
                    zIndex: -1,
                  },
                }}
              >
                <CellButton
                  {...context.buttonProps}
                  variant={isHead || isTail ? 'blue' : undefined}
                  ghost={isHead || isTail ? false : true}
                  // css={{
                  //   zIndex: 1,
                  //   '[data-is-head]:'
                  // }}
                  // @ts-expect-error
                  ref={context.controlRef}
                  // data-is-disabled={context.isDisabled ? '' : undefined}
                  // data-is-focused={context.isFocused ? '' : undefined}
                  // data-is-invalid={context.isInvalid ? '' : undefined}
                  data-is-outside-visible-range={
                    context.isOutsideVisibleRange ? '' : undefined
                  }
                  // data-is-outside-of-month={isOutsideOfMonth ? '' : undefined}
                  // data-is-pressed={context.isPressed ? '' : undefined}
                  // data-is-selected={context.isSelected ? '' : undefined}
                  // data-is-unavailable={context.isUnavailable ? '' : undefined}
                >
                  {context.formattedDate}
                </CellButton>
              </Flex>
            </Td>
          )
        }}
      </CellConsumer>
    </Cell.Root>
  )
}

function WeekDays() {
  const { weekDays } = useCalendarGridContext()!
  return (
    <Tr>
      {weekDays.map((day, i) => (
        <Th key={i}>
          <Text
            css={{
              fontWeight: '$bold',
              fontSize: '$1',
            }}
          >
            {day.slice(0, 3)}
          </Text>
        </Th>
      ))}
    </Tr>
  )
}

function Days(props: { weekIndex: number }) {
  const { monthStart } = useCalendarGridContext()!
  const { weekIndex } = props
  return (
    <>
      {N(7).map((_, dayIndex) => {
        return (
          <CalendarCell
            key={dayIndex}
            date={monthStart.add({ weeks: weekIndex, days: dayIndex })}
          />
        )
      })}
    </>
  )
}

function Weeks() {
  const { weeksInMonth } = useCalendarGridContext()!
  return (
    <>
      {N(weeksInMonth).map((_, weekIndex) => (
        <Tr>
          <Days key={weekIndex} weekIndex={weekIndex} />
        </Tr>
      ))}
    </>
  )
}

export default function CalendarGrid(props: AriaCalendarGridProps) {
  return (
    <Grid.Root {...props}>
      <GridConsumer>
        {(context) => {
          if (context == null) throw new Error('Context is empty!')
          return (
            <Table {...context.gridProps}>
              <Thead {...context.headerProps}>
                <WeekDays />
              </Thead>
              <Tbody>
                <Weeks />
              </Tbody>
            </Table>
          )
        }}
      </GridConsumer>
    </Grid.Root>
  )
}
