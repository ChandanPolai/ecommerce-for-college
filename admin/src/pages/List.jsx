import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");

      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
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
    <div className="space-y-8">
      {/* Analytics / Quick Stats Widget */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="admin-card p-6 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400 tracking-wider uppercase">Total Products</p>
            <h3 className="text-3xl font-extrabold text-gray-900 mt-1">{totalProducts}</h3>
          </div>
          <div className="p-3 bg-[#c5a880]/10 text-[#c5a880] rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
            </svg>
          </div>
        </div>

        <div className="admin-card p-6 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400 tracking-wider uppercase">Bestsellers</p>
            <h3 className="text-3xl font-extrabold text-gray-900 mt-1">{bestsellerCount}</h3>
          </div>
          <div className="p-3 bg-[#c5a880]/10 text-[#c5a880] rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499c.195-.39.771-.39.966 0l2.36 4.777 5.27.766c.425.062.595.584.288.885l-3.818 3.72 1.057 5.253c.085.426-.363.752-.746.552L12 14.752l-4.717 2.482c-.383.201-.83-.126-.746-.552l1.057-5.253-3.818-3.72c-.307-.3-.137-.822.288-.885l5.27-.766 2.36-4.777z" />
            </svg>
          </div>
        </div>

        <div className="admin-card p-6 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400 tracking-wider uppercase">Average Price</p>
            <h3 className="text-3xl font-extrabold text-gray-900 mt-1">{currency}{avgPrice}</h3>
          </div>
          <div className="p-3 bg-[#c5a880]/10 text-[#c5a880] rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.22.029a2.25 2.25 0 001.779-.279.13.13 0 01.125 0 2.25 2.25 0 001.779.28l.22-.03m-3-12h.008v.008H9V5.25m3 0h.008v.008H12V5.25M15 6v12m-6-6h6" />
            </svg>
          </div>
        </div>
      </div>

      <div className="admin-card p-6">
        <p className="text-lg font-bold text-gray-900 mb-6">Catalog List</p>

        <div className="flex flex-col gap-3">
          {/* -------- List Table Title -------- */}
          <div className="hidden md:grid grid-cols-[1.2fr_3fr_1.5fr_1.2fr_1fr] items-center py-3.5 px-5 bg-gray-50 border-b border-gray-100 text-xs font-bold tracking-widest text-gray-400 uppercase rounded-xl">
            <span>Product</span>
            <span>Name</span>
            <span>Category</span>
            <span>Price</span>
            <span className="text-center">Action</span>
          </div>

          {/* -------- Product List -------- */}
          {list.map((item, index) => (
            <div
              className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1.2fr_3fr_1.5fr_1.2fr_1fr] items-center gap-4 py-3 px-5 border border-gray-100/60 rounded-xl text-sm font-medium hover:bg-gray-50/50 hover:border-gray-200 transition-all duration-300"
              key={index}
            >
              <div className="w-14 h-16 rounded-lg overflow-hidden bg-gray-50 border border-gray-100 shrink-0">
                <img className="w-full h-full object-cover" src={item.image[0]} alt={item.name} />
              </div>
              <p className="text-gray-900 truncate font-semibold">{item.name}</p>
              <span className="text-gray-500 bg-gray-100/80 px-2.5 py-1 rounded-md text-xs self-start md:self-auto w-max">{item.category} / {item.subCategory}</span>
              <p className="text-gray-900 font-bold">
                {currency}
                {item.price.toLocaleString()}
              </p>
              <div className="text-right md:text-center flex justify-end md:justify-center">
                <button
                  onClick={() => removeProduct(item._id)}
                  className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Remove Product"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default List;
