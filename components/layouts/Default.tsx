import { Box } from '@Components/Box'
import { Flex } from '@Components/Flex'
import Header from '@Components/Header'
import Footer from '@Components/Footer'
import Head from 'next/head'

export default function Default({ children }) {
  return (
    <Box as="main" css={{ minHeight: '$full', minWidth: '$full' }}>
      <Header />
      {children}
      <Footer />
    </Box>
  )
}
