import React from 'react'
import { styled, CSS } from '@Theme'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { Cross1Icon } from '@radix-ui/react-icons'
import { overlayStyles } from './Overlay'
import { panelStyles } from './Panel'
import { IconButton } from './IconButton'

type DialogProps = React.ComponentProps<typeof DialogPrimitive.Root> & {
  children: React.ReactNode
}

const StyledOverlay = styled(DialogPrimitive.Overlay, overlayStyles, {
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: 51,
})

export function Dialog({ children, ...props }: DialogProps) {
  return (
    <DialogPrimitive.Root {...props}>
      <StyledOverlay />
      {children}
    </DialogPrimitive.Root>
  )
}

const StyledContent = styled(DialogPrimitive.Content, panelStyles, {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 200,
  maxHeight: '85vh',
  padding: '$4',
  marginTop: '-5vh',
  zIndex: 52,
  // animation: `${fadeIn} 125ms linear, ${moveDown} 125ms cubic-bezier(0.22, 1, 0.36, 1)`,

  // Among other things, prevents text alignment inconsistencies when dialog can't be centered in the viewport evenly.
  // Affects animated and non-animated dialogs alike.
  willChange: 'transform',

  '&:focus': {
    outline: 'none',
  },
})

const StyledCloseButton = styled(DialogPrimitive.Close, {
  position: 'absolute',
  top: '$2',
  right: '$2',
})

type DialogContentPrimitiveProps = React.ComponentProps<
  typeof DialogPrimitive.Content
>
type DialogContentProps = DialogContentPrimitiveProps & { css?: CSS }

export const DialogContent = React.forwardRef<
  React.ElementRef<typeof StyledContent>,
  DialogContentProps
>(({ children, ...props }, forwardedRef) => (
  <StyledContent {...props} ref={forwardedRef}>
    {children}
    <StyledCloseButton asChild>
      <IconButton variant="ghost">
        <Cross1Icon />
      </IconButton>
    </StyledCloseButton>
  </StyledContent>
))
DialogContent.displayName = 'Dialog.Content'

export const DialogTrigger = DialogPrimitive.Trigger
export const DialogClose = DialogPrimitive.Close
export const DialogTitle = DialogPrimitive.Title
export const DialogDescription = DialogPrimitive.Description
export const DialogOverlay = StyledOverlay
export const Root = Dialog
export const Content = DialogContent
export const Trigger = DialogPrimitive.Trigger
export const Close = DialogPrimitive.Close
export const Title = DialogPrimitive.Title
export const Description = DialogPrimitive.Description
export const Overlay = StyledOverlay
