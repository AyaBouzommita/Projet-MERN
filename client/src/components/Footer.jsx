import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IconRocket, IconGithub } from "./common/Icons";

function Footer() {
  return (
    <footer className="dev-footer mt-auto">
      <Container>
        <Row className="gy-4 mb-4">
          <Col lg={5} md={6}>
            <div className="d-flex align-items-center gap-2 mb-3">
              <div className="dev-brand-badge" style={{ width: 28, height: 28 }}>
                <IconRocket size={15} />
              </div>
              <span className="fw-bold text-dark fs-5">DevShowcase<span className="text-primary">.tn</span></span>
            </div>
            <p className="small text-muted pe-lg-4 mb-3">
              La plateforme collaborative étudiante inspirée de Product Hunt, dédiée à la mise en lumière des projets de fin d'études, mini-projets et outils open-source d'ingénierie logicielle.
            </p>
            <div className="d-flex align-items-center gap-2">
              <a
                href="https://github.com/AyaBouzommita/Projet-MERN"
                target="_blank"
                rel="noreferrer"
                className="btn btn-sm btn-outline-dark d-inline-flex align-items-center gap-2"
              >
                <IconGithub size={15} />
                <span>Code source sur GitHub</span>
              </a>
            </div>
          </Col>

          <Col lg={3} sm={6}>
            <div className="fw-bold text-dark small text-uppercase mb-3 letter-spacing-1">
              EXPLORATION
            </div>
            <ul className="list-unstyled d-flex flex-column gap-2 small text-muted mb-0">
              <li><Link to="/" className="text-decoration-none text-muted">Accueil</Link></li>
              <li><Link to="/products" className="text-decoration-none text-muted">Tous les projets</Link></li>
              <li><Link to="/products?category=IA%20%26%20Machine%20Learning" className="text-decoration-none text-muted">Projets IA & Data</Link></li>
              <li><Link to="/products?category=Web%20Fullstack" className="text-decoration-none text-muted">Projets Web Fullstack</Link></li>
              <li><Link to="/products?category=Mobile%20%26%20Applications" className="text-decoration-none text-muted">Applications Mobiles</Link></li>
            </ul>
          </Col>

          <Col lg={4} sm={6}>
            <div className="fw-bold text-dark small text-uppercase mb-3 letter-spacing-1">
              COMMUNAUTÉ & INGÉNIERIE
            </div>
            <ul className="list-unstyled d-flex flex-column gap-2 small text-muted mb-0">
              <li><Link to="/users" className="text-decoration-none text-muted">Annuaire des Développeurs</Link></li>
              <li><Link to="/about" className="text-decoration-none text-muted">À propos de la plateforme</Link></li>
              <li><Link to="/contact" className="text-decoration-none text-muted">Partenariats & Clubs étudiants</Link></li>
              <li><span className="text-muted">Projet académique développé par <strong>Aya Bouzommita (FIGL3)</strong></span></li>
            </ul>
          </Col>
        </Row>

        <div className="pt-3 border-top d-flex flex-column flex-sm-row justify-content-between align-items-center small text-muted">
          <div>© {new Date().getFullYear()} DevShowcase. Plateforme d'ingénierie logicielle pour étudiants.</div>
          <div className="mt-2 mt-sm-0">Filière Ingénieur Génie Logiciel 3 (FIGL3)</div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
