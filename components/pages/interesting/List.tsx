import { Flex } from '@Components/Flex'
import { Badge } from '@Components/Badge'
import { Category } from '@Models/category'

export default function List(props: { categories: Category[] }) {
  const { categories } = props
  return (
    <Flex
      css={{
        gap: '$2',
        mb: '$4',
      }}
    >
      {categories.map((category, i) => (
        <Badge
          key={i}
          size="3"
          variant="red"
          css={{
            rounded: '$full',
          }}
        >
          {category.keyword}
        </Badge>
      ))}
    </Flex>
  )
}
