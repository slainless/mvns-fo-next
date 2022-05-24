import { Swiper } from '@Components/Swiper'
import { TitledSection } from '@Components/TitledSection'
import { SwiperProps, SwiperSlide } from 'swiper/react'
import BlogCard, { BlogCardData } from '@Components/BlogCard'
import * as CardPreset from '@Styles/card'
import { blogCards } from '@Dev/dummy'
import { merge } from 'lodash-es'

const swiperOptions: SwiperProps = {
  rewind: false,
  loop: true,
  breakpoints: {
    0: {},
    375: {
      slidesPerView: 1.25,
    },
    475: {},
    640: {
      slidesPerView: 1.25,
    },
    768: {
      centeredSlides: false,
    },
    1024: {
      slidesPerView: 1.5,
    },
    1280: {
      slidesPerGroup: 1,
      centeredSlides: true,
    },
  },
}
export default function Blog() {
  return (
    <TitledSection
      title="Our Blog"
      hotlink={{
        display: 'See all',
        href: '/blog',
      }}
    >
      <Swiper
        swiperOptions={merge(swiperOptions, CardPreset.Large)}
        swiperCSS={{
          height: '28rem',
        }}
      >
        {blogCards.map((props, i) => (
          <SwiperSlide key={i}>
            <BlogCard {...props} />
          </SwiperSlide>
        ))}
      </Swiper>
    </TitledSection>
  )
}
