import { Box } from '@Components/Box'
import { Flex } from '@Components/Flex'
import Header from '@Components/Header'
import Head from 'next/head'

export default function Default({ children }) {
  return (
    <Box as="main" css={{ minHeight: '$full', minWidth: '$full' }}>
      <Header />
      {children}
    </Box>
  )
}
