import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, InputGroup, Spinner, Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getusers } from "../redux/userSlice";
import UserCard from "./UserCard";
import Adduser from "./Adduser";

function UserList() {
  const dispatch = useDispatch();
  const { userlist, loading, error } = useSelector((state) => state.user);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getusers(search));
  }, [dispatch]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(getusers(search));
  };

  const handleReset = () => {
    setSearch("");
    dispatch(getusers(""));
  };

  const adminCount = userlist?.filter((u) => u.isAdmin)?.length || 0;
  const memberCount = (userlist?.length || 0) - adminCount;

  return (
    <Container className="py-4">
      {/* Top Banner */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4 p-4 bg-light rounded-4 border">
        <div>
          <h2 className="fw-bold mb-1 text-dark">Gestion des Utilisateurs</h2>
          <p className="text-muted small mb-0">
            Administrez les comptes de la plateforme, attribuez des rôles et gérez les profils.
          </p>
        </div>
        <div>
          <Adduser />
        </div>
      </div>

      {/* Stats Cards */}
      <Row className="g-3 mb-4">
        <Col sm={4}>
          <Card className="border-0 shadow-sm rounded-3 bg-primary text-white p-3">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <div className="small text-white-50">Total Inscrits</div>
                <h3 className="fw-bold mb-0">{userlist?.length || 0}</h3>
              </div>
              <span className="fs-1 opacity-75">👥</span>
            </div>
          </Card>
        </Col>
        <Col sm={4}>
          <Card className="border-0 shadow-sm rounded-3 bg-danger text-white p-3">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <div className="small text-white-50">Administrateurs</div>
                <h3 className="fw-bold mb-0">{adminCount}</h3>
              </div>
              <span className="fs-1 opacity-75">🛡️</span>
            </div>
          </Card>
        </Col>
        <Col sm={4}>
          <Card className="border-0 shadow-sm rounded-3 bg-success text-white p-3">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <div className="small text-white-50">Membres Actifs</div>
                <h3 className="fw-bold mb-0">{memberCount}</h3>
              </div>
              <span className="fs-1 opacity-75">✅</span>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Search Bar */}
      <div className="p-3 mb-4 rounded-3 border bg-white shadow-sm">
        <Row className="g-2">
          <Col md={8}>
            <Form onSubmit={handleSearchSubmit}>
              <InputGroup>
                <Form.Control
                  placeholder="Rechercher par nom ou email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button variant="primary" type="submit">
                  Rechercher
                </Button>
              </InputGroup>
            </Form>
          </Col>
          <Col md={4} className="text-md-end">
            <Button variant="outline-secondary" onClick={handleReset}>
              🔄 Réinitialiser
            </Button>
          </Col>
        </Row>
      </div>

      {/* Users Grid */}
      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p className="text-muted mt-2">Chargement des utilisateurs...</p>
        </div>
      ) : error ? (
        <div className="alert alert-danger text-center">{error}</div>
      ) : userlist && userlist.length > 0 ? (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {userlist.map((el) => (
            <Col key={el._id}>
              <UserCard el={el} />
            </Col>
          ))}
        </Row>
      ) : (
        <div className="text-center py-5 bg-light rounded-4 border">
          <h4 className="fw-bold text-muted">Aucun utilisateur trouvé</h4>
          <p className="text-muted small">Aucun compte ne correspond à votre recherche.</p>
          <Button variant="primary" onClick={handleReset}>
            Afficher tous les utilisateurs
          </Button>
        </div>
      )}
    </Container>
  );
}

export default UserList;
