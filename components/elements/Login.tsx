import {
  // Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogOverlay,
} from '@Components/Dialog'
import * as Dialog from '@radix-ui/react-dialog'
import { Heading } from '@Components/Heading'
import { ReactNode } from 'react'
import Alert from './Auth/Alert'
import Form from './Auth/LoginForm'
import ThirdPartyLogins from './Auth/3rdPartyLogin'
import Separator from './Auth/Separator'
import { useLoginControl } from './Auth/control'

export default function Login(props: { children: ReactNode }): JSX.Element
export default function Login(props: { trigger: ReactNode }): JSX.Element
export default function Login(props: {
  children?: ReactNode
  trigger?: ReactNode
}) {
  const { state, setState } = useLoginControl()
  const { trigger, children } = props
  return (
    <Dialog.Root open={state} onOpenChange={setState}>
      <DialogTrigger asChild>{trigger || children}</DialogTrigger>
      <Dialog.Portal>
        <DialogOverlay
          css={{
            py: '$9',
            overflowY: 'auto',
            backgroundColor: '$blackA11',
          }}
        >
          <DialogContent
            css={{
              width: '$sm',
              maxHeight: 'none',
              position: 'static',
              transform: 'none',
              mx: 'auto',
              p: '$6',
            }}
          >
            <DialogTitle asChild>
              <Heading
                size="3"
                css={{
                  mb: '$4',
                  textAlign: 'center',
                }}
              >
                Login
              </Heading>
            </DialogTitle>
            <Alert />
            <Form />
            <Separator />
            <ThirdPartyLogins template="Sign In with $PROVIDER$" />
          </DialogContent>
        </DialogOverlay>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
