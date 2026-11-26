import React, { useEffect } from "react";
import { Container, Row, Col, Button, Badge } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getproducts } from "../redux/productSlice";
import ProductCard from "./Products/ProductCard";
import FlashCountdown from "./common/FlashCountdown";
import { IconTruck, IconShield, IconHeadphones, IconArrowRight, IconHeart } from "./common/Icons";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productlist } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getproducts({}));
  }, [dispatch]);

  const flashSaleProducts = productlist?.filter((p) => p.isFlashSale)?.slice(0, 4) || [];
  const trendingProducts = productlist?.slice(0, 8) || [];

  const categories = [
    { name: "Robes", query: "Robes", img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=400&q=80" },
    { name: "Hauts & Tops", query: "Hauts & Tops", img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80" },
    { name: "Vestes", query: "Vestes & Manteaux", img: "https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?auto=format&fit=crop&w=400&q=80" },
    { name: "Pantalons", query: "Pantalons & Bas", img: "https://images.unsplash.com/photo-1551854838-212c50b4c184?auto=format&fit=crop&w=400&q=80" },
    { name: "Chaussures", query: "Chaussures", img: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=400&q=80" },
    { name: "Sacs", query: "Sacs & Accessoires", img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=400&q=80" },
  ];

  const handleCategoryFilter = (cat) => {
    dispatch(getproducts({ category: cat }));
    navigate("/products");
  };

  return (
    <div>
      {/* Mega Hero Campaign SHEIN */}
      <section className="shein-hero position-relative">
        <Container className="py-5">
          <Row className="align-items-center gy-4">
            <Col lg={7} className="text-white">
              <span className="badge bg-danger text-uppercase px-3 py-2 fw-bold mb-3 letter-spacing-1">
                VENTES FLASH DE SAISON
              </span>
              <h1 className="display-3 fw-extrabold text-uppercase letter-spacing-2 mb-3">
                COLLECTION <br />
                <span className="text-warning">PRINTEMPS 2026</span>
              </h1>
              <p className="lead fs-5 text-white-50 mb-4 pe-lg-5">
                Des centaines de nouveautés mode à prix mini. Robes tendance, blazers oversize, denim et accessoires pour toutes vos envies.
              </p>

              <div className="d-flex flex-wrap gap-3">
                <Button
                  as={Link}
                  to="/products"
                  className="btn-shein-cta px-4 py-3 text-uppercase fw-bold letter-spacing-1"
                >
                  Découvrir la collection
                </Button>
                <Button
                  variant="outline-light"
                  className="px-4 py-3 text-uppercase fw-bold letter-spacing-1"
                  onClick={() => {
                    dispatch(getproducts({ isFlashSale: "true" }));
                    navigate("/products");
                  }}
                >
                  Ventes Flash (-50%)
                </Button>
              </div>
            </Col>

            <Col lg={5} className="d-none d-lg-block text-center">
              <div className="shein-hero-banner-card p-4 rounded-4 shadow-lg text-white">
                <div className="text-uppercase small fw-bold text-warning mb-1">OFFRE SPÉCIALE EN LIGNE</div>
                <div className="display-4 fw-extrabold text-danger mb-2">-60%</div>
                <div className="fw-semibold mb-3">SUR UNE SÉLECTION DE PLUS DE 500 ARTICLES</div>
                <div className="p-3 bg-dark bg-opacity-75 rounded-3 border border-secondary mb-3">
                  <div className="small text-white-50 mb-1">Code coupon exclusif au panier :</div>
                  <div className="fs-5 fw-bold text-warning letter-spacing-2">SHEIN20</div>
                </div>
                <div className="small text-white-50">Valable dès 80 TND d'achats | Livraison offerte dès 100 TND</div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Coupon Strip */}
      <section className="bg-dark py-3 text-white border-bottom border-secondary">
        <Container>
          <Row className="text-center gy-2">
            <Col md={4}>
              <div className="small">
                🎟️ <strong>-15% DÈS 80 TND</strong> | Code : <span className="text-warning fw-bold">SHEIN15</span>
              </div>
            </Col>
            <Col md={4}>
              <div className="small">
                🚚 <strong>LIVRAISON GRATUITE</strong> dès 100 TND d'achat
              </div>
            </Col>
            <Col md={4}>
              <div className="small">
                ⚡ <strong>VENTE FLASH EXCLUSIVE</strong> : -20% avec le code <span className="text-warning fw-bold">SHEIN20</span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Flash Sale Section with Countdown */}
      <Container className="my-5">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4 p-3 bg-light rounded-3 border">
          <div className="d-flex align-items-center gap-3">
            <h3 className="fw-extrabold text-dark mb-0 text-uppercase letter-spacing-1">
              ⚡ VENTES FLASH
            </h3>
            <FlashCountdown />
          </div>
          <Button
            variant="link"
            className="text-dark fw-bold text-decoration-none p-0 d-flex align-items-center gap-1"
            onClick={() => {
              dispatch(getproducts({ isFlashSale: "true" }));
              navigate("/products");
            }}
          >
            <span>Voir toutes les offres flash</span>
            <IconArrowRight size={16} />
          </Button>
        </div>

        <Row xs={2} sm={2} md={3} lg={4} className="g-3 g-md-4">
          {flashSaleProducts.map((el) => (
            <Col key={el._id}>
              <ProductCard el={el} />
            </Col>
          ))}
        </Row>
      </Container>

      {/* Circular Categories Bar */}
      <Container className="my-5">
        <div className="text-center mb-4">
          <h4 className="fw-extrabold text-dark text-uppercase letter-spacing-1 mb-1">
            EXPLORER PAR RAYONS
          </h4>
          <p className="text-muted small">Trouvez les pièces parfaites pour compléter votre garde-robe</p>
        </div>

        <Row className="justify-content-center text-center g-3">
          {categories.map((c) => (
            <Col key={c.name} xs={4} sm={4} md={2}>
              <div
                className="shein-category-circle-wrapper cursor-pointer"
                onClick={() => handleCategoryFilter(c.query)}
                style={{ cursor: "pointer" }}
              >
                <div className="shein-category-circle mb-2 mx-auto">
                  <img src={c.img} alt={c.name} />
                </div>
                <div className="fw-bold small text-dark text-truncate">{c.name}</div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Trending Products */}
      <Container className="my-5 pb-5">
        <div className="d-flex justify-content-between align-items-end mb-4">
          <div>
            <h4 className="fw-extrabold text-dark text-uppercase letter-spacing-1 mb-1">
              COUPS DE CŒUR & MEILLEURES VENTES
            </h4>
            <p className="text-muted small mb-0">Les articles les plus tendances et les plus demandés de la semaine</p>
          </div>
          <Link to="/products" className="btn btn-outline-dark btn-sm fw-bold px-3">
            Tout afficher ({productlist?.length || 0})
          </Link>
        </div>

        <Row xs={2} sm={2} md={3} lg={4} className="g-3 g-md-4">
          {trendingProducts.map((el) => (
            <Col key={el._id}>
              <ProductCard el={el} />
            </Col>
          ))}
        </Row>
      </Container>

      {/* Trust & Guarantees */}
      <section className="bg-light py-5 border-top">
        <Container>
          <Row className="gy-4 text-center">
            <Col md={3} sm={6}>
              <div className="p-3">
                <div className="fs-2 mb-2 text-danger">🚚</div>
                <div className="fw-bold text-dark small text-uppercase">Livraison Partout en Tunisie</div>
                <p className="text-muted small mb-0">Livraison à domicile sous 24 à 48h dans les 24 gouvernorats.</p>
              </div>
            </Col>
            <Col md={3} sm={6}>
              <div className="p-3">
                <div className="fs-2 mb-2 text-danger">🛡️</div>
                <div className="fw-bold text-dark small text-uppercase">Paiement à la Livraison</div>
                <p className="text-muted small mb-0">Commandez en toute confiance et payez à la réception de votre colis.</p>
              </div>
            </Col>
            <Col md={3} sm={6}>
              <div className="p-3">
                <div className="fs-2 mb-2 text-danger">🔄</div>
                <div className="fw-bold text-dark small text-uppercase">Retours Faciles 30 Jours</div>
                <p className="text-muted small mb-0">Échange ou remboursement simple si la taille ne convient pas.</p>
              </div>
            </Col>
            <Col md={3} sm={6}>
              <div className="p-3">
                <div className="fs-2 mb-2 text-danger">💬</div>
                <div className="fw-bold text-dark small text-uppercase">Service Client 7j/7</div>
                <p className="text-muted small mb-0">Une équipe disponible par téléphone et WhatsApp pour vous conseiller.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default Home;
