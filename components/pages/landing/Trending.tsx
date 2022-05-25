import { Swiper } from '@Components/CardSwiper'
import { TitledSection } from '@Components/TitledSection'
import { SwiperSlide } from 'swiper/react'
import CourseCard, { CourseCardData } from '@Components/CourseCard'
import * as CardPreset from '@Styles/card'
import { useRequest } from 'ahooks'
import { CourseAPI } from '@Methods/course'
import { useAuthUserStore } from '@Methods/auth'
import { useEffect, useState } from 'react'
import { CourseResponse } from '@Models/course'
import { DateTime } from 'luxon'
import { isEmpty } from 'lodash-es'

export default function Trending() {
  const user = useAuthUserStore((state) => state.user)
  const {
    data: result,
    loading,
    error,
  } = useRequest(CourseAPI.trending, {
    refreshDeps: [user],
  })
  const [data, setData] = useState<CourseCardData[]>([])

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
  return (
    <TitledSection
      title="What's Trending Now"
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
        id="trending"
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
