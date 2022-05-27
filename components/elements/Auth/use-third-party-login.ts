import thirdPartyLogin from '@Functions/third-party-login'
import { useAuthUserStore } from '@Methods/auth'
import { useLoginControl, useRegisterControl } from '@Components/Auth/control'
import { toast } from 'react-hot-toast'

export default function useThirdPartyLogin(href: string) {
  const setUser = useAuthUserStore((state) => state.setUser)
  const { close: closeLogin } = useLoginControl()
  const { close: closeRegister } = useRegisterControl()

  return async () => {
    const req = await thirdPartyLogin(href)!

    setUser(req)
    closeLogin()
    closeRegister()
    toast.success(`Logged in`)
  }
}
