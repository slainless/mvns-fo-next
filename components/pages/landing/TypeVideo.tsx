import { Swiper } from '@Components/Swiper'
import { TitledSection } from '@Components/TitledSection'
import { SwiperSlide } from 'swiper/react'
import CourseCard, { CourseCardData } from '@Components/CourseCard'
import * as CardPreset from '@Styles/card'
import { largeCard } from '@Dev/dummy'
import { useAuthUserStore } from '@Methods/auth'
import { useRequest } from 'ahooks'
import { useState, useEffect } from 'react'
import { CourseAPI } from '@Methods/course'
import { CourseResponse, CourseType } from '@Models/course'
import { isEmpty } from 'lodash-es'
import { DateTime } from 'luxon'

export default function TypeVideo() {
  const user = useAuthUserStore((state) => state.user)
  const {
    data: result,
    loading,
    error,
    run,
  } = useRequest(CourseAPI.ofType, {
    manual: true,
  })
  const [data, setData] = useState<CourseCardData[]>([])

  useEffect(() => {
    if (user == null) run(CourseType.VIDEO)
  }, [user])

  useEffect(() => {
    if (result == null) return
    if (result.data instanceof CourseResponse.Get)
      return void setData(
        result.data.data.map((i) => ({
          itemId: i.id,
          title: i.title,
          badges: [
            { display: i.type, href: '' },
            { display: i.category, href: '' },
          ],
          isFavorited: i.is_wishlist,
          price: i.prices[0]?.price.toString(),
          date: isEmpty(i.course_datetime)
            ? undefined
            : DateTime.fromISO(i?.course_datetime ?? '').toLocaleString(
                DateTime.DATE_FULL
              ),
          backgroundUrl: i.image,
        }))
      )
  }, [result])
  if (user != null) return <></>
  return (
    <TitledSection
      title="Video on demand"
      hotlink={{
        display: 'See all classes',
        href: '/class',
      }}
    >
      <Swiper
        swiperOptions={CardPreset.Normal}
        swiperCSS={{
          height: '28rem',
        }}
        id="vod"
      >
        {data.map((props, i) => (
          <SwiperSlide key={i}>
            <CourseCard hideFavorited={user == null} {...props} />
          </SwiperSlide>
        ))}
      </Swiper>
    </TitledSection>
  )
}
