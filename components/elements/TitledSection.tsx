import { Box } from '@Components/Box'
import { Heading } from '@Components/Heading'
import { NextLink } from '@Components/Link'
import { Section } from '@Components/Section'
import { isEmpty } from 'lodash-es'
import { CSS } from '@Theme'

type Props = ReactProps<typeof Section> & {
  title?: string
  hotlink?: {
    display: string
    href: string
  }
  css?: CSS

  headingProps?: ReactProps<typeof Heading>
}
export function TitledSection(props: Props) {
  const { title, hotlink, children, headingProps, ...rest } = props
  return (
    <Section size="3" {...rest}>
      <Box css={{ mb: '$4', display: 'flex', ai: 'center' }}>
        {!isEmpty(title) && (
          <Heading
            size="3"
            css={{
              mr: '$5',
            }}
            {...headingProps}
          >
            {title}
          </Heading>
        )}
        {!isEmpty(hotlink) && (
          <NextLink
            href={hotlink?.href}
            css={{
              color: '$slate11',
              fontSet: '$sm',
            }}
          >
            {hotlink?.display}
          </NextLink>
        )}
      </Box>
      <Box>{children}</Box>
    </Section>
  )
}
