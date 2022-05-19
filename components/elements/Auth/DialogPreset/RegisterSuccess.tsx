import { Box } from '@Components/Box'
import { Button } from '@Components/Button'
import { Flex } from '@Components/Flex'
import { Text } from '@Components/Text'
import { Heading } from '@Components/Heading'
import {
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
} from '@Components/AlertDialog'
import { FiCheckCircle } from 'react-icons/fi'
import { useRegisterControl } from '../control'

export default function RegisterSuccess() {
  const { close } = useRegisterControl()
  return (
    <Flex
      css={{
        gap: '$4',
      }}
    >
      <Flex
        css={{
          ai: 'center',
          '& svg': {
            stroke: '$green11',
            width: '$7',
            height: '$7',
            '& path': {
              strokeWidth: '1',
            },
          },
        }}
      >
        <FiCheckCircle />
      </Flex>
      <Box>
        <AlertDialogTitle asChild>
          <Heading variant="green">Registration Success</Heading>
        </AlertDialogTitle>
        <AlertDialogDescription asChild>
          <Text css={{ mt: '$2' }}>
            We have sent you email to validate your registration.
          </Text>
        </AlertDialogDescription>
      </Box>

      <Flex css={{ ai: 'center' }}>
        <AlertDialogAction asChild>
          <Button
            size="2"
            variant="green"
            onClick={() => {
              close()
            }}
          >
            OK
          </Button>
        </AlertDialogAction>
      </Flex>
    </Flex>
  )
}
