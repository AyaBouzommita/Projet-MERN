import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { IconCheck, IconShield, IconBox } from "./common/Icons";

function About() {
  return (
    <div className="py-5">
      <Container>
        <div className="max-w-700 mx-auto text-center mb-5">
          <div className="hero-pill mx-auto">
            <span className="badge-status-dot" style={{ backgroundColor: "#2563eb" }}></span>
            <span>Spécification & Ingénierie Logicielle</span>
          </div>
          <h2 className="display-6 fw-bold text-dark mb-3">Architecture du Système TechStore</h2>
          <p className="text-muted lead fs-6">
            Développée par <strong>Aya Bouzommita</strong> dans le cadre de la filière Ingénieur Génie Logiciel (FIGL3), cette application démontre la mise en œuvre des bonnes pratiques de conception fullstack.
          </p>
        </div>

        <Row className="gy-4 mb-5">
          <Col lg={6}>
            <div className="p-4 bg-white border rounded-4 shadow-sm h-100">
              <div className="d-flex align-items-center gap-3 mb-4">
                <div className="trust-icon-wrapper">
                  <IconShield size={22} />
                </div>
                <div>
                  <h5 className="fw-bold text-dark mb-0">Normes de Conception Backend</h5>
                  <span className="text-muted small">Pattern MVC & Sécurité</span>
                </div>
              </div>

              <div className="d-flex flex-column gap-3 text-muted small">
                <div className="d-flex align-items-start gap-2">
                  <span className="text-primary mt-1"><IconCheck size={16} /></span>
                  <div>
                    <strong className="text-dark d-block">Séparation des responsabilités (MVC)</strong>
                    Découplage strict entre les contrôleurs (logique métier), les modèles Mongoose (schémas et règles de validation) et les routeurs Express.
                  </div>
                </div>

                <div className="d-flex align-items-start gap-2">
                  <span className="text-primary mt-1"><IconCheck size={16} /></span>
                  <div>
                    <strong className="text-dark d-block">Sécurisation & Isolation des environnements</strong>
                    Gestion centralisée des secrets via <code>dotenv</code>, hashage des mots de passe avec sel cryptographique (Bcrypt) et protection des en-têtes HTTP avec Helmet.
                  </div>
                </div>

                <div className="d-flex align-items-start gap-2">
                  <span className="text-primary mt-1"><IconCheck size={16} /></span>
                  <div>
                    <strong className="text-dark d-block">Gestion des autorisations (RBAC)</strong>
                    Protection des routes sensibles à l'aide de jetons d'accès JWT (JSON Web Tokens) avec vérification de rôle administrateur.
                  </div>
                </div>
              </div>
            </div>
          </Col>

          <Col lg={6}>
            <div className="p-4 bg-white border rounded-4 shadow-sm h-100">
              <div className="d-flex align-items-center gap-3 mb-4">
                <div className="trust-icon-wrapper" style={{ backgroundColor: "#ecfdf5", color: "#059669" }}>
                  <IconBox size={22} />
                </div>
                <div>
                  <h5 className="fw-bold text-dark mb-0">Architecture Frontend & État Global</h5>
                  <span className="text-muted small">React 19 & Redux Toolkit</span>
                </div>
              </div>

              <div className="d-flex flex-column gap-3 text-muted small">
                <div className="d-flex align-items-start gap-2">
                  <span className="text-success mt-1"><IconCheck size={16} /></span>
                  <div>
                    <strong className="text-dark d-block">État global asynchrone (Redux Toolkit)</strong>
                    Remplacement des déclencheurs manuels de rafraîchissement par des <code>createAsyncThunk</code> et <code>extraReducers</code> prédictibles et immuables.
                  </div>
                </div>

                <div className="d-flex align-items-start gap-2">
                  <span className="text-success mt-1"><IconCheck size={16} /></span>
                  <div>
                    <strong className="text-dark d-block">Performance & Bundling Vite</strong>
                    Compilation optimisée avec Rollup/Vite garantissant des temps de chargement minimes et un découpage modulaire du code.
                  </div>
                </div>

                <div className="d-flex align-items-start gap-2">
                  <span className="text-success mt-1"><IconCheck size={16} /></span>
                  <div>
                    <strong className="text-dark d-block">Expérience utilisateur fluide</strong>
                    Notifications non intrusives, filtrage en temps réel, tri dynamique et modales de confirmation.
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        <div className="p-4 bg-white border rounded-4 shadow-sm text-center">
          <div className="d-inline-flex align-items-center gap-2 mb-2">
            <span className="badge-status badge-member">
              <span className="badge-status-dot" style={{ backgroundColor: "#2563eb" }}></span>
              Projet Académique & Professionnel
            </span>
          </div>
          <h5 className="fw-bold text-dark mb-1">Aya Bouzommita — Filière Ingénieur GL3</h5>
          <p className="text-muted small mb-3">
            Dépôt officiel du code source :{" "}
            <a href="https://github.com/AyaBouzommita/Projet-MERN" target="_blank" rel="noreferrer" className="text-primary fw-semibold text-decoration-none">
              github.com/AyaBouzommita/Projet-MERN
            </a>
          </p>
        </div>
      </Container>
    </div>
  );
}

export default About;
