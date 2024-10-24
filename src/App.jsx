import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import RegisetrPage from "./Pages/RegisterPage";
import ProductGrid from "./Pages/Product";
import CreateProduct from "./Pages/CreateProduct";
import EditProduct from "./Pages/EditProduct";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisetrPage />} />
        <Route path="/Product/" element={<ProductGrid />} />
        <Route path="/CreateProduct" element={<CreateProduct />} />
        <Route path="/EditProduct/:id" element={<EditProduct />} />
      </Routes>
    </>
  );
}

export default App;
