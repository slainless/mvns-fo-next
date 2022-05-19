import { Swiper } from '@Components/Swiper'
import { TitledSection } from '@Components/TitledSection'
import { SwiperSlide } from 'swiper/react'
import CourseCard from '@Components/CourseCard'
import * as CardPreset from '@Styles/card'
import { slimCard } from '@Dev/dummy'

export default function Trending() {
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
      >
        {slimCard.map((props, i) => (
          <SwiperSlide key={i}>
            <CourseCard {...props} />
          </SwiperSlide>
        ))}
      </Swiper>
    </TitledSection>
  )
}
