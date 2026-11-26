import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Navbar, Nav, Container, Button, Dropdown, Form } from "react-bootstrap";
import { logout } from "../redux/authSlice";
import { getproducts } from "../redux/productSlice";
import { getusers } from "../redux/userSlice";
import { toast } from "react-toastify";

function Navbarr() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");

  const handleLogout = () => {
    dispatch(logout());
    toast.info("Déconnexion réussie !");
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
    <Navbar expand="lg" className="navbar-custom sticky-top py-3" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold d-flex align-items-center gap-2 brand-logo">
          <span className="logo-badge">MERN</span>
          <span className="brand-text">Projet<span className="text-warning">GL3</span></span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-nav" />

        <Navbar.Collapse id="main-nav">
          <Nav className="me-auto ms-lg-4 gap-lg-2">
            <Nav.Link as={Link} to="/" active={location.pathname === "/"}>
              Accueil
            </Nav.Link>
            <Nav.Link as={Link} to="/products" active={location.pathname === "/products"}>
              Produits
            </Nav.Link>
            <Nav.Link as={Link} to="/users" active={location.pathname === "/users"}>
              Utilisateurs
            </Nav.Link>
            <Nav.Link as={Link} to="/about" active={location.pathname === "/about"}>
              À Propos
            </Nav.Link>
            <Nav.Link as={Link} to="/contact" active={location.pathname === "/contact"}>
              Contact
            </Nav.Link>
          </Nav>

          <Form className="d-flex me-lg-3 my-2 my-lg-0 search-form" onSubmit={handleSearch}>
            <Form.Control
              type="search"
              placeholder="Rechercher..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="outline-light" type="submit" className="search-btn">
              🔍
            </Button>
          </Form>

          <Nav className="align-items-center gap-2">
            {isAuthenticated && user ? (
              <Dropdown align="end">
                <Dropdown.Toggle variant="transparent" className="user-toggle d-flex align-items-center gap-2 border-0 text-white p-0">
                  <img
                    src={user.img || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"}
                    alt={user.name}
                    className="rounded-circle avatar-nav"
                  />
                  <div className="text-start d-none d-sm-block">
                    <div className="fw-semibold small">{user.name}</div>
                    <span className={`badge ${user.isAdmin ? "bg-danger" : "bg-primary"} badge-xs`}>
                      {user.isAdmin ? "Admin" : "Membre"}
                    </span>
                  </div>
                </Dropdown.Toggle>

                <Dropdown.Menu className="dropdown-menu-dark shadow">
                  <Dropdown.ItemText className="text-muted small">
                    Connecté en tant que <strong>{user.email}</strong>
                  </Dropdown.ItemText>
                  <Dropdown.Divider />
                  <Dropdown.Item as={Link} to="/users">Gestion des utilisateurs</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/products">Gestion des produits</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout} className="text-danger fw-semibold">
                    Déconnexion
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <div className="d-flex gap-2">
                <Button as={Link} to="/login" variant="outline-light" size="sm" className="px-3 fw-semibold">
                  Connexion
                </Button>
                <Button as={Link} to="/register" variant="warning" size="sm" className="px-3 fw-semibold text-dark">
                  Inscription
                </Button>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbarr;
