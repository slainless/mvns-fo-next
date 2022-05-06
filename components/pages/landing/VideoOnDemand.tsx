import { Swiper } from '@Components/Swiper'
import { TitledSection } from '@Components/TitledSection'
import { SwiperSlide } from 'swiper/react'
import CourseCard from '@Components/CourseCard'
import * as CardPreset from '@Styles/card'
import { largeCard } from '@Dev/dummy'

export default function Trending() {
  return (
    <TitledSection
      title="Video on demand"
      hotlink={{
        display: 'See all classes',
        href: '/class/all',
      }}
    >
      <Swiper
        swiperOptions={CardPreset.Large}
        swiperCSS={{
          height: '24rem',
        }}
      >
        {largeCard.map((props, i) => (
          <SwiperSlide key={i}>
            <CourseCard {...props} />
          </SwiperSlide>
        ))}
      </Swiper>
    </TitledSection>
  )
}
