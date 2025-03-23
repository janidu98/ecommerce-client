import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const LatestCollections = () => {

  const { products } = useContext(ShopContext);

  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    const latest = products.slice(0, 10); //display the latest 10 products
    setLatestProducts(latest);
  }, [products]);

  useEffect(() => {
    console.log("latestProducts: ", latestProducts);
  },[latestProducts]);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"LATEST"} text2={"COLLECTIONS"} />
        <p className="w-3/4 text-xs sm:text-sm md:text-base m-auto text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam
          possimus fugiat eaque natus at Consequuntur.
        </p>
      </div>

      {/* Displaying latest produdts */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {
            latestProducts.map((product, index) => (
              <ProductItem key={index} id={product._id} name={product.name} images={product.images} price={product.price} />
            ))
        }
      </div>
    </div> 
  );
};

export default LatestCollections;
