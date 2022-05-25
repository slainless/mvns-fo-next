import { Swiper } from '@Components/CardSwiper'
import { Text } from '@Components/Text'
import { TitledSection } from '@Components/TitledSection'
import { SwiperSlide } from 'swiper/react'
import CourseCard from '@Components/CourseCard'
import * as CardPreset from '@Styles/card'
import { useRequest } from '@Functions/use-request'
import { CourseAPI } from '@Methods/course'
import { useAuthUserStore } from '@Methods/auth'
import { useEffect, useState } from 'react'
import { CourseResponse } from '@Models/course'
import FallbackCard, { EmptyError, Fallback } from '@Components/FallbackCard'
import { Conditional, Else, If } from '@Components/Conditional'
import { courseToCard } from '@Functions/data-conversion'
import Empty from './MyClasses/Empty'

export default function MyClasses() {
  const user = useAuthUserStore((state) => state.user)
  const {
    data: $data,
    loading,
    error,
    run,
  } = useRequest(CourseAPI.my, {
    manual: true,
    acceptOnly: CourseResponse.Get,
  })

  useEffect(() => {
    if (user != null) run()
  }, [user])

  if (user == null) return <></>

  const isEmpty = $data?.data.length === 0
  const fallback = error || $data == null
  console.log(isEmpty, fallback, $data)

  return (
    <TitledSection
      title="Continue Learning"
      hotlink={
        fallback || isEmpty
          ? undefined
          : { display: 'See all my classes', href: '/class/my' }
      }
    >
      <FallbackCard error={error}>
        <Conditional value={isEmpty && !error && !loading}>
          <If is={false}>
            <Swiper
              swiperOptions={CardPreset.Normal}
              swiperCSS={{ height: '28rem' }}
            >
              {$data?.data.map((props, i) => (
                <SwiperSlide key={i}>
                  <CourseCard {...courseToCard(props)} />
                </SwiperSlide>
              ))}
            </Swiper>
          </If>
          <Else>EMPTY</Else>
        </Conditional>
      </FallbackCard>
    </TitledSection>
  )
}
