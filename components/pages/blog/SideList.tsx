import Card, { ArticleCardData } from './Card'
import { Grid } from '@Components/Grid'
import { Heading } from '@Components/Heading'
import { Flex } from '@Components/Flex'
import { merge } from 'lodash-es'
import { Separator as PrimitiveSeparator } from '@radix-ui/react-separator'
import { styled } from '@Theme'

const Separator = styled(PrimitiveSeparator)
export default function SideList(
  props: ReactProps<typeof Flex> & { articles: ArticleCardData[] }
) {
  const { articles, ...rest } = props
  return (
    <Flex
      {...merge(
        {
          css: {
            // gridAutoRows: '24rem',
            flexDirection: 'column',
            gap: '$2',
          },
        },
        rest
      )}
    >
      <Heading>Top Blogs</Heading>
      <Separator
        css={{
          width: '100%',
          height: '1px',
          backgroundColor: '$invertColorSchemeA5',
          mb: '$2',
        }}
      />
      {articles?.slice(0, 3).map((item, i) => (
        <Card
          key={i}
          {...item}
          variant="ghost"
          imgRatio={1}
          css={{
            overflow: 'initial',
            display: 'grid',
            gridTemplateColumns: '6rem auto',
            '& .card-content': {
              py: '$2',
              pl: '$2',
            },
            '& .card-summary': {
              display: 'none',
            },
            '& .card-img-ar': {
              p: '$2',
              '& img': {
                rounded: '$3',
              },
            },
            '& .card-img-container': {
              display: 'flex',
              ai: 'center',
              jc: 'centerjnmmmmmmmmmmmmmmmmmmmmmfg3b5h,',
            },
          }}
          badgeProps={{
            css: {
              mb: '$1',
            },
          }}
          headingProps={{
            css: {
              border: 'none',
              mb: '$1',
              pb: 0,
            },
          }}
        />
      ))}
    </Flex>
  )
}
