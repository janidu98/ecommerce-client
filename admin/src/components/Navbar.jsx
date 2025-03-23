import React from 'react'
import {assets} from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

const Navbar = ({setToken}) => {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    navigate('/');
    toast.success('Logged out successfully!');
  }

  return (
    <div className='flex items-center justify-between px-[4%] py-2'>
      <img className='w-[max(10%,80px)]' src={assets.logo} alt="" />
      <button onClick={logout} className='bg-gray-600 text-white text-xs sm:text-sm px-5 py-2 sm:px-7 sm:py-2 rounded-full cursor-pointer'>Logout</button>
    </div>
  )
}

export default Navbar
