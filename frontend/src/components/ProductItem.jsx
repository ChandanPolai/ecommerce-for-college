import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100/60 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500 flex flex-col h-full">
      <Link className="text-gray-700 cursor-pointer flex flex-col h-full" to={`/product/${id}`}>
        <div className="overflow-hidden bg-gray-50 relative aspect-[4/5] shrink-0">
          <img
            className="w-full h-full object-cover transition-transform duration-[1.2s] cubic-bezier(0.4, 0, 0.2, 1) group-hover:scale-106"
            src={image[0]}
            alt={name}
          />
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="bg-white/95 backdrop-blur-sm text-gray-900 text-[10px] tracking-[0.2em] font-bold px-4 py-2.5 rounded-lg shadow-md transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              VIEW DETAILS
            </span>
          </div>
        </div>
        <div className="p-4 flex flex-col flex-grow justify-between">
          <p className="text-xs font-semibold text-gray-800 line-clamp-2 min-h-[2rem] leading-relaxed group-hover:text-[#c5a880] transition-colors duration-300">
            {name}
          </p>
          <p className="text-sm font-bold text-gray-900 mt-2 flex items-center gap-0.5">
            <span className="text-xs font-normal text-gray-400">{currency}</span>
            {price.toLocaleString()}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ProductItem;
