import { Swiper } from '@Components/CardSwiper'
import { TitledSection } from '@Components/TitledSection'
import { SwiperSlide } from 'swiper/react'
import CourseCard, { CourseCardData } from '@Components/CourseCard'
import * as CardPreset from '@Styles/card'
import { largeCard } from '@Dev/dummy'
import { useAuthUserStore } from '@Methods/auth'
import { useRequest } from '@Functions/use-request'
import { useState, useEffect } from 'react'
import { CourseAPI } from '@Methods/course'
import { CourseResponse, CourseType } from '@Models/course'
import { isEmpty } from 'lodash-es'
import { DateTime } from 'luxon'
import FallbackCard from '@Components/FallbackCard'
import { courseToCard } from '@Functions/data-conversion'

export default function TypeVideo() {
  const user = useAuthUserStore((state) => state.user)
  const {
    data: $data,
    loading,
    error,
    run,
  } = useRequest(CourseAPI.ofType, {
    manual: true,
    acceptOnly: CourseResponse.Get,
  })

  useEffect(() => {
    if (user == null) run(CourseType.VIDEO)
  }, [user])

  if (user != null) return <></>
  return (
    <TitledSection
      title="Video on demand"
      hotlink={{ display: 'See all classes', href: '/class' }}
    >
      <FallbackCard error={error}>
        <Swiper
          swiperOptions={CardPreset.Normal}
          swiperCSS={{ height: '28rem' }}
          id="vod"
        >
          {$data?.data.map((props, i) => (
            <SwiperSlide key={i}>
              <CourseCard
                {...courseToCard(props)}
                hideFavorited={user == null}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </FallbackCard>
    </TitledSection>
  )
}
