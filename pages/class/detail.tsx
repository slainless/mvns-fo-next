import type { NextPage } from 'next'
import Head from 'next/head'
import Overview from '@Pages/class/Overview'
import Navigation from '@Pages/class/Navigation'
import Instructor from '@Pages/class/Instructor'
import Reviews from '@Pages/class/Reviews'
import Recommendation from '@Pages/class/Recommendation'
import Heading from '@Pages/class/Heading'
import Media from '@Pages/class/Media'
import { styled } from '@Theme'
import { TitledSection } from '@Components/TitledSection'
import { useIsomorphicLayoutEffect } from 'ahooks'
import { useCourseRequest, useCourseStore } from '@Pages/class/use-detail'
import isBrowser from '@Functions/is-browser'
import { useEffect } from 'react'
import shallow from 'zustand/shallow'
import { CourseResponse } from '@Models/course'
import { APIError } from '@Models/response'
import AnyError from '@Components/AnyError'
import NotFoundError from '@Pages/class/NotFoundError'

const Page: NextPage = () => {
  const id = isBrowser
    ? new URL(window.location.href).searchParams.get('id')
    : null
  useIsomorphicLayoutEffect(() => {
    if (id == null) window.location.replace('/not-found')
  }, [])
  useCourseRequest({
    defaultParams: id ? [id] : undefined,
    manual: id == null,
  })

  const { data, error, setError } = useCourseStore(
    (state) => ({
      data: state.data,
      error: state.error,
      setError: state.setError,
    }),
    shallow
  )

  useEffect(() => {
    if (data?.data == null) return
    if (!(data.data instanceof CourseResponse.GetOne))
      return void setError(data.data.toError())
  }, [data])

  if (error) {
    if (error instanceof APIError.NotFound)
      return <NotFoundError error={error} />

    return <AnyError error={error} />
  }

  return (
    <>
      <Overview />
      <Navigation />
      <TitledSection
        css={{
          py: 0,
        }}
      >
        <Heading />
        <Media />
      </TitledSection>
      <Instructor />
      <Reviews />
      <Recommendation />
    </>
  )
}

export default Page
