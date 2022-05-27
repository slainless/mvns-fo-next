import isBrowser from './is-browser'
import { plainToInstance } from 'class-transformer'
import { AuthUser } from '@Models/user'
import { validateSync } from 'class-validator'

export default function thirdPartyLogin(
  href: string
): Promise<AuthUser> | null {
  if (!isBrowser) return null
  const loginWindow = open(href, undefined, 'popup')
  return new Promise<AuthUser>((res, rej) => {
    function listen(e: MessageEvent<any>) {
      const { origin, data } = e
      if (
        ['https://mavens.upanastudio.com', 'http://localhost'].includes(
          origin
        ) == false
      )
        return

      if (typeof data != 'string') return
      const escaped = (() => {
        const txt = document.createElement('textarea')
        txt.innerHTML = data
        return txt.value
      })()

      try {
        const rawUser = JSON.parse(escaped)
        const user = plainToInstance(AuthUser, rawUser)
        const valResult = validateSync(user)
        if (valResult.length > 0) {
          window.removeEventListener('message', listen)
          return rej(valResult)
        }
        window.removeEventListener('message', listen)
        return res(user)
      } catch (e) {
        return
      }
    }

    window.addEventListener('message', listen)
  }).finally(() => {
    loginWindow?.close()
  })
}
