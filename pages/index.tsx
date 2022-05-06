import type { NextPage } from 'next'
import Head from 'next/head'
import Hero from '@Pages/landing/Hero'
import { styled } from '@Theme'
import Featured from '@Pages/landing/Featured'
import Trending from '@Pages/landing/Trending'
import VideoOnDemand from '@Pages/landing/VideoOnDemand'
import BusinessBanner from '@Pages/landing/BusinessBanner'
import Blog from '@Pages/landing/Blog'
import Category from '@Pages/landing/Category'

const Home: NextPage = () => {
  return (
    <>
      <Hero></Hero>
      <Featured />
      <Trending />
      <VideoOnDemand />
      <BusinessBanner />
      <Blog />
      <Category />
    </>
  )
}

export default Home
