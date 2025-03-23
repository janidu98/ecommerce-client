import React from 'react'

const NewsLetterBox = () => {

  const submitHandler = (e) => {
    e.preventDefault();
  }

  return (
    <div className='text-center'>
      <p className='text-2xl font-medium text-gray-800'>Subscribe & get 20% off</p>
      <p className='text-gray-300 mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, maxime.</p>
    
      <form onSubmit={submitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
        <input className='w-full sm:flex-1 outline-none' type="email" placeholder='Enter your email' required/>
        <button type='submit' className='text-xs text-white bg-black px-10 py-4'>SUBSCRIBE</button>
      </form>
    </div>
  )
}

export default NewsLetterBox
