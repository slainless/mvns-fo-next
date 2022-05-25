import { Box } from '@Components/Box'
import { Flex } from '@Components/Flex'
import Header from '@Components/Header'
import Footer from '@Components/Footer'
import Head from 'next/head'

export default function Default({ children }) {
  return (
    <>
      <Header />
      <Box
        as="main"
        css={{ minHeight: '$full', minWidth: '$full', mt: '$sizes$header' }}
      >
        {children}
      </Box>
      <Footer />
    </>
  )
}
