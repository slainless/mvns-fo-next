import type { NextPage } from 'next'
import { TitledSection } from '@Components/TitledSection'
import { Flex } from '@Components/Flex'
import { Text } from '@Components/Text'
import Markdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import { Prose } from '@Components/Prose'
import { StaticTasks, Task } from '@Functions/static-task'
import { makeTagDict, toLink } from '@Functions/markdown-helper'

type Props = {
  document?: string
}
export const getStaticProps = StaticTasks<Props>({
  document: Task.readTextFile('./pages/document/contact.md'),
})

// const XLink = (props: any) => <Link type="decorative" variant="blue"
const xLink = toLink({
  type: 'decorative',
  variant: 'red',
})
const Page: NextPage = (props: Props) => {
  const { document: doc } = props
  return (
    <TitledSection
      title="Contact Us"
      css={{
        '& > :first-child': {
          mb: 0,
        },
      }}
    >
      <Text
        size="5"
        css={{
          mb: '$9',
        }}
      >
        We are here to help!
      </Text>
      {/* <Section title="Phone Support Hours">
        <Text>Monday - </Text>
      </Section> */}
      <Prose
        css={{
          '& p': {
            color: '$slate11',
          },
        }}
      >
        <Markdown
          rehypePlugins={[rehypeRaw]}
          components={makeTagDict({
            watchAsFrom: ['a'],
            extend: {
              a: () => xLink,
              'x-link': () => xLink,
            },
          })}
        >
          {doc ?? ''}
        </Markdown>
      </Prose>
    </TitledSection>
  )
}

export default Page
