import type { NextPage } from 'next'
import Head from 'next/head'
import Hero from '@Pages/landing/Hero'
import { styled } from '@Theme'
import Featured from '@Pages/landing/Featured'
import Trending from '@Pages/landing/Trending'
import TypeVideo from '@Pages/landing/TypeVideo'
import BusinessBanner from '@Pages/landing/BusinessBanner'
import Blog from '@Pages/landing/Blog'
import Category from '@Pages/landing/Category'
import { useAuthUserStore } from '@Methods/auth'

const Page: NextPage = () => {
  const user = useAuthUserStore((state) => state.user)
  return (
    <>
      <div>
        <Hero />
      </div>
      <div>
        <Featured />
      </div>
      <div>
        <Trending />
      </div>
      <div>
        <TypeVideo />
      </div>
      <div>
        <BusinessBanner />
      </div>
      <div>
        <Blog />
      </div>
      <div>
        <Category />
      </div>
    </>
  )
}

export default Page
