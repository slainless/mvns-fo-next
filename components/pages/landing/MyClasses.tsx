import { Swiper } from '@Components/CardSwiper'
import { Text } from '@Components/Text'
import { TitledSection } from '@Components/TitledSection'
import { SwiperSlide } from 'swiper/react'
import CourseCard, { CourseCardData } from '@Components/CourseCard'
import * as CardPreset from '@Styles/card'
import { slimCard } from '@Dev/dummy'
import { useRequest } from 'ahooks'
import { CourseAPI } from '@Methods/course'
import { useAuthUserStore } from '@Methods/auth'
import { useEffect, useState } from 'react'
import { CourseResponse } from '@Models/course'
import { DateTime } from 'luxon'
import { isEmpty } from 'lodash-es'
import { Alert } from '@Components/Alert'
import { Box } from '@Components/Box'
import { Flex } from '@Components/Flex'
import { Image } from '@Components/Image'
import FallbackCard, { EmptyError, Fallback } from '@Components/FallbackCard'

export default function MyClasses() {
  const user = useAuthUserStore((state) => state.user)
  const {
    data: result,
    loading,
    error: err,
    run,
  } = useRequest(CourseAPI.my, {
    manual: true,
  })
  const [data, setData] = useState<CourseCardData[]>([])
  const [fallback, setFallback] = useState<Fallback>()

  useEffect(() => {
    if (user != null) run()
  }, [user])

  useEffect(() => {
    if (err) return void setFallback(err)
    if (result == null) return
    if (result.data instanceof CourseResponse.Get) {
      const d = result.data.data
      if (d.length === 0) setFallback(new EmptyError())
      return void setData(
        d.map((i) => ({
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
    }

    setFallback(new Error(result.data.message))
  }, [err, result])

  if (user == null) return <></>

  return (
    <TitledSection
      title="Continue Learning"
      hotlink={
        !fallback
          ? {
              display: 'See all my classes',
              href: '/class/my',
            }
          : undefined
      }
    >
      {!fallback && (
        <Swiper
          swiperOptions={CardPreset.Normal}
          swiperCSS={{
            height: '28rem',
          }}
        >
          {data.map((props, i) => (
            <SwiperSlide key={i}>
              <CourseCard {...props} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      {fallback && <FallbackCard error={fallback} />}
    </TitledSection>
  )
}
