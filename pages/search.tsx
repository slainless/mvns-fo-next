import type { GetStaticProps, NextPage } from 'next'
import { TitledSection } from '@Components/TitledSection'
import * as CardPreset from '@Styles/card'
import getConfig from 'next/config'
import { Swiper } from '@Components/CardSwiper'
import { SwiperSlide } from 'swiper/react'
import CourseCard from '@Components/CourseCard'
import BlogCard from '@Components/BlogCard'
import { slimCard } from '@Dev/dummy'
import { Flex } from '@Components/Flex'
import { Box } from '@Components/Box'
import { Text } from '@Components/Text'
import { Code } from '@Components/Code'
import { Heading } from '@Components/Heading'
import { Badge } from '@Components/Badge'
import { useIsomorphicLayoutEffect } from 'ahooks'
import { useRequest } from '@Functions/use-request'
import { SearchAPI } from '@Methods/search'
import isBrowser from '@Functions/is-browser'
import { useState, useEffect } from 'react'
import AnyError from '@Components/AnyError'
import EmptyFallback from '@Pages/search/EmptyFallback'
import { Conditional, Else, If } from '@Components/Conditional'
import { SearchResponse } from '@Models/search'
import { nanoid } from 'nanoid'
import { DateTime } from 'luxon'
import { isEmpty } from 'lodash-es'

function Section(
  props: ReactProps<typeof Box> & {
    title: string
    result: number
  }
) {
  const { title, result, children, ...rest } = props
  return (
    <Box css={{ py: '$4' }} {...rest}>
      <Flex css={{ jc: 'space-between' }}>
        <Heading size="2" css={{ mb: '$4' }}>
          {title}
        </Heading>
        {result != null && (
          <Badge size="3" variant={result === 0 ? 'yellow' : 'green'}>
            {(() => {
              const many = result > 1
              return `${result} result${many ? 's' : ''}`
            })()}
          </Badge>
        )}
      </Flex>
      {children}
    </Box>
  )
}

const getQ = () =>
  isBrowser ? new URL(window.location.href).searchParams.get('q') ?? '' : ''
const Page: NextPage = () => {
  const [q, setQ] = useState(getQ())
  const { data, loading, error, run, response } = useRequest(SearchAPI.query, {
    manual: true,
    acceptOnly: SearchResponse.Get,
  })
  useEffect(() => {
    setQ(getQ())
  })
  useEffect(() => {
    run(q)
  }, [q])

  return (
    <TitledSection
      title="Search"
      css={{ '& > :first-child': { mb: 0 } }}
      headingProps={{ css: { mb: 0 } }}
    >
      <Text css={{ color: '$slate11', fontSet: '$lg', mb: '$2' }}>
        Here is what we found based on your query: <Code>{q}</Code>
      </Text>
      <Section title="Classes" result={data?.courses.length ?? 0}>
        <EmptyFallback data={data?.courses} type="classes">
          <Swiper
            swiperOptions={CardPreset.Normal}
            swiperCSS={{ height: '28rem' }}
          >
            {data?.courses.map((props, i) => (
              <SwiperSlide key={i}>
                <CourseCard
                  title={props.title}
                  itemId={props.id}
                  price={props.prices?.[0].price.toString()}
                  badges={[
                    { display: props.type, href: '' },
                    { display: props.category, href: '' },
                  ]}
                  hideFavorited={true}
                  backgroundUrl={props.image}
                  date={
                    isEmpty(props.course_datetime)
                      ? undefined
                      : DateTime.fromISO(
                          props.course_datetime ?? ''
                        ).toLocaleString(DateTime.DATE_FULL)
                  }
                  // {...props}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </EmptyFallback>
      </Section>
      <Section title="Instructors" result={data?.instructor.length ?? 0}>
        <EmptyFallback data={data?.instructor} type="instructors">
          <Swiper
            swiperOptions={CardPreset.Normal}
            swiperCSS={{
              height: '28rem',
            }}
          >
            {data?.instructor.map((props, i) => (
              <SwiperSlide key={i}>
                <CourseCard
                  title={`${props.firstname ?? ''} ${props.lastname ?? ''}`}
                  hideSeparator={true}
                  hideFavorited={true}
                  backgroundUrl={`https://i.pravatar.cc/300`}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </EmptyFallback>
      </Section>
      <Section title="Blogs" result={data?.blogs.length ?? 0}>
        <EmptyFallback data={data?.blogs} type="blogs">
          <Swiper
            swiperOptions={CardPreset.Normal}
            swiperCSS={{
              height: '28rem',
            }}
          >
            {data?.blogs.map((props, i) => (
              <SwiperSlide key={i}>
                <BlogCard
                  itemId={props.id}
                  title={props.title}
                  backgroundUrl={`https://picsum.photos/800?rand=${nanoid(10)}`}
                  date={
                    isEmpty(props.created_at)
                      ? undefined
                      : DateTime.fromISO(props.created_at ?? '').toLocaleString(
                          DateTime.DATE_FULL
                        )
                  }
                  // {...props}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </EmptyFallback>
      </Section>
    </TitledSection>
  )
}

export default Page
