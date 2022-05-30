import type { NextPage } from 'next'
import List from '@Pages/cart/List'
import { Text } from '@Components/Text'
import { TitledSection } from '@Components/TitledSection'
import { Link } from '@Components/Link'
import scrollIntoViewIfNeeded from 'smooth-scroll-into-view-if-needed'
import { Guard } from '@Components/RouteGuard'

const Page: NextPage = () => {
  return (
    <Guard.Auth>
      <TitledSection title="My Cart">
        <Text color={'gray'} css={{ mb: '$4' }}>
          You can also use your coupon to get prices discount.{' '}
          <Link
            variant={'blue'}
            href={'#discount-coupon'}
            onClick={(e) => {
              console.log(e.target)
              const el = document.querySelector(e.target.attributes.href.value)
              if (el) scrollIntoViewIfNeeded(el)
              return false
            }}
          >
            Apply my coupon.
          </Link>
        </Text>
        <List />
      </TitledSection>
    </Guard.Auth>
  )
}

export default Page
