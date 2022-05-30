import type { NextPage } from 'next'
import { TitledSection } from '@Components/TitledSection'
import getConfig from 'next/config'
import { Text } from '@Components/Text'
import Filter from '@Pages/class/Filter'
import CourseGrid from '@Components/CourseGrid'
import Config from '@Config'
import { slimCard } from '@Dev/dummy'
import { useFilterStore } from '@Pages/class/filter/use-filter-store'
import { useRequest } from '@Functions/use-request'
import { CourseAPI } from '@Methods/course'
import { CourseResponse } from '@Models/course'
import { useEffect, useMemo, useState } from 'react'
import { courseToCard } from '@Functions/data-conversion'
import { useIsomorphicLayoutEffect, usePrevious } from 'ahooks'
import { makeFilterParam, parseFilterParam } from '@Functions/filter-param'
import urlJoin from 'url-join'
import { useRouter } from 'next/router'
import { isEqual } from 'lodash-es'
import isBrowser from '@Functions/is-browser'

const toArray = (v: any) => (v == null ? null : !Array.isArray(v) ? [v] : v)

const Page: NextPage = () => {
  const router = useRouter()
  const filter = useFilterStore((state) => state.state)
  const setState = useFilterStore((state) => state.setState)
  const origin = useMemo(
    () => (isBrowser ? new URL(window.location.href).origin : ''),
    []
  )

  const { categories } = Config
  const { data, loading, error, run } = useRequest(CourseAPI.filter, {
    manual: true,
    acceptOnly: CourseResponse.Get,
  })

  // useEffect(() => {
  //   const url = new URL(window.location.href)
  //   const parsed = parseFilterParam(url.searchParams)
  //   setState(parsed)
  // })
  //
  // useEffect(() => {
  //   const handleRouteChange = (url, { shallow }) => {
  //     console.log(url, shallow)
  //     const $url = new URL(urlJoin(origin, url))
  //     const parsed = parseFilterParam($url.searchParams)
  //     if (isEqual(parsed, filter)) return
  //     setState(parsed)
  //   }
  //
  //   router.events.on('routeChangeStart', handleRouteChange)
  //   return () => {
  //     router.events.off('routeChangeStart', handleRouteChange)
  //   }
  // }, [])

  useEffect(() => {
    const query = location.search
    const parsed = parseFilterParam(query)
    if (isEqual(filter, parsed)) return
    setState(parsed)
  }, [router.query])

  useEffect(() => {
    const url = new URL(location.href)
    if (isEqual(filter, parseFilterParam(location.search))) return

    const newUrl = urlJoin(url.pathname, makeFilterParam(filter))
    // history.pushState()
    router.push(newUrl, undefined, { shallow: true })
  }, [filter])

  useEffect(() => {
    run(filter)
  }, [filter])

  useEffect(() => {
    console.log(router.query)
  }, [router.query])

  return (
    <TitledSection title="All Classes">
      <Text css={{ fontSet: '$md', mb: '$1', color: '$slate11' }}>
        You can also filter the courses by:
      </Text>
      <Filter />
      <CourseGrid courses={courseToCard(data?.data ?? [])} />
    </TitledSection>
  )
}

export default Page
