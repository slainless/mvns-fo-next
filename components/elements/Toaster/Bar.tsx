import { Box } from '@Components/Box'
import { Flex } from '@Components/Flex'
import { Text } from '@Components/Text'
import { Toast, ToastIcon } from 'react-hot-toast'

export function Bar(props: Toast) {
  return (
    <Box
      css={{
        pointerEvents: 'auto',
        rounded: '$2',
        // bc: '$hiContrast',
        bc: '$invertColorSchemeA5',
        backdropFilter: 'blur(5px)',
        // boxShadow: 'inset 0 0 0 1px $colors$invertColorSchemeA7',
        p: '2px',
      }}
    >
      <Flex
        css={{
          ai: 'center',
          rounded: '$2',
          bc: '$colorSchemeA12',
          p: '$2',
          gap: '$3',
        }}
      >
        {props.type === 'custom' ? (
          resolveValue(toast.message, props)
        ) : (
          <>
            <ToastIcon toast={props} />
            <Text>{props.message}</Text>
          </>
        )}
      </Flex>
    </Box>
  )
}
