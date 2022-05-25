import { Button } from '@Components/Button'
import { Flex } from '@Components/Flex'
import { IconButton } from '@Components/IconButton'
import { TextField } from '@Components/TextField'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { styled } from '@Theme'
import { useRouter } from 'next/router'
import { useRef, FormEvent } from 'react'
import urlJoin from 'url-join'
import { useIsomorphicLayoutEffect } from 'ahooks'

function Base(prop: any) {
  const router = useRouter()
  const searchRef = useRef<HTMLInputElement>(null)
  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    router.push(urlJoin('/search', `?q=${searchRef.current?.value}`))
  }

  useIsomorphicLayoutEffect(() => {
    if (['/search', '/search/'].includes(router.pathname)) {
      const q = new URL(window.location.href).searchParams.get('q')
      if (searchRef.current) searchRef.current.value = q ?? ''
    }
  })

  return (
    <Flex
      css={{
        maxWidth: '$tw_64',
        justifySelf: 'center',
        boxShadow: 'inset 0 0 0 1px $colors$blackA5',
        ai: 'center',
        bc: '$slate3',
        pr: '$1',
        rounded: '$full',
      }}
      {...prop}
    >
      <form style={{ display: 'contents' }} onSubmit={onSubmit}>
        <TextField
          variant="ghost"
          css={{
            rounded: '$full',
            mr: '$1',
            p: '$2',
            height: '$6',
          }}
          name="search"
          ref={searchRef}
        ></TextField>
        <IconButton
          css={{ rounded: '$full', bc: '$red9', color: 'white' }}
          type="submit"
        >
          <MagnifyingGlassIcon />
        </IconButton>
      </form>
    </Flex>
  )
}

const Search = styled(Base)
export default Search
