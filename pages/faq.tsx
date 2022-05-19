import type { GetStaticProps, NextPage } from 'next'
import DocumentView from '@Components/DocumentView'
import Markdown from 'react-markdown'
import { generateId, getDocumentStyle } from '@Functions/dom-helper'
import rehypeRaw from 'rehype-raw'
import {
  toAccordionItem,
  toAccordionRoot,
  toLink,
  makeTagDict,
} from '@Functions/markdown-helper'
import { StaticTasks, Task } from '@Functions/static-task'

type Props = {
  document?: string
}
export const getStaticProps = StaticTasks<Props>({
  document: Task.readTextFile('./pages/document/faq.md'),
})

const Page: NextPage = (props: Props) => {
  const { document: doc } = props
  const documentMargin = `-${
    getDocumentStyle('scrollPaddingTop') ?? '0px'
  } 0px 0px 0px`
  return (
    <>
      <DocumentView
        title="Frequently Asked Questions"
        headingProps={{
          css: {
            mx: 'auto',
            mb: '$6',
          },
        }}
        options={{
          margin: documentMargin,
        }}
        onHeadingsLoad={(h) => h.forEach(generateId.fromContent)}
      >
        <Markdown
          rehypePlugins={[rehypeRaw]}
          components={makeTagDict(
            {
              extend: {
                a: toLink,
                details: toAccordionItem,
              },
            },
            {
              a: {
                variant: 'blue',
              },
            }
          )}
        >
          {doc ?? ''}
        </Markdown>
      </DocumentView>
    </>
  )
}

export default Page
