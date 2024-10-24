

import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const LoginPage = () => {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    const response = await axios.post('https://vica.website/api/login', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
    .then(function(response){
      console.log(response);
      toast.success("Login successful.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      navigate("/Product");
    })
    .catch(function(error){
      console.log(error)
      
    toast.error("Login failed. Please check your credentials.", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    })
  }
  

return (
  <div className="flex justify-center h-screen bg-custom-bg bg-cover bg-centers">
    <div
      className="bg-white rounded-lg shadow-lg p-8 mt-12 mb-12"
      radius="50px"
      width="750px"
      height="551px"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Login to Account</h2>
      <p className="text-m">Please enter your email and password to continue</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          Email address:
          <input
            type="email"
            placeholder="example@gmail.com"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          Password:
          <input
            type="password"
            placeholder="*******"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-half bg-blue-500 text-white py-2 px-16 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            width="300px"
            height="75px"
          >
            Sign in
          </button>
        </div>
      </form>
      <div className="text-center mt-4">
        <span>Don't have an account? </span>
        <Link to="/register" className="text-blue-500 hover:underline">
          Create Account
        </Link>
      </div>
    </div>
    <ToastContainer />
  </div>
);
};

export default LoginPage;