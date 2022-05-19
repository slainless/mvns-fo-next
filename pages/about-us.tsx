import type { NextPage } from 'next'
import Markdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import { Prose } from '@Components/Prose'
import { StaticTasks, Task } from '@Functions/static-task'
import { toLink, makeTagDict } from '@Functions/markdown-helper'
import DocumentView from '@Components/DocumentView'
import Hero from '@Pages/about/Hero'
import { generateId, getDocumentStyle } from '@Functions/dom-helper'
import { toTeam } from '@Pages/about/Team'

type Props = {
  document?: string
}
export const getStaticProps = StaticTasks<Props>({
  document: Task.readTextFile('./pages/document/about-us.md'),
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
        <Prose>
          <Markdown
            rehypePlugins={[rehypeRaw]}
            components={makeTagDict({
              watchAsFrom: ['a', 'div', 'section'],
              extend: {
                a: toLink,
                'x-team': toTeam,
              },
            })}
          >
            {doc ?? ''}
          </Markdown>
        </Prose>
      </DocumentView>
    </>
  )
}

export default Page
