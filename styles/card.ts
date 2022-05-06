import { SwiperProps } from 'swiper/react'

export const Normal: SwiperProps = {
  rewind: true,
  breakpoints: {
    0: {
      slidesPerView: 1.25,
      slidesPerGroup: 1,
      spaceBetween: 15,
    },
    375: {
      slidesPerView: 1.5,
      slidesPerGroup: 1,
    },
    475: {
      slidesPerView: 1.5,
      slidesPerGroup: 1,
      spaceBetween: 20,
    },
    640: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 25,
    },
    768: {
      slidesPerView: 2,
      slidesPerGroup: 2,
    },
    1024: {
      slidesPerView: 3,
      slidesPerGroup: 3,
    },
    1280: {
      slidesPerView: 4,
      slidesPerGroup: 4,
    },
  },
}

export const Large: SwiperProps = {
  rewind: true,
  breakpoints: {
    0: {
      slidesPerView: 1.25,
      slidesPerGroup: 1,
      spaceBetween: 15,
    },
    375: {
      slidesPerView: 1.2,
      slidesPerGroup: 1,
    },
    475: {
      slidesPerView: 1.25,
      slidesPerGroup: 1,
      spaceBetween: 20,
    },
    640: {
      slidesPerView: 1.5,
      slidesPerGroup: 1,
      spaceBetween: 25,
    },
    768: {
      slidesPerView: 1.5,
      slidesPerGroup: 1,
    },
    1024: {
      slidesPerView: 1.5,
      slidesPerGroup: 1,
    },
    1280: {
      slidesPerView: 2,
      slidesPerGroup: 2,
    },
  },
}
