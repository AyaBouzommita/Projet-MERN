import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Navbar, Nav, Container, Button, Dropdown, Form } from "react-bootstrap";
import { logout } from "../redux/authSlice";
import { getproducts } from "../redux/productSlice";
import { getusers } from "../redux/userSlice";
import { toast } from "react-toastify";
import { IconSearch } from "./common/Icons";

function Navbarr() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");

  const handleLogout = () => {
    dispatch(logout());
    toast.info("Session déconnectée");
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (location.pathname.includes("/products")) {
      dispatch(getproducts({ search: searchTerm }));
    } else if (location.pathname.includes("/users")) {
      dispatch(getusers(searchTerm));
    } else {
      navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
      dispatch(getproducts({ search: searchTerm }));
    }
  };

  return (
    <Navbar expand="lg" className="pro-navbar sticky-top py-2" bg="white">
      <Container>
        <Navbar.Brand as={Link} to="/" className="pro-brand">
          <div className="brand-icon-box">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
          </div>
          <span>TechStore<span className="text-primary">.</span></span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-nav" className="border-0 shadow-none" />

        <Navbar.Collapse id="main-nav">
          <Nav className="mx-auto gap-1 my-2 my-lg-0">
            <Nav.Link as={Link} to="/" className={`nav-link-pro ${location.pathname === "/" ? "active" : ""}`}>
              Accueil
            </Nav.Link>
            <Nav.Link as={Link} to="/products" className={`nav-link-pro ${location.pathname === "/products" ? "active" : ""}`}>
              Catalogue
            </Nav.Link>
            <Nav.Link as={Link} to="/users" className={`nav-link-pro ${location.pathname === "/users" ? "active" : ""}`}>
              Équipe & Membres
            </Nav.Link>
            <Nav.Link as={Link} to="/about" className={`nav-link-pro ${location.pathname === "/about" ? "active" : ""}`}>
              À Propos
            </Nav.Link>
            <Nav.Link as={Link} to="/contact" className={`nav-link-pro ${location.pathname === "/contact" ? "active" : ""}`}>
              Contact
            </Nav.Link>
          </Nav>

          <div className="d-flex align-items-center gap-3">
            <Form onSubmit={handleSearch} className="search-container-pro d-none d-md-block">
              <span className="search-icon-pos">
                <IconSearch size={16} />
              </span>
              <Form.Control
                type="search"
                placeholder="Rechercher un produit..."
                className="search-input-pro"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Form>

            {isAuthenticated && user ? (
              <Dropdown align="end">
                <Dropdown.Toggle variant="transparent" className="d-flex align-items-center gap-2 border-0 p-0 text-dark">
                  <img
                    src={user.img || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"}
                    alt={user.name}
                    className="avatar-nav-pro"
                  />
                  <div className="text-start d-none d-sm-block">
                    <div className="fw-bold small text-dark leading-none">{user.name}</div>
                    <span className="text-muted" style={{ fontSize: "0.75rem" }}>
                      {user.isAdmin ? "Administrateur" : "Membre"}
                    </span>
                  </div>
                </Dropdown.Toggle>

                <Dropdown.Menu className="shadow-lg border-0 rounded-3 mt-2 p-2">
                  <div className="px-3 py-2 border-bottom mb-2">
                    <div className="fw-bold text-dark small">{user.name}</div>
                    <div className="text-muted small">{user.email}</div>
                  </div>
                  <Dropdown.Item as={Link} to="/products" className="rounded-2 py-2 small">
                    Gérer le catalogue
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/users" className="rounded-2 py-2 small">
                    Gestion des utilisateurs
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout} className="text-danger rounded-2 py-2 small fw-semibold">
                    Déconnexion
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <div className="d-flex align-items-center gap-2">
                <Button as={Link} to="/login" variant="light" size="sm" className="btn-outline-pro px-3">
                  Connexion
                </Button>
                <Button as={Link} to="/register" size="sm" className="btn-primary-pro px-3">
                  Créer un compte
                </Button>
              </div>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbarr;
