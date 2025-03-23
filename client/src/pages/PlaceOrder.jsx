import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import {toast} from 'react-toastify'

const PlaceOrder = () => {

  const {navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products} = useContext(ShopContext);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData(data => ({...data, [name]: value }));
  }

  const onSubmitHandler = async(event) => {
    event.preventDefault();

    try {
      console.log("1");
      let orderItems = [];

      for(const items in cartItems) {
        for(const item in cartItems[items]) {
          if(cartItems[items][item] > 0) {
            let itemInfo = products.find(product => product._id === items);
            
            if(itemInfo) {
              itemInfo.size = item,
              itemInfo.quantity = cartItems[items][item],
              orderItems.push(itemInfo);
            }
          }
        }
      }
      console.log("2");
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      }
      console.log("3");
      console.log(paymentMethod)
      switch(paymentMethod) {
     
        //api for cod
        case 'cod':
          const res = await axios.post(backendUrl + '/api/order/place', orderData, {headers: {token}});
          console.log(res);
          if(res.data.success) {
            navigate('/orders');
            setCartItems({});
          } else {
            toast.error(res.data.message);
          }
          break;

        case 'stripe' :
          const resStrip = await axios.post(backendUrl + '/api/order/stripe', orderData, {headers: {token}});
          console.log(resStrip);
          if(resStrip.data.success) {
            const {session_url} = resStrip.data;
            window.location.replace(session_url);
          } else {
            toast.error(resStrip.data.message);
          }
          break;

        case 'razorpay' :
          toast.error('Razorpay is not supported yet');
          break;

        defalut:
          break;
      }

    } catch (error) {
      
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 border-t min-h-[80vh]'>
      
      {/* Left side */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'}/>
        </div>
        
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-300 py-1.5 px-3.5 w-full rounded' type="text" placeholder='First Name'/>
          <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-300 py-1.5 px-3.5 w-full rounded' type="text" placeholder='Last Name'/>
        </div>
        <input required onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-300 py-1.5 px-3.5 w-full rounded' type="email" placeholder='Email Address'/>
        <input required onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-300 py-1.5 px-3.5 w-full rounded' type="text" placeholder='Street'/>
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-300 py-1.5 px-3.5 w-full rounded' type="text" placeholder='City'/>
          <input required onChange={onChangeHandler} name='state' value={formData.state} className='border border-gray-300 py-1.5 px-3.5 w-full rounded' type="text" placeholder='State'/>
        </div>
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='border border-gray-300 py-1.5 px-3.5 w-full rounded' type="number" placeholder='Zipcode'/>
          <input required onChange={onChangeHandler} name='country' value={formData.country} className='border border-gray-300 py-1.5 px-3.5 w-full rounded' type="text" placeholder='Country'/>
        </div>
        <input required onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-gray-300 py-1.5 px-3.5 w-full rounded' type="number" placeholder='Phone'/>
      </div>

      {/* Right side */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>

        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          {/* Payment methods */}
          <div className='flex gap-3 flex-col lg:flex-row'>
            {/* stripe */}
            <div onClick={() => setPaymentMethod('stripe')} className='flex gap-3 p-2 px-3 items-center border cursor-pointer hover:bg-slate-100'>
              <p className={`min-w-3.5 h-3.5 rounded-full border ${paymentMethod === 'stripe' ? 'bg-gray-400' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.stripe_logo} alt="stripe_logo" />
            </div>
            {/* razorpay */}
            <div onClick={() => setPaymentMethod('razorpay')} className='flex gap-3 p-2 px-3 items-center border cursor-pointer hover:bg-slate-100'>
              <p className={`min-w-3.5 h-3.5 rounded-full border ${paymentMethod === 'razorpay' ? 'bg-gray-400' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.razorpay_logo} alt="razorpay_logo" />
            </div>
            {/* cash */}
            <div onClick={() => setPaymentMethod('cod')} className='flex gap-3 p-2 px-3 items-center border cursor-pointer hover:bg-slate-100'>
              <p className={`min-w-3.5 h-3.5 rounded-full border ${paymentMethod === 'cod' ? 'bg-gray-400' : ''}`}></p>
              <p className='text-gray-500 text-sm mx-4'>CASH ON DELIVERY</p>
            </div>
          </div>
        </div>

        <div className='mt-8 w-full text-end'>
          <button type='submit' className='bg-black text-white px-16 py-3 text-sm hover:bg-red-500'>PLACE ORDER</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
