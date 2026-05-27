import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-[18%] lg:w-[15%] min-h-[calc(100vh-73px)] border-r border-[#f1f1f0] bg-white py-8 px-3 md:px-4 flex flex-col justify-between select-none shrink-0">
      <div className="flex flex-col gap-3">
        {/* Add Items */}
        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-3.5 px-4.5 py-4 rounded-xl border transition-all duration-300 font-bold tracking-widest text-[10px] md:text-xs uppercase ${
              isActive
                ? "bg-[#c5a880]/10 border-[#c5a880]/20 text-[#0e0d0c] shadow-sm shadow-[#c5a880]/5"
                : "border-transparent text-gray-400 hover:bg-[#fcfcfb] hover:text-gray-700"
            }`
          }
          to="/add"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.2}
            stroke="currentColor"
            className="w-4.5 h-4.5 md:w-5 md:h-5 shrink-0"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          <p className="hidden md:block">Add Items</p>
        </NavLink>

        {/* List Items */}
        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-3.5 px-4.5 py-4 rounded-xl border transition-all duration-300 font-bold tracking-widest text-[10px] md:text-xs uppercase ${
              isActive
                ? "bg-[#c5a880]/10 border-[#c5a880]/20 text-[#0e0d0c] shadow-sm shadow-[#c5a880]/5"
                : "border-transparent text-gray-400 hover:bg-[#fcfcfb] hover:text-gray-700"
            }`
          }
          to="/list"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.2}
            stroke="currentColor"
            className="w-4.5 h-4.5 md:w-5 md:h-5 shrink-0"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
            />
          </svg>
          <p className="hidden md:block">List Items</p>
        </NavLink>

        {/* Orders */}
        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-3.5 px-4.5 py-4 rounded-xl border transition-all duration-300 font-bold tracking-widest text-[10px] md:text-xs uppercase ${
              isActive
                ? "bg-[#c5a880]/10 border-[#c5a880]/20 text-[#0e0d0c] shadow-sm shadow-[#c5a880]/5"
                : "border-transparent text-gray-400 hover:bg-[#fcfcfb] hover:text-gray-700"
            }`
          }
          to="/orders"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.2}
            stroke="currentColor"
            className="w-4.5 h-4.5 md:w-5 md:h-5 shrink-0"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.129-1.125V11.25M3 14.25h16.5a1.5 1.5 0 0 0 1.5-1.5V6.75A1.5 1.5 0 0 0 19.5 5.25H3.75A1.5 1.5 0 0 0 2.25 6.75v5.25A1.5 1.5 0 0 0 3 14.25Z"
            />
          </svg>
          <p className="hidden md:block">Orders</p>
        </NavLink>
      </div>

      {/* Luxury Footer metadata in sidebar */}
      <div className="px-4.5 py-4 border-t border-[#f1f1f0]/70 hidden md:block select-none">
        <p className="text-[9px] font-bold text-gray-400 tracking-wider">AURAWEAR v1.0</p>
        <p className="text-[8px] text-gray-300 mt-1 uppercase tracking-widest">© 2026 Admin Portal</p>
        <p className="text-[7.5px] text-[#c5a880] mt-2 font-bold tracking-widest uppercase">Made by Ritika Tyagi</p>
      </div>
    </div>
  );
};

export default Sidebar;
