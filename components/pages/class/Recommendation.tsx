import { Swiper } from '@Components/CardSwiper'
import { TitledSection } from '@Components/TitledSection'
import { SwiperSlide } from 'swiper/react'
import CourseCard from '@Components/CourseCard'
import * as CardPreset from '@Styles/card'
import { slimCard } from '@Dev/dummy'

export default function Recommendation() {
  return (
    <TitledSection
      title="Class viewed by others"
      hotlink={{ display: 'See all classes', href: '/class' }}
    >
      <Swiper swiperOptions={CardPreset.Normal} swiperCSS={{ height: '28rem' }}>
        {slimCard.map((props, i) => (
          <SwiperSlide key={i}>
            <CourseCard {...props} />
          </SwiperSlide>
        ))}
      </Swiper>
    </TitledSection>
  )
}
