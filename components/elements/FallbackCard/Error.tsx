import { Box } from '@Components/Box'
import { Image } from '@Components/Image'
import { Alert } from '@Components/Alert'
import { Text } from '@Components/Text'

export default function ErrorPreset(props: { error: Error }) {
  const { error } = props
  return (
    <Alert
      css={{
        display: 'flex',
        flexDirection: 'column',
        height: '24rem',
        ai: 'center',
        jc: 'center',
      }}
    >
      {/* <Image
        css={{
          height: '14rem',
          width: 'auto',
        }}
        src="/media/sparks/wondering.png"
      ></Image> */}
      <Alert
        variant={error ? 'red' : 'gray'}
        css={{
          p: '$5',
        }}
      >
        <Text
          size="5"
          color="red"
          css={{
            fontWeight: '$bold',
            mb: '$1',
          }}
        >
          Sorry, we are facing an error with message:
        </Text>
        <Text size="4" color="red">
          {error?.message}
        </Text>
      </Alert>
    </Alert>
  )
}
