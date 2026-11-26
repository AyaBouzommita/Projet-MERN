import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Alert, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearError } from "../../redux/authSlice";
import { toast } from "react-toastify";
import { IconCheck } from "../common/Icons";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: 25,
    img: "",
    role: "user",
  });

  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(clearError());
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate, dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Veuillez renseigner tous les champs requis");
      return;
    }
    const resultAction = await dispatch(registerUser(formData));
    if (registerUser.fulfilled.match(resultAction)) {
      toast.success("Compte créé avec succès");
      navigate("/");
    } else {
      toast.error(resultAction.payload || "Échec de l'enregistrement");
    }
  };

  return (
    <div className="py-5">
      <Container>
        <Row className="justify-content-center">
          <Col lg={9} md={11}>
            <div className="auth-box-pro">
              <Row className="g-0">
                <Col md={5} className="auth-sidebar-pro d-none d-md-flex">
                  <div>
                    <div className="d-flex align-items-center gap-2 mb-4">
                      <div className="brand-icon-box" style={{ width: 30, height: 30 }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polygon points="12 2 2 7 12 12 22 7 12 2" />
                          <polyline points="2 17 12 22 22 17" />
                          <polyline points="2 12 12 17 22 12" />
                        </svg>
                      </div>
                      <span className="fw-bold text-white fs-5">TechStore</span>
                    </div>

                    <h4 className="fw-bold text-white mb-3">Inscription Collaborateur</h4>
                    <p className="text-white-50 small mb-4">
                      Rejoignez l'organisation pour accéder aux fonctionnalités de gestion avancée du catalogue et de l'inventaire.
                    </p>

                    <div className="d-flex flex-column gap-3 small text-white-50">
                      <div className="d-flex align-items-center gap-2">
                        <span className="text-primary"><IconCheck size={16} /></span>
                        <span>Gestion des stocks et fiches produits</span>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <span className="text-primary"><IconCheck size={16} /></span>
                        <span>Historique et métriques de l'équipe</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-top border-secondary border-opacity-25 small text-white-50">
                    Infrastructure certifiée MERN
                  </div>
                </Col>

                <Col md={7} className="p-4 p-lg-5 bg-white">
                  <div className="mb-4">
                    <h3 className="fw-bold text-dark mb-1">Créer un compte</h3>
                    <p className="text-muted small">Renseignez vos coordonnées professionnelles</p>
                  </div>

                  {error && <Alert variant="danger" className="py-2 small">{error}</Alert>}

                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold small text-dark">Nom et prénom *</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        placeholder="Ex: Selim Dridi"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold small text-dark">Email professionnel *</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="selim.d@techstore.tn"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>

                    <Row className="g-2 mb-3">
                      <Col sm={6}>
                        <Form.Label className="fw-semibold small text-dark">Mot de passe *</Form.Label>
                        <Form.Control
                          type="password"
                          name="password"
                          placeholder="••••••••"
                          value={formData.password}
                          onChange={handleChange}
                          required
                        />
                      </Col>
                      <Col sm={6}>
                        <Form.Label className="fw-semibold small text-dark">Âge</Form.Label>
                        <Form.Control
                          type="number"
                          name="age"
                          value={formData.age}
                          onChange={handleChange}
                          min="18"
                        />
                      </Col>
                    </Row>

                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold small text-dark">Photo de profil (URL optionnelle)</Form.Label>
                      <Form.Control
                        type="text"
                        name="img"
                        placeholder="https://images.unsplash.com/..."
                        value={formData.img}
                        onChange={handleChange}
                      />
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label className="fw-semibold small text-dark">Rôle dans l'organisation</Form.Label>
                      <Form.Select name="role" value={formData.role} onChange={handleChange}>
                        <option value="user">Collaborateur standard</option>
                        <option value="admin">Administrateur système</option>
                      </Form.Select>
                    </Form.Group>

                    <Button
                      type="submit"
                      className="btn-primary-pro w-100 py-2 justify-content-center"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Spinner animation="border" size="sm" className="me-2" />
                          Création en cours...
                        </>
                      ) : (
                        "Confirmer l'inscription"
                      )}
                    </Button>
                  </Form>

                  <div className="mt-4 pt-3 border-top text-center">
                    <span className="text-muted small">Déjà enregistré ? </span>
                    <Link to="/login" className="fw-semibold text-primary small text-decoration-none">
                      Ouvrir une session
                    </Link>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Register;
