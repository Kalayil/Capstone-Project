import React, { useState, useEffect } from "react";
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CartProvider from "./context/CartContext";
import Navigations from "./components/Navigations";
import Home from "./pages/Home";
import Men from "./pages/Men";
import Women from "./pages/Women";
import ProductDetail from "./components/ProductDetail";
import Cartpage from "./components/Cartpage";
import ContactPage from "./pages/ContactPage";
import Checkout from "./components/Checkout";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AdminLogin from "./pages/admin/AdminLogin";
import DashboardLayout from "./pages/admin/DashboardLayout";
import Products from "./pages/admin/Products";
import Users from "./pages/admin/Users";
import Footer from './components/Footer'
import UserAccount from './pages/UserAccount'
import About from './pages/About'
import OrderConfirmation from './components/OrderConfirmation'
import ShoeCare from "./pages/Shoecare";
import FAQs from "./pages/FAQs";
import ShippingAndReturns from "./pages/ShippingAndReturns";
import SizeChart from "./pages/SizeChart";

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [token, setToken] = useState(localStorage.getItem("adminToken"));
  const [isLoggedIn, setisLoggedIn] = useState(false);
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalQuantity = savedCart.reduce((acc, item) => acc + item.quantity, 0);
    setCartCount(totalQuantity);
  }, []);


  return (
    <div id="page">
     <CartProvider cartCount={cartCount} token={token} setToken={setToken}>
        <Router>
          <Navigations cartCount={cartCount} token={token}
            setToken={setToken} setisLoggedIn={setisLoggedIn} />
          <Routes>
            <Route path="/" element={<Home token={token} setToken={setToken} />} />
            <Route path="/men" element={<Men  />} />
            <Route path="/women" element={<Women  />} />
            <Route path='/products/:id' element={<ProductDetail setCartCount={setCartCount} />} token={token} setToken={setToken} ></Route>
            <Route path="/cart" element={<Cartpage token={token} setToken={setToken} />} />
            <Route path="/login" element={<Login token={token} setToken={setToken} setisLoggedIn={setisLoggedIn} />} />
            <Route path="/signup" element={<SignUp token={token} setToken={setToken} setisLoggedIn={setisLoggedIn} />} />
            <Route path="/about" element={<About token={token} setToken={setToken} />} />
            <Route path="/checkout" element={<Checkout token={token} setToken={setToken} />} />
            <Route path="/orderconfirm" element={<OrderConfirmation token={token} setToken={setToken} />} />
            <Route path="/account" element={<UserAccount token={token} setToken={setToken} setisLoggedIn={setisLoggedIn}  />} />
            <Route path="/contact" element={<ContactPage token={token} setToken={setToken} />} />
            <Route path="/shoe-care" element={<ShoeCare />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/shipping-returns" element={<ShippingAndReturns />} />
            <Route path="/size-chart" element={<SizeChart />} />
               {/* Admin Routes */}
               <Route path="/admin/login" element={<AdminLogin setToken={setToken} setisLoggedIn={setisLoggedIn} />} />
               <Route path="/admin/dashboard" element={<DashboardLayout token={token}/>}   />
              <Route path="/admin/products" element={<Products />} />
              <Route path="/admin/users" element={<Users />} />
       
          </Routes>
          <Footer />
        </Router>
      </CartProvider>
    </div>
  );
}

export default App;
