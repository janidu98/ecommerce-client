import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {

  const {products, search, showSearch} = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subcategory, setSubcategory] = useState([]);
  const [sortType, setSortType] = useState('relavent');

  const toggleCategory = (e) => {

    if(category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value));
    } else  {
      setCategory(prev => [...prev, e.target.value]);
    }

  }

  const toggleSubCategory = (e) => {

    if(subcategory.includes(e.target.value)) {
      setSubcategory(prev => prev.filter(item => item !== e.target.value));
    } else  {
      setSubcategory(prev => [...prev, e.target.value]);
    }

  }

  const applyFilter = () => {
    let copyProducts = products.slice();

    if(search && showSearch) {
      copyProducts = copyProducts.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));
    }

    if(category.length > 0) {
      copyProducts = copyProducts.filter((item) => category.includes(item.category));
    }

    if(subcategory.length > 0) {
      copyProducts = copyProducts.filter((item) => subcategory.includes(item.subCategory));
    }

    setFilterProducts(copyProducts);
  }

  useEffect(() => {
    applyFilter();
  }, [category, subcategory, search, showSearch, products]);

  const sortProducts = () => {
    let filterCopyProducts = filterProducts.slice();

    switch(sortType) {
      case 'low-high':
        setFilterProducts(filterCopyProducts.sort((a, b) => a.price - b.price));
        break;
      case 'high-low':
        setFilterProducts(filterCopyProducts.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  }

  useEffect(() => {
    sortProducts();
  }, [sortType]);
  
  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>

      {/* Filter options */}
      <div className="min-w-60">

        <p className='my-2 flex items-center text-xl cursor-pointer gap-2' onClick={() => setShowFilter(!showFilter)}>FILTERS
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
        </p>

        {/* Category filter */}
        <div className={`border border-gray-300 mt-6 pl-5 py-3 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>

          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Men'} onChange={toggleCategory}/> Men
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Women'} onChange={toggleCategory}/> Women
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Kids'} onChange={toggleCategory}/> Kids
            </p>
          </div>
        </div>

        {/* Subcategory filter */}
        <div className={`border border-gray-300 my-5 pl-5 py-3 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>

          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Topwear'} onChange={toggleSubCategory}/> Topwear
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Bottomwear'} onChange={toggleSubCategory}/> Bottomwear
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Winterwear'} onChange={toggleSubCategory}/> Winterwear
            </p>
          </div>
        </div>

      </div>

      {/* Right side */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTIONS'}/>

          {/* Sort products */}
          <div className='flex gap-2 items-center'>
            <p className='text-sm'>Sort by: </p>
            <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
              <option value="relavent">Relavent</option>
              <option value="low-high">Low to High</option>
              <option value="high-low">High to Low</option>
            </select>
          </div>
        </div>

        {/* Map products */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
        {
            filterProducts.map((product, index) => (
              <ProductItem key={index} id={product._id} name={product.name} images={product.images} price={product.price} />
            ))
        }
        </div>
      </div>
      
    </div>
  )
}

export default Collection
