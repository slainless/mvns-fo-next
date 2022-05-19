import { ReactNode } from 'react'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from '@Components/Dialog'
import { FilterButtons } from './Base'
import { Grid } from '@Components/Grid'
import getConfig from 'next/config'
import { Label } from '@Components/Label'
import { Card } from '@Components/Card'
import { Heading } from '@Components/Heading'
import { Text } from '@Components/Text'
import { Box } from '@Components/Box'
import { Checkbox } from '@Components/Checkbox'
import { styled } from '@Theme'

const { publicRuntimeConfig } = getConfig() as MyNextConfig
const { categories } = publicRuntimeConfig

export default function Category(props: { children: ReactNode }): JSX.Element
export default function Category(props: { trigger: ReactNode }): JSX.Element
export default function Category(props: {
  children?: ReactNode
  trigger?: ReactNode
}) {
  const { trigger, children } = props
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger || children}</DialogTrigger>
      <DialogContent>
        <DialogTitle asChild>
          <Heading
            size="1"
            css={{
              mb: '$4',
              textAlign: 'center',
            }}
          >
            Category Selection
          </Heading>
        </DialogTitle>
        <Box
          css={{
            position: 'relative',
            '&::before': {
              content: '',
              display: 'block',
              position: 'absolute',
              width: '100%',
              height: '$6',
              top: 0,
              left: 0,
              backgroundImage:
                'linear-gradient(to bottom, $panel, transparent)',
            },
            '&::after': {
              content: '',
              display: 'block',
              position: 'absolute',
              width: '100%',
              height: '$6',
              bottom: 0,
              left: 0,
              backgroundImage: 'linear-gradient(to top, $panel, transparent)',
            },
          }}
        >
          <Grid
            columns={3}
            css={{
              gap: '$4',
              p: '$4',
              overflowY: 'auto',
              maxHeight: '$tw_96',
            }}
          >
            {categories.map((category, i) => (
              <Label
                key={i}
                css={{
                  display: 'flex',
                  jc: 'space-between',
                  columnGap: '$6',
                  boxShadow: 'inset 0 0 0 1px $colors$slate6',
                  rounded: '$3',
                  ai: 'center',
                  p: '$2',
                }}
              >
                <Text
                  css={{
                    fontSet: '$sm',
                  }}
                >
                  {category.name}
                </Text>
                <Checkbox
                  css={{
                    flexShrink: 0,
                  }}
                  size="1"
                />
              </Label>
            ))}
          </Grid>
        </Box>
        <FilterButtons />
      </DialogContent>
    </Dialog>
  )
}
