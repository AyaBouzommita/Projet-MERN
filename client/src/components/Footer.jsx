import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="pro-footer mt-auto">
      <Container>
        <Row className="gy-4 mb-5">
          <Col lg={4} md={6}>
            <div className="d-flex align-items-center gap-2 mb-3">
              <div className="brand-icon-box" style={{ width: 28, height: 28 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polygon points="12 2 2 7 12 12 22 7 12 2" />
                  <polyline points="2 17 12 22 22 17" />
                  <polyline points="2 12 12 17 22 12" />
                </svg>
              </div>
              <span className="fw-bold text-white fs-5">TechStore Pro</span>
            </div>
            <p className="text-muted small pe-lg-4 mb-4">
              Distributeur agréé de matériel informatique haute performance et d'équipements pour professionnels et particuliers en Tunisie.
            </p>
            <div className="text-muted small">
              <div>Siège social : Les Berges du Lac 2, Tunis</div>
              <div>Assistance technique : contact@techstore.tn</div>
            </div>
          </Col>

          <Col lg={2} md={3} sm={6}>
            <div className="pro-footer-heading">Navigation</div>
            <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
              <li><Link to="/">Accueil</Link></li>
              <li><Link to="/products">Catalogue matériel</Link></li>
              <li><Link to="/users">Membres & Équipe</Link></li>
              <li><Link to="/about">Présentation</Link></li>
              <li><Link to="/contact">Service client</Link></li>
            </ul>
          </Col>

          <Col lg={3} md={3} sm={6}>
            <div className="pro-footer-heading">Engagements</div>
            <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
              <li><span className="text-muted">Garantie constructeur officielle</span></li>
              <li><span className="text-muted">Livraison express 24/48h</span></li>
              <li><span className="text-muted">Paiement à la livraison ou par carte</span></li>
              <li><span className="text-muted">Service après-vente certifié</span></li>
              <li><span className="text-muted">Facturation avec TVA pour sociétés</span></li>
            </ul>
          </Col>

          <Col lg={3} md={6}>
            <div className="pro-footer-heading">Développement & Stack</div>
            <p className="text-muted small mb-3">
              Application d'ingénierie logicielle développée par <strong>Aya Bouzommita</strong> dans le cadre de la filière FIGL3.
            </p>
            <div className="d-flex flex-wrap gap-1">
              <span className="badge bg-secondary text-white small px-2 py-1">MongoDB Atlas</span>
              <span className="badge bg-secondary text-white small px-2 py-1">Express.js 5</span>
              <span className="badge bg-secondary text-white small px-2 py-1">React 19</span>
              <span className="badge bg-secondary text-white small px-2 py-1">Node.js</span>
              <span className="badge bg-secondary text-white small px-2 py-1">Redux Toolkit</span>
            </div>
          </Col>
        </Row>

        <div className="pt-4 border-top border-secondary border-opacity-25 d-flex flex-column flex-sm-row justify-content-between align-items-center text-muted small">
          <div>© {new Date().getFullYear()} TechStore Pro. Tous droits réservés.</div>
          <div className="mt-2 mt-sm-0">Filière Ingénieur Génie Logiciel — FIGL3</div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
