import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    orderNumber: "",
    subject: "Livraison & Suivi",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }
    toast.success("Votre demande a été envoyée au service client SHEIN. Réponse sous 24h.");
    setFormData({ name: "", email: "", orderNumber: "", subject: "Livraison & Suivi", message: "" });
  };

  return (
    <div className="py-5 bg-white">
      <Container>
        <div className="text-center max-w-700 mx-auto mb-5 pb-3">
          <span className="badge bg-danger text-uppercase px-3 py-2 fw-bold mb-3 letter-spacing-1">
            SERVICE CLIENT & SUPPORT
          </span>
          <h1 className="display-5 fw-extrabold text-dark text-uppercase letter-spacing-1 mb-2">
            Besoin d'aide avec une commande ?
          </h1>
          <p className="text-muted small">
            Notre équipe d'assistance SHEIN est à votre disposition 7j/7 pour vous renseigner et vous accompagner.
          </p>
        </div>

        <Row className="justify-content-center">
          <Col lg={10}>
            <div className="border rounded-4 shadow-sm overflow-hidden">
              <Row className="g-0">
                <Col md={5} className="p-4 p-lg-5 bg-light border-end d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="fw-extrabold text-dark text-uppercase letter-spacing-1 mb-3">
                      Assistance Directe
                    </h5>
                    <p className="text-muted small mb-4">
                      Pour une réponse instantanée, vous pouvez contacter nos conseillers via nos canaux prioritaires :
                    </p>

                    <div className="d-flex flex-column gap-3 small text-muted">
                      <div className="p-3 bg-white border rounded-3">
                        <strong className="text-dark d-block mb-1">WhatsApp Express :</strong>
                        <span className="text-success fw-bold">+216 55 100 200</span>
                        <div className="text-muted" style={{ fontSize: "0.75rem" }}>Réponse moyenne en 15 minutes</div>
                      </div>

                      <div className="p-3 bg-white border rounded-3">
                        <strong className="text-dark d-block mb-1">Ligne Téléphonique :</strong>
                        <span className="fw-bold text-dark">+216 71 200 300</span>
                        <div className="text-muted" style={{ fontSize: "0.75rem" }}>Du lundi au samedi : 08h30 - 19h00</div>
                      </div>

                      <div className="p-3 bg-white border rounded-3">
                        <strong className="text-dark d-block mb-1">Email Réclamation :</strong>
                        <span>support@shein.tn</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-top mt-4 text-muted small">
                    Garantie réponse sous 24h ouvrées
                  </div>
                </Col>

                <Col md={7} className="p-4 p-lg-5 bg-white">
                  <h5 className="fw-extrabold text-dark text-uppercase letter-spacing-1 mb-4">
                    Envoyer un message
                  </h5>
                  <Form onSubmit={handleSubmit}>
                    <Row className="g-3 mb-3">
                      <Col sm={6}>
                        <Form.Label className="small fw-semibold text-dark">Nom et prénom *</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          placeholder="Votre nom complet"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </Col>
                      <Col sm={6}>
                        <Form.Label className="small fw-semibold text-dark">Adresse email *</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          placeholder="votre.email@domaine.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </Col>
                    </Row>

                    <Row className="g-3 mb-3">
                      <Col sm={6}>
                        <Form.Label className="small fw-semibold text-dark">Numéro de commande (si applicable)</Form.Label>
                        <Form.Control
                          type="text"
                          name="orderNumber"
                          placeholder="Ex: SH-89241"
                          value={formData.orderNumber}
                          onChange={handleChange}
                        />
                      </Col>
                      <Col sm={6}>
                        <Form.Label className="small fw-semibold text-dark">Motif de la demande *</Form.Label>
                        <Form.Select name="subject" value={formData.subject} onChange={handleChange}>
                          <option value="Livraison & Suivi">Livraison & Suivi de colis</option>
                          <option value="Retour & Échange">Retour & Échange de taille</option>
                          <option value="Remboursement">Demande de remboursement</option>
                          <option value="Autre question">Autre question sur un produit</option>
                        </Form.Select>
                      </Col>
                    </Row>

                    <Form.Group className="mb-4">
                      <Form.Label className="small fw-semibold text-dark">Message *</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        name="message"
                        placeholder="Expliquez-nous en détail votre demande..."
                        value={formData.message}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>

                    <Button type="submit" className="btn-shein-primary w-100 py-3 text-uppercase fw-bold letter-spacing-1">
                      Envoyer la demande
                    </Button>
                  </Form>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Contact;
