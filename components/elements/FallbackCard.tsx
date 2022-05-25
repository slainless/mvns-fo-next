import { ReactNode } from 'react'
import GeneralError from './FallbackCard/Error'

export class EmptyError extends Error {}
export type Fallback = EmptyError | Error

export default function FallbackCard(props: {
  children: ReactNode
  error?: Error | null | false
}) {
  const { error, children } = props
  if (error == null || error === false) return <>{children}</>
  return <GeneralError error={error} />
}
