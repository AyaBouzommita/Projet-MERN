import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Alert, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearError } from "../../redux/authSlice";
import { toast } from "react-toastify";
import { IconShield, IconCheck } from "../common/Icons";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    if (!formData.email || !formData.password) {
      toast.error("Veuillez renseigner votre email et mot de passe");
      return;
    }
    const resultAction = await dispatch(loginUser(formData));
    if (loginUser.fulfilled.match(resultAction)) {
      toast.success("Authentification réussie");
      navigate("/");
    } else {
      toast.error(resultAction.payload || "Identifiants invalides");
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

                    <h4 className="fw-bold text-white mb-3">Espace Gestion & Administration</h4>
                    <p className="text-white-50 small mb-4">
                      Connectez-vous pour administrer l'inventaire matériel, consulter les commandes et piloter votre organisation.
                    </p>

                    <div className="d-flex flex-column gap-3 small text-white-50">
                      <div className="d-flex align-items-center gap-2">
                        <span className="text-primary"><IconCheck size={16} /></span>
                        <span>Authentification sécurisée par jeton JWT</span>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <span className="text-primary"><IconCheck size={16} /></span>
                        <span>Contrôle d'accès basé sur les rôles (RBAC)</span>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <span className="text-primary"><IconCheck size={16} /></span>
                        <span>Chiffrement asymétrique des mots de passe</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-top border-secondary border-opacity-25 small text-white-50">
                    Système d'ingénierie logicielle GL3
                  </div>
                </Col>

                <Col md={7} className="p-4 p-lg-5 bg-white">
                  <div className="mb-4">
                    <h3 className="fw-bold text-dark mb-1">Connexion</h3>
                    <p className="text-muted small">Accédez à votre compte professionnel</p>
                  </div>

                  {error && <Alert variant="danger" className="py-2 small">{error}</Alert>}

                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold small text-dark">Adresse email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="nom@domaine.tn"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="py-2"
                      />
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label className="fw-semibold small text-dark">Mot de passe</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="py-2"
                      />
                    </Form.Group>

                    <Button
                      type="submit"
                      className="btn-primary-pro w-100 py-2 justify-content-center"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Spinner animation="border" size="sm" className="me-2" />
                          Vérification...
                        </>
                      ) : (
                        "Ouvrir une session"
                      )}
                    </Button>
                  </Form>

                  <div className="mt-4 pt-3 border-top text-center">
                    <span className="text-muted small">Nouveau collaborateur ? </span>
                    <Link to="/register" className="fw-semibold text-primary small text-decoration-none">
                      Créer un accès
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

export default Login;
