import type { NextPage } from 'next'
import Hero from '@Pages/career/Hero'
import DocumentView from '@Components/DocumentView'
import Markdown from 'react-markdown'
import { generateId, getDocumentStyle } from '@Functions/dom-helper'
import { StaticTasks, Task } from '@Functions/static-task'
import { makeTagDict } from '@Functions/markdown-helper'
import rehypeRaw from 'rehype-raw'

type Props = {
  document?: string
}
export const getStaticProps = StaticTasks<Props>({
  document: Task.readTextFile('./pages/document/career.md'),
})

const Page: NextPage = (props: Props) => {
  const { document: doc } = props
  const documentMargin = `-${
    getDocumentStyle('scrollPaddingTop') ?? '0px'
  } 0px 0px 0px`
  return (
    <>
      <Hero />
      <DocumentView
        options={{
          margin: documentMargin,
        }}
        onHeadingsLoad={(h) => h.forEach(generateId.fromContent)}
      >
        <Markdown
          rehypePlugins={[rehypeRaw]}
          components={makeTagDict({
            watchAsFrom: ['a'],
          })}
        >
          {doc ?? ''}
        </Markdown>
      </DocumentView>
    </>
  )
}

export default Page
