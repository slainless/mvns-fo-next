import { Box } from '@Components/Box'
import { Image } from '@Components/Image'
import { Alert } from '@Components/Alert'
import { Heading } from '@Components/Heading'
import { Text } from '@Components/Text'

export default function EmptyFallbackCard(props: {
  data: any
  type: string
  children: ReactNode
}) {
  const { data, children, type } = props
  if (data?.length !== 0) return <>{children}</>
  return (
    <Box
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
      <Alert variant="yellow" css={{ p: '$5' }}>
        <Text size="5" css={{ color: '$yellow11', mb: '$1' }}>
          No result for {type}
        </Text>
        <Text size="4" css={{ color: '$yellow12' }}>
          Maybe try with another keyword?
        </Text>
      </Alert>
    </Box>
  )
}
