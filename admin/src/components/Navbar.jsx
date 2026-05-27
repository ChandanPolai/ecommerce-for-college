import React from "react";
import { assets } from "../assets/assets";

const Navbar = ({ setToken }) => {
  return (
    <div className="flex items-center py-4 px-[6%] justify-between sticky top-0 bg-white/90 backdrop-blur-md z-50 border-b border-gray-100 shadow-sm">
      <div className="flex items-center gap-2 group">
        <span className="prata-regular text-xl font-bold tracking-[0.18em] text-gray-900">
          AURAWEAR
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880] mb-0.5"></span>
        <span className="hidden sm:inline-block bg-gray-50 border border-gray-200 text-gray-500 text-[9px] font-bold tracking-widest px-2.5 py-1 rounded-md uppercase ml-2">
          Management Suite
        </span>
      </div>
      <button
        onClick={() => setToken("")}
        className="bg-black hover:bg-[#c5a880] text-white px-5 py-2.5 rounded-xl text-xs font-bold tracking-widest transition-colors duration-300 shadow-sm"
      >
        LOGOUT
      </button>
    </div>
  );
};

export default Navbar;
