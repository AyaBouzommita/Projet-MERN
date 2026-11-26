import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { edituser } from "../redux/userSlice";
import { toast } from "react-toastify";

function Edituser({ el }) {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setEdited({
      name: el?.name || "",
      img: el?.img || "",
      age: el?.age || 18,
      email: el?.email || "",
      isAdmin: Boolean(el?.isAdmin),
    });
    setShow(true);
  };

  const [edited, setEdited] = useState({
    name: el?.name || "",
    img: el?.img || "",
    age: el?.age || 18,
    email: el?.email || "",
    isAdmin: Boolean(el?.isAdmin),
  });

  const handleChange = (e) => {
    setEdited({ ...edited, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(
        edituser({
          id: el?._id,
          edited: {
            ...edited,
            age: Number(edited.age),
            isAdmin: String(edited.isAdmin) === "true",
          },
        })
      ).unwrap();
      toast.success("Utilisateur mis à jour avec succès !");
      handleClose();
    } catch (err) {
      toast.error(err || "Erreur de mise à jour");
    }
  };

  return (
    <>
      <Button variant="outline-primary" size="sm" onClick={handleShow} className="flex-grow-1">
        ✏️ Modifier
      </Button>

      <Modal show={show} onHide={handleClose} backdrop="static" centered>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Modifier l'Utilisateur</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold small">Nom complet</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={edited.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold small">Adresse Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={edited.email}
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
                  value={edited.age}
                  onChange={handleChange}
                  min="1"
                />
              </div>
              <div className="col-md-6">
                <Form.Label className="fw-semibold small">Privilège</Form.Label>
                <Form.Select
                  name="isAdmin"
                  value={edited.isAdmin}
                  onChange={(e) =>
                    setEdited({ ...edited, isAdmin: e.target.value === "true" })
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
                value={edited.img}
                onChange={handleChange}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Annuler
            </Button>
            <Button variant="primary" type="submit">
              Sauvegarder
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default Edituser;
