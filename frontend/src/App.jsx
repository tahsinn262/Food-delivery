import React, { Suspense, lazy, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/footer";
import Login from "./components/Login/login";
import BackToTop from './components/BackToTop/BackToTop';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';

const Home = lazy(() => import("./pages/Home/home"));
const Cart = lazy(() => import("./pages/Cart/cart"));
const PlaceOrder = lazy(() => import("./pages/Place Order/placeorder"));
const Verify = lazy(() => import('./pages/verify/verify'));
const MyOrders = lazy(() => import('./pages/myOrders/myorders'));
const Menu = lazy(() => import('./pages/Menu/menu'));

const PageLoader = () => (
  <div style={{ minHeight: "40vh", display: "grid", placeItems: "center", color: "#666", fontSize: "1rem" }}>
    Loading...
  </div>
);

const App = () => {
  const url = import.meta.env.VITE_API_URL || "https://food-delivery-backend-eriq.onrender.com";
  const location = useLocation();
  
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {/* Toast notifications for success/error messages */}
      <ToastContainer position="top-center" autoClose={3000} />

      {/* Conditional Popups */}
      {showLogin && (
        <Login 
          setShowLogin={setShowLogin} 
        />
      )}

      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <ScrollToTop />
        
        
        <Suspense fallback={<PageLoader />}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={
                <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                >
                  <Home />
                </motion.div>
              } />
              <Route path="/cart" element={<Cart />} />
              <Route path="/order" element={<PlaceOrder />} />
              <Route path="/verify" element={
                <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                >
                  <Verify />
                </motion.div>
              } />
              <Route path='/myorders' element={<MyOrders />} />
              <Route path='/menu' element={
                <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                >
                  <Menu />
                </motion.div>
              } />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </div>
      
      <Footer />
      <BackToTop />
    </>
  );
};

export default App;
