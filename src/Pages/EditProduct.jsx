import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import Sidebar from "../components/SideBar";

const UpdateProduct = () => {
const [productName, setProductName] = useState("");
const [productPrice, setProductPrice] = useState("");
const [productImage, setProductImage] = useState("");
const [value, setvalue] = useState({
  name: "",
  price: "",
  image: "",
});
const { id } = useParams();
const token = localStorage.getItem("token");
const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("name", productName);
  formData.append("price", productPrice);

  if (productImage) {
    formData.append("image", productImage);
  } else {
    formData.append("image", "");
  }

  formData.forEach((value, key) => {
    console.log(`${key}: ${value},${typeof value}`);
  });
  useEffect(() => {
    axios
      .get(`https://vica.website/api/items/${id}`)
      .then((response) => {
        setvalue(response.data);
      })
      .catch((erorr) => console.log(erorr));
  }, []);
  console.log("token", token);
  console.log(response.data);
  const response = await axios
    .put(`https://vica.website/api/items/${id}`, value, {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then(function (response) {
      console.log(response.data);
      toast.success("Product Updated successfully.");
    })
    .catch(function (error) {
      console.log(error);
      toast.error("Failed to Updtae product. Please try again.");
    });
};

return (
  <>
  <Sidebar />
  <div className="flex px-72 bg-none h-screen">
    <div className="flex pb-8 w-full max-w-lg gap-3">
      <div className="mb-4 w-2/4">
        <div className="mb-4">
          <h1 className="block text-gray-700 font-bold mb-2 mt-12">
            Create Product
          </h1>
          <label htmlFor="productName">Product Name:</label>
          <input
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
            type="text"
            placeholder="Enter product name"
            value={value.name}
            onChange={(e) => setvalue({ ...value, name: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="mb-2" htmlFor="productPrice">
            Price:
          </label>
          <input
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
            type="text"
            placeholder="Enter product price"
            value={value.price}
            onChange={(e) => setvalue({ ...value, price: e.target.value })}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-gray-50 text-black py-2 px-8 rounded-lg border-gray-100 focus:outline-none focus:shadow-outline"
            type="submit"
            onClick={handleSubmit}
          >
            Update
          </button>
        </div>
      </div>
      <div className="mt-24 w-2/4">
        <div className="flex justify-center items-center w-96">
          <label
            htmlFor="productImage"
            className="flex flex-col justify-center items-center w-full h-48 bg-gray-200 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-300"
          >
            {productImage ? (
              <img
                src={URL.createObjectURL(value.image)}
                alt="Product"
                className="max-h-full object-contain"
              />
            ) : (
              <div className="flex flex-col items-center">
                <svg
                  className="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <p className="mt-2 text-sm text-gray-400 group-hover:text-gray-600">
                  Upload Product Image
                </p>
              </div>
            )}
            <input
              id="productImage"
              type="file"
              className="hidden"
              onChange={(e) =>
                setvalue({ ...value, image: e.target.files[0] })
              }
            />
          </label>
        </div>
      </div>
    </div>
    <ToastContainer />
  </div>
  </>
);
};

export default UpdateProduct;
