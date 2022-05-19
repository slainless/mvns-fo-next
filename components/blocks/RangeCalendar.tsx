import { styled } from '@Theme'
import * as BaseC from '@Primitives/RangeCalendar'
import { Button } from './Button'
import { ElementRef, ComponentProps, forwardRef } from 'react'
import { RangeCalendarContext } from '@Primitives/CalendarContext'

const StyledContent = styled(BaseC.Content)
export const Content = StyledContent
export const Root = BaseC.Root

const StyledPrevButton = styled(BaseC.PrevButton, Button)
export const PrevButton = StyledPrevButton

const StyledNextButton = styled(BaseC.NextButton, Button)
export const NextButton = StyledNextButton

export const Consumer = RangeCalendarContext.Consumer
