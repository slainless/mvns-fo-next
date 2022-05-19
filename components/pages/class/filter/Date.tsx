import { ReactNode, useRef } from 'react'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from '@Components/Dialog'
import { Popover, PopoverTrigger } from '@Components/Popover'
import { FilterButtons, PopoverContent } from './Base'
import { Heading } from '@Components/Heading'
import * as DRP from '@Components/DateRangePicker'
import { styled } from '@Theme'
import { ControlGroup } from '@Components/ControlGroup'
import { FiCalendar } from 'react-icons/fi'
import TheCalendar from './Calendar'

export default function Date(props: { children: ReactNode }): JSX.Element
export default function Date(props: { trigger: ReactNode }): JSX.Element
export default function Date(props: {
  children?: ReactNode
  trigger?: ReactNode
}) {
  const { trigger, children } = props

  return (
    <Popover>
      <PopoverTrigger asChild>{trigger || children}</PopoverTrigger>
      <PopoverContent
        css={{
          maxWidth: '$xs',
        }}
      >
        <DRP.Root>
          <DRP.Content>
            <DRP.Label
              css={{
                mb: '$2',
                fontWeight: '$bold',
              }}
              size="1"
            >
              Type the date range
            </DRP.Label>
            <DRP.Description
              css={{
                mb: '$1',
                color: '$slate11',
                lineHeight: '1.3',
              }}
              size="1"
            >
              You can also pick the date using calendar, by clicking on 📆
              button.
            </DRP.Description>
            <ControlGroup>
              <DRP.Field
                css={{
                  display: 'inline-flex',
                  ai: 'center',
                  gap: '$1',
                }}
              >
                <DRP.StartSegments
                  css={{
                    ff: '$spaceGrotesk',
                  }}
                />
                -
                <DRP.EndSegments
                  css={{
                    ff: '$spaceGrotesk',
                  }}
                />
              </DRP.Field>
              <TheCalendar>
                <DRP.Button>📆</DRP.Button>
              </TheCalendar>
            </ControlGroup>
          </DRP.Content>
        </DRP.Root>
        <FilterButtons />
      </PopoverContent>
    </Popover>
  )
}
