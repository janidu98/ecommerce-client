import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      <div className='flex flex-col md:flex-row justify-center my-10 gap-10 mb-28'>
        <img className='w-full md:max-w-[450px]' src={assets.contact_img} alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='text-xl font-semibold text-gray-600'>Our Store</p>
          <p className='text-gray-500'>No:75, Kandy Road, <br />Kalagedihena.</p>
          <p className='text-gray-500'>Tel: (033) 2233415 <br />admin@forever.com</p>
          <p className='text-xl font-semibold text-gray-600'>Careers at Forever</p>
          <p className='text-gray-500'>Learn more about our teams and job opening</p>
          <button className='border border-black px-8 py-4 hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>
        </div>
      </div>

      <NewsLetterBox />
    </div>
  )
}

export default Contact
