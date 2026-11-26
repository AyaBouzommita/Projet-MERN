import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Merci ! Votre code de bienvenue -15% : BIENVENUE");
    setEmail("");
  };

  return (
    <footer className="shein-footer mt-auto border-top bg-white">
      {/* Newsletter Strip */}
      <div className="py-4 bg-dark text-white text-center">
        <Container>
          <Row className="justify-content-center">
            <Col lg={7}>
              <h5 className="fw-extrabold text-uppercase letter-spacing-1 mb-2">
                RECEVEZ -15% SUR VOTRE PREMIÈRE COMMANDE
              </h5>
              <p className="small text-white-50 mb-3">
                Inscrivez-vous à nos offres exclusives, nouveautés et alertes ventes flash en avant-première.
              </p>
              <Form onSubmit={handleSubscribe} className="d-flex gap-2 max-w-500 mx-auto" style={{ maxWidth: "450px" }}>
                <Form.Control
                  type="email"
                  placeholder="Votre adresse email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-0 py-2"
                  required
                />
                <Button variant="danger" type="submit" className="rounded-0 px-4 fw-bold text-uppercase">
                  S'inscrire
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Main Footer Links */}
      <Container className="py-5">
        <Row className="gy-4">
          <Col lg={3} sm={6}>
            <div className="shein-footer-heading">À PROPOS DE SHEIN</div>
            <ul className="list-unstyled d-flex flex-column gap-2 small text-muted">
              <li><Link to="/about" className="text-decoration-none text-muted">Qui sommes-nous ?</Link></li>
              <li><span className="cursor-pointer">Nos engagements mode durable</span></li>
              <li><span className="cursor-pointer">Programme d'influenceurs</span></li>
              <li><span className="cursor-pointer">Espace presse & médias</span></li>
              <li><span className="cursor-pointer">Carrières & Recrutement</span></li>
            </ul>
          </Col>

          <Col lg={3} sm={6}>
            <div className="shein-footer-heading">AIDE & SERVICE CLIENT</div>
            <ul className="list-unstyled d-flex flex-column gap-2 small text-muted">
              <li><Link to="/contact" className="text-decoration-none text-muted">Centre d'aide & FAQ</Link></li>
              <li><span className="cursor-pointer">Suivi de votre colis</span></li>
              <li><span className="cursor-pointer">Guide des tailles & mensurations</span></li>
              <li><span className="cursor-pointer">Politique de retour sous 30 jours</span></li>
              <li><span className="cursor-pointer">Modalités de remboursement</span></li>
            </ul>
          </Col>

          <Col lg={3} sm={6}>
            <div className="shein-footer-heading">LIVRAISON & PAIEMENT</div>
            <ul className="list-unstyled d-flex flex-column gap-2 small text-muted">
              <li><span>Paiement à la livraison (Cash on Delivery)</span></li>
              <li><span>Cartes Bancaires (GIM-TEL / ClicToPay)</span></li>
              <li><span>Livraison express 24/48h dans les 24 gouvernorats</span></li>
              <li><span>Frais de port offerts dès 100 TND</span></li>
              <li><span>Transactions 100% sécurisées SSL</span></li>
            </ul>
          </Col>

          <Col lg={3} sm={6}>
            <div className="shein-footer-heading">SERVICE CLIENT TUNISIE</div>
            <p className="small text-muted mb-2">
              Une question sur un article ou votre commande ? Notre équipe est à votre écoute :
            </p>
            <div className="small text-muted d-flex flex-column gap-1 mb-3">
              <div><strong>Téléphone :</strong> +216 71 200 300 / +216 29 100 200</div>
              <div><strong>WhatsApp :</strong> +216 55 100 200</div>
              <div><strong>Email :</strong> contact@shein.tn</div>
            </div>
            <div className="d-flex gap-2">
              <span className="badge bg-light text-dark border p-2">Instagram</span>
              <span className="badge bg-light text-dark border p-2">TikTok</span>
              <span className="badge bg-light text-dark border p-2">Facebook</span>
            </div>
          </Col>
        </Row>

        <div className="pt-4 mt-4 border-top d-flex flex-column flex-md-row justify-content-between align-items-center small text-muted">
          <div>© {new Date().getFullYear()} SHEIN Tunisie. Tous droits réservés.</div>
          <div className="d-flex gap-3 mt-2 mt-md-0">
            <span>Conditions Générales</span>
            <span>Politique de Confidentialité</span>
            <span>Préférences Cookies</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
