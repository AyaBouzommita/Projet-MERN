import React, { useEffect } from "react";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getproducts } from "../redux/productSlice";
import { getusers } from "../redux/userSlice";
import ProductCard from "./Products/ProductCard";
import UserCard from "./UserCard";

function Home() {
  const dispatch = useDispatch();
  const { productlist } = useSelector((state) => state.product);
  const { userlist } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getproducts({}));
    dispatch(getusers(""));
  }, [dispatch]);

  const featuredProducts = productlist?.slice(0, 4) || [];
  const featuredUsers = userlist?.slice(0, 4) || [];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section text-white py-5 mb-5">
        <Container className="py-4">
          <Row className="align-items-center gy-4">
            <Col lg={7}>
              <Badge bg="warning" text="dark" className="px-3 py-2 fs-6 fw-bold mb-3 shadow-sm">
                ⭐ Projet MERN - Filière GL3
              </Badge>
              <h1 className="display-4 fw-extrabold mb-3">
                Plateforme Fullstack <span className="text-warning">MERN Innovante</span>
              </h1>
              <p className="lead mb-4 text-white-50">
                Application complète conçue et optimisée par <strong>Aya Bouzommita</strong>. Architecture logicielle MVC, sécurité renforcée JWT & Bcrypt, et gestion d'état centralisée avec Redux Toolkit.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <Button as={Link} to="/products" variant="warning" size="lg" className="fw-bold px-4 shadow">
                  🛍️ Explorer les Produits
                </Button>
                <Button as={Link} to="/users" variant="outline-light" size="lg" className="fw-semibold px-4">
                  👥 Espace Utilisateurs
                </Button>
              </div>

              {user && (
                <div className="mt-4 p-3 bg-white bg-opacity-10 rounded-3 border border-light border-opacity-25 d-inline-flex align-items-center gap-2">
                  <span>👋</span>
                  <span>Ravi de vous revoir, <strong>{user.name}</strong> !</span>
                </div>
              )}
            </Col>

            <Col lg={5} className="text-center">
              <div className="hero-stats-card p-4 rounded-4 shadow-lg border border-white border-opacity-25 bg-white bg-opacity-10 text-white">
                <h4 className="fw-bold mb-3">Vue d'ensemble</h4>
                <Row className="g-3">
                  <Col xs={6}>
                    <div className="p-3 rounded-3 bg-dark bg-opacity-50 border border-secondary">
                      <div className="display-6 fw-bold text-warning">{productlist?.length || 0}</div>
                      <div className="small text-white-50">Produits Actifs</div>
                    </div>
                  </Col>
                  <Col xs={6}>
                    <div className="p-3 rounded-3 bg-dark bg-opacity-50 border border-secondary">
                      <div className="display-6 fw-bold text-info">{userlist?.length || 0}</div>
                      <div className="small text-white-50">Comptes Inscrits</div>
                    </div>
                  </Col>
                  <Col xs={12}>
                    <div className="p-3 rounded-3 bg-dark bg-opacity-50 border border-secondary text-start small">
                      <div className="d-flex justify-content-between mb-1">
                        <span>Sécurité Token</span>
                        <span className="text-success fw-bold">✓ Actif (JWT 7j)</span>
                      </div>
                      <div className="d-flex justify-content-between mb-1">
                        <span>Base de données</span>
                        <span className="text-success fw-bold">✓ MongoDB Atlas</span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span>Framework Frontend</span>
                        <span className="text-warning fw-bold">React 19 + Vite</span>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Highlights Section */}
      <Container className="mb-5">
        <Row className="g-4 text-center">
          <Col md={3} sm={6}>
            <Card className="h-100 border-0 shadow-sm rounded-4 p-3 feature-card">
              <div className="fs-1 mb-2">⚡</div>
              <h5 className="fw-bold">React 19 + Vite</h5>
              <p className="text-muted small mb-0">Build ultra-rapide et composants modulaires interactifs.</p>
            </Card>
          </Col>
          <Col md={3} sm={6}>
            <Card className="h-100 border-0 shadow-sm rounded-4 p-3 feature-card">
              <div className="fs-1 mb-2">🔒</div>
              <h5 className="fw-bold">Auth JWT & Bcrypt</h5>
              <p className="text-muted small mb-0">Hachage des mots de passe et sécurisation des routes par token.</p>
            </Card>
          </Col>
          <Col md={3} sm={6}>
            <Card className="h-100 border-0 shadow-sm rounded-4 p-3 feature-card">
              <div className="fs-1 mb-2">📦</div>
              <h5 className="fw-bold">Redux Toolkit</h5>
              <p className="text-muted small mb-0">Architecture réactive sans ping manuel avec extraReducers.</p>
            </Card>
          </Col>
          <Col md={3} sm={6}>
            <Card className="h-100 border-0 shadow-sm rounded-4 p-3 feature-card">
              <div className="fs-1 mb-2">🍃</div>
              <h5 className="fw-bold">MongoDB Cloud</h5>
              <p className="text-muted small mb-0">Persistance des données via Mongoose ODM & schéma strict.</p>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Featured Products */}
      <Container className="mb-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h3 className="fw-bold text-dark mb-0">Produits en Vedette</h3>
            <p className="text-muted small mb-0">Sélection des articles récents du catalogue</p>
          </div>
          <Button as={Link} to="/products" variant="outline-primary" size="sm" className="fw-semibold">
            Voir tout le catalogue ({productlist?.length || 0}) →
          </Button>
        </div>

        {featuredProducts.length > 0 ? (
          <Row xs={1} sm={2} md={3} lg={4} className="g-4">
            {featuredProducts.map((el) => (
              <Col key={el._id}>
                <ProductCard el={el} />
              </Col>
            ))}
          </Row>
        ) : (
          <div className="text-center py-4 bg-light rounded-4 border">
            <p className="text-muted mb-0">Aucun produit disponible pour le moment.</p>
          </div>
        )}
      </Container>

      {/* Featured Users */}
      <Container className="mb-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h3 className="fw-bold text-dark mb-0">Membres de la Communauté</h3>
            <p className="text-muted small mb-0">Utilisateurs enregistrés sur la plateforme</p>
          </div>
          <Button as={Link} to="/users" variant="outline-primary" size="sm" className="fw-semibold">
            Gérer les utilisateurs ({userlist?.length || 0}) →
          </Button>
        </div>

        {featuredUsers.length > 0 ? (
          <Row xs={1} sm={2} md={3} lg={4} className="g-4">
            {featuredUsers.map((el) => (
              <Col key={el._id}>
                <UserCard el={el} />
              </Col>
            ))}
          </Row>
        ) : (
          <div className="text-center py-4 bg-light rounded-4 border">
            <p className="text-muted mb-0">Aucun utilisateur enregistré pour le moment.</p>
          </div>
        )}
      </Container>
    </div>
  );
}

export default Home;
