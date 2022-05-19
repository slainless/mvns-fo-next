import { Grid } from '@Components/Grid'
import { Box } from '@Components/Box'
import { Text } from '@Components/Text'
import { Image } from '@Components/Image'
import { AspectRatio } from '@radix-ui/react-aspect-ratio'
import { processProps, ConversionType } from '@Functions/markdown-helper'
import { getChild, getChildByType, getChildrenByType } from 'react-nanny'

type Props = {
  members?: {
    imgSrc: string
    name: string
    role: string
  }[]
}
export function Team(props: Props) {
  const { members } = props
  return (
    <Grid
      columns={3}
      css={{
        gap: '$7',
      }}
    >
      {members?.map((member, i) => (
        <Box key={i}>
          <AspectRatio ratio={0.8}>
            <Image
              css={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
              src={member.imgSrc}
            />
          </AspectRatio>
          <Text css={{ mt: '$5', fontSet: '$xl', fontWeight: '$bold' }}>
            {member.name}
          </Text>
          <Text css={{ fontStyle: 'italic', pr: '$5' }}>{member.role}</Text>
        </Box>
      ))}
    </Grid>
  )
}

export const toTeam: ConversionType<Props> = (_) => (props) => {
  const figures = getChildrenByType(props.children, ['figure'])
  const members = figures.map((fig) => {
    const img = getChildByType(fig['props']?.children, ['img'])
    const caption = getChildByType(fig['props']?.children, ['figcaption'])
    const name = getChild(
      caption['props']?.children,
      (child) => child?.['props']?.['as'] === 'name'
    )
    const position = getChild(
      caption['props']?.children,
      (child) => child?.['props']?.['as'] === 'position'
    )

    return {
      imgSrc: processProps(img['props'])?.src,
      name: processProps(name?.['props'])?.children,
      role: processProps(position?.['props'])?.children,
    }
  })
  return <Team members={members}></Team>
}
