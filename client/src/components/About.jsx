import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IconShield, IconTruck, IconHeadphones, IconBox, IconCheck, IconArrowRight } from "./common/Icons";

function About() {
  return (
    <div className="py-5">
      <Container>
        {/* Hero Section Commerciale */}
        <div className="text-center max-w-700 mx-auto mb-5 pb-3">
          <div className="hero-pill mx-auto">
            <span className="badge-status-dot" style={{ backgroundColor: "#2563eb" }}></span>
            <span>Notre Histoire & Notre Vision</span>
          </div>
          <h1 className="display-5 fw-bold text-dark mb-3">
            Votre partenaire de confiance en technologie & informatique
          </h1>
          <p className="text-muted lead fs-6">
            TechStore est une enseigne commerciale spécialisée dans la distribution de matériel informatique, stations de travail, périphériques et équipements high-tech certifiés pour professionnels et particuliers en Tunisie.
          </p>
        </div>

        {/* Chiffres Clés */}
        <Row className="g-4 mb-5">
          <Col lg={3} sm={6}>
            <div className="p-4 bg-white border rounded-4 text-center shadow-sm h-100">
              <div className="display-6 fw-bold text-primary mb-1">+15 000</div>
              <div className="fw-semibold text-dark small mb-1">Commandes livrées</div>
              <p className="text-muted small mb-0">Partout en Tunisie avec un taux de satisfaction de 99%</p>
            </div>
          </Col>

          <Col lg={3} sm={6}>
            <div className="p-4 bg-white border rounded-4 text-center shadow-sm h-100">
              <div className="display-6 fw-bold text-success mb-1">24/48h</div>
              <div className="fw-semibold text-dark small mb-1">Délai moyen d'expédition</div>
              <p className="text-muted small mb-0">Livraison express dans l'ensemble des 24 gouvernorats</p>
            </div>
          </Col>

          <Col lg={3} sm={6}>
            <div className="p-4 bg-white border rounded-4 text-center shadow-sm h-100">
              <div className="display-6 fw-bold text-dark mb-1">+50</div>
              <div className="fw-semibold text-dark small mb-1">Marques partenaires</div>
              <p className="text-muted small mb-0">Apple, Dell, Lenovo, Asus, Samsung, Sony, HP, Logitech</p>
            </div>
          </Col>

          <Col lg={3} sm={6}>
            <div className="p-4 bg-white border rounded-4 text-center shadow-sm h-100">
              <div className="display-6 fw-bold text-warning mb-1">2 Ans</div>
              <div className="fw-semibold text-dark small mb-1">Garantie constructeur</div>
              <p className="text-muted small mb-0">Assistance technique et SAV officiel agréé</p>
            </div>
          </Col>
        </Row>

        {/* Présentation de l'Entreprise */}
        <div className="p-4 p-md-5 bg-white border rounded-4 shadow-sm mb-5">
          <Row className="align-items-center gy-4">
            <Col lg={6}>
              <span className="pro-category-tag">Qui sommes-nous ?</span>
              <h3 className="fw-bold text-dark mb-3">Une exigence absolue sur la qualité et l'authenticité</h3>
              <p className="text-muted mb-3">
                Créée pour répondre à une demande croissante d'équipements informatiques fiables et garantis, <strong>TechStore</strong> collabore directement avec les importateurs officiels et constructeurs internationaux.
              </p>
              <p className="text-muted mb-4">
                Que vous soyez une entreprise cherchant à renouveler son parc de postes de travail, un développeur en quête de puissance de calcul, ou un passionné exigeant le meilleur équipement, notre catalogue réunit les meilleures références du marché au tarif le plus juste.
              </p>
              <div className="d-flex flex-column gap-2 small text-dark fw-semibold">
                <div className="d-flex align-items-center gap-2">
                  <span className="text-primary"><IconCheck size={18} /></span>
                  <span>Matériel 100% original, neuf, sous emballage scellé d'origine</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <span className="text-primary"><IconCheck size={18} /></span>
                  <span>Facturation légale avec TVA déductible pour les entreprises</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <span className="text-primary"><IconCheck size={18} /></span>
                  <span>Conseillers commerciaux et techniciens formés et disponibles</span>
                </div>
              </div>
            </Col>

            <Col lg={6}>
              <div className="p-4 bg-light border rounded-4">
                <h5 className="fw-bold text-dark mb-3">Nos 4 Piliers Fondamentaux</h5>
                <div className="d-flex flex-column gap-3">
                  <div className="d-flex align-items-start gap-3">
                    <div className="trust-icon-wrapper" style={{ flexShrink: 0 }}>
                      <IconShield size={20} />
                    </div>
                    <div>
                      <div className="fw-bold text-dark small">Garantie & Authenticité</div>
                      <div className="text-muted small">Chaque produit bénéficie d'une traçabilité irréprochable et de la garantie constructeur officielle.</div>
                    </div>
                  </div>

                  <div className="d-flex align-items-start gap-3">
                    <div className="trust-icon-wrapper" style={{ flexShrink: 0, backgroundColor: "#ecfdf5", color: "#059669" }}>
                      <IconTruck size={20} />
                    </div>
                    <div>
                      <div className="fw-bold text-dark small">Logistique Dédiée</div>
                      <div className="text-muted small">Emballage antichoc renforcé et remise en main propre sécurisée à domicile ou en entreprise.</div>
                    </div>
                  </div>

                  <div className="d-flex align-items-start gap-3">
                    <div className="trust-icon-wrapper" style={{ flexShrink: 0, backgroundColor: "#fffbeb", color: "#d97706" }}>
                      <IconHeadphones size={20} />
                    </div>
                    <div>
                      <div className="fw-bold text-dark small">Support & SAV Réactif</div>
                      <div className="text-muted small">Diagnostic rapide, prise en charge immédiate sous garantie et prêt de matériel de secours possible.</div>
                    </div>
                  </div>

                  <div className="d-flex align-items-start gap-3">
                    <div className="trust-icon-wrapper" style={{ flexShrink: 0 }}>
                      <IconBox size={20} />
                    </div>
                    <div>
                      <div className="fw-bold text-dark small">Transparence des Prix</div>
                      <div className="text-muted small">Prix clairs en Dinars Tunisiens (TTC) sans frais cachés avec devis immédiat en ligne.</div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>

        {/* Showroom & Call to Action */}
        <div className="p-4 p-md-5 bg-white border rounded-4 text-center shadow-sm">
          <h4 className="fw-bold text-dark mb-2">Visitez notre showroom aux Berges du Lac 2</h4>
          <p className="text-muted small max-w-700 mx-auto mb-4">
            Venez découvrir, manipuler et tester les derniers modèles d'ordinateurs, écrans OLED et accessoires high-tech. Nos experts sont à votre disposition pour vous orienter vers la solution la plus adaptée à vos besoins.
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Button as={Link} to="/products" className="btn-primary-pro px-4 py-2">
              <span>Parcourir nos produits en stock</span>
              <IconArrowRight size={16} />
            </Button>
            <Button as={Link} to="/contact" className="btn-outline-pro px-4 py-2">
              Nous contacter / Demander un devis
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default About;
