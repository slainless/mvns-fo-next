import type { NextPage } from 'next'
import Hero from '@Pages/instructor/Hero'
import Reasons from '@Pages/instructor/Reasons'
import Trusted from '@Pages/instructor/Trusted'
import DocumentView from '@Components/DocumentView'
import Markdown from 'react-markdown'
import { generateId, getDocumentStyle } from '@Functions/dom-helper'
import { StaticTasks, Task } from '@Functions/static-task'
import { toLink, makeTagDict } from '@Functions/markdown-helper'

type Props = {
  document?: string
}
export const getStaticProps = StaticTasks<Props>({
  document: Task.readTextFile('./pages/document/instructor-agreement.md'),
})

const Page: NextPage = (props: Props) => {
  const { document: doc } = props
  const documentMargin = `-${
    getDocumentStyle('scrollPaddingTop') ?? '0px'
  } 0px 0px 0px`
  return (
    <>
      <Hero />
      <Reasons />
      <Trusted />
      <DocumentView
        options={{
          margin: documentMargin,
        }}
        onHeadingsLoad={(h) => h.forEach(generateId.fromContent)}
      >
        <Markdown
          components={makeTagDict({
            watchAsFrom: ['a'],
            extend: {
              a: toLink,
            },
          })}
        >
          {doc ?? ''}
        </Markdown>
      </DocumentView>
    </>
  )
}

export default Page
