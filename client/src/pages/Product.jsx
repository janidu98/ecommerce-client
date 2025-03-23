import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const fetchProductData = async () => {

    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        console.log(productData);
        setImage(item.images[0]);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Product data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.images.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={image} alt="" />
          </div>
        </div>

        {/* Product details */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_dull_icon} alt="" className="w-3 5" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="text-3xl font-medium mt-5">
            {currency}
            {productData.price}
          </p>
          <p className="text-gray-500 md:w-4/5 mt-5">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, i) => (
                <button
                  onClick={() => setSize(item)}
                  key={i}
                  className={`border py-2 px-4 bg-gray-100 ${
                    item === size ? "bg-orange-500" : ""
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
            <button onClick={() => addToCart(productData._id, size)} className="bg-black text-white text-sm active:bg-gray-700 px-8 py-3">
              ADD TO CART
            </button>
            <hr className="mt-4 sm:w-4/5" />
            <div className="flex flex-col gap-1 mt-5 text-sm text-gray-500">
              <p>100% Original product.</p>
              <p>Cash on delivery is available for this product.</p>
              <p>Easy return and exchange policy with 7 days.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Description and Review section */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews (122)</p>
        </div>

        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
            reprehenderit quasi nostrum, eaque non eveniet consequuntur!
            Molestiae nemo deserunt ullam hic, ipsum error quaerat facere dolor
            quasi nulla rem quia. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Modi, nesciunt illo! Distinctio non, corrupti
            adipisci nobis quos odit magnam nesciunt autem quae, dolorem qui?
            Possimus deleniti eum voluptatum cum adipisci!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
            reprehenderit quasi nostrum, eaque non eveniet consequuntur!
            Molestiae nemo deserunt ullam hic, ipsum error quaerat facere dolor
            quasi nulla rem quia. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Modi, nesciunt illo! Distinctio non, corrupti
            adipisci nobis quos odit magnam nesciunt autem quae, dolorem qui?
            Possimus deleniti eum voluptatum cum adipisci!
          </p>
        </div>
      </div>

      {/* Display related products */}
      <RelatedProducts id={productData._id} category={productData.category} subCategory={productData.subCategory}/>
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
