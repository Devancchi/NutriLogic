import React from 'react'

const Testimonial = () => {
  return (
    <div className='bg-gray-50 py-16 font-montserrat' id='Testimonial'>
      <div className='container mx-auto px-6 md:px-20 lg:px-32'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4'>
            Testimoni
          </h2>
          <p className='text-gray-600 max-w-2xl mx-auto text-lg'>
            Apa kata pengguna NutriLogic
          </p>
        </div>
        {/* Add testimonial content here */}
      </div>
    </div>
  )
}

export default Testimonial
