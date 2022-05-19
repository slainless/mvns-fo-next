import { TitledSection } from '@Components/TitledSection'
import { ReactNode } from 'react'
import { Grid } from '@Components/Grid'
import { Card } from '@Components/Card'
import { Icon } from '@Components/Icon'
import { Heading } from '@Components/Heading'
import { Text } from '@Components/Text'
import { FiShare2, FiBookOpen, FiBook, FiDollarSign } from 'react-icons/fi'
import { getSlot } from '@Functions/children'
import Slot from '@Components/Slot'

export function Reason(
  props: ReactProps<typeof Card> & {
    title: ReactNode
  }
) {
  const { title, children, ...rest } = props
  const slots = getSlot(children, 'pre-heading', 'pre-content', 'post-content')
  return (
    <Card
      css={{
        p: '$5',
      }}
    >
      {slots['pre-content']}
      <Heading
        as="h3"
        size="1"
        css={{
          mb: '$2',
        }}
      >
        {slots['pre-heading']}
        {title}
      </Heading>
      <Text css={{ color: '$slate11', lineHeight: '$5' }}>
        {slots[getSlot.rest]}
      </Text>
      {slots['post-content']}
    </Card>
  )
}

export default function Reasons() {
  return (
    <TitledSection
      title="More reasons to join Mavensdotlive"
      headingProps={{
        size: '2',
        css: {
          mb: '$5',
          mx: 'auto',
        },
      }}
    >
      <Grid
        columns={3}
        css={{
          maxWidth: '$4xl',
          mx: 'auto',
          columnGap: '$5',
        }}
      >
        <Reason title="Reach More">
          <Slot name="pre-heading">
            <Icon thin={false} css={{ mr: '$2' }}>
              <FiShare2 />
            </Icon>
          </Slot>
          Within a short amount of time, we have established strategic
          relationships with recognized partners
        </Reason>
        <Reason title="Teach More">
          <Slot name="pre-heading">
            <Icon thin={false} css={{ mr: '$2' }}>
              <FiBook />
            </Icon>
          </Slot>
          Through Mavensdotlive’s network, we connect the dots for instructors
          to collaborate with others and co-create demand-driven classes.
        </Reason>
        <Reason title="Earn More">
          <Slot name="pre-heading">
            <Icon thin={false} css={{ mr: '$2' }}>
              <FiDollarSign />
            </Icon>
          </Slot>
          Mavensdotlive accommodates all types of instructors - you are even
          able to create passive income.
        </Reason>
      </Grid>
    </TitledSection>
  )
}
