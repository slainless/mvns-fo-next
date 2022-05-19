import { Box } from '@Components/Box'
import { Flex } from '@Components/Flex'
import { Checkbox } from '@Components/Checkbox'
import { Label } from '@Components/Label'
import { Popover, PopoverClose, PopoverTrigger } from '@Components/Popover'
import { PopoverContent, FilterButtons } from './Base'
import { styled } from '@Theme'
import { ReactNode } from 'react'
import { Button } from '@Components/Button'
import { Cross1Icon, Cross2Icon } from '@radix-ui/react-icons'
import { IconButton } from '@Components/IconButton'

const FieldSet = styled(Flex, {
  mt: '$2',
  [`& > ${Label}`]: {
    ml: '$2',
  },
})
export default function Popularity(props: { children: ReactNode }): JSX.Element
export default function Popularity(props: { trigger: ReactNode }): JSX.Element
export default function Popularity(props: {
  children?: ReactNode
  trigger?: ReactNode
}) {
  const { children, trigger } = props

  return (
    <Popover>
      <PopoverTrigger asChild>{trigger || children}</PopoverTrigger>
      <PopoverContent>
        <FieldSet>
          <Checkbox name="popularity[]" value="newest" id="newest" />
          <Label htmlFor="newest">Newest</Label>
        </FieldSet>
        <FieldSet>
          <Checkbox
            name="popularity[]"
            value="highest_rated"
            id="highest_rated"
          />
          <Label htmlFor="highest_rated">Highest Rated</Label>
        </FieldSet>
        <FieldSet>
          <Checkbox
            name="popularity[]"
            value="most_popular"
            id="most_popular"
          />
          <Label htmlFor="most_popular">Most Popular</Label>
        </FieldSet>
        <FieldSet>
          <Checkbox name="popularity[]" value="trending" id="trending" />
          <Label htmlFor="trending">Trending</Label>
        </FieldSet>
        <FilterButtons />
      </PopoverContent>
    </Popover>
  )
}
