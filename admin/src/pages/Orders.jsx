import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }

    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
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
        toast.success("Order status updated successfully");
        await fetchAllOrders();
      } else {
        toast.error(response.data.message);
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
    <div className="space-y-10 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 select-none">
        <div>
          <h2 className="prata-regular text-2xl md:text-3xl font-normal text-[#0e0d0c]">
            Orders Logistics
          </h2>
          <p className="text-xs text-gray-400 mt-1">Audit customer purchase transactions and govern logistics fulfillment.</p>
        </div>
        <button
          onClick={fetchAllOrders}
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

      {/* Orders Catalog Container */}
      <div className="flex flex-col gap-5">
        {orders.length === 0 ? (
          <div className="admin-card p-12 text-center text-gray-400 text-xs font-semibold tracking-wider uppercase select-none">
            {loading ? "Accessing logistics registry..." : "No client orders recorded."}
          </div>
        ) : (
          orders.map((order, index) => (
            <div
              className="admin-card p-6 md:p-8 grid grid-cols-1 sm:grid-cols-[0.5fr_2.5fr_1.8fr_1.2fr_1.5fr] gap-6 items-start text-sm text-gray-600 transition-all duration-300 relative overflow-hidden"
              key={index}
            >
              {/* Subtle top indicator bar based on status */}
              <div className={`absolute top-0 left-0 right-0 h-1 opacity-70 bg-gradient-to-r ${
                order.status === "Delivered"
                  ? "from-transparent via-emerald-500 to-transparent"
                  : order.status === "Out for delivery" || order.status === "Shipped"
                  ? "from-transparent via-blue-500 to-transparent"
                  : "from-transparent via-[#c5a880] to-transparent"
              }`}></div>

              {/* Box Icon Graphic on Left */}
              <div className="p-3.5 bg-gray-50/80 rounded-2xl border border-gray-100/70 flex items-center justify-center shrink-0 w-14 h-14 md:w-16 md:h-16 shadow-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-7 h-7 text-[#c5a880]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
                  />
                </svg>
              </div>

              {/* Items details & Shipping Address */}
              <div className="space-y-4 pr-2">
                <div className="space-y-1.5">
                  {order.items.map((item, itemIdx) => (
                    <p className="text-gray-900 font-bold tracking-wide text-[13px] sm:text-sm" key={itemIdx}>
                      {item.name}
                      <span className="text-[#8c8276] text-xs font-black ml-2 bg-[#c5a880]/15 px-2 py-0.5 rounded-md">
                        × {item.quantity}
                      </span>
                      <span className="text-gray-400 text-[10px] font-extrabold ml-2 bg-gray-50 border border-gray-200 px-2 py-0.5 rounded uppercase tracking-wider">
                        {item.size}
                      </span>
                    </p>
                  ))}
                </div>

                <div className="border-t border-[#f1f1f0] pt-3.5 space-y-1">
                  <p className="font-extrabold text-gray-900 tracking-wide text-xs">
                    SHIPPING DOSSIER:
                  </p>
                  <p className="font-bold text-gray-700 text-xs mt-1">
                    {order.address.firstName + " " + order.address.lastName}
                  </p>
                  <div className="text-[11px] text-gray-400 font-semibold leading-relaxed uppercase tracking-wider">
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

                <p className="text-[11px] font-extrabold text-gray-700 flex items-center gap-1.5 pt-1 select-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.2}
                    stroke="currentColor"
                    className="w-3.5 h-3.5 text-[#c5a880]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.802-5.14-4.117-6.942-6.942l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25z"
                    />
                  </svg>
                  {order.address.phone}
                </p>
              </div>

              {/* Quantities, Payment Details */}
              <div className="space-y-3">
                <p className="text-xs font-bold text-gray-400 tracking-widest uppercase">Metadata</p>
                <div className="space-y-1.5 text-[11px] font-bold">
                  <p className="flex items-center gap-2 text-gray-500 uppercase tracking-wider">
                    Units:{" "}
                    <span className="text-[#0e0d0c] font-extrabold">
                      {order.items.reduce((acc, item) => acc + item.quantity, 0)}
                    </span>
                  </p>
                  <p className="flex items-center gap-2 text-gray-500 uppercase tracking-wider">
                    Gateway:{" "}
                    <span className="text-[#8c8276] font-extrabold bg-[#fcfcfb] border border-[#e4e4e0] px-2 py-0.5 rounded">
                      {order.paymentMethod}
                    </span>
                  </p>
                  <p className="flex items-center gap-2 text-gray-500 uppercase tracking-wider">
                    Status:{" "}
                    <span
                      className={`font-black px-2 py-0.5 rounded uppercase ${
                        order.payment
                          ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                          : "bg-amber-50 text-[#8c8276] border border-amber-100"
                      }`}
                    >
                      {order.payment ? "PAID" : "PENDING"}
                    </span>
                  </p>
                  <p className="flex items-center gap-2 text-gray-500 uppercase tracking-wider">
                    Date:{" "}
                    <span className="text-[#0e0d0c] font-semibold">
                      {new Date(order.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </p>
                </div>
              </div>

              {/* Price Details */}
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">Order Value</p>
                <p className="text-lg font-black text-[#0e0d0c] flex items-center gap-0.5">
                  <span className="text-xs font-normal text-gray-400">{currency}</span>
                  {order.amount.toLocaleString()}
                </p>
              </div>

              {/* Status Select dropdown */}
              <div className="space-y-2 w-full">
                <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">Logistics State</p>
                <select
                  onChange={(event) => statusHandler(event, order._id)}
                  value={order.status}
                  className="p-3.5 font-bold text-[10px] tracking-widest uppercase border border-[#e4e4e0] rounded-xl bg-white focus:border-[#c5a880] focus:ring-4 focus:ring-[#c5a880]/10 outline-none cursor-pointer w-full text-gray-700"
                >
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
