import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "./redux/authSlice";
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

// Components
import Navbarr from "./components/Navbarr";
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
    // Check if token exists on load and fetch current profile
    if (localStorage.getItem("mern_token")) {
      dispatch(getCurrentUser());
    }
  }, [dispatch]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbarr />
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
                <h1 className="display-4 fw-bold text-muted">404</h1>
                <p className="lead">Page introuvable</p>
              </div>
            }
          />
        </Routes>
      </main>
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={3500}
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
