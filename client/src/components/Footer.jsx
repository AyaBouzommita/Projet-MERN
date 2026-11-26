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
              <div className="brand-icon-box" style={{ width: 32, height: 32 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polygon points="12 2 2 7 12 12 22 7 12 2" />
                  <polyline points="2 17 12 22 22 17" />
                  <polyline points="2 12 12 17 22 12" />
                </svg>
              </div>
              <span className="fw-bold text-dark fs-5">TechStore<span className="text-primary">.</span></span>
            </div>
            <p className="footer-text pe-lg-4 mb-3">
              Distributeur agréé d'équipements informatiques, ordinateurs haute performance, smartphones et accessoires de grandes marques en Tunisie.
            </p>
            <div className="footer-subtext d-flex flex-column gap-1">
              <div><strong>Showroom :</strong> Immeuble Technopark, Les Berges du Lac 2, Tunis</div>
              <div><strong>Téléphone :</strong> +216 71 890 123 / +216 29 450 450</div>
              <div><strong>Service client :</strong> contact@techstore.tn</div>
            </div>
          </Col>

          <Col lg={2} md={3} sm={6}>
            <div className="pro-footer-heading">Navigation</div>
            <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
              <li><Link to="/">Accueil</Link></li>
              <li><Link to="/products">Catalogue complet</Link></li>
              <li><Link to="/about">À propos de l'enseigne</Link></li>
              <li><Link to="/users">Notre équipe commerciale</Link></li>
              <li><Link to="/contact">Demander un devis</Link></li>
            </ul>
          </Col>

          <Col lg={3} md={3} sm={6}>
            <div className="pro-footer-heading">Nos Engagements</div>
            <ul className="list-unstyled d-flex flex-column gap-2 mb-0 footer-text">
              <li><span>Garantie constructeur officielle 2 ans</span></li>
              <li><span>Livraison express 24/48h sur toute la Tunisie</span></li>
              <li><span>Service après-vente agréé et réactif</span></li>
              <li><span>Paiement sécurisé à la livraison ou par carte</span></li>
              <li><span>Facturation avec TVA pour les sociétés</span></li>
            </ul>
          </Col>

          <Col lg={3} md={6}>
            <div className="pro-footer-heading">Horaires & Retrait</div>
            <div className="footer-text mb-3">
              Notre showroom et comptoir de retrait express sont ouverts pour vous accueillir :
            </div>
            <div className="footer-subtext p-3 bg-light rounded-3 border">
              <div className="d-flex justify-content-between mb-1">
                <span>Lundi — Vendredi :</span>
                <strong>08h30 - 18h30</strong>
              </div>
              <div className="d-flex justify-content-between mb-1">
                <span>Samedi :</span>
                <strong>09h00 - 14h00</strong>
              </div>
              <div className="d-flex justify-content-between text-muted">
                <span>Dimanche :</span>
                <span>Fermé</span>
              </div>
            </div>
          </Col>
        </Row>

        <div className="pt-4 border-top d-flex flex-column flex-sm-row justify-content-between align-items-center footer-subtext">
          <div>© {new Date().getFullYear()} TechStore Tunisie. Tous droits réservés.</div>
          <div className="d-flex gap-3 mt-2 mt-sm-0">
            <Link to="/about">Qui sommes-nous ?</Link>
            <Link to="/contact">Service client</Link>
            <Link to="/products">Boutique en ligne</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
