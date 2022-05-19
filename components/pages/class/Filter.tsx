import { styled } from '@Theme'
import { Flex } from '@Components/Flex'
import { Button } from '@Components/Button'
import ClassType from './filter/ClassType'
import Pricing from './filter/Pricing'
import Popularity from './filter/Popularity'
import Category from './filter/Category'
import Date from './filter/Date'

const PillButton = styled(Button, {
  borderRadius: '$full !important',
  defaultVariants: {
    size: 2,
  },
})

export default function Filter() {
  return (
    <Flex
      css={{
        gap: '$2',
        mb: '$4',
      }}
    >
      <ClassType>
        <PillButton>Class Type</PillButton>
      </ClassType>
      <Popularity>
        <PillButton>Popularity</PillButton>
      </Popularity>
      <Pricing>
        <PillButton>Pricing</PillButton>
      </Pricing>
      <Category>
        <PillButton>Category</PillButton>
      </Category>
      <Date>
        <PillButton>Class Date</PillButton>
      </Date>
    </Flex>
  )
}
