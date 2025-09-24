import React from 'react'
import Hero from '../components/home/Hero'
import CategoryWrapper from '../components/home/CategoryWrapper'
import FeaturedRecipes from '../components/home/FeaturedRecipes'
import Testimonials from '../components/home/Testimonials'
import WhyChooseUs from '../components/home/WhyChooseUs'

function Home() {
  return (
    <>
    <Hero/>
    <CategoryWrapper/>
    <FeaturedRecipes/>
    <Testimonials/>
    <WhyChooseUs/>
    </>
  )
}

export default Home