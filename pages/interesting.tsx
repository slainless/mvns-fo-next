import type { NextPage } from 'next'
import { TitledSection } from '@Components/TitledSection'
import { Card } from '@Components/Card'
import { Text } from '@Components/Text'
import { Box } from '@Components/Box'
import { Grid } from '@Components/Grid'
import { Flex } from '@Components/Flex'
import { Button } from '@Components/Button'
import { Checkbox } from '@Components/Checkbox'
import Config from '@Config'
import { useRequest, useSelections } from 'ahooks'
import { InterestAPI } from '@Methods/interest'
import { FormEvent, useEffect } from 'react'
import { InterestResponse } from '@Models/interest'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import { useAuthUserStore } from '@Methods/auth'
import shallow from 'zustand/shallow'

const Page: NextPage = () => {
  const { categories } = Config
  const router = useRouter()
  const { user, setInterest } = useAuthUserStore(
    (state) => ({
      user: state.setUser,
      setInterest: state.setInterest,
    }),
    shallow
  )
  const { selected, isSelected, toggle } = useSelections(categories)
  const { data, error, loading, run } = useRequest(InterestAPI.set, {
    manual: true,
  })
  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    run(selected.map((v) => +v.id))
  }

  useEffect(() => {
    if (data == null) return
    if (error) return void toast.error(error.message)
    if (!(data?.data instanceof InterestResponse.Add))
      return void toast.error(data?.data?.message ?? '')

    setInterest(data.data.data)
    toast.success(`Categories preferences saved`)
    router.push('/my/interesting')
  }, [data, error])

  return (
    <TitledSection
      title="What topics do you find interesting?"
      headingProps={{
        css: {
          mx: 'auto',
          mb: '$6',
        },
      }}
    >
      <form style={{ display: 'contents ' }} onSubmit={onSubmit}>
        <Grid
          columns={3}
          css={{
            columnGap: '$6',
            rowGap: '$4',
            px: '$9',
            mb: '$6',
          }}
        >
          {categories.map((category, i) => (
            <Card
              as="label"
              key={i}
              css={{
                display: 'flex',
                jc: 'space-between',
                columnGap: '$6',
                ai: 'center',
                py: '$6',
                px: '$6',
                ff: '$spaceGrotesk',
              }}
            >
              <Text
                css={{
                  fontSet: '$md',
                }}
              >
                {category.keyword}
              </Text>
              <Checkbox
                size="1"
                checked={isSelected(category)}
                onCheckedChange={() => toggle(category)}
              />
            </Card>
          ))}
        </Grid>
        <Flex
          css={{
            // position: 'sticky',
            // bottom: 0,
            maxWidth: 'max-content',
            mx: 'auto',
            // p: '$3',
            jc: 'center',
          }}
        >
          <Button
            variant="red"
            size="3"
            css={{
              boxShadow: 'inset 0 0 0 1px $colors$slate7, $shadows$lg',
            }}
            type="submit"
          >
            Save
          </Button>
        </Flex>
      </form>
    </TitledSection>
  )
}

export default Page
