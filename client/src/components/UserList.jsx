import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Spinner, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getusers } from "../redux/userSlice";
import UserCard from "./UserCard";
import Adduser from "./Adduser";
import { IconSearch, IconRefresh } from "./common/Icons";

function UserList() {
  const dispatch = useDispatch();
  const { userlist, loading, error } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.auth);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  useEffect(() => {
    dispatch(getusers(search));
  }, [dispatch]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(getusers(search));
  };

  const handleReset = () => {
    setSearch("");
    setRoleFilter("all");
    dispatch(getusers(""));
  };

  const adminCount = userlist?.filter((u) => u.isAdmin)?.length || 0;
  const memberCount = (userlist?.length || 0) - adminCount;

  const filteredUsers = userlist?.filter((u) => {
    if (roleFilter === "admin") return u.isAdmin;
    if (roleFilter === "member") return !u.isAdmin;
    return true;
  });

  return (
    <div className="py-4">
      <Container>
        {/* Header Section */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4 pb-3 border-bottom">
          <div>
            <h2 className="fw-bold mb-1 text-dark">Annuaire des Développeurs & Contributeurs</h2>
            <p className="text-muted small mb-0">
              Découvrez les étudiants ingénieurs, contributeurs open-source et créateurs de projets.
            </p>
          </div>
          <div>
            {user?.isAdmin && <Adduser />}
          </div>
        </div>

        {/* Metric Badges */}
        <Row className="g-3 mb-4">
          <Col md={4}>
            <div className="p-3 bg-white border rounded-3 shadow-sm d-flex justify-content-between align-items-center">
              <div>
                <div className="text-muted small">Total Développeurs</div>
                <div className="fs-4 fw-bold text-dark">{userlist?.length || 0}</div>
              </div>
              <span className="fs-3">👩‍💻</span>
            </div>
          </Col>

          <Col md={4}>
            <div className="p-3 bg-white border rounded-3 shadow-sm d-flex justify-content-between align-items-center">
              <div>
                <div className="text-muted small">Leads & Modérateurs</div>
                <div className="fs-4 fw-bold text-dark">{adminCount}</div>
              </div>
              <span className="fs-3">🛡️</span>
            </div>
          </Col>

          <Col md={4}>
            <div className="p-3 bg-white border rounded-3 shadow-sm d-flex justify-content-between align-items-center">
              <div>
                <div className="text-muted small">Contributeurs Actifs</div>
                <div className="fs-4 fw-bold text-dark">{memberCount}</div>
              </div>
              <span className="fs-3">🚀</span>
            </div>
          </Col>
        </Row>

        {/* Filter and Search Bar */}
        <div className="bg-white border rounded-3 p-3 mb-4 shadow-sm">
          <Row className="g-3 align-items-center">
            <Col lg={6} md={6}>
              <Form onSubmit={handleSearchSubmit}>
                <div className="position-relative">
                  <span className="search-icon-pos">
                    <IconSearch size={16} />
                  </span>
                  <Form.Control
                    type="search"
                    placeholder="Recherche par nom ou adresse email..."
                    className="dev-search-input w-100"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </Form>
            </Col>

            <Col lg={4} md={4}>
              <div className="d-flex gap-2">
                <button
                  type="button"
                  className={`dev-category-tab ${roleFilter === "all" ? "active" : ""}`}
                  onClick={() => setRoleFilter("all")}
                >
                  Tous ({userlist?.length || 0})
                </button>
                <button
                  type="button"
                  className={`dev-category-tab ${roleFilter === "admin" ? "active" : ""}`}
                  onClick={() => setRoleFilter("admin")}
                >
                  Leads ({adminCount})
                </button>
                <button
                  type="button"
                  className={`dev-category-tab ${roleFilter === "member" ? "active" : ""}`}
                  onClick={() => setRoleFilter("member")}
                >
                  Membres ({memberCount})
                </button>
              </div>
            </Col>

            <Col lg={2} md={2} className="text-md-end">
              <Button variant="light" size="sm" className="btn-outline-pro d-inline-flex align-items-center gap-1 w-100 justify-content-center" onClick={handleReset}>
                <IconRefresh size={14} />
                <span>Réinitialiser</span>
              </Button>
            </Col>
          </Row>
        </div>

        {/* Users Grid */}
        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <div className="text-muted small mt-2">Chargement des profils...</div>
          </div>
        ) : error ? (
          <div className="alert alert-danger text-center small py-3">{error}</div>
        ) : filteredUsers && filteredUsers.length > 0 ? (
          <Row xs={1} sm={2} md={3} lg={4} className="g-4">
            {filteredUsers.map((el) => (
              <Col key={el._id}>
                <UserCard el={el} />
              </Col>
            ))}
          </Row>
        ) : (
          <div className="text-center py-5 bg-white border rounded-3 p-4">
            <h5 className="fw-bold text-dark mb-1">Aucun développeur trouvé</h5>
            <p className="text-muted small mb-3">Aucun compte ne correspond à votre recherche.</p>
            <Button className="btn-outline-pro" onClick={handleReset}>
              Réinitialiser
            </Button>
          </div>
        )}
      </Container>
    </div>
  );
}

export default UserList;
