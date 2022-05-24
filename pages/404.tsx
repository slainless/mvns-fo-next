import type { NextPage } from 'next'
import { useAuthUserStore } from '@Methods/auth'
import { BubbleText } from '@Components/BubbleText'
import { Image } from '@Components/Image'
import { Button } from '@Components/Button'
import * as ErrorCard from '@Components/ErrorCard'

const Page: NextPage = () => {
  const user = useAuthUserStore((state) => state.user)
  return (
    <ErrorCard.Viewport>
      <ErrorCard.Content>
        <ErrorCard.Heading>404</ErrorCard.Heading>
        <BubbleText color="red">How did i get lost here?</BubbleText>
        <Image
          src="/media/sparks/dazed-off.png"
          css={{
            height: '$tw_24',
            my: '$6',
          }}
        />
        <Button size="3">Take me back</Button>
      </ErrorCard.Content>
    </ErrorCard.Viewport>
  )
}

export default Page
