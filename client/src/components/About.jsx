import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IconCheck, IconRocket, IconCode, IconShield, IconArrowRight } from "./common/Icons";

function About() {
  return (
    <div className="py-5 bg-white">
      <Container>
        {/* Header */}
        <div className="text-center max-w-700 mx-auto mb-5 pb-3">
          <div className="dev-pill mb-2">
            <IconRocket size={14} />
            <span>À Propos de DevShowcase</span>
          </div>
          <h1 className="display-5 fw-bold text-dark mb-3">
            La vitrine ouverte des talents & projets étudiants
          </h1>
          <p className="text-muted lead fs-6">
            Une plateforme collaborative conçue pour donner de la visibilité aux projets académiques, hackathons et travaux personnels des étudiants ingénieurs en informatique.
          </p>
        </div>

        {/* Story & Problem Statement */}
        <div className="p-4 p-md-5 bg-light border rounded-4 mb-5">
          <Row className="align-items-center gy-4">
            <Col lg={6}>
              <span className="text-primary fw-bold small text-uppercase">Le Constat</span>
              <h3 className="fw-bold text-dark mb-3">Trop de projets brillants finissent oubliés après la soutenance</h3>
              <p className="text-muted mb-3">
                Chaque semestre, les étudiants conçoivent des dizaines d'applications innovantes, de prototypes d'IA et de systèmes embarqués dans le cadre de leurs cours et PFE. Pourtant, une fois la note attribuée, ces dépôts GitHub restent méconnus et inexploités.
              </p>
              <p className="text-muted mb-4">
                <strong>DevShowcase</strong> a été créé pour changer cela : offrir un espace moderne, inspiré de Product Hunt, où chaque étudiant peut exposer sa démo, recevoir des votes d'encouragement de ses pairs, et trouver des co-équipiers passionnés.
              </p>
              <div className="d-flex flex-column gap-2 small text-dark fw-semibold">
                <div className="d-flex align-items-center gap-2">
                  <span className="text-primary"><IconCheck size={18} /></span>
                  <span>100% gratuit et ouvert à tous les étudiants d'ingénierie</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <span className="text-primary"><IconCheck size={18} /></span>
                  <span>Système d'Upvotes transparent pour mettre en avant l'ingéniosité</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <span className="text-primary"><IconCheck size={18} /></span>
                  <span>Filtres par technologies : React, Python, Flutter, Docker, etc.</span>
                </div>
              </div>
            </Col>

            <Col lg={6}>
              <div className="p-4 bg-white border rounded-4 shadow-sm">
                <h5 className="fw-bold text-dark mb-3 d-flex align-items-center gap-2">
                  <IconCode size={20} className="text-primary" />
                  <span>Architecture & Génie Logiciel</span>
                </h5>
                <p className="text-muted small mb-3">
                  Cette plateforme est elle-même un projet d'ingénierie logicielle complet conçu par <strong>Aya Bouzommita</strong> dans le cadre de la filière <strong>FIGL3</strong> :
                </p>
                <div className="d-flex flex-column gap-2 text-muted small">
                  <div className="p-2 bg-light rounded border">
                    <strong className="text-dark d-block">Backend MVC & API RESTful :</strong>
                    Express.js 5, contrôleurs modulaires, routes typées et gestion d'erreurs normalisée.
                  </div>
                  <div className="p-2 bg-light rounded border">
                    <strong className="text-dark d-block">Sécurité & Authentification :</strong>
                    Jeton JWT d'authentification, mots de passe salés et hachés avec Bcrypt, en-têtes Helmet.
                  </div>
                  <div className="p-2 bg-light rounded border">
                    <strong className="text-dark d-block">Frontend Réactif & Optimiste :</strong>
                    React 19, Redux Toolkit avec mise à jour immédiate des votes et filtres instantanés.
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>

        {/* CTA */}
        <div className="p-5 bg-dark text-white rounded-4 text-center">
          <h3 className="fw-bold mb-2">Vous avez créé un projet dont vous êtes fier ?</h3>
          <p className="text-white-50 small mb-4 max-w-500 mx-auto">
            Publiez-le dès aujourd'hui sur DevShowcase et partagez votre savoir-faire avec la communauté !
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Button as={Link} to="/products" className="btn-dev-submit px-4 py-2">
              Explorer les réalisations
            </Button>
            <Button as={Link} to="/contact" variant="outline-light" className="px-4 py-2">
              Nous contacter / Suggérer une idée
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default About;
