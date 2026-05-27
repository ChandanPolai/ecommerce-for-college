import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }

    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status: event.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-900">Orders Management</h3>
        <span className="bg-gray-100 text-gray-700 text-xs font-bold px-3 py-1.5 rounded-lg border border-gray-200 uppercase tracking-wider">
          Total: {orders.length}
        </span>
      </div>

      <div className="flex flex-col gap-4">
        {orders.map((order, index) => (
          <div
            className="admin-card p-6 md:p-8 grid grid-cols-1 sm:grid-cols-[0.4fr_2fr_1.2fr_1fr_1fr] gap-6 items-start text-sm text-gray-600 hover:border-gray-300 transition-all duration-300"
            key={index}
          >
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-8 h-8 text-[#c5a880]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
              </svg>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                {order.items.map((item, itemIdx) => (
                  <p className="text-gray-900 font-semibold" key={itemIdx}>
                    {item.name} <span className="text-[#c5a880] text-xs font-bold ml-1">x {item.quantity}</span> <span className="text-gray-400 text-xs font-medium ml-2 bg-gray-50 px-2 py-0.5 rounded border border-gray-100">{item.size}</span>
                  </p>
                ))}
              </div>
              <div>
                <p className="font-bold text-gray-900">
                  {order.address.firstName + " " + order.address.lastName}
                </p>
                <div className="text-xs text-gray-500 mt-1 leading-relaxed">
                  <p>{order.address.street}</p>
                  <p>
                    {order.address.city +
                      ", " +
                      order.address.state +
                      ", " +
                      order.address.country +
                      " - " +
                      order.address.zipcode}
                  </p>
                </div>
              </div>
              <p className="text-xs font-bold text-gray-800 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-gray-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.802-5.14-4.117-6.942-6.942l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25z" />
                </svg>
                {order.address.phone}
              </p>
            </div>

            <div className="space-y-2 text-xs font-medium">
              <p className="text-sm font-bold text-gray-900">
                Items: {order.items.reduce((acc, item) => acc + item.quantity, 0)}
              </p>
              <div className="mt-2 space-y-1">
                <p className="flex items-center gap-1.5 text-gray-500">
                  Method: <span className="text-gray-900 font-bold bg-gray-100 px-2 py-0.5 rounded">{order.paymentMethod}</span>
                </p>
                <p className="flex items-center gap-1.5 text-gray-500">
                  Payment:{" "}
                  <span className={`font-bold px-2 py-0.5 rounded ${order.payment ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-amber-50 text-amber-600 border border-amber-100"}`}>
                    {order.payment ? "Done" : "Pending"}
                  </span>
                </p>
                <p className="flex items-center gap-1.5 text-gray-500">
                  Date: <span className="text-gray-900 font-semibold">{new Date(order.date).toLocaleDateString()}</span>
                </p>
              </div>
            </div>

            <p className="text-base font-extrabold text-gray-900 flex items-center gap-0.5">
              <span className="text-xs font-normal text-gray-400">{currency}</span>
              {order.amount.toLocaleString()}
            </p>

            <select
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status}
              className="p-3 font-semibold text-xs tracking-wider uppercase border border-gray-200 rounded-xl bg-white focus:border-[#c5a880] focus:ring-2 focus:ring-[#c5a880]/15 outline-none cursor-pointer w-full"
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
