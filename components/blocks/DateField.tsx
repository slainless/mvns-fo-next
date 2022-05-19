import * as Base from '@Primitives/DateField'
import { styled } from '@Theme'
import { Text } from './Text'
import { TextField } from './TextField'
import { ElementRef, ComponentProps, forwardRef } from 'react'

const StyledRoot = styled(Base.Root, TextField, {
  display: 'inline-flex',
  '&:read-only': {
    backgroundColor: '$loContrast',
  },
})
export const Root = StyledRoot

const StyledSegment = styled(Base.Segment, Text, {
  display: 'inline-block',
  outline: 'none',
  fontWeight: '$bold',
  ff: '$spaceGrotesk',
  px: '2px',
  '&:not([type="literal"])': {
    backgroundColor: '$blue3',
  },
  '&:focus': {
    backgroundColor: '$blue4',
    boxShadow:
      'inset 0px 0px 0px 1px $colors$blue8, 0px 0px 0px 1px $colors$blue8',
    '&:-webkit-autofill': {
      boxShadow:
        'inset 0px 0px 0px 1px $colors$blue8, 0px 0px 0px 1px $colors$blue8, inset 0 0 0 100px $colors$blue3',
    },
  },
  lineHeight: 1.2,
})
export const Segment = StyledSegment

const BaseSegments = forwardRef<ElementRef<'div'>, ComponentProps<'div'>>(
  (props, ref) => {
    return (
      <div {...props} ref={ref}>
        <Base.Consumer>
          {(context) =>
            context?.segments.map((segment, i) => (
              <Segment {...segment} key={segment.type + i} />
            ))
          }
        </Base.Consumer>
      </div>
    )
  }
)
BaseSegments.displayName = 'DateField.Extended.Segments'
const StyledSegments = styled(BaseSegments, {
  display: 'inline-flex',
})
export const Segments = StyledSegments
