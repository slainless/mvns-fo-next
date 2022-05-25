import { Box } from '@Components/Box'
import { Image } from '@Components/Image'
import { Alert } from '@Components/Alert'
import { Text } from '@Components/Text'
import { Flex } from '@Components/Flex'
import { Grid } from '@Components/Grid'
import { Heading } from '@Components/Heading'
import { Button } from '@Components/Button'
import { styled } from '@Theme'
import { BubbleText } from '@Components/BubbleText'

const StyledButton = styled(Button, {
  mb: '$2',
  width: '$tw_48',
  defaultVariants: {
    size: '3',
  },
})

export default function Empty(props) {
  return (
    <Alert
      css={{
        display: 'grid',
        flexDirection: 'column',
        height: '28rem',
        gridTemplateColumns: `60% 40%`,
      }}
    >
      <Flex
        direction="column"
        align="start"
        justify="center"
        css={{
          p: '$6',
        }}
      >
        <Heading
          size="4"
          color="red"
          css={{
            mb: '$3',
          }}
        >
          You have no class yet.
        </Heading>
        <Text size="5" css={{ mb: '$6' }}>
          Explore our classes and start learning!
        </Text>
        <StyledButton variant="red">See All Classes</StyledButton>
        {/* <StyledButton variant="green">Trending Classes</StyledButton>
        <StyledButton variant="blue">Relevant Classes</StyledButton> */}
      </Flex>
      <Flex
        direction="column"
        justify="end"
        align="end"
        css={{
          height: '100%',
          transform: 'translate($space$3, $space$3)',
          px: '$6',
        }}
      >
        <BubbleText
          color="yellow"
          size="6"
          css={{
            mb: '$6',
            alignSelf: 'center',
          }}
        >
          What are you waiting for?
        </BubbleText>
        <Image
          css={{
            width: '$tw_96',
          }}
          src="/media/sparks/happywithcat.png"
        />
      </Flex>
    </Alert>
  )
}
