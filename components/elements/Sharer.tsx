import * as Dialog from '@Components/Dialog'
import { Heading } from '@Components/Heading'
import { Flex } from '@Components/Flex'
import { ReactNode, useEffect, useRef } from 'react'
import { IconButton } from '@Components/IconButton'
import {
  Facebook,
  Telegram,
  Twitter,
  LinkedIn,
  WhatsApp,
  Instagram,
} from './Brand'
import { styled } from '@Theme'
import { TextField } from '@Components/TextField'
import { ControlGroup } from '@Components/ControlGroup'
import { Button } from '@Components/Button'
import { Text } from '@Components/Text'
import { ClipboardCopyIcon, Link2Icon } from '@radix-ui/react-icons'
import isBrowser from '@Functions/is-browser'
import { useCopyToClipboard } from 'react-use'
import toast from 'react-hot-toast'
import urlJoin from 'url-join'

const StyledIconButton = styled('a', IconButton, {
  '& svg': {
    fill: 'currentColor',
    width: '$5',
    height: '$5',
  },
  defaultVariants: {
    size: '3',
  },
})

type Data = {
  title: string
  summary?: string
}

export default function Sharer(
  props: { children: ReactNode } & Data
): JSX.Element
export default function Sharer(
  props: { trigger: ReactNode } & Data
): JSX.Element
export default function Sharer(
  props: {
    children?: ReactNode
    trigger?: ReactNode
  } & Data
) {
  const { trigger, children, title, summary } = props
  const [state, copy] = useCopyToClipboard()
  const inputRef = useRef<HTMLInputElement>()
  useEffect(() => {
    if (state.value == null) return
    toast(`Link copied to clipboard`)
  }, [state])
  const url = (() => {
    if (!isBrowser) return ''
    const $url = new URL(window.location.href)
    return urlJoin($url.origin, $url.pathname, $url.search)
  })()

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{trigger || children}</Dialog.Trigger>
      <Dialog.Content
        css={{
          // width: '$sm',
          display: 'flex',
          flexDirection: 'column',
          // ai: 'center',
          ai: 'start',
        }}
      >
        <Dialog.Title asChild>
          <Heading css={{ mb: '$4', mx: 'auto' }}>Share</Heading>
        </Dialog.Title>
        {/* <Text css={{ color: '$slate11', mb: '$1' }}>
          Share to your social media:
        </Text> */}
        <Flex css={{ gap: '$1', mb: '$4' }}>
          <StyledIconButton
            href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
            target="_blank"
          >
            <Facebook />
          </StyledIconButton>
          <StyledIconButton
            href={`https://twitter.com/intent/tweet?text=${title}&url=${url}`}
            target="_blank"
          >
            <Twitter />
          </StyledIconButton>
          <StyledIconButton
            href={`https://telegram.me/share/url?url=${url}&text=${title}`}
            target="_blank"
          >
            <Telegram />
          </StyledIconButton>
          <StyledIconButton
            href={`https://www.linkedin.com/sharing/share-offsite?mini=true&url=${url}&title=${title}`}
            target="_blank"
          >
            <LinkedIn />
          </StyledIconButton>
          <StyledIconButton
            href={`https://wa.me/?text=${title}:%0A${url}`}
            target="_blank"
          >
            <WhatsApp />
          </StyledIconButton>
          {/* <StyledIconButton>
            <Instagram />
          </StyledIconButton> */}
        </Flex>
        <Text css={{ color: '$slate11', mb: '$1' }}>Link to this page:</Text>
        <ControlGroup
          css={{
            width: '100%',
          }}
        >
          <TextField
            readOnly
            css={{
              width: '100%',
            }}
            value={url}
            ref={inputRef}
          ></TextField>
          <Button onClick={(e) => copy(url)}>
            <Link2Icon />
          </Button>
        </ControlGroup>
      </Dialog.Content>
    </Dialog.Root>
  )
}
