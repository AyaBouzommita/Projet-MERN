import React, { useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getproducts } from "../redux/productSlice";
import { getusers } from "../redux/userSlice";
import ProductCard from "./Products/ProductCard";
import UserCard from "./UserCard";
import { IconShield, IconTruck, IconHeadphones, IconBox, IconArrowRight } from "./common/Icons";

function Home() {
  const dispatch = useDispatch();
  const { productlist } = useSelector((state) => state.product);
  const { userlist } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getproducts({}));
    dispatch(getusers(""));
  }, [dispatch]);

  const featuredProducts = productlist?.slice(0, 4) || [];
  const featuredUsers = userlist?.slice(0, 4) || [];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-pro">
        <Container>
          <Row className="align-items-center gy-5">
            <Col lg={7}>
              <div className="hero-pill">
                <span className="badge-status-dot" style={{ backgroundColor: "#2563eb" }}></span>
                <span>Nouvelle gamme professionnelle 2026 disponible</span>
              </div>
              <h1 className="hero-title">
                Le matériel informatique de pointe pour vos ambitions.
              </h1>
              <p className="hero-subtitle pe-lg-4">
                Découvrez une sélection rigoureuse d'ordinateurs, stations de travail, périphériques et équipements réseau garantis avec service technique dédié.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <Button as={Link} to="/products" className="btn-primary-pro px-4 py-2">
                  <span>Explorer le catalogue</span>
                  <IconArrowRight size={16} />
                </Button>
                <Button as={Link} to="/contact" className="btn-outline-pro px-4 py-2">
                  Demander un devis pro
                </Button>
              </div>
            </Col>

            <Col lg={5}>
              <div className="p-4 bg-white border rounded-4 shadow-sm">
                <div className="d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom">
                  <div>
                    <h6 className="fw-bold mb-0 text-dark">Disponibilité immédiate</h6>
                    <span className="text-muted small">Articles certifiés en stock direct</span>
                  </div>
                  <span className="badge-status badge-in-stock">
                    <span className="badge-status-dot"></span>
                    Direct Entrepot
                  </span>
                </div>

                <div className="d-flex flex-column gap-3">
                  <div className="d-flex justify-content-between align-items-center p-3 bg-light rounded-3">
                    <div>
                      <div className="text-muted small">Catalogue actif</div>
                      <div className="fs-4 fw-bold text-dark">{productlist?.length || 0} références</div>
                    </div>
                    <div className="trust-icon-wrapper">
                      <IconBox size={22} />
                    </div>
                  </div>

                  <div className="d-flex justify-content-between align-items-center p-3 bg-light rounded-3">
                    <div>
                      <div className="text-muted small">Comptes & Collaborateurs</div>
                      <div className="fs-4 fw-bold text-dark">{userlist?.length || 0} membres</div>
                    </div>
                    <div className="trust-icon-wrapper" style={{ backgroundColor: "#ecfdf5", color: "#059669" }}>
                      <IconShield size={22} />
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Trust Proposition Bar */}
      <Container className="mb-5">
        <div className="trust-bar">
          <Row className="gy-3">
            <Col lg={3} sm={6}>
              <div className="trust-item">
                <div className="trust-icon-wrapper">
                  <IconShield size={20} />
                </div>
                <div>
                  <div className="fw-bold text-dark small">Garantie 2 ans</div>
                  <div className="text-muted" style={{ fontSize: "0.78rem" }}>Support constructeur certifié</div>
                </div>
              </div>
            </Col>

            <Col lg={3} sm={6}>
              <div className="trust-item">
                <div className="trust-icon-wrapper">
                  <IconTruck size={20} />
                </div>
                <div>
                  <div className="fw-bold text-dark small">Livraison Express</div>
                  <div className="text-muted" style={{ fontSize: "0.78rem" }}>Expédié en 24 à 48 heures</div>
                </div>
              </div>
            </Col>

            <Col lg={3} sm={6}>
              <div className="trust-item">
                <div className="trust-icon-wrapper">
                  <IconHeadphones size={20} />
                </div>
                <div>
                  <div className="fw-bold text-dark small">Assistance Dédiée</div>
                  <div className="text-muted" style={{ fontSize: "0.78rem" }}>Du lundi au samedi 8h-19h</div>
                </div>
              </div>
            </Col>

            <Col lg={3} sm={6}>
              <div className="trust-item">
                <div className="trust-icon-wrapper">
                  <IconBox size={20} />
                </div>
                <div>
                  <div className="fw-bold text-dark small">Paiement Sécurisé</div>
                  <div className="text-muted" style={{ fontSize: "0.78rem" }}>Carte bancaire ou à réception</div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Container>

      {/* Featured Products */}
      <Container className="mb-5 pb-3">
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-end gap-2 mb-4">
          <div>
            <div className="pro-category-tag">Sélection Premium</div>
            <h3 className="fw-bold text-dark mb-0">Nouveautés & Équipements Phares</h3>
          </div>
          <Link to="/products" className="btn-outline-pro text-decoration-none small py-2">
            Consulter tout le catalogue ({productlist?.length || 0})
          </Link>
        </div>

        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {featuredProducts.map((el) => (
            <Col key={el._id}>
              <ProductCard el={el} />
            </Col>
          ))}
        </Row>
      </Container>

      {/* Team / Users Preview */}
      <Container className="mb-5 pb-5">
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-end gap-2 mb-4">
          <div>
            <div className="pro-category-tag">Direction & Technique</div>
            <h3 className="fw-bold text-dark mb-0">Équipe & Collaborateurs</h3>
          </div>
          <Link to="/users" className="btn-outline-pro text-decoration-none small py-2">
            Annuaire complet ({userlist?.length || 0})
          </Link>
        </div>

        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {featuredUsers.map((el) => (
            <Col key={el._id}>
              <UserCard el={el} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Home;
