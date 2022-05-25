import {
  Swiper as PrimitiveSwiper,
  SwiperProps,
  SwiperSlide,
} from 'swiper/react'
import { Navigation, A11y } from 'swiper'
import { useEffect, useMemo, useRef } from 'react'
import { Box } from './Box'
import { nanoid } from 'nanoid'
import { IconButton } from './IconButton'
import { CaretLeftIcon, CaretRightIcon } from '@radix-ui/react-icons'
import 'swiper/css'
import { isEmpty, merge } from 'lodash-es'
import { Skeleton } from './Skeleton'
// import 'swiper/css/navigation'
import { styled, CSS } from '@Theme'

const defaultOptions = (id: string): SwiperProps => ({
  modules: [Navigation, A11y],
  slidesPerView: 4,
  spaceBetween: 25,
  slidesPerGroup: 4,
  direction: 'horizontal',
  loop: false,
  navigation: {
    nextEl: `#next-${id}`,
    prevEl: `#prev-${id}`,
  },
})

const StyledSwiper = styled(PrimitiveSwiper)

type Props = HTMLAttr<'div'> & {
  swiperOptions?: SwiperProps
  swiperCSS?: CSS
  isLoading?: boolean
}
export function Swiper(props: Props) {
  const { id, swiperOptions, children, isLoading, swiperCSS, ...rest } = props
  const myId = useMemo(() => id ?? nanoid(10), [])
  const mergedSwiperOptions = merge(
    defaultOptions(myId),
    swiperOptions,
    isLoading
      ? {
          loop: true,
        }
      : {}
  )

  return (
    <Box id={`carousel-${myId}`} css={{ position: 'relative' }}>
      <StyledSwiper
        css={merge<CSS, CSS>(
          {
            pointerEvents: isLoading ? 'none' : 'initial',
          },
          swiperCSS ?? {}
        )}
        {...mergedSwiperOptions}
      >
        {isLoading &&
          Array(10)
            .fill(0)
            .map((i) => (
              <SwiperSlide key={i}>
                <Skeleton
                  css={{
                    borderRadius: '$3',
                    width: '100%',
                    height: '100%',
                  }}
                />
              </SwiperSlide>
            ))}
        {!isLoading && children}
      </StyledSwiper>
      <Box
        css={{
          display: isEmpty(children) || isLoading ? 'none' : 'contents',
        }}
      >
        <IconButton
          className="swiper-button-prev"
          id={`prev-${myId}`}
          css={{
            position: 'absolute',
            left: 0,
            top: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: '$10',
          }}
        >
          <CaretLeftIcon />
        </IconButton>
        <IconButton
          className="swiper-button-next"
          id={`next-${myId}`}
          css={{
            position: 'absolute',
            right: 0,
            top: '50%',
            transform: 'translate(50%, -50%)',
            zIndex: '$10',
          }}
        >
          <CaretRightIcon />
        </IconButton>
      </Box>
    </Box>
  )
}
Swiper.displayName = 'Swiper'
