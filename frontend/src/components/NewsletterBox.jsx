import React from "react";

const NewsletterBox = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div className="text-center py-12 px-6 bg-[#faf6f0] rounded-3xl my-16 border border-[#eedfc9]/20 premium-shadow">
      <p className="prata-regular text-2xl sm:text-3xl font-bold text-gray-900">
        Join the AURAWEAR Club
      </p>
      <p className="text-gray-500 mt-3 text-sm max-w-md mx-auto">
        Subscribe to our exclusive newsletter to receive early access to new collection arrivals, private sales, and a 20% discount on your first order.
      </p>
      <form
        onSubmit={onSubmitHandler}
        className="w-full sm:w-2/3 md:w-1/2 flex items-center bg-white mx-auto my-8 rounded-xl border border-gray-100 shadow-sm overflow-hidden"
      >
        <input
          className="w-full pl-6 pr-4 py-4 outline-none text-sm text-gray-700 bg-transparent"
          type="email"
          placeholder="Enter your premium email address"
          required
        />
        <button
          type="submit"
          className="bg-black hover:bg-[#c5a880] text-white text-xs font-bold tracking-widest px-8 py-5 transition-colors duration-300 shrink-0"
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default NewsletterBox;
