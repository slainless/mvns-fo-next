import ErrorPreset from './FallbackCard/Error'

export class EmptyError extends Error {}
export type Fallback = EmptyError | Error

export default function FallbackCard(props: { error: Fallback }) {
  const { error } = props

  if (error instanceof EmptyError) {
    return <></>
  }
  return <ErrorPreset error={error} />
}
