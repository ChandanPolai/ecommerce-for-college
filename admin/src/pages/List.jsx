import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchList = async () => {
    try {
      setLoading(true);
      const response = await axios.get(backendUrl + "/api/product/list");

      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const removeProduct = async (id) => {
    if (window.confirm("Are you sure you want to remove this product from catalog?")) {
      try {
        const response = await axios.post(
          backendUrl + "/api/product/remove",
          { id },
          { headers: { token } }
        );
        if (response.data.success) {
          toast.success(response.data.message);
          await fetchList();
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  // Compute Quick Stats
  const totalProducts = list.length;
  const bestsellerCount = list.filter((item) => item.bestseller).length;
  const avgPrice =
    list.length > 0
      ? Math.round(list.reduce((acc, item) => acc + item.price, 0) / list.length)
      : 0;

  return (
    <div className="space-y-10 animate-fade-in">
      {/* Catalog Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 select-none">
        <div>
          <h2 className="prata-regular text-2xl md:text-3xl font-normal text-[#0e0d0c]">
            Catalog Directory
          </h2>
          <p className="text-xs text-gray-400 mt-1">Curate and manage your luxury product inventory.</p>
        </div>
        <button
          onClick={fetchList}
          disabled={loading}
          className="flex items-center gap-2 bg-[#fcfcfb] border border-[#e4e4e0] hover:border-gray-400 text-gray-600 px-4 py-2 rounded-xl text-xs font-semibold tracking-wider transition-all duration-300 self-start sm:self-auto shadow-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className={`w-3.5 h-3.5 ${loading ? "animate-spin text-[#c5a880]" : ""}`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
          {loading ? "REFRESHING" : "REFRESH"}
        </button>
      </div>

      {/* Analytics / Quick Stats Widget */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 select-none">
        <div className="admin-card p-6 flex items-center justify-between transition-all duration-300">
          <div>
            <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">Total Catalog</p>
            <h3 className="text-3xl font-extrabold text-[#0e0d0c] mt-2">{totalProducts}</h3>
            <p className="text-[10px] text-[#c5a880] font-bold mt-1 tracking-wider uppercase">Active SKUs</p>
          </div>
          <div className="p-3.5 bg-[#c5a880]/10 text-[#c5a880] rounded-2xl shadow-sm border border-[#c5a880]/5">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
            </svg>
          </div>
        </div>

        <div className="admin-card p-6 flex items-center justify-between transition-all duration-300">
          <div>
            <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">Bestsellers</p>
            <h3 className="text-3xl font-extrabold text-[#0e0d0c] mt-2">{bestsellerCount}</h3>
            <p className="text-[10px] text-emerald-500 font-bold mt-1 tracking-wider uppercase">Featured Items</p>
          </div>
          <div className="p-3.5 bg-[#c5a880]/10 text-[#c5a880] rounded-2xl shadow-sm border border-[#c5a880]/5">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499c.195-.39.771-.39.966 0l2.36 4.777 5.27.766c.425.062.595.584.288.885l-3.818 3.72 1.057 5.253c.085.426-.363.752-.746.552L12 14.752l-4.717 2.482c-.383.201-.83-.126-.746-.552l1.057-5.253-3.818-3.72c-.307-.3-.137-.822.288-.885l5.27-.766 2.36-4.777z" />
            </svg>
          </div>
        </div>

        <div className="admin-card p-6 flex items-center justify-between transition-all duration-300">
          <div>
            <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">Average Price</p>
            <h3 className="text-3xl font-extrabold text-[#0e0d0c] mt-2">
              {currency}
              {avgPrice}
            </h3>
            <p className="text-[10px] text-gray-400 font-bold mt-1 tracking-wider uppercase">Portfolio Value</p>
          </div>
          <div className="p-3.5 bg-[#c5a880]/10 text-[#c5a880] rounded-2xl shadow-sm border border-[#c5a880]/5">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.22.029a2.25 2.25 0 001.779-.279.13.13 0 01.125 0 2.25 2.25 0 001.779.28l.22-.03m-3-12h.008v.008H9V5.25m3 0h.008v.008H12V5.25M15 6v12m-6-6h6" />
            </svg>
          </div>
        </div>
      </div>

      {/* Catalog Table Card */}
      <div className="admin-card p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm font-bold text-[#0e0d0c] tracking-widest uppercase">Inventory List</p>
          <span className="text-[10px] bg-gray-50 border border-gray-100 text-gray-500 font-bold tracking-widest px-2.5 py-1 rounded-md uppercase">
            {list.length} Items Found
          </span>
        </div>

        <div className="flex flex-col gap-3">
          {/* Table Headers (Hidden on Mobile) */}
          <div className="hidden md:grid grid-cols-[1fr_3fr_1.8fr_1.2fr_1fr] items-center py-4 px-6 bg-[#fcfcfb] border border-[#f1f1f0] text-[10px] font-extrabold tracking-[0.2em] text-[#8c8276] uppercase rounded-xl">
            <span>Image</span>
            <span>Product Detail</span>
            <span>Category Badge</span>
            <span>Price</span>
            <span className="text-center">Curate</span>
          </div>

          {/* Catalog Row items */}
          {list.length === 0 ? (
            <div className="text-center py-12 text-gray-400 text-xs font-semibold tracking-wider">
              {loading ? "Loading product catalog..." : "No items found in catalog."}
            </div>
          ) : (
            list.map((item, index) => (
              <div
                className="grid grid-cols-[1fr_3.5fr_1fr] md:grid-cols-[1fr_3fr_1.8fr_1.2fr_1fr] items-center gap-4 py-4 px-6 border border-[#f1f1f0] rounded-2xl hover:border-gray-300/80 hover:bg-[#fcfcfb]/30 transition-all duration-300"
                key={index}
              >
                {/* Product Image */}
                <div className="w-14 h-16 sm:w-16 sm:h-20 rounded-xl overflow-hidden bg-gray-50 border border-gray-100/80 shrink-0">
                  <img
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                    src={item.image[0]}
                    alt={item.name}
                  />
                </div>

                {/* Details */}
                <div className="space-y-1 pr-4">
                  <p className="text-gray-900 font-bold text-sm sm:text-base tracking-wide truncate">{item.name}</p>
                  <p className="text-gray-400 text-[10px] tracking-wider uppercase font-semibold">SKU ID: {item._id.slice(-8).toUpperCase()}</p>
                  {item.bestseller && (
                    <span className="inline-block bg-[#c5a880]/15 text-[#8c8276] font-bold text-[8px] tracking-widest px-2 py-0.5 rounded-md uppercase">
                      Bestseller
                    </span>
                  )}
                </div>

                {/* Category Pill */}
                <div className="hidden md:block">
                  <span className="text-[#8c8276] bg-[#fcfcfb] border border-[#e4e4e0] px-3 py-1.5 rounded-lg text-[9px] font-extrabold tracking-widest uppercase">
                    {item.category} • {item.subCategory}
                  </span>
                </div>

                {/* Price */}
                <div>
                  <p className="text-[#0e0d0c] font-black text-sm sm:text-base">
                    {currency}
                    {item.price.toLocaleString()}
                  </p>
                </div>

                {/* Delete / Curate Button */}
                <div className="text-right md:text-center flex justify-end md:justify-center">
                  <button
                    onClick={() => removeProduct(item._id)}
                    className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50/70 border border-[#e4e4e0] hover:border-red-200 rounded-xl transition-all duration-300 shadow-sm"
                    title="Remove Product"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-4.5 h-4.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default List;
