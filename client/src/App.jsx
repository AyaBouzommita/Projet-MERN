import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "./redux/authSlice";
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

// Components
import SHEINTicker from "./components/common/SHEINTicker";
import Navbarr from "./components/Navbarr";
import CartDrawer from "./components/Cart/CartDrawer";
import Footer from "./components/Footer";
import Home from "./components/Home";
import ProductList from "./components/Products/ProductList";
import UserList from "./components/UserList";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import About from "./components/About";
import Contact from "./components/Contact";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("mern_token")) {
      dispatch(getCurrentUser());
    }
  }, [dispatch]);

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Top Banner Ticker */}
      <SHEINTicker />

      {/* Main SHEIN Navbar */}
      <Navbarr />

      {/* Cart Sliding Drawer */}
      <CartDrawer />

      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="*"
            element={
              <div className="text-center py-5">
                <h1 className="display-4 fw-bold text-dark">404</h1>
                <p className="lead text-muted">Page non trouvée</p>
              </div>
            }
          />
        </Routes>
      </main>

      <Footer />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;
