import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearError } from "../../redux/authSlice";
import { toast } from "react-toastify";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: 20,
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
      toast.error("Veuillez renseigner tous les champs requis !");
      return;
    }
    const resultAction = await dispatch(registerUser(formData));
    if (registerUser.fulfilled.match(resultAction)) {
      toast.success("Compte créé avec succès ! Bienvenue");
      navigate("/");
    } else {
      toast.error(resultAction.payload || "Échec de l'inscription");
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="auth-card shadow-lg border-0 rounded-4">
            <Card.Body className="p-4 p-md-5">
              <div className="text-center mb-4">
                <span className="logo-badge mb-2 d-inline-block">NOUVEAU COMPTE</span>
                <h3 className="fw-bold text-dark mt-2">Inscription</h3>
                <p className="text-muted small">Rejoignez la plateforme MERN GL3</p>
              </div>

              {error && <Alert variant="danger" className="py-2 small">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold small">Nom complet *</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="ex: Aya Bouzommita"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold small">Adresse Email *</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="ex: aya@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold small">Mot de passe *</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold small">Âge</Form.Label>
                      <Form.Control
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        min="1"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold small">URL Photo de profil (Optionnel)</Form.Label>
                  <Form.Control
                    type="text"
                    name="img"
                    placeholder="https://..."
                    value={formData.img}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="fw-semibold small">Rôle</Form.Label>
                  <Form.Select name="role" value={formData.role} onChange={handleChange}>
                    <option value="user">Utilisateur standard</option>
                    <option value="admin">Administrateur</option>
                  </Form.Select>
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 py-2 fw-semibold btn-auth"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />
                      Création du compte...
                    </>
                  ) : (
                    "Créer mon compte"
                  )}
                </Button>
              </Form>

              <div className="text-center mt-4">
                <p className="text-muted small mb-0">
                  Vous avez déjà un compte ?{" "}
                  <Link to="/login" className="text-primary fw-semibold text-decoration-none">
                    Se connecter
                  </Link>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
