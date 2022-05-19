import { UserAPI } from '@Methods/user'
import { APIResponse } from '@Models/response'
import { AuthUserResponse } from '@Models/user'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useAlertState } from './Alert'
import { useAlertDialogState } from './AlertDialog'
import { useLoginControl } from './control'

type ResponseType =
  | Awaited<ReturnType<typeof UserAPI.login>>
  | Awaited<ReturnType<typeof UserAPI.register>>
export default function useRequestHandler(
  requestResult?: ResponseType,
  error?: Error
) {
  const [alert, setAlert] = useAlertState()
  const [alertDialog, setAlertDialog] = useAlertDialogState()
  const { close } = useLoginControl()

  useEffect(() => {
    setAlert(null)
    setAlertDialog(null)
    return () => {
      setAlert(null)
      setAlertDialog(null)
    }
  }, [])

  useEffect(() => {
    if (requestResult == null && error == null) return
    if (requestResult) {
      const { data } = requestResult

      if (data instanceof AuthUserResponse.Register)
        return void setAlertDialog('register-success')

      if (data instanceof AuthUserResponse.Login) {
        close()
        return void toast(`Logged in`, {
          icon: '👋',
        })
      }

      if (data instanceof APIResponse.Unauthorized)
        return void setAlert({
          heading: 'Invalid credential',
          text: 'Either the email address or password is wrong',
          variant: 'red',
        })

      if (data instanceof APIResponse.InternalError)
        return void setAlert({
          heading: 'Server error',
          text: `Sorry! It's not your fault, there is something wrong with the server.`,
          variant: 'red',
        })
    }

    if (error) {
      if (error.message == 'Failed to fetch')
        return void setAlert({
          heading: 'Unable to send request',
          text: `Please check your connection. If you are connected, then it's probably an error from the server.`,
          variant: 'red',
        })
    }
  }, [requestResult, error])
}
