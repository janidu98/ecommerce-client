import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {backendUrl, currency} from '../App';
import { toast } from 'react-toastify';

const List = ({token}) => {

  const [list, setList] = useState([]);

  const fetchProducts = async () => {
    try {
      
      const res = await axios.get(backendUrl + '/api/product/list');
      
      if(res.data.success) {
        console.log(res.data);
        setList(res.data.data);
      } else  {
        toast.error(res.data.message);
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleRemove = async (id) => {
    try {
      
      const res = await axios.post(backendUrl + '/api/product/remove', {id}, {
        headers: {token}
      });

      if(res.data.success) {
        toast.success(res.data.message);
        await fetchProducts();
      } else  {
        toast.error(res.data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  return (
    <>
      <p className='mb-2'>All Products List</p>
      
      <div className='flex flex-col gap-2'>

        {/* Product table title */}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] text-sm bg-gray-100 px-2 py-1'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>

        {/* Product list */}
        {
          list.map((item,index) => (
            <div className='grid grid-cols-[1fr_3fr_1fr_1fr_1fr] text-sm bg-gray-100 px-2 py-1 items-center' key={index}>
              <img className='w-12' src={item.images[0]} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{currency}{item.price}</p>
              <p onClick={() => handleRemove(item._id)} className='text-right md:text-center text-lg cursor-pointer'>x</p>
            </div>
          ) )
        }
      </div>
    </>
  )
}

export default List
