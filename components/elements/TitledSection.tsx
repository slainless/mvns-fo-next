import { Box } from '@Components/Box'
import { Heading } from '@Components/Heading'
import { Link } from '@Components/Link'
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
}
export function TitledSection(props: Props) {
  const { title, hotlink, children, ...rest } = props
  return (
    <Section size="3" {...rest}>
      <Box css={{ mb: '$4', display: 'flex', ai: 'center' }}>
        {!isEmpty(title) && (
          <Heading
            size="3"
            css={{
              mr: '$5',
            }}
          >
            {title}
          </Heading>
        )}
        {!isEmpty(hotlink) && (
          <Link
            href={hotlink?.href}
            css={{
              color: '$slate11',
              fontSet: '$sm',
            }}
          >
            {hotlink?.display}
          </Link>
        )}
      </Box>
      <Box>{children}</Box>
    </Section>
  )
}
