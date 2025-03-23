import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {

  const [currentState, setCurrentState] = useState('Login');

  const {token, setToken, navigate, backendUrl} = useContext(ShopContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      
      if(currentState === 'Sign Up') {

        const res = await axios.post(backendUrl + '/api/user/register', {name, email, password});

        if(res.data.success) {
          setToken(res.data.token);
          localStorage.setItem('token', res.data.token);
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }

      } else {

        const res = await axios.post(backendUrl + '/api/user/login', {email, password});

        if(res.data.success) {
          setToken(res.data.token);
          localStorage.setItem('token', res.data.token);
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }

      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    if(token) {
      navigate('/');
    }
  },[token]);

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 text-gray-800 m-auto gap-4 mt-14'>
      <div className='inline-flex items-center gap-3 mb-3 mt-10'>
        <p className='prate-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800'/>
      </div>

      {currentState === 'Login' ? '' : <input onChange={(e) => setName(e.target.value)} value={name} type="text" className='w-full border border-gray-800 px-3 py-2 rounded' placeholder='Name' required/>}
      <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className='w-full border border-gray-800 px-3 py-2 rounded' placeholder='Email' required/>
      <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" className='w-full border border-gray-800 px-3 py-2 rounded' placeholder='Password' required/>

      <div className='flex justify-between text-sm w-full mt-[-8px]'>
        <p className='cursor-pointer'>Forgot your password?</p>
        {
          currentState === 'Login'
          ? <p onClick={() => setCurrentState('Sign Up')} className='cursor-pointer hover:underline hover:text-blue-800'>Create an Account</p>
          : <p onClick={() => setCurrentState('Login')} className='cursor-pointer hover:underline hover:text-blue-800'>Login Here</p>
        }
      </div>

      <button className='bg-black text-white text-xl font-light mt-4 px-12 py-2 rounded-full hover:bg-red-600'>{currentState === 'Login' ? 'Sign In' : 'Sign Up'}</button>
    </form>
  )
}

export default Login
