import { Swiper } from '@Components/CardSwiper'
import { TitledSection } from '@Components/TitledSection'
import { SwiperSlide } from 'swiper/react'
import CourseCard, { CourseCardData } from '@Components/CourseCard'
import * as CardPreset from '@Styles/card'
import { useRequest } from '@Functions/use-request'
import { CourseAPI } from '@Methods/course'
import { useAuthUserStore } from '@Methods/auth'
import { CourseResponse } from '@Models/course'
import FallbackCard from '@Components/FallbackCard'
import { courseToCard } from '@Functions/data-conversion'

export default function Trending() {
  const user = useAuthUserStore((state) => state.user)
  const {
    data: $data,
    loading,
    error,
  } = useRequest(CourseAPI.trending, {
    refreshDeps: [user],
    acceptOnly: CourseResponse.Get,
  })

  return (
    <TitledSection
      title="What's Trending Now"
      hotlink={{ display: 'See all classes', href: '/class' }}
    >
      <FallbackCard error={error}>
        <Swiper
          swiperOptions={CardPreset.Normal}
          swiperCSS={{ height: '28rem' }}
          id="trending"
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
