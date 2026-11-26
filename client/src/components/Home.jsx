import React, { useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getproducts } from "../redux/productSlice";
import { getusers } from "../redux/userSlice";
import ProductCard from "./Products/ProductCard";
import AddProduct from "./Products/AddProduct";
import { IconRocket, IconCode, IconSparkles, IconArrowRight, IconCheck } from "./common/Icons";

function Home() {
  const dispatch = useDispatch();
  const { productlist } = useSelector((state) => state.product);
  const { userlist } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getproducts({ sortBy: "upvotes_desc" }));
    dispatch(getusers(""));
  }, [dispatch]);

  const topProjects = productlist?.slice(0, 3) || [];
  const latestProjects = productlist?.slice(3, 9) || [];

  const totalUpvotes = productlist?.reduce((acc, p) => acc + (p.upvotes || 0), 0) || 0;

  return (
    <div>
      {/* Hero Section */}
      <section className="dev-hero">
        <Container>
          <Row className="align-items-center gy-5">
            <Col lg={7}>
              <div className="dev-pill">
                <IconSparkles size={14} />
                <span>La vitrine des innovations & réalisations étudiantes</span>
              </div>
              <h1 className="dev-hero-title mb-3">
                Le <span className="text-primary">Product Hunt</span> des étudiants ingénieurs.
              </h1>
              <p className="dev-hero-desc mb-4 pe-lg-4">
                Découvrez, testez et soutenez les projets logiciels, outils open-source et PFE conçus par les étudiants. Votez pour vos favoris et trouvez des collaborateurs.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <AddProduct />
                <Button as={Link} to="/products" variant="light" className="btn-outline-pro px-4 py-2">
                  <span>Explorer les {productlist?.length || 0} projets</span>
                  <IconArrowRight size={15} className="ms-1" />
                </Button>
              </div>
            </Col>

            <Col lg={5}>
              <div className="p-4 bg-white border rounded-4 shadow-sm">
                <h6 className="fw-bold text-dark mb-3 pb-2 border-bottom d-flex align-items-center gap-2">
                  <IconCode size={18} className="text-primary" />
                  <span>Métriques de la Communauté</span>
                </h6>

                <Row className="g-3 mb-3">
                  <Col xs={6}>
                    <div className="p-3 bg-light rounded-3 text-center border">
                      <div className="display-6 fw-bold text-primary mb-0">{productlist?.length || 0}</div>
                      <div className="small text-muted fw-semibold">Projets soumis</div>
                    </div>
                  </Col>
                  <Col xs={6}>
                    <div className="p-3 bg-light rounded-3 text-center border">
                      <div className="display-6 fw-bold text-warning mb-0">{totalUpvotes}</div>
                      <div className="small text-muted fw-semibold">Upvotes donnés</div>
                    </div>
                  </Col>
                </Row>

                <div className="p-3 bg-light rounded-3 border small">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Étudiants & Développeurs :</span>
                    <strong className="text-dark">{userlist?.length || 0} membres</strong>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Projets Open Source :</span>
                    <strong className="text-success">100% libre accès</strong>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="text-muted">Filière d'ingénierie :</span>
                    <strong className="text-primary">Génie Logiciel (GL3)</strong>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Top 3 Voted Projects */}
      <Container className="my-5">
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-end gap-2 mb-4 pb-2 border-bottom">
          <div>
            <span className="text-warning fw-bold small text-uppercase">Classement Communautaire</span>
            <h3 className="fw-bold text-dark mb-0">🔥 Top Projets les Plus Votés</h3>
          </div>
          <Link to="/products" className="btn-outline-pro small py-2 text-decoration-none">
            Voir le classement complet →
          </Link>
        </div>

        <Row xs={1} md={2} lg={3} className="g-4">
          {topProjects.map((el) => (
            <Col key={el._id}>
              <ProductCard el={el} />
            </Col>
          ))}
        </Row>
      </Container>

      {/* Feed of Recent Innovations */}
      <Container className="my-5 pb-4">
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-end gap-2 mb-4 pb-2 border-bottom">
          <div>
            <span className="text-primary fw-bold small text-uppercase">Dernières Publications</span>
            <h3 className="fw-bold text-dark mb-0">Nouvelles Démos & Projets en Bêta</h3>
          </div>
          <Link to="/products" className="btn-outline-pro small py-2 text-decoration-none">
            Parcourir par technologies →
          </Link>
        </div>

        <Row xs={1} md={2} lg={3} className="g-4">
          {latestProjects.map((el) => (
            <Col key={el._id}>
              <ProductCard el={el} />
            </Col>
          ))}
        </Row>
      </Container>

      {/* Why publish banner */}
      <section className="bg-white py-5 border-top border-bottom my-5">
        <Container>
          <div className="text-center max-w-700 mx-auto mb-5">
            <h3 className="fw-bold text-dark mb-2">Pourquoi publier sur DevShowcase ?</h3>
            <p className="text-muted small">
              Une opportunité unique de donner de la visibilité à vos travaux académiques, projets personnels et PFE.
            </p>
          </div>

          <Row className="g-4">
            <Col md={4}>
              <div className="p-4 bg-light border rounded-4 h-100">
                <div className="fs-2 text-primary mb-3">💬</div>
                <h5 className="fw-bold text-dark mb-2">Retours Constructifs</h5>
                <p className="text-muted small mb-0">
                  Obtenez des avis objectifs de vos pairs et enseignants sur l'ergonomie, l'architecture et les performances de votre code.
                </p>
              </div>
            </Col>

            <Col md={4}>
              <div className="p-4 bg-light border rounded-4 h-100">
                <div className="fs-2 text-warning mb-3">🤝</div>
                <h5 className="fw-bold text-dark mb-2">Trouver des Collaborateurs</h5>
                <p className="text-muted small mb-0">
                  Vous cherchez un développeur backend, un designer UI ou un expert IA pour un hackathon ? Proposez votre projet en mode contribution.
                </p>
              </div>
            </Col>

            <Col md={4}>
              <div className="p-4 bg-light border rounded-4 h-100">
                <div className="fs-2 text-success mb-3">🚀</div>
                <h5 className="fw-bold text-dark mb-2">Tremplin Portfolio</h5>
                <p className="text-muted small mb-0">
                  Partagez une URL publique de votre réalisation avec démo interactive et dépôt GitHub pour impressionner les recruteurs en stage PFE.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default Home;
