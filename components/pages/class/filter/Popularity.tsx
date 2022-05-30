import { Box } from '@Components/Box'
import { Flex } from '@Components/Flex'
import { Checkbox } from '@Components/Checkbox'
import { Label } from '@Components/Label'
import { Popover, PopoverClose, PopoverTrigger } from '@Components/Popover'
import { PopoverContent, FilterButtons, Action } from './Base'
import { styled } from '@Theme'
import { ReactNode, useEffect } from 'react'
import { Button } from '@Components/Button'
import { Cross1Icon, Cross2Icon } from '@radix-ui/react-icons'
import { IconButton } from '@Components/IconButton'
import { useFilterStore } from '@Pages/class/filter/use-filter-store'
import { useSelections } from 'ahooks'
import { CourseQuery, CourseType } from '@Models/course'
import { isEqual } from 'lodash-es'

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
  const state = useFilterStore((state) => state.state)
  const setPopularity = useFilterStore((state) => state.setPopularity)
  const { selected, isSelected, setSelected, toggle } = useSelections(
    Object.values(CourseQuery),
    state?.popularity ?? []
  )

  useEffect(() => {
    setSelected(state?.popularity)
  }, [state])

  return (
    <Popover
      onOpenChange={(o) => {
        if (!o) setSelected(state?.popularity ?? [])
        return o
      }}
    >
      <PopoverTrigger asChild>{trigger || children}</PopoverTrigger>
      <PopoverContent>
        <FieldSet>
          <Checkbox
            checked={isSelected(CourseQuery.NEWEST)}
            onCheckedChange={() => toggle(CourseQuery.NEWEST)}
            id="newest"
          />
          <Label htmlFor="newest">Newest</Label>
        </FieldSet>
        <FieldSet>
          <Checkbox
            checked={isSelected(CourseQuery.HIGHEST_RATED)}
            onCheckedChange={() => toggle(CourseQuery.HIGHEST_RATED)}
            id="highest_rated"
          />
          <Label htmlFor="highest_rated">Highest Rated</Label>
        </FieldSet>
        <FieldSet>
          <Checkbox
            checked={isSelected(CourseQuery.MOST_POPULAR)}
            onCheckedChange={() => toggle(CourseQuery.MOST_POPULAR)}
            id="most_popular"
          />
          <Label htmlFor="most_popular">Most Popular</Label>
        </FieldSet>
        <FieldSet>
          <Checkbox
            checked={isSelected(CourseQuery.TRENDING)}
            onCheckedChange={() => toggle(CourseQuery.TRENDING)}
            id="trending"
          />
          <Label htmlFor="trending">Trending</Label>
        </FieldSet>
        <Action.Root>
          <Action.Reset
            onClick={() => {
              setSelected([])
            }}
          />
          <Action.Apply
            disabled={isEqual(state?.popularity ?? [], selected)}
            onClick={() => {
              setPopularity(selected)
            }}
          />
        </Action.Root>
      </PopoverContent>
    </Popover>
  )
}
