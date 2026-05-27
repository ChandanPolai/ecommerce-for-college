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

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
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
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="admin-card p-6 md:p-10">
      <h3 className="text-xl font-bold text-gray-900 mb-8">Add New Product</h3>

      <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-6">
        <div className="w-full">
          <p className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">Upload Product Images</p>

          <div className="flex flex-wrap gap-4">
            <label htmlFor="image1" className="cursor-pointer">
              <div className="w-24 h-28 border border-dashed border-gray-300 rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center hover:border-[#c5a880] transition-colors">
                <img
                  className="w-full h-full object-cover"
                  src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
                  alt="upload_area"
                />
              </div>
              <input
                onChange={(e) => setImage1(e.target.files[0])}
                type="file"
                id="image1"
                hidden
              />
            </label>
            <label htmlFor="image2" className="cursor-pointer">
              <div className="w-24 h-28 border border-dashed border-gray-300 rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center hover:border-[#c5a880] transition-colors">
                <img
                  className="w-full h-full object-cover"
                  src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
                  alt="upload_area"
                />
              </div>
              <input
                onChange={(e) => setImage2(e.target.files[0])}
                type="file"
                id="image2"
                hidden
              />
            </label>
            <label htmlFor="image3" className="cursor-pointer">
              <div className="w-24 h-28 border border-dashed border-gray-300 rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center hover:border-[#c5a880] transition-colors">
                <img
                  className="w-full h-full object-cover"
                  src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
                  alt="upload_area"
                />
              </div>
              <input
                onChange={(e) => setImage3(e.target.files[0])}
                type="file"
                id="image3"
                hidden
              />
            </label>
            <label htmlFor="image4" className="cursor-pointer">
              <div className="w-24 h-28 border border-dashed border-gray-300 rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center hover:border-[#c5a880] transition-colors">
                <img
                  className="w-full h-full object-cover"
                  src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
                  alt="upload_area"
                />
              </div>
              <input
                onChange={(e) => setImage4(e.target.files[0])}
                type="file"
                id="image4"
                hidden
              />
            </label>
          </div>
        </div>

        <div className="w-full">
          <p className="text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Product Name</p>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="w-full max-w-[600px]"
            type="text"
            placeholder="e.g. Premium Heavyweight Chore Coat"
            required
          />
        </div>

        <div className="w-full">
          <p className="text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Product Description</p>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className="w-full max-w-[600px] min-h-[120px] resize-y"
            placeholder="Describe the fabric quality, styling details, sizes and fits..."
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-[600px]">
          <div>
            <p className="text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Category</p>
            <select
              onChange={(e) => setCategory(e.target.value)}
              className="w-full cursor-pointer"
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>

          <div>
            <p className="text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Sub Category</p>
            <select
              onChange={(e) => setSubCategory(e.target.value)}
              className="w-full cursor-pointer"
            >
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>

          <div>
            <p className="text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Price (INR)</p>
            <input
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              className="w-full"
              type="Number"
              placeholder="1299"
              required
            />
          </div>
        </div>

        <div className="w-full">
          <p className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">Product Sizes</p>
          <div className="flex flex-wrap gap-2.5">
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
                  className={`w-12 h-12 flex items-center justify-center font-bold text-sm rounded-xl cursor-pointer border transition-all duration-300 ${
                    isSelected
                      ? "bg-[#c5a880]/15 border-[#c5a880] text-[#111111]"
                      : "bg-white border-gray-200 text-gray-500 hover:border-gray-300"
                  }`}
                >
                  {size}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-3 py-2 cursor-pointer select-none">
          <input
            onChange={() => setBestseller((prev) => !prev)}
            checked={bestseller}
            type="checkbox"
            id="bestseller"
            className="w-5 h-5 rounded-md border-gray-300 text-[#c5a880] focus:ring-[#c5a880] cursor-pointer"
          />
          <label className="text-sm font-semibold text-gray-700 cursor-pointer" htmlFor="bestseller">
            Mark as Bestseller selection
          </label>
        </div>

        <button className="admin-btn w-full sm:w-40 py-3.5 mt-4 uppercase tracking-widest text-xs font-extrabold" type="submit">
          ADD PRODUCT
        </button>
      </form>
    </div>
  );
};

export default Add;
