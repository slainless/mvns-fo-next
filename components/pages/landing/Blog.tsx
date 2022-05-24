import { Swiper } from '@Components/Swiper'
import { TitledSection } from '@Components/TitledSection'
import { SwiperProps, SwiperSlide } from 'swiper/react'
import BlogCard, { BlogCardData } from '@Components/BlogCard'
import * as CardPreset from '@Styles/card'
import { blogCards } from '@Dev/dummy'
import { isEmpty, merge } from 'lodash-es'
import { BlogAPI } from '@Methods/blog'
import { CourseResponse } from '@Models/course'
import { useRequest } from 'ahooks'
import { DateTime } from 'luxon'
import { useState, useEffect } from 'react'
import { BlogResponse } from '@Models/blog'
import { nanoid } from 'nanoid'

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
  const { data: result, loading, error } = useRequest(BlogAPI.latest)
  const [data, setData] = useState<BlogCardData[]>([])

  useEffect(() => {
    if (result == null) return
    if (result.data instanceof BlogResponse.Get)
      return void setData(
        result.data.data.map((i) => ({
          itemId: i.id,
          title: i.title,
          // badges: [
          //   { display: i., href: '' },
          //   { display: i.category, href: '' },
          // ],
          date: isEmpty(i.created_at)
            ? undefined
            : DateTime.fromISO(i?.created_at ?? '').toLocaleString(
                DateTime.DATE_FULL
              ),
          backgroundUrl:
            isEmpty(i.thumbnail_url) ||
            i.thumbnail_url.startsWith('http://localhost') ||
            i.thumbnail_url.startsWith('https://mavens.upanastudio.com')
              ? `https://picsum.photos/800?rand=${nanoid(10)}`
              : i.thumbnail_url,
        }))
      )
  }, [result])
  return (
    <TitledSection
      title="Our Blog"
      hotlink={{
        display: 'See all',
        href: '/blog',
      }}
    >
      <Swiper
        swiperOptions={merge(CardPreset.Large, swiperOptions)}
        swiperCSS={{
          height: '28rem',
        }}
        id="blog"
      >
        {data.map((props, i) => (
          <SwiperSlide key={i}>
            <BlogCard {...props} />
          </SwiperSlide>
        ))}
      </Swiper>
    </TitledSection>
  )
}
