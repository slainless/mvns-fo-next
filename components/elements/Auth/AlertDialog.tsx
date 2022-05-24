import {
  // AlertDialog,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@Components/AlertDialog'
import { createStateStore } from '@Functions/use-store'
import * as AlertDialog from '@radix-ui/react-alert-dialog'
import { useMemo } from 'react'
import create from 'zustand'
import shallow from 'zustand/shallow'
import RegisterSuccess from './DialogPreset/RegisterSuccess'

export type DialogPreset = 'register-success'
export const useAlertDialogState = createStateStore<DialogPreset | null>(null)

export default function AlertDialogFeedback() {
  const { state: preset, set: setPreset } = useAlertDialogState(
    (state) => ({
      state: state.state,
      set: state.set,
    }),
    shallow
  )
  return (
    <AlertDialog.Root
      open={preset != null}
      onOpenChange={(state) => {
        if (state == false) return setPreset(null)
      }}
    >
      <AlertDialogOverlay
        css={{
          backgroundColor: '$blackA12',
        }}
      />
      <AlertDialogContent
        css={{
          maxWidth: '$md',
        }}
      >
        {preset === 'register-success' ? <RegisterSuccess /> : null}
      </AlertDialogContent>
      {/* <AlertDialogTrigger asChild>{children}</AlertDialogTrigger> */}
    </AlertDialog.Root>
  )
}
