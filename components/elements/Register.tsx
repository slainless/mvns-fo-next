import {
  // Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogOverlay,
} from '@Components/Dialog'
import * as Dialog from '@radix-ui/react-dialog'
import { Heading } from '@Components/Heading'
import { Text } from '@Components/Text'
import { ReactNode } from 'react'
import Alert from './Auth/Alert'
import Separator from './Auth/Separator'
import Form from './Auth/RegisterForm'
import ThirdPartyLogins from './Auth/3rdPartyLogin'
import AlertDialogFeedback from './Auth/AlertDialog'
import { useRegisterControl } from './Auth/control'

export default function Register(props: { children: ReactNode }): JSX.Element
export default function Register(props: { trigger: ReactNode }): JSX.Element
export default function Register(props: {
  children?: ReactNode
  trigger?: ReactNode
}) {
  const { state, setState } = useRegisterControl()
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
                Register
              </Heading>
            </DialogTitle>
            <Alert />
            <Form />
            <Separator />
            <ThirdPartyLogins template="Sign In with $PROVIDER$" />
            <Text
              size="1"
              css={{
                textAlign: 'center',
                mt: '$2',
              }}
            >
              By signing up, you agree to our communications and usage terms
            </Text>
          </DialogContent>
        </DialogOverlay>
        <AlertDialogFeedback />
      </Dialog.Portal>
    </Dialog.Root>
  )
}
