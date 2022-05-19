import { Box } from '@Components/Box'
import { Button } from '@Components/Button'
import { Icon } from '@Components/Icon'
import { ColoredGoogle, LinkedIn } from '../Brand'

export default function ThirdPartyLogins<Base extends string>(props: {
  template: `${Base}\$PROVIDER\$`
}) {
  const { template } = props
  const make = <T extends string>(provider: T): `${Base}${T}` =>
    template.replace(/\$PROVIDER\$$/, provider) as any
  return (
    <Box>
      <Button
        as="a"
        size="3"
        css={{
          width: '100%',
          mb: '$2',
        }}
        variant="red"
      >
        <Icon
          css={{
            mr: '$2',
          }}
        >
          <ColoredGoogle />
        </Icon>{' '}
        {make('Google')}
      </Button>
      <Button
        as="a"
        size="3"
        css={{
          width: '100%',
        }}
        variant="blue"
      >
        <Icon
          css={{
            fill: '$indigoA10',
            mr: '$2',
          }}
        >
          <LinkedIn />
        </Icon>{' '}
        {make('LinkedIn')}
      </Button>
    </Box>
  )
}
