import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomModal from "../components/CustomModal";
import axios from "axios";
import Sidebar from "../components/SideBar";
const token = localStorage.getItem("token");
const ProductGrid = () => {
const [products, setProducts] = useState([
  {
    id: 1,
    image: "src/assets/img/2.png",
    title: "Apple Watch Series 4",
    price: "$120.00",
  },
  {
    id: 2,
    image: "src/assets/img/2.png",
    title: "Apple Watch Series 4",
    price: "$120.00",
  },
  {
    id: 3,
    image: "src/assets/img/2.png",
    title: "Apple Watch Series 4",
    price: "$120.00",
  },
  {
    id: 4,
    image: "src/assets/img/2.png",
    title: "Apple Watch Series 4",
    price: "$120.00",
  },
  {
    id: 5,
    image: "src/assets/img/2.png",
    title: "samsung Watch Series 5",
    price: "$120.00",
  },
  {
    id: 6,
    image: "src/assets/img/2.png",
    title: "iphone Watch Series 4",
    price: "$120.00",
  },
  {
    id: 7,
    image: "src/assets/img/2.png",
    title: "Apple Watch Series 10",
    price: "$120.00",
  },
  {
    id: 8,
    image: "src/assets/img/2.png",
    title: "Apple Watch Series 4",
    price: "$120.00",
  },
]);
const { id } = useParams();
const [isDarkMode, setIsDarkMode] = useState(false);
const [searchTerm, setSearchTerm] = useState('');
const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedProduct, setSelectedProduct] = useState(null);
const toggleTheme = () => {
  setIsDarkMode(!isDarkMode);
  document.body.classList.toggle("dark");
};
useEffect(() => {
  const response = axios
    .get("https://vica.website/api/items", {
      headers: {
        "Content-Type": "multipart/form-data",
        'Accept': "application/json",
        'Authorization': `Bearer ${token}`,
      },
    })
    .then(function (response) {
      console.log(response.data);
      const f = response.data;
      for (let i = 0; i < f.length; i++) {
        const product = f[i];
        setProducts((prevProducts) => [
          ...prevProducts,
          {
            id: product.id,
            image: product.image_url,
            title: product.name,
            price: `$${product.price}`,
          },
        ]);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}, []);
const openModal = (product) => {
  setSelectedProduct(product);
  setIsModalOpen(true);
};

const closeModal = () => {
  setIsModalOpen(false);
  setSelectedProduct(null);
};

const handleDeleteProduct = (id) => {
  axios.delete(`https://vica.website/api/items/${id}`)
  .then(()=>{
    setProducts(products.filter((p) => p.id !== selectedProduct.id));
    toast.success(`Deleted ${selectedProduct.title}`);
    closeModal();
  })
  .catch(error=>{
    console.log(error);
  });
};
 
const filteredProducts = products.filter(product =>
  product.title.toLowerCase().includes(searchTerm.toLowerCase())
);

return (
  <>
   <Sidebar />
    <ToastContainer />
    <CustomModal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      onConfirm={() => handleDeleteProduct(selectedProduct.id)} // Corrected 'selectProduct' to 'selectedProduct'
    />
    <div className="px-64 py-3">
      <input
        type="text"
        className={`border-2 border-#D5D5D5 focus:border-gray-100 rounded-full p-1 w-96
          ${isDarkMode ? 'bg-gray-700 dark:border-gray-600' : 'bg-gray-100'}`}
        placeholder="search a product.."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
    <div className="container pl-72 pr-5 py-6 bg-none w-full">
      <div
        className={`mb-6 flex justify-between ${
          isDarkMode ? "dark:bg-gray-800" : ""
        }`}
      >
        <h1
          className={`font-bold text-black-70 ${
            isDarkMode ? "text-white" : ""
          }`}
        >
          All Products
        </h1>
        <Link to="/CreateProduct">
          <button
            type="submit"
            className="flex gap-3 items-center w-half bg-blue-500 text-white py-2 px-8 rounded-lg hover:bg-4880FF focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            width="158px"
            height="40px"
          >
            <img src="src/assets/img/creatProduct.png" alt="" />
            Create Product
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className={`bg-none rounded-lg shadow-md ${
              isDarkMode ? "dark:bg-gray-800" : ""
            }`}
          >
          
            <div className="h-32 flex items-center justify-center">
              <img
                src={product.image}
                alt={product.title}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold">{product.title}</h3>
              <p className="text-blue-700 mt-2">{product.price}</p>
              <div className="flex justify-between items-center">
                <Link to={`/EditProduct/${id}`}>
                  <button className="bg-gray-100 text-black px-5 py-2 rounded-full mt-4">
                    Edit Product
                  </button>
                </Link>
                <img
                  src="src/assets/img/trash-03.png"
                  className="w-15 py-2 cursor-pointer"
                  alt="Delete"
                  onClick={() => openModal(product)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </>
);
};

export default ProductGrid;
 