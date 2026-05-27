import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="pt-20">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 text-sm">
        <div>
          <div className="flex items-center gap-1 mb-5">
            <span className="prata-regular text-2xl font-bold tracking-[0.18em] text-gray-900">
              AURAWEAR
            </span>
            <span className="w-2 h-2 rounded-full bg-[#c5a880] self-end mb-1"></span>
          </div>
          <p className="w-full md:w-2/3 text-gray-500 leading-relaxed">
            AURAWEAR is a high-fashion digital editorial and premium boutique designed to bring you the finest contemporary clothing, accessories, and home items. Experience state-of-the-art garments and timeless aesthetics.
          </p>
        </div>

        <div>
          <p className="text-sm font-bold tracking-[0.2em] text-gray-900 mb-5 uppercase">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-500 font-medium">
            <li className="hover:text-black hover:translate-x-1 transition-all duration-200 cursor-pointer">Home</li>
            <li className="hover:text-black hover:translate-x-1 transition-all duration-200 cursor-pointer">About us</li>
            <li className="hover:text-black hover:translate-x-1 transition-all duration-200 cursor-pointer">Delivery</li>
            <li className="hover:text-black hover:translate-x-1 transition-all duration-200 cursor-pointer">Privacy policy</li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-bold tracking-[0.2em] text-gray-900 mb-5 uppercase">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-500 font-medium">
            <li className="hover:text-[#c5a880] transition-colors duration-200 cursor-pointer">+1 (800) 555-AURA</li>
            <li className="hover:text-[#c5a880] transition-colors duration-200 cursor-pointer">concierge@aurawear.com</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-100 mt-16">
        <p className="py-6 text-xs text-center text-gray-400 font-medium tracking-wider">
          Copyright 2026 @ aurawear.com - All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
