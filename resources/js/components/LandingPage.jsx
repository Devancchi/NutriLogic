import React from 'react'
import Header from './Header'
import Problem from './Problem'
import Fitur from './Fitur'
import Penggunaan from './Penggunaan'
import Testimonial from './Testimonial'
import Footer from './Footer'

const LandingPage = () => {
  return (
    <div className='w-full overflow-hidden'>
      <Header />
      <Problem />
      <Fitur />
      <Penggunaan />
      <Testimonial />
      <Footer />
    </div>
  )
}

export default LandingPage
