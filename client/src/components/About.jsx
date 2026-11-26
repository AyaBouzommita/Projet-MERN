import React from "react";
import { Container, Row, Col, Card, Badge, ListGroup } from "react-bootstrap";

function About() {
  return (
    <Container className="py-5">
      <div className="text-center max-w-700 mx-auto mb-5">
        <Badge bg="primary" className="px-3 py-2 fs-6 fw-bold mb-2">
          À PROPOS DU PROJET
        </Badge>
        <h2 className="display-6 fw-bold text-dark">Architecture & Ingénierie Logicielle (GL3)</h2>
        <p className="text-muted">
          Conception et amélioration avancée d'une application MERN réalisée par <strong>Aya Bouzommita</strong>.
        </p>
      </div>

      <Row className="gy-4 mb-5">
        <Col lg={6}>
          <Card className="h-100 border-0 shadow-sm rounded-4 p-4">
            <h4 className="fw-bold text-primary mb-3">🎯 Objectifs du Projet</h4>
            <p className="text-muted">
              Ce projet a pour objectif de transformer une application de base CRUD en une solution d'entreprise moderne, conforme aux standards de qualité du <strong>Génie Logiciel (FIGL3)</strong> :
            </p>
            <ListGroup variant="flush" className="small">
              <ListGroup.Item className="d-flex align-items-center gap-2 px-0 border-0">
                <span className="text-success fs-5">✓</span>
                <span><strong>Sécurité des données</strong> : Élimination des identifiants en clair avec <code>dotenv</code> et hashage <code>bcryptjs</code>.</span>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex align-items-center gap-2 px-0 border-0">
                <span className="text-success fs-5">✓</span>
                <span><strong>Authentification Robuste</strong> : Implémentation complète de JWT (JSON Web Tokens) avec middleware <code>isAuth</code> et rôles <code>isAdmin</code>.</span>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex align-items-center gap-2 px-0 border-0">
                <span className="text-success fs-5">✓</span>
                <span><strong>Architecture MVC</strong> : Séparation rigoureuse en Controllers, Routes, Models, et Middlewares.</span>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex align-items-center gap-2 px-0 border-0">
                <span className="text-success fs-5">✓</span>
                <span><strong>Gestion d'état Redux Toolkit</strong> : Élimination du cycle <code>ping/setping</code> au profit d'un état global réactif et optimiste.</span>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>

        <Col lg={6}>
          <Card className="h-100 border-0 shadow-sm rounded-4 p-4">
            <h4 className="fw-bold text-success mb-3">💻 Stack Technologique</h4>
            <div className="d-flex flex-column gap-3">
              <div className="p-3 bg-light rounded-3">
                <h6 className="fw-bold mb-1">Backend (Node.js & Express)</h6>
                <p className="text-muted small mb-0">Express 5, Mongoose ODM, Helmet (sécurité HTTP), Morgan (logs), CORS, Bcryptjs, JWT.</p>
              </div>
              <div className="p-3 bg-light rounded-3">
                <h6 className="fw-bold mb-1">Frontend (React 19 & Vite)</h6>
                <p className="text-muted small mb-0">React 19, Redux Toolkit, React-Bootstrap 5, React Router Dom 6, React Toastify.</p>
              </div>
              <div className="p-3 bg-light rounded-3">
                <h6 className="fw-bold mb-1">Base de Données Cloud</h6>
                <p className="text-muted small mb-0">MongoDB Atlas avec schémas typés et validation de données.</p>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      <Card className="border-0 shadow-sm rounded-4 p-4 text-center bg-primary text-white">
        <h4 className="fw-bold mb-2">Développé avec rigueur et passion</h4>
        <p className="mb-3 text-white-50">
          Projet disponible sur GitHub : <a href="https://github.com/AyaBouzommita/Projet-MERN" target="_blank" rel="noreferrer" className="text-warning fw-bold text-decoration-none">AyaBouzommita/Projet-MERN</a>
        </p>
        <span className="badge bg-light text-primary px-3 py-2 align-self-center">Filière Ingénieur Génie Logiciel 3 (FIGL3)</span>
      </Card>
    </Container>
  );
}

export default About;
