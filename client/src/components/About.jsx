import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IconShield, IconTruck, IconHeart, IconBox, IconCheck, IconArrowRight } from "./common/Icons";

function About() {
  return (
    <div className="py-5 bg-white">
      <Container>
        {/* Hero Section */}
        <div className="text-center max-w-700 mx-auto mb-5 pb-3">
          <span className="badge bg-dark text-uppercase px-3 py-2 fw-bold mb-3 letter-spacing-1">
            À PROPOS DE SHEIN
          </span>
          <h1 className="display-4 fw-extrabold text-dark text-uppercase letter-spacing-1 mb-3">
            Rendre la mode accessible à tous
          </h1>
          <p className="text-muted lead fs-6">
            SHEIN est un e-commerçant mondial de mode et de style de vie qui s'engage à rendre le shopping tendance abordable et inspirant pour chaque style, chaque morphologie et chaque occasion.
          </p>
        </div>

        {/* Chiffres Clés */}
        <Row className="g-4 mb-5 text-center">
          <Col lg={3} sm={6}>
            <div className="p-4 bg-light border rounded-3 h-100">
              <div className="display-5 fw-extrabold text-danger mb-1">+150</div>
              <div className="fw-bold text-dark small text-uppercase">Pays Desservis</div>
              <p className="text-muted small mb-0">Une communauté mondiale de millions de passionnés de mode.</p>
            </div>
          </Col>
          <Col lg={3} sm={6}>
            <div className="p-4 bg-light border rounded-3 h-100">
              <div className="display-5 fw-extrabold text-dark mb-1">1000+</div>
              <div className="fw-bold text-dark small text-uppercase">Nouveautés Quotidiennes</div>
              <p className="text-muted small mb-0">Des collections constamment renouvelées aux dernières tendances.</p>
            </div>
          </Col>
          <Col lg={3} sm={6}>
            <div className="p-4 bg-light border rounded-3 h-100">
              <div className="display-5 fw-extrabold text-danger mb-1">24/48h</div>
              <div className="fw-bold text-dark small text-uppercase">Livraison Express Tunisie</div>
              <p className="text-muted small mb-0">Expédition rapide et sécurisée dans les 24 gouvernorats.</p>
            </div>
          </Col>
          <Col lg={3} sm={6}>
            <div className="p-4 bg-light border rounded-3 h-100">
              <div className="display-5 fw-extrabold text-dark mb-1">30 Jours</div>
              <div className="fw-bold text-dark small text-uppercase">Retours Gratuits</div>
              <p className="text-muted small mb-0">Essayez tranquillement chez vous avec échange simplifié.</p>
            </div>
          </Col>
        </Row>

        {/* Mission & Vision */}
        <div className="p-4 p-md-5 border rounded-4 mb-5">
          <Row className="align-items-center gy-4">
            <Col lg={6}>
              <span className="text-danger fw-bold small text-uppercase letter-spacing-1">NOTRE MISSION</span>
              <h3 className="fw-extrabold text-dark mb-3">La beauté de la mode pour chacun d'entre nous</h3>
              <p className="text-muted mb-3">
                Nous pensons que chacun devrait pouvoir exprimer sa personnalité à travers ses vêtements, sans compromis sur le style ou sur son budget.
              </p>
              <p className="text-muted mb-4">
                Grâce à un modèle de production agile et à une chaîne logistique optimisée à la pointe de l'innovation, SHEIN propose les dernières coupes de podiums, basiques intemporels, tenues de soirée et accessoires tendance à des prix imbattables.
              </p>
              <div className="d-flex flex-column gap-2 small text-dark fw-semibold">
                <div className="d-flex align-items-center gap-2">
                  <span className="text-danger"><IconCheck size={18} /></span>
                  <span>Guide de tailles inclusif pour toutes les morphologies (du XS au XL+)</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <span className="text-danger"><IconCheck size={18} /></span>
                  <span>Contrôle qualité rigoureux sur les matières et les finitions</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <span className="text-danger"><IconCheck size={18} /></span>
                  <span>Paiement à la réception de votre colis en toute sérénité</span>
                </div>
              </div>
            </Col>

            <Col lg={6}>
              <img
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80"
                alt="SHEIN Fashion"
                className="img-fluid rounded-4 shadow-sm w-100"
                style={{ maxHeight: "380px", objectFit: "cover" }}
              />
            </Col>
          </Row>
        </div>

        {/* CTA */}
        <div className="p-5 bg-dark text-white rounded-4 text-center">
          <h3 className="fw-extrabold text-uppercase letter-spacing-1 mb-2">
            Prête à renouveler votre garde-robe ?
          </h3>
          <p className="text-white-50 small mb-4 max-w-500 mx-auto">
            Découvrez des centaines de pièces mode exclusives et profitez de la livraison gratuite dès 100 TND d'achat.
          </p>
          <Button as={Link} to="/products" className="btn-shein-primary px-5 py-3 fw-bold text-uppercase letter-spacing-1">
            Voir le catalogue de mode
          </Button>
        </div>
      </Container>
    </div>
  );
}

export default About;
