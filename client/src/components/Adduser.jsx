import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { adduser } from "../redux/userSlice";
import { toast } from "react-toastify";

function Adduser() {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [newuser, setNewuser] = useState({
    name: "",
    img: "",
    age: 20,
    email: "",
    isAdmin: false,
    role: "user",
  });

  const handleChange = (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setNewuser({ ...newuser, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newuser.name || !newuser.email) {
      toast.error("Le nom et l'email sont obligatoires !");
      return;
    }

    try {
      await dispatch(
        adduser({
          ...newuser,
          age: Number(newuser.age),
        })
      ).unwrap();
      toast.success(`Utilisateur "${newuser.name}" ajouté avec succès !`);
      setNewuser({
        name: "",
        img: "",
        age: 20,
        email: "",
        isAdmin: false,
        role: "user",
      });
      handleClose();
    } catch (err) {
      toast.error(err || "Erreur lors de l'ajout");
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow} className="fw-semibold shadow-sm d-flex align-items-center gap-2">
        <span>➕</span> Ajouter un utilisateur
      </Button>

      <Modal show={show} onHide={handleClose} backdrop="static" centered>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Ajouter un Utilisateur</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold small">Nom complet *</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="ex: Mohamed Ali"
                value={newuser.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold small">Adresse Email *</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="ex: user@domain.com"
                value={newuser.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <div className="row g-2 mb-3">
              <div className="col-md-6">
                <Form.Label className="fw-semibold small">Âge</Form.Label>
                <Form.Control
                  type="number"
                  name="age"
                  value={newuser.age}
                  onChange={handleChange}
                  min="1"
                />
              </div>
              <div className="col-md-6">
                <Form.Label className="fw-semibold small">Rôle</Form.Label>
                <Form.Select
                  name="isAdmin"
                  value={newuser.isAdmin}
                  onChange={(e) =>
                    setNewuser({
                      ...newuser,
                      isAdmin: e.target.value === "true",
                      role: e.target.value === "true" ? "admin" : "user",
                    })
                  }
                >
                  <option value="false">Utilisateur (Membre)</option>
                  <option value="true">Administrateur</option>
                </Form.Select>
              </div>
            </div>

            <Form.Group className="mb-2">
              <Form.Label className="fw-semibold small">URL Photo de Profil</Form.Label>
              <Form.Control
                type="text"
                name="img"
                placeholder="https://images.unsplash.com/..."
                value={newuser.img}
                onChange={handleChange}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Annuler
            </Button>
            <Button variant="primary" type="submit" className="fw-semibold">
              Enregistrer
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default Adduser;
