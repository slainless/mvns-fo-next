import { Box } from '@Components/Box'
import { Heading } from '@Components/Heading'
import * as CardPreset from '@Styles/card'
import { Swiper } from '@Components/CardSwiper'
import { SwiperSlide } from 'swiper/react'
import CourseCard from '@Components/CourseCard'
import { slimCard } from '@Dev/dummy'

export default function Category(props: { name: string }) {
  const { name } = props
  return (
    <Box
      css={{
        py: '$4',
      }}
    >
      <Heading
        size="2"
        css={{
          mb: '$4',
        }}
      >
        {name}
      </Heading>
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
    </Box>
  )
}
