import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
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
    toast.success("Votre demande a été transmise à notre équipe technique");
    setFormData({ name: "", email: "", company: "", subject: "", message: "" });
  };

  return (
    <div className="py-5">
      <Container>
        <Row className="justify-content-center">
          <Col lg={10}>
            <div className="bg-white border rounded-4 shadow-sm overflow-hidden">
              <Row className="g-0">
                <Col md={5} className="p-4 p-lg-5 bg-light border-end d-flex flex-column justify-content-between">
                  <div>
                    <span className="pro-category-tag">Support & Commercial</span>
                    <h3 className="fw-bold text-dark mb-3">Contactez nos services</h3>
                    <p className="text-muted small mb-4">
                      Nos conseillers techniques et notre service commercial répondent à vos demandes de cotation et d'assistance.
                    </p>

                    <div className="d-flex flex-column gap-3 small text-muted">
                      <div>
                        <strong className="text-dark d-block">Adresse :</strong>
                        Immeuble Technopark, Les Berges du Lac 2, 1053 Tunis
                      </div>
                      <div>
                        <strong className="text-dark d-block">Courriel :</strong>
                        contact@techstore.tn / aya.bouzommita@isimg.tn
                      </div>
                      <div>
                        <strong className="text-dark d-block">Horaires d'ouverture :</strong>
                        Du lundi au vendredi de 08h30 à 18h00, samedi de 09h00 à 13h00
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-top mt-4 text-muted small">
                    TechStore Pro — Distributeur certifié
                  </div>
                </Col>

                <Col md={7} className="p-4 p-lg-5">
                  <h4 className="fw-bold text-dark mb-4">Formulaire de demande</h4>
                  <Form onSubmit={handleSubmit}>
                    <Row className="g-3 mb-3">
                      <Col sm={6}>
                        <Form.Label className="fw-semibold small text-dark">Nom et prénom *</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          placeholder="Votre nom"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </Col>
                      <Col sm={6}>
                        <Form.Label className="fw-semibold small text-dark">Email de contact *</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          placeholder="nom@entreprise.tn"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </Col>
                    </Row>

                    <Row className="g-3 mb-3">
                      <Col sm={6}>
                        <Form.Label className="fw-semibold small text-dark">Société / Établissement</Form.Label>
                        <Form.Control
                          type="text"
                          name="company"
                          placeholder="Nom de l'entreprise"
                          value={formData.company}
                          onChange={handleChange}
                        />
                      </Col>
                      <Col sm={6}>
                        <Form.Label className="fw-semibold small text-dark">Objet de la demande</Form.Label>
                        <Form.Control
                          type="text"
                          name="subject"
                          placeholder="Ex: Devis matériel 10 postes"
                          value={formData.subject}
                          onChange={handleChange}
                        />
                      </Col>
                    </Row>

                    <Form.Group className="mb-4">
                      <Form.Label className="fw-semibold small text-dark">Message détaillé *</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        name="message"
                        placeholder="Précisez votre besoin en équipement, références souhaitées..."
                        value={formData.message}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>

                    <Button type="submit" className="btn-primary-pro w-100 py-2 justify-content-center">
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
