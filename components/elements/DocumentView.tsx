import { Flex } from '@Components/Flex'
import { Box } from '@Components/Box'
import { Text } from '@Components/Text'
import { TitledSection } from './TitledSection'
import {
  ReactNode,
  useEffect,
  useLayoutEffect,
  useState,
  useRef,
  useMemo,
} from 'react'
import { Prose } from '@Components/Prose'
import useTrackElements from '@Functions/use-track-element'
import { assign, isEmpty } from 'lodash-es'
import scrollIntoView from 'smooth-scroll-into-view-if-needed'
// import PerfectScrollbar from 'perfect-scrollbar'
// import 'perfect-scrollbar/css/perfect-scrollbar.css'

type TrackerOptions = Parameters<typeof useTrackElements>[1]
type Props = ReactProps<typeof TitledSection> & {
  title?: string
  options?: TrackerOptions & {
    query?: string
  }
  onHeadingsLoad?: (headings: HTMLHeadingElement[]) => void
}
export default function DocumentView(props: Props) {
  const { title, children, options, onHeadingsLoad, ...rest } = props
  const { query, ...restOptions } = options ?? {}

  const proseRef = useRef<HTMLDivElement>(null)
  const naviRef = useRef<HTMLDivElement>(null)

  // headings population
  const [headings, setHeadings] = useState<HTMLHeadingElement[]>([])
  useEffect(() => {
    if (proseRef.current == null || children == null) return
    const headings = Array.from(
      proseRef.current.querySelectorAll(
        query ?? `:where(h1, h2, h3, h4, h5, h6, h7, h8, h9):not([data-type])`
      )
    ) as HTMLHeadingElement[]
    headings.forEach((e, i) => (e.dataset['index'] = i + ''))

    onHeadingsLoad?.(headings)
    setHeadings(headings)
  }, [children, proseRef])

  // tracker
  const { actives } = useTrackElements(
    headings,
    assign<TrackerOptions, TrackerOptions>(
      {
        threshold: [0, 0.5],
        deps: [headings],
        listNeverEmpty: true,
      },
      restOptions
    )
  )

  // tracking result
  const sorted = [...actives].sort(
    (a, b) => +(a.dataset['index'] ?? 0) - +(b.dataset['index'] ?? 0)
  )
  const currentlyActive = sorted[0]

  // auto-scroll on active list change
  // useEffect(() => {
  //   const navi = naviRef.current
  //   if (navi == null) return

  //   new PerfectScrollbar(navi)
  // }, [naviRef])

  useEffect(() => {
    const navi = naviRef.current
    if (navi == null || currentlyActive == null) return

    const i = currentlyActive?.dataset['index']
    const pairedAnchor = navi.querySelector(`:nth-child(${i})`)
    if (pairedAnchor == null) return
    scrollIntoView(pairedAnchor, {
      behavior: 'smooth',
      block: 'start',
      boundary: navi,
    })
  }, [actives])

  return (
    <TitledSection title={title} {...rest}>
      <Flex>
        <Box
          css={{
            width: '$tw_64',
            flexShrink: 0,
            position: 'sticky',
            height: 'max-content',
            maxHeight: 'calc(100vh - $sizes$header - $space$6 - $space$6)',
            top: 'calc($sizes$header + $space$6)',
            mr: '$9',
          }}
        >
          <Box
            css={{
              position: 'relative',
              height: 'max-content',
              maxHeight: 'inherit',
              pr: '$6',
              overflow: 'auto',
              width: '100%',
            }}
            ref={naviRef}
          >
            {/* <SimpleBar
            style={{
              maxHeight: 'inherit',
            }}
            ref={naviRef}
          > */}
            <Flex
              css={{
                flexDirection: 'column',
                rowGap: '$2',
                textTransform: 'uppercase',

                '& > *': {
                  fontSet: '$sm',
                },
              }}
            >
              {headings.map((heading, i) => {
                const active = currentlyActive?.id === heading.id
                return (
                  <Text
                    key={i}
                    data-index={i}
                    css={{
                      color: active ? `$red9` : undefined,
                    }}
                  >
                    {heading.textContent}
                  </Text>
                )
              })}
            </Flex>
          </Box>
          {/* </SimpleBar> */}
        </Box>
        <Prose
          css={{
            width: '100%',
          }}
          ref={proseRef}
        >
          {children}
        </Prose>
      </Flex>
    </TitledSection>
  )
}
