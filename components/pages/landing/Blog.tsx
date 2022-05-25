import { Swiper } from '@Components/CardSwiper'
import { TitledSection } from '@Components/TitledSection'
import { SwiperProps, SwiperSlide } from 'swiper/react'
import BlogCard from '@Components/BlogCard'
import * as CardPreset from '@Styles/card'
import { isEmpty, merge } from 'lodash-es'
import { BlogAPI } from '@Methods/blog'
import { useRequest } from '@Functions/use-request'
import { blogToCard } from '@Functions/data-conversion'
import { BlogResponse } from '@Models/blog'
import FallbackCard from '@Components/FallbackCard'

const swiperOptions: SwiperProps = {
  rewind: false,
  loop: true,
  initialSlide: 1,
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
      slidesPerView: 2,
      centeredSlides: true,
    },
  },
}
export default function Blog() {
  const { data, loading, error } = useRequest(BlogAPI.latest, {
    acceptOnly: BlogResponse.Get,
  })

  return (
    <TitledSection
      title="Our Blog"
      hotlink={{ display: 'See all', href: '/blog' }}
    >
      <FallbackCard error={error}>
        <Swiper
          swiperOptions={merge(CardPreset.Large, swiperOptions)}
          swiperCSS={{ height: '28rem' }}
          id="blog"
        >
          {data?.data.map((props, i) => (
            <SwiperSlide key={i}>
              <BlogCard {...blogToCard(props)} />
            </SwiperSlide>
          ))}
        </Swiper>
      </FallbackCard>
    </TitledSection>
  )
}
