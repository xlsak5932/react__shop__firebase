import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Join from "./components/Join/Join";
import Login from "./components/Login/Login";
import Cart from "./components/Cart/Cart";
import Admin from "./components/Admin/Admin";
import AddProduct from "./components/AddProduct/AddProduct";
import UpdateProduct from "./components/UpdateProduct/UpdateProduct";
import ProductBuy from "./components/ProductBuy/ProductBuy";

const App = () => {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/join" element={<Join />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/updateproduct/:id" element={<UpdateProduct />} />
        <Route path="/productbuy/:id" element={<ProductBuy />} />
      </Routes>

      <Footer />
    </Router>
  );
};

export default App;
