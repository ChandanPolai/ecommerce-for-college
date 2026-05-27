import React from "react";

const Navbar = ({ setToken }) => {
  return (
    <div className="flex items-center py-4.5 px-6 md:px-[6%] justify-between sticky top-0 bg-white/80 backdrop-blur-lg z-50 border-b border-[#f1f1f0] shadow-sm select-none">
      <div className="flex items-center gap-2 group cursor-pointer">
        <div className="flex items-baseline gap-1">
          <span className="prata-regular text-xl md:text-2xl font-normal tracking-[0.2em] text-[#0e0d0c]">
            AURAWEAR
          </span>
          <span className="w-2 h-2 rounded-full bg-[#c5a880] animate-pulse"></span>
        </div>
        <span className="hidden sm:inline-block bg-[#fcfcfb] border border-[#e4e4e0] text-[#8c8276] text-[8px] font-extrabold tracking-[0.2em] px-2.5 py-1.5 rounded-lg uppercase ml-3">
          Management Suite
        </span>
      </div>

      <button
        onClick={() => {
          setToken("");
        }}
        className="bg-[#0e0d0c] hover:bg-[#c5a880] text-white hover:text-white px-5 py-2.5 rounded-xl text-[10px] font-bold tracking-widest transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-[#c5a880]/15 transform hover:-translate-y-0.5 active:translate-y-0"
      >
        LOGOUT
      </button>
    </div>
  );
};

export default Navbar;
