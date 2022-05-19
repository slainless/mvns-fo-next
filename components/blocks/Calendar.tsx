import * as BaseCG from '@Primitives/CalendarGrid'
import * as BaseCC from '@Primitives/CalendarCell'
import * as BaseC from '@Primitives/Calendar'
import { styled } from '@Theme'
import { Button } from './Button'
import { ElementRef, ComponentProps, forwardRef } from 'react'

const StyledContent = styled(BaseC.Content)
export const Content = StyledContent
export const Root = BaseC.Root

const StyledPrevButton = styled(BaseC.PrevButton, Button)
export const PrevButton = StyledPrevButton

const StyledNextButton = styled(BaseC.NextButton, Button)
export const NextButton = StyledNextButton

export module Grid {
  export const Root = BaseCG.Root
}

export module Cell {
  export const Root = BaseCC.Root
}
