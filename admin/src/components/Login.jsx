import axios from "axios";
import React, { useState } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const response = await axios.post(backendUrl + "/api/user/admin", {
        email,
        password,
      });
      if (response.data.success) {
        setToken(response.data.token);
        toast.success("Welcome back, Administrator");
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

  return (
    <div className="luxury-mesh-bg min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 w-full">
      {/* Brand presentation above card */}
      <div className="animate-fade-in flex flex-col items-center mb-8 text-center select-none">
        <div className="flex items-center gap-1.5 justify-center">
          <span className="prata-regular text-3xl sm:text-4xl font-normal tracking-[0.25em] text-white">
            AURAWEAR
          </span>
          <span className="w-2 h-2 rounded-full bg-[#c5a880] mb-2 animate-pulse"></span>
        </div>
        <span className="text-[10px] sm:text-xs text-[#c5a880] font-bold tracking-[0.35em] uppercase mt-2">
          Management Suite
        </span>
      </div>

      {/* Login Card */}
      <div className="animate-fade-in glass-card rounded-2xl p-8 sm:p-10 w-full max-w-md shadow-2xl relative overflow-hidden">
        {/* Subtle decorative gold line at the top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#c5a880] to-transparent opacity-70"></div>

        <div className="mb-8">
          <h2 className="text-xl font-bold text-white tracking-wide">Administrator Portal</h2>
          <p className="text-xs text-gray-400 mt-1">Please authenticate with secure credentials.</p>
        </div>

        <form onSubmit={onSubmitHandler} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-300 uppercase tracking-widest block">
              Email Address
            </label>
            <div className="relative">
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="dark-input rounded-xl w-full px-4 py-3.5 outline-none text-sm"
                type="email"
                placeholder="admin@aurawear.com"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-300 uppercase tracking-widest block">
              Password
            </label>
            <div className="relative">
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="dark-input rounded-xl w-full px-4 py-3.5 outline-none text-sm"
                type="password"
                placeholder="••••••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-2 py-4 px-4 rounded-xl text-xs font-bold tracking-widest text-[#0e0d0c] bg-white hover:bg-[#c5a880] hover:text-white transition-all duration-300 shadow-xl ${
              loading ? "opacity-50 cursor-not-allowed" : "transform hover:-translate-y-0.5 active:translate-y-0 hover:shadow-[#c5a880]/20"
            }`}
          >
            {loading ? "AUTHENTICATING..." : "ENTER PORTAL"}
          </button>
        </form>
      </div>
      {/* Footer / security tag */}
      <div className="animate-fade-in mt-8 flex flex-col items-center gap-2 text-gray-500 text-[10px] tracking-wider uppercase font-semibold select-none">
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5 text-gray-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
          </svg>
          Secure Administrator Session
        </div>
        <span className="text-[9px] text-[#c5a880] mt-1 font-bold lowercase tracking-widest normal-case">Made with ♥ by Ritika Tyagi</span>
      </div>    </div>
  );
};

export default Login;
