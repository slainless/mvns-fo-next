import { Alert } from '@Components/Alert'
import { Button } from '@Components/Button'
import { Text } from '@Components/Text'
import { createStateStore } from '@Functions/use-store'
import { Cross2Icon } from '@radix-ui/react-icons'
import create from 'zustand'
import shallow from 'zustand/shallow'

export type AlertState = {
  heading: string
  text: string
  variant: 'red'
} | null

export const useAlertStore = createStateStore<AlertState>(null)
export default function AlertFeedback() {
  const { state, set } = useAlertStore(
    (state) => ({
      state: state.state,
      set: state.set,
    }),
    shallow
  )

  if (state == null) return null
  const { variant, heading, text } = state
  return (
    <Alert
      variant={variant}
      css={{
        mb: '$4',
        position: 'relative',
      }}
    >
      <Text
        size="3"
        variant={variant}
        css={{
          mb: '$1',
          fontWeight: '$bold',
        }}
      >
        {heading}
      </Text>
      <Text size="2" variant={variant}>
        {text}
      </Text>
      <Button
        variant="red"
        css={{
          rounded: '$full',
          px: 0,
          width: '$5',
          height: '$5',
          position: 'absolute',
          top: '$1',
          right: '$1',
          transformOrigin: 'top right',
          transform: 'scale(0.7)',
        }}
        size="1"
        type="button"
        onClick={() => set(null)}
      >
        <Cross2Icon />
      </Button>
    </Alert>
  )
}
