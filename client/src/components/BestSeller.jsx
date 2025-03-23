import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItem from './ProductItem';
import Title from './Title';

const BestSeller = () => {

  const {products} = useContext(ShopContext);

  const [bestSellerProducts, setBestSellerProducts] = useState([]);

  useEffect(() => {
    const best_seller_products = products.filter((item) => item.bestseller);
    setBestSellerProducts(best_seller_products.slice(0,5));
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"BEST"} text2={"SELLERS"} />
        <p className="w-3/4 text-xs sm:text-sm md:text-base m-auto text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam
          possimus fugiat eaque natus at Consequuntur.
        </p>
      </div>

      {/* Displaying latest produdts */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {
            bestSellerProducts.map((product, index) => (
              <ProductItem key={index} id={product._id} name={product.name} images={product.images} price={product.price} />
            ))
        }
      </div>
    </div> 
  )
}

export default BestSeller
