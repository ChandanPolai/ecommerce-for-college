import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (sizes.length === 0) {
      toast.error("Please select at least one size.");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice("");
        setSizes([]);
        setBestseller(false);
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
    <div className="space-y-10 animate-fade-in">
      {/* Header */}
      <div className="select-none">
        <h2 className="prata-regular text-2xl md:text-3xl font-normal text-[#0e0d0c]">
          Introduce Product
        </h2>
        <p className="text-xs text-gray-400 mt-1">Deploy high-end garments and assets directly to your customer catalog.</p>
      </div>

      {/* Main card form */}
      <div className="admin-card p-6 md:p-10 max-w-4xl">
        <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-8">
          {/* Images Upload Section */}
          <div className="w-full">
            <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-4">Upload Product Images</p>

            <div className="flex flex-wrap gap-4">
              {/* Image 1 */}
              <label htmlFor="image1" className="cursor-pointer group">
                <div className="w-24 h-32 border border-dashed border-[#e4e4e0] group-hover:border-[#c5a880] rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center transition-all duration-300 relative shadow-sm">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
                    alt="upload_area"
                  />
                  {!image1 && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-[9px] font-bold text-gray-600 tracking-wider uppercase">Slot 1</span>
                    </div>
                  )}
                </div>
                <input
                  onChange={(e) => setImage1(e.target.files[0])}
                  type="file"
                  id="image1"
                  hidden
                  accept="image/*"
                />
              </label>

              {/* Image 2 */}
              <label htmlFor="image2" className="cursor-pointer group">
                <div className="w-24 h-32 border border-dashed border-[#e4e4e0] group-hover:border-[#c5a880] rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center transition-all duration-300 relative shadow-sm">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
                    alt="upload_area"
                  />
                  {!image2 && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-[9px] font-bold text-gray-600 tracking-wider uppercase">Slot 2</span>
                    </div>
                  )}
                </div>
                <input
                  onChange={(e) => setImage2(e.target.files[0])}
                  type="file"
                  id="image2"
                  hidden
                  accept="image/*"
                />
              </label>

              {/* Image 3 */}
              <label htmlFor="image3" className="cursor-pointer group">
                <div className="w-24 h-32 border border-dashed border-[#e4e4e0] group-hover:border-[#c5a880] rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center transition-all duration-300 relative shadow-sm">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
                    alt="upload_area"
                  />
                  {!image3 && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-[9px] font-bold text-gray-600 tracking-wider uppercase">Slot 3</span>
                    </div>
                  )}
                </div>
                <input
                  onChange={(e) => setImage3(e.target.files[0])}
                  type="file"
                  id="image3"
                  hidden
                  accept="image/*"
                />
              </label>

              {/* Image 4 */}
              <label htmlFor="image4" className="cursor-pointer group">
                <div className="w-24 h-32 border border-dashed border-[#e4e4e0] group-hover:border-[#c5a880] rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center transition-all duration-300 relative shadow-sm">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
                    alt="upload_area"
                  />
                  {!image4 && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-[9px] font-bold text-gray-600 tracking-wider uppercase">Slot 4</span>
                    </div>
                  )}
                </div>
                <input
                  onChange={(e) => setImage4(e.target.files[0])}
                  type="file"
                  id="image4"
                  hidden
                  accept="image/*"
                />
              </label>
            </div>
            <p className="text-[9px] text-gray-400 mt-2 tracking-wide font-semibold uppercase">JPEG, PNG formats supported. Up to 4 visual portfolio assets.</p>
          </div>

          {/* Product Name */}
          <div className="w-full">
            <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-2">Garment Nomenclature</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="w-full max-w-[650px] font-semibold text-sm sm:text-base border-[#e4e4e0] focus:border-[#c5a880] rounded-xl"
              type="text"
              placeholder="e.g. Classic Heavyweight Linen Shirt"
              required
            />
          </div>

          {/* Description */}
          <div className="w-full">
            <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-2">Garment Description</p>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              className="w-full max-w-[650px] min-h-[140px] resize-y text-sm border-[#e4e4e0] focus:border-[#c5a880] rounded-xl leading-relaxed"
              placeholder="Describe the fabric weave structure, custom tailoring points, buttons, fits and details..."
              required
            />
          </div>

          {/* Grid Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-[650px]">
            <div>
              <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-2">Category</p>
              <select
                onChange={(e) => setCategory(e.target.value)}
                className="w-full cursor-pointer text-xs font-semibold text-gray-700 tracking-wide bg-white border-[#e4e4e0] focus:border-[#c5a880] p-3.5 rounded-xl outline-none"
              >
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
              </select>
            </div>

            <div>
              <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-2">Silhouette</p>
              <select
                onChange={(e) => setSubCategory(e.target.value)}
                className="w-full cursor-pointer text-xs font-semibold text-gray-700 tracking-wide bg-white border-[#e4e4e0] focus:border-[#c5a880] p-3.5 rounded-xl outline-none"
              >
                <option value="Topwear">Topwear</option>
                <option value="Bottomwear">Bottomwear</option>
                <option value="Winterwear">Winterwear</option>
              </select>
            </div>

            <div>
              <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-2">Price (INR)</p>
              <input
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                className="w-full text-xs font-bold text-gray-800 tracking-wide border-[#e4e4e0] focus:border-[#c5a880] p-3.5 rounded-xl outline-none"
                type="Number"
                placeholder="2499"
                required
              />
            </div>
          </div>

          {/* Size Selector */}
          <div className="w-full">
            <div className="flex items-center justify-between max-w-[650px] mb-3">
              <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">Select Garment Sizes</p>
              {sizes.length > 0 && (
                <span className="text-[8px] bg-[#c5a880]/15 text-[#8c8276] font-bold tracking-widest px-2 py-0.5 rounded uppercase">
                  {sizes.length} Selected
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-3">
              {["S", "M", "L", "XL", "XXL"].map((size) => {
                const isSelected = sizes.includes(size);
                return (
                  <div
                    key={size}
                    onClick={() =>
                      setSizes((prev) =>
                        prev.includes(size)
                          ? prev.filter((item) => item !== size)
                          : [...prev, size]
                      )
                    }
                    className={`w-12 h-12 flex items-center justify-center font-extrabold text-xs rounded-xl cursor-pointer border transition-all duration-300 shadow-sm ${
                      isSelected
                        ? "bg-[#c5a880]/15 border-[#c5a880] text-[#0e0d0c] scale-95 shadow-md shadow-[#c5a880]/10"
                        : "bg-white border-[#e4e4e0] text-gray-400 hover:border-gray-400/70 hover:text-gray-600"
                    }`}
                  >
                    {size}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bestseller Checkbox */}
          <div className="flex items-center gap-3 py-2 cursor-pointer select-none">
            <input
              onChange={() => setBestseller((prev) => !prev)}
              checked={bestseller}
              type="checkbox"
              id="bestseller"
              className="w-5 h-5 rounded-md border-[#e4e4e0] text-[#c5a880] focus:ring-[#c5a880]/30 cursor-pointer"
            />
            <label className="text-xs font-bold tracking-wider text-gray-600 cursor-pointer uppercase" htmlFor="bestseller">
              Mark product as a curated Bestseller
            </label>
          </div>

          {/* Submit */}
          <button
            disabled={loading}
            className={`admin-btn w-full sm:w-48 py-4 uppercase tracking-widest text-[10px] font-extrabold shadow-md ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            type="submit"
          >
            {loading ? "DEPLOYING SKU..." : "DEPLOY PRODUCT"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add;
