import React from 'react'
import { assets } from '../assets/assets'

const Problem = () => {
  const problems = [
    {
      icon: '📊',
      title: 'Prevalensi Stunting Tinggi',
      description: 'Indonesia masih menghadapi angka stunting yang mengkhawatirkan, mempengaruhi masa depan generasi muda.'
    },
    {
      icon: '🍎',
      title: 'Kurangnya Pengetahuan Gizi',
      description: 'Banyak orang tua belum memahami pentingnya nutrisi seimbang untuk pertumbuhan optimal anak.'
    },
    {
      icon: '⚕️',
      title: 'Akses Layanan Kesehatan Terbatas',
      description: 'Tidak semua keluarga memiliki akses mudah ke fasilitas kesehatan dan konsultasi gizi.'
    },
    {
      icon: '📱',
      title: 'Monitoring yang Tidak Terstruktur',
      description: 'Kesulitan dalam memantau perkembangan gizi anak secara konsisten dan terukur.'
    }
  ]

  return (
    <div className='container mx-auto py-16 px-6 md:px-20 lg:px-32' id='Problem'>
      <div className='text-center mb-12'>
        <h2 className='text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4'>
          Masalah yang Kami Selesaikan
        </h2>
        <p className='text-gray-600 max-w-2xl mx-auto text-lg'>
          NutriLogic hadir untuk mengatasi berbagai tantangan dalam upaya pencegahan stunting di Indonesia
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
        {problems.map((problem, index) => (
          <div 
            key={index}
            className='bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2'
          >
            <div className='text-5xl mb-4'>{problem.icon}</div>
            <h3 className='text-xl font-semibold text-gray-800 mb-3'>
              {problem.title}
            </h3>
            <p className='text-gray-600 leading-relaxed'>
              {problem.description}
            </p>
          </div>
        ))}
      </div>

      <div className='mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-12'>
        <div className='flex flex-col md:flex-row items-center gap-8'>
          <div className='flex-1'>
            <h3 className='text-2xl md:text-3xl font-bold text-gray-800 mb-4'>
              Mengapa Harus Bertindak Sekarang?
            </h3>
            <p className='text-gray-700 text-lg leading-relaxed mb-4'>
              Stunting dapat dicegah dengan deteksi dini dan intervensi yang tepat. 1000 hari pertama kehidupan anak sangat krusial untuk menentukan masa depan mereka.
            </p>
            <ul className='space-y-2 text-gray-700'>
              <li className='flex items-start'>
                <span className='text-green-500 mr-2 mt-1'>✓</span>
                <span>Deteksi dini mengurangi risiko stunting hingga 80%</span>
              </li>
              <li className='flex items-start'>
                <span className='text-green-500 mr-2 mt-1'>✓</span>
                <span>Nutrisi tepat meningkatkan kualitas hidup anak</span>
              </li>
              <li className='flex items-start'>
                <span className='text-green-500 mr-2 mt-1'>✓</span>
                <span>Monitoring rutin memastikan tumbuh kembang optimal</span>
              </li>
            </ul>
          </div>
          <div className='flex-1'>
            <div className='bg-white rounded-xl p-8 shadow-lg'>
              <div className='text-center mb-6'>
                <div className='text-6xl font-bold text-blue-600 mb-2'>21.6%</div>
                <p className='text-gray-600'>Angka Stunting di Indonesia (2023)</p>
              </div>
              <div className='border-t pt-6'>
                <p className='text-center text-gray-700 font-medium'>
                  Mari bersama-sama turunkan angka ini demi generasi Indonesia yang lebih baik!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Problem
