import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Veuillez remplir tous les champs obligatoires !");
      return;
    }
    toast.success("Merci ! Votre message a bien été envoyé avec succès.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="border-0 shadow-lg rounded-4 overflow-hidden">
            <Row className="g-0">
              <Col md={5} className="bg-primary text-white p-4 p-md-5 d-flex flex-column justify-content-between">
                <div>
                  <h3 className="fw-bold mb-3">Contactez-nous</h3>
                  <p className="text-white-50 small mb-4">
                    Une question sur le projet, un retour ou une opportunité de collaboration ? Laissez-nous un message !
                  </p>
                  <div className="d-flex flex-column gap-3 small">
                    <div className="d-flex align-items-center gap-2">
                      <span>📧</span>
                      <span>aya.bouzommita@isimg.tn</span>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <span>🎓</span>
                      <span>Institut Supérieur d'Informatique</span>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <span>💻</span>
                      <span>Génie Logiciel (FIGL3)</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-top border-white border-opacity-25 small text-white-50">
                  © {new Date().getFullYear()} Projet-MERN
                </div>
              </Col>

              <Col md={7} className="p-4 p-md-5 bg-white">
                <h4 className="fw-bold mb-4 text-dark">Envoyer un Message</h4>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold small">Nom & Prénom *</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="Votre nom"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold small">Email *</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="votre.email@exemple.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold small">Sujet</Form.Label>
                    <Form.Control
                      type="text"
                      name="subject"
                      placeholder="Objet du message"
                      value={formData.subject}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="fw-semibold small">Message *</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      name="message"
                      placeholder="Votre message ici..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit" className="w-100 py-2 fw-semibold">
                    Envoyer le message ✉️
                  </Button>
                </Form>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Contact;
