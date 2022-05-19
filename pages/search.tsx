import type { GetStaticProps, NextPage } from 'next'
import { TitledSection } from '@Components/TitledSection'
import * as CardPreset from '@Styles/card'
import getConfig from 'next/config'
import { Swiper } from '@Components/Swiper'
import { SwiperSlide } from 'swiper/react'
import CourseCard from '@Components/CourseCard'
import { slimCard } from '@Dev/dummy'
import { Flex } from '@Components/Flex'
import { Box } from '@Components/Box'
import { Text } from '@Components/Text'
import { Heading } from '@Components/Heading'
import { Badge } from '@Components/Badge'

function Section(
  props: ReactProps<typeof Box> & {
    title: string
    subtitle: string
  }
) {
  const { title, subtitle, children, ...rest } = props
  return (
    <Box
      css={{
        py: '$4',
      }}
      {...rest}
    >
      <Flex
        css={{
          jc: 'space-between',
        }}
      >
        <Heading
          size="2"
          css={{
            mb: '$4',
          }}
        >
          {title}
        </Heading>
        <Badge size="3">{subtitle}</Badge>
      </Flex>
      {children}
    </Box>
  )
}

const Page: NextPage = () => {
  return (
    <TitledSection
      title="Search"
      css={{
        '& > :first-child': {
          mb: 0,
        },
      }}
      headingProps={{
        css: {
          mb: 0,
        },
      }}
    >
      <Text
        css={{
          color: '$slate11',
          fontSet: '$lg',
          mb: '$2',
        }}
      >
        Here is what we found based on your query:
      </Text>
      <Section title="Classes" subtitle="0 result">
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
      </Section>
      <Section title="Instructors" subtitle="0 result">
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
      </Section>
      <Section title="Blogs" subtitle="0 result">
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
      </Section>
    </TitledSection>
  )
}

export default Page
