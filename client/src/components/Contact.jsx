import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { IconRocket, IconCheck } from "./common/Icons";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    school: "ISIMG / Université",
    subject: "Proposition de projet ou partenariat",
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
    toast.success("Merci ! Votre message a été transmis à l'équipe DevShowcase.");
    setFormData({ name: "", email: "", school: "ISIMG / Université", subject: "Proposition de projet ou partenariat", message: "" });
  };

  return (
    <div className="py-5 bg-white">
      <Container>
        <div className="text-center max-w-700 mx-auto mb-5 pb-3">
          <div className="dev-pill mb-2">
            <IconRocket size={14} />
            <span>Support & Partenariats</span>
          </div>
          <h1 className="display-5 fw-bold text-dark mb-2">
            Contactez la communauté DevShowcase
          </h1>
          <p className="text-muted small">
            Une question sur la plateforme, une idée d'amélioration ou un partenariat club étudiant ? Écrivez-nous !
          </p>
        </div>

        <Row className="justify-content-center">
          <Col lg={10}>
            <div className="border rounded-4 shadow-sm overflow-hidden">
              <Row className="g-0">
                <Col md={5} className="p-4 p-lg-5 bg-light border-end d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="fw-bold text-dark mb-3">Échanges & Collaborations</h5>
                    <p className="text-muted small mb-4">
                      Nous encourageons les clubs d'informatique, organisateurs de hackathons et étudiants motivés à échanger avec nous :
                    </p>

                    <div className="d-flex flex-column gap-3 small text-muted">
                      <div className="p-3 bg-white border rounded-3">
                        <strong className="text-dark d-block mb-1">Email universitaire :</strong>
                        <span className="text-primary fw-semibold">aya.bouzommita@isimg.tn</span>
                      </div>

                      <div className="p-3 bg-white border rounded-3">
                        <strong className="text-dark d-block mb-1">Cadre académique :</strong>
                        <span>Filière Ingénieur Génie Logiciel (FIGL3)</span>
                      </div>

                      <div className="p-3 bg-white border rounded-3">
                        <strong className="text-dark d-block mb-1">Dépôt GitHub :</strong>
                        <a href="https://github.com/AyaBouzommita/Projet-MERN" target="_blank" rel="noreferrer" className="text-decoration-none text-dark fw-semibold">
                          github.com/AyaBouzommita/Projet-MERN
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-top mt-4 text-muted small">
                    Plateforme collaborative open-source
                  </div>
                </Col>

                <Col md={7} className="p-4 p-lg-5 bg-white">
                  <h5 className="fw-bold text-dark mb-4">Envoyer un message</h5>
                  <Form onSubmit={handleSubmit}>
                    <Row className="g-3 mb-3">
                      <Col sm={6}>
                        <Form.Label className="small fw-semibold text-dark">Nom et prénom *</Form.Label>
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
                        <Form.Label className="small fw-semibold text-dark">Email de contact *</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          placeholder="nom@universite.tn"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </Col>
                    </Row>

                    <Row className="g-3 mb-3">
                      <Col sm={6}>
                        <Form.Label className="small fw-semibold text-dark">Université / École</Form.Label>
                        <Form.Control
                          type="text"
                          name="school"
                          placeholder="Ex: ISIMG, INSAT, ESPRIT..."
                          value={formData.school}
                          onChange={handleChange}
                        />
                      </Col>
                      <Col sm={6}>
                        <Form.Label className="small fw-semibold text-dark">Objet</Form.Label>
                        <Form.Select name="subject" value={formData.subject} onChange={handleChange}>
                          <option value="Proposition de projet ou partenariat">Partenariat club étudiant</option>
                          <option value="Signalement de bug">Signalement de bug / amélioration</option>
                          <option value="Question sur le code">Question sur l'architecture logicielle</option>
                          <option value="Autre demande">Autre sujet</option>
                        </Form.Select>
                      </Col>
                    </Row>

                    <Form.Group className="mb-4">
                      <Form.Label className="small fw-semibold text-dark">Votre message *</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        name="message"
                        placeholder="Présentez votre idée, événement ou question..."
                        value={formData.message}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>

                    <Button type="submit" className="btn-dev-submit w-100 py-2 justify-content-center">
                      Envoyer le message
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
