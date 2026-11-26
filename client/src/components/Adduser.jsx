import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { adduser } from "../redux/userSlice";
import { toast } from "react-toastify";
import { IconPlus } from "./common/Icons";

function Adduser() {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [newuser, setNewuser] = useState({
    name: "",
    img: "",
    age: 25,
    email: "",
    isAdmin: false,
    role: "user",
  });

  const handleChange = (e) => {
    setNewuser({ ...newuser, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newuser.name || !newuser.email) {
      toast.error("Le nom et l'adresse email sont obligatoires");
      return;
    }

    try {
      await dispatch(
        adduser({
          ...newuser,
          age: Number(newuser.age),
        })
      ).unwrap();
      toast.success(`Compte "${newuser.name}" créé avec succès`);
      setNewuser({
        name: "",
        img: "",
        age: 25,
        email: "",
        isAdmin: false,
        role: "user",
      });
      handleClose();
    } catch (err) {
      toast.error(err || "Erreur lors de la création");
    }
  };

  return (
    <>
      <Button onClick={handleShow} className="btn-primary-pro">
        <IconPlus size={16} />
        <span>Nouveau collaborateur</span>
      </Button>

      <Modal show={show} onHide={handleClose} backdrop="static" centered>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold fs-5 text-dark">Ajouter un utilisateur</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body className="p-4">
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold small text-dark">Nom et prénom *</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Ex: Tarak Mansour"
                value={newuser.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold small text-dark">Adresse email professionnelle *</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="tarak.m@entreprise.tn"
                value={newuser.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <Form.Label className="fw-semibold small text-dark">Âge</Form.Label>
                <Form.Control
                  type="number"
                  name="age"
                  value={newuser.age}
                  onChange={handleChange}
                  min="18"
                />
              </div>
              <div className="col-md-6">
                <Form.Label className="fw-semibold small text-dark">Privilèges d'accès</Form.Label>
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
                  <option value="false">Collaborateur standard</option>
                  <option value="true">Administrateur</option>
                </Form.Select>
              </div>
            </div>

            <Form.Group className="mb-2">
              <Form.Label className="fw-semibold small text-dark">URL Photo de profil</Form.Label>
              <Form.Control
                type="text"
                name="img"
                placeholder="https://images.unsplash.com/..."
                value={newuser.img}
                onChange={handleChange}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer className="border-top px-4 py-3">
            <Button variant="light" className="btn-outline-pro" onClick={handleClose}>
              Annuler
            </Button>
            <Button type="submit" className="btn-primary-pro">
              Créer le compte
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default Adduser;
