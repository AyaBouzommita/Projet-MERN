import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Navbar, Nav, Container, Dropdown, Form } from "react-bootstrap";
import { logout } from "../redux/authSlice";
import { getproducts } from "../redux/productSlice";
import { openCart } from "../redux/cartSlice";
import { toast } from "react-toastify";
import { IconSearch, IconHeart, IconBag } from "./common/Icons";

function Navbarr() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { items, wishlist } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");

  const totalCartQty = items.reduce((acc, item) => acc + item.qty, 0);

  const handleLogout = () => {
    dispatch(logout());
    toast.info("Session déconnectée");
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
    dispatch(getproducts({ search: searchTerm }));
  };

  const navCategories = [
    { label: "Nouveautés", category: "Tous" },
    { label: "Robes", category: "Robes" },
    { label: "Hauts & Tops", category: "Hauts & Tops" },
    { label: "Vestes & Manteaux", category: "Vestes & Manteaux" },
    { label: "Pantalons & Bas", category: "Pantalons & Bas" },
    { label: "Chaussures", category: "Chaussures" },
    { label: "Accessoires", category: "Sacs & Accessoires" },
    { label: "% Ventes Flash", category: "Flash", isPromo: true },
  ];

  const handleCategoryClick = (cat) => {
    if (cat === "Flash") {
      dispatch(getproducts({ isFlashSale: "true" }));
    } else if (cat === "Tous") {
      dispatch(getproducts({}));
    } else {
      dispatch(getproducts({ category: cat }));
    }
    navigate("/products");
  };

  return (
    <header className="shein-header sticky-top">
      {/* Main Navbar */}
      <div className="bg-white border-bottom py-2">
        <Container className="d-flex align-items-center justify-content-between gap-3">
          {/* Logo SHEIN */}
          <Link to="/" className="shein-logo text-decoration-none text-dark">
            SHEIN
          </Link>

          {/* Search Bar */}
          <Form onSubmit={handleSearch} className="shein-search-bar flex-grow-1 mx-lg-5 mx-2">
            <span className="search-icon-pos">
              <IconSearch size={16} />
            </span>
            <Form.Control
              type="search"
              placeholder="Robe satinée, blazer oversize, crop top..."
              className="shein-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Form>

          {/* Action Icons */}
          <div className="d-flex align-items-center gap-3">
            {/* Wishlist */}
            <button
              type="button"
              className="btn btn-link p-0 position-relative text-dark border-0"
              onClick={() => {
                navigate("/products");
                toast.info(`Vous avez ${wishlist.length} article(s) dans vos favoris`);
              }}
              title="Mes favoris"
            >
              <IconHeart size={22} filled={wishlist.length > 0} />
              {wishlist.length > 0 && (
                <span className="shein-badge-counter">{wishlist.length}</span>
              )}
            </button>

            {/* Cart Button */}
            <button
              type="button"
              className="btn btn-link p-0 position-relative text-dark border-0"
              onClick={() => dispatch(openCart())}
              title="Mon panier"
            >
              <IconBag size={22} />
              {totalCartQty > 0 && (
                <span className="shein-badge-counter">{totalCartQty}</span>
              )}
            </button>

            {/* User Dropdown */}
            {isAuthenticated && user ? (
              <Dropdown align="end">
                <Dropdown.Toggle variant="transparent" className="d-flex align-items-center gap-2 border-0 p-0 text-dark">
                  <img
                    src={user.img || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"}
                    alt={user.name}
                    className="avatar-nav-pro"
                  />
                  <div className="text-start d-none d-md-block">
                    <div className="fw-bold small text-dark leading-none">{user.name}</div>
                    <span className="text-muted" style={{ fontSize: "0.72rem" }}>
                      {user.isAdmin ? "Admin" : "Membre"}
                    </span>
                  </div>
                </Dropdown.Toggle>

                <Dropdown.Menu className="shadow-lg border-0 rounded-3 mt-2 p-2">
                  <div className="px-3 py-2 border-bottom mb-2">
                    <div className="fw-bold text-dark small">{user.name}</div>
                    <div className="text-muted small">{user.email}</div>
                  </div>
                  <Dropdown.Item as={Link} to="/products" className="rounded-2 py-2 small">
                    Gérer la boutique
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/users" className="rounded-2 py-2 small">
                    Gestion des comptes
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout} className="text-danger rounded-2 py-2 small fw-semibold">
                    Déconnexion
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <div className="d-flex align-items-center gap-2">
                <Link to="/login" className="btn btn-sm btn-outline-dark px-3 fw-semibold">
                  Connexion
                </Link>
                <Link to="/register" className="btn btn-sm btn-dark px-3 fw-semibold">
                  S'inscrire
                </Link>
              </div>
            )}
          </div>
        </Container>
      </div>

      {/* Subcategory Menu Ribbon */}
      <div className="shein-subnav bg-white border-bottom py-2 d-none d-md-block">
        <Container className="d-flex align-items-center justify-content-center gap-4 flex-wrap">
          {navCategories.map((cat) => (
            <button
              key={cat.label}
              type="button"
              className={`btn btn-link p-0 text-decoration-none small text-uppercase fw-bold ${
                cat.isPromo ? "text-danger" : "text-dark"
              }`}
              onClick={() => handleCategoryClick(cat.category)}
              style={{ fontSize: "0.82rem", letterSpacing: "0.5px" }}
            >
              {cat.label}
            </button>
          ))}
          <Link to="/about" className="text-muted small text-decoration-none fw-semibold ms-3">
            À Propos de SHEIN
          </Link>
          <Link to="/contact" className="text-muted small text-decoration-none fw-semibold">
            Service Client
          </Link>
        </Container>
      </div>
    </header>
  );
}

export default Navbarr;
