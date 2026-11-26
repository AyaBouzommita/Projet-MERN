import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer-custom mt-5 pt-5 pb-3">
      <Container>
        <Row className="gy-4">
          <Col lg={4} md={6}>
            <h5 className="fw-bold text-white mb-3">
              <span className="logo-badge me-2">MERN</span>Projet-MERN
            </h5>
            <p className="text-muted small">
              Projet fullstack académique de haut niveau développé par <strong>Aya Bouzommita</strong> pour le cursus Ingénieur GL3. Architecture moderne basée sur MongoDB, Express, React & Node.js.
            </p>
            <div className="d-flex gap-2 mt-3">
              <span className="badge bg-dark border border-secondary text-info">MongoDB</span>
              <span className="badge bg-dark border border-secondary text-warning">Express.js</span>
              <span className="badge bg-dark border border-secondary text-primary">React 19</span>
              <span className="badge bg-dark border border-secondary text-success">Node.js</span>
            </div>
          </Col>

          <Col lg={2} md={3} sm={6}>
            <h6 className="text-white fw-bold mb-3">Navigation</h6>
            <ul className="list-unstyled footer-links">
              <li><Link to="/">Accueil</Link></li>
              <li><Link to="/products">Catalogue Produits</Link></li>
              <li><Link to="/users">Membres & Équipe</Link></li>
              <li><Link to="/about">À Propos</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </Col>

          <Col lg={3} md={3} sm={6}>
            <h6 className="text-white fw-bold mb-3">Fonctionnalités</h6>
            <ul className="list-unstyled footer-links">
              <li><span>Authentification JWT & Bcrypt</span></li>
              <li><span>Sécurité & Rôles (Admin / User)</span></li>
              <li><span>Gestion d'état Redux Toolkit</span></li>
              <li><span>CRUD & Filtres dynamiques</span></li>
              <li><span>Design Responsive Bootstrap 5</span></li>
            </ul>
          </Col>

          <Col lg={3} md={6}>
            <h6 className="text-white fw-bold mb-3">Dépôt GitHub</h6>
            <p className="text-muted small">
              Le code source officiel de ce projet amélioré est disponible publiquement sur GitHub.
            </p>
            <a
              href="https://github.com/AyaBouzommita/Projet-MERN"
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline-warning btn-sm fw-semibold"
            >
              ⭐ Voir sur GitHub
            </a>
          </Col>
        </Row>

        <hr className="my-4 border-secondary opacity-25" />

        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center text-muted small">
          <p className="mb-0">© {new Date().getFullYear()} Projet-MERN - Développé avec excellence par Aya Bouzommita.</p>
          <p className="mb-0">Filière Ingénieur Génie Logiciel (FIGL3)</p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
