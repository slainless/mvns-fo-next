import * as BaseDRP from '@Primitives/DateRangePicker'
import * as BaseDF from '@Primitives/DateField'
import { DateRangePickerStateOptions } from '@react-stately/datepicker'
import { styled } from '@Theme'
import { ComponentProps, ElementRef, forwardRef } from 'react'
import { Text } from './Text'
import { TextField } from './TextField'
import { Button as PrimitiveButton } from './Button'
import * as DF from './DateField'
export { Segment, Segments } from './DateField'
import { makeDisplayName } from '@Functions/display-name'

const MODULE_NAME = 'DateRangePicker'
const name = makeDisplayName(MODULE_NAME)

const StyledContent = styled(BaseDRP.Content)
// export const DateRangePicker = forwardRef<
//   ElementRef<'div'>,
//   ComponentProps<'div'>
// >((props, ref) => {
//   const {} = props
//   return (
//     <BaseDRP.Root>
//       <StyledContent {...props} ref={ref} />
//     </BaseDRP.Root>
//   )
// })
export const Root = BaseDRP.Root
export const Content = StyledContent

const StyledLabel = styled(BaseDRP.Label, Text)
export const Label = StyledLabel

const StyledDescription = styled(BaseDRP.Description, Text)
export const Description = StyledDescription

const StyledField = styled('div', DF.Root)
export const Field = StyledField

const BaseSegment = styled('div', Text, {
  display: 'inline-block',
})
const StyledStartField = styled(BaseDRP.StartField, BaseSegment)
export const StartField = StyledStartField
const StyledEndField = styled(BaseDRP.EndField, BaseSegment)
export const EndField = StyledEndField

const StyledButton = styled(BaseDRP.Button, PrimitiveButton)
export const Button = StyledButton

export const StartSegments = forwardRef<
  ElementRef<typeof StartField>,
  ComponentProps<typeof StartField>
>((props, ref) => {
  return (
    <StartField {...props} ref={ref}>
      <DF.Segments />
    </StartField>
  )
})
StartSegments.displayName = name('StartSegments')

export const EndSegments = forwardRef<
  ElementRef<typeof EndField>,
  ComponentProps<typeof EndField>
>((props, ref) => {
  return (
    <EndField {...props} ref={ref}>
      <DF.Segments />
    </EndField>
  )
})
EndSegments.displayName = name('EndSegments')
