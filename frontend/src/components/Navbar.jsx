import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  const logOut = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };

  return (
    <div className="flex items-center justify-between py-4 font-medium sticky top-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] mx-[-4px] sm:mx-[-5vw] md:mx-[-7vw] lg:mx-[-9vw]">
      <Link to="/" className="flex items-center gap-1 group">
        <span className="prata-regular text-2xl font-bold tracking-[0.18em] text-gray-900 group-hover:text-[#c5a880] transition-colors duration-300">
          AURAWEAR
        </span>
        <span className="w-2 h-2 rounded-full bg-[#c5a880] self-end mb-1"></span>
      </Link>

      <ul className="hidden sm:flex gap-8 text-xs font-semibold tracking-widest text-gray-600">
        <NavLink to={"/"} className="nav-link-underline hover:text-black py-2">
          <p>HOME</p>
        </NavLink>
        <NavLink
          to={"/collection"}
          className="nav-link-underline hover:text-black py-2"
        >
          <p>COLLECTION</p>
        </NavLink>
        <NavLink to={"/about"} className="nav-link-underline hover:text-black py-2">
          <p>ABOUT</p>
        </NavLink>
        <NavLink to={"/contact"} className="nav-link-underline hover:text-black py-2">
          <p>CONTACT</p>
        </NavLink>
      </ul>

      <div className="flex items-center gap-6">
        <img
          onClick={() => setShowSearch(true)}
          src={assets.search_icon}
          className="w-5 cursor-pointer hover:scale-115 transition-transform duration-200"
          alt="search_icon"
        />

        <div className="group relative">
          <img
            onClick={() => (token ? null : navigate("/login"))}
            src={assets.profile_icon}
            className="w-5 cursor-pointer hover:scale-115 transition-transform duration-200"
            alt="profile_icon"
          />

          {/* Dropdown Menu */}
          {token && (
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-50">
              <div className="flex flex-col gap-2.5 w-40 py-4 px-5 bg-white text-gray-600 rounded-xl border border-gray-100 shadow-xl premium-shadow">
                <p className="cursor-pointer hover:text-[#c5a880] transition-colors font-medium">My Profile</p>
                <p
                  onClick={() => navigate("/orders")}
                  className="cursor-pointer hover:text-[#c5a880] transition-colors font-medium"
                >
                  Orders
                </p>
                <p onClick={logOut} className="cursor-pointer hover:text-[#c5a880] transition-colors font-medium">
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>
        <Link to="/cart" className="relative hover:scale-115 transition-transform duration-200">
          <img src={assets.cart_icon} className="w-5 min-w-5" alt="cart_icon" />
          <p className="absolute right-[-4px] bottom-[-4px] w-4 h-4 flex items-center justify-center bg-[#c5a880] text-white rounded-full text-[8px] font-bold shadow-sm">
            {getCartCount()}
          </p>
        </Link>
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden hover:scale-115 transition-transform duration-200"
          alt="menu_icon"
        />
      </div>

      {/* Sidebar menu for small screen */}
      <div
        className={`fixed top-0 right-0 bottom-0 overflow-hidden bg-white/95 backdrop-blur-md transition-all z-100 shadow-2xl ${
          visible ? "w-full sm:w-80" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-700 h-full">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-5 cursor-pointer border-b border-gray-100 font-semibold"
          >
            <img
              src={assets.dropdown_icon}
              className="h-4 rotate-180"
              alt="dropdown_icon"
            />
            <p className="tracking-widest text-xs">CLOSE</p>
          </div>
          <div className="flex flex-col py-6 px-4 gap-2">
            <NavLink
              onClick={() => setVisible(false)}
              className={({ isActive }) => 
                `py-3 px-6 rounded-lg text-sm tracking-widest font-semibold transition-all ${
                  isActive ? "bg-[#c5a880]/10 text-[#c5a880]" : "hover:bg-gray-50"
                }`
              }
              to="/"
            >
              HOME
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className={({ isActive }) => 
                `py-3 px-6 rounded-lg text-sm tracking-widest font-semibold transition-all ${
                  isActive ? "bg-[#c5a880]/10 text-[#c5a880]" : "hover:bg-gray-50"
                }`
              }
              to="/collection"
            >
              COLLECTION
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className={({ isActive }) => 
                `py-3 px-6 rounded-lg text-sm tracking-widest font-semibold transition-all ${
                  isActive ? "bg-[#c5a880]/10 text-[#c5a880]" : "hover:bg-gray-50"
                }`
              }
              to="/about"
            >
              ABOUT
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className={({ isActive }) => 
                `py-3 px-6 rounded-lg text-sm tracking-widest font-semibold transition-all ${
                  isActive ? "bg-[#c5a880]/10 text-[#c5a880]" : "hover:bg-gray-50"
                }`
              }
              to="/contact"
            >
              CONTACT
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
