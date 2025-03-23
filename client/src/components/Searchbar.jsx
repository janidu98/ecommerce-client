import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import { useLocation } from "react-router-dom";

const Searchbar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if(location.pathname.includes('collection')) {
        setVisible(true);
    } else {
        setVisible(false);
    }
  }, [location]);

  return showSearch && visible ? (
    <div className="border-t, border-b text-center bg-gray-50">
      <div className="inline-flex items-center justify-center border border-gray-500 px-5 py-2 mx-5 my-3 rounded-full w-3/4 sm:w-1/2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 outline-none text-sm bg-inherit"
          type="text"
          placeholder="Search by item name..."
        />
        <img className="w-4" src={assets.search_icon} alt="search-icon" />
      </div>
      <img
        onClick={() => setShowSearch(false)}
        className="inline w-3 cursor-pointer"
        src={assets.cross_icon}
        alt="cross-icon"
      />
    </div>
  ) : null;
};

export default Searchbar;
