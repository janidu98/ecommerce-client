import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] my-10 mt-40 text-sm gap-14">
        <div>
          <img className="w-32 mb-5" src={assets.logo} alt="Logo" />
          <p className="w-full md:w-2/3 text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa
            molestiae, in corrupti accusamus itaque earum, voluptate deserunt
            voluptatibus consectetur recusandae doloribus nemo repellendus.
            Deleniti nesciunt officia cupiditate aliquam eligendi delectus.
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+94717777624</li>
            <li>info@forever.com</li>
          </ul>
        </div>
      </div>

      <div>
        <hr />
        <p className="text-sm py-5 text-center">
          Copyright 2025@ forever.com - All Right Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
