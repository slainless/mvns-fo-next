import {
  // AlertDialog,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@Components/AlertDialog'
import createStateStore from '@Functions/use-state'
import * as AlertDialog from '@radix-ui/react-alert-dialog'
import { useMemo } from 'react'
import create from 'zustand'
import RegisterSuccess from './DialogPreset/RegisterSuccess'

export type DialogPreset = 'register-success'
export const useAlertDialogState = createStateStore<DialogPreset | null>(null)

export default function AlertDialogFeedback() {
  const [preset, setPreset] = useAlertDialogState()
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
