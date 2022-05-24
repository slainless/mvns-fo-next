import { Swiper } from '@Components/Swiper'
import { TitledSection } from '@Components/TitledSection'
import { SwiperSlide } from 'swiper/react'
import CourseCard, { CourseCardData } from '@Components/CourseCard'
import * as CardPreset from '@Styles/card'
import { largeCard } from '@Dev/dummy'

export default function TypeVideo() {
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
      >
        {largeCard.map((props, i) => (
          <SwiperSlide key={i}>
            <CourseCard hideFavorited={user == null} {...props} />
          </SwiperSlide>
        ))}
      </Swiper>
    </TitledSection>
  )
}
