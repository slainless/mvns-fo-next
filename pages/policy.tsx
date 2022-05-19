import type { NextPage } from 'next'
import Markdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import { toLink } from '@Functions/markdown-helper'
import { TitledSection } from '@Components/TitledSection'
import { Text } from '@Components/Text'
import { Prose } from '@Components/Prose'
import { StaticTasks, Task } from '@Functions/static-task'
import { makeTagDict } from '@Functions/markdown-helper'

type Props = {
  document?: string
}
export const getStaticProps = StaticTasks<Props>({
  document: Task.readTextFile('./pages/document/privacy.md'),
})

const Page: NextPage = (props: Props) => {
  const { document: doc } = props
  return (
    <>
      <TitledSection
        title="Privacy and Policy"
        css={{
          rtmv: true,
          '& > :first-child': {
            mb: 0,
          },
        }}
      >
        <Text css={{ mb: '$6' }}>Last updated on January 20, 2022</Text>
        <Prose>
          <Markdown
            rehypePlugins={[rehypeRaw]}
            components={makeTagDict(
              {
                watchAsFrom: ['a'],
                extend: {
                  a: toLink,
                },
              },
              {
                'x-card': {
                  css: {
                    p: '$6',
                    mb: '$3',
                    rtmv: true,
                  },
                },
              }
            )}
          >
            {doc ?? ''}
          </Markdown>
        </Prose>
      </TitledSection>
    </>
  )
}

export default Page
