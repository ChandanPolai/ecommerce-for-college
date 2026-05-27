import React from "react";
import { assets } from "../assets/assets";

const Hero = () => {
  return (
    <div className="flex flex-col sm:flex-row bg-[#faf6f0] rounded-3xl overflow-hidden my-8 border border-[#eedfc9]/30 premium-shadow group">
      {/* Hero Left Side */}
      <div className="w-full sm:w-1/2 flex items-center justify-center py-16 sm:py-0 px-8 lg:px-16">
        <div className="text-gray-800">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 md:w-11 h-[1.5px] bg-[#c5a880]"></span>
            <p className="font-semibold text-xs tracking-[0.25em] text-[#c5a880] uppercase">OUR BESTSELLERS</p>
          </div>
          <h1 className="prata-regular text-4xl sm:py-3 lg:text-6xl leading-[1.15] text-[#111111] font-bold">
            Latest <br />
            <span className="text-[#c5a880]">Arrivals</span>
          </h1>
          <div className="flex items-center gap-2 mt-6 cursor-pointer group/btn inline-flex">
            <p className="font-bold text-xs tracking-[0.25em] text-gray-900 border-b-2 border-gray-900 pb-1 group-hover/btn:border-[#c5a880] group-hover/btn:text-[#c5a880] transition-colors duration-300">
              SHOP COLLECTION
            </p>
          </div>
        </div>
      </div>

      {/* Hero Right Side */}
      <div className="w-full sm:w-1/2 overflow-hidden h-[300px] sm:h-[450px] lg:h-[520px]">
        <img 
          className="w-full h-full object-cover transition-transform duration-[2s] cubic-bezier(0.4, 0, 0.2, 1) group-hover:scale-105" 
          src={assets.hero_img} 
          alt="hero_img" 
        />
      </div>
    </div>
  );
};

export default Hero;
