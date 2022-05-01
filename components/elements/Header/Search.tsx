import { Button } from '@Components/Button'
import { Flex } from '@Components/Flex'
import { IconButton } from '@Components/IconButton'
import { TextField } from '@Components/TextField'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { styled } from '@Theme'

function Base(prop: any) {
  return (
    <Flex
      css={{
        maxWidth: '$tw_64',
        justifySelf: 'center',
        ai: 'center',
        bc: '$slate3',
        pr: '$1',
        rounded: '$full',
      }}
      {...prop}
    >
      <TextField
        variant="ghost"
        css={{
          rounded: '$full',
          mr: '$1',
          p: '$2',
          height: '$6',
        }}
      ></TextField>
      <IconButton css={{ rounded: '$full', bc: '$red9', color: 'white' }}>
        <MagnifyingGlassIcon />
      </IconButton>
    </Flex>
  )
}

const Search = styled(Base)
export default Search
