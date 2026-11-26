import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Navbar, Nav, Container, Button, Dropdown, Form } from "react-bootstrap";
import { logout } from "../redux/authSlice";
import { getproducts } from "../redux/productSlice";
import { toast } from "react-toastify";
import { IconSearch, IconRocket, IconPlus } from "./common/Icons";
import AddProduct from "./Products/AddProduct";

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
    navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
    dispatch(getproducts({ search: searchTerm }));
  };

  return (
    <Navbar expand="lg" className="dev-navbar sticky-top py-2" bg="white">
      <Container>
        <Navbar.Brand as={Link} to="/" className="dev-brand">
          <div className="dev-brand-badge">
            <IconRocket size={18} />
          </div>
          <span>DevShowcase<span className="text-primary">.tn</span></span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-nav" className="border-0 shadow-none" />

        <Navbar.Collapse id="main-nav">
          <Nav className="mx-auto gap-1 my-2 my-lg-0">
            <Nav.Link as={Link} to="/" className={`nav-link-dev ${location.pathname === "/" ? "active" : ""}`}>
              Accueil
            </Nav.Link>
            <Nav.Link as={Link} to="/products" className={`nav-link-dev ${location.pathname === "/products" ? "active" : ""}`}>
              Explorer les Projets
            </Nav.Link>
            <Nav.Link as={Link} to="/users" className={`nav-link-dev ${location.pathname === "/users" ? "active" : ""}`}>
              Développeurs & Équipes
            </Nav.Link>
            <Nav.Link as={Link} to="/about" className={`nav-link-dev ${location.pathname === "/about" ? "active" : ""}`}>
              À Propos
            </Nav.Link>
            <Nav.Link as={Link} to="/contact" className={`nav-link-dev ${location.pathname === "/contact" ? "active" : ""}`}>
              Contact
            </Nav.Link>
          </Nav>

          <div className="d-flex align-items-center gap-3">
            {/* Search Input */}
            <Form onSubmit={handleSearch} className="position-relative d-none d-lg-block" style={{ width: "230px" }}>
              <span className="search-icon-pos">
                <IconSearch size={15} />
              </span>
              <Form.Control
                type="search"
                placeholder="React, IA, Flutter..."
                className="dev-search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Form>

            {/* Submit Project Button (Modal) */}
            <AddProduct />

            {/* Auth status */}
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
                      {user.isAdmin ? "Lead / Admin" : "Étudiant Développeur"}
                    </span>
                  </div>
                </Dropdown.Toggle>

                <Dropdown.Menu className="shadow-lg border-0 rounded-3 mt-2 p-2">
                  <div className="px-3 py-2 border-bottom mb-2">
                    <div className="fw-bold text-dark small">{user.name}</div>
                    <div className="text-muted small">{user.email}</div>
                  </div>
                  <Dropdown.Item as={Link} to="/products" className="rounded-2 py-2 small">
                    Tous les projets
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/users" className="rounded-2 py-2 small">
                    Annuaire des étudiants
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout} className="text-danger rounded-2 py-2 small fw-semibold">
                    Déconnexion
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <div className="d-flex align-items-center gap-2">
                <Button as={Link} to="/login" variant="light" size="sm" className="btn-outline-pro">
                  Connexion
                </Button>
                <Button as={Link} to="/register" size="sm" className="btn-dev-submit">
                  Rejoindre
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
