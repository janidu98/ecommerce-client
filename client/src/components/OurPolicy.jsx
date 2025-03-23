import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row gap-12 sm:gap-2 justify-around text-center text-xs sm:text-sm lg:text-base text-gray-700 my-10'>
      
        <div>
            <img className='w-12 m-auto mb-5' src={assets.exchange_icon} alt="Exchange-icon" />
            <p className='font-semibold'>Easy Exchange Policy</p>
            <p className='text-gray-400'>We offer hassle free exchange policy</p>
        </div>
        <div>
            <img className='w-12 m-auto mb-5' src={assets.quality_icon} alt="Quality-icon" />
            <p className='font-semibold'>7 Days return policy</p>
            <p className='text-gray-400'>We provide 7 days free return policy</p>
        </div>
        <div>
            <img className='w-12 m-auto mb-5' src={assets.support_img} alt="Support-icon" />
            <p className='font-semibold'>Best customer support</p>
            <p className='text-gray-400'>We provide 24x7 customer support</p>
        </div>

    </div>
  )
}

export default OurPolicy
